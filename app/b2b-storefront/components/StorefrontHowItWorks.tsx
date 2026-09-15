"use client";

import React from "react";
import { PackagePlus, Tags, UserPlus, ShoppingCart } from "lucide-react";
import StepRailSection, { type StepRailStep } from "@/components/StepRailSection";

const steps: StepRailStep[] = [
  {
    chip: "Step 1",
    title: "Import your catalogue",
    desc: "Upload products via CSV or connect your existing platform. Data syncs automatically.",
    Icon: PackagePlus,
  },
  {
    chip: "Step 2",
    title: "Set up pricing",
    desc: "Create customer-specific price lists, volume tiers and payment terms — import or enter manually.",
    Icon: Tags,
  },
  {
    chip: "Step 3",
    title: "Invite customers",
    desc: "Send branded invitations. Customers create accounts and immediately see their pricing and products.",
    Icon: UserPlus,
  },
  {
    chip: "Step 4",
    title: "Start taking orders",
    desc: "Customers order 24/7, orders flow to fulfilment, and your team focuses on growth — not order entry.",
    Icon: ShoppingCart,
    won: true,
  },
];

export default function StorefrontHowItWorks({ purple = false }: { purple?: boolean }) {
  return (
    <StepRailSection
      eyebrow="HOW IT WORKS"
      heading="From sign-up to live in four steps."
      headingClassName="max-md:whitespace-normal whitespace-nowrap"
      lede="No complex implementation, no consultants. Most businesses go live in days."
      steps={steps}
      purple={purple}
    />
  );
}
