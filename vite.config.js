import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // Корінь проєкту
    root: './src',
    // Базовий шлях для проєкту
    base: '/goit-advancedjs-hw-01/',
    // Швидший доступ до CSS/JS через псевдоніми
    resolve: {
      alias: {
        '/@css': '/src/css',
        '/@js': '/src/js',
      },
    },
    build: {
      // Вивід файлів збірки у папку dist
      outDir: '../dist',
      // Очищення папки dist перед збіркою
      emptyOutDir: true,
      sourcemap: true, // Генерація мап файлів для дебагу
      rollupOptions: {
        // Вхідні точки для різних HTML-сторінок
        input: {
          main: './index.html', // Головна сторінка
          gallery: './pages/gallery.html', // Галерея
          feedback: './pages/feedback.html', // Зворотний зв'язок
        },
        // Виключення node_modules з Rollup
        external: [
          '/goit-advancedjs-hw-01/src/js/feedback.js',
          '/goit-advancedjs-hw-01/src/css/feedback.css',
        ],
      },
    },
    plugins: [
      // Автоматичне оновлення HTML
      injectHTML(),
      // Повне перезавантаження при зміні HTML, CSS або JS
      FullReload(['./src/**/*.html', './src/**/*.css', './src/**/*.js']),
      // Сортування CSS правил для mobile-first
      SortCss({
        sort: 'mobile-first',
      }),
    ],
    server: {
      host: true, // Доступ до сервера з локальної мережі
      port: 3000, // Порт для запуску локального сервера
    },
    define: {
      [command === 'serve' ? 'global' : '_global']: {}, // Уникаємо помилок через глобальні змінні
    },
  };
});
