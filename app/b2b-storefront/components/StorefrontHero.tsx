"use client";

import React from "react";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";
import StorefrontDemo from "./StorefrontDemo";

export default function StorefrontHero() {
  return (
    <header className="sf-hero relative flex flex-col overflow-hidden bg-hero-grid sm:min-h-[var(--home-hero-h)] sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="sf-hero-inner relative z-10 mx-auto grid w-full max-w-[var(--w-max,1200px)] grid-cols-1 items-stretch gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8">
        <div className="sf-hero-copy flex min-h-0 flex-col text-left">
          <div className="sf-hero-copy-main">
            <SectionCapsule>B2B self-service commerce</SectionCapsule>
            <h1 className="text-[1.75rem] leading-[1.1] font-extrabold tracking-normal sm:text-[clamp(2.1rem,5vw,4rem)] sm:leading-[1.03]">
              Give your wholesale buyers{" "}
              <span className="grad-text">24/7 self-service ordering.</span>
            </h1>
            <p className="lede max-w-[34rem] sm:text-[18.5px] sm:leading-[1.7]">
              A branded B2B portal where customers see their own pricing, place orders, track shipments and reorder —
              without calling your sales team. Deploy hosted or headless.
            </p>
          </div>
          <div className="sf-hero-copy-foot">
            <div className="cta-row">
              <Button variant="primary" size="lg" href="https://app.buyience.com/register">
                Start free trial →
              </Button>
              <Button variant="ghost" size="lg" href="/request-a-demo">
                Request a demo
              </Button>
            </div>
            <p className="trust-micro">
              <span className="trust-live" aria-hidden="true" />
              14-day trial · No card required
            </p>
          </div>
        </div>
        <StorefrontDemo />
      </div>
    </header>
  );
}
