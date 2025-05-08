import { PropsWithChildren } from 'react';
import { ChannelContext, ChannelContextValue } from '@workspace/chat-ui/channel-context';


export const ChannelProvider = ({
  children,
  ...value
}: PropsWithChildren & ChannelContextValue) => (
  <ChannelContext.Provider value={value}>
    {children}
  </ChannelContext.Provider>
);
