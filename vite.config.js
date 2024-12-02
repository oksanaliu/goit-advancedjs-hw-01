import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // Корінь проекту (директорія src)
    root: './src',
    // Базовий шлях для GitHub Pages
    base: '/goit-advancedjs-hw-01/',
    resolve: {
      alias: {
        '/@css': '/src/css',
        '/@js': '/src/js',
      },
    },
    build: {
      sourcemap: true, // Генерація sourcemap для дебагу
      outDir: '../dist', // Вихідна папка збірки
      emptyOutDir: true, // Очищення вихідної папки перед збіркою
      rollupOptions: {
        input: {
          main: './src/index.html', // Головна сторінка
          gallery: './src/pages/gallery.html', // Сторінка галереї
          feedback: './src/pages/feedback.html', // Сторінка зворотнього зв'язку
        },
        output: {
          assetFileNames: assetInfo => {
            if (/\.css$/.test(assetInfo.name)) {
              return 'css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          entryFileNames: '[name].js',
        },
      },
    },
    plugins: [
      injectHTML(), // Ін'єкція HTML
      FullReload(['./src/**/*.html', './src/**/*.css', './src/**/*.js']), // Автоматичне оновлення під час змін
      SortCss({ sort: 'mobile-first' }), // Сортування CSS для mobile-first
    ],
    server: {
      host: true, // Доступ через локальну мережу
      port: 3000, // Порт для запуску локального сервера
    },
  };
});
