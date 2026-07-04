"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createClient } from "../lib/supabase-server";
import { rateLimit } from "../lib/rate-limit";
import { withLogging } from "../lib/log";

/** All form submissions flow through these Server Actions.
 *  Pattern per action: validate (zod) → rate-limit (by IP) → write lead to
 *  Supabase → fire confirmation + ops-notify email → return typed result.
 *  Every Revenue Engine tool and contact form calls one of these.
 */

export type ActionResult =
  | { ok: true; gftProjectId?: string }
  | { ok: false; error: string };

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

async function sendEmails(opts: { subject: string; toCustomer?: string; payloadSummary: string }) {
  // Transactional email via Resend REST API — no SDK dependency needed.
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // email optional in dev; lead is already saved
  const send = (to: string, subject: string, text: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.EMAIL_FROM, to, subject, text }),
    }).catch(() => {});
  // ops notification always; customer confirmation if we have their address
  await send(process.env.LEAD_NOTIFY_TO!, `[Lead] ${opts.subject}`, opts.payloadSummary);
  if (opts.toCustomer) {
    await send(opts.toCustomer, "We received your GarageFloorToday request",
      "Thanks — a certified local team will follow up shortly. Your details are on file.");
  }
}

/* ---------- Estimate / Smart Estimator ---------- */

const estimateSchema = z.object({
  zip: z.string().min(3).max(10),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  size: z.string(),
  condition: z.string(),
  usage: z.string(),
  finish: z.string(),
  sourceTool: z.enum(["smart_estimator", "cost_calculator", "engineer_my_floor", "floor_finder"]),
  // honeypot — bots fill this, humans don't
  company: z.string().max(0).optional(),
});

export async function submitEstimate(input: unknown): Promise<ActionResult> {
  const parsed = estimateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.company) return { ok: false, error: "Submission rejected." }; // honeypot tripped

  const ip = await clientIp();
  if (!rateLimit(`estimate:${ip}`, 5, 60_000)) return { ok: false, error: "Too many requests. Please wait a moment." };

  const { company, sourceTool, email, phone, zip, ...payload } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    source_tool: sourceTool,
    payload,
    email: email || null,
    phone: phone || null,
    zip,
  });
  if (error) return { ok: false, error: "Something went wrong saving your request." };

  await sendEmails({
    subject: `${sourceTool} · ${zip}`,
    toCustomer: email || undefined,
    payloadSummary: JSON.stringify({ zip, ...payload }, null, 2),
  });
  return { ok: true };
}

/* ---------- Contact ---------- */

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  projectId: z.string().max(20).optional().or(z.literal("")),
  company: z.string().max(0).optional(),
});

export async function submitContact(input: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.company) return { ok: false, error: "Submission rejected." };

  const ip = await clientIp();
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) return { ok: false, error: "Too many requests. Please wait a moment." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    source_tool: "contact_form",
    payload: { name: parsed.data.name, message: parsed.data.message, projectId: parsed.data.projectId || null },
    email: parsed.data.email,
  });
  if (error) return { ok: false, error: "Something went wrong sending your message." };

  await sendEmails({
    subject: `Contact · ${parsed.data.name}`,
    toCustomer: parsed.data.email,
    payloadSummary: `${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
  });
  return { ok: true };
}

/* ---------- Visualizer / saved design ---------- */

const designSchema = z.object({
  blendId: z.string(),
  email: z.string().email().optional().or(z.literal("")),
  zip: z.string().max(10).optional().or(z.literal("")),
  company: z.string().max(0).optional(),
});

export async function saveDesign(input: unknown): Promise<ActionResult> {
  const parsed = designSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please try saving again." };
  if (parsed.data.company) return { ok: false, error: "Submission rejected." };

  const ip = await clientIp();
  if (!rateLimit(`design:${ip}`, 10, 60_000)) return { ok: false, error: "Too many requests. Please wait a moment." };

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    source_tool: "visualizer",
    payload: { blendId: parsed.data.blendId },
    email: parsed.data.email || null,
    zip: parsed.data.zip || null,
  });
  if (error) return { ok: false, error: "Couldn't save your design." };
  return { ok: true };
}
