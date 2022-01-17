import { defineConfig } from 'vite';
import browserExtension from 'vite-plugin-web-extension';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import copy from 'rollup-plugin-copy';
import mpa from 'vite-plugin-mpa';
import htmlTemplate from 'vite-plugin-html-template';
import manifest from './src/manifest.json';
import pkg from './package.json';
import path from 'path';

// const emptyHtml = path.join(__dirname, 'src', 'empty.html');
const emptyHtml = 'src/empty.html';
/** @type {(js: string) => string} */
const htmlEntry = js => `src/js/pages/${js}.js`;

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'build',
    emptyOutDir: true,
    minify: mode === 'production' ? 'terser' : 'esbuild',
    rollupOptions: {
      input: {
        options: path.resolve(__dirname, 'src/js/pages/options/index.html')
      }
    }
  },
  plugins: [
    // browserExtension({
    //   manifest: () => ({
    //     ...manifest,
    //     version: (process.env.VERSION ?? '') || pkg.version,
    //     description: pkg.description
    //   }),
    //   assets: 'img',
    //   watchFilePaths: [
    //     path.resolve(__dirname, 'src/manifest.json')
    //   ]
    // }),
    svelte({
      configFile: path.resolve(__dirname, 'svelte.config.js'),
      emitCss: false
    }),
    // copy({
    //   targets: [{
    //     src: 'build/manifest.json',
    //     dest: 'build',
    //     transform: content => JSON.stringify({
    //       ...JSON.parse(content.toString()),
    //       incognito: 'split'
    //     }, null, 2),
    //     rename: 'manifest.chrome.json'
    //   }]
    // }),
    // mpa({
    //   scanDir: 'src/js/pages',
    //   scanFile: 'index.js'
    // }),
    htmlTemplate({
      pages: {
        options: {
          template: 'src/empty.html',
          entry: 'src/js/pages/options/index.js'
        }
        // options: { template: emptyHtml, entry: 'src/js/pages/options/index.js' }
        // background: { template: emptyHtml, entry: htmlEntry('background') }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}));
