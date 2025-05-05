import { SupabaseClient } from '@supabase/supabase-js';
import { User, UserRole } from '@workspace/chat-supabase/types';

export async function getUser(
  supabase: SupabaseClient,
  userId: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function updateUserStatus(
  supabase: SupabaseClient,
  userId: string,
  status: 'ONLINE' | 'OFFLINE'
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update({ status })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user status:', error);
    return null;
  }

  return data;
}

export async function updateUsername(
  supabase: SupabaseClient,
  userId: string,
  username: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update({ username })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating username:', error);
    return null;
  }

  return data;
}

// Role and permission functions
export async function getUserRoles(
  supabase: SupabaseClient,
  userId: string
): Promise<UserRole[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error(`Error fetching roles for user ${userId}:`, error);
    return [];
  }

  return data || [];
}

export async function hasPermission(
  supabase: SupabaseClient,
  userId: string,
  permission: 'channels.delete' | 'messages.delete'
): Promise<boolean> {
  // This function uses the custom authorize function defined in the SQL schema
  const { data, error } = await supabase.rpc('authorize', {
    requested_permission: permission,
    user_id: userId,
  });

  if (error) {
    console.error(
      `Error checking permission ${permission} for user ${userId}:`,
      error
    );
    return false;
  }

  return !!data;
}
