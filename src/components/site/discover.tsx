"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { ATTRACTIONS } from "@/lib/resort-data";
import { MapPin, ArrowUpRight } from "lucide-react";

export function Discover() {
  return (
    <section
      id="discover"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-cream to-sand/40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            kicker="Discover Kuakata"
            title="Explore the Daughter of the Sea"
            description="Kuakata is one of the rarest places on earth where you can watch both sunrise and sunset over the sea. Discover its temples, forests, villages and wild shores — all within reach of the resort."
          />
        </ScrollReveal>

        {/* Mosaic grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {ATTRACTIONS.map((a, i) => (
            <ScrollReveal
              key={a.name}
              delay={(i % 4) * 0.08}
              className={
                i === 0
                  ? "col-span-2 row-span-2"
                  : i === 3
                  ? "lg:col-span-2"
                  : ""
              }
            >
              <motion.article
                whileHover="hover"
                className="group relative h-full w-full overflow-hidden rounded-sm cursor-pointer"
              >
                { }
                <img
                  src={a.image}
                  alt={a.name}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/20 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 text-gold-soft mb-1.5 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <MapPin className="h-3 w-3" />
                    <span className="font-sans text-[9px] tracking-wide-2 uppercase">
                      Kuakata
                    </span>
                  </div>
                  <h3
                    className={`font-serif text-ivory leading-tight ${
                      i === 0 ? "text-3xl sm:text-4xl" : "text-xl"
                    }`}
                  >
                    {a.name}
                  </h3>
                  {i === 0 && (
                    <p className="mt-2 font-sans text-sm text-ivory/70 line-clamp-3 max-w-md">
                      {a.description}
                    </p>
                  )}
                  <p
                    className={`mt-2 font-sans text-sm text-ivory/70 ${
                      i === 0 ? "block" : "hidden"
                    } group-hover:block line-clamp-2 transition-all duration-500`}
                  >
                    {a.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-gold/90 text-emerald-deep grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
