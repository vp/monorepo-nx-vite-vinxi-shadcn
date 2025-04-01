import { SupabaseClient } from '@supabase/supabase-js';

export const getUser = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return {
    email: data.user.email,
    firstName: data.user.user_metadata.first_name,
    lastName: data.user.user_metadata.last_name,
  };
};
