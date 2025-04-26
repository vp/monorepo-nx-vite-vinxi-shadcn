import { userService } from './users-service';

export const createUserTRPCContext = () => ({
  userService: userService,
  user: null,
});
