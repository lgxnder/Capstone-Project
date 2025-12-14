import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/static",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/index.js",
        assetFileNames: "assets/index.css",
      },
    },
  },
  server: {
    port: 8000,
    strictPort: true,
  },
});