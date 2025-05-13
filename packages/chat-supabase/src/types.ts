import { Database } from '@workspace/chat-supabase/database.types';

export type User = Database['chat_app']['Tables']['users']['Row'];
export type UserProfile = Omit<User, 'id' | 'inserted_at'> & { roles: Database['chat_app']['Enums']['app_role'][] };
export type UserToAdd = Required<Omit<User, 'id' | 'inserted_at'>>;
export type UserUpdateUsername = Required<Omit<User, 'inserted_at' | 'status'>>;
export type UserUpdateStatus = Required<Omit<User, 'inserted_at' | 'username'>>;

export type Channel = Database['chat_app']['Tables']['channels']['Row'];
export type ChannelToAdd = Required<Omit<Channel, 'id' | 'inserted_at'>>;
export type ChannelToUpdate = Required<Omit<Channel, 'inserted_at'>>;
export type ChannelToDelete = { channel_id: number; user_id: string };

export type Message = Database['chat_app']['Tables']['messages']['Row'] & {
  author: { username: string | null };
};

export type MessageToAdd = Required<
  Omit<Message, 'id' | 'inserted_at' | 'author'>
>;
export type MessageToUpdate = Required<
  Omit<Message, 'user_id' | 'inserted_at' | 'channel_id' | 'author'>
>;
export type MessageToDelete = { message_id: number; user_id: string };

export type UserRole = Database['chat_app']['Tables']['user_roles']['Row'];

export type RolePermission =
  Database['chat_app']['Tables']['role_permissions']['Row'];

export type Permission =
  Database['chat_app']['Tables']['role_permissions']['Row']['permission'];

export type UserStatus =
  Database['chat_app']['Tables']['users']['Row']['status'];

export type MessageChangeEvent = {
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  data: Message | null;
};

export type ChannelChangeEvent = {
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  data: Channel | null;
};

export type UserChangeEvent = {
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  data: User | null;
};
