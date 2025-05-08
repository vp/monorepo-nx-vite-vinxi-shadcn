import type { Meta, StoryObj } from '@storybook/react';
import { MessagesHeader } from '@workspace/chat-ui/components/messages-header';

const meta: Meta<typeof MessagesHeader> = {
  component: MessagesHeader,
  title: 'MessagesHeader',
};
export default meta;
type Story = StoryObj<typeof MessagesHeader>;

export const Primary = {
  args: {
   channel: {
    slug: 'Chat channel'
   }
  },
};
