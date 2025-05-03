import { SupabaseClient } from '@supabase/supabase-js';
import { Todo } from '@workspace/todos-supabase/get-todos';

export type TodoToAdd = {
  is_complete?: boolean | null;
  task?: string | null;
  user_id: string;
};

export const addTodo = async (
  supabase: SupabaseClient,
  { is_complete, task, user_id }: TodoToAdd
) => {
  const { data, error } = await supabase
    .from('todos')
    .insert({
      is_complete,
      task,
      user_id,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding todo:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Todo added successfully',
    data: data as Todo,
  };
};
