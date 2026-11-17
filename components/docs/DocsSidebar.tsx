"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  PanelLeftClose,
  Store,
  Users,
} from "lucide-react";
import type { DocsNavSection } from "@/lib/docs-types";

type DocsSidebarProps = {
  nav: DocsNavSection[];
  mobileOpen: boolean;
  onNavigate?: () => void;
  onCloseDesktop?: () => void;
  showDesktopClose?: boolean;
};

const SECTION_ICON = {
  "seller-dashboard": Store,
  "user-dashboard": Users,
} as const;

export default function DocsSidebar({
  nav,
  mobileOpen,
  onNavigate,
  onCloseDesktop,
  showDesktopClose = false,
}: DocsSidebarProps) {
  const pathname = usePathname();
  const menuId = useId();
  const switcherRef = useRef<HTMLDivElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const activeSection =
    nav.find(
      (section) =>
        pathname === section.indexHref ||
        pathname.startsWith(`${section.indexHref}/`),
    ) ?? nav[0];

  const sectionIsActive = (section: DocsNavSection) =>
    pathname === section.indexHref ||
    pathname.startsWith(`${section.indexHref}/`);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        nav.map((section) => [section.id, sectionIsActive(section)]),
      ),
  );

  useEffect(() => {
    setOpenSections((prev) => {
      const merged = { ...prev };
      for (const section of nav) {
        if (sectionIsActive(section)) merged[section.id] = true;
        else if (merged[section.id] === undefined) merged[section.id] = false;
      }
      return merged;
    });
  }, [pathname, nav]);

  useEffect(() => {
    setHelpOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!helpOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) {
        setHelpOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHelpOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [helpOpen]);

  return (
    <aside
      className={`docs-sidebar${mobileOpen ? " is-open" : ""}`}
      aria-label="Documentation"
    >
      <div className="docs-sidebar-inner">
        <div className="docs-sidebar-brand-row">
          <Link prefetch={false} href="/" className="docs-sidebar-brand">
            <Image
              src="/images/buyience.png"
              alt="Buyience"
              width={120}
              height={28}
              className="docs-sidebar-brand-logo"
              style={{ width: "auto", height: 22 }}
            />
            <span className="docs-brand-badge">Docs</span>
          </Link>
          {showDesktopClose ? (
            <button
              type="button"
              className="docs-sidebar-collapse"
              aria-label="Hide sidebar"
              onClick={onCloseDesktop}
            >
              <PanelLeftClose size={16} />
            </button>
          ) : null}
        </div>

        <div className="docs-help-switcher" ref={switcherRef}>
          <button
            type="button"
            className={`docs-help-center${helpOpen ? " is-open" : ""}`}
            aria-haspopup="menu"
            aria-expanded={helpOpen}
            aria-controls={menuId}
            onClick={() => setHelpOpen((open) => !open)}
          >
            <BookOpen size={15} aria-hidden />
            <span>{activeSection?.title ?? "Help Center"}</span>
            <ChevronsUpDown
              size={14}
              className="docs-help-center-chevron"
              aria-hidden
            />
          </button>

          {helpOpen ? (
            <div
              id={menuId}
              className="docs-help-menu"
              role="menu"
              aria-label="Documentation centers"
            >
              {nav.map((section) => {
                const Icon = SECTION_ICON[section.id];
                const selected = section.id === activeSection?.id;
                return (
                  <a
                    key={section.id}
                    href={section.indexHref}
                    role="menuitemradio"
                    aria-checked={selected}
                    className={`docs-help-menu-item${selected ? " is-selected" : ""}`}
                    onClick={() => onNavigate?.()}
                  >
                    <Icon size={15} aria-hidden />
                    <span className="docs-help-menu-copy">
                      <span className="docs-help-menu-title">{section.title}</span>
                      <span className="docs-help-menu-desc">
                        {section.id === "seller-dashboard"
                          ? "Admin & seller dashboard guides"
                          : "Storefront buyer & user guides"}
                      </span>
                    </span>
                    {selected ? <Check size={14} aria-hidden /> : null}
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <p className="docs-nav-group-label">Guides</p>

        {nav.map((section) => {
          const Icon = SECTION_ICON[section.id];
          const expanded = openSections[section.id] ?? false;
          const onOverview = pathname === section.indexHref;

          // Only show the active center's tree, matching Help Center switcher.
          if (activeSection && section.id !== activeSection.id) return null;

          return (
            <div key={section.id} className="docs-nav-section">
              <div
                className={`docs-nav-category${onOverview ? " is-active" : ""}${expanded ? " is-open" : ""}`}
              >
                <Link
                  prefetch={false}
                  href={section.indexHref}
                  className="docs-nav-category-link"
                  onClick={onNavigate}
                >
                  <Icon size={15} aria-hidden />
                  <span>{section.title}</span>
                </Link>
                <button
                  type="button"
                  className="docs-nav-category-toggle"
                  aria-expanded={expanded}
                  aria-label={`${expanded ? "Collapse" : "Expand"} ${section.title}`}
                  onClick={() =>
                    setOpenSections((prev) => ({
                      ...prev,
                      [section.id]: !prev[section.id],
                    }))
                  }
                >
                  {expanded ? (
                    <ChevronDown size={15} aria-hidden />
                  ) : (
                    <ChevronRight size={15} aria-hidden />
                  )}
                </button>
              </div>

              <div
                className={`docs-nav-panel${expanded ? " is-open" : ""}`}
                aria-hidden={!expanded}
                inert={!expanded ? true : undefined}
              >
                <div className="docs-nav-panel-inner">
                  <ul className="docs-nav-list">
                    <li>
                      <Link
                        prefetch={false}
                        href={section.indexHref}
                        className={`docs-nav-link${onOverview ? " is-active" : ""}`}
                        onClick={onNavigate}
                      >
                        Overview
                      </Link>
                    </li>
                    {section.pages.map((page) => {
                      const active = pathname === page.href;
                      return (
                        <li key={page.href}>
                          <Link
                            prefetch={false}
                            href={page.href}
                            className={`docs-nav-link${active ? " is-active" : ""}`}
                            aria-current={active ? "page" : undefined}
                            onClick={onNavigate}
                            title={page.description}
                          >
                            {page.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
