import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTRPC } from '@/integrations/trpc/react';
import { ChannelProvider } from '@workspace/chat-ui/components/channel-provider';
import { Channel } from '@workspace/chat-ui/components/channel';

export const Route = createFileRoute('/_authed/chat/$channelId')({
  component: RouteComponent,
  loader: async ({ context, params: { channelId } }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.chat.getChannel.queryOptions({
        channelId: Number(channelId),
      })
    );

    await context.queryClient.prefetchQuery(
      context.trpc.chat.getMessages.queryOptions({
        channelId: Number(channelId),
      })
    );
  },
});

function RouteComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { channelId } = Route.useParams();
  const { data: channels } = useQuery(
    trpc.chat.getChannel.queryOptions({ channelId: Number(channelId) })
  );
  const { data: messages } = useQuery(
    trpc.chat.getMessages.queryOptions({ channelId: Number(channelId) })
  );

  const messageSendMutation = useMutation({
    ...trpc.chat.sendMessage.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.chat.getMessages.queryKey(),
      });
    },
  });
  return (
    channels?.data && (
      <ChannelProvider channel={channels.data} messages={messages?.data} messageSend={messageSendMutation.mutateAsync}>
        <Channel />
      </ChannelProvider>
    )
  );
}
