import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seo from './seo.config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
