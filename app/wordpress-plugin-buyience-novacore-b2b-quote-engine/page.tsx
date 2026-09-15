import React from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WordPressPageContent from "./WordPressPageContent";

export const metadata: Metadata = pageMetadata({
  title: "WooCommerce B2B Quote Plugin — Request a Quote for WordPress | Buyience",
  description:
    "A free WordPress plugin that adds quote requests, customer-specific pricing and a buyer portal to WooCommerce — and connects to Nova Core for AI-assisted quoting.",
  path: "/wordpress-plugin-buyience-novacore-b2b-quote-engine",
});

export default function WordpressPluginPage() {
  return <WordPressPageContent />;
}
