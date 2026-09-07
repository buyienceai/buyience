"use client";

import React from "react";
import ChallengeSection from "@/components/ChallengeSection";

const cards = [
  {
    marker: "BOTTLENECK",
    title: "Phone & email bottleneck",
    description:
      "Every order goes through your sales team. They're drowning in routine reorders instead of closing new business.",
  },
  {
    marker: "AFTER HOURS",
    title: "After-hours lost orders",
    description:
      "Customer wants to order at 9pm? They can't. Your competitors with online portals capture orders while you sleep.",
  },
  {
    marker: "PRICING",
    title: '"What\'s my price?" calls',
    description:
      "Buyers can't see their negotiated pricing without calling you. Simple questions become support tickets.",
  },
];

export default function StorefrontChallenge({ purple = false }: { purple?: boolean }) {
  return (
    <ChallengeSection
      eyebrow="THE CHALLENGE"
      heading="B2B buyers expect more than email and phone."
      lede="Your wholesale customers are used to Amazon-like convenience — but your current setup still makes them call, email or fax orders like it's 1995."
      cards={cards}
      markerVariant="tag"
      purple={purple}
    />
  );
}
