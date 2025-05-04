import { TodoAddForm } from '@workspace/todos-ui/components/TodoAddForm';
import { TodoList } from '@workspace/todos-ui/components/TodoList';
import {
  Todo,
  TodoOnAdd,
  TodoOnDelete,
  TodoOnUpdate,
} from '@workspace/todos-ui/types';
import { Spinner } from '@workspace/ui/components/ui/spinner';
import { Alert, AlertTitle } from '@workspace/ui/components/ui/alert';

export const Todos = ({
  todos,
  onDelete,
  onUpdate,
  onAdd,
  isLoading,
  errors,
}: {
  todos?: Todo[] | null;
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
  onAdd: TodoOnAdd;
  isLoading?: boolean;
  errors?: string[];
}) => {

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <TodoAddForm onSubmit={onAdd} />

      {errors &&
        errors.map((error) => (
          <Alert key={error} variant="destructive">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        ))}

      <div className="mb-4">
        {todos && (
          <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
};
