import { createServerFn } from '@tanstack/react-start';
import { usersMiddleware } from '~/libs/user/users-middleware';

export const signIn = createServerFn()
  .middleware([usersMiddleware])
  .validator((d: unknown) => d as { email: string; password: string })
  .handler(async ({ data, context }) => {
    const { usersService } = context;

    return await usersService.signIn(data);
  });
