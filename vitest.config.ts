/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',      // ✅ simulates the browser (needed for DOM stuff)
    globals: true,             // ✅ allows global `expect`, `describe`, etc.
    setupFiles: ['./setupTests.ts'], // ✅ points to your jest-dom setup
  },
});
