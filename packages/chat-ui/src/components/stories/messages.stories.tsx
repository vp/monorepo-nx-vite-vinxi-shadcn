import type { Meta, StoryObj } from '@storybook/react';
import { Messages } from '@workspace/chat-ui/components/messages';

const meta: Meta<typeof Messages> = {
  component: Messages,
  title: 'Messages',
};
export default meta;
type Story = StoryObj<typeof Messages>;

const MESSAGES = [
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 1' },
    id: 0,
    channel_id: 0,
    user_id: '0',
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 2' },
    id: 1,
    channel_id: 0,
    user_id: '1',
    inserted_at: '',
  },
];

export const Primary: Story = {
  args: {
    messages: MESSAGES,
    channelId: 0,
  
  },
};
