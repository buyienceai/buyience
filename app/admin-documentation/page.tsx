import Link from "next/link";
import type { Metadata } from "next";
import DocsPageFrame from "@/components/docs/DocsPageFrame";
import { pageMetadata } from "@/lib/seo";
import {
  ADMIN_DOC_TASKS,
  DOCS_LAST_UPDATED,
  getAdminDocList,
  taskHref,
} from "@/lib/admin-docs";

export const metadata: Metadata = pageMetadata({
  title: "Seller Dashboard Guidelines | Buyience",
  description:
    "Buyience seller dashboard guidelines for admins and sellers: products, quotes, orders, inventory, settings, and troubleshooting.",
  path: "/admin-documentation",
});

export default async function AdminDocumentationIndexPage() {
  const docs = await getAdminDocList();

  return (
    <DocsPageFrame>
      <p className="docs-kicker">Seller Dashboard</p>
      <h1 className="docs-title">Seller Dashboard Guidelines</h1>
      <p className="docs-lead">
        Practical step-by-step manuals for Admins and Sellers. Start with a
        common task below, or open any full guide.
      </p>
      <p className="docs-meta">Last updated: {DOCS_LAST_UPDATED}</p>

      <h2 className="docs-section-title">I want to…</h2>
      <div className="docs-card-grid">
        {ADMIN_DOC_TASKS.map((task) => (
          <Link
            key={task.fileSlug}
            prefetch={false}
            href={taskHref(task.fileSlug)}
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
              href={`/admin-documentation/${doc.slug}`}
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
