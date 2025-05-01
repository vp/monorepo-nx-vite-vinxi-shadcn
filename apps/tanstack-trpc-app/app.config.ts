import { defineConfig } from '@tanstack/react-start/config';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

const config = defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      // Add a custom plugin to handle server-only imports
      {
        name: 'handle-server-imports',
        transform(code, id) {
          // Replace server-side imports with empty objects in client builds
          if (!process.env.SSR && id.includes('trcp-server-headers')) {
            console.log('[DOIT] Transforming server-only import:', id);
            
            return {
              code: 'export const getTrpcServerHeaders =() => ({});',
              map: null,
            };
          }
          return null; // Return null for untransformed code
        },
      },
    ],
  },
});

export default config;
