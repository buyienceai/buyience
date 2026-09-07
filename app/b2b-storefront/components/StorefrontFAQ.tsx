"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";
import { storefrontFaqs } from "../data/faqs";

export default function StorefrontFAQ({ purple = false }: { purple?: boolean }) {
  return (
    <FaqSection
      eyebrow="QUESTIONS, ANSWERED"
      title="B2B Storefront FAQs"
      items={storefrontFaqs}
      purple={purple}
      card
    />
  );
}
