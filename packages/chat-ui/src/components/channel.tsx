import { useChannelContext } from '@workspace/chat-ui/channel-context';
import { MessageInput } from '@workspace/chat-ui/components/message-input';
import { MessagesHeader } from '@workspace/chat-ui/components/messages-header';
import { Messages } from '@workspace/chat-ui/components/messages';
import { MessageToSend } from '../types.js';

export const Channel = () => {
  const { channel, messages, messageSend } = useChannelContext();

  const handleMessageSend = async ({message}: MessageToSend) => {
    if (messageSend) {
      return messageSend({ 
        message: message,
        channelId: channel.id,
      });
    }

    return Promise.reject(new Error('Message send function not available'));
  };


  return (
    <>
      <MessagesHeader channel={channel} />
      {messages && <Messages messages={messages} channelId={channel.id} />}
      {messageSend && <div className="mb-14">
        <MessageInput
          onSubmit={handleMessageSend}
        />
      </div>}
    </>
  );
};
