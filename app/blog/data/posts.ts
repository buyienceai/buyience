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
    slug: "digital-sales-room-dsr",
    title: "Digital Sales Room (DSR)",
    description:
      "What a digital sales room is, how it works in B2B distribution and wholesale, key features, and how it differs from a shared folder or a proposal tool. A complete guide.",
    excerpt:
      "A digital sales room (DSR) is a secure, shared online workspace where a seller and a buyer work through a deal together — reviewing quotes, negotiating pricing, exchanging questions, and reaching agreement — in one place, with a record of everything that happened.",
    category: "product",
    categoryLabel: "Product Information",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-04",
    readingTime: "11 min read",
    coverImage: "/blog/covers/digital-sales-room-herosection.png",
    coverImageAlt:
      "Shared digital sales room where B2B buyers and sellers negotiate quotes online",
  },
  /* Temporarily commented out
  {
    slug: "buyience-vs-shopify-plus-for-b2b-which-fits-wholesale-distributors",
    title: "Buyience vs Shopify Plus for B2B: Which Fits Wholesale Distributors",
    description:
      "An honest comparison of Shopify Plus and Buyience for wholesale distributors in 2026 — where each genuinely fits, what Shopify's native B2B now covers, and where quoting-led selling needs something else.",
    excerpt:
      "Shopify Plus and Buyience solve different problems. Shopify is catalogue-and-checkout commerce with a strong B2B layer added — excellent if your wholesale motion is buyers logging in and ordering from a catalogue at their agreed prices. Buyience is quoting-and-negotiation commerce — built for distributors whose deals are won or lost on how fast and how accurately they can quote, revise, and negotiate. If most of your revenue arrives through self-service reordering, Shopify is likely the better fit. If most of it arrives through quotes, it probably isn't.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-10-09",
    readingTime: "9 min read",
    coverImage:
      "/blog/covers/buyience-vs-shopify-plus-for-b2b-which-fits-wholesale-distributors.png",
    coverImageAlt: "Buyience vs Shopify Plus for wholesale distributors",
  },
  {
    slug: "corporate-gifting-rfps-streamlining-the-quote-to-order-process",
    title: "Corporate Gifting RFPs: Streamlining the Quote-to-Order Process",
    description:
      "Corporate gifting RFPs are won on response quality and speed. Here's how to qualify them, structure a response, and move from award to order without losing the details.",
    excerpt:
      "Corporate gifting RFPs are expensive to respond to and easy to lose for reasons unrelated to your actual capability — a missed compliance requirement, a slow response, or pricing that couldn't be revised fast enough during evaluation. The businesses that win consistently qualify hard before responding, build responses from reusable components rather than from scratch, and treat the gap between award and first order as a defined process rather than an improvisation.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-10-04",
    readingTime: "8 min read",
    coverImage:
      "/blog/covers/corporate-gifting-rfps-streamlining-the-quote-to-order-process.png",
    coverImageAlt: "Corporate gifting RFPs and quote-to-order process",
  },
  {
    slug: "how-to-quote-custom-branded-corporate-gifts-without-a-spreadsheet",
    title: "How to Quote Custom-Branded Corporate Gifts Without a Spreadsheet",
    description:
      "Custom-branded gift quotes involve setup fees, per-unit decoration costs, and multi-variant configurations that spreadsheets handle badly. Here's how to structure them properly.",
    excerpt:
      "Quoting a custom-branded gift order is a configuration problem, not a pricing lookup. Decoration method, setup fees, colour counts, placement counts, and variant splits all interact — and a spreadsheet forces you to rebuild that logic by hand for every quote. The fix is defining your cost components as rules once, so any combination prices itself. This guide covers how to break down a custom gift quote into its actual components and structure them so they're reusable.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-29",
    readingTime: "8 min read",
    coverImage:
      "/blog/covers/how-to-quote-custom-branded-corporate-gifts-without-a-spreadsheet.png",
    coverImageAlt: "Quoting custom-branded corporate gifts without a spreadsheet",
  },
  {
    slug: "seasonal-demand-spikes-inventory-planning-for-corporate-gifting-brands",
    title: "Seasonal Demand Spikes: Inventory Planning for Corporate Gifting Brands",
    description:
      "Corporate gifting demand concentrates into a few weeks a year. Here's how to plan inventory, supplier lead times, and capacity so the peak doesn't break your operation.",
    excerpt:
      "Corporate gifting demand doesn't spread evenly across the year — it concentrates heavily into a handful of weeks, which means annual averages are close to useless for planning. Effective planning works backward from peak-week capacity rather than forward from annual volume, commits inventory early enough to clear supplier lead times, and separates what genuinely must be pre-committed from what can stay flexible. This guide covers how to build that plan.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-24",
    readingTime: "8 min read",
    coverImage:
      "/blog/covers/seasonal-demand-spikes-inventory-planning-for-corporate-gifting-brands.png",
    coverImageAlt: "Seasonal inventory planning for corporate gifting brands",
  },
  */
  {
    slug: "multi-warehouse-inventory-for-industrial-suppliers-a-practical-guide",
    title: "Multi-Warehouse Inventory for Industrial Suppliers: A Practical Guide",
    description:
      "How fastener and industrial suppliers can manage multi-warehouse inventory without overselling, stockouts, or manual reconciliation — a practical setup guide.",
    excerpt:
      "Running inventory across more than one warehouse solves real problems — shorter delivery times, regional redundancy, room to grow — but it introduces a coordination problem that single-location distributors never have to solve: knowing, in real time, exactly what's available where. Distributors who get this wrong end up overselling stock that's already spoken for, or sitting on excess inventory in one location while another runs a stockout. This guide covers how to structure multi-warehouse inventory so the numbers stay trustworthy.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Girish Laathar",
    authorInitials: "GL",
    authorImage: "/blog/authors/girish1.png",
    publishedAt: "2026-09-17",
    readingTime: "8 min read",
    coverImage: "/blog/covers/multi-warehouse-inventory-herosection.png",
    coverImageAlt: "Multi-warehouse inventory for industrial suppliers",
  },
  {
    slug: "net-30-60-90-terms-in-industrial-distribution-what-actually-works",
    title: "Net 30/60/90 Terms in Industrial Distribution: What Actually Works",
    description:
      "A practical look at Net 30/60/90 payment terms for fastener and industrial distributors — how to set them, when to extend them, and how to protect cash flow while doing it.",
    excerpt:
      "Net terms are standard practice in industrial and fastener distribution, but \"standard\" doesn't mean \"safe by default.\" The distributors who manage terms well tie them to a defined credit policy, apply them consistently rather than case-by-case, and track them in the same system that handles quoting and orders — not in a separate spreadsheet that goes stale. This guide covers how to set a terms policy, when to extend or restrict it, and what breaks when terms live disconnected from the rest of your sales process.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-14",
    readingTime: "8 min read",
    coverImage:
      "/blog/covers/net-30-60-90-terms-in-industrial-distribution-what-actually-works.png",
    coverImageAlt: "Net 30/60/90 payment terms for industrial distributors",
  },
  {
    slug: "managing-custom-and-bulk-orders-for-corporate-gift-programs",
    title: "Managing Custom and Bulk Orders for Corporate Gift Programs",
    description:
      "How to run custom and bulk corporate gift orders without losing details between quote and fulfillment \u2014 order intake, approvals, proofing, and multi-recipient shipping.",
    excerpt:
      "Corporate gift programs fail operationally in a specific, predictable place: the handoff between what was agreed during the sale and what actually gets produced and shipped. Custom specifications live in email threads, recipient lists arrive as loose spreadsheets, and proofing happens informally. The fix is treating custom requirements as structured order data rather than conversational context \u2014 captured once, at intake, and visible to everyone downstream.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-09",
    readingTime: "8 min read",
    coverImage: "/blog/covers/machine-custom-and-bulk-order-herosection.png",
    coverImageAlt:
      "Structured workflow for managing custom and bulk corporate gift orders",
  },
  {
    slug: "why-corporate-gifting-companies-outgrow-shopify-and-what-to-use-instead",
    title: "Why Corporate Gifting Companies Outgrow Shopify (and What to Use Instead)",
    description:
      "Shopify works well for corporate gifting companies at low volume. Here's exactly where it starts to break as bulk quoting, custom orders, and B2B accounts grow \u2014 and what to look for instead.",
    excerpt:
      "Shopify is a genuinely good starting point for a corporate gifting business \u2014 fast to launch, easy to run, well-documented. The problem isn't Shopify itself; it's that it was built for consumer checkout, not B2B quoting, bulk pricing, and account-based ordering. Most gifting companies feel the mismatch first in quoting speed and pricing consistency, then in order and fulfillment complexity as B2B accounts grow. This post covers exactly where that mismatch shows up and what a purpose-built B2B alternative needs to handle instead.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-09-02",
    readingTime: "8 min read",
    coverImage: "/blog/covers/why-Corporate-Gifting-herosection.png",
    coverImageAlt:
      "Why corporate gifting businesses outgrow Shopify for B2B quoting and bulk orders",
  },
  {
    slug: "b2b-corporate-gifting-at-scale-quoting-bulk-pricing-and-order-management",
    title: "B2B Corporate Gifting at Scale: Quoting, Bulk Pricing, and Order Management",
    description:
      "How corporate gifting companies can scale past manual quoting and spreadsheet order management \u2014 bulk pricing, custom orders, and fulfillment that holds up under volume.",
    excerpt:
      "Corporate gifting businesses hit a specific wall as they grow \u2014 the same tools that worked for a handful of custom orders a month can't handle bulk quoting, tiered pricing, and fulfillment coordination for hundreds of orders at once. The fix isn't working harder inside a spreadsheet; it's a system built for bulk B2B quoting, customizable order rules, and inventory that stays accurate under volume. This guide covers where corporate gifting operations typically break, and what to build instead.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-08-26",
    readingTime: "8 min read",
    coverImage: "/blog/covers/b2b-corporate-gifting-hero.png",
    coverImageAlt:
      "Scaling corporate gifting with automated quoting, bulk pricing, and order management",
  },
  {
    slug: "industrial-supply-distributors-moving-from-phone-email-orders-to-self-service",
    title: "Industrial Supply Distributors: Moving From Phone/Email Orders to Self-Service",
    description:
      "A practical guide for industrial and fastener distributors moving from phone and email ordering to a self-service B2B portal \u2014 without alienating your existing customers.",
    excerpt:
      "Phone and email ordering has been the default in fastener and industrial distribution for decades, and it works \u2014 until order volume grows past what a team can handle personally without delay or error. Moving to self-service doesn't mean removing the relationship or the phone line; it means giving customers who want to reorder a known SKU in thirty seconds the ability to do that, while keeping people available for the orders that genuinely need a conversation. This guide covers how to make that transition without disrupting the accounts that value the personal touch.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-08-19",
    readingTime: "8 min read",
    coverImage: "/blog/covers/industrial-supply-distributors-herosection.png",
    coverImageAlt:
      "Industrial distributor shifting routine reorders from phone and email to self-service",
  },
  {
    slug: "how-to-price-fasteners-and-mro-parts-for-repeat-b2b-buyers",
    title: "How to Price Fasteners and MRO Parts for Repeat B2B Buyers",
    description:
      "A practical framework for pricing fasteners and MRO parts for repeat B2B buyers \u2014 rewarding loyalty without eroding margin or losing pricing consistency.",
    excerpt:
      "Repeat buyers are the backbone of fastener and MRO distribution, and most distributors intuitively price them differently than new accounts \u2014 usually just not consistently or deliberately. The fix isn't a single \"loyal customer discount.\" It's a structured approach that separates what a repeat relationship is actually worth from what a single large order is worth, and prices each factor on its own terms rather than blending them into a gut-feel number.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-08-12",
    readingTime: "8 min read",
    coverImage: "/blog/covers/how-to-price-fasteners-herosection.png",
    coverImageAlt:
      "Tiered pricing framework for fasteners and MRO parts sold to repeat B2B buyers",
  },
  {
    slug: "quote-turnaround-time-the-metric-fastener-distributors-ignore",
    title: "Quote Turnaround Time: The Metric Fastener Distributors Ignore",
    description:
      "Quote turnaround time is one of the biggest hidden drivers of win rate for fastener and MRO distributors. Here's how to measure it, benchmark it, and actually improve it.",
    excerpt:
      "Most fastener and MRO distributors track win rate, average order value, and revenue per rep \u2014 but rarely track how long it actually takes to get a quote out the door. That's a gap, because quote turnaround time is one of the few metrics that directly predicts win rate in competitive, time-sensitive B2B buying situations. This post covers how to measure it properly, what a reasonable benchmark looks like, and where the time actually goes.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-08-05",
    readingTime: "8 min read",
    coverImage: "/blog/covers/quote-turnaround-time-herosection.png",
    coverImageAlt:
      "Faster quote turnaround helping fastener distributors win time-sensitive B2B deals",
  },
  {
    slug: "volume-discount-structures-that-actually-protect-your-margin",
    title: "Volume Discount Structures That Actually Protect Your Margin",
    description:
      "How to design volume discount pricing for fastener and MRO distribution that wins bigger orders without quietly eroding margin \u2014 a practical framework.",
    excerpt:
      "Volume discounts are supposed to trade lower unit price for higher order size \u2014 a fair exchange when it's modeled correctly. The failure mode isn't offering volume discounts; it's setting break points and discount depths without checking them against actual cost structure and margin floor, which turns a growth lever into a slow margin leak. This guide covers how to build volume discount tiers that hold up under real negotiation pressure.",
    category: "b2b",
    categoryLabel: "B2B",
    authorName: "Jordian F.",
    authorInitials: "JF",
    authorImage: "/blog/authors/jordian.jpg",
    publishedAt: "2026-07-29",
    readingTime: "8 min read",
    coverImage: "/blog/covers/volume-discount-structures-herosection.png",
    coverImageAlt:
      "Volume discount tiers that stay above a protected margin floor for B2B distributors",
  },
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
