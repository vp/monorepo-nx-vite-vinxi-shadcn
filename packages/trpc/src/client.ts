import {
  createTRPCClient as createTRPCClientBase,
  HTTPBatchLinkOptions,
  httpBatchStreamLink,
} from '@trpc/client';
import superjson from 'superjson';
import { AnyTRPCRouter } from '@trpc/server';
import { getTrpcServerHeaders } from './trcp-server-headers.js';

export const createTRPCClient = <TRouter extends AnyTRPCRouter>() =>
  createTRPCClientBase<TRouter>({
    links: [
      httpBatchStreamLink({
        transformer: superjson,
        url: getUrl(),
        headers: () => {
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
      } as unknown as HTTPBatchLinkOptions<TRouter['_def']['_config']['$types']>),
    ],
  });

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return `http://localhost:${process.env.PORT ?? 3000}`;
  })();
  return `${base}/api/trpc`;
}
