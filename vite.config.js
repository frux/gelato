import { defineConfig } from 'vite';
import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  build: {
    outDir: 'dist', // папка для выходного файла
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // главный входной файл
      },
    },
  },
});
