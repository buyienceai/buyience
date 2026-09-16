import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../data/posts";
import { formatPublishedDate, getBlogCoverDisplay } from "../lib/posts";
import BlogMeta from "./BlogMeta";

type Props = {
  post: BlogPost;
  variant?: "default" | "featured";
};

export default function BlogCard({ post, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const { width: coverWidth, height: coverHeight, contain: coverContain } = getBlogCoverDisplay(post.slug);

  return (
    <article
      className={`blog-card ${isFeatured ? "blog-card--featured" : ""}`.trim()}
      data-cat={post.category}
    >
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        <div className={`blog-card-media${coverContain ? " blog-card-media--contain" : ""}`}>
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={coverWidth}
            height={coverHeight}
            className="blog-card-img"
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, min(100vw, 1320px)"
                : "(max-width: 768px) 100vw, 560px"
            }
            priority={isFeatured}
          />
          <span className="blog-card-open" aria-hidden="true">
            Open Blog
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M7 17L17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="blog-card-body">
          <span className="blog-card-cat">{post.categoryLabel}</span>
          <h2 className={isFeatured ? "blog-card-title blog-card-title--lg" : "blog-card-title"}>
            {post.title}
          </h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <BlogMeta
            authorName={post.authorName}
            authorInitials={post.authorInitials}
            authorImage={post.authorImage}
            dateLabel={formatPublishedDate(post.publishedAt)}
            dateIso={post.publishedAt}
            readingTime={post.readingTime}
          />
        </div>
      </Link>
    </article>
  );
}
