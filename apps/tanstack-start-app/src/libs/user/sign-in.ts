import { createServerFn } from '@tanstack/react-start';
import { usersService } from '~/utils/users-service';

export const signIn = createServerFn()
  .validator((d: unknown) => d as { email: string; password: string })
  .handler(async ({ data }) => {
    return await usersService.signIn(data);
  });
