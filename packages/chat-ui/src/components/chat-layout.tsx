import { PropsWithChildren } from 'react';
import { Sidebar } from '@workspace/chat-ui/components/sidebar';
import { useChatContext } from '../chat-context.js';

export const ChatLayout = ({ children }: PropsWithChildren) => {
  const {channels, channelAdd, deleteChannel} = useChatContext();

    return (
        <main className="main flex h-screen w-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar  
            channels={channels}
            onChannelAdd={channelAdd}
            onChannelDelete={deleteChannel}
          />   
    
          {/* Messages */}
          <div className="flex-1 bg-gray-800 h-screen">{children}</div>
        </main>
      )
};
