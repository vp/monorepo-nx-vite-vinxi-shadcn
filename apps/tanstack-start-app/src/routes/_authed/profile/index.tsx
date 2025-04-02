import { createFileRoute } from '@tanstack/react-router'
import { UserInfoSmall } from '@workspace/users-ui/components/user-info-small';

export const Route = createFileRoute('/_authed/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return user && <div className="flex flex-row gap-4 border-2 rounded-full max-w-[200px]"><UserInfoSmall user={user} /></div>
}
