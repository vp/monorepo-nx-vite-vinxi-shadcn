import { createServerFn } from '@tanstack/react-start';
import { SignUpRequest } from '@workspace/user-supabase/sign-up';
import { redirect } from '@tanstack/react-router';
import { userMiddleware } from '~/libs/user/user-middleware';

export const signUp = createServerFn()
  .middleware([userMiddleware])
  .validator((d: unknown) => d as SignUpRequest & { redirectUrl?: string })
  .handler(async ({ data, context }) => {
    const { userService } = context;
    const result = await userService.signUp(data);

    if (result.error) {
      return result;
    }

    throw redirect({
      href: data.redirectUrl || '/',
    });
  });
