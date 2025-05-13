import {
  ChannelWithLink,
  ChannelOnAdd,
  ChannelOnDelete,
  ChannelToDelete,
} from '@workspace/chat-ui/types';
import { SidebarItem } from '@workspace/chat-ui/components/sidebar-item';
import { Button } from '@workspace/ui/components/ui/button';
import { Spinner } from '@workspace/ui/components/ui/spinner';

export const Sidebar = ({
  channels,
  onChannelAdd,
  onChannelDelete,
}: {
  channels?: ChannelWithLink[];
  onChannelAdd?: ChannelOnAdd;
  onChannelDelete?: ChannelOnDelete;
}) => {
  const handleAddClick = () => {
    if (onChannelAdd) {
      void onChannelAdd({ slug: 'new-channel' });
    }
  };
  const handleDeleteClick = async (data: ChannelToDelete) => {
    if (onChannelDelete) {
      void onChannelDelete(data);
    }
  };

  if (!channels) {
    return <Spinner className="w-10 h-10" />;
  }

  return (
 
            <nav className="space-y-1">
              <div className="p-2 ">
                {onChannelAdd && (
                  <div className="p-2">
                    <Button
                      className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
                      onClick={handleAddClick}
                    >
                      New Channel
                    </Button>
                  </div>
                )}

                {channels.map((channel) => (
                  <SidebarItem
                    channel={channel}
                    key={channel.id}
                    onDeleteChannel={handleDeleteClick}
                  />
                ))}
              </div>
            </nav>
  );
};
