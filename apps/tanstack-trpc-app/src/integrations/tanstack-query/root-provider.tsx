import { QueryClient } from '@tanstack/react-query';
import superjson from 'superjson';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';

import { TRPCProvider } from '@/integrations/trpc/react';
import { trpcClient } from '../trpc/client';

const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: { serializeData: superjson.serialize },
    hydrate: { deserializeData: superjson.deserialize },
  },
});

const serverHelpers = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient: queryClient,
});

export function getContext() {
  return {
    queryClient,
    trpc: serverHelpers,
    trpcClient,
  };
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
}
