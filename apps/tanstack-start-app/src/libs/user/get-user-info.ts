import { createServerFn } from '@tanstack/react-start';
import { usersMiddleware } from '~/libs/user/users-middleware';

export const getUserInfo = createServerFn({ method: 'GET' })
  .middleware([usersMiddleware])
  .handler(async ({ context }) => {
    const { usersService } = context;

    return await usersService.getUser();
  });
