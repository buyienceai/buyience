import React from "react";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";
import AutomotiveCounterDemo from "./AutomotiveCounterDemo";

const HERO_STATS = [
  { value: "90%", label: "faster quoting" },
  { value: "95%", label: "pricing accuracy" },
  { value: "15 min", label: "to launch" },
];

export default function AutomotiveHero() {
  return (
    <header className="quote-hero relative flex flex-col overflow-hidden bg-hero-grid sm:min-h-[var(--home-hero-h)] sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="quote-hero-inner relative z-10 mx-auto grid w-full max-w-[var(--w-max,1200px)] grid-cols-1 items-stretch gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8">
        <div className="quote-hero-copy flex min-h-0 flex-col justify-center self-stretch text-left">
          <div className="quote-hero-copy-main">
            <SectionCapsule>Industries · Automotive</SectionCapsule>
            <h1>
              B2B commerce built for{" "}
              <span className="grad-text">automotive parts distribution.</span>
            </h1>
            <p className="lede">
              One part fits forty vehicles. Every account has a different net. Half the stock sits at another
              branch. Nova Core is built for that reality — fitment-aware catalogues, contracted pricing, live
              branch stock and AI-assisted quoting in a single platform.
            </p>
          </div>
          <div className="quote-hero-copy-foot">
            <div className="cta-row">
              <Button variant="primary" size="lg" href="https://app.buyience.com/register">
                Start free trial →
              </Button>
              <Button variant="ghost" size="lg" href="/request-a-demo">
                Request a demo
              </Button>
            </div>
            <dl className="quote-hero-stats flex flex-row flex-nowrap items-stretch gap-0">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex min-w-0 flex-1 flex-col ${
                    i > 0 ? "border-l border-[#E7DEFB] pl-2.5 sm:ml-7 sm:pl-7" : ""
                  }`}
                >
                  <dt className="font-heading text-[18px] leading-none font-extrabold tracking-tight whitespace-nowrap text-[#1B1033] sm:text-[26px]">
                    {stat.value}
                  </dt>
                  <dd className="m-0 mt-1 text-[11px] leading-snug font-semibold text-[#6A5A8C] sm:mt-1.5 sm:text-[13px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <AutomotiveCounterDemo />
      </div>
    </header>
  );
}
