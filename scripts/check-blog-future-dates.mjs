#!/usr/bin/env node
/**
 * Fail when blog posts in app/blog/data/posts.ts have publishedAt after today (UTC).
 *
 * Usage:
 *   node scripts/check-blog-future-dates.mjs
 *   node scripts/check-blog-future-dates.mjs --production-only
 *   npm run check:blog-dates
 *
 * --production-only: no-op when SHOW_FUTURE_BLOGS=true (stage/preview), or when
 *   neither VERCEL_ENV=production nor SEO_INDEXING=true. Live builds still fail
 *   if future-dated posts are present.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const postsPath = path.join(root, "app/blog/data/posts.ts");

const productionOnly = process.argv.includes("--production-only");
const showFutureBlogs = process.env.SHOW_FUTURE_BLOGS === "true";
const isProduction =
  process.env.VERCEL_ENV === "production" ||
  process.env.SEO_INDEXING === "true";

if (productionOnly && showFutureBlogs) {
  console.log(
    "check-blog-future-dates: skip (SHOW_FUTURE_BLOGS=true — scheduled posts allowed).",
  );
  process.exit(0);
}

if (productionOnly && !isProduction) {
  console.log(
    "check-blog-future-dates: skip (not production — VERCEL_ENV / SEO_INDEXING).",
  );
  process.exit(0);
}

const source = fs.readFileSync(postsPath, "utf8");

/** @type {{ slug: string; publishedAt: string }[]} */
const posts = [];
const blockRe =
  /\{\s*slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"(\d{4}-\d{2}-\d{2})"/g;

let match;
while ((match = blockRe.exec(source)) !== null) {
  posts.push({ slug: match[1], publishedAt: match[2] });
}

if (posts.length === 0) {
  console.error(
    `check-blog-future-dates: no posts found in ${path.relative(root, postsPath)}`,
  );
  process.exit(1);
}

function utcDayMs(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return NaN;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

const now = new Date();
const todayMs = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
const todayIso = now.toISOString().slice(0, 10);

const future = posts
  .filter((p) => {
    const ms = utcDayMs(p.publishedAt);
    return !Number.isNaN(ms) && ms > todayMs;
  })
  .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));

if (future.length === 0) {
  console.log(
    `check-blog-future-dates: OK — ${posts.length} posts, none after ${todayIso} (UTC).`,
  );
  process.exit(0);
}

console.error(
  `check-blog-future-dates: ${future.length} future-dated post(s) vs today ${todayIso} (UTC):\n`,
);
for (const p of future) {
  console.error(`  - ${p.publishedAt}  /blog/${p.slug}`);
}
console.error(
  `\nFix: set publishedAt to today or earlier before merging to live.`,
);
console.error(
  `Stage/preview: set SHOW_FUTURE_BLOGS=true so scheduled posts stay visible and this check is skipped.`,
);
process.exit(1);
