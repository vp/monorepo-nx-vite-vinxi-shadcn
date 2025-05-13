import { createServerClient } from "@supabase/ssr";
import { createUserService } from "@workspace/user-supabase/create-user-service";

export const createUserTRPCContext = (getSupabaseClient: ReturnType<typeof createServerClient>) => {
  const userService = createUserService(getSupabaseClient);
  return ({
    userService,
    getUser: userService.getUser,
    user: null,
  });
};
