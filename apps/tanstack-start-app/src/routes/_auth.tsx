import { createFileRoute, Outlet } from '@tanstack/react-router';
import { CenterPageLayout } from '~/components/CenterPageLayout';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CenterPageLayout><Outlet /></CenterPageLayout>
}
