import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '~/libs/user/user-middleware';
import { UpdateAvatarRequest } from '@workspace/user-supabase/update-avatar';

export const updateAvatar = createServerFn({ method: 'POST' })
  .middleware([userMiddleware])
  .validator((d: unknown) => d as UpdateAvatarRequest)
  .handler(async ({ data, context }) => {
    const { userService } = context;

    return await userService.updateAvatar(data);
  });
