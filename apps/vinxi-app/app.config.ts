import { createApp } from 'vinxi';
import { config } from 'vinxi/plugins/config';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import react from '@vitejs/plugin-react';

export default createApp({
  routers: [
    {
      name: 'public',
      type: 'static',
      dir: './public',
    },
    {
      name: 'client',
      type: 'spa',
      handler: './index.html',
      base: '/',
      plugins: () => [
        config('custom', {
          resolve: {
            alias: {
              '@': path.resolve('./src'),
            },
          },
        }),
        react(),
        tailwindcss(),
        nxViteTsPaths(),
        nxCopyAssetsPlugin(['*.md']),
      ],
    },
  ],
});
