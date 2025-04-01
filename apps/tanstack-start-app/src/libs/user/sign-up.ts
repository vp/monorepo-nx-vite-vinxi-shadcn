import { createServerFn } from '@tanstack/react-start';
import { SignUpRequest } from '@workspace/users-supabase/sign-up';
import { redirect } from '@tanstack/react-router';
import { usersService } from '~/utils/users-service';

export const signUp = createServerFn()
  .validator((d: unknown) => d as SignUpRequest & { redirectUrl?: string })
  .handler(async ({ data }) => {
    const result = await usersService.signUp(data);

    if (result.error) {
      return result;
    }

    throw redirect({
      href: data.redirectUrl || '/'
    });
  });
