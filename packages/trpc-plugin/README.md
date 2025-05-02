# @workspace/trpc-plugin

A Vite plugin for tRPC integration.

## Overview

This package provides a Vite plugin to support tRPC server header handling during development and build. It automatically transforms files matching `trcp-server-headers` to export a stubbed `getTrpcServerHeaders` function.

## Installation

```sh
pnpm add -D @workspace/trpc-plugin
```

## Usage

Add the plugin to your `vite.config.ts`:

```ts
import { viteTrpcPlugin } from '@workspace/trpc-plugin';

export default {
  plugins: [
    viteTrpcPlugin(),
    // ...other plugins
  ],
};
```

## How it works

- When a file path includes `trcp-server-headers`, the plugin replaces its contents with:

```ts
  export const getTrpcServerHeaders = () => ({});
```

- For all other files, no transformation is applied.

## Development

- Build: `pnpm build`
- Test: `pnpm test:unit`
