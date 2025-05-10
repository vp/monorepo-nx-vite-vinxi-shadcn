
import {
  createRouterFor,
  getTRPCInstance,
  TRPCError,
} from '@workspace/trpc/init';
import { z } from 'zod';
import { createMessagesRoutes } from './messages.js';
import { Context } from './chat-context.js';


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

    ...createMessagesRoutes<TContext>(
      context,
    )
  };
};

export type ChatRouter = ReturnType<typeof createRouter>;

export function createChatRouter() {
  return createRouterFor<Context, ChatRouter>(createRouter);
}
