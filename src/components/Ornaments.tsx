"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** A drawn-on gold rule with a diamond at its centre. Used between every block. */
export function Divider({ className = "", width = 260 }: { className?: string; width?: number }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
      aria-hidden
    >
      <motion.span
        className="rule-gold h-px"
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="size-2 rotate-45 border border-gold/70 bg-gold-200/70"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      />
      <motion.span
        className="rule-gold h-px"
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function SectionTitle({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 text-center sm:mb-14">
      {kicker && (
        <motion.p
          className="font-label mb-3 text-[0.6rem] text-gold sm:text-xs"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          {kicker}
        </motion.p>
      )}
      <motion.h2
        className="font-display text-3xl text-ink sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.08 }}
      >
        {title}
      </motion.h2>
      <Divider className="mt-5" width={110} />
      {children && (
        <motion.p
          className="mx-auto mt-5 max-w-xl text-base text-ink-soft/85 italic sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {children}
        </motion.p>
      )}
    </div>
  );
}

/**
 * The marigold-and-mauli garlands that hang from the top corners of the
 * printed card. `side` flips the artwork so the pair mirrors correctly.
 */
export function MarigoldCorner({
  side,
  className = "",
  size = 190,
  delay = 0,
}: {
  side: "left" | "right";
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute top-0 z-20 origin-top ${
        side === "left" ? "left-0" : "right-0 scale-x-[-1]"
      } ${className}`}
      style={{ width: size }}
      initial={{ opacity: 0, y: -60, rotate: side === "left" ? -8 : 8 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <div className="animate-sway origin-top">
        <Image
          src="/art/marigold.png"
          alt=""
          width={252}
          height={474}
          priority
          className="h-auto w-full select-none"
        />
      </div>
    </motion.div>
  );
}

/**
 * A name in the script face with a drop-cap initial. Great Vibes draws its
 * swash capitals close to the lowercase in shape as well as height, so the A
 * in Avi and the G in Guddu still read as small letters even enlarged — the
 * initial is set in the display serif instead, where capitals are unambiguous.
 */
export function ScriptName({ name, className = "" }: { name: string; className?: string }) {
  const first = name.slice(0, 1);
  const rest = name.slice(1);
  return (
    <span className={className}>
      <span className="font-display text-[1.25em] leading-[0.8] font-medium italic">
        {first}
      </span>
      {rest}
    </span>
  );
}

/** Small gold-foil Ganesha used as a section seal. */
export function GaneshaSeal({ size = 68, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/art/ganesha.png"
      alt="Shri Ganesh"
      width={299}
      height={417}
      className={`h-auto select-none ${className}`}
      style={{ width: size }}
      priority
    />
  );
}
