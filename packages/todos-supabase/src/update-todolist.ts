import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import { Todolist } from '@workspace/todos-supabase/get-todolists';
import { TodolistWithTodos } from './get-todolists-with-todos.js';

export type TodoListToUpdate = {
  id: number;
  title?: string | null;
  description?: string | null;
  user_id: string;
};

export const updateTodolist = async (
  supabase: SupabaseClient,
  { id, title, description, user_id }: TodoListToUpdate
): Promise<RequestResponse<TodolistWithTodos>> => {
  const { data, error } = await supabase
    .from('todolists')
    .update({
      title,
      description,
      user_id,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo list:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Todo list updated successfully',
    data: data as Todolist,
  };
};
