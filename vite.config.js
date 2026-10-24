import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FullStack_Prueba2/', 
  test: {
    globals: true,
    environment: 'jsdom',
  },
});