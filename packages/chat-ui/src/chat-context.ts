import { createContext, useContext } from 'react';
import {
  ChannelWithLink,
  ChannelOnAdd,
  ChannelOnDelete,
  User,
} from '@workspace/chat-ui/types';

export type ChatContextValue = {
  user?: User;
  channels?: ChannelWithLink[];
  channelAdd?: ChannelOnAdd;
  deleteChannel?: ChannelOnDelete;
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

export const useChatUser = () => {
  const { user } = useChatContext();

  return user;
};
