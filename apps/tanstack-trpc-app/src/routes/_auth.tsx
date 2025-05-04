import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { CenterPageLayout } from '@workspace/ui/components/blocks/center-page-layout';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/' });
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
      <div className="flex flex-col justify-center h-full">
        <Outlet />
      </div>
    </CenterPageLayout>
  );
}
