"use client";

import React from "react";
import NarrowProseSection from "@/components/NarrowProseSection";

export default function MarginFloorDefined({ purple = false }: { purple?: boolean }) {
  return (
    <NarrowProseSection
      eyebrow="FLOOR MARGIN, DEFINED"
      heading="What floor margin software actually enforces"
      purple={purple}
    >
      <p>
        A floor price is the lowest number a line item can sell at before the deal stops making sense — the
        point where a discount stops being a concession and starts being a loss. Most B2B teams keep that
        number in someone&apos;s head, or in a spreadsheet cell nobody else opens. Floor margin software moves
        it into the pricing path itself, so the floor is checked at the moment a quote is drafted or a
        counter comes in — not caught in a margin review after the order has already shipped.
      </p>
      <p>
        That distinction matters more in B2B commerce than it does in retail. A retail floor is usually one
        number per SKU. A floor margin in B2B commerce has to account for customer tier, contract rate, and
        volume break at the same time — the floor for a gold account at 600 units isn&apos;t the floor for a
        new buyer at 100. Buyience resolves all three in the same rulebook the AI Quote Engine, the Sales
        Room, and the storefront read from, so the floor holds regardless of which channel priced the line.
      </p>
    </NarrowProseSection>
  );
}
