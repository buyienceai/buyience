import "server-only";
import { getAdminDocList } from "@/lib/admin-docs";
import { getStorefrontDocList } from "@/lib/storefront-docs";
import type { DocsNavSection } from "@/lib/docs-types";

export type { DocsNavPage, DocsNavSection } from "@/lib/docs-types";

export async function getDocsNav(): Promise<DocsNavSection[]> {
  const [sellerDocs, userDocs] = await Promise.all([
    getAdminDocList(),
    getStorefrontDocList(),
  ]);

  return [
    {
      id: "seller-dashboard",
      title: "Seller Dashboard",
      indexHref: "/admin-documentation",
      pages: sellerDocs.map((doc) => ({
        title: doc.title,
        description: doc.description,
        href: `/admin-documentation/${doc.slug}`,
        slug: doc.slug,
      })),
    },
    {
      id: "user-dashboard",
      title: "User Dashboard",
      indexHref: "/storefront-user-guide",
      pages: userDocs.map((doc) => ({
        title: doc.title,
        description: doc.description,
        href: `/storefront-user-guide/${doc.slug}`,
        slug: doc.slug,
      })),
    },
  ];
}
