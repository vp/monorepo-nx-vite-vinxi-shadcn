import { createTRPCClient } from '@workspace/trpc/client';
import type { TRPCRouter } from '@/integrations/trpc/router';

export const createTRPCRouterClient = createTRPCClient<TRPCRouter>;

export type TRPCClient = ReturnType<typeof createTRPCRouterClient>;
