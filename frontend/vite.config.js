import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite';
import path, { resolve } from 'path';

export default ({ mode }) => {
  const env = process.env;
  Object.assign(env, loadEnv(mode, process.cwd()));

  const serverPort = parseInt(env.VITE_SERVER_PORT) || 3000;

  const outputDir = 'build';

  return defineConfig({
    build: {
      commonjsOptions: {
          transformMixedEsModules: true,
      },
      rollupOptions: {
          input: {
              app: resolve(__dirname, 'index.html'),
          },
          output: {
              dir: resolve(__dirname, outputDir),
          },
      },
    },
    resolve: {
      alias: {
          '~': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: serverPort,
    },
  })
}