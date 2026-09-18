"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";

const FAQS = [
  {
    q: "What is MRO B2B commerce software?",
    a: "MRO B2B commerce software lets a maintenance, repair and operations supplier sell to contracted industrial accounts online. It differs from a consumer store in four ways: buyers search using their own part numbers rather than yours, prices come from a negotiated contract rather than a list, items are sold in packs and units of measure that have to convert cleanly, and demand splits between planned replenishment and line-down emergencies. Nova Core covers all four in one platform.",
  },
  {
    q: "Can buyers search using their own part numbers?",
    a: "Yes. Customer part numbers are stored against your SKU as searchable alternate identifiers, so a maintenance buyer pasting their internal code lands on the right item. Manufacturer part numbers, supplier codes and classification codes such as UNSPSC can be held the same way, which means the same catalogue answers to whichever code the buyer happens to use.",
  },
  {
    q: "How does contract pricing work for MRO accounts?",
    a: "Each contracted account is assigned a price list or discount matrix. Nova Core resolves the price at line level from the account, the product group, the contracted rate and any volume break — so a national agreement, a single-plant contract and a spot buy all return different prices for the same SKU without anyone maintaining three catalogues.",
  },
  {
    q: "Does it handle pack sizes and units of measure?",
    a: "Pack and unit-of-measure variants are modelled as their own priced options against the item, so each, box of 100 and bag of 1,000 each carry a price and a stock position. Buyers see what a pack actually costs rather than doing the arithmetic themselves — which is where most wrong-quantity orders come from.",
  },
  {
    q: "Can it show stock across multiple branches and depots?",
    a: "Yes. Multi-warehouse inventory shows real-time quantities per location, with allocation and transfer orders between them. A buyer facing a breakdown can see which branch can ship today instead of calling three of them, and non-stock lines show a lead time rather than nothing at all.",
  },
  {
    q: "How do you quote an RFQ with two hundred lines?",
    a: "The AI Quote Engine prices each line against the account's contracted rates and live margin, then suggests a price per line with a visible floor. Your rep reviews the exceptions rather than typing the whole schedule, and the accepted quote converts directly into an order without being rekeyed.",
  },
  {
    q: "Do you support punchout catalogues and EDI?",
    a: "Nova Core is API-first, with REST APIs for catalogue, pricing, stock and orders — which is what punchout and EDI middleware connect to. cXML and OCI punchout into Ariba, Coupa or SAP, and transaction sets such as 850, 855, 856 and 810, are scoped per project rather than shipped as a one-click toggle. Worth raising early if a large account depends on it.",
  },
  {
    q: "Can customers reorder from previous orders?",
    a: "Yes. Trade accounts get a self-service portal with order history and reordering, so routine consumable replenishment stops going through your counter team. That is usually where the first measurable time saving shows up, because most MRO line volume is repeat rather than new.",
  },
  {
    q: "Can it quote configured or built-to-order assemblies?",
    a: "Fixed kits and pre-defined assemblies are sold today as standard catalogue products with their own SKU, pricing and stock — a hose assembly at a set length or a standard service pack behaves like any other line. The CPQ configurator, which handles option groups, conflict rules and dynamic pricing for built-to-order assemblies, is coming soon.",
  },
  {
    q: "How long does implementation take for an MRO distributor?",
    a: "Guided onboarding takes about fifteen minutes and most teams are live within a day. For an MRO catalogue the real variable is data: how clean your contract price lists, customer part cross-references and pack or unit-of-measure definitions are. Distributors with those three in usable shape move fastest — a short data review before kickoff is worth more than any other preparation.",
  },
];

export default function MroFAQ({ purple = false }: { purple?: boolean }) {
  return (
    <FaqSection
      eyebrow="QUESTIONS, ANSWERED"
      title="MRO B2B commerce, answered"
      items={FAQS}
      purple={purple}
      card
    />
  );
}
