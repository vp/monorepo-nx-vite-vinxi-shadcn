import { Todo, TodoToUpdate } from '@workspace/todos-ui/types';
import { TodoItem } from './TodoItem.js';

export const TodoList = ({
  todos,
  onDelete,
  onUpdate,
}: {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (todo: TodoToUpdate) => void;
}) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
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
    </div>
  );
};
