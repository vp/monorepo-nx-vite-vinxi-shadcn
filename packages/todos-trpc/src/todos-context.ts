import { createTodolistsService, TodolistsService } from "@workspace/todos-supabase/create-todolists-service";
import { createTodosService, TodosService } from "@workspace/todos-supabase/create-todos-service";
import { SupabaseClient } from "@supabase/supabase-js";

export type Context = {
  todosService: TodosService;
  todolistsService: TodolistsService;
  getUser: () => Promise<{ id: string } | null>;
};

export const createTodosTRPCContext = (
  getSupabaseClient:  () => SupabaseClient
) => ({
  todosService: createTodosService(getSupabaseClient),
  todolistsService: createTodolistsService(getSupabaseClient),
});
