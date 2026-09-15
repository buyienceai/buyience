"use client";

import React, { useRef, useState } from "react";
import MarketingLayout from "@/components/MarketingLayout";
import SectionCapsule from "@/components/SectionCapsule";
import Button from "@/components/Button";
import ThankYouDialog from "@/components/ThankYouDialog";
import { submitLead } from "@/lib/leads/submit";

export default function RequestDemoPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead("demo", {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      website2: "",
    });

    if (!result.ok) {
      setSubmitError(result.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setThankYouOpen(true);
  }

  function handleThankYouClose() {
    setThankYouOpen(false);
    formRef.current?.reset();
    setSubmitError(null);
  }

  return (
    <MarketingLayout cta={false}>
      <section className="relative overflow-hidden bg-hero-grid">
          <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-[var(--w-max,1200px)] gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-12 md:px-8 md:py-20 lg:gap-16">
            <div>
              <SectionCapsule>Request a Demo</SectionCapsule>
              <h1 className="mt-3 text-[1.75rem] font-extrabold leading-tight tracking-normal text-[#1B1033] sm:mt-5 sm:text-4xl md:text-5xl">
                See Nova Core in action
              </h1>
              <p className="mt-3 text-[15px] leading-snug text-[#5A4B7C] sm:mt-4 sm:text-[17px] sm:leading-relaxed">
                Book a personalized 30-minute walkthrough. We&apos;ll show AI quoting, inventory management, and the B2B
                storefront — tailored to how your team sells.
              </p>
              <ul className="mt-4 space-y-2 text-[14px] text-[#4A3B6B] sm:mt-6 sm:space-y-3 sm:text-[15px]">
                {[
                  "AI Quote Engine with margin protection",
                  "Digital Sales Room negotiations",
                  "Multi-warehouse inventory live demo",
                  "Founder launch pricing walkthrough",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#6E2CF4]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E8E4F4] bg-white p-4 shadow-[0_12px_40px_rgba(23,18,65,0.08)] sm:rounded-3xl sm:p-6 md:p-8"
            >
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="block text-left text-[13px] font-semibold text-[#1B1033] sm:text-sm">
                  First name <span className="req text-[#D14343]">*</span>
                  <input
                    required
                    name="firstName"
                    placeholder="e.g. Jordan"
                    className="mt-1.5 w-full rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                  />
                </label>
                <label className="block text-left text-[13px] font-semibold text-[#1B1033] sm:text-sm">
                  Last name <span className="req text-[#D14343]">*</span>
                  <input
                    required
                    name="lastName"
                    placeholder="e.g. Carter"
                    className="mt-1.5 w-full rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                  />
                </label>
              </div>
              <label className="mt-3 block text-left text-[13px] font-semibold text-[#1B1033] sm:mt-4 sm:text-sm">
                Work email <span className="req text-[#D14343]">*</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="e.g. jordan@acme.com"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                />
              </label>
              <label className="mt-3 block text-left text-[13px] font-semibold text-[#1B1033] sm:mt-4 sm:text-sm">
                Company <span className="req text-[#D14343]">*</span>
                <input
                  required
                  name="company"
                  placeholder="e.g. Acme Distribution Inc."
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                />
              </label>
              <label className="mt-3 block text-left text-[13px] font-semibold text-[#1B1033] sm:mt-4 sm:text-sm">
                Phone number <span className="req text-[#D14343]">*</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="e.g. +1 (415) 555-0132"
                  className="mt-1.5 w-full rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                />
              </label>
              <label className="mt-3 block text-left text-[13px] font-semibold text-[#1B1033] sm:mt-4 sm:text-sm">
                What are you looking to solve?
                <textarea
                  name="message"
                  rows={3}
                  placeholder="e.g. We want faster quote approvals and better inventory visibility."
                  className="mt-1.5 w-full resize-y rounded-xl border border-[#D7D0EC] px-3 py-2.5 text-[16px] font-medium text-[#1B1033] placeholder:font-normal placeholder:text-[#9B90BA] outline-none focus:border-[#6E2CF4] focus:ring-2 focus:ring-[#6E2CF4]/20 sm:px-3.5 sm:text-[15px]"
                />
              </label>
              {submitError ? (
                <p className="mt-3 text-center text-sm text-red-600 sm:mt-4" role="alert">
                  {submitError}
                </p>
              ) : null}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-4 w-full sm:mt-6"
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Book My Demo"}
              </Button>
              <p className="mt-2.5 text-center text-xs text-slate-400 sm:mt-3">
                We typically respond within one business day.
              </p>
            </form>
          </div>
        </section>
      <ThankYouDialog
        open={thankYouOpen}
        onClose={handleThankYouClose}
        title="Thank you!"
        message="We've received your demo request and will be in touch shortly."
      />
    </MarketingLayout>
  );
}
