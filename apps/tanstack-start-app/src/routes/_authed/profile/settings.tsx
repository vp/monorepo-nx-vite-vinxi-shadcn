import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/profile/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/profile/settings"!</div>
}
