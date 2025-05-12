import { createServerClient } from '@supabase/ssr';
import { addTodolist, TodolistToAdd } from '@workspace/todos-supabase/add-todolist';
import { deleteTodolist } from '@workspace/todos-supabase/delete-todolist';
import { getTodolists } from '@workspace/todos-supabase/get-todolists';
import { getTodolistsWithTodos } from '@workspace/todos-supabase/get-todolists-with-todos';
import { getTodolistById } from '@workspace/todos-supabase/get-todolist-by-id';
import { TodoToUpdate } from '@workspace/todos-supabase/update-todo';
import { updateTodolist } from '@workspace/todos-supabase/update-todolist';

export const createTodolistsService = (
  createClient: ReturnType<typeof createServerClient>
) => ({
  addTodolist: async (data: TodolistToAdd) => addTodolist(createClient(), data),
  updateTodolist: async (data: TodoToUpdate) =>
    updateTodolist(createClient(), data),
  getTodolists: async () => getTodolists(createClient()),
  getTodolistsWithTodos: async () => getTodolistsWithTodos(createClient()),
  getTodolistById: async (id: number) => getTodolistById(createClient(), id),
  deleteTodolist: async (id: number) => deleteTodolist(createClient(), id),
});

export type TodolistsService = ReturnType<typeof createTodolistsService>;
