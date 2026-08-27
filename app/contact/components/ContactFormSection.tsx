"use client";

import React, { useState } from "react";
import ThankYouDialog from "@/components/ThankYouDialog";
import { submitLead } from "@/lib/leads/submit";

interface ContactFormSectionProps {
  selectedReason: string;
  onSelectReason: (reason: string) => void;
}

export default function ContactFormSection({ selectedReason, onSelectReason }: ContactFormSectionProps) {
  // Input fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Validation & Submission state
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setMessage("");
    setHoneypot("");
    setErrors({ name: false, email: false, message: false });
    setSubmitError(null);
  };

  const handleThankYouClose = () => {
    setThankYouOpen(false);
    resetForm();
  };

  // Configuration for adaptative placeholder and hints based on contact reason
  const config: Record<
    string,
    { hint: React.ReactNode; placeholder: string; eta: string; done: string }
  > = {
    demo: {
      hint: "Demos are run by the team that built the product — tell us what you sell and we'll tailor it to your workflow.",
      placeholder: "e.g. We sell industrial fasteners and still quote by email and spreadsheet.",
      eta: "REPLY: SAME BUSINESS DAY",
      done: "A demo request is with the founding team — we'll come back with times.",
    },
    sales: {
      hint: (
        <>
          Pricing is public —{" "}
          <a href="/pricing" className="underline font-semibold text-violet-700">
            see the plans
          </a>{" "}
          first if you haven't. Happy to talk through plan fit, migration, or Enterprise terms.
        </>
      ),
      placeholder: "e.g. We want to compare Growth vs Enterprise and talk through migration.",
      eta: "REPLY: WITHIN 24 HOURS",
      done: "Your question is with the team.",
    },
    support: {
      hint: "If you're logged in, mention your company name so we can find your tenant quickly.",
      placeholder: "e.g. Quotes aren't syncing to our ERP — company: Acme Distribution.",
      eta: "REPLY: WITHIN 24 HOURS",
      done: "Support has your message — we'll get on it.",
    },
    partnership: {
      hint: "Building a partner practice or an integration? The solution partner and technology partner areas have the full picture.",
      placeholder: "e.g. We're a digital agency serving B2B distributors and want to implement Nova Core.",
      eta: "REPLY: WITHIN 2 DAYS",
      done: "Your partnership enquiry is with the founding team.",
    },
    other: {
      hint: "",
      placeholder: "e.g. Tell us what you sell, what's slowing you down, or what you'd like to see.",
      eta: "REPLY: WITHIN 2 DAYS",
      done: "It's with the founding team.",
    },
  };

  const currentConfig = config[selectedReason] || config.other;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Spambot honeypot check (client soft-exit; server also soft-succeeds)
    if (honeypot) {
      setThankYouOpen(true);
      return;
    }

    // Validate inputs
    const isNameError = name.trim().length === 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailError = !emailRegex.test(email.trim());
    const isMsgError = message.trim().length === 0;

    setErrors({
      name: isNameError,
      email: isEmailError,
      message: isMsgError,
    });

    if (isNameError || isEmailError || isMsgError) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead("contact", {
      reason: selectedReason,
      name,
      email,
      company,
      phone,
      message,
      website2: honeypot,
    });

    if (!result.ok) {
      setSubmitError(result.message);
      setSubmitting(false);
      return;
    }

    setThankYouOpen(true);
    setSubmitting(false);
  };

  return (
    <section className="form-wrap" id="form">
      <div className="container form-grid">
        {/* Left Column: Direct channels and SLAs */}
        <div className="flex flex-col justify-start">
          <p className="eyebrow">DIRECT</p>
          <h2 style={{ margin: "12px 0 20px" }}>
            Prefer email? <span className="grad-text">Just write to us.</span>
          </h2>

          <div className="info-block">
            <p className="h">GENERAL ENQUIRIES</p>
            <a className="mail text-[#5B21D8] hover:underline" href="mailto:hello@buyience.com">
              hello@buyience.com
            </a>
            <p>Goes to the founding team. Not a shared inbox nobody reads.</p>
          </div>

          <div className="sla">
            <div className="sla-row">
              <span>Demo requests</span>
              <b>SAME BUSINESS DAY</b>
            </div>
            <div className="sla-row">
              <span>Sales &amp; pricing questions</span>
              <b>WITHIN 24 HOURS</b>
            </div>
            <div className="sla-row">
              <span>Customer support</span>
              <b>WITHIN 24 HOURS</b>
            </div>
            <div className="sla-row">
              <span>Partnerships &amp; press</span>
              <b>WITHIN 2 DAYS</b>
            </div>
            <p className="sla-note">
              Business days, UK hours. We'd rather commit to something we hit than promise instant and miss.
            </p>
          </div>

          <div className="who-we-are">
            <b>Who you'll actually hear from</b>
            <p>
              Buyience is a small, founder-led team building Nova Core. Your message doesn't get triaged by a BDR — it
              lands with people who know the product because they made it.
            </p>
          </div>
        </div>

        {/* Right Column: Form card */}
        <div className="card">
            <form onSubmit={handleSubmit} noValidate>
              <p className="card-h">Send us a message</p>
              <p className="card-sub">One form, routed to the right person.</p>

              {/* Honeypot spambot trap */}
              <div className="hp" aria-hidden="true">
                <label>
                  Leave this empty
                  <input
                    type="text"
                    name="website2"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              {/* Dropdown Reason */}
              <div className="f">
                <label htmlFor="reason">What's this about?</label>
                <select id="reason" value={selectedReason} onChange={(e) => onSelectReason(e.target.value)}>
                  <option value="demo">I'd like a demo</option>
                  <option value="sales">Sales &amp; pricing question</option>
                  <option value="support">I'm a customer and need support</option>
                  <option value="partnership">Partnership enquiry</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              {/* Dynamic Contextual Hint */}
              {currentConfig.hint && <div className="hint show">{currentConfig.hint}</div>}

              {/* Row: Name and Email */}
              <div className="row2">
                <div className={`f ${errors.name ? "invalid" : ""}`} id="fName">
                  <label htmlFor="name">
                    Name <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    placeholder="e.g. Jordan Carter"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: false }));
                    }}
                  />
                  <span className="err">Required.</span>
                </div>
                <div className={`f ${errors.email ? "invalid" : ""}`} id="fEmail">
                  <label htmlFor="email">
                    Work email <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    placeholder="e.g. jordan@acme.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: false }));
                    }}
                  />
                  <span className="err">Please enter a valid email.</span>
                </div>
              </div>

              {/* Row: Company and Phone */}
              <div className="row2">
                <div className="f">
                  <label htmlFor="company">
                    Company <span className="opt">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    autoComplete="organization"
                    placeholder="e.g. Acme Distribution Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="f">
                  <label htmlFor="phone">
                    Phone <span className="opt">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    autoComplete="tel"
                    placeholder="e.g. +1 (415) 555-0132"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Message Block */}
              <div className={`f ${errors.message ? "invalid" : ""}`} id="fMsg">
                <label htmlFor="msg">
                  Your message <span className="req text-[#D14343]">*</span>
                </label>
                <textarea
                  id="msg"
                  placeholder={currentConfig.placeholder}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors((prev) => ({ ...prev, message: false }));
                  }}
                ></textarea>
                <span className="err">Tell us a little about what you need.</span>
              </div>

              {/* Submit Buttons */}
              {submitError ? (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="submit-row">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </button>
                <p className="fine">We&apos;ll only use your details to reply to you.</p>
              </div>
            </form>
        </div>
      </div>
      <ThankYouDialog
        open={thankYouOpen}
        onClose={handleThankYouClose}
        title="Thank you!"
        message={currentConfig.done}
      />
    </section>
  );
}
