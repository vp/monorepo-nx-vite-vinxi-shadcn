import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import {
  User,
  Permission,
  UserRole,
  UserUpdateStatus,
  UserUpdateUsername,
  UserProfile,
} from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@workspace/chat-supabase/database.types';

export async function getUser(
  supabase: SupabaseClient<Database>,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('users')
    .select('id, username, status')
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
    data,
  };
}

export async function getUserProfile(
  supabase: SupabaseClient<Database>,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<UserProfile>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('users')
    .select('username, status, roles:user_roles(role)')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'User profile fetched successfully',
    data: {
      ...data,
      roles: Array.isArray(data.roles)
        ? data.roles.map((r: { role: 'admin' | 'moderator' }) => r.role)
        : [],
    },
  };
}

export async function updateUserStatus(
  supabase: SupabaseClient<Database>,
  { id, status }: UserUpdateStatus,
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('users')
    .update({ status })
    .eq('id', id)
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
    data,
  };
}

export async function updateUsername(
  supabase: SupabaseClient<Database>,
  { id, username }: UserUpdateUsername,
  schema = 'chat_app'
): Promise<RequestResponse<User>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('users')
    .update({ username })
    .eq('id', id)
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
    data,
  };
}

// Role and permission functions
export async function getUserRoles(
  supabase: SupabaseClient<Database>,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<UserRole[]>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
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
    data,
  };
}

export async function hasPermission(
  supabase: SupabaseClient<Database>,
  userId: string,
  permission: Permission,
  schema = 'chat_app'
): Promise<RequestResponse<boolean>> {
  // This function uses the custom authorize function defined in the SQL schema
  // Note: for RPC calls, we need to use schemaName parameter instead of schema method
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .rpc('authorize', {
      requested_permission: permission,
      user_id: userId,
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
  getUserProfile: (userId: string) =>
    getUserProfile(createClient(), userId, schema),
  updateUserStatus: (data: UserUpdateStatus) =>
    updateUserStatus(createClient(), data, schema),
  updateUsername: (data: UserUpdateUsername) =>
    updateUsername(createClient(), data, schema),
  getUserRoles: (userId: string) =>
    getUserRoles(createClient(), userId, schema),
  hasPermission: (userId: string, permission: Permission) =>
    hasPermission(createClient(), userId, permission, schema),
});

export type UserManagementService = ReturnType<
  typeof createUserManagementService
>;
