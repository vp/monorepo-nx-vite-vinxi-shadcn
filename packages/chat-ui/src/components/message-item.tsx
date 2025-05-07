import { TrashIcon } from '@workspace/chat-ui/components/trash-icon';
import { useUser } from '@workspace/chat-ui/chat-context';
import { Message, MessageOnDelete } from '@workspace/chat-ui/types';

export const MessageItem = ({
  message,
  onDeleteMessage,
}: {
  message: Message;
  onDeleteMessage?: MessageOnDelete;
}) => {
  const user = useUser();

  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.user_id ||
          (user && ['admin', 'moderator'].includes(user.role))) &&
          onDeleteMessage && (
            <button onClick={() => onDeleteMessage({ id: message.id })}>
              <TrashIcon />
            </button>
          )}
      </div>
      <div>
        <p className="text-blue-700 font-bold">{message.author?.username}</p>
        <p className="text-white">{message.message}</p>
      </div>
    </div>
  );
};
