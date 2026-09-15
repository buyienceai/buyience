import type { Metadata } from "next";

/**
 * Public site origin for this deployment.
 * Set NEXT_PUBLIC_SITE_URL only when you need a fixed domain (e.g. https://buyience.com).
 * Otherwise uses Vercel's VERCEL_URL, or localhost in local dev.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

/**
 * Opt-in crawl/index signals (robots, sitemap, Search Console verification, JSON-LD).
 *
 * Set `SEO_INDEXING=true` only on the real production Vercel environment
 * (e.g. buyience.com). Leave unset on Preview / stage (buyience.vercel.app)
 * so those deploys stay noindex and do not expose sitemap / structured data.
 *
 * Prefer this over `VERCEL_ENV === "production"` — a stage branch can still
 * be the project's Production branch and would otherwise look "live" to SEO.
 */
export function isSeoIndexingEnabled(): boolean {
  return process.env.SEO_INDEXING === "true";
}

/** Robots metadata for root layout / pages when indexing is on or off. */
export function seoRobots(): NonNullable<Metadata["robots"]> {
  if (!isSeoIndexingEnabled()) {
    return { index: false, follow: false, nocache: true };
  }

  return {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-video-preview": -1,
    "max-image-preview": "large",
  };
}

const DEFAULT_OG_IMAGE = "/og.png";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

/** Build page Metadata with absolute title, canonical, and OG/Twitter mirrors. */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const images = [{ url: image }];
  const indexing = isSeoIndexingEnabled();

  return {
    title: { absolute: title },
    description,
    robots: seoRobots(),
    // Canonicals only on the indexed production host — avoid advertising stage URLs.
    ...(indexing ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description,
      ...(indexing ? { url: canonical } : {}),
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
