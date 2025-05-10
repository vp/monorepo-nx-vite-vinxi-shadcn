import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTRPC } from '@/integrations/trpc/react';
import { ChannelProvider } from '@workspace/chat-ui/components/channel-provider';
import { Channel } from '@workspace/chat-ui/components/channel';
import { useSubscription } from '@trpc/tanstack-react-query';
import { useEffect, useState } from 'react';
import { Message } from '@workspace/chat-supabase/types';

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
  const { channelId } = Route.useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const queryClient = useQueryClient()

  const { data: channels } = useQuery(
    trpc.chat.getChannel.queryOptions({ channelId: Number(channelId) })
  );
  const { data: queriedMessages } = useQuery(
    trpc.chat.getMessages.queryOptions({ channelId: Number(channelId) })
  );

  useEffect(() => {
    if (queriedMessages?.data) {
      setMessages(queriedMessages.data.sort((a, b) => {
        return (
          new Date(a.inserted_at).getTime() -
          new Date(b.inserted_at).getTime()
        );
      }));
    }
  }, [queriedMessages]);

  const messageSendMutation = useMutation({
    ...trpc.chat.sendMessage.mutationOptions(),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: trpc.chat.getMessages.queryKey(),
    //   });
    // },
  });

  const subscription = useSubscription(
    trpc.chat.onMessageChange.subscriptionOptions(
      {
        channelId: Number(channelId),
      },
      {
        enabled: true,
        onStarted: () => {
          console.log('subscription started');
        },
        onData: (event) => {
          console.log('subscription data', event);
          if (event.event === 'INSERT') {
            setMessages((prevMessages) => {
              if (event.data) {
                return [...prevMessages, event.data];
              }
              return prevMessages;
            });
          }
        },
        onError: (error) => {
          console.error('subscription error', error);
        },
        onConnectionStateChange: (state) => {
          console.log('subscription connection state', state);
        },
      }
    )
  );

  return (
    channels?.data && (
      <ChannelProvider
        channel={channels.data}
        messages={messages}
        messageSend={messageSendMutation.mutateAsync}
      >
        <Channel />
      </ChannelProvider>
    )
  );
}
