"use client";

import React from "react";
import MarketingLayout from "@/components/MarketingLayout";
import AutomotiveHero from "./components/AutomotiveHero";
import AutomotiveIntro from "./components/AutomotiveIntro";
import AutomotiveChallenge from "./components/AutomotiveChallenge";
import AutomotiveCapabilities from "./components/AutomotiveCapabilities";
import AutomotiveAudiences from "./components/AutomotiveAudiences";
import AutomotiveHowItWorks from "./components/AutomotiveHowItWorks";
import AutomotiveData from "./components/AutomotiveData";
import AutomotiveIntegrations from "./components/AutomotiveIntegrations";
import AutomotiveFAQ from "./components/AutomotiveFAQ";

export default function AutomotivePageContent() {
  return (
    <MarketingLayout
      mainClassName="quote-engine-page"
      cta={{
        title: (
          <>
            From job card to{" "}
            <span className="final-card-accent">credit note.</span>
          </>
        ),
        description:
          "Fitment-aware catalogues, contracted pricing, live branch stock and AI-assisted quoting in a single platform.",
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
      <AutomotiveHero />
      <AutomotiveIntro />
      <AutomotiveChallenge purple />
      <AutomotiveCapabilities />
      <AutomotiveAudiences purple />
      <AutomotiveHowItWorks />
      <AutomotiveData purple />
      <AutomotiveIntegrations />
      <AutomotiveFAQ purple />
    </MarketingLayout>
  );
}
