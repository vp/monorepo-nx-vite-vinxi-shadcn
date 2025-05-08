import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@workspace/chat-ui/components/sidebar';
import { Channel, ChannelToAdd } from '@workspace/chat-ui/types';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Sidebar',
};
export default meta;
type Story = StoryObj<typeof Sidebar>;
const CHANNELS = [
  {
    id: 0,
    slug: 'Channel 1',
    created_by: 1,
    inserted_at: '',
    link: {
      to: '/channel/$channelId',
      params: { channelId: 1 },
    },
  },
  {
    id: 1,
    slug: 'Channel 2',
    created_by: 1,
    inserted_at: '',
    link: {
      to: '/channel/$channelId',
      params: { channelId: 2 },
    },
  },
];

export const Primary: Story = {
  args: {
    channels: CHANNELS,
    onChannelAdd: (channel: ChannelToAdd) => Promise.resolve({ error: false, data: channel as Channel }),
    onChannelDelete: () => Promise.resolve({ error: false }),
  },
};
