import { SupabaseClient } from '@supabase/supabase-js';
import { SimpleRequestResponse } from '@workspace/core/request';

export const deleteTodo = async (supabase: SupabaseClient, id: number) : Promise<SimpleRequestResponse> => {
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);

    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Todo deleted successfully',
  };
};
