// vite.config.js (CÓDIGO COMPLETO CON ALIAS)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ¡Importante! Asegúrate de que esta línea esté presente

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- AÑADE ESTA SECCIÓN COMPLETA ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})