export type StackLogo = {
  name: string;
  logo: string;
  tileText: string;
};

/** Logos used by the FITS YOUR STACK marquee across marketing pages. */
export const stackLogos: StackLogo[] = [
  { name: "Shopify", logo: "/images/integrations/shopify.svg", tileText: "Sh" },
  { name: "WooCommerce", logo: "/images/integrations/woocommerce.svg", tileText: "Wc" },
  { name: "Stripe", logo: "/images/integrations/stripe.svg", tileText: "St" },
  { name: "Razorpay", logo: "/images/integrations/razorpay.svg", tileText: "Rz" },
  { name: "PayPal", logo: "/images/integrations/paypal.svg", tileText: "Pp" },
  { name: "Klaviyo", logo: "/images/integrations/klaviyo.svg", tileText: "Kl" },
  { name: "Brevo", logo: "/images/integrations/brevo.svg", tileText: "Br" },
  { name: "Shiprocket", logo: "/images/integrations/shiprocket.webp", tileText: "Sr" },
  { name: "GA4", logo: "/images/integrations/ga4.svg", tileText: "G4" },
  { name: "Google Ads", logo: "/images/integrations/google-ads.svg", tileText: "GA" },
];
