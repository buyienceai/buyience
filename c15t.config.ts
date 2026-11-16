import { googleTagManager } from "@c15t/integrations/google-tag-manager";
import { defineConsentConfig, local } from "c15t/next";
import { buyienceConsentTheme } from "./lib/c15t-theme";

/**
 * Cookie consent + script gating for Buyience marketing site.
 *
 * Tracking today: GTM container GTM-KMWGZ8VH (GA / Meta Pixel fire from the
 * container). Loaded only after measurement or marketing consent.
 * Google Consent Mode v2 defaults/updates are handled by the GTM helper.
 *
 * Backend: set NEXT_PUBLIC_C15T_BACKEND_URL (or NEXT_PUBLIC_INTH_PROJECT_URL)
 * to your Inth/self-hosted project for production audit records + geo policy.
 * Without it, local() stores choices in the browser only.
 */
const hasBackend = Boolean(
  process.env.NEXT_PUBLIC_C15T_BACKEND_URL ||
    process.env.NEXT_PUBLIC_INTH_PROJECT_URL,
);

export default defineConsentConfig({
  ...(hasBackend
    ? {}
    : {
        mode: local({
          // Browser-only persistence until an Inth backend URL is configured.
          acknowledgeNoRecords: true,
        }),
      }),
  // consentActions must live on the provider; color tokens via ConsentTheme in layout.
  options: { theme: buyienceConsentTheme },
  scripts: [
    googleTagManager({
      id: "GTM-KMWGZ8VH",
      // No Google request until the visitor allows analytics or ads.
      // Consent Mode v2 still maps measurement → analytics_storage and
      // marketing → ad_storage / ad_user_data / ad_personalization.
      loadMode: "after-consent",
      category: { or: ["measurement", "marketing"] },
    }),
  ],
});
