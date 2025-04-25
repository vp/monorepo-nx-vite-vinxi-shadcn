import { useTRPC } from '@/integrations/trpc/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/user')({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.user.getUser.queryOptions());

  return data && <div>Hello "{data.firstName}"!</div>;
}
