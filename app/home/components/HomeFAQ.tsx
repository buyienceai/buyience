"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";
import { useCurrency } from "@/components/CurrencyProvider";

export default function HomeFAQ({ purple = false }: { purple?: boolean }) {
  const { format, prices } = useCurrency();

  const faqs = [
    {
      q: "How fast can I actually launch?",
      a: "Most teams are live in a day. A guided 7-step onboarding gets your catalog, pricing, and storefront set up in about 15 minutes — no engineering required. From signup to accepting real quote requests, plan on under 24 hours.",
    },
    {
      q: "Do I need developers to run it?",
      a: "No. Nova Core works out of the box with a hosted storefront. When you do want to customize, it is fully headless and API-first — plug it into WordPress, WooCommerce, or your own frontend over clean RESTful APIs whenever you are ready.",
    },
    {
      q: "What makes the AI Quote Engine accurate?",
      a: "It reads volume, customer history, and live margin to suggest the optimal price in seconds — with competitor-floor awareness and automatic margin protection on every line. In practice that means 80–90% faster quoting at 95%+ pricing accuracy.",
    },
    {
      q: "Can it handle complex B2B pricing?",
      a: "Yes — that is the point. Customer-specific rates, tiered and volume pricing, contract pricing, and Net 30/60/90 terms all resolve instantly at the line level. It was purpose-built for real B2B selling, not B2C with B2B bolted on.",
    },
    {
      q: "How is my data kept secure and isolated?",
      a: "Nova Core is built on MACH principles — true SaaS microservices with complete data isolation per tenant, cloud-native auto-scaling infrastructure, and no shared databases between customers.",
    },
    {
      q: "What does it cost?",
      a: `Founder-launch pricing locks you in at ${format(prices.growMonthly)}/mo before standard pricing rises to ${format(prices.growStandard)} — simple and transparent, with no hidden fees. You can start a free trial today and upgrade when you are ready.`,
    },
  ];

  return (
    <FaqSection
      eyebrow="FAQ"
      title="Questions, answered"
      items={faqs}
      purple={true}
      card
    />
  );
}
