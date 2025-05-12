import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '@/integrations/user/user-middleware';

export const getUserInfo = createServerFn({ method: 'GET' })
  .middleware([userMiddleware])
  .handler(async ({ context }) => {
    const { userService } = context;

    const user = await userService.getUser();
    const chatProfile = user ? await context.getChatUser(user.id) : null;

    return user && {
      ...user,
      chatProfile: chatProfile && chatProfile.data,
    };
  });
