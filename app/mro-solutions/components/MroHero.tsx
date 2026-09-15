import React from "react";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";
import MroContractDemo from "./MroContractDemo";

const HERO_STATS = [
  { value: "90%", label: "faster quoting" },
  { value: "95%", label: "pricing accuracy" },
  { value: "15 min", label: "to launch" },
];

export default function MroHero() {
  return (
    <header className="quote-hero relative flex flex-col overflow-hidden bg-hero-grid sm:min-h-[var(--home-hero-h)] sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div
        className="quote-hero-inner relative z-10 mx-auto grid w-full max-w-[var(--w-max,1200px)] grid-cols-1 items-start gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8"
        style={{ alignItems: "start" }}
      >
        <div
          className="quote-hero-copy flex min-h-0 flex-col justify-start self-start text-left"
          style={{ justifyContent: "flex-start", alignSelf: "start" }}
        >
          <div className="quote-hero-copy-main">
            <SectionCapsule>Industries · MRO</SectionCapsule>
            <h1>
              B2B commerce built for{" "}
              <span className="grad-text">MRO and industrial supply.</span>
            </h1>
            <p className="lede">
              The buyer uses their part number, not yours. The price comes from a contract, not a list. The item
              ships in a box of 100, and the plant needs it before the shift ends. Nova Core handles all four
              without anyone opening a spreadsheet.
            </p>
          </div>
          <div className="quote-hero-copy-foot">
            <div className="cta-row">
              <Button variant="primary" size="lg" href="/request-a-demo">
                Request a demo →
              </Button>
              <Button variant="ghost" size="lg" href="https://app.buyience.com/register">
                Start free trial
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
        <MroContractDemo />
      </div>
    </header>
  );
}
