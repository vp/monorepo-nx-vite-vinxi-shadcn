import { createUserService } from '@workspace/user-supabase/create-user-service';
import getSupabaseServerClient from '@/integrations/supabase/server-client';
import { getSupabaseBrowserClient } from '@/integrations/supabase/browser-client';

const isServer = typeof window === 'undefined';

export const userService = createUserService(
  isServer ? getSupabaseServerClient : getSupabaseBrowserClient
);
