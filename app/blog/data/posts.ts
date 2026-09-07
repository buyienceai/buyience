import type { BlogCategoryId } from "./categories";

export type BlogPostCategory = Exclude<BlogCategoryId, "all">;

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogPostCategory;
  categoryLabel: string;
  authorName: string;
  authorInitials: string;
  authorImage?: string;
  publishedAt: string;
  readingTime: string;
  coverImage: string;
  coverImageAlt: string;
  featured?: boolean;
};

/**
 * Canonical post index. Bodies live in content/blog/<slug>.mdx.
 * Slugs match existing SEO routes in /blog/[slug].
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "tiered-pricing-for-fastener-and-mro-distributors-a-practical-setup-guide",
    title: "Tiered Pricing for Fastener & MRO Distributors: A Practical Setup Guide",
    description:
      "A step-by-step guide to building tiered pricing for fastener and MRO distribution — customer tiers, volume breaks, and how to combine them without breaking your margin.",
    excerpt:
      "Tiered pricing for fastener and MRO distribution needs two layers working together — customer-segment tiers (who's buying) and volume breaks (how much they're buying) — resolved automatically at the line-item level. Most distributors that try to run this manually end up with pricing that's inconsistent, hard to audit, and slowly loses margin. This guide walks through defining tiers, setting volume breaks, layering contract pricing on top, and rolling it out without disrupting active sales relationships.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-07-22",
    readingTime: "8 min read",
    coverImage:
      "/blog/covers/tiered-pricing-for-fastener-and-mro-distributors-a-practical-setup-guide.png",
    coverImageAlt: "Tiered pricing setup for fastener and MRO distributors",
  },
  {
    slug: "how-fastener-distributors-can-stop-losing-margin-on-manual-quotes",
    title: "How Fastener Distributors Can Stop Losing Margin on Manual Quotes",
    description:
      "Manual quoting quietly erodes margin for fastener and MRO distributors. See where the leaks happen and how automated, tiered pricing with margin floors fixes it.",
    excerpt:
      "Manual quoting causes fastener and MRO distributors to lose margin through stale pricing, inconsistent discounting, and no enforced margin floor. Fixing it means automating tiered/contract pricing at the line level, enforcing a system-level margin floor, and keeping one source of truth for pricing — not asking reps to work faster inside the same broken process.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-07-15",
    readingTime: "7 min read",
    coverImage:
      "/blog/covers/how-fastener-distributors-can-stop-losing-margin-on-manual-quotes.png",
    coverImageAlt: "Fastener distributor quoting and margin protection",
  },
  {
    slug: "how-distributors-can-automate-quote-to-order-processes-2026-playbook",
    title: "How Distributors Can Automate Quote-to-Order Processes (2026 Playbook)",
    description:
      "A practical playbook for automating B2B quote-to-order workflows — from PDF POs to straight-through ERP booking.",
    excerpt:
      "It's 7:45 AM. Your best customer service rep sits down, coffee in hand, and opens her inbox. At the top is a 100-line PDF purchase order from a contractor she's worked with for eight years. The part numbers are the customer's, not yours. The pricing tier has to be looked up. The ship-to is one of four addresses on file. She takes a breath and starts typing.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-07-08",
    readingTime: "27 min read",
    coverImage: "/blog/covers/how-distributors-can-automate-quote-to-order-processes-2026-playbook.png",
    coverImageAlt: "Distributor quote-to-order automation illustration",
    featured: true,
  },
  {
    slug: "why-manufacturers-need-a-modern-b2b-ecommerce-platform-in-2026",
    title: "Why Manufacturers Need a Modern B2B Ecommerce Platform in 2026",
    description:
      "Why manufacturers are replacing bolt-on B2B tools with modern commerce platforms in 2026.",
    excerpt:
      "Here's an uncomfortable truth for anyone running a manufacturing business in 2026: your best customer might already be shopping for a replacement supplier — and you won't hear a word about it until the orders stop coming.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-07-06",
    readingTime: "29 min read",
    coverImage: "/blog/covers/why-manufacturers-need-a-modern-b2b-ecommerce-platform-in-2026.png",
    coverImageAlt: "Modern B2B ecommerce for manufacturers",
  },
  {
    slug: "composable-commerce-for-b2b-a-decision-guide",
    title: "Composable Commerce for B2B — A Decision Guide",
    description: "How to decide if composable commerce fits your B2B stack.",
    excerpt:
      "The composable commerce conversation in B2B has focused almost entirely on architecture. The harder question — and the one most teams skip — is whether the workflows underneath are composable too.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-05-28",
    readingTime: "31 min read",
    coverImage: "/blog/covers/composable-commerce-for-b2b-a-decision-guide.png",
    coverImageAlt: "Composable commerce decision guide",
  },
  {
    slug: "ai-quote-generation-in-b2b-what-is-real-vs-marketing",
    title: "AI Quote Generation in B2B — What's Real vs Marketing",
    description: "Separating real AI quoting capability from marketing claims.",
    excerpt:
      "Every B2B quoting vendor now claims AI capabilities. Most are automating the wrong layer. Until your pricing data is structured, governed, and real-time, AI quoting is just faster guessing.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-05-29",
    readingTime: "30 min read",
    coverImage: "/blog/covers/ai-quote-generation-in-b2b-what-is-real-vs-marketing.png",
    coverImageAlt: "AI quote generation in B2B",
  },
  {
    slug: "the-universal-commerce-protocol-is-here.-most-b2b-platforms-aren-t-ready-for-it",
    title: "The Universal Commerce Protocol Is Here. Most B2B Platforms Aren't Ready for It",
    description: "What the Universal Commerce Protocol means for B2B platforms.",
    excerpt:
      "What agent-driven commerce actually demands from your pricing, quoting, and inventory infrastructure — and why the readiness gap is wider than most operators think.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-05-13",
    readingTime: "35 min read",
    coverImage:
      "/blog/covers/the-universal-commerce-protocol-is-here.-most-b2b-platforms-aren-t-ready-for-it.png",
    coverImageAlt: "Universal Commerce Protocol readiness",
  },
  {
    slug: "why-most-b2b-erp-integrations-fail",
    title: "Why Most B2B ERP Integrations Fail",
    description: "How to avoid ERP integration failure in B2B commerce.",
    excerpt:
      "B2B ERP integration challenges refer to the difficulties of connecting ERP systems with ecommerce, pricing, and workflow tools—often resulting in slow performance, inconsistent data, and failed implementations due to poor planning and unclear system responsibilities.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-28",
    readingTime: "9 min read",
    coverImage: "/blog/covers/why-most-b2b-erp-integrations-fail.png",
    coverImageAlt: "B2B ERP integration challenges",
  },
  {
    slug: "the-real-cost-of-headless-commerce-for-b2b-companies",
    title: "The Real Cost of Headless Commerce for B2B Companies",
    description: "Understanding the real cost of headless B2B commerce.",
    excerpt:
      "The cost of headless commerce in B2B includes not just development and infrastructure, but also ongoing expenses from integration complexity.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-23",
    readingTime: "14 min read",
    coverImage: "/blog/covers/the-real-cost-of-headless-commerce-for-b2b-companies.png",
    coverImageAlt: "Cost of headless commerce for B2B",
  },
  {
    slug: "erp-first-vs-commerce-first-architecture-in-b2b-what-actually-works",
    title: "ERP-First vs Commerce-First Architecture in B2B — What Actually Works",
    description: "What actually works for B2B architecture choices.",
    excerpt:
      "ERP ecommerce integration in B2B is the process of connecting your ERP system with your ecommerce platform to sync data like pricing, inventory, orders, and customers—while enabling real-time workflows across systems.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-17",
    readingTime: "14 min read",
    coverImage: "/blog/covers/erp-first-vs-commerce-first-architecture-in-b2b-what-actually-works.png",
    coverImageAlt: "ERP-first vs commerce-first architecture",
  },
  {
    slug: "b2b-reordering-is-broken-and-why-that-matters",
    title: "B2B Reordering Is Broken — and Why That Matters",
    description: "Why B2B reordering experiences fail buyers.",
    excerpt:
      "A B2B reorder portal is a system that allows customers to quickly repeat previous purchases using saved order history, predefined product lists, or contract-specific pricing—without starting from scratch.",
    category: "product",
    categoryLabel: "Product Information",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-14",
    readingTime: "14 min read",
    coverImage: "/blog/covers/b2b-reordering-is-broken-and-why-that-matters.png",
    coverImageAlt: "B2B reordering portal",
  },
  {
    slug: "how-b2b-teams-manage-customer-specific-pricing-at-scale",
    title: "How B2B Teams Manage Customer-Specific Pricing at Scale",
    description: "Managing customer-specific pricing at scale.",
    excerpt:
      "B2B pricing software is a system that centralizes and automates pricing logic across customers, products, and channels—ensuring consistent, real-time pricing without manual intervention.",
    category: "product",
    categoryLabel: "Product Information",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-07",
    readingTime: "13 min read",
    coverImage: "/blog/covers/how-b2b-teams-manage-customer-specific-pricing-at-scale.png",
    coverImageAlt: "Customer-specific B2B pricing",
  },
  {
    slug: "the-real-cost-of-manual-quote-approvals-in-b2b",
    title: "The Real Cost of Manual Quote Approvals in B2B",
    description: "The hidden cost of manual quote approval chains.",
    excerpt:
      "Most B2B leaders think approval delays are a discipline issue. They're usually wrong. When discounts fluctuate, when deals stall waiting for sign-off, when managers complain about review fatigue — the instinct is to tighten policy.",
    category: "trends",
    categoryLabel: "Trends and Insights",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-04-03",
    readingTime: "15 min read",
    coverImage: "/blog/covers/the-real-cost-of-manual-quote-approvals-in-b2b.png",
    coverImageAlt: "Manual quote approval costs",
  },
  {
    slug: "why-manual-b2b-quoting-is-costing-you-deals",
    title: "Why Manual B2B Quoting Is Costing You Deals",
    description: "How manual quoting loses revenue.",
    excerpt:
      "And why your “faster quoting” initiative is probably solving the wrong problem.",
    category: "trends",
    categoryLabel: "Trends and Insights",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-02-12",
    readingTime: "18 min read",
    coverImage: "/blog/covers/why-manual-b2b-quoting-is-costing-you-deals.png",
    coverImageAlt: "Cost of manual B2B quoting",
  },
  {
    slug: "mach-architecture-for-modern-b2b-commerce",
    title: "How MACH Architecture Enables Modern B2B Commerce",
    description: "MACH architecture for modern B2B commerce platforms.",
    excerpt:
      "Traditional B2B commerce platforms were built to solve simpler problems. When they launched, the typical B2B workflow was relatively predictable.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-01-16",
    readingTime: "23 min read",
    coverImage: "/blog/covers/mach-architecture-for-modern-b2b-commerce.png",
    coverImageAlt: "MACH architecture for B2B commerce",
  },
  {
    slug: "ai-quote-engine-for-b2b-commerce",
    title: "Quote in B2B & AI Quote Engine: How It Works",
    description: "How an AI quote engine changes B2B sales cycles.",
    excerpt:
      "Discover how an AI quote engine transforms B2B commerce with faster pricing, accurate quotes, automation, and an improved buyer experience.",
    category: "product",
    categoryLabel: "Product Information",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-01-10",
    readingTime: "10 min read",
    coverImage: "/blog/covers/ai-quote-engine-for-b2b-commerce.png",
    coverImageAlt: "AI Quote Engine for B2B",
  },
  {
    slug: "b2b-commerce-and-headless-architecture",
    title:
      "B2B Commerce and Headless Architecture: What Headless Solves, What It Doesn't, and When It Matters",
    description: "Headless architecture for B2B commerce — benefits and limits.",
    excerpt:
      "Headless architecture separates the frontend presentation layer of a system from the backend business logic and data management.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-01-06",
    readingTime: "34 min read",
    coverImage: "/blog/covers/b2b-commerce-and-headless-architecture.png",
    coverImageAlt: "Headless architecture in B2B commerce",
  },
  {
    slug: "what-is-b2b-ecommerce-a-complete-guide",
    title: "B2B E-commerce: What It Is, Why It Matters, and How Modern Platforms Support It",
    description: "A complete guide to B2B ecommerce for wholesalers and distributors.",
    excerpt:
      "B2B e-commerce is the digital infrastructure that enables business-to-business transactions, from product discovery through ordering, fulfillment, and payment.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-01-02",
    readingTime: "31 min read",
    coverImage: "/blog/covers/what-is-b2b-ecommerce-a-complete-guide.png",
    coverImageAlt: "What is B2B ecommerce",
  },
  {
    slug: "composable-commerce-for-b2b-businesses",
    title: "Composable Commerce: What It Really Means for Modern B2B Businesses",
    description: "Composable commerce patterns for B2B businesses.",
    excerpt:
      "Composable commerce is an architectural approach where commerce capabilities are assembled from independent, specialized components rather than delivered as a single, pre-integrated platform.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-01-01",
    readingTime: "19 min read",
    coverImage: "/blog/covers/composable-commerce-for-b2b-businesses.png",
    coverImageAlt: "Composable commerce for B2B",
  },
  {
    slug: "what-is-mach-architecture-a-complete-guide",
    title: "What Is MACH Architecture? A Complete Guide for Modern B2B Commerce",
    description: "A complete guide to MACH architecture.",
    excerpt:
      "MACH architecture is a composable, cloud-native approach to building commerce platforms based on microservices, API-first design, headless presentation layers, and elastic cloud infrastructure.",
    category: "technology",
    categoryLabel: "Technology",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2025-12-29",
    readingTime: "22 min read",
    coverImage: "/blog/covers/what-is-mach-architecture-a-complete-guide.png",
    coverImageAlt: "What is MACH architecture",
  },
  {
    slug: "what-is-buyience-a-mordern-b2b-commerce-platform",
    title: "What Is Buyience? A Modern API-Driven B2B Commerce Platform Built for Operational Scale",
    description: "An introduction to Buyience Nova Core.",
    excerpt:
      "Buyience is an API-driven B2B commerce platform designed to unify the operational systems that power modern B2B businesses.",
    category: "product",
    categoryLabel: "Product Information",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2025-12-28",
    readingTime: "19 min read",
    coverImage: "/blog/covers/what-is-buyience-a-mordern-b2b-commerce-platform.png",
    coverImageAlt: "What is Buyience",
  },
];

/** @deprecated Use blogPosts — kept for any transitional imports */
export const blogPostsData = blogPosts;
