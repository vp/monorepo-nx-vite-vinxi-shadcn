import { SupabaseClient } from '@supabase/supabase-js';
import { Todo } from '@workspace/todos-supabase/get-todos';
import { Todolist } from '@workspace/todos-supabase/get-todolists';

export type TodolistWithTodos = Todolist & {
  todos?: Todo[];
};

export const getTodolistsWithTodos = async (
  supabase: SupabaseClient
): Promise<TodolistWithTodos[] | null> => {
  const { data } = await supabase
    .from('todolists')
    .select(
      `
      *,
      todos(*)
    `
    )
    .order('inserted_at', { ascending: false })
    .order('task', { referencedTable: 'todos', ascending: true });

  return data;
};