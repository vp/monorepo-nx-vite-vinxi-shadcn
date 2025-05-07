import { KeyboardEvent, useState } from 'react';
import { MessageOnSend } from '../types.js';

export const MessageInput = ({ onSubmit }: { onSubmit: MessageOnSend }) => {
  const [messageText, setMessageText] = useState('');

  const submitOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    // Watch for enter key
    if (event.key === 'Enter') {
      onSubmit({ message: messageText });
      setMessageText('');
    }
  };

  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Send a message"
      value={messageText}
      onChange={(e) => setMessageText(e.target.value)}
      onKeyDown={(e) => submitOnEnter(e)}
    />
  );
};