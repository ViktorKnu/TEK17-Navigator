const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "dist", "pages");

const entries = [
  "index.html",
  "styles.css",
  "src/app",
  "src/domain",
  "src/features/advisor",
];

async function preparePages() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, ".nojekyll"), "");

  for (const entry of entries) {
    await copyEntry(path.join(root, entry), path.join(outputDir, entry));
  }
}

async function copyEntry(source, target) {
  const stat = await fs.stat(source);

  if (stat.isDirectory()) {
    await fs.mkdir(target, { recursive: true });
    const children = await fs.readdir(source);
    await Promise.all(
      children.map((child) => copyEntry(path.join(source, child), path.join(target, child))),
    );
    return;
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

preparePages().catch((error) => {
  console.error(error);
  process.exit(1);
});
