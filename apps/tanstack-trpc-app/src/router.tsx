import { createRouter as createTanstackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { createContext } from '@workspace/tanstack-trpc/context';
import { TRPCRouter } from '@/integrations/trpc/router';
import { TRPCProvider } from '@/integrations/trpc/react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const createRouter = () => {
  const context = createContext<TRPCRouter>();

  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context,
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,

      Wrap: (props: { children: React.ReactNode }) => {
        return (
          <TRPCProvider
            context={{
              queryClient: context.queryClient,
              trpcClient: context.trpcClient,
            }}
          >
            {props.children}
          </TRPCProvider>
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
