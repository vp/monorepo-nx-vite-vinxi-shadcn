# @workspace/user-trpc

This library was generated with Nx.

## Overview

`@workspace/user-trpc` provides tRPC endpoints and routers for user management functionality. It integrates with Supabase for user data operations via the [`@workspace/user-supabase`](../user-supabase) package.

## Building

This package is not buildable

## Running Unit Tests

To execute the unit tests with Vitest, run:

```bash
nx test user-trpc
```

## Usage

Import the user tRPC routers in your tRPC API to add user management functionality:

```ts
import { userRouter } from '@workspace/user-trpc';
// Add userRouter to your tRPC app/router
```

This gives your application access to type-safe user management operations through tRPC.