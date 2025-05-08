import { createContext, useContext } from 'react';
import {
  Channel,
  Message,
  MessageOnAdd,
  MessageOnDelete,
} from '@workspace/chat-ui/types';

export type ChannelContextValue = {
  channel: Channel;
  messages?: Message[];
  messageSend?: MessageOnAdd;
  messageDelete?: MessageOnDelete;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const ChannelContext = createContext<ChannelContextValue>(null!);

export const useChannelContext = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannelContext must be used within a ChannelProvider');
  }

  return context;
};
