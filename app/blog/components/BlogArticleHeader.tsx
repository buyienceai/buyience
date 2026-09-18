import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../data/posts";
import { formatPublishedDate, getBlogCoverDisplay } from "../lib/posts";
import BlogMeta from "./BlogMeta";

type Props = {
  post: BlogPost;
};

export default function BlogArticleHeader({ post }: Props) {
  const { width: coverWidth, height: coverHeight, contain: coverContain } = getBlogCoverDisplay(post.slug);

  return (
    <header className="blog-article-header">
      <div className="blog-article-top">
        <Link href="/blog" className="blog-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All blogs
        </Link>
        <span className="blog-article-cat">{post.categoryLabel}</span>
      </div>

      <div className={`blog-article-cover${coverContain ? " blog-article-cover--contain" : ""}`}>
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          width={coverWidth}
          height={coverHeight}
          className="blog-article-cover-img"
          sizes="(max-width: 900px) 100vw, min(100vw, var(--w-max))"
          priority
        />
      </div>

      <h1>{post.title}</h1>
      <p className="blog-article-dek">{post.excerpt}</p>
      <BlogMeta
        authorName={post.authorName}
        authorInitials={post.authorInitials}
        authorImage={post.authorImage}
        dateLabel={formatPublishedDate(post.publishedAt)}
        dateIso={post.publishedAt}
        readingTime={post.readingTime}
        size="md"
      />
    </header>
  );
}
