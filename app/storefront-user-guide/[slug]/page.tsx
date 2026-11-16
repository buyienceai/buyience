import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import { pageMetadata } from "@/lib/seo";
import {
  STOREFRONT_DOCS_LAST_UPDATED,
  getAdjacentStorefrontDocs,
  getStorefrontDocList,
  getStorefrontDocSlugs,
  getStorefrontDocSource,
  resolveStorefrontFileSlug,
  toStorefrontUrlSlug,
} from "@/lib/storefront-docs";
import { markdownToHtml } from "@/lib/markdown-basic";

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
  const { prev, next } = getAdjacentStorefrontDocs(
    docs,
    doc?.slug ?? toStorefrontUrlSlug(slug),
  );

  return (
    <MarketingLayout cta={false}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Link
          prefetch={false}
          href="/storefront-user-guide"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6E2CF4] hover:underline"
        >
          ← All guides
        </Link>
        <h1 className="mt-4 text-3xl font-extrabold tracking-normal text-[#1B1033] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-[12px] text-[#9aa0ae]">
          Last updated: {STOREFRONT_DOCS_LAST_UPDATED}
        </p>
        <div
          className="prose-buyience admin-doc-prose mt-10 space-y-4 text-[15px] leading-relaxed text-[#5A4B7C] [&_a]:font-semibold [&_a]:text-[#6E2CF4] [&_a]:underline-offset-2 hover:[&_a]:underline [&_code]:rounded [&_code]:bg-[#f4f1fa] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_h1]:hidden [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1B1033] [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#1B1033] [&_hr]:my-8 [&_hr]:border-[#ebe7f2] [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#1B1033] [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[13px] [&_td]:border [&_td]:border-[#ebe7f2] [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-[#ebe7f2] [&_th]:bg-[#f7f6fa] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#1B1033] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <nav
          className="mt-14 flex flex-col gap-3 border-t border-[#ebe7f2] pt-8 sm:flex-row sm:justify-between"
          aria-label="Adjacent guides"
        >
          {prev ? (
            <Link
              prefetch={false}
              href={`/storefront-user-guide/${prev.slug}`}
              className="rounded-2xl border border-[#ebe7f2] px-4 py-3 text-[13px] transition-colors hover:border-[#c4b5fd] hover:bg-[#f7f6fa] sm:max-w-[48%]"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#9aa0ae]">
                Previous
              </span>
              <span className="mt-1 block font-semibold text-[#1B1033]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              prefetch={false}
              href={`/storefront-user-guide/${next.slug}`}
              className="rounded-2xl border border-[#ebe7f2] px-4 py-3 text-right text-[13px] transition-colors hover:border-[#c4b5fd] hover:bg-[#f7f6fa] sm:ml-auto sm:max-w-[48%]"
            >
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#9aa0ae]">
                Next
              </span>
              <span className="mt-1 block font-semibold text-[#1B1033]">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </MarketingLayout>
  );
}
