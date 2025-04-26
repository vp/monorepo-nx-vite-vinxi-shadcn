import { initTRPC, TRPCRouterRecord, TRPCBuilder } from '@trpc/server';
import superjson from 'superjson';
export { TRPCError } from '@trpc/server';

const t = initTRPC.create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export type { TRPCRouterRecord };

export type TRPContextFactory<
  TContext extends BaseContext,
  TMeta extends object,
  TBuilder extends TRPCBuilder<TContext, TMeta>
> = () => {
  publicProcedure: ReturnType<TBuilder['create']>['procedure'];
  authProcedure: ReturnType<TBuilder['create']>['procedure'];
};

type BaseContext = object;

export type { TRPCBuilder };

const createTRPCInstance = <TContext extends BaseContext>() =>
  initTRPC.context<TContext>().create({
    transformer: superjson,
  });

type TRPCInstanceType<TContext extends BaseContext> = ReturnType<
  typeof createTRPCInstance<TContext>
>;

let trpcInstance: null | TRPCInstanceType<any> = null;

export function getTRPCInstance<TContext extends BaseContext>() {
  if (!trpcInstance) {
    trpcInstance = createTRPCInstance<TContext>();
  }
  return trpcInstance as TRPCInstanceType<TContext>;
}

export const createRouterFor = <TContext extends BaseContext, TResult>(
  callback: (context: TRPCInstanceType<TContext>) => TResult
) => callback(getTRPCInstance<TContext>());
