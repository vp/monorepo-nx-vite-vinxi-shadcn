import { AnyTRPCRouter } from '@trpc/server';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { createContext } from '@workspace/tanstack-trpc/context';
import React from 'react';

/**
 * Creates react context provider and hook for the given router.
 *
 * This is a wrapper around `createTRPCContext` that also creates 
 * a `createContext` function that can be used to create a context
 * for the router.
 *
 */
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
