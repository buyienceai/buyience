import Link from "next/link";
import type { Metadata } from "next";
import DocsPageFrame from "@/components/docs/DocsPageFrame";
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
    <DocsPageFrame>
      <p className="docs-kicker">User Dashboard</p>
      <h1 className="docs-title">Buyience Storefront User Guide</h1>
      <p className="docs-lead">
        Step-by-step buyer manuals for the Buyience customer storefront. Start
        with a common task, or open any full guide.
      </p>
      <p className="docs-meta">Last updated: {STOREFRONT_DOCS_LAST_UPDATED}</p>

      <h2 className="docs-section-title">I want to…</h2>
      <div className="docs-card-grid">
        {STOREFRONT_DOC_TASKS.map((task) => (
          <Link
            key={task.fileSlug}
            prefetch={false}
            href={storefrontTaskHref(task.fileSlug)}
            className="docs-card"
          >
            <span className="docs-card-title">{task.title}</span>
            <span className="docs-card-desc">{task.description}</span>
          </Link>
        ))}
      </div>

      <h2 className="docs-section-title">All guides</h2>
      <ul className="docs-guide-list">
        {docs.map((doc, index) => (
          <li key={doc.slug}>
            <Link
              prefetch={false}
              href={`/storefront-user-guide/${doc.slug}`}
              className="docs-guide-item"
            >
              <span className="docs-guide-index">{index + 1}</span>
              <span className="min-w-0">
                <span className="docs-guide-title">{doc.title}</span>
                <span className="docs-guide-desc">{doc.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </DocsPageFrame>
  );
}
