import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig({
  // Встановлюємо кореневу папку
  root: './',
  // Базовий шлях для GitHub Pages
  base: '/goit-advancedjs-hw-01/',
  build: {
    // Вказуємо папку для збірки
    outDir: 'dist',
    emptyOutDir: true, // Очищення dist перед збіркою
    sourcemap: true, // Карти для дебагу
    rollupOptions: {
      // Вхідні точки для Rollup
      input: {
        main: './index.html', // Головна сторінка
        gallery: './src/pages/gallery.html', // Сторінка галереї
        feedback: './src/pages/feedback.html', // Сторінка зворотного зв'язку
      },
    },
  },
  plugins: [
    injectHTML(), // Ін'єкція HTML
    FullReload(['./src/**/*.html', './src/**/*.css', './src/**/*.js']), // Оновлення при зміні файлів
    SortCss({ sort: 'mobile-first' }), // Mobile-first сортування CSS
  ],
  server: {
    host: true, // Локальна мережа
    port: 3000, // Порт локального сервера
  },
});
