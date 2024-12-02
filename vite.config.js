import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // Корінь проєкту — коренева папка
    root: './',
    // Базовий шлях для GitHub Pages
    base: '/goit-advancedjs-hw-01/',
    build: {
      // Вихідна папка для збірки
      outDir: 'dist',
      emptyOutDir: true, // Очищення папки dist перед збіркою
      rollupOptions: {
        // Вхідні точки
        input: {
          main: './index.html', // Головна сторінка в корені
          gallery: './src/pages/gallery.html', // Сторінка галереї
          feedback: './src/pages/feedback.html', // Сторінка зворотного зв'язку
        },
      },
    },
    plugins: [
      injectHTML(), // Ін'єкція HTML
      FullReload(['./src/**/*.html', './src/**/*.css', './src/**/*.js']), // Автоматичне перезавантаження
      SortCss({ sort: 'mobile-first' }), // Сортування CSS для mobile-first
    ],
    server: {
      host: true, // Дозволяє доступ через локальну мережу
      port: 3000, // Порт для локального сервера
    },
  };
});
