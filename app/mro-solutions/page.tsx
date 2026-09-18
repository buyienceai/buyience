import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MroPageContent from "./MroPageContent";

export const metadata: Metadata = pageMetadata({
  title: "MRO B2B Commerce Software for Industrial Distributors | Buyience Nova Core",
  description:
    "B2B commerce for MRO suppliers and industrial distributors — contract pricing, cross-references, multi-branch stock and AI-assisted quoting in a single platform.",
  path: "/mro-solutions",
});

export default function MroSolutionsPage() {
  return <MroPageContent />;
}
