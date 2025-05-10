import { ChannelsService } from '@workspace/chat-supabase/channels';
import { MessagesService } from '@workspace/chat-supabase/messages';
import {
  subscribeToMessages,
  SubscriptionsService,
} from '@workspace/chat-supabase/subscriptions';
import { UserManagementService } from '@workspace/chat-supabase/user-management';

import {
  createRouterFor,
  getTRPCInstance,
  TRPCError,
} from '@workspace/trpc/init';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { Message, MessageChangeEvent } from '@workspace/chat-supabase/types';

type Context = {
  getUser: () => Promise<{ id: string } | null>;
  channelsService: ChannelsService;
  messagesService: MessagesService;
  userManagementService: UserManagementService;
  subscriptionsService: SubscriptionsService;
};

export const createRouter = <
  TContext extends ReturnType<typeof getTRPCInstance<Context>>
>(
  context: TContext
) => {
  const publicProcedure = context.procedure.use(async ({ ctx, next }) => {
    if (!ctx.channelsService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Channels service service not found',
      });
    }

    if (!ctx.messagesService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Message service service not found',
      });
    }

    if (!ctx.userManagementService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'ChannelsService service not found',
      });
    }

    if (!ctx.subscriptionsService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Subscriptions service not found',
      });
    }

    return next({
      ctx,
    });
  });

  const authedProcedure = publicProcedure.use(async ({ ctx, next }) => {
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
    getChannel: authedProcedure
      .input(
        z.object({
          channelId: z.number(),
        })
      )
      .query(async ({ ctx, input }) => {
        const response = await ctx.channelsService.getChannel(input.channelId);

        if (!response) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Channel not found',
          });
        }

        return response;
      }),
    getChannels: authedProcedure
      .input(
        z.object({
          limit: z.number().optional().default(50),
          cursor: z.number().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const response = await ctx.channelsService.getChannels(
          input.limit,
          input.cursor
        );

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch channels',
          });
        }

        return response;
      }),

    createChannel: authedProcedure
      .input(
        z.object({
          slug: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.channelsService.createChannel({
          slug: input.slug,
          created_by: ctx.user.id,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create channel',
          });
        }

        return response;
      }),

    updateChannel: authedProcedure
      .input(
        z.object({
          channelId: z.number(),
          slug: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.channelsService.updateChannel({
          id: input.channelId,
          slug: input.slug,
          created_by: ctx.user.id,
        });
        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update channel',
          });
        }
        return response;
      }),

    deleteChannel: authedProcedure
      .input(
        z.object({
          channelId: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.channelsService.deleteChannel({
          channel_id: input.channelId,
          user_id: ctx.user.id,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to delete channel',
          });
        }

        return response;
      }),

    // Message-related procedures
    getMessages: authedProcedure
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

    getMessage: authedProcedure
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

    sendMessage: authedProcedure
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

    updateMessage: authedProcedure
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

    deleteMessage: authedProcedure
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

    getUser: authedProcedure
      .input(
        z.object({
          userId: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        const response = await ctx.userManagementService.getUser(input.userId);

        if (!response) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }

        return response;
      }),

    updateUserStatus: authedProcedure
      .input(
        z.object({
          userId: z.string(),
          status: z.enum(['ONLINE', 'OFFLINE']),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.userManagementService.updateUserStatus({
          id: input.userId,
          status: input.status,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update user status',
          });
        }

        return response;
      }),

    updateUsername: authedProcedure
      .input(
        z.object({
          userId: z.string(),
          username: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const response = await ctx.userManagementService.updateUsername({
          id: input.userId,
          username: input.username,
        });

        if (!response) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update username',
          });
        }

        return response;
      }),

      onMessageChange: authedProcedure
      .input(z.object({ channelId: z.number() }))
      .subscription(async function* ({ ctx, input }) {
        // Message queue and signal for waiting
        const messageQueue: MessageChangeEvent[] = [];
        let notifyMessage: (() => void) | null = null;
        
        // Create a waitForMessage function
        const waitForMessage = () => new Promise<void>(resolve => {
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

export type ChatRouter = ReturnType<typeof createRouter>;

export function createChatRouter() {
  return createRouterFor<Context, ChatRouter>(createRouter);
}
