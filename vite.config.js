import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'teenier-alysha-subflexuous.ngrok-free.dev'
    ]
  },
  publicDir: 'public' // Add this line to serve static assets from the public directory
});