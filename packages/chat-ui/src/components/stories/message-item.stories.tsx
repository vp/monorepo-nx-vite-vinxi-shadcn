import type { Meta, StoryObj } from '@storybook/react';
import { MessageItem } from '@workspace/chat-ui/components/message-item';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ChatProvider } from '@workspace/chat-ui/components/chat-provider';
import { action } from '@storybook/addon-actions';
import { MessageOnDelete } from '@workspace/chat-ui/types';

const meta: Meta<typeof MessageItem> = {
  component: MessageItem,
  title: 'MessageItem',
};
export default meta;
type Story = StoryObj<typeof MessageItem>;

const MESSAGE = {
  message: 'Welcome to MessageItem!',
  author: { username: 'User 1' },
  id: 0,
  channel_id: 0,
  user_id: '0',
  inserted_at: '',
};

export const Primary = {
  args: {
    message: MESSAGE,
    onDeleteMessage: action('onDeleteMessage') as MessageOnDelete,
  },
};

export const NotUserMessage: Story = {
  args: {
    message: { ...MESSAGE, user_id: '1' },
    onDeleteMessage: action('onDeleteMessage') as MessageOnDelete,
  },
  decorators: [
    (Story) => (
      <ChatProvider user={{ id: '0', role: 'member' }}>
        <Story />
      </ChatProvider>
    ),
  ],
};

export const UserIsAdmin: Story = {
  args: {
    message: MESSAGE,
    onDeleteMessage: action('onDeleteMessage') as MessageOnDelete,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MessageItem!/gi)).toBeTruthy();
  },
  decorators: [
    (Story) => (
      <ChatProvider user={{ id: '1', role: 'admin' }}>
        <Story />
      </ChatProvider>
    ),
  ],
};

export const UserIsAuthor: Story = {
  args: {
    message: { ...MESSAGE, user_id: '1' },
    onDeleteMessage: action('onDeleteMessage') as MessageOnDelete,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MessageItem!/gi)).toBeTruthy();
  },
  decorators: [
    (Story) => (
      <ChatProvider user={{ id: '1', role: 'member' }}>
        <Story />
      </ChatProvider>
    ),
  ],
};
