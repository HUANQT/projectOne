/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://47.95.13.131:8081',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue()],
});
