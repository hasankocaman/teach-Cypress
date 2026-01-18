import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/teach-Cypress/',
    plugins: [react()],
    resolve: {
        dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
});
