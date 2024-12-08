import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
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
        index: './src/public/index.html',
        gallery: './src/public/gallery.html',
        feedback: './src/public/feedback.html',
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
  ],
}));
