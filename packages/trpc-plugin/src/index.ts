import type { Plugin } from 'vite'

export const viteTrpcPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-trpc',
    transform(code, id) {
      if (id.includes('trcp-server-headers')) {
        return {
          code: 'export const getTrpcServerHeaders =() => ({});',
          map: null,
        };
      }
      return null; // Return null for untransformed code
    },
  };
};

export type ViteTrpcHeadersPlugin = ReturnType<typeof viteTrpcPlugin>;