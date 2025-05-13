import type { Meta, StoryObj } from '@storybook/react';
import { MessageInput } from '@workspace/chat-ui/components/message-input';
import { MessageOnSend } from '@workspace/chat-ui/types';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof MessageInput> = {
  component: MessageInput,
  title: 'MessageInput',
};
export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Primary: Story = {
  args: {
    onSubmit: action('onSubmit') as MessageOnSend,
  }
};
