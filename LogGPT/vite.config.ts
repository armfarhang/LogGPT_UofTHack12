import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0', // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
    proxy: {
      '/api': {
        target: 'http://192.168.2.100:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})