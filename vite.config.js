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
        gallery: './public/1-gallery.html',
        form: './public/2-form.html',
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
    FullReload(['./public/**/*.html']),
    SortCss({
      sort: 'mobile-first',
    }),
    viteStaticCopy({
      targets: [
        {
          src: './img/**/*',
          dest: 'img',
        },
        {
          src: './css/**/*',
          dest: 'css',
        },
        {
          src: './js/**/*',
          dest: 'js',
        },
      ],
    }),
  ],
}));
