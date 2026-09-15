"use client";

import React, { useState } from "react";
import SectionCapsule from "@/components/SectionCapsule";
import ThankYouDialog from "@/components/ThankYouDialog";
import { submitLead } from "@/lib/leads/submit";

const LOCATION_OPTIONS = [
  "United Kingdom",
  "United States",
  "India",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "Spain",
  "Italy",
  "United Arab Emirates",
  "Singapore",
  "New Zealand",
  "South Africa",
  "Other",
] as const;

const EMPTY_FORM = {
  first: "",
  last: "",
  email: "",
  phone: "",
  loc: "",
  locOther: "",
  company: "",
  ptype: "",
  ptypeOther: "",
  about: "",
  website2: "", // honeypot
};

export default function PartnerHero() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleThankYouClose = () => {
    setThankYouOpen(false);
    setFormData(EMPTY_FORM);
    setErrors({});
    setSubmitError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
      ...(id === "loc" && value !== "Other" ? { locOther: "" } : {}),
      ...(id === "ptype" && value !== "Other" ? { ptypeOther: "" } : {}),
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: false,
      ...(id === "loc" ? { locOther: false } : {}),
      ...(id === "ptype" ? { ptypeOther: false } : {}),
    }));
    setSubmitError(null);
  };

  const focusFirstInvalid = (fieldErrors: Record<string, boolean>) => {
    const order = ["first", "email", "loc", "locOther", "company", "ptype", "ptypeOther"] as const;
    const firstKey = order.find((key) => fieldErrors[key]);
    if (!firstKey) return;
    const el = document.getElementById(firstKey);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Honeypot check
    if (formData.website2) {
      setThankYouOpen(true);
      return;
    }

    const newErrors: Record<string, boolean> = {};
    if (!formData.first.trim()) newErrors.first = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
    }
    if (!formData.loc) newErrors.loc = true;
    if (formData.loc === "Other" && !formData.locOther.trim()) newErrors.locOther = true;
    if (!formData.company.trim()) newErrors.company = true;
    if (!formData.ptype) newErrors.ptype = true;
    if (formData.ptype === "Other" && !formData.ptypeOther.trim()) newErrors.ptypeOther = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError("Please fill in the required fields.");
      focusFirstInvalid(newErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead("solution-partner", { ...formData });

    if (!result.ok) {
      if (result.fields) {
        const fieldErrors: Record<string, boolean> = {};
        for (const key of Object.keys(result.fields)) {
          fieldErrors[key] = true;
        }
        setErrors(fieldErrors);
        focusFirstInvalid(fieldErrors);
      }
      setSubmitError(result.message);
      setSubmitting(false);
      return;
    }

    setThankYouOpen(true);
    setSubmitting(false);
  };

  const benefits = [
    {
      title: "Revenue share",
      desc: "Earn recurring commission on every client you bring to Nova Core — for as long as they stay.",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Implementation fees — 100% yours",
      desc: "Bill clients directly for setup, customization, and training. We don't take a cut of your services.",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
    },
    {
      title: "Deal registration & sales support",
      desc: "Register your deals directly with the team — registered clients are protected as yours, and we help you close them.",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
    },
    {
      title: "Co-marketing",
      desc: "Joint case studies with your first implementations, promoted through our channels alongside yours.",
      svg: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 3.9M15.4 6.5l-6.8 3.9" />
        </svg>
      ),
    },
  ];

  return (
    <header className="hero relative overflow-hidden bg-hero-grid">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="container hero-grid relative z-10">
        <div className="flex flex-col text-left self-start">
          <SectionCapsule>Buyience Partner Program</SectionCapsule>
          <h1>
            Become a Nova Core solution partner. <span className="grad-text">Grow your business with us.</span>
          </h1>
          <p className="lede">
            Join our network of implementation partners. Help B2B businesses modernize their commerce stack — and earn
            recurring revenue doing it.
          </p>

          {benefits.map((b, idx) => (
            <div className="benefit" key={idx}>
              <span className="ic" aria-hidden="true">
                {b.svg}
              </span>
              <div>
                <b>{b.title}</b>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}

          <div className="ideal">
            <p className="h">IDEAL FOR</p>
            <div className="chips">
              <span>Digital agencies</span>
              <span>B2B consultants</span>
              <span>WordPress / WooCommerce specialists</span>
              <span>ERP &amp; eCommerce consultants</span>
            </div>
          </div>
        </div>

        {/* APPLICATION FORM CARD */}
        <div className="card reveal in">
            <form onSubmit={handleSubmit} noValidate>
              <p className="card-h">Apply to the partner program</p>
              <p className="card-sub">Tell us about your business and we&apos;ll be in touch.</p>

              {/* Honeypot field */}
              <div className="hp" aria-hidden="true">
                <label>
                  Leave this empty
                  <input
                    type="text"
                    id="website2"
                    value={formData.website2}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="row2">
                <div className={`f ${errors.first ? "invalid" : ""}`}>
                  <label htmlFor="first">
                    First name <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="first"
                    value={formData.first}
                    onChange={handleChange}
                    autoComplete="given-name"
                    placeholder="e.g. Jordan"
                    aria-invalid={errors.first || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
                <div className="f">
                  <label htmlFor="last">
                    Last name <span className="opt">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="last"
                    value={formData.last}
                    onChange={handleChange}
                    autoComplete="family-name"
                    placeholder="e.g. Carter"
                  />
                </div>
              </div>

              <div className={`f ${errors.email ? "invalid" : ""}`}>
                <label htmlFor="email">
                  Business email <span className="req text-[#D14343]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="e.g. jordan@northwind.com"
                  aria-invalid={errors.email || undefined}
                />
                <span className="err">Please enter a valid email.</span>
              </div>

              <div className="row2">
                <div className="f">
                  <label htmlFor="phone">
                    Phone <span className="opt">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="e.g. +1 (415) 555-0132"
                  />
                </div>
                <div className={`f ${errors.loc ? "invalid" : ""}`}>
                  <label htmlFor="loc">
                    Location <span className="req text-[#D14343]">*</span>
                  </label>
                  <select
                    id="loc"
                    value={formData.loc}
                    onChange={handleChange}
                    aria-invalid={errors.loc || undefined}
                  >
                    <option value="">Select…</option>
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <span className="err">Required.</span>
                </div>
              </div>

              {formData.loc === "Other" ? (
                <div className={`f ${errors.locOther ? "invalid" : ""}`}>
                  <label htmlFor="locOther">
                    Please specify your location <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="locOther"
                    value={formData.locOther}
                    onChange={handleChange}
                    placeholder="e.g. Austin, TX"
                    aria-invalid={errors.locOther || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
              ) : null}

              <div className={`f ${errors.company ? "invalid" : ""}`}>
                <label htmlFor="company">
                  Company <span className="req text-[#D14343]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  placeholder="e.g. Northwind Digital"
                  aria-invalid={errors.company || undefined}
                />
                <span className="err">Required.</span>
              </div>

              <div className={`f ${errors.ptype ? "invalid" : ""}`}>
                <label htmlFor="ptype">
                  Partner type <span className="req text-[#D14343]">*</span>
                </label>
                <select
                  id="ptype"
                  value={formData.ptype}
                  onChange={handleChange}
                  aria-invalid={errors.ptype || undefined}
                >
                  <option value="">Select partner type</option>
                  <option value="Digital agency">Digital agency</option>
                  <option value="B2B consultant / integrator">B2B consultant / integrator</option>
                  <option value="WordPress / WooCommerce specialist">WordPress / WooCommerce specialist</option>
                  <option value="ERP / eCommerce consultant">ERP / eCommerce consultant</option>
                  <option value="Other">Other</option>
                </select>
                <span className="err">Required.</span>
              </div>

              {formData.ptype === "Other" ? (
                <div className={`f ${errors.ptypeOther ? "invalid" : ""}`}>
                  <label htmlFor="ptypeOther">
                    Please specify partner type <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="ptypeOther"
                    value={formData.ptypeOther}
                    onChange={handleChange}
                    placeholder="e.g. Industry consultant"
                    aria-invalid={errors.ptypeOther || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
              ) : null}

              <div className="f">
                <label htmlFor="about">
                  Tell us about your business <span className="opt">(optional)</span>
                </label>
                <textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="e.g. We implement commerce for B2B distributors and want Nova Core in our practice."
                ></textarea>
              </div>

              {submitError ? (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="submit-row">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit application"}
                </button>
                <p className="fine">We only use your details to talk to you about the partner program.</p>
              </div>
            </form>
        </div>
      </div>
      <ThankYouDialog
        open={thankYouOpen}
        onClose={handleThankYouClose}
        title="Thank you!"
        message="You'll hear from us directly — applications go to the founding team, not a queue."
      />
    </header>
  );
}
