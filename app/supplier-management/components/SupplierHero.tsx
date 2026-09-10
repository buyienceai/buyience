"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import { useCurrency } from "@/components/CurrencyProvider";
import SectionCapsule from "@/components/SectionCapsule";

type StepKey = 1 | 2 | 3 | 4 | 5;

interface FieldRow {
  tag: string;
  text: string;
  status?: "ok" | "warn" | "hl" | "";
}

const ROTATING_WORDS = [
  "Every supplier.",
  "Every document.",
  "One workflow.",
  "Every supplier.",
];

const STEP_LABELS: Record<StepKey, string> = {
  1: "Basic",
  2: "Financial",
  3: "Compliance",
  4: "Logistics",
  5: "Review",
};

export default function SupplierHero() {
  const { format, currency } = useCurrency();
  const [currentStep, setCurrentStep] = useState<StepKey>(1);
  const [isCreated, setIsCreated] = useState(false);

  const panels: Record<StepKey, FieldRow[]> = {
    1: [
      { tag: "FIELD", text: "Company · Nordfab Components GmbH" },
      { tag: "FIELD", text: "Registration HRB 88214 · Tax ID DE 314 559" },
      { tag: "CONTACT", text: "anna.weber@nordfab.de · +49 40 5551 020", status: "ok" },
    ],
    2: [
      { tag: "FIELD", text: "Bank · Commerzbank · SWIFT COBADEFF" },
      { tag: "MASKED", text: "Account ····· 4821 — stored securely", status: "ok" },
      { tag: "FIELD", text: `Currency ${currency} · Payment terms Net 30` },
    ],
    3: [
      { tag: "VALID", text: "ISO 9001 · expires Dec 2026", status: "ok" },
      { tag: "EXPIRING", text: "Liability insurance · 21 days left", status: "warn" },
      { tag: "FIELD", text: "Import licence.pdf · uploaded, awaiting verify" },
    ],
    4: [
      { tag: "FIELD", text: "Road freight · 5-day transit" },
      { tag: "FIELD", text: "Zones · DE, UK mainland, BeNeLux" },
      { tag: "RULES", text: `Min order ${format(500)} · chilled transport`, status: "warn" },
    ],
    5: [
      { tag: "BASIC", text: "Complete", status: "ok" },
      { tag: "FINANCIAL", text: "Complete", status: "ok" },
      { tag: "COMPLIANCE", text: "2 valid · 1 expiring flagged", status: "ok" },
      { tag: "READY", text: "Validation passed — create supplier", status: "hl" },
    ],
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as StepKey);
    } else {
      setIsCreated(true);
    }
  };

  return (
    <header className="supplier-hero relative flex flex-col overflow-hidden bg-hero-grid sm:min-h-[var(--home-hero-h)] sm:justify-center">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="supplier-hero-inner relative z-10 mx-auto grid w-full max-w-[var(--w-max,1200px)] grid-cols-1 items-stretch gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8">
        <div className="supplier-hero-copy flex min-h-0 flex-col text-left">
          <div className="supplier-hero-copy-main">
            <SectionCapsule>Supplier Management</SectionCapsule>
            <h1>
              B2B supplier management.{" "}
              <span className="home-rotator" aria-hidden="true">
                <span className="home-rotator-track">
                  {ROTATING_WORDS.map((word, i) => (
                    <span key={`${word}-${i}`} className="home-rotator-word grad-text">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span className="sr-only">Every supplier, every document, one workflow.</span>
            </h1>
            <p className="lede">
              Onboard suppliers with a structured 5-step process. Track compliance documents and expiry dates.
              Configure logistics and delivery zones. See supplier status and spending at a glance.
            </p>
          </div>
          <div className="supplier-hero-copy-foot">
            <div className="cta-row">
              <Button variant="primary" size="lg" href="https://app.buyience.com/register">
                Start free trial →
              </Button>
              <Button variant="ghost" size="lg" href="/request-a-demo">
                Request a demo
              </Button>
            </div>
            <p className="trust-micro">
              <span className="trust-live" aria-hidden="true" />
              14-day trial · No card required
            </p>
          </div>
        </div>

        <div className="supplier-hero-visual relative flex min-h-0 w-full flex-col">
          <div className="ob" aria-label="Supplier onboarding — step through the 5-step workflow">
            <div className="ob-head">
              <div className="ob-head-text">
                <b>New supplier</b>
                <span>Nordfab Components GmbH</span>
              </div>
              <span className="ob-badge">LIVE DEMO</span>
            </div>

            <div className="ob-steps" role="group" aria-label="Onboarding steps">
              {([1, 2, 3, 4, 5] as StepKey[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={currentStep > s ? "donec" : ""}
                  aria-pressed={currentStep === s}
                  onClick={() => {
                    setCurrentStep(s);
                    setIsCreated(false);
                  }}
                >
                  <b>{s}</b>
                  {STEP_LABELS[s]}
                </button>
              ))}
            </div>

            <div className="ob-prog">
              <span className="sr-only">Onboarding progress</span>
              <i style={{ width: `${isCreated ? 100 : currentStep * 20}%` }} />
            </div>

            <div className="ob-panel">
              {panels[currentStep].map((row, idx) => (
                <div key={idx} className={`ob-field ${row.status || ""}`}>
                  <span className="tag">{row.tag}</span>
                  <span className="ob-field-text">{row.text}</span>
                </div>
              ))}
            </div>

            <div className="ob-foot">
              <span className="stat">
                {isCreated ? "APPROVED · ACTIVE" : `STEP ${currentStep} OF 5`}
              </span>
              <button
                className={`ob-next ${currentStep === 5 ? "create" : ""}`}
                type="button"
                onClick={handleNext}
              >
                {isCreated ? "✓ Supplier created" : currentStep === 5 ? "✓ Create supplier" : "Next step →"}
              </button>
            </div>
          </div>
          <p className="ob-note">Structured onboarding — no missed fields, no incomplete profiles</p>
        </div>
      </div>
    </header>
  );
}
