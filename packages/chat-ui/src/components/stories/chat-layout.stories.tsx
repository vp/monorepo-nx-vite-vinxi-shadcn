import type { Meta, StoryObj } from '@storybook/react';
import { ChatLayout } from '@workspace/chat-ui/components/chat-layout';
import { MessagesHeader } from '../messages-header.js';
import { Messages } from '../messages.js';
import { MessageInput } from '../message-input.js';
import { ChatProvider } from '../chat-provider.js';

const CHANNELS = [
  {
    id: 0,
    slug: 'Channel 1',
    link: {
      to: '/channel/$channelId',
      params: { channelId: 1 },
    },
  },
  {
    id: 1,
    slug: 'Channel 2',
    link: {
      to: '/channel/$channelId',
      params: { channelId: 2 },
    },
  },
];

const meta: Meta<typeof ChatLayout> = {
  component: ChatLayout,
  title: 'ChatLayout',
  decorators: [
    (Story) => (
      <ChatProvider user={{ id: 1, role: 'admin' }} channels={CHANNELS}>
        <Story />
      </ChatProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

const CHANNEL = {
  slug: 'Chat channel',
  id: 1,
  created_by: 1,
  inserted_at: '',
};

const MESSAGES = [
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 1' },
    id: 0,
    channel_id: 0,
    user_id: 0,
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 2' },
    id: 1,
    channel_id: 0,
    user_id: 1,
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 1' },
    id: 0,
    channel_id: 0,
    user_id: 0,
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 2' },
    id: 1,
    channel_id: 0,
    user_id: 1,
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 1' },
    id: 0,
    channel_id: 0,
    user_id: 0,
    inserted_at: '',
  },
  {
    message: 'Welcome to MessageItem!',
    author: { username: 'User 2' },
    id: 1,
    channel_id: 0,
    user_id: 1,
    inserted_at: '',
  },
];

export const Primary = {
  args: {
    channels: [],
    children: (
      <>
        <MessagesHeader channel={CHANNEL} />
        <Messages messages={MESSAGES} channelId={1} />
        <MessageInput
          onSubmit={() => Promise.resolve({ error: true, message: '' })}
        />
      </>
    ),
  },
};
