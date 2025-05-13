import { createAPIFileRoute } from '@tanstack/react-start/api';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { trpcRouter } from '@/integrations/trpc/router';
import { getTRPCApiContext } from '@/integrations/supabase/trpc';
import { createUserTRPCContext } from '@/integrations/user/trpc';
import { createTodosTRPCContext } from '@/integrations/todos/todos-trpc';
import { createChatTRPCContext } from '@/integrations/chat/chat-trpc';
import getSupabaseServerClient from '@/integrations/supabase/server-client';

function handler({ request }: { request: Request; }) {
  const supabase = getSupabaseServerClient(request);
  const getSupabaseClient = () => supabase;
  

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
