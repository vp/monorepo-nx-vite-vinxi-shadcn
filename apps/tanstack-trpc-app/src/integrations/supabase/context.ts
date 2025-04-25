import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { flushBufferedCookies } from './server-client';

export const getTRPCApiContext = (): Partial<
  Parameters<typeof fetchRequestHandler>[0]
> => ({
  responseMeta: () => {
    const headers = new Headers();
    // Flush buffered cookies before sending the response
    flushBufferedCookies((name, value) => {
      headers.append('Set-Cookie', `${name}=${value}; Path=/; HttpOnly`);
    });

    return {
      headers,
    };
  },
});
