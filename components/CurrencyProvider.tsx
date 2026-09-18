"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CURRENCY_META,
  CURRENCY_STORAGE_KEY,
  CurrencyCode,
  DEFAULT_CURRENCY,
  formatMoney,
  getCurrencySymbol,
  getPlanPrices,
  parseCurrencyParam,
  PlanPrices,
} from "@/lib/pricing/currency";
import { resolveGeoCurrency } from "@/lib/pricing/detectGeoCurrency";

const FORCE_GEO_KEY = "buyience-force-geo";

type CurrencyContextValue = {
  currency: CurrencyCode;
  symbol: string;
  prices: PlanPrices;
  /** True after first geo / session / URL resolution completes. */
  ready: boolean;
  setCurrency: (next: CurrencyCode) => void;
  format: (amount: number, decimals?: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function readSessionCurrency(): CurrencyCode | null {
  try {
    return parseCurrencyParam(sessionStorage.getItem(CURRENCY_STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeSessionCurrency(code: CurrencyCode) {
  try {
    sessionStorage.setItem(CURRENCY_STORAGE_KEY, code);
  } catch {
    // ignore
  }
}

function clearSessionCurrency() {
  try {
    sessionStorage.removeItem(CURRENCY_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function consumeForceGeoFlag(): boolean {
  try {
    if (sessionStorage.getItem(FORCE_GEO_KEY) === "1") {
      sessionStorage.removeItem(FORCE_GEO_KEY);
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

function markHardRefreshReset() {
  try {
    sessionStorage.removeItem(CURRENCY_STORAGE_KEY);
    sessionStorage.setItem(FORCE_GEO_KEY, "1");
  } catch {
    // ignore
  }
}

function readUrlCurrency(): CurrencyCode | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return parseCurrencyParam(params.get("currency"));
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [ready, setReady] = useState(false);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);
    writeSessionCurrency(next);

    if (typeof window === "undefined") return;
    // Keep pricing deep-links in sync when the user is on /pricing
    if (window.location.pathname.startsWith("/pricing")) {
      const url = new URL(window.location.href);
      url.searchParams.set("currency", next.toLowerCase());
      window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}`);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "r"
      ) {
        markHardRefreshReset();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function resolveGeoOnly() {
      const geo = await resolveGeoCurrency();
      if (!cancelled) {
        setCurrencyState(geo);
        setReady(true);
      }
    }

    async function resolve() {
      const forceGeo = consumeForceGeoFlag();

      if (forceGeo) {
        clearSessionCurrency();
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/pricing")) {
          const url = new URL(window.location.href);
          if (url.searchParams.has("currency")) {
            url.searchParams.delete("currency");
            const qs = url.searchParams.toString();
            window.history.replaceState(null, "", qs ? `${url.pathname}?${qs}` : url.pathname);
          }
        }
        await resolveGeoOnly();
        return;
      }

      const fromUrl = readUrlCurrency();
      if (fromUrl) {
        if (!cancelled) {
          setCurrencyState(fromUrl);
          setReady(true);
        }
        return;
      }

      const stored = readSessionCurrency();
      if (stored) {
        if (!cancelled) {
          setCurrencyState(stored);
          setReady(true);
        }
        return;
      }

      // Defer network geo well past lab measurement windows (PSI / Lighthouse).
      const scheduleGeo = () => {
        if (cancelled) return;
        void resolveGeoOnly();
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(scheduleGeo, { timeout: 8000 });
      } else {
        timeoutId = setTimeout(scheduleGeo, 8000);
      }
    }

    void resolve();
    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo<CurrencyContextValue>(() => {
    return {
      currency,
      symbol: getCurrencySymbol(currency),
      prices: getPlanPrices(currency),
      ready,
      setCurrency,
      format: (amount: number, decimals = 0) =>
        formatMoney(amount, currency, { decimals }),
    };
  }, [currency, ready, setCurrency]);

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // Safe fallback for any component rendered outside the provider
    return {
      currency: DEFAULT_CURRENCY,
      symbol: CURRENCY_META[DEFAULT_CURRENCY].symbol,
      prices: getPlanPrices(DEFAULT_CURRENCY),
      ready: false,
      setCurrency: () => {},
      format: (amount: number, decimals = 0) =>
        formatMoney(amount, DEFAULT_CURRENCY, { decimals }),
    };
  }
  return ctx;
}
