import "server-only";
import fs from "fs/promises";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs/user-guide");

export type AdminDocMeta = {
  /** Public URL segment (no .md), e.g. getting-started */
  slug: string;
  /** Markdown filename without extension, e.g. GETTING_STARTED */
  fileSlug: string;
  title: string;
  description: string;
  filename: string;
};

export type AdminDocTask = {
  title: string;
  description: string;
  /** fileSlug used to resolve the public URL */
  fileSlug: string;
};

/** Task-based entry points shown on the docs index. */
export const ADMIN_DOC_TASKS: AdminDocTask[] = [
  {
    title: "Add my first product",
    description: "Create, price, stock, and publish a product",
    fileSlug: "PRODUCT_MANAGEMENT_GUIDE",
  },
  {
    title: "Create and send a quote",
    description: "Use the Quote Engine for B2B deals",
    fileSlug: "QUOTE_ENGINE_GUIDE",
  },
  {
    title: "Process an order",
    description: "Update status, labels, and returns",
    fileSlug: "ORDER_MANAGEMENT_GUIDE",
  },
  {
    title: "Fix low stock",
    description: "Update quantities, POs, and transfers",
    fileSlug: "INVENTORY_MANAGEMENT_GUIDE",
  },
  {
    title: "Invite a teammate",
    description: "Users, roles, and first login",
    fileSlug: "ADMIN_USER_GUIDE",
  },
  {
    title: "Look up a button",
    description: "Quick meanings for Save, Publish, Update Status, and more",
    fileSlug: "BUTTON_CHEAT_SHEET",
  },
];

/** Display order for Seller Dashboard Guidelines (matches markdown filenames). */
export const ADMIN_DOC_ORDER: { fileSlug: string; description: string }[] = [
  {
    fileSlug: "README",
    description: "How to use this manual and what Admin vs Seller means",
  },
  {
    fileSlug: "GETTING_STARTED",
    description: "Login, first steps, and finding your way around",
  },
  {
    fileSlug: "BUTTON_CHEAT_SHEET",
    description: "Common buttons and what they do",
  },
  {
    fileSlug: "ADMIN_USER_GUIDE",
    description: "Full admin overview of every major area",
  },
  {
    fileSlug: "SELLER_USER_GUIDE",
    description: "Day-to-day selling for store operators",
  },
  {
    fileSlug: "PRODUCT_MANAGEMENT_GUIDE",
    description: "Add, edit, publish, variants, images, and pricing",
  },
  {
    fileSlug: "QUOTE_ENGINE_GUIDE",
    description: "Create quotes, negotiate, DSR chat, and RFQ invitations",
  },
  {
    fileSlug: "ORDER_MANAGEMENT_GUIDE",
    description: "Orders, drafts, shipping labels, and returns",
  },
  {
    fileSlug: "INVENTORY_MANAGEMENT_GUIDE",
    description: "Stock, purchase orders, suppliers, and transfers",
  },
  {
    fileSlug: "STORE_AND_PROFILE_GUIDE",
    description: "Store settings, branding, and account security",
  },
  {
    fileSlug: "PAYMENTS_AND_EARNINGS_GUIDE",
    description: "Customer receivables and Buyience subscription billing",
  },
  {
    fileSlug: "REPORTS_AND_ANALYTICS_GUIDE",
    description: "Dashboards and what the numbers mean",
  },
  {
    fileSlug: "COMMON_TASKS_AND_WORKFLOWS",
    description: "End-to-end everyday workflows",
  },
  {
    fileSlug: "TROUBLESHOOTING_GUIDE",
    description: "Common problems and how to fix them",
  },
];

export const DOCS_LAST_UPDATED = "November 2026";

/** Public URL slug from markdown filename (no .md). */
export function toUrlSlug(fileSlug: string): string {
  if (fileSlug === "README") return "overview";
  return fileSlug.toLowerCase().replace(/_/g, "-");
}

/** Resolve either a public URL slug or a legacy FILE_SLUG to the markdown file slug. */
export function resolveFileSlug(param: string): string | null {
  const safe = param.replace(/[^A-Za-z0-9_-]/g, "");
  if (!safe) return null;

  const byFile = ADMIN_DOC_ORDER.find((e) => e.fileSlug === safe);
  if (byFile) return byFile.fileSlug;

  const lower = safe.toLowerCase();
  const byUrl = ADMIN_DOC_ORDER.find((e) => toUrlSlug(e.fileSlug) === lower);
  return byUrl?.fileSlug ?? null;
}

function titleFromMarkdown(source: string, fallback: string): string {
  const match = source.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || fallback;
}

async function readRawDoc(fileSlug: string): Promise<string | null> {
  const filePath = path.join(DOCS_DIR, `${fileSlug}.md`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

async function getTitleByFileSlug(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const entry of ADMIN_DOC_ORDER) {
    const raw = await readRawDoc(entry.fileSlug);
    if (!raw) continue;
    map[entry.fileSlug] = titleFromMarkdown(
      raw,
      entry.fileSlug.replace(/_/g, " "),
    );
  }
  return map;
}

/**
 * Rewrite ./FILE.md markdown links to in-app routes.
 * Link text becomes the document H1 (never shows .md).
 */
export function rewriteAdminDocLinks(
  source: string,
  titleByFileSlug: Record<string, string> = {},
): string {
  return source.replace(
    /\[([^\]]+)\]\((?:\.\/)?([A-Za-z0-9_-]+)\.md\)/g,
    (_match, text: string, fileSlug: string) => {
      const title = titleByFileSlug[fileSlug];
      const display =
        title && /\.md$/i.test(text)
          ? title
          : title && text.replace(/_/g, "") === fileSlug.replace(/_/g, "")
            ? title
            : /\.md$/i.test(text)
              ? text.replace(/\.md$/i, "").replace(/_/g, " ")
              : text;
      return `[${display}](/admin-documentation/${toUrlSlug(fileSlug)})`;
    },
  );
}

export async function getAdminDocSource(slugParam: string): Promise<string | null> {
  const fileSlug = resolveFileSlug(slugParam);
  if (!fileSlug) return null;
  const raw = await readRawDoc(fileSlug);
  if (!raw) return null;
  const titles = await getTitleByFileSlug();
  return rewriteAdminDocLinks(raw, titles);
}

export async function getAdminDocList(): Promise<AdminDocMeta[]> {
  const docs: AdminDocMeta[] = [];
  const titles = await getTitleByFileSlug();

  for (const entry of ADMIN_DOC_ORDER) {
    const raw = await readRawDoc(entry.fileSlug);
    if (!raw) continue;
    const title =
      titles[entry.fileSlug] ?? entry.fileSlug.replace(/_/g, " ");
    docs.push({
      slug: toUrlSlug(entry.fileSlug),
      fileSlug: entry.fileSlug,
      title,
      description: entry.description,
      filename: `${entry.fileSlug}.md`,
    });
  }

  return docs;
}

export async function getAdminDocSlugs(): Promise<string[]> {
  const list = await getAdminDocList();
  return list.map((d) => d.slug);
}

export function getAdjacentDocs(
  docs: AdminDocMeta[],
  slug: string,
): { prev: AdminDocMeta | null; next: AdminDocMeta | null } {
  const fileSlug = resolveFileSlug(slug);
  const index = docs.findIndex(
    (d) => d.slug === slug || d.fileSlug === fileSlug || d.slug === toUrlSlug(slug),
  );
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  };
}

export function taskHref(fileSlug: string): string {
  return `/admin-documentation/${toUrlSlug(fileSlug)}`;
}
