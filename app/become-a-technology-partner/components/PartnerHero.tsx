"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionCapsule from "@/components/SectionCapsule";
import ThankYouDialog from "@/components/ThankYouDialog";
import { submitLead } from "@/lib/leads/submit";

export default function PartnerHero() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [locationOther, setLocationOther] = useState("");
  const [company, setCompany] = useState("");
  const [itype, setItype] = useState("");
  const [itypeOther, setItypeOther] = useState("");
  const [site, setSite] = useState("");
  const [plans, setPlans] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState({
    first: false,
    email: false,
    location: false,
    locationOther: false,
    company: false,
    itype: false,
    itypeOther: false,
    site: false,
  });
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleThankYouClose = () => {
    setThankYouOpen(false);
    setFirst("");
    setLast("");
    setEmail("");
    setPhone("");
    setLocation("");
    setLocationOther("");
    setCompany("");
    setItype("");
    setItypeOther("");
    setSite("");
    setPlans("");
    setHoneypot("");
    setErrors({
      first: false,
      email: false,
      location: false,
      locationOther: false,
      company: false,
      itype: false,
      itypeOther: false,
      site: false,
    });
    setSubmitError(null);
  };

  const focusFirstInvalid = (next: typeof errors) => {
    const order = ["first", "email", "location", "locationOther", "company", "itype", "itypeOther", "site"] as const;
    const firstKey = order.find((key) => next[key]);
    if (!firstKey) return;
    const idMap = {
      location: "loc",
      locationOther: "locationOther",
      itype: "itype",
      itypeOther: "itypeOther",
      site: "site",
      first: "first",
      email: "email",
      company: "company",
    } as const;
    const el = document.getElementById(idMap[firstKey]);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (honeypot) {
      setThankYouOpen(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nextErrors = {
      first: first.trim().length === 0,
      email: !emailRegex.test(email.trim()),
      location: location.trim().length === 0,
      locationOther: location === "Other" && locationOther.trim().length === 0,
      company: company.trim().length === 0,
      itype: itype.trim().length === 0,
      itypeOther: itype === "Other" && itypeOther.trim().length === 0,
      site: site.trim().length === 0,
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setSubmitError("Please fill in the required fields.");
      focusFirstInvalid(nextErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitLead("technology-partner", {
      first,
      last,
      email,
      phone,
      location,
      locationOther,
      company,
      itype,
      itypeOther,
      site,
      plans,
      website2: honeypot,
    });

    if (!result.ok) {
      if (result.fields) {
        const fieldErrors = {
          first: Boolean(result.fields.first),
          email: Boolean(result.fields.email),
          location: Boolean(result.fields.location),
          locationOther: Boolean(result.fields.locationOther),
          company: Boolean(result.fields.company),
          itype: Boolean(result.fields.itype),
          itypeOther: Boolean(result.fields.itypeOther),
          site: Boolean(result.fields.site),
        };
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
      title: "Full API access",
      description: "80+ REST endpoints, 38 webhook events, and a sandbox tenant to build against.",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      ),
    },
    {
      title: "A listing in the integration directory",
      description: (
        <>
          Your product, categorised and searchable, in front of every customer evaluating their stack.{" "}
          <Link href="/integrations" className="underline font-semibold text-violet-700">
            See the directory →
          </Link>
        </>
      ),
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      title: "Engineers, not a ticket queue",
      description: "Direct access to the people who built the API while you're building against it.",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2zM9 21h6" />
        </svg>
      ),
    },
    {
      title: "Co-marketing",
      description:
        "Joint launch announcements and case studies from the first shared customers — promoted through both our channels.",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      ),
    },
  ];

  const chips = [
    "ERP systems",
    "Payment gateways",
    "Shipping & logistics",
    "Accounting software",
    "Warehouse management",
    "CRM & PIM",
  ];

  return (
    <header className="hero relative overflow-hidden bg-hero-grid">
      <div className="pointer-events-none absolute inset-0 bg-hero-glows" aria-hidden="true" />
      <div className="container hero-grid relative z-10">
        {/* Left Side Info */}
        <div className="flex flex-col text-left self-start">
          <SectionCapsule>Technology Partner Program</SectionCapsule>
          <h1>
            Integrate your software with <span className="grad-text">an AI-native B2B commerce platform.</span>
          </h1>
          <p className="lede">
            Connect your product to Nova Core and reach wholesalers, distributors, and manufacturers who need what
            you build — while the integration directory is small enough that yours is the one they see.
          </p>

          <div className="mt-2">
            {benefits.map((b, idx) => (
              <div key={idx} className="benefit">
                <span className="ic" aria-hidden="true">
                  {b.icon}
                </span>
                <div>
                  <b>{b.title}</b>
                  <p>{b.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ideal">
            <p className="h">IDEAL INTEGRATION PARTNERS</p>
            <div className="chips">
              {chips.map((chip, idx) => (
                <span key={idx}>{chip}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Application Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
          id="tFormContainer"
        >
            <form onSubmit={handleSubmit} noValidate>
              <p className="card-h">Apply for technology partnership</p>
              <p className="card-sub">Tell us about your product and integration plans.</p>

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

              {/* Row: First and Last Name */}
              <div className="row2">
                <div className={`f ${errors.first ? "invalid" : ""}`} id="fFirst">
                  <label htmlFor="first">
                    First name <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="first"
                    autoComplete="given-name"
                    placeholder="e.g. Jordan"
                    value={first}
                    onChange={(e) => {
                      setFirst(e.target.value);
                      setErrors((prev) => ({ ...prev, first: false }));
                      setSubmitError(null);
                    }}
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
                    autoComplete="family-name"
                    placeholder="e.g. Carter"
                    value={last}
                    onChange={(e) => {
                      setLast(e.target.value);
                      setSubmitError(null);
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={`f ${errors.email ? "invalid" : ""}`} id="fEmail">
                <label htmlFor="email">
                  Business email <span className="req text-[#D14343]">*</span>
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
                    setSubmitError(null);
                  }}
                  aria-invalid={errors.email || undefined}
                />
                <span className="err">Please enter a valid email.</span>
              </div>

              {/* Row: Phone and Location */}
              <div className="row2">
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
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setSubmitError(null);
                    }}
                  />
                </div>
                <div className={`f ${errors.location ? "invalid" : ""}`} id="fLoc">
                  <label htmlFor="loc">
                    Location <span className="req text-[#D14343]">*</span>
                  </label>
                  <select
                    id="loc"
                    value={location}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocation(value);
                      if (value !== "Other") setLocationOther("");
                      setErrors((prev) => ({ ...prev, location: false, locationOther: false }));
                      setSubmitError(null);
                    }}
                    aria-invalid={errors.location || undefined}
                  >
                    <option value="">Select…</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="err">Required.</span>
                </div>
              </div>

              {location === "Other" ? (
                <div className={`f ${errors.locationOther ? "invalid" : ""}`}>
                  <label htmlFor="locationOther">
                    Please specify your location <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="locationOther"
                    value={locationOther}
                    onChange={(e) => {
                      setLocationOther(e.target.value);
                      setErrors((prev) => ({ ...prev, locationOther: false }));
                      setSubmitError(null);
                    }}
                    placeholder="e.g. Austin, TX"
                    aria-invalid={errors.locationOther || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
              ) : null}

              {/* Company / Product Name */}
              <div className={`f ${errors.company ? "invalid" : ""}`} id="fCompany">
                <label htmlFor="company">
                  Company / product name <span className="req text-[#D14343]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  autoComplete="organization"
                  placeholder="e.g. Acme ERP"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                    setErrors((prev) => ({ ...prev, company: false }));
                    setSubmitError(null);
                  }}
                  aria-invalid={errors.company || undefined}
                />
                <span className="err">Required.</span>
              </div>

              {/* Row: Integration Type and Website */}
              <div className="row2">
                <div className={`f ${errors.itype ? "invalid" : ""}`} id="fType">
                  <label htmlFor="itype">
                    Integration type <span className="req text-[#D14343]">*</span>
                  </label>
                  <select
                    id="itype"
                    value={itype}
                    onChange={(e) => {
                      const value = e.target.value;
                      setItype(value);
                      if (value !== "Other") setItypeOther("");
                      setErrors((prev) => ({ ...prev, itype: false, itypeOther: false }));
                      setSubmitError(null);
                    }}
                    aria-invalid={errors.itype || undefined}
                  >
                    <option value="">Select…</option>
                    <option value="ERP system">ERP system</option>
                    <option value="Payment gateway">Payment gateway</option>
                    <option value="Shipping & logistics">Shipping &amp; logistics</option>
                    <option value="Accounting software">Accounting software</option>
                    <option value="Warehouse management">Warehouse management</option>
                    <option value="CRM">CRM</option>
                    <option value="PIM / product data">PIM / product data</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="err">Required.</span>
                </div>
                <div className={`f ${errors.site ? "invalid" : ""}`} id="fSite">
                  <label htmlFor="site">
                    Product website <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="url"
                    id="site"
                    placeholder="e.g. https://acme.com"
                    value={site}
                    onChange={(e) => {
                      setSite(e.target.value);
                      setErrors((prev) => ({ ...prev, site: false }));
                      setSubmitError(null);
                    }}
                    aria-invalid={errors.site || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
              </div>

              {itype === "Other" ? (
                <div className={`f ${errors.itypeOther ? "invalid" : ""}`}>
                  <label htmlFor="itypeOther">
                    Please specify integration type <span className="req text-[#D14343]">*</span>
                  </label>
                  <input
                    type="text"
                    id="itypeOther"
                    value={itypeOther}
                    onChange={(e) => {
                      setItypeOther(e.target.value);
                      setErrors((prev) => ({ ...prev, itypeOther: false }));
                      setSubmitError(null);
                    }}
                    placeholder="e.g. Tax automation"
                    aria-invalid={errors.itypeOther || undefined}
                  />
                  <span className="err">Required.</span>
                </div>
              ) : null}

              {/* Plans */}
              <div className="f">
                <label htmlFor="plans">
                  Your integration plans <span className="opt">(optional)</span>
                </label>
                <textarea
                  id="plans"
                  placeholder="e.g. Sync orders from Nova Core into our ERP, and a shared customer is already asking."
                  value={plans}
                  onChange={(e) => {
                    setPlans(e.target.value);
                    setSubmitError(null);
                  }}
                ></textarea>
              </div>

              {/* Submit */}
              {submitError ? (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <div className="submit-row">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit application"}
                </button>
                <p className="fine">We only use your details to talk to you about the partnership.</p>
              </div>
            </form>
        </motion.div>
      </div>
      <ThankYouDialog
        open={thankYouOpen}
        onClose={handleThankYouClose}
        title="Thank you!"
        message="It goes straight to the engineering team. If there's a fit, you'll hear from a person who can actually answer API questions."
      />
    </header>
  );
}
