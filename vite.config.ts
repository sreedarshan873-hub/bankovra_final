import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative paths let the same production build work from the repository
  // subdirectory on GitHub Pages and from the root on any other static host.
  base: './',
})
