"use client";

import React from "react";
import WhatChangesCardsSection, { type WhatChangesCardItem } from "@/components/WhatChangesCardsSection";

const items: WhatChangesCardItem[] = [
  {
    title: "Order 24/7",
    desc: "No more after-hours gaps — capture orders outside business hours.",
  },
  {
    title: "Self-serve pricing",
    desc: "Fewer routine calls — buyers answer their own price questions.",
  },
  {
    title: "One-click reorder",
    desc: "Repeat orders made easy with saved lists and order history.",
  },
  {
    title: "Sell, not type",
    desc: "Reps freed from order entry — time back for high-value selling.",
  },
];

export default function StorefrontWhatChanges({ purple = false }: { purple?: boolean }) {
  return (
    <WhatChangesCardsSection
      heading="What changes when buyers can self-serve."
      items={items}
      purple={purple}
    />
  );
}
