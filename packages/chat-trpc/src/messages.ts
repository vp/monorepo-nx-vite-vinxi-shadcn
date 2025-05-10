import { MessageChangeEvent } from '@workspace/chat-supabase/types';
import { getTRPCInstance, TRPCError } from '@workspace/trpc/init';
import { z } from 'zod';
import { Context } from './chat-context.js';

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
          messageId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.messagesService.deleteMessage({
          message_id: input.messageId,
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
      .subscription(async function* ({ ctx, input }) {
        // Message queue and signal for waiting
        const messageQueue: MessageChangeEvent[] = [];
        let notifyMessage: (() => void) | null = null;

        // Create a waitForMessage function
        const waitForMessage = () =>
          new Promise<void>((resolve) => {
            notifyMessage = resolve;
          });

        let unsubscribe: (() => void) | undefined = undefined;

        try {
          // Set up subscription
          const result = await ctx.messagesService.listenToMessages(
            input.channelId,
            (payload) => {
              // When a message arrives, add to queue
              messageQueue.push(payload);

              // Notify waiting generator if needed
              if (notifyMessage) {
                notifyMessage();
                notifyMessage = null;
              }
            }
          );

          unsubscribe = result.unsubscribe;

          // Yield messages as they arrive
          while (true) {
            if (messageQueue.length > 0) {
              // If we have messages in queue, yield the next one
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              yield messageQueue.shift()!;
            } else {
              // Otherwise wait for new messages
              await waitForMessage();
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to subscribe to messages',
          });
        } finally {
          // Ensure we clean up when the generator is done
          if (unsubscribe) {
            unsubscribe();
          }
        }
      }),
  };
};
