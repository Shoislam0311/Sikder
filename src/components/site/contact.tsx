"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { RESORT } from "@/lib/resort-data";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  Check,
  Building2,
} from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setError(data.error ?? "Something went wrong");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Info */}
        <div>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gold/70" />
              <span className="font-sans text-xs tracking-luxe uppercase text-gold">
                Get in Touch
              </span>
            </div>
            <h2 className="font-serif font-medium text-4xl sm:text-5xl text-emerald-deep leading-[1.1] text-balance">
              Begin Your Kuakata Story
            </h2>
            <p className="mt-5 font-sans text-base text-ink-soft leading-relaxed max-w-md">
              Reach out for reservations, custom packages, corporate bookings or
              simply to ask us anything about your stay. We reply promptly.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-9 space-y-6">
              <ContactRow
                icon={<Building2 className="h-5 w-5" />}
                title="Resort Address"
                lines={[RESORT.address.line1, RESORT.address.line2]}
              />
              <ContactRow
                icon={<MapPin className="h-5 w-5" />}
                title="Corporate Office"
                lines={[RESORT.address.corporate]}
              />
              <ContactRow
                icon={<Phone className="h-5 w-5" />}
                title="Call for Reservation"
                lines={RESORT.phones}
                hrefs={RESORT.phones.map((p) => `tel:${p.replace(/\s/g, "")}`)}
              />
              <ContactRow
                icon={<Mail className="h-5 w-5" />}
                title="Email Address"
                lines={RESORT.emails}
                hrefs={RESORT.emails.map((e) => `mailto:${e}`)}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Form */}
        <ScrollReveal delay={0.2}>
          <form
            onSubmit={submit}
            className="bg-ivory border border-border rounded-sm p-7 sm:p-9 shadow-[0_25px_60px_-30px_rgba(31,66,57,0.3)]"
          >
            <h3 className="font-serif text-2xl text-emerald-deep">
              Send us a message
            </h3>
            <p className="mt-1 font-sans text-sm text-ink-soft">
              We will get back to you within 24 hours.
            </p>

            <div className="mt-6 space-y-4">
              <Input
                label="Your Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Input
                label="Your Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
              <Input
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                required
              />
              <div>
                <label className="block font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-sm border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:border-gold focus:outline-none resize-none"
                  placeholder="Tell us about your trip…"
                />
              </div>
            </div>

            {status === "done" ? (
              <div className="mt-5 flex items-center gap-2 bg-emerald/10 text-emerald-deep px-4 py-3 rounded-sm font-sans text-sm">
                <Check className="h-4 w-4" /> Thank you — your message has been
                sent.
              </div>
            ) : status === "error" ? (
              <div className="mt-5 text-sm text-destructive px-4 py-3 bg-destructive/10 rounded-sm">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-emerald text-ivory px-6 py-4 font-sans text-[12px] tracking-wide-2 uppercase hover:bg-emerald-deep transition-colors rounded-sm disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  title,
  lines,
  hrefs,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  hrefs?: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="h-11 w-11 shrink-0 grid place-items-center bg-emerald-deep text-gold-soft rounded-sm">
        {icon}
      </div>
      <div>
        <p className="font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft">
          {title}
        </p>
        <div className="mt-1">
          {lines.map((l, i) =>
            hrefs?.[i] ? (
              <a
                key={i}
                href={hrefs[i]}
                className="block font-serif text-base text-emerald-deep hover:text-gold transition-colors"
              >
                {l}
              </a>
            ) : (
              <p
                key={i}
                className="font-serif text-base text-emerald-deep"
              >
                {l}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:border-gold focus:outline-none"
      />
    </div>
  );
}
