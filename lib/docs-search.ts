import "server-only";
import { getAdminDocList, getAdminDocSource } from "@/lib/admin-docs";
import {
  getStorefrontDocList,
  getStorefrontDocSource,
} from "@/lib/storefront-docs";
import { extractToc } from "@/lib/markdown-basic";
import type { DocsSearchEntry } from "@/lib/docs-types";

export type { DocsSearchEntry } from "@/lib/docs-types";

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getDocsSearchIndex(): Promise<DocsSearchEntry[]> {
  const [sellerDocs, userDocs] = await Promise.all([
    getAdminDocList(),
    getStorefrontDocList(),
  ]);

  const entries: DocsSearchEntry[] = [];

  for (const doc of sellerDocs) {
    const source = (await getAdminDocSource(doc.slug)) ?? "";
    const headings = extractToc(source).map((h) => h.text);
    const body = stripMarkdown(source).slice(0, 4000);
    entries.push({
      href: `/admin-documentation/${doc.slug}`,
      title: doc.title,
      description: doc.description,
      section: "Seller Dashboard",
      headings,
      haystack: [doc.title, doc.description, ...headings, body]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const doc of userDocs) {
    const source = (await getStorefrontDocSource(doc.slug)) ?? "";
    const headings = extractToc(source).map((h) => h.text);
    const body = stripMarkdown(source).slice(0, 4000);
    entries.push({
      href: `/storefront-user-guide/${doc.slug}`,
      title: doc.title,
      description: doc.description,
      section: "User Dashboard",
      headings,
      haystack: [doc.title, doc.description, ...headings, body]
        .join(" ")
        .toLowerCase(),
    });
  }

  return entries;
}
