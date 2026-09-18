import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AutomotivePageContent from "./AutomotivePageContent";

export const metadata: Metadata = pageMetadata({
  title: "Automotive B2B Commerce Software for Parts Distributors | Buyience Nova Core",
  description:
    "B2B commerce for automotive parts distributors — fitment-aware catalogues, contracted pricing, live branch stock and AI-assisted quoting in a single platform.",
  path: "/automotive-solutions",
});

export default function AutomotiveSolutionsPage() {
  return <AutomotivePageContent />;
}
