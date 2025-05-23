import { createServerClient } from '@supabase/ssr';
import { addTodo, TodoToAdd } from '@workspace/todos-supabase/add-todo';
import { deleteTodo } from '@workspace/todos-supabase/delete-todo';
import { getTodos } from '@workspace/todos-supabase/get-todos';
import { TodoToUpdate, updateTodo } from '@workspace/todos-supabase/update-todo';

export const createTodosService = (
  createClient: ReturnType<typeof createServerClient>
) => ({
  addTodo: async (data: TodoToAdd) => addTodo(createClient(), data),
  updateTodo: async (data: TodoToUpdate) =>
    updateTodo(createClient(), data),
  getTodos: async () => getTodos(createClient()),
  deleteTodo: async (id: number) => deleteTodo(createClient(), id),
});

export type TodosService = ReturnType<typeof createTodosService>;
