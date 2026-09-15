"use client";

import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import MroHero from "./components/MroHero";
import MroIntro from "./components/MroIntro";
import MroChallenge from "./components/MroChallenge";
import MroCapabilities from "./components/MroCapabilities";
import MroAudiences from "./components/MroAudiences";
import MroHowItWorks from "./components/MroHowItWorks";
import MroData from "./components/MroData";
import MroIntegrations from "./components/MroIntegrations";
import MroFAQ from "./components/MroFAQ";

export default function MroPageContent() {
  return (
    <MarketingLayout
      mainClassName="quote-engine-page"
      cta={{
        title: (
          <>
            From requisition to{" "}
            <span className="final-card-accent">reorder.</span>
          </>
        ),
        description:
          "Contract pricing, cross-references, live branch stock and AI-assisted quoting in a single platform.",
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
      <MroHero />
      <MroIntro />
      <MroChallenge purple />
      <MroCapabilities />
      <MroAudiences purple />
      <MroHowItWorks />
      <MroData purple />
      <MroIntegrations />
      <MroFAQ purple />
    </MarketingLayout>
  );
}
