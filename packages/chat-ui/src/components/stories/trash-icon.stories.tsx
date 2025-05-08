import type { Meta, StoryObj } from '@storybook/react';
import { TrashIcon } from '@workspace/chat-ui/components/trash-icon';

const meta: Meta<typeof TrashIcon> = {
  component: TrashIcon,
  title: 'TrashIcon',
};
export default meta;
type Story = StoryObj<typeof TrashIcon>;

export const Primary = {
  args: {
    size: 30,
  },
};
