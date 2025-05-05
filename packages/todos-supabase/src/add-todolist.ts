import { SupabaseClient } from '@supabase/supabase-js';
import { Todolist } from '@workspace/todos-supabase/get-todolists';
import {
  RequestResponse,
} from '@workspace/core/request';

export type TodolistToAdd = {
  title?: string | null;
  description?: string | null;
  user_id: string;
};

export const addTodolist = async (
  supabase: SupabaseClient,
  { title, description, user_id }: TodolistToAdd
): Promise<RequestResponse<Todolist>> => {
  const { data, error } = await supabase
    .from('todolists')
    .insert({
      title,
      description,
      user_id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding todo list:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Todo list added successfully',
    data: data as Todolist,
  };
};
