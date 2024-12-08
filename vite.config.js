import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    base: './',
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/public/*.html'), // Збір всіх HTML-файлів з папки public
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js', // Генерація імен для JS-файлів
          assetFileNames: 'assets/[name]-[hash][extname]', // Генерація імен для CSS/шрифтів
        },
      },
      outDir: '../dist', // Збереження всіх зібраних файлів у dist
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/public/**/*.html']), // Автоматичне оновлення HTML-файлів
      SortCss({
        sort: 'mobile-first', // Сортування CSS mobile-first
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'img/**/*', // Копіювання зображень
            dest: 'img', // Збереження зображень у dist/img
          },
        ],
      }),
    ],
  };
});
