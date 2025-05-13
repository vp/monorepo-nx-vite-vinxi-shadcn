import { QueryClient } from '@tanstack/react-query';
import superjson from 'superjson';

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