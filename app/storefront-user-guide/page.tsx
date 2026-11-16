import Link from "next/link";
import type { Metadata } from "next";
import MarketingLayout from "@/components/MarketingLayout";
import { pageMetadata } from "@/lib/seo";
import {
  STOREFRONT_DOC_TASKS,
  STOREFRONT_DOCS_LAST_UPDATED,
  getStorefrontDocList,
  storefrontTaskHref,
} from "@/lib/storefront-docs";

export const metadata: Metadata = pageMetadata({
  title: "Buyience Storefront User Guide | Buyience",
  description:
    "Buyience storefront user guide for buyers: browse products, cart, checkout, account, orders, RFQ, and troubleshooting.",
  path: "/storefront-user-guide",
});

export default async function StorefrontUserGuideIndexPage() {
  const docs = await getStorefrontDocList();

  return (
    <MarketingLayout cta={false}>
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa0ae]">
          Resources
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-normal text-[#1B1033] sm:text-5xl">
          Buyience Storefront User Guide
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-[#5A4B7C]">
          Step-by-step buyer manuals for the Buyience customer storefront.
          Start with a common task, or open any full guide.
        </p>
        <p className="mt-2 text-[12px] text-[#9aa0ae]">
          Last updated: {STOREFRONT_DOCS_LAST_UPDATED}
        </p>

        <h2 className="mt-12 text-lg font-bold text-[#1B1033]">I want to…</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {STOREFRONT_DOC_TASKS.map((task) => (
            <Link
              key={task.fileSlug}
              prefetch={false}
              href={storefrontTaskHref(task.fileSlug)}
              className="rounded-2xl border border-[#ebe7f2] bg-white p-4 transition-colors hover:border-[#c4b5fd] hover:bg-[#f7f6fa]"
            >
              <span className="block text-[14px] font-semibold text-[#1B1033]">
                {task.title}
              </span>
              <span className="mt-1 block text-[12px] leading-relaxed text-[#6b7280]">
                {task.description}
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-bold text-[#1B1033]">All guides</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {docs.map((doc, index) => (
            <li key={doc.slug}>
              <Link
                prefetch={false}
                href={`/storefront-user-guide/${doc.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-[#ebe7f2] bg-white p-4 transition-colors hover:border-[#c4b5fd] hover:bg-[#f7f6fa]"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F4EFFF] text-[12px] font-bold text-[#6E2CF4]">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-[#1B1033] group-hover:text-[#6E2CF4]">
                    {doc.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-[#6b7280]">
                    {doc.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingLayout>
  );
}
