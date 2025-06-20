import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Garanta que seu front-end roda na porta padrão do Vite
    proxy: {
      '/api': { // Qualquer requisição que comece com /api
        target: 'http://localhost:8080', // Será redirecionada para o seu back-end
        changeOrigin: true, // Muda o cabeçalho 'Origin' para o do alvo
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Opcional: reescreve o caminho (neste caso, mantém /api)
        secure: false, // Para desenvolvimento, aceita certificados não seguros
      },
    },
  },
});