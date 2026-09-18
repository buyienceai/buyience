export interface Integration {
  id: string;
  name: string;
  category: "payments" | "commerce" | "marketing" | "shipping" | "analytics" | "infrastructure";
  tileText: string;
  description: string;
  status: "live" | "soon";
  logo?: string;
}

export const integrationsData: Integration[] = [
  // PAYMENTS
  {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    tileText: "St",
    description: "Card payments and payment links, collected on orders and invoices with automatic status updates.",
    status: "live",
    logo: "/images/integrations/stripe.svg",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    category: "payments",
    tileText: "Rz",
    description: "Payments for India-first selling — cards, UPI, and netbanking with INR settlement.",
    status: "live",
    logo: "/images/integrations/razorpay.svg",
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "payments",
    tileText: "Pp",
    description: "Wallet payments buyers already trust, on storefront checkout and payment links.",
    status: "live",
    logo: "/images/integrations/paypal.svg",
  },

  // COMMERCE
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "commerce",
    tileText: "Wc",
    description: "Sync products and orders with your WooCommerce store and add B2B quoting to WordPress checkout.",
    status: "live",
    logo: "/images/integrations/woocommerce.svg",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "commerce",
    tileText: "Sh",
    description: "Connect your Shopify store and keep catalog and orders in step with Nova Core.",
    status: "live",
    logo: "/images/integrations/shopify.svg",
  },
  {
    id: "wordpress",
    name: "WordPress Plugin",
    category: "commerce",
    tileText: "Wp",
    description: "Embed the Nova Core B2B quote engine directly in your existing WordPress site.",
    status: "live",
    logo: "/images/integrations/wordpress.svg",
  },
  {
    id: "bigcommerce",
    name: "BigCommerce",
    category: "commerce",
    tileText: "Bc",
    description: "Connect your BigCommerce storefront to Nova Core's B2B layer.",
    status: "soon",
    logo: "/images/integrations/bigcommerce.svg",
  },

  // MARKETING
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "marketing",
    tileText: "Kl",
    description: "Trigger email and SMS flows from commerce events — carts, orders, and customer activity.",
    status: "live",
    logo: "/images/integrations/klaviyo.svg",
  },
  {
    id: "brevo",
    name: "Brevo",
    category: "marketing",
    tileText: "Br",
    description: "Transactional and marketing email, driven by platform events.",
    status: "live",
    logo: "/images/integrations/brevo.svg",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "marketing",
    tileText: "GA",
    description: "Conversion tracking for your campaigns, including server-side Enhanced Conversions.",
    status: "live",
    logo: "/images/integrations/google-ads.svg",
  },

  // SHIPPING
  {
    id: "shiprocket",
    name: "Shiprocket",
    category: "shipping",
    tileText: "Sr",
    description: "Shipping labels, courier selection, and delivery tracking connected to your orders.",
    status: "live",
    logo: "/images/integrations/shiprocket.webp",
  },

  // ANALYTICS
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "analytics",
    tileText: "G4",
    description: "Full-funnel analytics across your storefront, from first visit to checkout.",
    status: "live",
    logo: "/images/integrations/ga4.svg",
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    category: "analytics",
    tileText: "Tm",
    description: "Deploy and manage marketing tags without touching storefront code.",
    status: "live",
    logo: "/images/integrations/gtm.svg",
  },

  // INFRASTRUCTURE
  {
    id: "recaptcha",
    name: "reCAPTCHA",
    category: "infrastructure",
    tileText: "rC",
    description: "Bot and spam protection on storefront and signup forms.",
    status: "live",
    logo: "/images/integrations/recaptcha.svg",
  },
  {
    id: "indexnow",
    name: "IndexNow",
    category: "infrastructure",
    tileText: "In",
    description: "New and updated storefront pages pushed to search engines the moment they publish.",
    status: "live",
  },
];
