"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { HERO_SLIDES, RESORT } from "@/lib/resort-data";
import { useBooking } from "@/lib/booking-store";

export function Hero() {
  const [index, setIndex] = useState(0);
  const { openBooking } = useBooking();

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      6000
    );
    return () => clearInterval(t);
  }, []);

  const scrollToContent = () => {
    document
      .querySelector("#about")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Slideshow */}
      <AnimatePresence mode="sync">
        {HERO_SLIDES.map(
          (slide, i) =>
            i === index && (
              <motion.div
                key={slide.image}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              >
                { }
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover animate-kenburns"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-emerald-deep/20 to-emerald-deep/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-emerald-deep/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-gold fill-gold" />
          ))}
          <span className="ml-2 font-sans text-[11px] tracking-luxe uppercase text-ivory/80">
            Luxury Beachfront Resort
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-sans text-sm sm:text-base tracking-luxe uppercase text-gold-soft mb-3">
              {HERO_SLIDES[index].kicker}
            </p>
            <h1 className="font-serif font-medium text-ivory text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-balance">
              {HERO_SLIDES[index].title}
            </h1>
            <p className="mt-4 font-serif italic text-2xl sm:text-3xl text-gold-soft">
              {HERO_SLIDES[index].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 max-w-xl font-sans text-sm sm:text-base text-ivory/75 leading-relaxed"
        >
          {RESORT.address.line1} {RESORT.address.line2} · Where sunrise &amp; sunset
          meet the sea
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() =>
              openBooking({ roomSlug: "", roomName: "", price: 0, image: "" })
            }
            className="group inline-flex items-center gap-2 bg-gold text-emerald-deep px-9 py-4 font-sans text-[13px] tracking-wide-2 uppercase hover:bg-gold-soft transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(201,162,75,0.5)]"
          >
            Book Your Stay
          </button>
          <button
            onClick={scrollToContent}
            className="inline-flex items-center gap-2 border border-ivory/40 text-ivory px-9 py-4 font-sans text-[13px] tracking-wide-2 uppercase hover:bg-ivory hover:text-emerald-deep transition-all duration-300"
          >
            Discover More
          </button>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group relative h-1 transition-all duration-500"
            style={{ width: i === index ? 40 : 16 }}
          >
            <span className="absolute inset-0 bg-ivory/30 rounded-full" />
            <span
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                i === index ? "bg-gold" : "bg-transparent group-hover:bg-ivory/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-10 right-6 sm:right-10 z-20 hidden sm:flex flex-col items-center gap-2 text-ivory/70 hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-sans text-[10px] tracking-luxe uppercase rotate-90 origin-center translate-y-4">
          Scroll
        </span>
        <ChevronDown className="h-5 w-5 animate-floaty" />
      </button>
    </section>
  );
}
