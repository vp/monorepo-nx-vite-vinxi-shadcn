import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const getTRPCApiContext = (): Partial<
  Parameters<typeof fetchRequestHandler>[0]
> => ({
  responseMeta: () => {
    return {
      headers: {
        // Ensure no caching for API responses
        'cache-control': 'no-cache, no-store, must-revalidate',
      },
    };
  },
  // Add proper error handling
  onError: ({ error }) => {
    console.error('tRPC error:', error);
  },
});
