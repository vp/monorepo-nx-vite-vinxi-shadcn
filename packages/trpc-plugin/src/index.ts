import { Plugin } from 'vite';

export function viteTrpcPlugin(): Plugin {
  return {
    name: 'vite-plugin-trpc',
    transform(code, id) {
      if (id.includes('trcp-server-headers')) {
        return {
          code: 'export const getTrpcServerHeaders = () => ({});',
          map: null,
        };
      }
      return null;
    },
  };
}

export type ViteTrpcHeadersPlugin = ReturnType<typeof viteTrpcPlugin>;
