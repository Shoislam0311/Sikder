"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { ROOMS, formatBDT, type Room } from "@/lib/resort-data";
import { useBooking } from "@/lib/booking-store";
import { Maximize, Users, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Rooms", "Suites", "Villas"] as const;

export function Rooms() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [selected, setSelected] = useState<Room | null>(null);
  const { openBooking } = useBooking();

  const filtered = cat === "All" ? ROOMS : ROOMS.filter((r) => r.category === cat);

  return (
    <section
      id="rooms"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-sand/40 to-cream"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            kicker="Featured Rooms"
            title="Choose a Better Room"
            description="From intimate deluxe rooms to duplex villas with private pools — every category is designed for the modern traveler chasing the Sagorkonna."
          />
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "px-5 py-2 font-sans text-[12px] tracking-wide-2 uppercase transition-all duration-300 border rounded-sm",
                  cat === c
                    ? "bg-emerald text-ivory border-emerald"
                    : "bg-transparent text-ink-soft border-border hover:border-emerald hover:text-emerald-deep"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((room, i) => (
              <motion.article
                key={room.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-ivory rounded-sm overflow-hidden border border-border hover:border-gold/40 transition-all duration-500 hover:shadow-[0_25px_60px_-25px_rgba(31,66,57,0.35)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  { }
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 left-4 bg-ivory/95 backdrop-blur-sm text-emerald-deep px-3 py-1 font-sans text-[10px] tracking-wide-2 uppercase">
                    {room.category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="font-sans text-[10px] tracking-wide-2 uppercase text-gold-soft mb-0.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        From
                      </p>
                      <p className="font-serif text-2xl text-ivory translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        {formatBDT(room.price)}
                        <span className="font-sans text-[11px] text-ivory/70">
                          {" "}/ night
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-emerald-deep leading-tight">
                    {room.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 font-sans text-xs text-ink-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <Maximize className="h-3.5 w-3.5 text-gold" /> {room.size}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-gold" /> {room.capacity}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-sm text-ink-soft leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelected(room)}
                      className="font-sans text-[12px] tracking-wide-2 uppercase text-emerald-deep hover:text-gold transition-colors inline-flex items-center gap-1.5"
                    >
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        openBooking({
                          roomSlug: room.slug,
                          roomName: room.name,
                          price: room.price,
                          image: room.image,
                        })
                      }
                      className="bg-emerald text-ivory px-5 py-2.5 font-sans text-[11px] tracking-wide-2 uppercase hover:bg-emerald-deep transition-colors rounded-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Room detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] bg-emerald-deep/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto lux-scroll"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                { }
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="bg-gold text-emerald-deep px-3 py-1 font-sans text-[10px] tracking-wide-2 uppercase">
                    {selected.category}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl text-ivory">
                    {selected.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 h-9 w-9 grid place-items-center bg-ivory/90 text-emerald-deep rounded-full hover:bg-ivory transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-5 font-sans text-sm text-ink-soft border-b border-border pb-5">
                  <span className="inline-flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-gold" /> {selected.size}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-gold" /> {selected.capacity}
                  </span>
                  <span className="ml-auto font-serif text-2xl text-gold">
                    {formatBDT(selected.price)}
                    <span className="font-sans text-xs text-ink-soft">
                      {" "}/ night
                    </span>
                  </span>
                </div>
                <p className="mt-5 font-sans text-base text-ink-soft leading-relaxed">
                  {selected.description}
                </p>

                <h4 className="mt-7 font-serif text-lg text-emerald-deep">
                  Complimentary Amenities
                </h4>
                <div className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {selected.amenities.map((a) => (
                    <div key={a} className="flex items-start gap-2 font-sans text-sm text-ink-soft">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      {a}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      openBooking({
                        roomSlug: selected.slug,
                        roomName: selected.name,
                        price: selected.price,
                        image: selected.image,
                      });
                      setSelected(null);
                    }}
                    className="flex-1 bg-gold text-emerald-deep px-6 py-3.5 font-sans text-[12px] tracking-wide-2 uppercase hover:bg-gold-soft transition-colors rounded-sm"
                  >
                    Reserve This Room
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-3.5 font-sans text-[12px] tracking-wide-2 uppercase text-ink-soft border border-border hover:border-emerald hover:text-emerald-deep transition-colors rounded-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
