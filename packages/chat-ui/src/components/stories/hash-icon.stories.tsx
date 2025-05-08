import type { Meta, StoryObj } from '@storybook/react';
import { HashIcon } from '@workspace/chat-ui/components/hash-icon';

const meta: Meta<typeof HashIcon> = {
  component: HashIcon,
  title: 'HashIcon',
};
export default meta;
type Story = StoryObj<typeof HashIcon>;

export const Primary = {
  args: {
    size: 30,
  },
};
