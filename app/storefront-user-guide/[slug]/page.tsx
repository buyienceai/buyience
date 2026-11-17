import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsPageFrame from "@/components/docs/DocsPageFrame";
import { pageMetadata } from "@/lib/seo";
import {
  STOREFRONT_DOCS_LAST_UPDATED,
  getStorefrontDocList,
  getStorefrontDocSlugs,
  getStorefrontDocSource,
  resolveStorefrontFileSlug,
} from "@/lib/storefront-docs";
import { extractToc, markdownToHtml } from "@/lib/markdown-basic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findDoc(
  docs: Awaited<ReturnType<typeof getStorefrontDocList>>,
  slug: string,
) {
  const fileSlug = resolveStorefrontFileSlug(slug);
  return (
    docs.find((d) => d.slug === slug) ??
    docs.find((d) => d.fileSlug === fileSlug) ??
    null
  );
}

export async function generateStaticParams() {
  const slugs = await getStorefrontDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const docs = await getStorefrontDocList();
  const doc = findDoc(docs, slug);
  if (!doc) return { title: "Buyience Storefront User Guide" };

  return pageMetadata({
    title: `${doc.title} | Buyience Storefront User Guide`,
    description: doc.description,
    path: `/storefront-user-guide/${doc.slug}`,
  });
}

export default async function StorefrontUserGuideDocPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getStorefrontDocSource(slug);
  if (!source) notFound();

  const docs = await getStorefrontDocList();
  const doc = findDoc(docs, slug);
  const title = doc?.title ?? slug;
  const html = markdownToHtml(source);
  const toc = extractToc(source);

  return (
    <DocsPageFrame toc={toc}>
      <Link prefetch={false} href="/storefront-user-guide" className="docs-back">
        ← User Dashboard overview
      </Link>
      <h1 className="docs-title">{title}</h1>
      <p className="docs-meta">Last updated: {STOREFRONT_DOCS_LAST_UPDATED}</p>
      <div
        className="docs-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </DocsPageFrame>
  );
}
