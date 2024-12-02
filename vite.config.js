import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    base: '/goit-advancedjs-hw-01/', // Базовий шлях для GitHub Pages
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
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    plugins: [
      injectHTML(), // Автоматичне ін'єктування HTML
      FullReload(['./src/**/*.html']), // Повне перезавантаження під час змін
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
