import type { FormType } from "@/lib/db/schema";

export type LeadPath =
  | "demo"
  | "contact"
  | "solution-partner"
  | "technology-partner";

export const LEAD_PATH_TO_FORM_TYPE: Record<LeadPath, FormType> = {
  demo: "demo",
  contact: "contact",
  "solution-partner": "solution_partner",
  "technology-partner": "technology_partner",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_REASONS = ["demo", "sales", "support", "partnership", "other"] as const;

const SOLUTION_PTYPES = [
  "Digital agency",
  "B2B consultant / integrator",
  "WordPress / WooCommerce specialist",
  "ERP / eCommerce consultant",
  "Other",
] as const;

const TECH_ITYPES = [
  "ERP system",
  "Payment gateway",
  "Shipping & logistics",
  "Accounting software",
  "Warehouse management",
  "CRM",
  "PIM / product data",
  "Other",
] as const;

const LOCATIONS = [
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

export type ValidationResult =
  | { ok: true; email: string; payload: Record<string, unknown>; honeypot: boolean }
  | { ok: false; fields: Record<string, string> };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function requireEmail(value: unknown, fields: Record<string, string>, key = "email") {
  const email = asString(value);
  if (!email) {
    fields[key] = "required";
    return "";
  }
  if (!EMAIL_RE.test(email)) {
    fields[key] = "invalid";
    return "";
  }
  return email;
}

function requireNonEmpty(
  value: unknown,
  fields: Record<string, string>,
  key: string,
): string {
  const v = asString(value);
  if (!v) fields[key] = "required";
  return v;
}

function optionalString(value: unknown): string {
  return asString(value);
}

function resolveLocation(
  selected: string,
  other: string,
  fields: Record<string, string>,
  selectKey: string,
  otherKey: string,
): string {
  return resolveSelectWithOther(selected, other, fields, selectKey, otherKey, LOCATIONS);
}

function resolveSelectWithOther(
  selected: string,
  other: string,
  fields: Record<string, string>,
  selectKey: string,
  otherKey: string,
  allowed: readonly string[],
): string {
  if (!selected) {
    fields[selectKey] = "required";
    return "";
  }
  if (!allowed.includes(selected)) {
    fields[selectKey] = "invalid";
    return "";
  }
  if (selected === "Other") {
    const custom = other.trim();
    if (!custom) {
      fields[otherKey] = "required";
      return "";
    }
    return custom;
  }
  return selected;
}

export function validateLead(
  path: LeadPath,
  body: Record<string, unknown>,
): ValidationResult {
  const honeypot = asString(body.website2).length > 0;
  if (honeypot) {
    return { ok: true, email: "honeypot@ignored.local", payload: {}, honeypot: true };
  }

  const fields: Record<string, string> = {};

  if (path === "demo") {
    const firstName = requireNonEmpty(body.firstName, fields, "firstName");
    const lastName = requireNonEmpty(body.lastName, fields, "lastName");
    const email = requireEmail(body.email, fields);
    const company = requireNonEmpty(body.company, fields, "company");
    const phone = requireNonEmpty(body.phone, fields, "phone");
    const message = optionalString(body.message);

    if (Object.keys(fields).length > 0) return { ok: false, fields };

    return {
      ok: true,
      email,
      honeypot: false,
      payload: { firstName, lastName, email, company, phone, message },
    };
  }

  if (path === "contact") {
    const reason = asString(body.reason);
    if (!CONTACT_REASONS.includes(reason as (typeof CONTACT_REASONS)[number])) {
      fields.reason = "invalid";
    }
    const name = requireNonEmpty(body.name, fields, "name");
    const email = requireEmail(body.email, fields);
    const company = optionalString(body.company);
    const phone = optionalString(body.phone);
    const message = requireNonEmpty(body.message, fields, "message");

    if (Object.keys(fields).length > 0) return { ok: false, fields };

    return {
      ok: true,
      email,
      honeypot: false,
      payload: { reason, name, email, company, phone, message },
    };
  }

  if (path === "solution-partner") {
    const first = requireNonEmpty(body.first, fields, "first");
    const last = optionalString(body.last);
    const email = requireEmail(body.email, fields);
    const phone = optionalString(body.phone);
    const loc = resolveLocation(
      asString(body.loc),
      asString(body.locOther),
      fields,
      "loc",
      "locOther",
    );
    const company = requireNonEmpty(body.company, fields, "company");
    const ptype = resolveSelectWithOther(
      asString(body.ptype),
      asString(body.ptypeOther),
      fields,
      "ptype",
      "ptypeOther",
      SOLUTION_PTYPES,
    );
    const about = optionalString(body.about);

    if (Object.keys(fields).length > 0) return { ok: false, fields };

    return {
      ok: true,
      email,
      honeypot: false,
      payload: {
        first,
        last,
        email,
        phone,
        loc,
        locPreset: asString(body.loc),
        company,
        ptype,
        ptypePreset: asString(body.ptype),
        about,
      },
    };
  }

  // technology-partner
  const first = requireNonEmpty(body.first, fields, "first");
  const last = optionalString(body.last);
  const email = requireEmail(body.email, fields);
  const phone = optionalString(body.phone);
  const location = resolveLocation(
    asString(body.location),
    asString(body.locationOther),
    fields,
    "location",
    "locationOther",
  );
  const company = requireNonEmpty(body.company, fields, "company");
  const itype = resolveSelectWithOther(
    asString(body.itype),
    asString(body.itypeOther),
    fields,
    "itype",
    "itypeOther",
    TECH_ITYPES,
  );
  const site = asString(body.site);
  if (!site) {
    fields.site = "required";
  } else {
    try {
      // Accept with or without protocol
      const url = site.includes("://") ? site : `https://${site}`;
      new URL(url);
    } catch {
      fields.site = "invalid";
    }
  }
  const plans = optionalString(body.plans);

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    email,
    honeypot: false,
    payload: {
      first,
      last,
      email,
      phone,
      location,
      locationPreset: asString(body.location),
      company,
      itype,
      itypePreset: asString(body.itype),
      site,
      plans,
    },
  };
}
