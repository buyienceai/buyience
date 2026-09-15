"use client";

import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import WpHero from "./components/WpHero";
import WpIntro from "./components/WpIntro";
import WpChallenge from "./components/WpChallenge";
import WpBridge from "./components/WpBridge";
import WpCapabilities from "./components/WpCapabilities";
import WpHowItWorks from "./components/WpHowItWorks";
import WpComparison from "./components/WpComparison";
import WpStack from "./components/WpStack";
import WpTechnical from "./components/WpTechnical";
import WpFAQ from "./components/WpFAQ";

export default function WordPressPageContent() {
  return (
    <MarketingLayout
      mainClassName="quote-engine-page"
      cta={{
        title: (
          <>
            Ready to add B2B to{" "}
            <span className="final-card-accent">WordPress?</span>
          </>
        ),
        description:
          "Install the free plugin from WordPress.org, then connect Nova Core when you want AI-assisted quoting and real-time negotiation.",
        primaryAction: {
          label: "Start free trial →",
          href: "https://app.buyience.com/register",
          variant: "primary",
        },
        secondaryAction: {
          label: "Request a demo",
          href: "/request-a-demo",
          variant: "ghost",
        },
      }}
    >
      <WpHero />
      <WpIntro />
      <WpChallenge purple />
      <WpBridge />
      <WpCapabilities purple />
      <WpHowItWorks />
      <WpComparison purple />
      <WpStack />
      <WpTechnical purple />
      <WpFAQ />
    </MarketingLayout>
  );
}
