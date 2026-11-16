import "server-only";
import fs from "fs/promises";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs/storefront-user-guide");
const BASE_PATH = "/storefront-user-guide";

export type StorefrontDocMeta = {
  slug: string;
  fileSlug: string;
  title: string;
  description: string;
  filename: string;
};

export type StorefrontDocTask = {
  title: string;
  description: string;
  fileSlug: string;
};

export const STOREFRONT_DOC_TASKS: StorefrontDocTask[] = [
  {
    title: "How to find products",
    description: "Browse categories, catalogue, and product cards",
    fileSlug: "PRODUCT_BROWSING_GUIDE",
  },
  {
    title: "How to view product details",
    description: "Variants, quantity, wishlist, and pricing",
    fileSlug: "PRODUCT_DETAILS_GUIDE",
  },
  {
    title: "How to add products to cart",
    description: "Cart quantities, import/export, and checkout entry",
    fileSlug: "SHOPPING_CART_GUIDE",
  },
  {
    title: "How to place an order",
    description: "Addresses, payment terms, and Place Order",
    fileSlug: "CHECKOUT_GUIDE",
  },
  {
    title: "How to manage my account",
    description: "Sign in, register, and buyer dashboard",
    fileSlug: "CUSTOMER_ACCOUNT_GUIDE",
  },
  {
    title: "How to check my orders",
    description: "Order list, reorder, cancel, and returns",
    fileSlug: "ORDER_MANAGEMENT_GUIDE",
  },
];

export const STOREFRONT_DOC_ORDER: { fileSlug: string; description: string }[] =
  [
    {
      fileSlug: "README",
      description: "Overview and task shortcuts for buyers",
    },
    {
      fileSlug: "HOMEPAGE_GUIDE",
      description: "Homepage sections and first steps",
    },
    {
      fileSlug: "NAVIGATION_GUIDE",
      description: "Header, search, cart, account, and footer",
    },
    {
      fileSlug: "PRODUCT_BROWSING_GUIDE",
      description: "Categories, catalogue, and product cards",
    },
    {
      fileSlug: "PRODUCT_DETAILS_GUIDE",
      description: "Product page actions and quantity rules",
    },
    {
      fileSlug: "SEARCH_AND_FILTER_GUIDE",
      description: "Header search, sort, and price filters",
    },
    {
      fileSlug: "SHOPPING_CART_GUIDE",
      description: "Cart management and Proceed to Checkout",
    },
    {
      fileSlug: "CHECKOUT_GUIDE",
      description: "Checkout fields and Place Order",
    },
    {
      fileSlug: "CUSTOMER_ACCOUNT_GUIDE",
      description: "Login, register, and dashboard menus",
    },
    {
      fileSlug: "ORDER_MANAGEMENT_GUIDE",
      description: "Orders, reorder, and cancel",
    },
    {
      fileSlug: "PAYMENT_AND_SHIPPING_GUIDE",
      description: "Shipping quotes and payment options",
    },
    {
      fileSlug: "RFQ_GUIDE",
      description: "Request Quote and RFQ cart",
    },
    {
      fileSlug: "FAQ_AND_TROUBLESHOOTING",
      description: "Common problems and fixes",
    },
  ];

export const STOREFRONT_DOCS_LAST_UPDATED = "November 2026";

export function toStorefrontUrlSlug(fileSlug: string): string {
  if (fileSlug === "README") return "overview";
  return fileSlug.toLowerCase().replace(/_/g, "-");
}

export function resolveStorefrontFileSlug(param: string): string | null {
  const safe = param.replace(/[^A-Za-z0-9_-]/g, "");
  if (!safe) return null;
  const byFile = STOREFRONT_DOC_ORDER.find((e) => e.fileSlug === safe);
  if (byFile) return byFile.fileSlug;
  const lower = safe.toLowerCase();
  const byUrl = STOREFRONT_DOC_ORDER.find(
    (e) => toStorefrontUrlSlug(e.fileSlug) === lower,
  );
  return byUrl?.fileSlug ?? null;
}

function titleFromMarkdown(source: string, fallback: string): string {
  const match = source.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || fallback;
}

async function readRawDoc(fileSlug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(DOCS_DIR, `${fileSlug}.md`), "utf8");
  } catch {
    return null;
  }
}

async function getTitleByFileSlug(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  for (const entry of STOREFRONT_DOC_ORDER) {
    const raw = await readRawDoc(entry.fileSlug);
    if (!raw) continue;
    map[entry.fileSlug] = titleFromMarkdown(
      raw,
      entry.fileSlug.replace(/_/g, " "),
    );
  }
  return map;
}

export function rewriteStorefrontDocLinks(
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
      return `[${display}](${BASE_PATH}/${toStorefrontUrlSlug(fileSlug)})`;
    },
  );
}

export async function getStorefrontDocSource(
  slugParam: string,
): Promise<string | null> {
  const fileSlug = resolveStorefrontFileSlug(slugParam);
  if (!fileSlug) return null;
  const raw = await readRawDoc(fileSlug);
  if (!raw) return null;
  const titles = await getTitleByFileSlug();
  return rewriteStorefrontDocLinks(raw, titles);
}

export async function getStorefrontDocList(): Promise<StorefrontDocMeta[]> {
  const docs: StorefrontDocMeta[] = [];
  const titles = await getTitleByFileSlug();
  for (const entry of STOREFRONT_DOC_ORDER) {
    const raw = await readRawDoc(entry.fileSlug);
    if (!raw) continue;
    docs.push({
      slug: toStorefrontUrlSlug(entry.fileSlug),
      fileSlug: entry.fileSlug,
      title: titles[entry.fileSlug] ?? entry.fileSlug.replace(/_/g, " "),
      description: entry.description,
      filename: `${entry.fileSlug}.md`,
    });
  }
  return docs;
}

export async function getStorefrontDocSlugs(): Promise<string[]> {
  const list = await getStorefrontDocList();
  return list.map((d) => d.slug);
}

export function getAdjacentStorefrontDocs(
  docs: StorefrontDocMeta[],
  slug: string,
): { prev: StorefrontDocMeta | null; next: StorefrontDocMeta | null } {
  const fileSlug = resolveStorefrontFileSlug(slug);
  const index = docs.findIndex(
    (d) =>
      d.slug === slug ||
      d.fileSlug === fileSlug ||
      d.slug === toStorefrontUrlSlug(slug),
  );
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  };
}

export function storefrontTaskHref(fileSlug: string): string {
  return `${BASE_PATH}/${toStorefrontUrlSlug(fileSlug)}`;
}
