import { createContext } from '@workspace/tanstack-trpc/context';
import { createTanstackWithQueryAndTRPCRouter } from '@workspace/tanstack-trpc/router';
import { TRPCRouter } from '@/integrations/trpc/router';
import { TRPCProvider } from '@/integrations/trpc/react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instanc
export const createRouter = () => {
  const context = createContext<TRPCRouter>();

  return createTanstackWithQueryAndTRPCRouter<TRPCRouter, typeof routeTree>({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    Provider: TRPCProvider,
  });
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
