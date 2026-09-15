export type StorefrontFaqItem = {
  q: string;
  a: string;
};

export const storefrontFaqs: StorefrontFaqItem[] = [
  {
    q: "How quickly can I launch my B2B storefront?",
    a: "Most businesses go live in days, not months. Import your catalogue (CSV or platform sync), set customer-specific price lists, invite buyers with a branded invitation, and start taking orders — no consultants or complex implementation required.",
  },
  {
    q: "Can I show different prices to different customers?",
    a: "Yes. Each buyer sees their negotiated prices, volume tiers and payment terms. Create customer-specific price lists by import or manually — so “what’s my price?” calls stop landing on your sales team.",
  },
  {
    q: "Does it integrate with my ERP or existing tools?",
    a: "Deploy hosted, headless via REST API, or through the WordPress / WooCommerce plugin. Connect your existing platform for catalogue sync, and use the API to embed B2B ordering into the website or app you already have.",
  },
  {
    q: "What if I already have a WordPress site?",
    a: "Use the native WooCommerce plugin to add B2B capabilities — customer-specific pricing, portals and quote requests — without migrating off WordPress.",
  },
  {
    q: "Can buyers request quotes through the storefront?",
    a: "Yes. Buyers can request quotes from the storefront; the AI Quote Engine prices them instantly. Complex deals move into a Digital Sales Room for live negotiation.",
  },
  {
    q: "Do buyers need a separate mobile app?",
    a: "No. The branded portal is responsive — buyers order, reorder and manage accounts from a phone or desktop browser without installing anything.",
  },
];

export function storefrontFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: storefrontFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
