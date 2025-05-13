import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { AnyTRPCRouter } from '@trpc/server';
import { createTRPCClient } from '@workspace/trpc/client';
import { createQueryClient } from '@workspace/tanstack-trpc/query-client';

export function createContext<TRouter extends AnyTRPCRouter>() {
  const queryClient = createQueryClient();
  const trpcClient = createTRPCClient<TRouter>();

  const serverHelpers = createTRPCOptionsProxy<TRouter>({
    client: trpcClient,
    queryClient,
  });

  return {
    queryClient,
    trpc: serverHelpers,
    trpcClient,
  };
}
