import {
  createRouterFor,
  getTRPCInstance,
  TRPCError,
} from '@workspace/trpc/init';
import { TodosService } from '@workspace/todos-supabase/create-todos-service';
import { z } from 'zod';

type Context = {
  todosService: TodosService;

  user: {
    id: string;
    email: string;
  } | null;
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
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource.',
      });
    }

    return next({
      ctx: {
        user: ctx.user,
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
  };
};

export type TodosRouter = ReturnType<typeof createRouter>;

export function createTodosRouter() {
  return createRouterFor<Context, TodosRouter>(createRouter);
}
