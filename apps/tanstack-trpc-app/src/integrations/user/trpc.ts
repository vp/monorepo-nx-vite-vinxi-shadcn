import { userService } from "./user-service";

export const createUserTRPCContext = () => ({
  userService: userService,
  user: null,
});
