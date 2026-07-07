/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      // 2. Configura la copia e il watch
      targets: [
        {
          src: 'src/translations/**/*', // Assicurati che il percorso sia corretto (src e non erc)
          dest: 'translations', // Verranno copiati in dist/translations
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'SimpleInventoryCard',
      fileName: 'simple-inventory-card',
      formats: ['es'],
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      // external: ['lit'],
      output: {
        globals: {
          lit: 'Lit',
        },
        entryFileNames: 'simple-inventory-card.js',
      },
    },
    minify: 'terser',
    sourcemap: false,
    //copyPublicDir: false,
  },
  //publicDir: false,
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts}'],
      reporter: ['text', 'html', 'json', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        'vite.config.ts',
        'tests/',
        '.stryker-tmp/**/*',
        'src/styles/',
        'src/types/',
      ],
      all: true,
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    setupFiles: ['./tests/setup.ts'],
  },
  /*  server: {
    host: true, // Permette di accedere alla porta locale
    port: 5173, // La porta standard di Vite
    proxy: {
      // Reindirizza le richieste API e WebSocket a Home Assistant
      '/api': {
        target: 'http://localhost:8123', // L'indirizzo di Home Assistant sul tuo PC
        changeOrigin: true,
        ws: true, // Fondamentale per i WebSocket di Home Assistant
      },
      '/local': {
        target: 'http://localhost:8123',
        changeOrigin: true,
      },
    },
  },*/
});
