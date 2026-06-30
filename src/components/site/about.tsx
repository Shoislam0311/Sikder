"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { ABOUT } from "@/lib/resort-data";
import { Waves, Sun, Palmtree } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-cream overflow-hidden"
    >
      {/* Decorative side rule */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-40 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden lg:block" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image collage */}
        <div className="relative">
          <ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-sm aspect-[3/4] shadow-[0_20px_50px_-20px_rgba(31,66,57,0.4)]">
                  { }
                  <img
                    src={ABOUT.images[0]}
                    alt="Sikder Resort exterior"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.2s]"
                  />
                </div>
                <div className="overflow-hidden rounded-sm aspect-square shadow-[0_20px_50px_-20px_rgba(31,66,57,0.4)]">
                  { }
                  <img
                    src={ABOUT.images[2]}
                    alt="Resort amenities"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.2s]"
                  />
                </div>
              </div>
              <div className="pt-10">
                <div className="overflow-hidden rounded-sm aspect-[3/4] shadow-[0_20px_50px_-20px_rgba(31,66,57,0.4)]">
                  { }
                  <img
                    src={ABOUT.images[1]}
                    alt="Resort poolside"
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-[1.2s]"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute -bottom-6 -left-2 sm:left-6 bg-emerald-deep text-ivory px-6 py-5 rounded-sm shadow-xl"
          >
            <p className="font-serif text-3xl text-gold-soft leading-none">12+</p>
            <p className="font-sans text-[10px] tracking-wide-2 uppercase text-ivory/70 mt-1">
              Room &amp; Villa
              <br />
              Categories
            </p>
          </motion.div>
        </div>

        {/* Copy */}
        <div>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gold/70" />
              <span className="font-sans text-xs tracking-luxe uppercase text-gold">
                {ABOUT.kicker}
              </span>
            </div>
            <h2 className="font-serif font-medium text-4xl sm:text-5xl text-emerald-deep leading-[1.1] text-balance">
              {ABOUT.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-6 space-y-4">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base text-ink-soft leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-7">
              {[
                { icon: Waves, ...ABOUT.highlights[0] },
                { icon: Sun, ...ABOUT.highlights[1] },
                { icon: Palmtree, ...ABOUT.highlights[2] },
              ].map((h, i) => (
                <div key={i} className="text-center sm:text-left">
                  <h.icon className="h-6 w-6 text-gold mx-auto sm:mx-0 mb-2" />
                  <p className="font-sans text-[10px] tracking-wide-2 uppercase text-ink-soft">
                    {h.label}
                  </p>
                  <p className="font-serif text-sm text-emerald-deep mt-0.5">
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
