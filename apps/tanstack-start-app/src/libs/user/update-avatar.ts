import { createServerFn } from '@tanstack/react-start';
import { usersMiddleware } from '~/libs/user/users-middleware';
import { UpdateAvatarRequest } from '@workspace/users-supabase/update-avatar';

export const updateAvatar = createServerFn({ method: 'POST' })
  .middleware([usersMiddleware])
  .validator((d: unknown) => d as UpdateAvatarRequest)
  .handler(async ({ data, context }) => {
    const { usersService } = context;

    return await usersService.updateAvatar(data);
  });
