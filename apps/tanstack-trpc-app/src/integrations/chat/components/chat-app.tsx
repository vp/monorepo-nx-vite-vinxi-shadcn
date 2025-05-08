import { useTRPC } from '@/integrations/trpc/react';
import { useQuery } from '@tanstack/react-query';
import { LinkProps } from '@tanstack/react-router';
import { ChatProvider } from '@workspace/chat-ui/components/chat-provider';
import { PropsWithChildren } from 'react';

export const Chat = ({ children }: PropsWithChildren) => {
  const trpc = useTRPC();
  const { data: channels } = useQuery(trpc.chat.getChannels.queryOptions({}));
  const channelsWithLinks = channels?.data?.map((channel) => ({
    ...channel,
    link: {
      to: '/chat/$channelId',
      params: { channelId: channel.id.toString() },
    } as LinkProps,
  }));

  return (
    <ChatProvider
      channels={channelsWithLinks}
      user={{ id: '1', role: 'admin' }}
    >
     {children}
    </ChatProvider>
  );
};
