"use client";

import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import StorefrontHero from "./components/StorefrontHero";
import StorefrontChallenge from "./components/StorefrontChallenge";
import StorefrontHowItWorks from "./components/StorefrontHowItWorks";
import StorefrontCapabilities from "./components/StorefrontCapabilities";
import StorefrontDivesSection from "./components/StorefrontDivesSection";
import StorefrontDeploy from "./components/StorefrontDeploy";
import StorefrontConnected from "./components/StorefrontConnected";
import StorefrontComparison from "./components/StorefrontComparison";
import StorefrontPricingCallout from "./components/StorefrontPricingCallout";
import StorefrontWhatChanges from "./components/StorefrontWhatChanges";
import StorefrontFAQ from "./components/StorefrontFAQ";
import StorefrontLearnMore from "./components/StorefrontLearnMore";

export default function StorefrontPageContent() {
  return (
    <MarketingLayout
      mainClassName="storefront-page"
      cta={{
        title: (
          <>
            Ready to let customers{" "}
            <span className="final-card-accent">order 24/7?</span>
          </>
        ),
        primaryAction: {
          label: "Start free trial",
          href: "https://app.buyience.com/register",
          variant: "primary",
        },
        secondaryAction: {
          label: "See pricing",
          href: "/pricing",
          variant: "ghost",
        },
        description:
          "Join wholesalers and distributors who've freed their sales teams from order entry. Launch your B2B storefront in weeks, not months.",
        purple: true,
      }}
    >
      <StorefrontHero />
      <StorefrontChallenge purple />
      <StorefrontHowItWorks />
      <StorefrontCapabilities purple />
      <StorefrontDivesSection />
      <StorefrontDeploy purple />
      <StorefrontConnected />
      <StorefrontComparison />
      <StorefrontPricingCallout />
      <StorefrontWhatChanges purple />
      <StorefrontFAQ />
      <StorefrontLearnMore />
    </MarketingLayout>
  );
}
