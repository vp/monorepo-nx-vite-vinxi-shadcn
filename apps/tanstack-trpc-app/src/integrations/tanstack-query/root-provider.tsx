import { QueryClient } from '@tanstack/react-query';
import superjson from 'superjson';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

import { TRPCProvider } from '@/integrations/trpc/react';
import { createTRPCRouterClient } from '@/integrations/trpc/client';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
      queries: {
        // Set default options for queries
        refetchOnWindowFocus: true,
        retry: 1,

        // Set the default cache time for queries, but set stale time to 0 for server-side rendering
        // This is important for SSR to work correctly!!!
        staleTime: typeof window !== 'undefined' ? 1000 * 60 * 5 : undefined, // 5 minutes
      },
    },
  });
}

export function createContext() {
  console.log('Creating context');
  const queryClient = createQueryClient();
  const trpcClient = createTRPCRouterClient();

  const serverHelpers = createTRPCOptionsProxy({
    client: trpcClient,
    queryClient: queryClient,
  });

  return {
    queryClient,
    trpc: serverHelpers,
    trpcClient,
  };
}

export function Provider({ children, context }: { children: React.ReactNode, context: Omit<ReturnType<typeof createContext>, 'trpc'> }) {
  return (
    <TRPCProvider trpcClient={context.trpcClient} queryClient={context.queryClient}>
      {children}
    </TRPCProvider>
  );
}
