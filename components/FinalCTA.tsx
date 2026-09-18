"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import SectionCapsule from "@/components/SectionCapsule";

const DottedGlobe = dynamic(() => import("@/components/DottedGlobe"), {
  ssr: false,
  loading: () => null,
});

export type FinalCTAAction = {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: "primary" | "ghost" | "secondary" | "outline-gray" | "text";
};

export type FinalCTAProps = {
  capsule?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: FinalCTAAction;
  secondaryAction?: FinalCTAAction | null;
  trust?: React.ReactNode | null;
  id?: string;
  className?: string;
  /** Sitewide alternating-section-background rule: true = purple (var(--surface)); default/false = white — today's site-wide behavior, unchanged for every existing caller. */
  purple?: boolean;
};

const DEFAULT_TITLE = (
  <>
    Ready to transform your{" "}
    <span className="final-card-accent">B2B commerce?</span>
  </>
);

const DEFAULT_PRIMARY: FinalCTAAction = {
  label: "Start for free →",
  href: "https://app.buyience.com/register",
  variant: "primary",
};

const DEFAULT_SECONDARY: FinalCTAAction = {
  label: "See pricing",
  href: "/pricing",
  variant: "ghost",
};

const GLOBE_MQ = "(min-width: 901px)";

export default function FinalCTA({
  capsule = "Simplify · Connect · Grow",
  title = DEFAULT_TITLE,
  description = "Simple, transparent pricing with no hidden fees. Lock in founder pricing before it's gone.",
  primaryAction = DEFAULT_PRIMARY,
  secondaryAction = DEFAULT_SECONDARY,
  trust = (
    <>
      14-day trial<span className="dot">·</span>No card required
    </>
  ),
  id,
  className = "",
  purple = false,
}: FinalCTAProps) {
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(GLOBE_MQ);
    const update = () => setShowGlobe(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      className={`final-card-section ${className}`.trim()}
      id={id}
      style={purple ? { background: "var(--surface)" } : undefined}
    >
      <div className="final-card-container">
        <div className="final-card">
          <div className="final-card-copy">
            <SectionCapsule variant="outline" showIcon>
              {capsule}
            </SectionCapsule>

            <h2>{title}</h2>

            <p>{description}</p>

            <div className="final-card-actions">
              <Button
                variant={primaryAction.variant ?? "primary"}
                size="lg"
                href={primaryAction.href}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
              {secondaryAction && (
                <Button
                  variant={secondaryAction.variant ?? "ghost"}
                  size="lg"
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>

            {trust != null && <p className="final-card-trust">{trust}</p>}
          </div>

          {showGlobe && (
            <div className="final-card-visual">
              <DottedGlobe />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
