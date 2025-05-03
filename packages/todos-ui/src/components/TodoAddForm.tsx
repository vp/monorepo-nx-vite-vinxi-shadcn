import { useAppForm } from '@workspace/form/hooks/form';
import { TodoOnAdd, TodoToAdd } from '@workspace/todos-ui/types';
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
      console.log(value);

      if (onSubmit) {
        onSubmit(value);
      }

      // Show success message
      alert('Form submitted successfully!');
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
      <form.AppField name="task">
        {(field) => <field.TextField label="Title" />}
      </form.AppField>

      <div className="flex justify-end">
        <form.AppForm>
          <form.SubscribeButton label="Add" />
        </form.AppForm>
      </div>
    </form>
  );
};
