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
        input: glob.sync('./src/public/*.html'), // Шлях до HTML-файлів у папці public
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js', // Імена для JS-файлів
          assetFileNames: 'assets/[name]-[hash][extname]', // Імена для CSS та інших файлів
        },
      },
      outDir: '../dist', // Папка для зібраних файлів
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']), // Автоматичне оновлення HTML-файлів
      SortCss({
        sort: 'mobile-first', // Сортування CSS за принципом mobile-first
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'img/**/*', // Звідки копіювати зображення
            dest: 'img', // Куди копіювати в dist
          },
        ],
      }),
    ],
  };
});
