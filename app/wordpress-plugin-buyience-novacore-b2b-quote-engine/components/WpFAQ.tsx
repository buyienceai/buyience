"use client";

import React from "react";
import FaqSection from "@/components/FaqSection";

const FAQS = [
  {
    q: "Is the plugin free?",
    a: "Yes. The plugin is free on WordPress.org. Quote requests, the WooCommerce Request a Quote button, pricing rules and the buyer portal work without paying anything. The optional Buyience Nova Core service, which adds AI-assisted quote recommendations and the Digital Sales Room, has its own pricing.",
  },
  {
    q: "Do I need a Buyience account to use the plugin?",
    a: "No. Core quote request and WooCommerce integration features run inside WordPress without any external service. A Buyience account is only required if you choose to enable the hosted interfaces or the advanced automation features — which is a decision you can leave until the quoting basics are earning their keep.",
  },
  {
    q: "What WordPress and PHP versions do I need?",
    a: "WordPress 5.8 or higher and PHP 7.4 or higher. The current release is version 1.2.5, tested up to WordPress 6.9.7. WooCommerce is needed only for the product-page integration and product sync — the quote builder shortcode works on any WordPress site.",
  },
  {
    q: "Will this slow down or modify my WordPress site?",
    a: "No WooCommerce core data is modified or removed. The plugin adds its own settings screens and a quote button, and hosted Buyience interfaces open as external links rather than embedded iframes, so they are never loaded on your front end. The plugin performs no tracking or analytics of its own.",
  },
  {
    q: "Does the plugin create or modify WordPress users?",
    a: "No. It does not create WordPress user accounts or change credentials, and it does not use wp_set_current_user() or similar functions to bypass session checks. Administrative endpoints require the manage_options capability through current_user_can(), and all REST routes carry permission callbacks.",
  },
  {
    q: "Where are my Buyience credentials stored?",
    a: "The Buyience password is never stored in WordPress. During connection it is submitted to your WordPress site and forwarded over HTTPS to Buyience for authentication; only the returned access token is stored in WordPress options, with autoload disabled, and used solely for API communication. Nothing is transmitted without an explicit administrator action.",
  },
  {
    q: "Is the AI making pricing decisions automatically?",
    a: "No. AI-assisted features provide recommendations only. Suggestions are generated from pricing history and buyer behaviour, and a person approves or overrides every price before a quote goes out. Nothing is repriced without a human deciding to.",
  },
  {
    q: "Can I keep my existing B2C store running?",
    a: "Yes. Show Add to Cart and Request a Quote together, or show Request a Quote only on selected products. Retail buyers check out as normal while trade buyers raise quotes — same catalogue, same site, same SEO.",
  },
  {
    q: "Does it work with my theme and page builder?",
    a: "Yes. The quote button hooks into standard WooCommerce product template positions, and the quote builder storefront is placed with the [buyncbqe2_quote_builder] shortcode, so Elementor, Divi, Astra and custom themes all work. Button text, colour and position are set in the plugin settings.",
  },
  {
    q: "How does product sync work?",
    a: "Product sync uses the WooCommerce REST API. You add a consumer key and secret under Product Sync, then run a manual sync or let the daily scheduler run at midnight. Results are written to a log you can review in the settings screen, and syncing is entirely optional.",
  },
  {
    q: "Can I use the plugin on multiple sites?",
    a: "Yes. Each site connects with its own Buyience subdomain configuration, so a multi-brand operator can run several WordPress stores against separate Buyience accounts without them colliding.",
  },
  {
    q: "Can I stop the plugin creating a page on activation?",
    a: "Yes. On activation the plugin creates a Create Store page holding the quote builder shortcode. Add the buyncbqe2_allow_auto_page_creation filter returning false before activating to skip it, or use buyncbqe2_auto_page_slug and buyncbqe2_auto_page_status to change the slug or create it as a draft for review.",
  },
];

export default function WpFAQ({ purple = false }: { purple?: boolean }) {
  return (
    <FaqSection
      eyebrow="QUESTIONS, ANSWERED"
      title="WordPress plugin FAQs"
      items={FAQS}
      purple={purple}
      card
    />
  );
}
