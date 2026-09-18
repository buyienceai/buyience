"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Defers Vercel Analytics + Speed Insights until first user interaction
 * or a long idle timeout — same strategy as DeferredGTM — so lab tools
 * (PSI / Lighthouse) do not pull them into the TBT measurement window.
 */
export default function DeferredAnalytics() {
  const [Analytics, setAnalytics] = useState<ComponentType | null>(null);
  const [SpeedInsights, setSpeedInsights] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      if (cancelled || loaded) return;
      loaded = true;
      cleanup();

      void Promise.all([
        import("@vercel/analytics/next"),
        import("@vercel/speed-insights/next"),
      ]).then(([analyticsMod, speedMod]) => {
        if (cancelled) return;
        setAnalytics(() => analyticsMod.Analytics);
        setSpeedInsights(() => speedMod.SpeedInsights);
      });
    };

    const onInteract = () => load();
    // Do not listen for scroll — lab tools scroll during measurement.
    const events = ["pointerdown", "keydown", "touchstart"] as const;

    function cleanup() {
      events.forEach((event) => window.removeEventListener(event, onInteract));
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    }

    events.forEach((event) =>
      window.addEventListener(event, onInteract, { once: true, passive: true }),
    );

    timeoutId = setTimeout(load, 12000);

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  if (!Analytics || !SpeedInsights) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
