import { createTRPCClient, httpBatchStreamLink } from '@trpc/client';
import superjson from 'superjson';
import type { TRPCRouter } from './router';
import { getTrpcServerHeaders } from './trcp-server-headers';

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: getUrl(),
      headers: async () => {
        // Include cookies in the headers
        if (typeof window === 'undefined') {
          // On the server, use `cookie` from the request
          // this is crucal for SSR and calling trpc from server
          return {
            cookie: getTrpcServerHeaders(),
          };
        }

        // On the client, cookies are automatically sent with requests
        return {};
      },
    }),
  ],
});

export type TRPCClient = typeof trpcClient;

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return `http://localhost:${process.env.PORT ?? 3000}`;
  })();
  return `${base}/api/trpc`;
}
