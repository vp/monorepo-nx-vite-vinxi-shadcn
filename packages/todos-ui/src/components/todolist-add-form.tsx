import { useAppForm } from '@workspace/form/hooks/form';
import { TodolistOnAdd } from '@workspace/todos-ui/types';
import { z } from 'zod';

const schema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
  })
  .required();

export const TodolistAddForm = ({ onSubmit }: { onSubmit?: TodolistOnAdd }) => {
  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
    },
    validators: {
      onBlur: schema,
    },
    onSubmit: async ({ formApi, value }) => {
      if (onSubmit) {
        const result = await onSubmit(value);

        if (result.error) {
          form.setFieldMeta('title', (meta) => ({
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
        <form.AppField name="title">
          {(field) => <field.TextField label="Title" />}
        </form.AppField>

        <form.AppField name="description">
          {(field) => <field.TextField label="Description" />}
        </form.AppField>

        <div className="flex justify-end">
          <form.AppForm>
            <form.SubscribeButton label="Add todo list" />
          </form.AppForm>
        </div>
      </div>
    </form>
  );
};
