import { createServerClient } from "@supabase/ssr";
import { createUserService, UserService } from "@workspace/user-supabase/create-user-service";

export type Context = {
  userService: UserService;
  user: {
    id: string;
    email: string;
  } | null;
};

export const createUserTRPCContext = (getSupabaseClient: ReturnType<typeof createServerClient>) => {
  const userService = createUserService(getSupabaseClient);
  return ({
    userService,
    getUser: userService.getUser,
    user: null,
  });
};
