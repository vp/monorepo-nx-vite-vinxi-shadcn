import { SupabaseClient } from '@supabase/supabase-js';

export type UpdateUserRequest = {
  id: string;
  firstName?: string;
  lastName?: string;
};

export const updateUser = async (
  supabase: SupabaseClient,
  data: UpdateUserRequest
) => {
  console.log('updateUser, data', data);
  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
    },
  });

  console.log('[update]', data, error);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User updated successfully',
  };
};
