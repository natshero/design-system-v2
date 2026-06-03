import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

await mkdir(path.join(distDir, "styles"), { recursive: true });

await cp(path.join(rootDir, "src", "index.css"), path.join(distDir, "index.css"));
await cp(
  path.join(rootDir, "src", "styles", "themes.css"),
  path.join(distDir, "styles", "themes.css"),
);
