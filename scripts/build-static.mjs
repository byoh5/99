import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://times-table-quiz-playground.vercel.app";
const rootDir = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outDir = join(rootDir, "dist");

const excludedEntries = new Set([
  ".git",
  ".gitignore",
  ".vercel",
  "dist",
  "node_modules",
  "package-lock.json",
  "package.json",
  "pnpm-lock.yaml",
  "PROGRAM_SPEC.md",
  "README.md",
  "scripts",
  "test-results",
  "vercel.json",
  "yarn.lock"
]);

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".txt",
  ".xml"
]);

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    SOURCE_URL
);

rmSync(outDir, { force: true, recursive: true });
mkdirSync(outDir, { recursive: true });

copyRootEntries(rootDir, outDir);
rewriteUrls(outDir);

console.log(`Built static site into ${outDir}`);
console.log(`Resolved SITE_URL=${siteUrl}`);

function copyRootEntries(srcDir, destDir) {
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (excludedEntries.has(entry.name)) {
      continue;
    }

    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      cpSync(srcPath, destPath, { recursive: true });
      continue;
    }

    if (entry.isFile()) {
      cpSync(srcPath, destPath);
    }
  }
}

function rewriteUrls(dirPath) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const entryPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      rewriteUrls(entryPath);
      continue;
    }

    if (!entry.isFile() || !textExtensions.has(extname(entry.name).toLowerCase())) {
      continue;
    }

    const contents = readFileSync(entryPath, "utf8");
    const nextContents = contents.replaceAll(SOURCE_URL, siteUrl);

    if (nextContents !== contents) {
      writeFileSync(entryPath, nextContents);
    }
  }
}

function normalizeSiteUrl(value) {
  const raw = (value || SOURCE_URL).trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}
