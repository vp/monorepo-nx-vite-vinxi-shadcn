import { SupabaseClient } from '@supabase/supabase-js';

export type Todo = {
  id: number;
  inserted_at: string;
  is_complete: boolean | null;
  task: string | null;
  user_id: string;
};

export const getTodos = async (
  supabase: SupabaseClient
): Promise<Todo[] | null> => {
  const { data } = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: true });

  return data;
};
