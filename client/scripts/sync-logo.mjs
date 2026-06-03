import { copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src/assets/Logo.svg");

for (const name of ["logo.svg", "favicon.svg"]) {
    copyFileSync(src, join(root, "public", name));
}
