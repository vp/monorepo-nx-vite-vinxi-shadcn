import { Plugin, ResolvedConfig } from 'vite';

export function viteTrpcPlugin(): Plugin {
  let target: string;

  return {
    name: 'vite-plugin-trpc', //
    //  Explicitly run only for client builds
    configResolved: (config) => {
      target = (config as any)?.router?.name || 'unknown';
    },
    transform(code, id) {
      if (id.includes('trcp-server-headers') && target === 'client') {
    
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
