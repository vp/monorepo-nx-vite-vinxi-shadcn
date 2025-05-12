import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '@/integrations/user/user-middleware';

export const signIn = createServerFn()
  .middleware([userMiddleware])
  .validator((d: unknown) => d as { email: string; password: string })
  .handler(async ({ data, context }) => {
    const { userService } = context;

    return await userService.signIn(data);
  });
