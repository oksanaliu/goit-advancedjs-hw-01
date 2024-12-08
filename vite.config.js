import { defineConfig } from 'vite';
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
        input: {
          index: './src/public/index.html', // Основний файл
          gallery: './src/public/gallery.html', // Галерея
          form: './src/public/feedback.html', // Форма зворотного зв'язку
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
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/public/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/img/**/*', // Зображення
            dest: 'assets/img',
          },
          {
            src: 'src/css/**/*', // CSS
            dest: 'css',
          },
          {
            src: 'src/js/**/*', // JavaScript
            dest: 'js',
          },
        ],
      }),
    ],
  };
});
