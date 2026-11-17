"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, PanelLeft, Search, X } from "lucide-react";
import type { DocsNavSection, DocsSearchEntry } from "@/lib/docs-types";
import DocsSearch from "@/components/docs/DocsSearch";
import DocsSidebar from "@/components/docs/DocsSidebar";

type DocsShellProps = {
  nav: DocsNavSection[];
  searchIndex: DocsSearchEntry[];
  children: React.ReactNode;
};

export default function DocsShell({
  nav,
  searchIndex,
  children,
}: DocsShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNavOpen]);

  return (
    <div
      className={`docs-shell${desktopSidebarOpen ? "" : " docs-shell-sidebar-collapsed"}`}
    >
      <header className="docs-topbar">
        <div className="docs-topbar-left">
          <button
            type="button"
            className="docs-icon-btn docs-mobile-only"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {!desktopSidebarOpen ? (
            <button
              type="button"
              className="docs-icon-btn docs-desktop-only"
              aria-label="Show sidebar"
              onClick={() => setDesktopSidebarOpen(true)}
            >
              <PanelLeft size={16} />
            </button>
          ) : null}
          <Link prefetch={false} href="/" className="docs-brand docs-brand-compact">
            <Image
              src="/images/buyience.png"
              alt="Buyience"
              width={140}
              height={32}
              priority
              className="docs-brand-logo"
            />
            <span className="docs-brand-badge">Docs</span>
          </Link>
        </div>

        <button
          type="button"
          className="docs-search-trigger"
          onClick={() => setSearchOpen(true)}
          aria-label="Search documentation"
        >
          <Search size={16} aria-hidden />
          <span className="docs-search-trigger-label">Search documentation...</span>
          <kbd className="docs-search-kbd">Ctrl K</kbd>
        </button>
      </header>

      {mobileNavOpen ? (
        <button
          type="button"
          className="docs-sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <div className="docs-frame">
        <DocsSidebar
          nav={nav}
          mobileOpen={mobileNavOpen}
          onNavigate={() => setMobileNavOpen(false)}
          showDesktopClose
          onCloseDesktop={() => setDesktopSidebarOpen(false)}
        />
        <div className="docs-main">{children}</div>
      </div>

      <DocsSearch
        index={searchIndex}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </div>
  );
}
