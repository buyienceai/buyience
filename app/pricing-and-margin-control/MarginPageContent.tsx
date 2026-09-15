"use client";

import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import MarginHero from "./components/MarginHero";
import MarginChallenge from "./components/MarginChallenge";
import MarginCapabilities from "./components/MarginCapabilities";
import MarginHowItWorks from "./components/MarginHowItWorks";
import MarginDivesSection from "./components/MarginDivesSection";
import MarginImpact from "./components/MarginImpact";
import MarginFloorDefined from "./components/MarginFloorDefined";
import MarginFAQ from "./components/MarginFAQ";

export default function MarginPageContent() {
  return (
    <MarketingLayout
      mainClassName="margin-page"
      cta={{
        title: (
          <>
            Price the next quote with the{" "}
            <span className="final-card-accent">floor already in.</span>
          </>
        ),
        primaryAction: {
          label: "Start For Free",
          href: "https://app.buyience.com/register",
          variant: "primary",
        },
        secondaryAction: {
          label: "See pricing",
          href: "/pricing",
          variant: "ghost",
        },
        description:
          "Customer-specific rates, volume tiers, and margin floors — enforced on every quote, AI or human.",
      }}
    >
      <MarginHero />
      <MarginChallenge purple />
      <MarginCapabilities />
      <MarginHowItWorks purple />
      <MarginDivesSection />
      <MarginImpact purple />
      <MarginFloorDefined />
      <MarginFAQ purple />
    </MarketingLayout>
  );
}
