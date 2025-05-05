import { useAppForm } from '@workspace/form/hooks/form';
import { TodoOnAdd } from '@workspace/todos-ui/types';
import { z } from 'zod';

const schema = z
  .object({
    task: z.string().min(1, 'Task is required'),
    is_complete: z.boolean().optional(),
  })
  .required();

export const TodoAddForm = ({ onSubmit }: { onSubmit?: TodoOnAdd }) => {
  const form = useAppForm({
    defaultValues: {
      task: '',
      is_complete: false,
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: async ({ formApi, value }) => {
      if (onSubmit) {
        const result = await onSubmit(value);

        if (result.error) {
          form.setFieldMeta('task', (meta) => ({
            ...meta,
            errorMap: { ...meta.errorMap, onSubmit: result.message },
          }));
        } else {
          formApi.reset();
        }
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
