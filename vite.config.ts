import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },

    build: isLib
      ? {
          // ── Build de lib ─────────────────────────────────────────────────────
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "RankMyAppDS",
            formats: ["es", "umd"],
            fileName: (fmt) =>
              `rankmyapp-ds.${fmt === "es" ? "es.js" : "umd.cjs"}`,
          },
          rollupOptions: {
            external: [
              "react",
              "react/jsx-runtime",
              "react-dom",
              "react-router-dom",
            ],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "ReactJSXRuntime",
              },
            },
          },
          cssCodeSplit: false,
          sourcemap: true,
          emptyOutDir: true,
        }
      : {
          // ── Build do docs SPA ────────────────────────────────────────────────
          outDir: "dist-docs",
        },
  };
});
