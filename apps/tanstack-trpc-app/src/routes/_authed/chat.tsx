import { useTRPC } from '@/integrations/trpc/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, LinkProps, Outlet } from '@tanstack/react-router';
import { ChatLayout } from '@workspace/chat-ui/components/chat-layout';
import { ChatProvider } from '@workspace/chat-ui/components/chat-provider';

export const Route = createFileRoute('/_authed/chat')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.chat.getChannels.queryOptions({})
    );
  },
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data: channels } = useQuery(trpc.chat.getChannels.queryOptions({}));
  const channelsWithLinks = channels?.data?.map((channel) => ({
    ...channel,
    link: {
      to: '/chat/$channelId',
      params: { channelId: channel.id.toString() },
    } as LinkProps,
  }));
  const user = Route.useRouteContext().user;

  console.log('[USER]', user);

  return user && (
    <ChatProvider
      channels={channelsWithLinks}
      user={{ id: user?.id, role: 'member' }}
    >
      <ChatLayout basePath="/chat">
        <Outlet />
      </ChatLayout>
    </ChatProvider>
  );
}
