import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin as ViteVendorChunkSplit } from 'vite';
import ViteReactPlugin from '@vitejs/plugin-react';
import ViteLinariaPlugin from '@linaria/vite';
import ViteLegacy from '@vitejs/plugin-legacy';
import ViteHTMLConfig from 'vite-plugin-html-config';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';
import getTargetBrowsers from 'browserslist-to-esbuild';
import { paramCase } from 'change-case';
import { META_TAGS, APP_CONFIG, PWA_CONFIG } from './appConfig';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  console.log(`✨ Running in ${isProd ? 'Production' : 'Development'}.\n`);

  return {
    resolve: {
      alias: {
        pages: resolve(__dirname, 'src/pages'),
        components: resolve(__dirname, 'src/components'),
        assets: resolve(__dirname, 'src/assets'),
        constants: resolve(__dirname, 'src/constants'),
        context: resolve(__dirname, 'src/context'),
        theme: resolve(__dirname, 'src/theme'),
        utils: resolve(__dirname, 'src/utils'),
        appConfig: resolve(__dirname, './appConfig'),
      },
    },
    plugins: [
      ViteReactPlugin(),
      ViteLinariaPlugin({
        include: ['**/*.styles.js'],
        ...(!isProd && {
          sourceMap: true,
          classNameSlug: (hash, title) => `${paramCase(title)}_${hash}`,
        }),
      }),
      ViteVendorChunkSplit(),
      ViteLegacy({
        // inject polyfills here for modern features if needed
        modernPolyfills: [],
        renderLegacyChunks: false,
      }),
      ViteHTMLConfig({
        metas: META_TAGS,
        ...(isProd && {
          scripts: [
            {
              defer: true,
              src: `https://static.cloudflareinsights.com/beacon.min.js?token=${APP_CONFIG.CLOUDFLARE_ANALYTICS_TOKEN}`,
            },
          ],
        }),
      }),
      isProd &&
        ViteMinifyPlugin({
          // only used to minify html files
          sortAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
        }),
      VitePWA(PWA_CONFIG),
      ViteImageOptimizer(),
    ],
    preview: { open: true },
    server: {
      open: true,
      port: 3000,
      host: true,
      hmr: { overlay: false },
    },
    build: {
      minify: isProd ? 'esbuild' : false,
      target: getTargetBrowsers(),
      sourcemap: isProd ? 'hidden' : true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: file => `chunks/${paramCase(file.name)}.[hash].js`,
          assetFileNames: file => `assets/${paramCase(file.name.split('.')[0])}.[hash].[ext]`,
        },
        plugins: [
          isProd && strip(),
          visualizer({
            filename: 'reports/build-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  };
});
