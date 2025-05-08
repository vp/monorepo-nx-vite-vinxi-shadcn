import { KeyboardEvent, useState } from 'react';
import { MessageOnSend } from '@workspace/chat-ui/types';
import { Input } from '@workspace/ui/components/ui/input';
import { Button } from '@workspace/ui/components/ui/button';
import { SendIcon } from 'lucide-react';

export const MessageInput = ({ onSubmit }: { onSubmit: MessageOnSend }) => {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = async () => {
    if (!messageText) {
      return Promise.reject({
        error: true,
        message: 'Message is empty',
      });
    }

    if (onSubmit) {
      const result = await onSubmit({ message: messageText });
      setMessageText('');
      return result;
    }

    return Promise.reject({
      error: true,
      message: 'Message send function not provided',
    });
  };

  const submitOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    // Watch for enter key
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex shrink-0 items-center border-t bg-white pl-4 pr-8 py-4 dark:border-gray-800 dark:bg-gray-950">
      <Input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => submitOnEnter(e)}
        placeholder="Type your message..."
        className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-sm shadow-sm dark:bg-gray-800"
      />
      <Button
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={() => handleSubmit()}
      >
        <SendIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};
