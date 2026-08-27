"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";
import { useCurrency } from "@/components/CurrencyProvider";

export default function PricingFAQ() {
  const { format, prices } = useCurrency();
  const faqs = [
    {
      q: "How does the 14-day free trial work?",
      a: "Start on any plan with full access for 14 days — no card required. If Nova Core fits, pick your plan and continue without losing your setup. If not, your trial simply expires.",
    },
    {
      q: "What counts as a \"B2B order\"?",
      a: "Any order created in Nova Core — through your B2B storefront, from an accepted quote, or entered in order management — counts toward your monthly order limit.",
    },
    {
      q: "Can I upgrade or downgrade anytime?",
      a: "Yes. You can change plans at any time from your account, and the change applies to your next billing cycle.",
    },
    {
      q: "What happens if I exceed my order limit?",
      a: "We'll let you know as you approach your limit and help you move to the right plan. Talk to us if your volume is spiky — we'd rather fit the plan to your business than surprise you.",
    },
    {
      q: "Is there a setup or implementation fee?",
      a: "No. There are no setup, implementation, or hidden fees on any plan — you pay the plan price and any add-ons you choose, nothing else.",
    },
    {
      q: "What does \"lock in for life\" mean?",
      a: `Founder-launch customers keep today's ${format(prices.growMonthly)}/mo price for as long as their subscription remains active — when standard pricing rises to ${format(prices.growStandard)}/mo, your rate doesn't change.`,
    },
  ];

  return (
    <FaqSection
      eyebrow="QUESTIONS, ANSWERED"
      title="Pricing FAQs"
      items={faqs}
    />
  );
}
