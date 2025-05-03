import { SupabaseClient } from "@supabase/supabase-js";
import { Todo } from '@workspace/todos-supabase/get-todos';

export type TodoToUpdate = {
  id: number;
  is_complete?: boolean | null;
  task?: string | null;
  user_id: string;
};

export const updateTodo = async (
  supabase: SupabaseClient,
  { id, is_complete, task, user_id }: TodoToUpdate
) => {
  const { data, error } = await supabase
    .from('todos')
    .update({
      is_complete,
      task,
      user_id,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Todo updated successfully',
    data: data as Todo,
  };
}