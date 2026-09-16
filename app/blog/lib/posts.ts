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
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
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
