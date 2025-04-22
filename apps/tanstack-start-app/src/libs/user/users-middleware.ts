import { createMiddleware } from '@tanstack/react-start';
import { usersService } from '~/utils/users-service';

export const usersMiddleware = createMiddleware().server(async ({ next }) =>
  next({
    context: {
      usersService,
    },
  })
);
