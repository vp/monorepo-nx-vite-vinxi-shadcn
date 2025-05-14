import {
  AnyRoute,
  createRouter as createTanstackRouter,
  RouterConstructorOptions,
  RouterHistory,
  TrailingSlashOption,
} from '@tanstack/react-router';
import {
  routerWithQueryClient,
  ValidateRouter,
} from '@tanstack/react-router-with-query';
import { createContext } from '@workspace/tanstack-trpc/context';
import { AnyTRPCRouter } from '@trpc/server';
import { createProvider } from '@workspace/tanstack-trpc/provider';

// Create a new router instance
export const createTanstackWithQueryAndTRPCRouter = <
  TTRPCRouter extends AnyTRPCRouter,
  TRouteTree extends AnyRoute,
  TTrailingSlashOption extends TrailingSlashOption = 'never',
  TDefaultStructuralSharingOption extends boolean = false,
  TRouterHistory extends RouterHistory = RouterHistory,
  TDehydrated extends Record<string, any> = Record<string, any>
>({
  Provider,
  context,
  ...options
}: RouterConstructorOptions<
  TRouteTree,
  TTrailingSlashOption,
  TDefaultStructuralSharingOption,
  TRouterHistory,
  TDehydrated
> & {
  Provider: ReturnType<typeof createProvider<TTRPCRouter>>['TRPCProvider'];
  context: TRouteTree['types']['routerContext'] &
    ReturnType<typeof createContext<TTRPCRouter>>;
}) => {
  const tanstackRouter = createTanstackRouter<
    TRouteTree,
    TTrailingSlashOption,
    TDefaultStructuralSharingOption,
    TRouterHistory,
    TDehydrated
  >({
    ...options,
    context,
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <Provider
          context={{
            queryClient: context.queryClient,
            trpcClient: context.trpcClient,
          }}
        >
          {props.children}
        </Provider>
      );
    },
  });

  const router = routerWithQueryClient(
    tanstackRouter as ValidateRouter<typeof tanstackRouter>,
    context.queryClient
  );

  return router;
};
