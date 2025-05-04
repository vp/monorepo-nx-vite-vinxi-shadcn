import { createAPIFileRoute } from '@tanstack/react-start/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcRouter } from '@/integrations/trpc/router';
import { getTRPCApiContext } from '@/integrations/supabase/trpc';
import { createUserTRPCContext } from '@/integrations/user/trpc';
import { createTodosTRPCContext } from '@/integrations/todos/todos-trpc';

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    ...getTRPCApiContext(),
    createContext: () => ({
      ...createUserTRPCContext(),
      ...createTodosTRPCContext(),
    }),
  });
}

export const APIRoute = createAPIFileRoute('/api/trpc/$')({
  GET: handler,
  POST: handler,
});
