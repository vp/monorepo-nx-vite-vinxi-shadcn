import { createTRPCClient } from '@workspace/trpc/client';
import type { TRPCRouter } from './router';

export const trpcClient = createTRPCClient<TRPCRouter>();

export type TRPCClient = typeof trpcClient;
