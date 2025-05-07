import { createContext, useContext } from 'react';
import {
  ChannelWithLink,
  ChannelOnAdd,
  ChannelOnDelete,
  MessageOnAdd,
  MessageOnDelete,
} from '@workspace/chat-ui/types';

export type ChatContextValue = {
  user?: { id: number; role: string };
  channels?: ChannelWithLink[];
  channelAdd?: ChannelOnAdd;
  deleteChannel?: ChannelOnDelete;
  messageSend?: MessageOnAdd;
  messageDelete?: MessageOnDelete;
};

export const ChatContext = createContext<ChatContextValue>({
  user: undefined,
  channels: undefined,
});

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const useUser = () => {
  const { user } = useChatContext();
  return user;
};
