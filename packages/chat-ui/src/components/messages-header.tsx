import { Channel } from '@workspace/chat-ui/types';
import { HashIcon } from 'lucide-react';

export const MessagesHeader = ({ channel: { slug } }: { channel: Channel }) => {
  return (
    <div className="flex-none border-b p-4 h-16 sticky top-0 z-10 flex items-center">
      <HashIcon size={20} className="mr-2" />
      <span className="font-medium text-base">{slug}</span>
    </div>
  );
};