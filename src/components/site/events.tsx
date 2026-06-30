"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { MEETING_VENUES } from "@/lib/resort-data";
import { Maximize, Users } from "lucide-react";

export function Events() {
  return (
    <section id="events" className="relative py-24 sm:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            kicker="Meetings & Conferences"
            title="Venues for Every Occasion"
            description="From 12,000 sq ft open-air amphitheatres to intimate boardrooms — celebrate, convene and connect with state-of-the-art amenities."
          />
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-2 gap-7">
          {MEETING_VENUES.map((v, i) => (
            <ScrollReveal key={v.name} delay={(i % 2) * 0.12}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group grid sm:grid-cols-2 bg-ivory rounded-sm overflow-hidden border border-border hover:border-gold/40 transition-colors hover:shadow-[0_25px_60px_-25px_rgba(31,66,57,0.3)]"
              >
                <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                  { }
                  <img
                    src={v.image}
                    alt={v.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-deep text-gold-soft px-3 py-1 font-sans text-[10px] tracking-wide-2 uppercase">
                    {v.size}
                  </div>
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="font-serif text-2xl text-emerald-deep leading-tight">
                    {v.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 font-sans text-xs text-ink-soft">
                    <Users className="h-3.5 w-3.5 text-gold" /> {v.capacity}
                  </div>
                  <p className="mt-3 font-sans text-sm text-ink-soft leading-relaxed flex-1">
                    {v.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-gold">
                    <Maximize className="h-3.5 w-3.5" /> {v.size}
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
