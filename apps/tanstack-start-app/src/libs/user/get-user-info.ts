import { createServerFn } from '@tanstack/react-start';
import { usersService } from '~/utils/users-service';

export const getUserInfo = createServerFn({ method: 'GET' }).handler(async () => {
  return await usersService.getUser();
});
