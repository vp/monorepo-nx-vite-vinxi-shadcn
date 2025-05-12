import { createMiddleware } from '@tanstack/react-start';
import { userService } from '@/integrations/user/user-service';


export const userMiddleware = createMiddleware().server(async ({ next }) =>
  next({
    context: {
      userService,
    },
  })
);
