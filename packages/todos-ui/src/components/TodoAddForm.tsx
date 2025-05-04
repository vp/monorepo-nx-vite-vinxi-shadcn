import { useAppForm } from '@workspace/form/hooks/form';
import { TodoToAdd } from '@workspace/todos-ui/types';
import { z } from 'zod';

const schema = z
  .object({
    task: z.string().min(1, 'Task is required'),
    is_complete: z.boolean().optional(),
  })
  .required();

export const TodoAddForm = ({
  onSubmit,
}: {
  onSubmit?: (todo: TodoToAdd) => void;
}) => {
  const form = useAppForm({
    defaultValues: {
      task: '',
      is_complete: false,
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: ({ value }) => {
      if (onSubmit) {
        onSubmit(value);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 m-x-4">
        <form.AppField name="task">
          {(field) => <field.TextField label="New task" />}
        </form.AppField>

        <div className="flex justify-end">
          <form.AppForm>
            <form.SubscribeButton label="Add" />
          </form.AppForm>
        </div>
      </div>
    </form>
  );
};
