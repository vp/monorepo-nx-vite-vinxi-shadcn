import { createUsersService } from '@workspace/users-supabase/create-users-service';
import { getSupabaseServerClient } from '../supabase/server-client';
import { getSupabaseBrowserClient } from '../supabase/browser-client';

const isServer = typeof window === 'undefined';

export const userService = createUsersService(
  isServer ? getSupabaseServerClient : getSupabaseBrowserClient
);