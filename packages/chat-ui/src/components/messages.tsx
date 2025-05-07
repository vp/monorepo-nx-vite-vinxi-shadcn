import { Message, MessageToSend } from '@workspace/chat-ui/types';
import { useChatContext } from '@workspace/chat-ui/chat-context';
import { useEffect, useRef } from 'react';
import { MessageItem } from '@workspace/chat-ui/components/message-item';
import { MessageInput } from './message-input.js';

export const Messages = ({
  messages,
  channelId,
}: {
  messages: Message[];
  channelId: number;
}) => {
  const { messageSend, messageDelete } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSubmit = async ({ message }: MessageToSend) => {
    if (messageSend) {
      return messageSend({ message, channel_id: channelId });
    }

    return Promise.reject({
      error: true,
      message: 'Message send function not provided',
    });
  };

  return (
    <div className="relative h-screen">
      <div className="Messages h-full pb-16">
        <div className="p-2 overflow-y-auto">
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
      {messageSend && (
        <div className="p-2 absolute bottom-0 left-0 w-full">
          <MessageInput onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};
