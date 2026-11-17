import type { TocItem } from "@/lib/markdown-basic";
import DocsToc from "@/components/docs/DocsToc";

type DocsPageFrameProps = {
  children: React.ReactNode;
  toc?: TocItem[];
  tocLabel?: string;
};

export default function DocsPageFrame({
  children,
  toc = [],
  tocLabel = "On this page",
}: DocsPageFrameProps) {
  return (
    <div className={`docs-page${toc.length > 0 ? " has-toc" : ""}`}>
      <div className="docs-article-wrap">
        {toc.length > 0 ? (
          <details className="docs-toc-mobile">
            <summary>{tocLabel}</summary>
            <DocsToc items={toc} variant="list" />
          </details>
        ) : null}
        <article className="docs-article">{children}</article>
      </div>
      {toc.length > 0 ? (
        <aside className="docs-toc-rail" aria-label="Page sections">
          <DocsToc items={toc} variant="indicator" />
        </aside>
      ) : null}
    </div>
  );
}
