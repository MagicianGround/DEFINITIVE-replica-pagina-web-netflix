import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // O el plugin que uses

export default defineConfig({
  plugins: [react()],
  base: '/', // Si usas subdirectorios en Vercel, cámbialo según corresponda
  build: {
    outDir: 'dist'
  }
});
