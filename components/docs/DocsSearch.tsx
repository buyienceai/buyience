"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { DocsSearchEntry } from "@/lib/docs-types";

type DocsSearchProps = {
  index: DocsSearchEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function scoreEntry(entry: DocsSearchEntry, terms: string[]) {
  let score = 0;
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  for (const term of terms) {
    if (title === term) score += 120;
    else if (title.startsWith(term)) score += 80;
    else if (title.includes(term)) score += 50;
    if (description.includes(term)) score += 20;
    if (entry.headings.some((h) => h.toLowerCase().includes(term))) score += 25;
    if (entry.haystack.includes(term)) score += 8;
  }
  return score;
}

export default function DocsSearch({
  index,
  open,
  onOpenChange,
}: DocsSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const terms = query
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (terms.length === 0) return index.slice(0, 8);
    return index
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter((row) => row.score > 0 && terms.every((t) => row.entry.haystack.includes(t)))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((row) => row.entry);
  }, [index, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (event.key === "Enter" && results[active]) {
        event.preventDefault();
        router.push(results[active].href);
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, router, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="docs-search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="docs-search-modal">
        <div className="docs-search-input-row">
          <Search className="docs-search-icon" aria-hidden size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Seller and User Dashboard docs…"
            className="docs-search-input"
            aria-autocomplete="list"
            aria-controls="docs-search-results"
          />
          <button
            type="button"
            className="docs-search-close"
            onClick={() => onOpenChange(false)}
            aria-label="Close search"
          >
            <X size={16} />
          </button>
        </div>
        <ul id="docs-search-results" className="docs-search-results" role="listbox">
          {results.length === 0 ? (
            <li className="docs-search-empty">No matching pages.</li>
          ) : (
            results.map((entry, index) => {
              const matchedHeading = entry.headings.find((heading) =>
                query
                  .toLowerCase()
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .some((term) => heading.toLowerCase().includes(term)),
              );
              return (
                <li key={entry.href} role="option" aria-selected={index === active}>
                  <Link
                    prefetch={false}
                    href={entry.href}
                    className={`docs-search-result${index === active ? " is-active" : ""}`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => onOpenChange(false)}
                  >
                    <span className="docs-search-result-section">{entry.section}</span>
                    <span className="docs-search-result-title">{entry.title}</span>
                    <span className="docs-search-result-desc">
                      {matchedHeading ?? entry.description}
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
        <p className="docs-search-hint">
          <kbd>↑</kbd>
          <kbd>↓</kbd> to navigate
          <span aria-hidden>·</span>
          <kbd>Enter</kbd> to open
          <span aria-hidden>·</span>
          <kbd>Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}
