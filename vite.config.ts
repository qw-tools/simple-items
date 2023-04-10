import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import analyze from "rollup-plugin-analyzer";

// https://vitejs.dev/config/
const vuePlugin = vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => "model-viewer" === tag,
    },
  },
});

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [analyze({ limit: 10 })],
    },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [vuePlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
