"use client";

import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { contact, site } from "@/data/site";
import { contactServiceOptions } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { CONTACT_SERVICE_EVENT, takeRememberedContactService } from "@/lib/contact";
import styles from "./ContactForm.module.css";

type Fields = { name: string; email: string; phone: string; service: string; message: string; company: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

const initial: Fields = { name: "", email: "", phone: "", service: "", message: "", company: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

/**
 * Delivery chain — the visitor never hits a dead end:
 *  1. /api/contact  → sends from your Gmail to contact.formEmail (needs GMAIL_* env vars)
 *  2. FormSubmit    → used if Gmail isn't configured (works once its email is activated)
 *  3. Email app     → opens the visitor's mail app with the message pre-filled
 * NEXT_PUBLIC_FORM_ENDPOINT can replace step 2 with another JSON endpoint (e.g. Formspree).
 */
const FALLBACK_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${contact.formEmail}`;

type Payload = { name: string; email: string; phone: string; service: string; message: string; company: string };

/** Returns "sent", "rejected" (with a message to show), or "unavailable" (try the next method). */
async function sendViaApi(payload: Payload): Promise<{ result: "sent" | "rejected" | "unavailable"; error?: string }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && data.ok) return { result: "sent" };
    if (res.status === 400 || res.status === 429) return { result: "rejected", error: data.error };
    return { result: "unavailable" }; // 503 not configured, 502 Gmail error, 404 static host…
  } catch {
    return { result: "unavailable" };
  }
}

async function sendViaFallback(payload: Payload): Promise<boolean> {
  try {
    const res = await fetch(FALLBACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "Not provided",
        service: payload.service,
        message: payload.message,
        _subject: `New ${payload.service} enquiry from ${payload.name} — ${site.domain}`,
        _replyto: payload.email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return res.ok && String(data.success) !== "false";
  } catch {
    return false;
  }
}

function openEmailApp(payload: Payload) {
  const subject = `${payload.service} enquiry from ${payload.name}`;
  const body = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Service: ${payload.service}`,
    "",
    payload.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
  window.location.href = `mailto:${contact.formEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = "Please enter a valid phone number, or leave it empty.";
  if (!f.service) e.service = "Please choose a service.";
  if (f.message.trim().length < 10) e.message = "Please write a short message (at least 10 characters).";
  return e;
}

export function ContactForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  // Pre-select the service chosen by the button that brought the visitor here:
  // a click on this page (event), a click on another page (sessionStorage),
  // or an old-style ?service= link.
  useEffect(() => {
    const select = (value: string | null | undefined) => {
      if (value && contactServiceOptions.some((o) => o.value === value)) {
        setFields((f) => ({ ...f, service: value }));
      }
    };
    select(takeRememberedContactService() ?? new URLSearchParams(window.location.search).get("service"));

    const onSelect = (e: Event) => {
      takeRememberedContactService(); // handled here; don’t re-apply on a later reload
      select((e as CustomEvent<string>).detail);
    };
    window.addEventListener(CONTACT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(CONTACT_SERVICE_EVENT, onSelect);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const next = { ...fields, [name]: value };
    setFields(next);
    if (touched[name as keyof Fields]) setErrors(validate(next));
  };

  const onBlur = (e: { target: { name: string } }) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (fields.company) return; // honeypot: silently ignore bots

    const serviceLabel = contactServiceOptions.find((o) => o.value === fields.service)?.label ?? fields.service;

    setStatus({ type: "sending" });
    const payload: Payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      service: serviceLabel,
      message: fields.message.trim(),
      company: fields.company,
    };

    const done = () => {
      setStatus({ type: "success", message: "Thank you — your message has been sent. I’ll get back to you soon." });
      setFields(initial);
      setTouched({});
    };

    const api = await sendViaApi(payload);
    if (api.result === "sent") return done();
    if (api.result === "rejected") {
      setStatus({ type: "error", message: api.error || "Please check the form and try again." });
      return;
    }
    if (await sendViaFallback(payload)) return done();

    // Last resort: hand the message to the visitor's email app, already written.
    openEmailApp(payload);
    setStatus({
      type: "success",
      message: `Your email app has opened with your message ready — just press Send. You can also email ${contact.formEmail} directly.`,
    });
  };

  const field = (name: keyof Fields) => ({
    id: `${uid}-${name}`,
    name,
    value: fields[name],
    onChange,
    onBlur,
    "aria-invalid": errors[name] && touched[name] ? true : undefined,
    "aria-describedby": errors[name] && touched[name] ? `${uid}-${name}-error` : undefined,
  });

  const errorFor = (name: keyof Fields) =>
    errors[name] && touched[name] ? (
      <p id={`${uid}-${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Contact form">
      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor={`${uid}-name`}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input {...field("name")} type="text" autoComplete="name" required placeholder="Your full name" />
          {errorFor("name")}
        </div>
        <div className={styles.group}>
          <label htmlFor={`${uid}-email`}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" required placeholder="you@example.com" />
          {errorFor("email")}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor={`${uid}-phone`}>
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input {...field("phone")} type="tel" autoComplete="tel" placeholder="+92 ..." />
          {errorFor("phone")}
        </div>
        <div className={styles.group}>
          <label htmlFor={`${uid}-service`}>
            Service <span aria-hidden="true">*</span>
          </label>
          <div className={styles.selectWrap}>
            <select {...field("service")} required>
              <option value="" disabled>
                Select a service
              </option>
              {contactServiceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Icon name="chevronRight" size={16} className={styles.selectIcon} />
          </div>
          {errorFor("service")}
        </div>
      </div>

      <div className={styles.group}>
        <label htmlFor={`${uid}-message`}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea {...field("message")} rows={6} required placeholder="Tell me about your project, goals and timeline..." />
        {errorFor("message")}
      </div>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input {...field("company")} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary" disabled={status.type === "sending"}>
          {status.type === "sending" ? "Sending..." : "Send Message"}
          <Icon name="send" size={17} className="btn-arrow" />
        </button>
        <p className={styles.required}>* Required fields</p>
      </div>

      <div aria-live="polite" role="status">
        {status.message && (
          <p className={`${styles.status} ${status.type === "error" ? styles.statusError : styles.statusOk}`}>
            <Icon name={status.type === "error" ? "x" : "check"} size={16} />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
