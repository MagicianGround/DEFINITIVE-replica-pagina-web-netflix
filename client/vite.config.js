import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Si usas Vue, reemplázalo por @vitejs/plugin-vue

export default defineConfig({
  plugins: [react()],
  base: '/client/', // Asegúrate de que no tenga "./" para evitar problemas en Vercel
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://replica-pagina-server-ul2z.onrender.com/api/enviar', // Cambia esto por la URL de tu backend
        changeOrigin: true,
        secure: false
      }
    }
  }
});
