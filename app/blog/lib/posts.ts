import { blogPosts, type BlogPost, type BlogPostCategory } from "../data/posts";
import type { BlogCategoryId } from "../data/categories";

/**
 * Parse publish dates as UTC calendar days so sorting is stable across timezones.
 * Accepts `YYYY-MM-DD` and fuller ISO strings.
 */
function publishedAtMs(iso: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (match) {
    return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  const ms = new Date(iso).getTime();
  return Number.isNaN(ms) ? 0 : ms;
}

function byPublishedAtDesc(a: BlogPost, b: BlogPost): number {
  return publishedAtMs(b.publishedAt) - publishedAtMs(a.publishedAt);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(byPublishedAtDesc);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

const DEFAULT_BLOG_COVER = { width: 1488, height: 720, contain: false } as const;

const BLOG_COVER_BY_SLUG: Record<string, { width: number; height: number; contain: true }> = {
  "digital-sales-room-dsr": { width: 1672, height: 941, contain: true },
  "why-corporate-gifting-companies-outgrow-shopify-and-what-to-use-instead": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "b2b-corporate-gifting-at-scale-quoting-bulk-pricing-and-order-management": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "managing-custom-and-bulk-orders-for-corporate-gift-programs": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "industrial-supply-distributors-moving-from-phone-email-orders-to-self-service": {
    width: 1671,
    height: 941,
    contain: true,
  },
  "how-to-price-fasteners-and-mro-parts-for-repeat-b2b-buyers": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "quote-turnaround-time-the-metric-fastener-distributors-ignore": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "volume-discount-structures-that-actually-protect-your-margin": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "tiered-pricing-for-fastener-and-mro-distributors-a-practical-setup-guide": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "how-fastener-distributors-can-stop-losing-margin-on-manual-quotes": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "how-distributors-can-automate-quote-to-order-processes-2026-playbook": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "why-manufacturers-need-a-modern-b2b-ecommerce-platform-in-2026": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "ai-quote-generation-in-b2b-what-is-real-vs-marketing": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "composable-commerce-for-b2b-a-decision-guide": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "the-universal-commerce-protocol-is-here.-most-b2b-platforms-aren-t-ready-for-it": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "why-most-b2b-erp-integrations-fail": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "the-real-cost-of-headless-commerce-for-b2b-companies": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "erp-first-vs-commerce-first-architecture-in-b2b-what-actually-works": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "b2b-reordering-is-broken-and-why-that-matters": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "how-b2b-teams-manage-customer-specific-pricing-at-scale": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "the-real-cost-of-manual-quote-approvals-in-b2b": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "mach-architecture-for-modern-b2b-commerce": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "why-manual-b2b-quoting-is-costing-you-deals": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "ai-quote-engine-for-b2b-commerce": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "b2b-commerce-and-headless-architecture": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "what-is-buyience-a-mordern-b2b-commerce-platform": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "what-is-mach-architecture-a-complete-guide": {
    width: 1672,
    height: 941,
    contain: true,
  },
  "what-is-b2b-ecommerce-a-complete-guide": {
    width: 1672,
    height: 941,
    contain: true,
  },
};

export function getBlogCoverDisplay(slug: string) {
  return BLOG_COVER_BY_SLUG[slug] ?? DEFAULT_BLOG_COVER;
}

/** Newest post by `publishedAt` — date order is the single source of truth. */
export function getFeaturedPost(): BlogPost {
  const posts = getAllPosts();
  return posts[0];
}

export function getPostsByCategory(category: BlogCategoryId): BlogPost[] {
  const posts = getAllPosts();
  if (category === "all") return posts;
  return posts.filter((p) => p.category === category);
}

export function getCategoryCounts(): Record<BlogCategoryId, number> {
  const posts = getAllPosts();
  return {
    all: posts.length,
    b2b: posts.filter((p) => p.category === "b2b").length,
    technology: posts.filter((p) => p.category === "technology").length,
    product: posts.filter((p) => p.category === "product").length,
    trends: posts.filter((p) => p.category === "trends").length,
  };
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const n = posts.length;
  // Need at least two posts to navigate; wrap so the newest post's
  // "Previous" is the oldest, and the oldest post's "Next" is the newest.
  if (n < 2) return { prev: null, next: null };

  return {
    prev: posts[(index - 1 + n) % n],
    next: posts[(index + 1) % n],
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const sameCategory = getAllPosts().filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const extras = getAllPosts().filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...extras].slice(0, limit);
}

export function formatPublishedDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  const date = match
    ? new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
    : new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function isValidCategory(value: string): value is BlogPostCategory {
  return value === "b2b" || value === "technology" || value === "product" || value === "trends";
}
