import React from "react";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";
import WpPluginDemo from "./WpPluginDemo";

const META = [
  { value: "Free", label: "WordPress.org" },
  { value: "v 1.2.5", label: "release" },
  { value: "WP 5.8+", label: "WordPress" },
  { value: "PHP 7.4+", label: "PHP" },
  { value: "6.9.7", label: "tested to" },
];

export default function WpHero() {
  return (
    <header className="quote-hero relative flex flex-col overflow-hidden bg-hero-grid sm:min-h-[var(--home-hero-h)] sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="quote-hero-inner relative z-10 mx-auto grid w-full max-w-[var(--w-max,1200px)] grid-cols-1 items-stretch gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8">
        <div
          className="quote-hero-copy flex min-h-0 flex-col self-stretch text-left"
          style={{ justifyContent: "flex-start" }}
        >
          <div className="quote-hero-copy-main">
            <SectionCapsule>WordPress + WooCommerce</SectionCapsule>
            <h1>
              Add B2B quoting to WooCommerce.{" "}
              <span className="grad-text">Keep your store.</span>
            </h1>
            <p className="lede">
              A free WordPress plugin that adds quote requests, customer-specific pricing and a buyer portal to
              WooCommerce — and connects to Nova Core when you want AI-assisted quoting and real-time negotiation. No
              replatforming.
            </p>
          </div>
          <div className="quote-hero-copy-foot">
            <div className="cta-row">
              <Button
                variant="primary"
                size="lg"
                href="https://wordpress.org/plugins/buyience-novacore-b2b-quote-engine/"
              >
                Get the plugin on WordPress.org
              </Button>
              <Button variant="ghost" size="lg" href="/request-a-demo">
                Request a demo
              </Button>
            </div>
            <dl className="quote-hero-stats flex flex-row flex-nowrap items-stretch gap-0">
              {META.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex min-w-0 flex-1 flex-col ${
                    i > 0 ? "border-l border-[#E7DEFB] pl-2 sm:ml-4 sm:pl-4 lg:ml-5 lg:pl-5" : ""
                  }`}
                >
                  <dt className="font-heading text-[16px] leading-none font-extrabold tracking-tight whitespace-nowrap text-[#1B1033] sm:text-[22px] lg:text-[24px]">
                    {stat.value}
                  </dt>
                  <dd className="m-0 mt-1 text-[10px] leading-snug font-semibold text-[#6A5A8C] sm:mt-1.5 sm:text-[12px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <WpPluginDemo />
      </div>
    </header>
  );
}
