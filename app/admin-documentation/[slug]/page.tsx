import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DocsPageFrame from "@/components/docs/DocsPageFrame";
import { pageMetadata } from "@/lib/seo";
import {
  DOCS_LAST_UPDATED,
  getAdminDocList,
  getAdminDocSlugs,
  getAdminDocSource,
  resolveFileSlug,
} from "@/lib/admin-docs";
import { extractToc, markdownToHtml } from "@/lib/markdown-basic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function findDoc(
  docs: Awaited<ReturnType<typeof getAdminDocList>>,
  slug: string,
) {
  const fileSlug = resolveFileSlug(slug);
  return (
    docs.find((d) => d.slug === slug) ??
    docs.find((d) => d.fileSlug === fileSlug) ??
    null
  );
}

export async function generateStaticParams() {
  const slugs = await getAdminDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const docs = await getAdminDocList();
  const doc = findDoc(docs, slug);
  if (!doc) return { title: "Seller Dashboard Guidelines" };

  return pageMetadata({
    title: `${doc.title} | Seller Dashboard Guidelines`,
    description: doc.description,
    path: `/admin-documentation/${doc.slug}`,
  });
}

export default async function AdminDocumentationDocPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getAdminDocSource(slug);
  if (!source) notFound();

  const docs = await getAdminDocList();
  const doc = findDoc(docs, slug);
  const title = doc?.title ?? slug;
  const html = markdownToHtml(source);
  const toc = extractToc(source);

  return (
    <DocsPageFrame toc={toc}>
      <Link prefetch={false} href="/admin-documentation" className="docs-back">
        ← Seller Dashboard overview
      </Link>
      <h1 className="docs-title">{title}</h1>
      <p className="docs-meta">Last updated: {DOCS_LAST_UPDATED}</p>
      <div
        className="docs-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </DocsPageFrame>
  );
}
