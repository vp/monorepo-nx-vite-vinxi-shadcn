import { createAPIFileRoute } from '@tanstack/react-start/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcRouter } from '@/integrations/trpc/router';
import { getTRPCApiContext } from '@workspace/trpc/context';
import { createUserTRPCContext } from '@workspace/user-trpc/context';
import { createTodosTRPCContext } from '@workspace/todos-trpc/todos-context';
import { getSupabaseServerClient } from '@workspace/supabase/server-client';
import { createChatTRPCContext } from '@workspace/chat-trpc/chat-context';

function handler({ request }: { request: Request; }) {
  const getSupabaseClient = () => getSupabaseServerClient(request);
  
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    ...getTRPCApiContext(),
    createContext: () => ({
      ...createUserTRPCContext(getSupabaseClient),
      ...createTodosTRPCContext(getSupabaseClient),
      ...createChatTRPCContext(getSupabaseClient),
    }),
  });
}

export const APIRoute = createAPIFileRoute('/api/trpc/$')({
  GET: handler,
  POST: handler,
});
