import { createServerClient } from '@supabase/ssr';
import { createTodolistsService } from '@workspace/todos-supabase/create-todolists-service';
import { createTodosService } from '@workspace/todos-supabase/create-todos-service';

export const createTodosTRPCContext = (
  getSupabaseClient: ReturnType<typeof createServerClient>
) => ({
  todosService: createTodosService(getSupabaseClient),
  todolistsService: createTodolistsService(getSupabaseClient),
});
