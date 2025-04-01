import { SupabaseClient } from '@supabase/supabase-js';

export type SignInRequest = {
  email: string;
  password: string;
};

export const signIn = async (supabase: SupabaseClient, data: SignInRequest) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Logged in',
  };
};
