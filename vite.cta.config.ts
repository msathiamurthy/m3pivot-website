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
      entry: path.resolve(__dirname, "src/mount-cta.tsx"),
      name: "M3Cta",
      formats: ["iife"],
      fileName: () => "cta.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "cta.[ext]",
        inlineDynamicImports: true,
      },
    },
    outDir: "js",
    cssCodeSplit: false,
  },
});
