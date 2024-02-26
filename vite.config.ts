/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react'; // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/locator-app',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  resolve: {
    alias: [
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, './src/hooks'),
      },
      {
        find: '@services',
        replacement: resolve(__dirname, './src/services'),
      },
      {
        find: '@customTypes',
        replacement: resolve(__dirname, './src/types'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@constants',
        replacement: resolve(__dirname, './src/constants.ts'),
      },
      {
        find: '@config',
        replacement: resolve(__dirname, './src/config.ts'),
      },
      {
        find: '@stores',
        replacement: resolve(__dirname, './src/stores'),
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, './src/assets'),
      },
    ],
  },
});
