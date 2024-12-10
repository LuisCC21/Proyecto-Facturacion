import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://luiscc21.github.io/Proyecto-Facturacion",
  plugins: [react()],
})
