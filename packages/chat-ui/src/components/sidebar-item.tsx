import { ChannelWithLink, ChannelToDelete } from '@workspace/chat-ui/types';
import { Link } from '@tanstack/react-router';
import { useUser } from '@workspace/chat-ui/chat-context';
import { Button } from '@workspace/ui/components/ui/button';
import { HashIcon, TrashIcon } from 'lucide-react';

export const SidebarItem = ({
  channel: { id, slug, created_by, link },
  onDeleteChannel,
}: {
  channel: ChannelWithLink;
  onDeleteChannel?: (data: ChannelToDelete) => Promise<void>;
}) => {
  const user = useUser();
  const showDeleteButton = onDeleteChannel && id !== 1 && (created_by === user?.id || user?.role === 'admin');

  return (
    <div className="flex items-center gap-2">
      <Link
        {...link}
        activeOptions={{ exact: true }}
        className="flex-grow flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 dark:text-gray-50 dark:hover:bg-gray-700"
      >
        <HashIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        {slug}
      </Link>
      {showDeleteButton && (
        <Button 
          onClick={async (e) => {
            e.preventDefault();
            await onDeleteChannel({ id });
          }} 
          variant="ghost" 
          className="m-0 p-0 min-w-[24px]"
        >
          <TrashIcon size={10}/>
        </Button>
      )}
    </div>
  );
};
