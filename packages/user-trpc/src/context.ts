import { SupabaseClient } from "@supabase/supabase-js";
import { createUserService, UserService } from "@workspace/user-supabase/create-user-service";

export type Context = {
  userService: UserService;
  user: {
    id: string;
    email: string;
  } | null;
};

export const createUserTRPCContext = (getSupabaseClient: () => SupabaseClient) => {
  const userService = createUserService(getSupabaseClient);
  return ({
    userService,
    getUser: userService.getUser,
    user: null,
  });
};
