// frontend/vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite mặc định
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ĐÃ SỬA: Backend chạy ở 3000
        changeOrigin: true,
        secure: false,
      },
    },
  },
});