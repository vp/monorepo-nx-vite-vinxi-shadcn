export type User = {
  id: string;
  username: string | null;
  status: 'ONLINE' | 'OFFLINE';
};

export type Channel = {
  id: number;
  inserted_at: string;
  slug: string;
  created_by: string;
};

export type Message = {
  id: number;
  inserted_at: string;
  message: string | null;
  user_id: string;
  channel_id: number;
};

export type UserRole = {
  id: number;
  user_id: string;
  role: 'admin' | 'moderator';
};

export type RolePermission = {
  id: number;
  role: 'admin' | 'moderator';
  permission: 'channels.delete' | 'messages.delete';
};
