"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, RESORT } from "@/lib/resort-data";
import { useBooking } from "@/lib/booking-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(31,66,57,0.25)] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-3 group"
            aria-label="Sikder Resort & Villas home"
          >
            <LogoMark scrolled={scrolled} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={cn(
                  "relative font-sans text-[13px] tracking-wide-2 uppercase transition-colors",
                  "after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-gold after:transition-all after:duration-300 after:w-0 hover:after:w-full",
                  scrolled
                    ? "text-ink hover:text-emerald"
                    : "text-ivory/90 hover:text-ivory"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                openBooking({
                  roomSlug: "",
                  roomName: "",
                  price: 0,
                  image: "",
                })
              }
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-none px-5 py-2.5 font-sans text-[12px] tracking-wide-2 uppercase transition-all duration-300 border",
                scrolled
                  ? "bg-emerald text-ivory border-emerald hover:bg-emerald-deep"
                  : "bg-ivory/10 text-ivory border-ivory/40 backdrop-blur-sm hover:bg-ivory hover:text-emerald-deep"
              )}
            >
              Book a Room
            </button>
            <a
              href={`tel:${RESORT.phones[0].replace(/\s/g, "")}`}
              className={cn(
                "hidden md:inline-flex items-center gap-2 font-sans text-[13px] transition-colors",
                scrolled ? "text-emerald" : "text-ivory"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="tracking-wide-2">{RESORT.phones[0]}</span>
            </a>
            <button
              className={cn(
                "lg:hidden p-2 rounded-sm transition-colors",
                scrolled ? "text-emerald-deep" : "text-ivory"
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-emerald-deep/98 backdrop-blur-sm flex flex-col items-center justify-center gap-2"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => handleNav(link.href)}
                className="font-serif text-3xl text-ivory/90 hover:text-gold transition-colors py-2"
              >
                {link.label}
              </motion.button>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openBooking({ roomSlug: "", roomName: "", price: 0, image: "" });
              }}
              className="mt-6 inline-flex items-center gap-2 bg-gold text-emerald-deep px-7 py-3 font-sans text-sm tracking-wide-2 uppercase"
            >
              Book a Room
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LogoMark({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="navGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A24B" />
            <stop offset="50%" stopColor="#E6C878" />
            <stop offset="100%" stopColor="#B0832E" />
          </linearGradient>
        </defs>
        <g transform="translate(22,18)">
          <circle r="8.5" fill="url(#navGold)" />
          <g stroke="url(#navGold)" strokeWidth="1.6" strokeLinecap="round">
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
          stroke={scrolled ? "#2F5D52" : "#E6C878"}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M-11,0 Q-5.5,-3 0,0 T11,0" />
          <path d="M-9,4 Q-4.5,1.5 0,4 T9,4" opacity="0.6" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl font-semibold transition-colors",
            scrolled ? "text-emerald-deep" : "text-ivory"
          )}
        >
          Sikder
        </span>
        <span
          className={cn(
            "font-sans text-[8px] tracking-luxe uppercase transition-colors",
            scrolled ? "text-gold" : "text-gold-soft"
          )}
        >
          Resort & Villas
        </span>
      </div>
    </div>
  );
}
