import { createTRPCClient } from '@workspace/trpc/client';
import type { TRPCRouter } from './router';

export const createTRPCRouterClient = createTRPCClient<TRPCRouter>;

export type TRPCClient = ReturnType<typeof createTRPCRouterClient>;
