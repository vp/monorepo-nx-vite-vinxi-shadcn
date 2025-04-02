import { createServerFn } from '@tanstack/react-start';
import { SignUpRequest } from '@workspace/users-supabase/sign-up';
import { redirect } from '@tanstack/react-router';
import { usersMiddleware } from '~/libs/user/users-middleware';

export const signUp = createServerFn()
  .middleware([usersMiddleware])
  .validator((d: unknown) => d as SignUpRequest & { redirectUrl?: string })
  .handler(async ({ data, context }) => {
    const { usersService } = context;
    const result = await usersService.signUp(data);

    if (result.error) {
      return result;
    }

    throw redirect({
      href: data.redirectUrl || '/',
    });
  });
