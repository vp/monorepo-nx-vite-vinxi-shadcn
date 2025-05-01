import { SupabaseClient } from '@supabase/supabase-js';

export const signOut = async (supabase: SupabaseClient) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Sign out successful',
  };
};
