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
    label: "CONTRACT RATES",
    title: "Customer-specific pricing",
    description:
      'Each buyer sees their negotiated prices, volume discounts and payment terms. No more "what\'s my price?" calls.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "REPEAT BUYERS",
    title: "Quick order & CSV upload",
    description:
      "Buyers enter SKUs directly or upload spreadsheets. No browsing required for repeat orders.",
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </svg>
    ),
  },
  {
    label: "ONE CLICK",
    title: "Saved shopping lists",
    description:
      "Customers save frequently ordered items as lists and reorder their usual in a single click.",
    icon: (
      <svg {...iconProps}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "MULTI-WAREHOUSE",
    title: "Real-time inventory",
    description:
      "Show live stock levels per warehouse, so buyers know what's available before ordering — no surprises.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  {
    label: "HISTORY",
    title: "Order history & reorder",
    description:
      "Full order history with one-click reorder. Buyers duplicate past orders in seconds.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 13" />
        <path d="M21 7v6h-6" />
        <path d="M3 7a9 9 0 0 1 9 9 9.75 9.75 0 0 1-6.74 2.74L3 17" />
      </svg>
    ),
  },
  {
    label: "SHIP-TO",
    title: "Multi-location support",
    description:
      "Buyers select a delivery location, see location-specific inventory and manage multiple ship-to addresses.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function StorefrontCapabilities({ purple = false }: { purple?: boolean }) {
  return (
    <FeatureGridSection
      eyebrow="CORE CAPABILITIES"
      heading="Everything your buyers need in one portal."
      lede="Enterprise B2B storefront features — without enterprise complexity or cost."
      features={features}
      purple={purple}
    />
  );
}
