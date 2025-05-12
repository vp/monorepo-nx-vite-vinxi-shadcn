import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import * as TanstackQuery from './integrations/tanstack-query/root-provider';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { logger } from './utils';

let routersCounter = 0;

// Create a new router instance
export const createRouter = () => {
  routersCounter++;
  logger.log('[creteRouter] creating router -----------------------------------------------------------', routersCounter);
  const context = TanstackQuery.createContext();

  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context,
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,

      Wrap: (props: { children: React.ReactNode }) => {
        return (
          <TanstackQuery.Provider context={context}>{props.children}</TanstackQuery.Provider>
        );
      },
    }),
    context.queryClient
  );

  return router;
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
