"use client";

import {
  Boxes,
  FileSpreadsheet,
  Layers3,
  MessageSquareQuote,
  Tag,
  Workflow,
} from "lucide-react";
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
    />
  );
}
