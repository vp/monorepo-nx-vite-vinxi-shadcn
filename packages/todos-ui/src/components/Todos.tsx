import { TodoAddForm } from '@workspace/todos-ui/components/TodoAddForm';
import { TodoList } from '@workspace/todos-ui/components/TodoList';
import {
  Todo,
  TodoOnAdd,
  TodoOnDelete,
  TodoOnUpdate,
} from '@workspace/todos-ui/types';
import { TodoAlert } from './TodoAlert.js';

export const Todos = ({
  todos,
  onDelete,
  onUpdate,
  onAdd,
}: {
  todos: Todo[];
  onDelete: TodoOnDelete;
  onUpdate: TodoOnUpdate;
  onAdd: TodoOnAdd;
}) => {
  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>
      <TodoAddForm onSubmit={onAdd} />
      <TodoAlert message="Todo added successfully!" />
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
};
