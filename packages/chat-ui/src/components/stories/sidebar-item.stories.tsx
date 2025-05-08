import type { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from '@workspace/chat-ui/components/sidebar-item';

const meta: Meta<typeof SidebarItem> = {
  component: SidebarItem,
  title: 'SidebarItem',
  argTypes: {
    onDeleteChannel: { action: 'onDeleteChannel executed!' },
  },
};
export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Primary = {
  args: {
    channel: '',
  },
};

