import { SupabaseClient } from '@supabase/supabase-js';

export type UpdateAvatarRequest = {
  id: string;
  avatarUrl?: string;
};

export const updateAvatar = async (
  supabase: SupabaseClient,
  data: UpdateAvatarRequest
) => {
  console.log('updateAvatar, data', data);
  const { error } = await supabase.auth.updateUser({
    data: {
      avatar_url: data.avatarUrl,
    },
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User avatar updated successfully',
  };
};
