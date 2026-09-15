import React from "react";
import type { Metadata } from "next";
import { isSeoIndexingEnabled, pageMetadata } from "@/lib/seo";
import StorefrontPageContent from "./StorefrontPageContent";
import { storefrontFaqJsonLd } from "./data/faqs";

export const metadata: Metadata = pageMetadata({
  title: "B2B Storefront | Self-Service Customer Portal | Buyience",
  description:
    "Launch a B2B storefront your customers will love. Customer-specific pricing, quick order, saved lists, quote requests, and account management-built in.",
  path: "/b2b-storefront",
});

export default function B2BStorefrontPage() {
  const jsonLd = isSeoIndexingEnabled() ? storefrontFaqJsonLd() : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <StorefrontPageContent />
    </>
  );
}
