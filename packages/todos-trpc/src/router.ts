import {
  createRouterFor,
  getTRPCInstance,
  TRPCError,
} from '@workspace/trpc/init';
import { TodosService } from '@workspace/todos-supabase/create-todos-service';
import { TodolistsService } from '@workspace/todos-supabase/create-todolists-service';
import { z } from 'zod';

type Context = {
  todosService: TodosService;
  todolistsService: TodolistsService;
  getUser: () => Promise<{ id: string } | null>;
};

export const createRouter = <
  TContext extends ReturnType<typeof getTRPCInstance<Context>>
>(
  context: TContext
) => {
  const publicProcedure = context.procedure.use(async ({ ctx, next }) => {
    if (!ctx.todosService) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'TodoList service not found',
      });
    }

    return next({
      ctx,
    });
  });

  const authedProcedure = publicProcedure.use(async ({ ctx, next }) => {
    const user = await ctx.getUser();

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({
      ctx: {
        user,
      },
    });
  });

  return {
    getTodos: authedProcedure.query(async ({ ctx }) => {
      const todos = await ctx.todosService.getTodos();

      return todos;
    }),

    addTodo: authedProcedure
      .input(
        z.object({
          task: z.string(),
          is_complete: z.boolean().optional(),
          todolist_id: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const todo = await ctx.todosService.addTodo({
          ...input,
          user_id: ctx.user.id,
        });
        return todo;
      }),

    updateTodo: authedProcedure
      .input(
        z.object({
          id: z.number(),
          task: z.string().optional(),
          is_complete: z.boolean().optional(),
          todolist_id: z.number().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const todo = await ctx.todosService.updateTodo({
          ...input,
          user_id: ctx.user.id,
        });
        return todo;
      }),

    deleteTodo: authedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const todo = await ctx.todosService.deleteTodo(input.id);
        return todo;
      }),

    getTodolists: authedProcedure.query(async ({ ctx }) => {
      const todolists = await ctx.todolistsService.getTodolists();

      return todolists;
    }),

    getTodolistsWithTodos: authedProcedure.query(async ({ ctx }) => {
      const todolists = await ctx.todolistsService.getTodolistsWithTodos();

      return todolists;
    }),

    addTodolist: authedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const todolist = await ctx.todolistsService.addTodolist({
          ...input,
          user_id: ctx.user.id,
        });
        return todolist;
      }),

    updateTodolist: authedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const todolist = await ctx.todolistsService.updateTodolist({
          ...input,
          user_id: ctx.user.id,
        });
        return todolist;
      }),

    getTodolistById: authedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const todolist = await ctx.todolistsService.getTodolistById(input.id);

        return todolist;
      }),

    deleteTodolist: authedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const todolist = await ctx.todolistsService.deleteTodolist(input.id);

        return todolist;
      }),
  };
};

export type TodosRouter = ReturnType<typeof createRouter>;

export function createTodosRouter() {
  return createRouterFor<Context, TodosRouter>(createRouter);
}
