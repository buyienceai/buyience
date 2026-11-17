export type DocsNavPage = {
  title: string;
  description: string;
  href: string;
  slug: string;
};

export type DocsNavSection = {
  id: "seller-dashboard" | "user-dashboard";
  title: string;
  indexHref: string;
  pages: DocsNavPage[];
};

export type DocsSearchEntry = {
  href: string;
  title: string;
  description: string;
  section: string;
  headings: string[];
  /** Lowercased plain text used for client-side matching. */
  haystack: string;
};
