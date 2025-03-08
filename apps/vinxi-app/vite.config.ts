/// <reference types='vitest' />
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    setupFiles: ['./vitest-setup.mjs'],
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/vinxi-app',
      provider: 'v8' as const,
    },
  },
}));
