import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const site = process.env.PUBLIC_SITE_URL ?? "http://localhost:4321";
const base = process.env.PUBLIC_BASE_PATH ?? "";

export default defineConfig({
  site,
  base,
  output: "static",
  publicDir: "static",
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) {
              return "react";
            }
            if (id.includes("/node_modules/@firebase/firestore/")) {
              return "firebase-firestore";
            }
            if (id.includes("/node_modules/@firebase/auth/")) {
              return "firebase-auth";
            }
            if (id.includes("/node_modules/@firebase/ai/")) {
              return "firebase-ai";
            }
          },
        },
      },
    },
  },
});
