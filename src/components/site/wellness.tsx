"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { WELLNESS } from "@/lib/resort-data";
import { Clock, ArrowUpRight } from "lucide-react";

export function Wellness() {
  return (
    <section
      id="wellness"
      className="relative py-24 sm:py-32 bg-emerald-deep overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-soft/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            kicker="Wellness & Leisure"
            title="Relax & Enjoy Your Vacation"
            description="Swim, train and play — every wellness amenity at Sikder Resort is tuned to refresh your body, mind and soul."
            light
          />
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {WELLNESS.map((w, i) => (
            <ScrollReveal key={w.name} delay={i * 0.12}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group h-full bg-ivory/5 backdrop-blur-sm border border-ivory/10 rounded-sm overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  { }
                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 to-transparent" />
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gold/90 text-emerald-deep grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gold-soft mb-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-sans text-[10px] tracking-wide-2 uppercase">
                      {w.hours}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-ivory">{w.name}</h3>
                  <p className="mt-3 font-sans text-sm text-ivory/65 leading-relaxed">
                    {w.description}
                  </p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
