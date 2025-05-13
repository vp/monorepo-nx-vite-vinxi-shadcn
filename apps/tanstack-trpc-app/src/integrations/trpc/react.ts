import type { TRPCRouter } from '@/integrations/trpc/router';
import { createProvider } from '@workspace/tanstack-trpc/provider';

export const { TRPCProvider, useTRPC } = createProvider<TRPCRouter>();
