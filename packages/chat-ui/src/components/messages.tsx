import { Message } from '@workspace/chat-ui/types';
import { useEffect, useRef } from 'react';
import { MessageItem } from '@workspace/chat-ui/components/message-item';
import { useChannelContext } from '@workspace/chat-ui/channel-context';

export const Messages = ({
  messages,
  channelId,
}: {
  messages: Message[];
  channelId: number;
}) => {
  const { messageDelete } = useChannelContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid gap-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onDeleteMessage={messageDelete}
            />
          ))}
          <div ref={messagesEndRef} style={{ height: 0 }} />
      </div>
    </div>
  );
};
