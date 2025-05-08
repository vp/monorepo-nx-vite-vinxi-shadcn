import type { Meta, StoryObj } from '@storybook/react';
import { MessageInput } from '@workspace/chat-ui/components/message-input';

const meta: Meta<typeof MessageInput> = {
  component: MessageInput,
  title: 'MessageInput',
};
export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Primary = {
  args: {
    onSubmit: () => Promise.resolve({ error: false }),
  },
};
