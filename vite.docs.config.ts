import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "docs"),
  publicDir: path.resolve(__dirname, "public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@docs": path.resolve(__dirname, "./docs/src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist-docs"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, "/");

          if (!normalizedId.includes("/node_modules/")) {
            return undefined;
          }

          if (
            normalizedId.includes("/node_modules/react-router/") ||
            normalizedId.includes("/node_modules/react-router-dom/")
          ) {
            return "router-vendor";
          }

          if (
            normalizedId.includes("/node_modules/react-day-picker/") ||
            normalizedId.includes("/node_modules/date-fns/")
          ) {
            return "dates-vendor";
          }

          if (normalizedId.includes("/node_modules/recharts/")) {
            const [, rechartsSubpath = "core"] =
              normalizedId.split("/node_modules/recharts/");
            const cleanSubpath = rechartsSubpath.startsWith("es6/")
              ? rechartsSubpath.slice(4)
              : rechartsSubpath.startsWith("lib/")
                ? rechartsSubpath.slice(4)
                : rechartsSubpath;
            const rechartsSegment = cleanSubpath.split("/")[0] || "core";
            return `recharts-${rechartsSegment}`;
          }

          if (normalizedId.includes("/node_modules/@base-ui/react/")) {
            const [, baseUiSubpath = "core"] =
              normalizedId.split("/node_modules/@base-ui/react/");
            const cleanSubpath = baseUiSubpath.startsWith("esm/")
              ? baseUiSubpath.slice(4)
              : baseUiSubpath;
            const baseUiSegment = cleanSubpath.split("/")[0] || "core";

            if (
              [
                "csp-provider",
                "direction-provider",
                "floating-ui-react",
                "internals",
                "types",
                "unstable-use-media-query",
                "use-render",
                "utils",
              ].includes(baseUiSegment)
            ) {
              return "base-ui-core";
            }

            return `base-ui-${baseUiSegment}`;
          }

          if (normalizedId.includes("/node_modules/embla-carousel-react/")) {
            return "carousel-vendor";
          }

          if (normalizedId.includes("/node_modules/react-resizable-panels/")) {
            return "layout-vendor";
          }

          if (normalizedId.includes("/node_modules/input-otp/")) {
            return "forms-vendor";
          }

          if (normalizedId.includes("/node_modules/cmdk/")) {
            return "command-vendor";
          }

          if (normalizedId.includes("/node_modules/vaul/")) {
            return "overlay-vendor";
          }

          if (normalizedId.includes("/node_modules/sonner/")) {
            return "feedback-vendor";
          }

          if (normalizedId.includes("/node_modules/lucide-react/")) {
            return "icons-vendor";
          }

          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "react-vendor";
          }

          return "vendor";
        },
      },
    },
  },
});
