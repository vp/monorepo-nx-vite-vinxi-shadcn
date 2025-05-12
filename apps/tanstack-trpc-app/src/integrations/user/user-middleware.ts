import { createMiddleware } from '@tanstack/react-start';
import { userService } from '@/integrations/user/user-service';
import { userManagementService } from '@/integrations/chat/chat-service';


export const userMiddleware = createMiddleware().server(async ({ next }) =>
  next({
    context: {
      userService,
      getChatUser: userManagementService.getUserProfile
    },
  })
);
