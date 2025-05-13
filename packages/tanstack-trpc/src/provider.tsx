import { AnyTRPCRouter } from '@trpc/server';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { createContext } from '@workspace/tanstack-trpc/context';
import React from 'react';

export const createProvider = <TRouter extends AnyTRPCRouter>() => {
  const { TRPCProvider, useTRPC } = createTRPCContext<TRouter>();

  function Provider({
    children,
    context,
  }: {
    children: React.ReactNode;
    context: Omit<ReturnType<typeof createContext<TRouter>>, 'trpc'>;
  }) {
    return (
      <TRPCProvider
        trpcClient={context.trpcClient}
        queryClient={context.queryClient}
      >
        {children}
      </TRPCProvider>
    );
  }

  return {
    TRPCProvider: Provider,
    useTRPC,
  };
};
