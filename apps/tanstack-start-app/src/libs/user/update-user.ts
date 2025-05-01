import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '~/libs/user/user-middleware';
import { UpdateUserRequest } from '@workspace/user-supabase/update-user';

export const updateUser = createServerFn({ method: 'POST' })
  .middleware([userMiddleware])
  .validator((d: unknown) => d as UpdateUserRequest)
  .handler(async ({ data, context }) => {
    const { userService } = context;

    return await userService.updateUser(data);
  });
