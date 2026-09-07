"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  FileSpreadsheet,
  Layers3,
  MessageSquareQuote,
  Tag,
  Workflow,
} from "lucide-react";
import Button from "@/components/Button";
import { useCurrency } from "@/components/CurrencyProvider";
import WhatChangesSection, { type WhatChangesItem } from "@/components/WhatChangesSection";

const items: WhatChangesItem[] = [
  {
    title: "Customer-specific pricing",
    from: "Limited / add-on",
    after: "Built in",
    Icon: Tag,
  },
  {
    title: "Quick order & CSV upload",
    from: "Rarely",
    after: "Native to the portal",
    Icon: FileSpreadsheet,
  },
  {
    title: "MOQs & case packs",
    from: "Missing or bolted on",
    after: "Enforced in catalog rules",
    Icon: Boxes,
  },
  {
    title: "Real-time per-warehouse stock",
    from: "Single stock figure",
    after: "Per warehouse",
    Icon: Layers3,
  },
  {
    title: "Quote requests & negotiation",
    from: "Email / phone only",
    after: "Storefront → AI Quote → Sales Room",
    Icon: MessageSquareQuote,
  },
  {
    title: "Deploy options",
    from: "One option",
    after: "Hosted, headless & WordPress",
    Icon: Workflow,
  },
];

function PricingCallout() {
  const { format, prices } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      className="sf-callout"
    >
      <div className="sf-callout-body">
        <span className="sf-callout-zap" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </span>
        <div className="txt">
          <b>Enterprise storefront features, without the enterprise cost.</b>
          <p>
            A branded B2B portal that usually takes a six-figure build and months of work — auto-generated, from{" "}
            <strong>{format(prices.growMonthly)}/month</strong>, live in days.
          </p>
        </div>
      </div>
      <Button variant="lime" href="/pricing" className="sf-callout-cta">
        See pricing
      </Button>
    </motion.div>
  );
}

export default function StorefrontComparison({ purple = false }: { purple?: boolean }) {
  return (
    <WhatChangesSection
      purple={purple}
      eyebrow="HOW IT DIFFERS"
      heading="Not a B2C catalogue with B2B bolted on."
      outcomeLabel="Aspect"
      fromLabel="B2C platform + B2B plugin"
      toLabel="Nova Core B2B Storefront"
      items={items}
      footer={<PricingCallout />}
    />
  );
}
