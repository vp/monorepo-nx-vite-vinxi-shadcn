import { SupabaseClient } from '@supabase/supabase-js';

export type SignUpRequest = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export const signUp = async (supabase: SupabaseClient, data: SignUpRequest) => {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
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
    message: 'Sign up successful',
  };
};
