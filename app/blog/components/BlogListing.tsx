"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "../data/posts";
import { blogCategories, type BlogCategoryId } from "../data/categories";
import BlogCategories from "./BlogCategories";
import BlogCard from "./BlogCard";

type Props = {
  posts: BlogPost[];
  counts: Record<BlogCategoryId, number>;
};

/**
 * Parse publish dates as UTC calendar days for stable client-side ordering.
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

export default function BlogListing({ posts, counts }: Props) {
  const [active, setActive] = useState<BlogCategoryId>("all");

  // Always sort by publish date DESC before filter / featured / count UI.
  const sortedPosts = useMemo(
    () => [...posts].sort(byPublishedAtDesc),
    [posts],
  );

  const filtered = useMemo(() => {
    const list =
      active === "all"
        ? sortedPosts
        : sortedPosts.filter((p) => p.category === active);
    return [...list].sort(byPublishedAtDesc);
  }, [sortedPosts, active]);

  // Featured slot = newest in the current filtered set (date is source of truth).
  const featured = filtered[0];
  const gridPosts = useMemo(
    () => (featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered),
    [filtered, featured],
  );

  const showFeatured = Boolean(featured) && filtered.length > 0;

  return (
    <section className="blog-listing" aria-label="Blog posts">
      <div className="container">
        <BlogCategories
          categories={blogCategories}
          counts={counts}
          active={active}
          onChange={setActive}
        />

        {showFeatured && featured ? (
          <div className="blog-featured-wrap">
            <BlogCard post={featured} variant="featured" />
          </div>
        ) : null}

        {gridPosts.length > 0 ? (
          <div className="blog-grid">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : !showFeatured ? (
          <p className="blog-empty">
            <strong>Nothing in this category yet.</strong> Try another filter, or browse all posts.
          </p>
        ) : null}

        <p className="blog-count-line">
          Showing {filtered.length} of {sortedPosts.length} posts
        </p>
      </div>
    </section>
  );
}
