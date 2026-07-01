import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server su :5173. Il proxy inoltra /api al backend (Ettore) su :4000,
// così in sviluppo non hai problemi di CORS. Cambia la porta se necessario.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
