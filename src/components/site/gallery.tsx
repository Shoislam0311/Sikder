"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { GALLERY } from "@/lib/resort-data";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const next = () =>
    setActive((a) => (a === null ? a : (a + 1) % GALLERY.length));
  const prev = () =>
    setActive((a) =>
      a === null ? a : (a - 1 + GALLERY.length) % GALLERY.length
    );

  // Give some images a larger tile for visual rhythm
  const featured = new Set([0, 5, 12, 21, 30, 41]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            kicker="Gallery"
            title="A Glimpse of Sikder"
            description="Step inside the resort — every corner framed by light, water and the calm of the Bay of Bengal."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative mb-3 block w-full overflow-hidden rounded-sm break-inside-avoid",
                  featured.has(i) ? "aspect-[3/4]" : "aspect-square"
                )}
              >
                { }
                <img
                  src={src}
                  alt={`Sikder Resort gallery ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/30 transition-colors duration-500" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-500" />
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-emerald-deep/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-5 right-5 h-11 w-11 grid place-items-center text-ivory/80 hover:text-gold transition-colors"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              className="absolute left-4 sm:left-8 h-12 w-12 grid place-items-center text-ivory/80 hover:text-gold transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              { }
              <img
                src={GALLERY[active]}
                alt={`Sikder Resort gallery ${active + 1}`}
                className="w-full h-full object-contain rounded-sm"
              />
              <p className="mt-3 text-center font-sans text-xs tracking-wide-2 uppercase text-ivory/60">
                {active + 1} / {GALLERY.length}
              </p>
            </motion.div>
            <button
              className="absolute right-4 sm:right-8 h-12 w-12 grid place-items-center text-ivory/80 hover:text-gold transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
