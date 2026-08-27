export type CurrencyCode = "USD" | "GBP" | "EUR" | "INR";

export const CURRENCY_CODES: CurrencyCode[] = ["USD", "GBP", "EUR", "INR"];

export const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; label: string }
> = {
  USD: { symbol: "$", label: "USD" },
  GBP: { symbol: "£", label: "GBP" },
  EUR: { symbol: "€", label: "EUR" },
  INR: { symbol: "₹", label: "INR" },
};

export const DEFAULT_CURRENCY: CurrencyCode = "INR";
/** Manual override for the current tab session only (cleared on hard refresh / new tab). */
export const CURRENCY_STORAGE_KEY = "buyience-pricing-currency-session";

const GBP_COUNTRIES = new Set(["GB", "IM", "JE", "GG"]);

const EUR_COUNTRIES = new Set([
  "AT",
  "BE",
  "CY",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PT",
  "SK",
  "SI",
  "ES",
  "AD",
  "MC",
  "SM",
  "VA",
  "XK",
  "ME",
]);

export function isCurrencyCode(value: string | null | undefined): value is CurrencyCode {
  if (!value) return false;
  return CURRENCY_CODES.includes(value.toUpperCase() as CurrencyCode);
}

export function parseCurrencyParam(value: string | null | undefined): CurrencyCode | null {
  if (!value) return null;
  const upper = value.toUpperCase();
  return isCurrencyCode(upper) ? upper : null;
}

/** Map ISO country code → currency. Unknown country → USD. Missing country → INR. */
export function currencyFromCountry(country: string | null | undefined): CurrencyCode {
  if (!country) return DEFAULT_CURRENCY;
  const code = country.toUpperCase();
  if (code === "IN") return "INR";
  if (GBP_COUNTRIES.has(code)) return "GBP";
  if (EUR_COUNTRIES.has(code)) return "EUR";
  return "USD";
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return CURRENCY_META[currency].symbol;
}

/** Format a money amount for the active currency (plan prices: whole numbers). */
export function formatMoney(
  amount: number,
  currency: CurrencyCode,
  options?: { decimals?: number },
): string {
  const { symbol } = CURRENCY_META[currency];
  const decimals = options?.decimals ?? 0;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
  return `${symbol}${formatted}`;
}

export type PlanPrices = {
  growMonthly: number;
  /** Post–founder-launch Grow list price (e.g. announcement “rises to”). */
  growStandard: number;
  growAnnual: number;
  growWas: number;
  growSave: number;
  proMonthly: number;
  proAnnual: number;
  proWas: number;
  proSave: number;
  aiQuoteAddon: number;
  cpqAddon: number;
  warehouseAddon: number;
  extraUserAddon: number;
  prioritySupportAddon: number;
};

const PRICES: Record<CurrencyCode, PlanPrices> = {
  USD: {
    growMonthly: 99,
    growStandard: 249,
    growAnnual: 990,
    growWas: 1188,
    growSave: 198,
    proMonthly: 179,
    proAnnual: 1790,
    proWas: 2148,
    proSave: 358,
    aiQuoteAddon: 49,
    cpqAddon: 99,
    warehouseAddon: 29,
    extraUserAddon: 15,
    prioritySupportAddon: 99,
  },
  GBP: {
    growMonthly: 79,
    growStandard: 199,
    growAnnual: 790,
    growWas: 948,
    growSave: 158,
    proMonthly: 149,
    proAnnual: 1490,
    proWas: 1788,
    proSave: 298,
    aiQuoteAddon: 39,
    cpqAddon: 79,
    warehouseAddon: 23,
    extraUserAddon: 12,
    prioritySupportAddon: 79,
  },
  EUR: {
    growMonthly: 89,
    growStandard: 229,
    growAnnual: 890,
    growWas: 1068,
    growSave: 178,
    proMonthly: 169,
    proAnnual: 1690,
    proWas: 2028,
    proSave: 338,
    aiQuoteAddon: 49,
    cpqAddon: 89,
    warehouseAddon: 26,
    extraUserAddon: 14,
    prioritySupportAddon: 89,
  },
  INR: {
    growMonthly: 5999,
    growStandard: 14999,
    growAnnual: 59990,
    growWas: 71988,
    growSave: 11998,
    proMonthly: 9999,
    proAnnual: 99990,
    proWas: 119880,
    proSave: 19890,
    aiQuoteAddon: 4999,
    cpqAddon: 5999,
    warehouseAddon: 1999,
    extraUserAddon: 999,
    prioritySupportAddon: 5999,
  },
};

export function getPlanPrices(currency: CurrencyCode): PlanPrices {
  return PRICES[currency];
}
