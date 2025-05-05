import { SupabaseClient } from '@supabase/supabase-js';

export type Todolist = {
  id: number;
  inserted_at: string;
  title: string;
  description?: string | null;
  user_id: string;
};

export const getTodolists = async (
  supabase: SupabaseClient
): Promise<Todolist[] | null> => {
  const { data } = await supabase
    .from('todolists')
    .select(`
      *
    `)
    .order('id', { ascending: true });

  return data;
};
