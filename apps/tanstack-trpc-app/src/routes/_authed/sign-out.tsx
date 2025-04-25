import { createFileRoute, redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/_authed/sign-out')({
  preload: false,
  loader: async ({context}) => {
     await context.trpcClient.user.signOut.mutate();

     throw redirect({
      href: '/',
    });
  },
});
