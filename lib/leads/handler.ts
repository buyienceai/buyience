import "server-only";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leadSubmissions } from "@/lib/db/schema";
import { sendLeadNotification } from "@/lib/mail/smtp";
import { LEAD_PATH_TO_FORM_TYPE, type LeadPath, validateLead } from "./validate";

function clientMeta(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null;
  const userAgent = request.headers.get("user-agent");
  return { ip, userAgent };
}

async function proxyToBackend(path: LeadPath, body: unknown) {
  const base = process.env.LEADS_BACKEND_URL?.replace(/\/$/, "");
  if (!base) return null;

  const res = await fetch(`${base}/api/leads/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({
    ok: false,
    error: "server_error",
  }));

  return NextResponse.json(data, { status: res.status });
}

export async function handleLeadPost(path: LeadPath, request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "validation_error", fields: { body: "invalid_json" } },
      { status: 400 },
    );
  }

  const proxied = await proxyToBackend(path, body);
  if (proxied) return proxied;

  const validated = validateLead(path, body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: "validation_error", fields: validated.fields },
      { status: 400 },
    );
  }

  // Soft-success for honeypot — no DB write
  if (validated.honeypot) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  try {
    const { ip, userAgent } = clientMeta(request);
    const formType = LEAD_PATH_TO_FORM_TYPE[path];
    const db = getDb();
    const [row] = await db
      .insert(leadSubmissions)
      .values({
        formType,
        email: validated.email,
        payload: validated.payload,
        honeypotTriggered: false,
        ip,
        userAgent,
      })
      .returning({ id: leadSubmissions.id });

    try {
      await sendLeadNotification({
        formType,
        email: validated.email,
        payload: validated.payload,
        submissionId: row.id,
      });
    } catch (mailErr) {
      // Lead is already saved — don't fail the request if SMTP is down
      console.error(`[leads/${path}] mail notification failed`, mailErr);
    }

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    console.error(`[leads/${path}] insert failed`, err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
