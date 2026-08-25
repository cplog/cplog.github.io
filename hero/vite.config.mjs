import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  // lib mode does not set this for you, and without it React ships its dev
  // build -- which both throws `process is not defined` in the browser and
  // carries the whole development warning apparatus
  define: { "process.env.NODE_ENV": '"production"' },
  build: {
    outDir: "../assets/hero",
    emptyOutDir: true,
    lib: { entry: "src/hero.jsx", formats: ["es"], fileName: () => "hero.js" },
    rollupOptions: { output: { assetFileNames: "hero[extname]" } },
  },
});
