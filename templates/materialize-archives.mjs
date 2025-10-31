import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const entries = await readdir(__dirname, { withFileTypes: true });
  const encodedArchives = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith(".zip.base64")
  );

  if (encodedArchives.length === 0) {
    console.log("No encoded template archives were found.");
    return;
  }

  for (const archive of encodedArchives) {
    const sourcePath = path.join(__dirname, archive.name);
    const targetPath = sourcePath.replace(/\.base64$/, "");

    const raw = await readFile(sourcePath, "utf8");
    const decoded = Buffer.from(raw.replace(/\s+/g, ""), "base64");

    await writeFile(targetPath, decoded);
    console.log(`Materialized ${path.basename(targetPath)}`);
  }
}

main().catch((error) => {
  console.error("Failed to materialize template archives:", error);
  process.exit(1);
});
