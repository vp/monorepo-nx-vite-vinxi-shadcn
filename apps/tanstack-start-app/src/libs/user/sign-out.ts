import { createServerFn } from '@tanstack/react-start';
import { redirect } from '@tanstack/react-router';
import { usersMiddleware } from '~/libs/user/users-middleware';

export const signOut = createServerFn()
  .middleware([usersMiddleware])
  .handler(async ({ context }) => {
    const { usersService } = context;
    const result = await usersService.signOut();

    if (result.error) {
      return result;
    }

    throw redirect({
      href: '/',
    });
  });
