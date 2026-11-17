import { getDocsNav } from "@/lib/docs-nav";
import { getDocsSearchIndex } from "@/lib/docs-search";
import DocsShell from "@/components/docs/DocsShell";
import "@/components/docs/docs.css";

type DocsLayoutProps = {
  children: React.ReactNode;
};

/** Shared Seller + User Dashboard documentation chrome. */
export default async function DocsLayout({ children }: DocsLayoutProps) {
  const [nav, searchIndex] = await Promise.all([
    getDocsNav(),
    getDocsSearchIndex(),
  ]);

  return (
    <DocsShell nav={nav} searchIndex={searchIndex}>
      {children}
    </DocsShell>
  );
}
