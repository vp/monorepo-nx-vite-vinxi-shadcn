import { SupabaseClient } from '@supabase/supabase-js';
import { Todolist } from '@workspace/todos-supabase/get-todolists';

// Function to get a single todolist with its todos
export const getTodolistById = async (
  supabase: SupabaseClient,
  id: number
): Promise<Todolist | null> => {
  const { data } = await supabase
    .from('todolists')
    .select(`
      *,
      todos(*)
    `)
    .eq('id', id)
    .single();

  return data;
};
