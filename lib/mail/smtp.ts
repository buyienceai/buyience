import "server-only";

import nodemailer from "nodemailer";
import type { FormType } from "@/lib/db/schema";

function env(name: string): string {
  const raw = process.env[name]?.trim() ?? "";
  // Allow quoted values from .env (e.g. MAIL_FROM_ADDRESS="no-reply@…")
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  return raw;
}

function isSmtpConfigured(): boolean {
  return Boolean(
    env("MAIL_HOST") && env("MAIL_USERNAME") && env("MAIL_PASSWORD"),
  );
}

function createTransport() {
  const host = env("MAIL_HOST");
  const port = Number(env("MAIL_PORT") || "465");
  const encryption = env("MAIL_ENCRYPTION").toLowerCase();
  // Port 465 = implicit TLS (secure); 587 = STARTTLS
  const secure =
    port === 465 || encryption === "ssl" || encryption === "smtps";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: env("MAIL_USERNAME"),
      pass: env("MAIL_PASSWORD"),
    },
  });
}

const FORM_LABELS: Record<FormType, string> = {
  demo: "Request a demo",
  contact: "Contact",
  solution_partner: "Solution partner",
  technology_partner: "Technology partner",
};

const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  first: "First name",
  last: "Last name",
  name: "Name",
  email: "Email",
  company: "Company",
  phone: "Phone",
  message: "Message",
  reason: "Reason",
  loc: "Location",
  location: "Location",
  ptype: "Partner type",
  itype: "Integration type",
  site: "Website",
  about: "About",
  plans: "Plans",
};

function formatFieldValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return JSON.stringify(value);
}

function payloadRows(payload: Record<string, unknown>): { label: string; value: string }[] {
  const skip = new Set(["locPreset", "ptypePreset", "locationPreset", "itypePreset"]);
  const rows: { label: string; value: string }[] = [];

  for (const [key, raw] of Object.entries(payload)) {
    if (skip.has(key)) continue;
    const value = formatFieldValue(raw);
    if (!value) continue;
    rows.push({ label: FIELD_LABELS[key] ?? key, value });
  }

  return rows;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadNotification(opts: {
  formType: FormType;
  email: string;
  payload: Record<string, unknown>;
  submissionId: string;
}): Promise<void> {
  if (!isSmtpConfigured()) {
    console.warn("[mail] SMTP not configured — skipping lead notification");
    return;
  }

  const to = env("MAIL_TO") || "hello@buyience.com";
  const fromAddress = env("MAIL_FROM_ADDRESS") || "no-reply@buyience.com";
  const fromName = env("MAIL_FROM_NAME") || "Buyience";
  const label = FORM_LABELS[opts.formType];
  const rows = payloadRows(opts.payload);

  const textLines = [
    `New ${label} submission`,
    "",
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    `Submission ID: ${opts.submissionId}`,
  ];

  const htmlRows = rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#666;white-space:nowrap;">${escapeHtml(r.label)}</td><td style="padding:6px 0;vertical-align:top;">${escapeHtml(r.value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5;color:#111;">
      <h2 style="margin:0 0 16px;font-size:18px;">New ${escapeHtml(label)} submission</h2>
      <table style="border-collapse:collapse;">${htmlRows}</table>
      <p style="margin:20px 0 0;color:#888;font-size:13px;">Submission ID: ${escapeHtml(opts.submissionId)}</p>
    </div>
  `.trim();

  const transport = createTransport();
  await transport.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    replyTo: opts.email,
    subject: `[Buyience] ${label} — ${opts.email}`,
    text: textLines.join("\n"),
    html,
  });
}
