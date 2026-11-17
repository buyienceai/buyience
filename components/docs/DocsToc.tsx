"use client";

import { useEffect, useMemo, useState } from "react";
import { ListTree } from "lucide-react";
import type { TocItem } from "@/lib/markdown-basic";

type DocsTocProps = {
  items: TocItem[];
  /** Compact list used inside the mobile details panel */
  variant?: "indicator" | "list";
};

function preferTopLevel(items: TocItem[]): TocItem[] {
  const h2 = items.filter((item) => item.level === 2);
  return h2.length > 0 ? h2 : items;
}

export default function DocsToc({
  items,
  variant = "indicator",
}: DocsTocProps) {
  const sections = useMemo(() => preferTopLevel(items), [items]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const headings = sections
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    const syncActive = () => {
      const marker = 120;
      let current = headings[0].id;
      for (const heading of headings) {
        const top = heading.getBoundingClientRect().top;
        if (top <= marker) current = heading.id;
        else break;
      }
      setActiveId(current);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [sections]);

  if (sections.length === 0) return null;

  const activeIndex = Math.max(
    0,
    sections.findIndex((item) => item.id === activeId),
  );
  const activeItem = sections[activeIndex] ?? sections[0];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (variant === "list") {
    return (
      <nav className="docs-toc-list-nav" aria-label="On this page">
        <ul className="docs-toc-list">
          {sections.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeId === item.id ? "is-active" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="docs-toc-indicator" aria-label="On this page">
      <div className="docs-toc-hint" aria-hidden="true">
        <span className="docs-toc-chip">
          <ListTree size={14} aria-hidden />
          <span>On this page</span>
          <span className="docs-toc-count">
            {activeIndex + 1} of {sections.length}
          </span>
        </span>
        <span className="docs-toc-current">{activeItem.text}</span>
      </div>

      <ul className="docs-toc-dots">
        {sections.map((item, index) => {
          const active = item.id === activeItem.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`docs-toc-dot${active ? " is-active" : ""}`}
                aria-label={`Go to ${item.text} (${index + 1} of ${sections.length})`}
                aria-current={active ? "true" : undefined}
                title={item.text}
                onClick={() => scrollTo(item.id)}
              >
                <span className="docs-toc-dot-mark" aria-hidden />
                <span className="docs-toc-dot-label">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
