"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBooking } from "@/lib/booking-store";
import { ROOMS, formatBDT, RESORT } from "@/lib/resort-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";

type Step = 0 | 1 | 2 | 3;

export function BookingDialog() {
  const { open, draft, closeBooking } = useBooking();
  const [step, setStep] = useState<Step>(0);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; id?: string; msg: string }>(null);

  // Default dates
  useEffect(() => {
    if (open) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fmt = (d: Date) => d.toISOString().split("T")[0];
      if (!checkIn) setCheckIn(fmt(today));
      if (!checkOut) setCheckOut(fmt(tomorrow));
    }
  }, [open, checkIn, checkOut]);

  // Reset when opened with a draft
  useEffect(() => {
    if (open) {
      setStep(draft?.roomSlug ? 1 : 0);
      setSelectedSlug(draft?.roomSlug ?? "");
      setResult(null);
    }
  }, [open, draft]);

  const selectedRoom = ROOMS.find((r) => r.slug === selectedSlug);

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return Math.max(0, Math.round(diff));
  })();

  const total = (selectedRoom?.price ?? 0) * Math.max(1, nights);

  const canNext =
    (step === 0 && !!selectedSlug) ||
    (step === 1 && !!checkIn && !!checkOut && nights > 0) ||
    (step === 2 && !!guestName && !!email && !!phone);

  const submit = async () => {
    if (!selectedRoom) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomSlug: selectedRoom.slug,
          roomName: selectedRoom.name,
          guestName,
          email,
          phone,
          checkIn,
          checkOut,
          adults,
          children,
          specialReq,
          totalAmount: total,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, id: data.bookingId, msg: data.message });
        setStep(3);
      } else {
        setResult({ ok: false, msg: data.error ?? "Something went wrong" });
        setStep(3);
      }
    } catch {
      setResult({ ok: false, msg: "Network error. Please call us to book." });
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep(0);
      setSelectedSlug("");
      setResult(null);
      setGuestName("");
      setEmail("");
      setPhone("");
      setSpecialReq("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden rounded-sm border-gold/30 bg-ivory max-h-[92vh] overflow-y-auto lux-scroll">
        <DialogTitle className="sr-only">Book Your Stay</DialogTitle>
        <DialogDescription className="sr-only">
          Reserve your room at Sikder Resort & Villas in just a few steps.
        </DialogDescription>

        {/* Header band */}
        <div className="bg-emerald-deep px-7 py-6 text-ivory relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-[10px] tracking-luxe uppercase text-gold-soft">
                {step < 3 ? `Step ${step + 1} of 3` : "Confirmation"}
              </p>
              <h3 className="font-serif text-2xl mt-1">
                {step === 3
                  ? result?.ok
                    ? "Reservation Confirmed"
                    : "Booking Update"
                  : "Reserve Your Escape"}
              </h3>
            </div>
            {selectedRoom && step > 0 && step < 3 && (
              <div className="text-right hidden sm:block">
                <p className="font-sans text-[10px] tracking-wide-2 uppercase text-ivory/60">
                  {selectedRoom.category}
                </p>
                <p className="font-serif text-lg text-gold-soft">
                  {selectedRoom.name}
                </p>
              </div>
            )}
          </div>
          {step < 3 && (
            <div className="mt-5 flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-500",
                    i <= step ? "bg-gold" : "bg-ivory/20"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="p-7">
          <AnimatePresence mode="wait">
            {/* STEP 0 — choose room */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <p className="font-serif text-xl text-emerald-deep mb-4">
                  Choose your sanctuary
                </p>
                <div className="grid sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto lux-scroll pr-1">
                  {ROOMS.map((r) => (
                    <button
                      key={r.slug}
                      onClick={() => setSelectedSlug(r.slug)}
                      className={cn(
                        "group relative text-left overflow-hidden rounded-sm border transition-all",
                        selectedSlug === r.slug
                          ? "border-gold ring-1 ring-gold"
                          : "border-border hover:border-gold/50"
                      )}
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        { }
                        <img
                          src={r.image}
                          alt={r.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3 bg-ivory">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-serif text-base text-emerald-deep leading-tight">
                            {r.name}
                          </p>
                          {selectedSlug === r.slug && (
                            <span className="shrink-0 grid place-items-center h-5 w-5 rounded-full bg-gold text-ivory">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[11px] text-ink-soft mt-0.5">
                          {r.size} · {r.capacity}
                        </p>
                        <p className="font-sans text-sm text-emerald font-medium mt-1">
                          {formatBDT(r.price)}
                          <span className="text-ink-soft text-[11px] font-normal">
                            {" "}/ night
                          </span>
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 1 — dates & guests */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className="flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full rounded-sm border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-sm border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Stepper
                    label="Adults"
                    icon={<Users className="h-3.5 w-3.5 text-gold" />}
                    value={adults}
                    min={1}
                    max={12}
                    onChange={setAdults}
                  />
                  <Stepper
                    label="Children"
                    icon={<Users className="h-3.5 w-3.5 text-gold" />}
                    value={children}
                    min={0}
                    max={10}
                    onChange={setChildren}
                  />
                </div>

                {nights > 0 && selectedRoom && (
                  <div className="mt-4 rounded-sm bg-sand/60 border border-gold/20 p-4">
                    <div className="flex items-center justify-between font-sans text-sm">
                      <span className="text-ink-soft">
                        {formatBDT(selectedRoom.price)} × {nights} night{nights > 1 ? "s" : ""}
                      </span>
                      <span className="text-emerald-deep font-medium">
                        {formatBDT(total)}
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gold/20 flex items-center justify-between">
                      <span className="font-serif text-lg text-emerald-deep">
                        Total
                      </span>
                      <span className="font-serif text-xl text-gold">
                        {formatBDT(total)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 2 — guest details */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Field
                  label="Full Name"
                  icon={<User className="h-3.5 w-3.5 text-gold" />}
                >
                  <input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-transparent outline-none font-sans text-sm text-ink"
                  />
                </Field>
                <Field
                  label="Email"
                  icon={<Mail className="h-3.5 w-3.5 text-gold" />}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent outline-none font-sans text-sm text-ink"
                  />
                </Field>
                <Field
                  label="Phone"
                  icon={<Phone className="h-3.5 w-3.5 text-gold" />}
                >
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full bg-transparent outline-none font-sans text-sm text-ink"
                  />
                </Field>
                <div>
                  <label className="flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold" /> Special Requests (optional)
                  </label>
                  <textarea
                    value={specialReq}
                    onChange={(e) => setSpecialReq(e.target.value)}
                    rows={3}
                    placeholder="Airport pickup, anniversary surprise, early check-in…"
                    className="w-full rounded-sm border border-border bg-white px-4 py-3 font-sans text-sm text-ink focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                {/* Summary */}
                {selectedRoom && (
                  <div className="rounded-sm bg-emerald-deep/5 border border-emerald/15 p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-ink-soft">Room</span>
                      <span className="text-emerald-deep font-medium">
                        {selectedRoom.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-ink-soft">Dates</span>
                      <span className="text-emerald-deep font-medium">
                        {checkIn} → {checkOut} ({nights}n)
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-ink-soft">Guests</span>
                      <span className="text-emerald-deep font-medium">
                        {adults} adults{children ? `, ${children} children` : ""}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 mt-1 pt-2 border-t border-emerald/15">
                      <span className="font-serif text-base text-emerald-deep">
                        Total Payable
                      </span>
                      <span className="font-serif text-lg text-gold">
                        {formatBDT(total)}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 3 — confirmation */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div
                  className={cn(
                    "mx-auto h-16 w-16 rounded-full grid place-items-center mb-5",
                    result?.ok ? "bg-gold/15 text-gold" : "bg-destructive/10 text-destructive"
                  )}
                >
                  {result?.ok ? (
                    <Check className="h-8 w-8" />
                  ) : (
                    <X className="h-8 w-8" />
                  )}
                </div>
                <h4 className="font-serif text-2xl text-emerald-deep">
                  {result?.ok ? "Your escape awaits" : "Please try again"}
                </h4>
                <p className="mt-3 font-sans text-sm text-ink-soft max-w-sm mx-auto">
                  {result?.msg}
                </p>
                {result?.ok && result.id && (
                  <p className="mt-4 font-sans text-xs tracking-wide-2 uppercase text-gold">
                    Reservation ID · {result.id.slice(-8).toUpperCase()}
                  </p>
                )}
                {result?.ok && (
                  <p className="mt-4 font-sans text-xs text-ink-soft">
                    Need help? Call{" "}
                    <a
                      href={`tel:${RESORT.phones[0].replace(/\s/g, "")}`}
                      className="text-emerald font-medium"
                    >
                      {RESORT.phones[0]}
                    </a>
                  </p>
                )}
                <button
                  onClick={handleClose}
                  className="mt-6 inline-flex items-center gap-2 bg-emerald text-ivory px-7 py-3 font-sans text-[12px] tracking-wide-2 uppercase hover:bg-emerald-deep transition-colors"
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer controls */}
          {step < 3 && (
            <div className="mt-7 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="inline-flex items-center gap-1.5 font-sans text-[12px] tracking-wide-2 uppercase text-ink-soft hover:text-emerald-deep transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <span />
              )}
              {step < 2 ? (
                <button
                  disabled={!canNext}
                  onClick={() => canNext && setStep((s) => (s + 1) as Step)}
                  className="inline-flex items-center gap-1.5 bg-emerald text-ivory px-6 py-3 font-sans text-[12px] tracking-wide-2 uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-deep transition-colors"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  disabled={!canNext || submitting}
                  onClick={submit}
                  className="inline-flex items-center gap-2 bg-gold text-emerald-deep px-7 py-3 font-sans text-[12px] tracking-wide-2 uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gold-soft transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                    </>
                  ) : (
                    <>Confirm Booking</>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Stepper({
  label,
  icon,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
        {icon} {label}
      </label>
      <div className="flex items-center justify-between rounded-sm border border-border bg-white px-2 py-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-8 w-8 grid place-items-center text-emerald hover:bg-sand transition-colors disabled:opacity-30"
          disabled={value <= min}
        >
          −
        </button>
        <span className="font-serif text-lg text-emerald-deep w-8 text-center">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-8 w-8 grid place-items-center text-emerald hover:bg-sand transition-colors disabled:opacity-30"
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 font-sans text-[11px] tracking-wide-2 uppercase text-ink-soft mb-2">
        {icon} {label}
      </label>
      <div className="rounded-sm border border-border bg-white px-4 py-3 focus-within:border-gold transition-colors">
        {children}
      </div>
    </div>
  );
}
