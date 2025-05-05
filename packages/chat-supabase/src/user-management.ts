import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import { User, UserRole } from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';

export async function getUser(
  supabase: SupabaseClient,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User fetched successfully',
    data: data as User,
  };
}

export async function updateUserStatus(
  supabase: SupabaseClient,
  userId: string,
  status: 'ONLINE' | 'OFFLINE',
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('users')
    .update({ status })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user status:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User status updated successfully',
    data: data as User,
  };
}

export async function updateUsername(
  supabase: SupabaseClient,
  userId: string,
  username: string,
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('users')
    .update({ username })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating username:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Username updated successfully',
    data: data as User,
  };
}

// Role and permission functions
export async function getUserRoles(
  supabase: SupabaseClient,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<UserRole[]>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('user_roles')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user roles:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User roles fetched successfully',
    data: data as UserRole[],
  };
}

export async function hasPermission(
  supabase: SupabaseClient,
  userId: string,
  permission: 'channels.delete' | 'messages.delete',
  schema = 'chat_app'
): Promise<RequestResponse<boolean>> {
  // This function uses the custom authorize function defined in the SQL schema
  // Note: for RPC calls, we need to use schemaName parameter instead of schema method
  const { data, error } = await supabase.rpc('authorize', {
    requested_permission: permission,
    user_id: userId,
    schemaName: schema, // Pass schema as a parameter to the RPC function
  });

  if (error) {
    console.error(
      `Error checking permission ${permission} for user ${userId}:`,
      error
    );
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: `Permission ${permission} check completed`,
    data: !!data,
  };
}

export const createUserManagementService = (
  createClient: ReturnType<typeof createServerClient>,
  schema = 'chat_app'
) => ({
  getUser: (userId: string) => getUser(createClient(), userId, schema),
  updateUserStatus: (userId: string, status: 'ONLINE' | 'OFFLINE') =>
    updateUserStatus(createClient(), userId, status, schema),
  updateUsername: (userId: string, username: string) =>
    updateUsername(createClient(), userId, username, schema),
  getUserRoles: (userId: string) =>
    getUserRoles(createClient(), userId, schema),
  hasPermission: (
    userId: string,
    permission: 'channels.delete' | 'messages.delete'
  ) => hasPermission(createClient(), userId, permission, schema),
});

export type UserManagementService = ReturnType<
  typeof createUserManagementService
>;
