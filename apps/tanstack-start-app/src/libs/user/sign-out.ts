import { createServerFn } from '@tanstack/react-start';
import { redirect } from '@tanstack/react-router';
import { usersService } from '~/utils/users-service';

export const signOut = createServerFn().handler(async () => {
  const result = await usersService.signOut();

  if (result.error) {
    return result;
  }

  throw redirect({
    href: '/'
  });
});
