import { createFileRoute, Outlet } from '@tanstack/react-router';
import { CenterPageLayout } from '@workspace/ui/components/blocks/center-page-layout';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CenterPageLayout>
      <Outlet />
    </CenterPageLayout>
  );
}
