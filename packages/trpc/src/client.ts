import {
  createTRPCClient as createTRPCClientBase,
  HTTPBatchLinkOptions,
  httpBatchStreamLink,
  httpSubscriptionLink,
  splitLink,
} from '@trpc/client';
import superjson from 'superjson';
import { AnyTRPCRouter } from '@trpc/server';
import { getTrpcServerHeaders } from './trcp-server-headers.js';

export const createTRPCClient = <TRouter extends AnyTRPCRouter>() =>
  createTRPCClientBase<TRouter>({
    links: [
      splitLink({
        // Use HTTP subscription link for subscription operations
        condition: (op) => op.type === 'subscription',

        // HTTP subscription link for subscriptions (long-polling)
        true: httpSubscriptionLink({
          url: getUrl(),
          // Customize as needed for subscriptions
          transformer: superjson,
          headers: getTrpcServerHeaders,
        }),

        // HTTP batch stream link for queries and mutations
        false: httpBatchStreamLink({
          transformer: superjson,
          url: getUrl(),
          headers: getTrpcServerHeaders,
        } as unknown as HTTPBatchLinkOptions<TRouter['_def']['_config']['$types']>),
      }),
    ],
  });

export function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return `http://localhost:${process.env.PORT ?? 3000}`;
  })();
  return `${base}/api/trpc`;
}
