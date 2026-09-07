"use client";

import React from "react";
import FeatureGridSection from "@/components/FeatureGridSection";

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

const features = [
  {
    label: "BEST FOR SPEED",
    title: "Hosted storefront",
    description:
      "A ready-to-use B2B portal with your branding. No developers needed — auto-generated on sign-up, live in days.",
    icon: (
      <svg {...iconProps}>
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    label: "BEST FOR DEVELOPERS",
    title: "Headless API",
    description:
      "Full REST API access. Embed B2B functionality into your existing website, app or custom frontend.",
    icon: (
      <svg {...iconProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: "BEST FOR WORDPRESS",
    title: "WordPress plugin",
    description:
      "Native WooCommerce integration. Add B2B capabilities to your existing WordPress site without migration.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

export default function StorefrontDeploy({ purple = false }: { purple?: boolean }) {
  return (
    <FeatureGridSection
      eyebrow="DEPLOY YOUR WAY"
      heading="Hosted, headless, or WordPress."
      lede="Whether you want a turnkey portal or full API control, Nova Core fits your stack."
      features={features}
      purple={purple}
    />
  );
}
