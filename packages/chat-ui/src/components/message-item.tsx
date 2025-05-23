import { useChatUser } from '@workspace/chat-ui/chat-context';
import { Message, MessageOnDelete } from '@workspace/chat-ui/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';
import { Button } from '@workspace/ui/components/ui/button';
import { PersonStanding, TrashIcon } from 'lucide-react';

export const MessageItem = ({
  message,
  onDeleteMessage,
}: {
  message: Message;
  onDeleteMessage?: MessageOnDelete;
}) => {
  const user = useChatUser();

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>
            <PersonStanding />
          </AvatarFallback>
        </Avatar>
        <span>{message.author?.username} </span>
        <span className="text-gray-500 dark:text-gray-400">12:34 PM</span>
        <div className="w-4">
          {(user?.id === message.user_id ||
            (user?.roles &&
              user.roles.some((role) =>
                ['admin', 'moderator'].includes(role)
              ))) &&
            onDeleteMessage && (
              <Button
                onClick={() => onDeleteMessage({ id: message.id })}
                variant="ghost"
                className="m-0 p-0 min-w-[24px]"
              >
                <TrashIcon size={20} />
              </Button>
            )}
        </div>
      </div>
      <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
        <p>{message.message}</p>
      </div>
    </div>
  );
};
