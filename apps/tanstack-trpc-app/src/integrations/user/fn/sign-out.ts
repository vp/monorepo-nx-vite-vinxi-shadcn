import { createServerFn } from '@tanstack/react-start';
import { redirect } from '@tanstack/react-router';
import { userMiddleware } from '@/integrations/user/user-middleware';

export const signOut = createServerFn()
  .middleware([userMiddleware])
  .handler(async ({ context }) => {
    const { userService } = context;
    const result = await userService.signOut();

    if (result.error) {
      return result;
    }

    throw redirect({
      href: '/',
    });
  });
