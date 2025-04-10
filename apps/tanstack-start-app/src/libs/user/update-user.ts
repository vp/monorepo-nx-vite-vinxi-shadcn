import { createServerFn } from '@tanstack/react-start';
import { usersMiddleware } from '~/libs/user/users-middleware';
import { UpdateUserRequest } from '@workspace/users-supabase/update-user';

export const updateUser = createServerFn({ method: 'POST' })
  .middleware([usersMiddleware])
  .validator((d: unknown) => d as UpdateUserRequest)
  .handler(async ({ data, context }) => {
    const { usersService } = context;
    console.log('[updateUser]', data);
    return await usersService.updateUser(data);
  });
