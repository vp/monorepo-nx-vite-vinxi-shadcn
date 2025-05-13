import { createServerClient } from "@supabase/ssr";
import { createTodolistsService, TodolistsService } from "@workspace/todos-supabase/create-todolists-service";
import { createTodosService, TodosService } from "@workspace/todos-supabase/create-todos-service";

export type Context = {
  todosService: TodosService;
  todolistsService: TodolistsService;
  getUser: () => Promise<{ id: string } | null>;
};

export const createTodosTRPCContext = (
  getSupabaseClient: ReturnType<typeof createServerClient>
) => ({
  todosService: createTodosService(getSupabaseClient),
  todolistsService: createTodolistsService(getSupabaseClient),
});
