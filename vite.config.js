import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../public',
    emptyOutDir: false
  },
  server: {
    proxy: {
      '/rss': {
        target: 'https://www.kyberturvallisuuskeskus.fi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rss/, '/sites/default/files/rss/vulns.xml'),
      },
    },
  }  
})