"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { RESTAURANT } from "@/lib/resort-data";
import { Utensils, Wine, Check } from "lucide-react";

export function Dining() {
  return (
    <section id="dining" className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Images — left collage */}
        <div className="relative order-2 lg:order-1">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-sm aspect-[3/4] shadow-[0_20px_50px_-20px_rgba(31,66,57,0.4)]">
                { }
                <img
                  src={RESTAURANT.images[0]}
                  alt="Restaurant interior"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.2s]"
                />
              </div>
              <div className="pt-10 space-y-4">
                <div className="overflow-hidden rounded-sm aspect-square shadow-[0_20px_50px_-20px_rgba(31,66,57,0.4)]">
                  { }
                  <img
                    src={RESTAURANT.images[1]}
                    alt="Juice bar"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.2s]"
                  />
                </div>
                <div className="bg-emerald-deep text-ivory p-5 rounded-sm">
                  <Wine className="h-7 w-7 text-gold-soft mb-2" />
                  <p className="font-serif text-lg leading-tight">
                    Poolside Juice Bar
                  </p>
                  <p className="font-sans text-[11px] tracking-wide-2 uppercase text-ivory/60 mt-1">
                    Fresh · Cold-pressed
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Copy — right */}
        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-5">
              <Utensils className="h-5 w-5 text-gold" />
              <span className="font-sans text-xs tracking-luxe uppercase text-gold">
                {RESTAURANT.kicker}
              </span>
            </div>
            <h2 className="font-serif font-medium text-4xl sm:text-5xl text-emerald-deep leading-[1.1]">
              {RESTAURANT.title}
            </h2>
            <p className="mt-6 font-sans text-base text-ink-soft leading-relaxed">
              {RESTAURANT.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <p className="font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-3">
                Signature Cuisines
              </p>
              <div className="flex flex-wrap gap-2">
                {RESTAURANT.cuisines.map((c) => (
                  <span
                    key={c}
                    className="px-4 py-1.5 border border-gold/40 text-emerald-deep font-sans text-sm rounded-sm bg-gold/5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {RESTAURANT.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 font-sans text-sm text-ink-soft"
                >
                  <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
