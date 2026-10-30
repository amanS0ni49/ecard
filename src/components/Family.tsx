"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { familyFooterGroups, familyGroups, familyTitle } from "@/lib/data";
import { Divider } from "./Ornaments";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function Lotus({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/art/lotus.png"
      alt=""
      width={116}
      height={118}
      className={`h-auto w-11 shrink-0 select-none sm:w-14 ${className}`}
      aria-hidden
    />
  );
}

export default function Family() {
  return (
    <section id="family" className="damask relative bg-powder-200 px-5 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.75),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          className="flex items-center justify-center gap-4 sm:gap-7"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7 }}
        >
          <Lotus />
          <div className="text-center">
            <h2 className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">
              {familyTitle.name}
            </h2>
            <p className="font-label mt-2 text-[0.55rem] text-gold sm:text-xs">
              {familyTitle.subtitle}
            </p>
          </div>
          <Lotus />
        </motion.div>

        <Divider className="mt-8" width={120} />

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {familyGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className={group.align === "right" ? "sm:text-right" : ""}
            >
              <motion.h3
                variants={item}
                className="font-display text-lg font-semibold text-foil sm:text-xl"
              >
                {group.title}
              </motion.h3>
              <motion.span
                variants={item}
                className={`rule-gold mt-2 block h-px w-20 ${
                  group.align === "right" ? "sm:ml-auto" : ""
                }`}
              />
              <ul className="mt-4 space-y-1.5">
                {group.members.map((m) => (
                  <motion.li
                    key={m}
                    variants={item}
                    className="text-base text-ink-soft transition-colors hover:text-ink sm:text-lg"
                  >
                    {m}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Divider className="mt-16" width={120} />

        <div className="mt-12 space-y-11 text-center">
          {familyFooterGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                variants={item}
                className="font-display text-lg font-semibold text-foil sm:text-xl"
              >
                {group.title}
              </motion.h3>
              <ul className="mt-3 space-y-1.5">
                {group.members.map((m) => (
                  <motion.li
                    key={m}
                    variants={item}
                    className="font-display text-base font-medium text-ink sm:text-lg"
                  >
                    {m}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
