"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WEDDING_DATE } from "@/lib/data";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): Parts | null {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="card-paper relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-md sm:h-20 sm:w-18 md:h-24 md:w-22">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="font-display text-2xl text-ink tabular-nums sm:text-3xl md:text-4xl"
            initial={{ y: "-85%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "85%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gold/15" />
      </div>
      <span className="font-label mt-2 text-[0.5rem] text-gold sm:text-[0.6rem]">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  // Starts null so server and first client paint agree, then ticks on mount.
  const [parts, setParts] = useState<Parts | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => {
      setParts(diff(WEDDING_DATE));
      setReady(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!ready) return <div className="h-24 sm:h-28" aria-hidden />;

  if (!parts) {
    return (
      <p className="font-script text-3xl text-gold sm:text-4xl">
        The day is here — see you there!
      </p>
    );
  }

  return (
    <motion.div
      className="flex items-start justify-center gap-2.5 sm:gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      aria-label={`${parts.days} days until the wedding`}
    >
      <Unit value={parts.days} label="Days" />
      <Unit value={parts.hours} label="Hours" />
      <Unit value={parts.minutes} label="Mins" />
      <Unit value={parts.seconds} label="Secs" />
    </motion.div>
  );
}
