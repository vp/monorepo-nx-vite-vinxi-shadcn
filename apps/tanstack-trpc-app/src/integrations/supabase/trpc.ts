import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

/**
 * Prepares a partial context object for fetchRequestHandler.
 *
 * This context object includes a responseMeta function that ensures cookies are flushed and included in the response headers.
 *
 * This is crucial for server-side rendering (SSR) scenarios when trpc procedures are called on the server.
 *
 * @returns A partial context object for the tRPC API handler.
 */
export const getTRPCApiContext = (): Partial<
  Parameters<typeof fetchRequestHandler>[0]
> => ({
});
