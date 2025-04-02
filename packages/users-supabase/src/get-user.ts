import { SupabaseClient } from '@supabase/supabase-js';

export const getUser = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getUser();

  if (!data.user?.email) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
    firstName: data.user.user_metadata.first_name as string,
    lastName: data.user.user_metadata.last_name as string,
  };
};
