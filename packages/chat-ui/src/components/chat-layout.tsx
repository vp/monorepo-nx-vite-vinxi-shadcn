import { PropsWithChildren } from 'react';
import { Sidebar } from '@workspace/chat-ui/components/sidebar';
import { useChatContext } from '../chat-context.js';
import { Link } from '@tanstack/react-router';
import { MessageSquare } from 'lucide-react';

export const ChatLayout = ({ children }: PropsWithChildren) => {
  const { channels, channelAdd, deleteChannel } = useChatContext();

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex-1 overflow-auto">
          <header className="flex h-16 shrink-0 items-center justify-between px-4 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                <span className="font-semibold">Chat</span>
              </Link>
            </div>
          </header>
          <div className="space-y-2 py-4 px-0 min-w-[200px]">
            <Sidebar
              channels={channels}
              onChannelAdd={channelAdd}
              onChannelDelete={deleteChannel}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
