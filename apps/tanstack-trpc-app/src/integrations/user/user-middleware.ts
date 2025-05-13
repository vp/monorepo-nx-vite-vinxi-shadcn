import { createMiddleware } from '@tanstack/react-start';
import { isServer } from '@/utils';
import { getSupabaseBrowserClient } from '@workspace/supabase/browser-client';
import { getSupabaseServerClient } from '@workspace/supabase/server-client';
import { createUserService } from '@workspace/user-supabase/create-user-service';
import { createUserManagementService } from '@workspace/chat-supabase/user-management';


export const userMiddleware = createMiddleware().server(async ({ next }) =>
  {
    const getSupabaseClient = () => isServer() ? getSupabaseServerClient() : getSupabaseBrowserClient();
    const userService = createUserService(getSupabaseClient);
    const userManagementService = createUserManagementService(getSupabaseClient);

    return next({
      context: {
        userService,
        getChatUser: userManagementService.getUserProfile
      },
    });
  }
);
