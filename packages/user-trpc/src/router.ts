import {
  createRouterFor,
  getTRPCInstance,
  TRPCError,
} from '@workspace/trpc/init';
import { UserService } from '@workspace/user-supabase/create-user-service';
import { z } from 'zod';

type Context = {
  userService: UserService;
  user: {
    id: string;
    email: string;
  } | null;
};

export const createRouter = <
  TContext extends ReturnType<typeof getTRPCInstance<Context>>
>(
  context: TContext
) => {
  const publicProcedure = context.procedure.use(async ({ ctx, next }) => {
    if (!ctx.userService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User service not found',
      });
    }
    const user = await ctx.userService.getUser();

    return next({
      ctx: {
        userService: ctx.userService,
        user,
      },
    });
  });

  const authedProcedure = publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({
      ctx: {
        user: ctx.user,
      },
    });
  });

  return {
    signIn: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { email, password } = input;

        return await ctx.userService.signIn({
          email,
          password,
        });
      }),
    signUp: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
          firstName: z.string().min(1).optional(),
          lastName: z.string().min(1).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { email, password, firstName, lastName } = input;

        return await ctx.userService.signUp({
          email,
          password,
          firstName,
          lastName,
        });
      }),
    signOut: publicProcedure.mutation(async ({ ctx }) => {
      return await ctx.userService.signOut();
    }),
    getUser: publicProcedure.query(async ({ ctx }) => {
      return await ctx.userService.getUser();
    }),
    getSecret: authedProcedure.query(() => {
      // Only accessible if ctx.user exists
      return { secret: 'This is protected!' };
    }),
  };
};

export type UserRouter = ReturnType<typeof createRouter>;

export function createUserRouter() {
  return createRouterFor<Context, UserRouter>(createRouter);
}
