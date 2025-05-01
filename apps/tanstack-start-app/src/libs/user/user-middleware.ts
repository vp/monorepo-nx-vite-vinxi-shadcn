import { createMiddleware } from '@tanstack/react-start';
import { userService } from '~/utils/user-service';

export const userMiddleware = createMiddleware().server(async ({ next }) =>
  next({
    context: {
      userService,
    },
  })
);
