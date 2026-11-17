import DocsLayout from "@/components/docs/DocsLayout";

export default function AdminDocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
