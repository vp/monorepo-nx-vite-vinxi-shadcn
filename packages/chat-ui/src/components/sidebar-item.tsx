import {
  ChannelWithLink,
  ChannelToDelete,
} from '@workspace/chat-ui/types';
import { TrashIcon } from '@workspace/chat-ui/components/trash-icon';
import { Link } from '@tanstack/react-router';
import { useUser } from '@workspace/chat-ui/chat-context';
import { Button } from '@workspace/ui/components/ui/button';

export const SidebarItem = ({
  channel: { id, slug, created_by, link },
  onDeleteChannel,
}: {
  channel: ChannelWithLink;
  onDeleteChannel: (data: ChannelToDelete) => Promise<void>;
}) => {
  const user = useUser();

  return (
    <li className="flex items-center justify-between">
      <Link {...link} activeOptions={{ exact: true }}>
        {slug}
      </Link>
      {onDeleteChannel &&
        id !== 1 &&
        (created_by === user?.id || user?.role === 'admin') && (
          <Button onClick={async () => onDeleteChannel({ id })}>
            <TrashIcon />
          </Button>
        )}
    </li>
  );
};
