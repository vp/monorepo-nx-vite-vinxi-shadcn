import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { AnyTRPCRouter } from '@trpc/server';
import { createTRPCClient } from '@workspace/trpc/client';
import { createQueryClient } from '@workspace/tanstack-trpc/query-client';

/**
 * Creates a context object with configured tRPC and TanStack Query clients
 * 
 * This function initializes and combines the necessary clients to work with tRPC and
 * TanStack Query. It creates a queryClient, trpcClient, and
 * serverHelpers to provide a complete context for data fetching operations.
 * 
 * Mean to be used with conjuction with `createProvider` TRPCProvider 
 * and `useTRPC` hooks. 
 * 
 * @template TRouter - The type of your tRPC router
 * @returns {Object} The context object containing:
 *   - queryClient: TanStack Query client instance
 *   - trpc: tRPC proxy with TanStack Query integration
 *   - trpcClient: Raw tRPC client instance
 *
 */
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
