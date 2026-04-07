import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiado de '/HURLINGHAM_PNO_REACT/' para despliegue en Vercel
})
