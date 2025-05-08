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
    <div className="flex-grow overflow-y-auto bg-slate-50">
      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-4">
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
    </div>
    //   {messageSend && (
    //     <div className="p-2 absolute bottom-0 left-0 w-full">
    //         asdfasdf
    //       <MessageInput onSubmit={handleSubmit} />
    //     </div>
    //   )}
    // </div>
  );
};
