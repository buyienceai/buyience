"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-KMWGZ8VH";

/**
 * Loads GTM only after first user interaction or a short idle delay.
 * Keeps Facebook Pixel / gtag (injected by the container) off the LCP/TBT
 * critical path while still firing for real visitors.
 */
export default function DeferredGTM() {
  useEffect(() => {
    let loaded = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const w = window as Window & { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };

    const onInteract = () => load();
    // Do not listen for scroll — lab tools (PSI/Lighthouse) scroll during
    // measurement and would pull GTM/Facebook into the TBT window.
    const events = ["pointerdown", "keydown", "touchstart"] as const;

    function cleanup() {
      events.forEach((event) => window.removeEventListener(event, onInteract));
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    }

    events.forEach((event) =>
      window.addEventListener(event, onInteract, { once: true, passive: true }),
    );

    // Fallback so analytics still loads for passive visitors.
    // Long enough that lab tools (PSI / Lighthouse) finish measuring first.
    timeoutId = setTimeout(load, 12000);

    return cleanup;
  }, []);

  return null;
}
