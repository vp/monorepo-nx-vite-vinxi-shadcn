import { PropsWithChildren } from 'react';
import { ChatContext } from '@workspace/chat-ui/chat-context';
import { User } from '@workspace/chat-ui/types';

export const ChatProvider = ({
  children,
  user,
}: PropsWithChildren & { user?: User }) => (
  <ChatContext.Provider value={{ user }}>
    {children}
  </ChatContext.Provider>
);
