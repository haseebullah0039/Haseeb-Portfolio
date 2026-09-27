import nodemailer from "nodemailer";
import { contact, site } from "@/data/site";

/**
 * Contact form → Gmail.
 *
 * Sends each submission from your Gmail account to contact.formEmail using a
 * Gmail App Password (no third-party service). Configure in `.env.local` locally
 * and in your host's Environment Variables in production:
 *
 *   GMAIL_USER=haseebullah0039@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 *
 * Responds 503 { configured: false } when not configured, so the form can fall back.
 */

const MAX = { name: 100, email: 200, phone: 40, service: 60, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory rate limit: 5 messages per IP per 10 minutes (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) {
    return Response.json({ ok: false, configured: false }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const service = clean(body.service, MAX.service);
  const message = clean(body.message, MAX.message);

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Service", service || "Not specified"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#1f1024">
      <h2 style="margin:0 0 4px;color:#f97316">New enquiry from ${escapeHtml(site.domain)}</h2>
      <p style="margin:0 0 16px;color:#666">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border:1px solid #eee;background:#faf7f5;font-weight:bold;width:110px">${k}</td><td style="padding:8px 12px;border:1px solid #eee">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 8px">Message</h3>
      <div style="padding:14px;border:1px solid #eee;border-radius:8px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", message].join("\n");

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `"${site.name} Portfolio" <${user}>`,
      to: contact.formEmail,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New ${service || "website"} enquiry from ${name} — ${site.domain}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form: Gmail send failed", err);
    return Response.json({ ok: false, error: "Email could not be sent." }, { status: 502 });
  }
}
