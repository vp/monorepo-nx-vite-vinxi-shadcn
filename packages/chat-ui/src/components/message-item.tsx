import { TrashIcon } from '@workspace/chat-ui/components/trash-icon';
import { useUser } from '@workspace/chat-ui/chat-context';
import { Message, MessageOnDelete } from '@workspace/chat-ui/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';

export const MessageItem = ({
  message,
  onDeleteMessage,
}: {
  message: Message;
  onDeleteMessage?: MessageOnDelete;
}) => {
  const user = useUser();

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <span>{message.author?.username}</span>
        <span className="text-gray-500 dark:text-gray-400">12:34 PM</span>
        <div className="w-4">
          {(user?.id === message.user_id ||
            (user && ['admin', 'moderator'].includes(user.role))) &&
            onDeleteMessage && (
              <button onClick={() => onDeleteMessage({ id: message.id })}>
                <TrashIcon />
              </button>
            )}
        </div>
      </div>
      <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <p>{message.message}</p>
      </div>
    </div>
  );
};
