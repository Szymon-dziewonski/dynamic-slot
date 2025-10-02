import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import svgicon from "vite-plugin-svgicon";
import { join } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgicon({
      include: ["**/assets/svg-icons/*.svg"],
      svgFilePath: join(fileURLToPath(import.meta.url), "src/assets/svg"),
      // default svgo config is https://github.com/MMF-FE/svgicon/blob/master/packages/svgicon-gen/src/svgoConfig.ts
      svgoConfig: {
        multipass: true,
        floatPrecision: 4,
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: ["data-*", "data.*", "fill*"],
            },
          },
          {
            name: "sortAttrs",
          },
        ],
      },
    }),
  ],
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
