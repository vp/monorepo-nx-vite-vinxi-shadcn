import { createFileRoute } from '@tanstack/react-router';

import { signOut } from '~/libs/user/sign-out';

export const Route = createFileRoute('/_auth/logout')({
  preload: false,
  loader: () => signOut(),
});
