import { SupabaseClient } from '@supabase/supabase-js';

export const refreshSession = async (supabase: SupabaseClient) => {
  // Inside userMiddleware or before critical operations
  try {
    // Attempt to refresh the session if needed
    const data = await supabase.auth.refreshSession();

    return {
      error: false,
      message: 'Session refreshed successfully',
      data,
    };
  } catch (error) {
    // Handle refresh errors
    return {
      error: true,
      message: 'Session refresh failed',
      details: error,
    };
  }
};
