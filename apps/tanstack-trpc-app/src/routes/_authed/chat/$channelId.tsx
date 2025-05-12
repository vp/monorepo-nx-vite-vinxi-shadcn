import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useTRPC } from '@/integrations/trpc/react';
import { ChannelProvider } from '@workspace/chat-ui/components/channel-provider';
import { Channel } from '@workspace/chat-ui/components/channel';
import { useSubscription } from '@trpc/tanstack-react-query';
import { useEffect, useState } from 'react';
import { Message } from '@workspace/chat-supabase/types';
import { logger } from '@/utils';

export const Route = createFileRoute('/_authed/chat/$channelId')({
  component: RouteComponent,
  // TODO: doesn't work, no param channelId in context params
  // loader: async ({ context, params }) => {
  //   const { channelId } = params;
  //   await context.queryClient.prefetchQuery(
  //     context.trpc.chat.getChannel.queryOptions({
  //       channelId: Number(channelId),
  //     })
  //   );

  //   await context.queryClient.prefetchQuery(
  //     context.trpc.chat.getMessages.queryOptions({
  //       channelId: Number(channelId),
  //     })
  //   );
  // },
});

function RouteComponent() {
  const trpc = useTRPC();
  const { channelId } = Route.useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  //const queryClient = useQueryClient()

  const { data: channels } = useQuery(
    trpc.chat.getChannel.queryOptions({ channelId: Number(channelId) })
  );

  const { data: queriedMessages } = useQuery(
    trpc.chat.getMessages.queryOptions({ channelId: Number(channelId) })
  );

  useEffect(() => {
    if (queriedMessages?.data) {
      setMessages(
        queriedMessages.data.sort((a, b) => {
          return (
            new Date(a.inserted_at).getTime() -
            new Date(b.inserted_at).getTime()
          );
        })
      );
    }
  }, [queriedMessages]);

  const messageSendMutation = useMutation(
    trpc.chat.sendMessage.mutationOptions()
  );

  const messageDeleteMutation = useMutation(
    trpc.chat.deleteMessage.mutationOptions()
  );

  useSubscription(
    trpc.chat.onMessageChange.subscriptionOptions(
      {
        channelId: Number(channelId),
      },
      {
        enabled: typeof window !== 'undefined',
        onStarted: () => {
          logger.log('subscription started');
        },
        onData: (event) => {
          if (event.event === 'INSERT') {
            setMessages((prevMessages) => {
              if (event.data) {
                return [...prevMessages, event.data];
              }
              return prevMessages;
            });
          }

          if (event.event === 'DELETE') {
            setMessages((prevMessages) => {
              if (event.data && event.data.id) {
                return prevMessages.filter(
                  (message) => event.data && message.id !== event.data.id
                );
              }

              return prevMessages;
            });
          }
        },
        onError: (error) => {
          logger.error('subscription error', error);
        },
        onConnectionStateChange: (state) => {
          logger.log('subscription connection state', state);
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
        messageDelete={messageDeleteMutation.mutateAsync}
      >
        <Channel />
      </ChannelProvider>
    )
  );
}
