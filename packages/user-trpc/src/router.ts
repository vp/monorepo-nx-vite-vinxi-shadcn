import { publicProcedure, TRPCRouterRecord } from '@workspace/trpc/init';
import { UserService } from '@workspace/users-supabase/create-users-service';
import { z } from 'zod';

export const createUserRouter = (userService: UserService) =>
  ({
    signIn: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async (opts) => {
        const { email, password } = opts.input;

        return await userService.signIn({
          email,
          password,
        });
      }),
    signUp: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
          firstName: z.string().min(1),
          lastName: z.string().min(1),
        })
      )
      .mutation(async (opts) => {
        const { email, password, firstName, lastName } = opts.input;

        return await userService.signUp({
          email,
          password,
          firstName,
          lastName,
        });
      }),
    signOut: publicProcedure.mutation(async () => {
      return await userService.signOut();
    }),
    getUser: publicProcedure.query(async () => {
      return await userService.getUser();
    }),
  } satisfies TRPCRouterRecord);
