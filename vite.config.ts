import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { htmlPrerender } from "vite-plugin-html-prerender";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const prerenderRoutes = ["/", "/privacy", "/terms", "/support"];

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === "build"
      ? [
          htmlPrerender({
            staticDir: resolve(__dirname, "dist"),
            routes: prerenderRoutes,
          }),
        ]
      : []),
  ],
}));
