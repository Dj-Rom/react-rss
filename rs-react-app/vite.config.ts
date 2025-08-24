/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      exclude: [
        'vite.config.ts',
        'eslint.config.js',
        '**/*.d.ts',
        'src/test/setup.ts',
        'src/vitest.config.ts',
        'src/main.tsx',
        'src/types.ts',
      ],
    },
  },
});
