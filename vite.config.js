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
        index: './public/index.html',
        gallery: './public/gallery.html',
        feedback: './public/feedback.html',
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'commonHelpers') {
            return 'commonHelpers.js';
          }
          return '[name].js';
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.html')) {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./**/*.html']),
    SortCss({
      sort: 'mobile-first',
    }),
    viteStaticCopy({
      targets: [
        {
          src: './img/**/*', // Шлях до ваших зображень
          dest: 'img', // Куди копіювати у dist
        },
      ],
    }),
  ],
}));
