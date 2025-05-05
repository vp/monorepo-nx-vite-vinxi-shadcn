import { TodoAddForm } from '@workspace/todos-ui/components/todo-add-form';
import { TodosList } from '@workspace/todos-ui/components/todos-list';
import {
  Todo,
  TodoOnAdd,
  TodoOnDelete,
  TodoOnUpdate,
} from '@workspace/todos-ui/types';
import { Alert, AlertTitle } from '@workspace/ui/components/ui/alert';

export const Todos = ({
  todos,
  onDelete,
  onUpdate,
  onAdd,
  errors,
}: {
  todos?: Todo[] | null;
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
  onAdd: TodoOnAdd;
  errors?: string[];
}) => (
  <div className="w-full">
    {errors &&
      errors.map((error) => (
        <Alert key={error} variant="destructive">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      ))}

    <div className="mb-4">
      {todos && (
        <TodosList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      )}
    </div>

    <TodoAddForm onSubmit={onAdd} />
  </div>
);
  
