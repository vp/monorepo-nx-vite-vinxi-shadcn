import { createServerFn } from '@tanstack/react-start';
import { userMiddleware } from '@/integrations/user/user-middleware';

export const getUserInfo = createServerFn({ method: 'GET' })
  .middleware([userMiddleware])
  .handler(async ({ context }) => {
    const { userService } = context;
    
    // Check if the user is authenticated
    const refreshResponse = await userService.refreshSession();

    // Check if the refresh response is successful
    if (refreshResponse.error) {
      console.error('Error refreshing session:', refreshResponse.message, refreshResponse.data?.error);
      userService.signOut(); 
      return null;
    }

    // Fetch the user info from the user service
    const user = await userService.getUser();

    // Fetch the chat profile from the chat service
    const chatProfile = user ? await context.getChatUser(user.id) : null;

    // Return the user info and chat profile
    return user && {
      ...user,
      chatProfile: chatProfile && chatProfile.data,
    };
  });
