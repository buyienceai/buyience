import DocsLayout from "@/components/docs/DocsLayout";

export default function StorefrontUserGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayout>{children}</DocsLayout>;
}
