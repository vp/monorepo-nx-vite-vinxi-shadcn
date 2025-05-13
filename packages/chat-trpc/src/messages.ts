import { MessageChangeEvent } from '@workspace/chat-supabase/types';
import { getTRPCInstance, TRPCError } from '@workspace/trpc/init';
import { z } from 'zod';
import { Context } from './chat-context.js';
import { observable } from '@trpc/server/observable';

// Add this shared subscription manager at the top of your file, outside the router creation
const channelSubscriptions = new Map<
  number,
  {
    listeners: Set<(event: MessageChangeEvent) => void>;
    unsubscribe: (() => void) | undefined;
    refCount: number;
  }
>();

export const createMessagesRoutes = <
  TContext extends ReturnType<typeof getTRPCInstance<Context>>
>(
  context: TContext
) => {
  const procedure = context.procedure.use(async ({ ctx, next }) => {
    const user = await ctx.getUser();

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({
      ctx: {
        user,
      },
    });
  });

  return {
    getMessages: procedure
      .input(
        z.object({
          channelId: z.number(),
          limit: z.number().optional().default(50),
          cursor: z.number().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const response = await ctx.messagesService.getMessages(
          input.channelId,
          input.limit,
          input.cursor
        );

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch messages',
          });
        }

        return response;
      }),

    getMessage: procedure
      .input(
        z.object({
          messageId: z.number(),
        })
      )
      .query(async ({ ctx, input }) => {
        const response = await ctx.messagesService.getMessage(input.messageId);

        if (!response) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Message not found',
          });
        }

        return response;
      }),

    sendMessage: procedure
      .input(
        z.object({
          channelId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.messagesService.sendMessage({
          channel_id: input.channelId,
          message: input.message,
          user_id: ctx.user.id,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create message',
          });
        }

        return response;
      }),

    updateMessage: procedure
      .input(
        z.object({
          messageId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.messagesService.updateMessage({
          id: input.messageId,
          message: input.message,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update message',
          });
        }

        return response;
      }),

    deleteMessage: procedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.messagesService.deleteMessage({
          message_id: input.id,
          user_id: ctx.user.id,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to delete message',
          });
        }

        return response;
      }),
    onMessageChange: procedure
      .input(z.object({ channelId: z.number() }))
      .subscription(({ ctx, input }) => {
        return observable<MessageChangeEvent>((emit) => {
          const channelId = input.channelId;

          // Initialize channel subscription if it doesn't exist
          if (!channelSubscriptions.has(channelId)) {
            channelSubscriptions.set(channelId, {
              listeners: new Set(),
              unsubscribe: undefined,
              refCount: 0,
            });

            // Set up the actual subscription to the database
            ctx.messagesService
              .listenToMessages(channelId, (payload) => {
                // Broadcast to all listeners for this channel
                const subscription = channelSubscriptions.get(channelId);
                if (subscription) {
                  subscription.listeners.forEach((listener) =>
                    listener(payload)
                  );
                }
              })
              .then((result) => {
                const subscription = channelSubscriptions.get(channelId);
                if (subscription) {
                  subscription.unsubscribe = result.unsubscribe;
                }
              })
              .catch((error) => {
                console.error('Failed to set up channel subscription:', error);
              });
          }

          // Add this client as a listener
          const subscription = channelSubscriptions.get(channelId);
          if (!subscription) {
            throw new Error(`Subscription for channelId ${channelId} was not initialized.`);
          }

          subscription.listeners.add(emit.next);
          subscription.refCount++;

          // Return cleanup function
          return () => {
            const subscription = channelSubscriptions.get(channelId);
            if (subscription) {
              subscription.listeners.delete(emit.next);
              subscription.refCount--;

              // If no more listeners, clean up the subscription
              if (subscription.refCount <= 0) {
                if (subscription.unsubscribe) {
                  subscription.unsubscribe();
                }
                channelSubscriptions.delete(channelId);
              }
            }
          };
        });
      }),
  };
};
