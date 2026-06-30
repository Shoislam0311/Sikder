"use client";

import { useState } from "react";
import { RESORT, NAV_LINKS } from "@/lib/resort-data";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Loader2, Send } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-emerald-deep text-ivory">
      {/* Newsletter band */}
      <div className="border-b border-ivory/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="font-sans text-[11px] tracking-luxe uppercase text-gold-soft mb-2">
              The Sikder Letter
            </p>
            <h3 className="font-serif text-3xl text-ivory">
              Exclusive offers, delivered to your door.
            </h3>
            <p className="mt-2 font-sans text-sm text-ivory/65 max-w-md">
              Seasonal packages, private villa deals and Kuakata travel inspiration —
              straight from the Bay of Bengal.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex gap-3 w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-ivory/5 border border-ivory/20 px-5 py-3.5 font-sans text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none rounded-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 bg-gold text-emerald-deep px-6 py-3.5 font-sans text-[12px] tracking-wide-2 uppercase hover:bg-gold-soft transition-colors rounded-sm disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : status === "done" ? (
                "Subscribed"
              ) : (
                <>
                  Subscribe <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <FooterLogo />
          <p className="mt-5 font-sans text-sm text-ivory/65 leading-relaxed">
            A luxuries resort & villas with nature on the Bay of Bengal — designed
            for the modern traveler coming to Kuakata, the Sagorkonna.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { icon: Facebook, href: RESORT.socials.facebook },
              { icon: Instagram, href: RESORT.socials.instagram },
              { icon: Youtube, href: RESORT.socials.youtube },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 grid place-items-center border border-ivory/20 rounded-full text-ivory/70 hover:border-gold hover:text-gold transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <FooterTitle>Explore</FooterTitle>
          <ul className="mt-5 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="font-sans text-sm text-ivory/65 hover:text-gold transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Reservation */}
        <div>
          <FooterTitle>Reservation</FooterTitle>
          <ul className="mt-5 space-y-3">
            {RESORT.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 font-sans text-sm text-ivory/65 hover:text-gold transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" /> {p}
                </a>
              </li>
            ))}
            {RESORT.emails.map((e) => (
              <li key={e}>
                <a
                  href={`mailto:${e}`}
                  className="flex items-center gap-2.5 font-sans text-sm text-ivory/65 hover:text-gold transition-colors break-all"
                >
                  <Mail className="h-3.5 w-3.5 text-gold shrink-0" /> {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate + Address */}
        <div>
          <FooterTitle>Find Us</FooterTitle>
          <div className="mt-5 space-y-4">
            <div className="flex gap-2.5">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <div className="font-sans text-sm text-ivory/65 leading-relaxed">
                <p className="text-ivory/80">Resort Address</p>
                {RESORT.address.line1}
                <br />
                {RESORT.address.line2}
              </div>
            </div>
            <div className="flex gap-2.5">
              <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <div className="font-sans text-sm text-ivory/65 leading-relaxed">
                <p className="text-ivory/80">Corporate Office</p>
                {RESORT.address.corporate}
              </div>
            </div>
            <div className="pt-2 border-t border-ivory/10">
              <p className="font-sans text-[11px] tracking-wide-2 uppercase text-gold-soft">
                Corporate / Group Booking
              </p>
              <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {RESORT.corporatePhones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="font-sans text-sm text-ivory/65 hover:text-gold transition-colors"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-ivory/50 text-center sm:text-left">
            © {new Date().getFullYear()} Sikder Resort & Villas · All Rights Reserved
          </p>
          <p className="font-sans text-xs text-ivory/40">
            Crafted with care · Kuakata, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-serif text-lg text-gold-soft relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-px after:w-10 after:bg-gold">
      {children}
    </h4>
  );
}

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
        <defs>
          <linearGradient id="footGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A24B" />
            <stop offset="50%" stopColor="#E6C878" />
            <stop offset="100%" stopColor="#B0832E" />
          </linearGradient>
        </defs>
        <g transform="translate(22,18)">
          <circle r="8.5" fill="url(#footGold)" />
          <g stroke="url(#footGold)" strokeWidth="1.6" strokeLinecap="round">
            <line x1="0" y1="-12" x2="0" y2="-15.5" />
            <line x1="0" y1="12" x2="0" y2="15.5" />
            <line x1="-12" y1="0" x2="-15.5" y2="0" />
            <line x1="12" y1="0" x2="15.5" y2="0" />
            <line x1="-8.5" y1="-8.5" x2="-11" y2="-11" />
            <line x1="8.5" y1="-8.5" x2="11" y2="-11" />
            <line x1="-8.5" y1="8.5" x2="-11" y2="11" />
            <line x1="8.5" y1="8.5" x2="11" y2="11" />
          </g>
        </g>
        <g
          transform="translate(22,32)"
          stroke="#E6C878"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M-11,0 Q-5.5,-3 0,0 T11,0" />
          <path d="M-9,4 Q-4.5,1.5 0,4 T9,4" opacity="0.6" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-xl font-semibold text-ivory">Sikder</span>
        <span className="font-sans text-[8px] tracking-luxe uppercase text-gold-soft">
          Resort & Villas
        </span>
      </div>
    </div>
  );
}
