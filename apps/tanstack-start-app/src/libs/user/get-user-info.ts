import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '~/libs/user/user-middleware';

export const getUserInfo = createServerFn({ method: 'GET' })
  .middleware([userMiddleware])
  .handler(async ({ context }) => {
    const { userService } = context;

    return await userService.getUser();
  });
