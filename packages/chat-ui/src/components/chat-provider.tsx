import { PropsWithChildren } from 'react';
import { ChatContext, ChatContextValue } from '@workspace/chat-ui/chat-context';


export const ChatProvider = ({
  children,
  ...value
}: PropsWithChildren & ChatContextValue) => (
  <ChatContext.Provider value={value}>
    {children}
  </ChatContext.Provider>
);
