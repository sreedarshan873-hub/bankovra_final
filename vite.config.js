import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    // GitHub Pages hosts this project below /bankovra_final/ rather than at /.
    // Keeping the base configurable preserves normal root deployments too.
    base: process.env.GITHUB_ACTIONS ? '/bankovra_final/' : '/',
});
