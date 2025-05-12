import { createTodosService } from '@workspace/todos-supabase/create-todos-service';
import { getSupabaseBrowserClient } from '@/integrations/supabase/browser-client';
import getSupabaseServerClient from '@/integrations/supabase/server-client';
import { createTodolistsService } from '@workspace/todos-supabase/create-todolists-service';

const isServer = typeof window === 'undefined';

export const todosService = createTodosService(
  isServer ? getSupabaseServerClient : getSupabaseBrowserClient
);

export const todolistService = createTodolistsService(
  isServer ? getSupabaseServerClient : getSupabaseBrowserClient
);
