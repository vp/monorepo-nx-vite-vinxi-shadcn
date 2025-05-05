import { Todo, TodoOnDelete, TodoOnUpdate } from '@workspace/todos-ui/types';
import { TodoItem } from '@workspace/todos-ui/components/todo-item';

export const TodosList = ({
  todos,
  onDelete,
  onUpdate,
}: {
  todos: Todo[];
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};
