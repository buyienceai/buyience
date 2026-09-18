"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";

const FAQS = [
  {
    q: "What is automotive B2B commerce software?",
    a: "Automotive B2B commerce software lets a parts distributor sell to trade customers online with their own contracted prices. It differs from a consumer store in four ways: parts are found by vehicle fitment rather than keyword, every customer sees a different net price, stock is held across multiple branches, and orders involve cores, returns and credit terms. Nova Core covers all four in one platform.",
  },
  {
    q: "Can buyers search parts by vehicle instead of by part number?",
    a: "Yes. Fitment is modelled as structured product attributes, so the storefront can be filtered by year, make, model and engine, or by registration and VIN through a lookup provider. Your existing fitment table is imported by CSV or pushed over the API, and OE cross-references are stored against each SKU so buyers can search either way.",
  },
  {
    q: "How do customer-specific net prices work for workshops, jobbers and fleets?",
    a: "Each trade account is assigned a price list or discount matrix. Nova Core resolves the net at line level from the customer tier, the product group, contracted rates and any volume break — so a workshop, a jobber and a fleet account see three different prices for the same SKU without anyone maintaining three catalogues.",
  },
  {
    q: "Does the platform handle core charges on remanufactured parts?",
    a: "Core deposits are carried as a separate charge line against the SKU, so the quote, the order and the invoice all show the core value apart from the part price. The returned core is then processed as a credit against the original order reference, which keeps the final margin auditable.",
  },
  {
    q: "What happens when a part number is superseded?",
    a: "Superseded numbers stay searchable and resolve to the current SKU, so a buyer ordering from an old catalogue or an old invoice still lands on the part you actually stock. The supersession chain sits on the product record and can be updated in bulk rather than one SKU at a time.",
  },
  {
    q: "Can customers see live stock across multiple branches?",
    a: "Yes. Multi-warehouse inventory shows real-time quantities per location, so a trade account can see what is on the shelf at each branch, what is in transit and what has to be ordered in. Allocation and transfer orders move stock between depots against the order that needs it.",
  },
  {
    q: "Does it integrate with our existing ERP or WooCommerce store?",
    a: "Nova Core is API-first and headless, with REST APIs for catalogue, pricing, stock and orders. There is a native WordPress and WooCommerce plugin and a Shopify connector, plus Stripe, Razorpay, PayPal, Klaviyo, Brevo, Shiprocket, GA4 and Google Ads. ERPs connect over the API, so you can keep your system of record where it is.",
  },
  {
    q: "How does AI quoting price parts without giving away margin?",
    a: "The quote engine reads volume, the customer's contracted tier and the live margin on each line, then suggests a price with a visible floor. The floor is a guardrail rather than a prediction: it shows how far a line can move before the margin target breaks, so a rep concedes knowingly instead of by feel.",
  },
  {
    q: "Can it quote kits and configurable assemblies?",
    a: "Fixed kits and multi-line part sets are quoted today as standard catalogue products with their own SKU, pricing and stock — a three-piece clutch kit or a full service pack behaves like any other line. The CPQ configurator, which handles option groups, conflict rules and dynamic pricing for built-to-order assemblies, is coming soon.",
  },
  {
    q: "How long does implementation take for a parts distributor?",
    a: "Guided onboarding takes about fifteen minutes and most teams are live within a day. For an automotive catalogue the real variable is data: how clean your fitment table, OE cross-references and customer price lists are. Distributors with those three in usable shape move fastest — a short data review before kickoff is usually worth more than any other preparation.",
  },
];

export default function AutomotiveFAQ({ purple = false }: { purple?: boolean }) {
  return (
    <FaqSection
      eyebrow="QUESTIONS, ANSWERED"
      title="Automotive B2B commerce, answered"
      items={FAQS}
      purple={purple}
      card
    />
  );
}
