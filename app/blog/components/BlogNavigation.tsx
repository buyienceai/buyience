import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../data/posts";
import { getBlogCoverDisplay } from "../lib/posts";

type Props = {
  prev: BlogPost | null;
  next: BlogPost | null;
};

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M8.75 2.625 4.375 7l4.375 4.375"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5.25 2.625 9.625 7 5.25 11.375"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavCard({
  post,
  direction,
}: {
  post: BlogPost;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  const cover = getBlogCoverDisplay(post.slug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`blog-nav-card blog-nav-card--${direction}`}
    >
      <span className="blog-nav-dir">
        {!isNext ? (
          <span className="blog-nav-arrow">
            <ArrowLeftIcon />
          </span>
        ) : null}
        <span className="blog-nav-label">
          {isNext ? "Next article" : "Previous article"}
        </span>
        {isNext ? (
          <span className="blog-nav-arrow">
            <ArrowRightIcon />
          </span>
        ) : null}
      </span>

      <span className="blog-nav-media blog-nav-media--contain">
        <Image
          src={post.coverImage}
          alt=""
          width={cover.width}
          height={cover.height}
          className="blog-nav-img"
          sizes="(max-width: 768px) 100vw, 440px"
        />
      </span>

      <span className="blog-nav-body">
        <span className="blog-nav-meta">
          <span className="blog-nav-cat">{post.categoryLabel}</span>
          <span className="blog-nav-meta-dot" aria-hidden="true" />
          <span>{post.readingTime}</span>
        </span>
        <span className="blog-nav-title">{post.title}</span>
      </span>
    </Link>
  );
}

export default function BlogNavigation({ prev, next }: Props) {
  if (!prev && !next) return null;

  const single = Boolean(prev) !== Boolean(next);

  return (
    <nav className="blog-nav" aria-label="Adjacent articles">
      <div className={`blog-nav-grid${single ? " blog-nav-grid--single" : ""}`}>
        {prev ? <NavCard post={prev} direction="prev" /> : <span aria-hidden="true" />}
        {next ? <NavCard post={next} direction="next" /> : null}
      </div>
    </nav>
  );
}
