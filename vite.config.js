import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: './src', // Корінь проєкту
    base: '/', // Оновлений базовий шлях
    build: {
      sourcemap: true,
      outDir: '../dist', // Вивід збірки у папку dist
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: './src/index.html', // Головна сторінка
          gallery: './src/pages/gallery.html', // Сторінка галереї
          feedback: './src/pages/feedback.html', // Сторінка зворотнього зв'язку
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].js', // Імена JS файлів
          assetFileNames: assetInfo => {
            if (/\.css$/.test(assetInfo.name)) {
              return 'css/[name]-[hash][extname]'; // Імена CSS файлів
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    plugins: [
      injectHTML(), // Автоматичне ін'єктування HTML
      FullReload(['./src/**/*.html', './src/**/*.css', './src/**/*.js']), // Повне перезавантаження під час змін
      SortCss({
        sort: 'mobile-first', // Сортування CSS за mobile-first
      }),
    ],
  };
});
