import { googleTagManager } from "@c15t/integrations/google-tag-manager";
import { policyRulePresets } from "@c15t/core";
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
 *
 * Policy note: Next.js passes Vercel geo (`x-vercel-ip-country`) into
 * resolveConsent. The stock recommended pack is:
 *   europe_opt_in → quebec_opt_in → us_privacy_states_opt_out → world_none
 * So known countries outside those regions (e.g. India on stage) get
 * `world_none`: no banner, optional tags allowed. We replace that default
 * with opt-in + choice so first-time visitors always see Accept / Reject /
 * Customize.
 */
const hasBackend = Boolean(
  process.env.NEXT_PUBLIC_C15T_BACKEND_URL ||
    process.env.NEXT_PUBLIC_INTH_PROJECT_URL,
);

/** Fallback for every country the regional presets do not cover. */
const worldOptInChoice = {
  id: "world_opt_in_choice",
  match: { isDefault: true as const },
  model: "opt-in" as const,
  prompt: "choice" as const,
};

const localPolicyRules = [
  policyRulePresets.europeOptIn(),
  policyRulePresets.indiaOptIn(),
  policyRulePresets.usPrivacyStatesOptIn(),
  policyRulePresets.canadaOptIn(),
  policyRulePresets.quebecOptIn(),
  worldOptInChoice,
];

export default defineConsentConfig({
  ...(hasBackend
    ? {}
    : {
        mode: local({
          // Browser-only persistence until an Inth backend URL is configured.
          acknowledgeNoRecords: true,
          policyRules: localPolicyRules,
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
