"use client";

import React from "react";
import { Eye, Layers, Rocket, Sparkles, Target } from "lucide-react";
import MarketingLayout from "@/components/MarketingLayout";
import ChallengeSection from "@/components/ChallengeSection";
import SplitCopyCards from "@/components/SplitCopyCards";
import FeatureGridSection from "@/components/FeatureGridSection";
import CapabilitiesChipGridSection from "@/components/CapabilitiesChipGridSection";
import AboutHero from "./components/AboutHero";
import AboutFounders from "./components/AboutFounders";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const STORY_CARDS = [
  {
    marker: "01",
    title: "Spreadsheet quotes",
    description:
      "Sales teams drown in spreadsheet quotes while deals stall. Momentum dies before a formal proposal ever goes out.",
  },
  {
    marker: "02",
    title: "Email-thread deals",
    description:
      "Negotiations scatter across inboxes. Versions conflict, context disappears, and buying committees lose the thread.",
  },
  {
    marker: "03",
    title: "Tools that don't fit",
    description:
      "Consumer platforms bolted onto B2B as an afterthought — or enterprise systems stuck in 2005 and priced for Fortune 500 budgets.",
  },
];

const VALUE_FEATURES = [
  {
    title: "Built for B2B, not bolted on",
    description:
      "Every feature is designed for how B2B actually works — complex pricing, negotiations, approvals and long-term relationships. Not B2C with a B2B label.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "AI should assist, not replace",
    description:
      "Our AI helps sales teams work smarter, not harder. It suggests prices, protects margins and accelerates workflows — but humans close the deals.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M6 14h12v2a6 6 0 0 1-12 0v-2z" />
        <path d="M9 18v2M15 18v2" />
      </svg>
    ),
  },
  {
    title: "Complexity is our problem, not yours",
    description:
      "Multi-warehouse inventory, tiered pricing, product configurations — we handle the complexity behind the scenes so your team doesn't have to.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "Speed to value",
    description:
      "Go live in days, not months. No consultants, no six-month implementations. We've made the hard decisions so you can see results fast.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const DIFFERENTIATOR_FEATURES = [
  {
    title: "AI-native",
    description: "Intelligence built into the core — not added as an afterthought.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
        <path d="M19 14l.75 2.75L22.5 17.5l-2.75.75L19 21l-.75-2.75L15.5 17.5l2.75-.75L19 14z" />
      </svg>
    ),
  },
  {
    title: "SMB-friendly pricing",
    description: "Enterprise features without enterprise budgets, from £99/month.",
    icon: (
      <svg {...iconProps}>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Modern stack",
    description: "MACH architecture on modern tech, not legacy code.",
    icon: (
      <svg {...iconProps}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: "Opinionated",
    description: "Best practices built in — it works out of the box.",
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const LEARN_MORE = [
  {
    title: "Nova Core",
    description:
      "API-first B2B commerce powered by the AI Quote Engine. Built on MACH architecture for unlimited scalability and flexibility.",
    href: "/nova-core",
    linkLabel: "Platform overview →",
    icon: <Layers size={20} strokeWidth={2} />,
  },
  {
    title: "Solutions",
    description:
      "Complete B2B commerce suite — from AI Quote Engine to inventory management. Everything you need to sell to business customers.",
    href: "/solutions",
    linkLabel: "Explore solutions →",
    icon: <Rocket size={20} strokeWidth={2} />,
  },
  {
    title: "Integrations",
    description:
      "Connect WordPress, WooCommerce, Shopify and 50+ other tools. Keep your stack together without ripping out what already works.",
    href: "/integrations",
    linkLabel: "See integrations →",
    icon: <Sparkles size={20} strokeWidth={2} />,
  },
];

export default function AboutPageContent() {
  return (
    <MarketingLayout
      mainClassName="about-page"
      cta={{
        capsule: "Get started",
        title: (
          <>
            Come build the future of{" "}
            <span className="final-card-accent">B2B with us.</span>
          </>
        ),
        description:
          "Join wholesalers, distributors, and manufacturers who've replaced spreadsheets and email with intelligent commerce.",
        primaryAction: {
          label: "Start free trial",
          href: "https://app.buyience.com/register",
          variant: "primary",
        },
        secondaryAction: {
          label: "See Pricing",
          href: "/pricing",
          variant: "ghost",
        },
      }}
    >
      <AboutHero />

      <div id="story">
        <ChallengeSection
          eyebrow="OUR STORY"
          heading="The problem we kept running into."
          lede={
            <>
              B2B commerce is where good businesses lose time. &ldquo;Why isn&apos;t there a platform
              that just understands how B2B works?&rdquo; So we built one — enterprise-grade commerce
              without the enterprise price tag.
            </>
          }
          cards={STORY_CARDS}
          purple
        />
      </div>

      <div id="mission">
        <SplitCopyCards
          eyebrow="MISSION & VISION"
          heading="What drives us."
          body={
            <p>
              Nova Core handles complex products, intelligent quoting and real-time negotiation —
              without the enterprise complexity. Here&apos;s what we&apos;re building toward.
            </p>
          }
          cards={[
            {
              title: "Enterprise B2B commerce, accessible to everyone.",
              description:
                "Make enterprise-grade B2B commerce accessible to every wholesaler, distributor and manufacturer — regardless of size or budget. The best tools shouldn't require the biggest budgets.",
              icon: Target,
            },
            {
              title: "AI-powered B2B, human-closed deals.",
              description:
                "A world where B2B buyers get the seamless digital experience they deserve, and sellers have AI working alongside them — not replacing them — to close more deals, faster.",
              icon: Eye,
            },
          ]}
        />
      </div>

      <AboutFounders purple />

      <FeatureGridSection
        id="values"
        eyebrow="WHAT WE BELIEVE"
        heading="Our values."
        lede="The principles that guide every feature we build and every decision we make."
        features={VALUE_FEATURES}
      />

      <FeatureGridSection
        id="different"
        eyebrow="WHAT MAKES US DIFFERENT"
        heading="Why Nova Core, not the rest."
        features={DIFFERENTIATOR_FEATURES}
        purple
      />

      <CapabilitiesChipGridSection
        id="learn-more"
        eyebrow="LEARN MORE"
        heading="Learn more about Buyience"
        lede="Discover how our team can help bring your unique digital vision to life."
        items={LEARN_MORE}
      />
    </MarketingLayout>
  );
}
