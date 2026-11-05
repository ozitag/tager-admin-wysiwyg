import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    // ckeditor5 остаётся обычной зависимостью, а не вшивается в бандл:
    // именно из-за вшитой копии прежний пакет весил 7.9 МБ и был не виден
    // ни npm audit, ни Dependabot.
    rollupOptions: {
      external: ["ckeditor5"],
      output: { assetFileNames: "style.css" },
    },
    sourcemap: true,
    target: "es2022",
  },
});
