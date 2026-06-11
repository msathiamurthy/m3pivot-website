import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    minify: "esbuild",
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/mount-magic-text.tsx"),
      name: "M3MagicText",
      formats: ["iife"],
      fileName: () => "magic-text.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "magic-text.[ext]",
        inlineDynamicImports: true,
      },
    },
    outDir: "js",
    cssCodeSplit: false,
  },
});
