import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    chunkSplitPlugin({
      strategy: "single-vendor",
      customChunk: (args) => {
        // files into pages directory is export in single files
        let { file } = args;
        if (file.startsWith("src/pages/") || file.startsWith("src/features")) {
          file = file.substring(4);
          file = file.replace(/\.[^.$]+$/, "");
          return file;
        }
        return null;
      },
      customSplitting: {
        // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
        "react-vendor": ["react", "react-dom"],
        // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
        utils: [/src\/utils/],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
