"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { RESORT } from "@/lib/resort-data";

export function ReservationCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        { }
        <img
          src="https://sikderresort.com/wp-content/uploads/2025/02/Wall-photo-7-scaled.jpg"
          alt="Resort view"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-deep/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center"
      >
        <p className="font-sans text-xs tracking-luxe uppercase text-gold-soft mb-4">
          Reservations &amp; Queries
        </p>
        <h2 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight text-balance">
          For Reservation or Query?
        </h2>
        <p className="mt-5 font-sans text-base text-ivory/70 max-w-xl mx-auto">
          Our dedicated reservations team is available around the clock to craft
          your perfect Kuakata escape.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${RESORT.phones[0].replace(/\s/g, "")}`}
            className="group inline-flex items-center gap-3 bg-gold text-emerald-deep px-8 py-4 font-sans text-[13px] tracking-wide-2 uppercase hover:bg-gold-soft transition-all duration-300"
          >
            <Phone className="h-4 w-4" />
            {RESORT.phones[0]}
          </a>
          <a
            href={`tel:${RESORT.phones[1].replace(/\s/g, "")}`}
            className="inline-flex items-center gap-3 border border-ivory/40 text-ivory px-8 py-4 font-sans text-[13px] tracking-wide-2 uppercase hover:bg-ivory hover:text-emerald-deep transition-all duration-300"
          >
            <Phone className="h-4 w-4" />
            {RESORT.phones[1]}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
