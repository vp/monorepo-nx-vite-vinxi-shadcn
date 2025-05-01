import { createUserService } from '@workspace/user-supabase/create-user-service';
import { getSupabaseServerClient } from '../supabase/server-client';
import { getSupabaseBrowserClient } from '../supabase/browser-client';

const isServer = typeof window === 'undefined';

export const userService = createUserService(
  isServer ? getSupabaseServerClient : getSupabaseBrowserClient
);