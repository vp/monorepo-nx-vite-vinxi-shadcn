import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@workspace/chat-ui/components/sidebar';

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
  },
  {
    id: 1,
    slug: 'Channel 2',
  },
];

export const Primary = {
  args: {
    channels: CHANNELS,
    onChannelAdd: () => Promise.resolve({ error: false }),
    onChannelDelete: () => Promise.resolve({ error: false }),
  },
};
