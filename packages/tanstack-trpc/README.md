# tanstack-trpc

The `tanstack-trpc` package provides utilities and integrations for working with tRPC in the context of TanStack projects. This package is scaffolded and managed using [Nx](https://nx.dev), ensuring a modular and maintainable monorepo structure.

## Features

- Seamless integration of tRPC with TanStack libraries.
- Designed for use within Nx-managed monorepos.
- Includes unit tests powered by [Vitest](https://vitest.dev/).

## Usage

To run the unit tests for this package, execute:
```
nx test tanstack-trpc
```

For more information, refer to the official documentation of [Nx](https://nx.dev) and [Vitest](https://vitest.dev/).


## Example

```typescript

// integrations/trpc/router.ts
import {
  getTRPCInstance,
} from '@workspace/trpc/init';
import { z } from 'zod';

const t = getTRPCInstance();
const createTRPCRouter = t.router;

export const trpcRouter = createTRPCRouter({
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

export type TRPCRouter = typeof trpcRouter;

// integrations/trpc/react.ts

import type { TRPCRouter } from '@/integrations/trpc/router';
import { createProvider } from '@workspace/tanstack-trpc/provider';

export const { TRPCProvider, useTRPC } = createProvider<TRPCRouter>();

```

### React client application example

```typescript
// app.tsx
import React from 'react';
import { createContext } from '@workspace/tanstack-trpc';
import { createProvider } from '@workspace/tanstack-trpc';
import { TRPCRouter } from '@/integrations/trpc/router';

// 1. Create the tRPC context
const trpcContext = createContext<TRPCRouter>();

// 2. Create the provider
const { TRPCProvider, useTRPC } = createProvider<TRPCRouter>();

// 3. Create a component that uses the tRPC hook
function GreetingComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = trpc.greeting.useQuery({ name: 'World' });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data}</div>;
}

// 4. Use the provider in your app
export function App() {
  return (
    <TRPCProvider context={trpcContext}>
      <GreetingComponent />
    </TRPCProvider>
  );
}
```

### Tanstack start router example

```typescript
// router.tsx
import { createContext } from '@workspace/tanstack-trpc/context';
import { createTanstackWithQueryAndTRPCRouter } from '@workspace/tanstack-trpc/router';
import { TRPCRouter } from '@/integrations/trpc/router';
import { TRPCProvider } from '@/integrations/trpc/react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instanc
export const createRouter = () => {
  const context = createContext<TRPCRouter>();

  return createTanstackWithQueryAndTRPCRouter<TRPCRouter, typeof routeTree>({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    Provider: TRPCProvider,
  });
};

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```
