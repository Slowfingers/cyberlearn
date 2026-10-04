import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { localApi } from './server/localBackend';

export default defineConfig(() => {
    return {
      server: {
        fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.cyberlearn/**'] },
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), {name:'local-school-server',configureServer(server){server.middlewares.use(localApi);},configurePreviewServer(server){server.middlewares.use(localApi);}}],
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              const grade = id.match(/\/curriculum\/(grade[3-7])(?:\/|\.ts)/)?.[1];
              if (grade) return `curriculum-${grade}`;
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
