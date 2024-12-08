import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  base: './',
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: './src/public/index.html', // Шлях до index.html
        gallery: './src/public/1-gallery.html', // Шлях до 1-gallery.html
        feedback: './src/public/2-form.html', // Шлях до 2-form.html
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
          src: 'img/**/*', // Звідки копіювати
          dest: 'img', // Куди копіювати в dist
        },
      ],
    }),
  ],
}));
