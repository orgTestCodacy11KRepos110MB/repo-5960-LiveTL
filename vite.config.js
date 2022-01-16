import { defineConfig } from 'vite';
import browserExtension from 'vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import copy from 'rollup-plugin-copy';
import htmlTemplate from 'vite-plugin-html-template';
import manifest from './src/manifest.json';
import pkg from './package.json';
import path from 'path';

const emptyHtml = path.join(__dirname, 'src', 'empty.html');
/** @type {(js: string) => string} */
const htmlEntry = js => path.join(__dirname, 'src', 'js', 'pages', js);

export default defineConfig(({ mode }) => ({
  root: 'src',
  build: {
    outDir: path.resolve(__dirname, 'build'),
    emptyOutDir: true,
    minify: mode === 'production' ? 'terser' : 'esbuild'
  },
  plugins: [
    browserExtension({
      manifest: () => ({
        ...manifest,
        version: (process.env.VERSION ?? '') || pkg.version,
        description: pkg.description
      }),
      assets: 'img',
      watchFilePaths: [
        path.resolve(__dirname, 'src/manifest.json')
      ]
    }),
    svelte({
      configFile: path.resolve(__dirname, 'svelte.config.js'),
      emitCss: false
    }),
    copy({
      targets: [{
        src: 'build/manifest.json',
        dest: 'build',
        transform: content => JSON.stringify({
          ...JSON.parse(content.toString()),
          incognito: 'split'
        }, null, 2),
        rename: 'manifest.chrome.json'
      }]
    }),
    htmlTemplate({
      pagesDir: 'src',
      pages: {
        options: { template: emptyHtml, entry: htmlEntry('options.js') },
        background: { template: emptyHtml, entry: htmlEntry('background.js') }
      }
    })
  ]
}));
