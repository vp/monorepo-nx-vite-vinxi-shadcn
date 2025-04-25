import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { CenterPageLayout } from '@workspace/ui/components/blocks/center-page-layout';

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' });
    }

    // Pass user data to the client
    return {
      context: {
        user: context.user || null,
      },
    };
  },
});

function RouteComponent() {


  return (
    <CenterPageLayout>
      <Outlet />
    </CenterPageLayout>
  );
}
