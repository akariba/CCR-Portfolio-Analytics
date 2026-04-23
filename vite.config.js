import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CCR-Portfolio-Analytics/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
