"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ChevronUp, X } from "lucide-react";
import { RESORT } from "@/lib/resort-data";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="h-11 w-11 grid place-items-center bg-emerald-deep text-ivory rounded-full shadow-lg hover:bg-emerald transition-colors"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded contact options */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-2.5"
          >
            <a
              href={`tel:${RESORT.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-2 bg-ivory shadow-lg rounded-full pl-2 pr-4 py-2 border border-border hover:border-gold transition-colors"
            >
              <span className="h-8 w-8 grid place-items-center bg-emerald text-ivory rounded-full">
                <Phone className="h-4 w-4" />
              </span>
              <span className="font-sans text-xs text-emerald-deep">
                {RESORT.phones[0]}
              </span>
            </a>
            <a
              href={`https://wa.me/${RESORT.phones[0].replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-ivory shadow-lg rounded-full pl-2 pr-4 py-2 border border-border hover:border-gold transition-colors"
            >
              <span className="h-8 w-8 grid place-items-center bg-[#25D366] text-white rounded-full">
                <MessageCircle className="h-4 w-4" />
              </span>
              <span className="font-sans text-xs text-emerald-deep">
                WhatsApp
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="h-14 w-14 grid place-items-center bg-gold text-emerald-deep rounded-full shadow-xl hover:bg-gold-soft transition-all duration-300 hover:scale-105"
        aria-label="Contact options"
      >
        {expanded ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>
    </div>
  );
}
