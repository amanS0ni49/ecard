"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Countdown from "./Countdown";
import Petals from "./Petals";
import { GaneshaSeal, MarigoldCorner } from "./Ornaments";

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Everything drifts at a slightly different rate as the guest scrolls away.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const contentY = useTransform(smooth, [0, 1], [0, 140]);
  const contentFade = useTransform(smooth, [0, 0.65], [1, 0]);
  const garlandY = useTransform(smooth, [0, 1], [0, 90]);
  const sceneryY = useTransform(smooth, [0, 1], [0, -60]);

  const animate = started ? "show" : "hidden";

  return (
    <section
      ref={ref}
      id="home"
      className="damask relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-powder-200 px-5 pt-24 pb-40 text-center"
    >
      {/* light bloom behind the names */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(255,255,255,0.8),transparent_62%)]" />

      <Petals />

      <motion.div style={{ y: garlandY }} className="absolute inset-x-0 top-0 z-20">
        <MarigoldCorner side="left" size={170} delay={0.1} className="sm:w-[210px]" />
        <MarigoldCorner side="right" size={170} delay={0.22} className="sm:w-[210px]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="relative z-30 flex w-full max-w-3xl flex-col items-center"
      >
        <motion.div
          variants={rise}
          custom={0}
          initial="hidden"
          animate={animate}
          className="animate-float"
        >
          <GaneshaSeal size={62} className="drop-shadow-[0_3px_6px_rgba(141,106,16,0.25)] sm:w-[76px]" />
        </motion.div>

        <motion.p
          variants={rise}
          custom={1}
          initial="hidden"
          animate={animate}
          className="font-label mt-5 text-[0.58rem] text-gold sm:text-[0.72rem]"
        >
          Shri Ganeshay Namah
        </motion.p>

        <motion.h1
          variants={rise}
          custom={2}
          initial="hidden"
          animate={animate}
          className="font-script mt-3 text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl"
        >
          Wedding
          <span className="mt-1 block">Invitation</span>
        </motion.h1>

        {/* the date block, set the way it is on the printed card */}
        <motion.div
          variants={rise}
          custom={3}
          initial="hidden"
          animate={animate}
          className="mt-7 flex flex-col items-center"
        >
          <span className="font-label border-y border-dotted border-gold/70 px-2 py-1 text-[0.6rem] text-ink sm:text-xs">
            Friday
          </span>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-display text-5xl leading-none font-semibold text-ink sm:text-6xl">
              20
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-label text-sm text-ink sm:text-base">Nov</span>
              <span className="my-1 h-px w-full bg-gold/60" />
              <span className="font-label text-sm text-ink sm:text-base">2026</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          custom={4}
          initial="hidden"
          animate={animate}
          className="mt-8 space-y-1"
        >
          <p className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">
            Avi <span className="align-middle text-2xl text-gold sm:text-3xl">(Bhavesh)</span>
          </p>
          <p className="font-script text-2xl text-gold sm:text-3xl">&amp;</p>
          <p className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">
            Guddu <span className="align-middle text-2xl text-gold sm:text-3xl">(Janhavi)</span>
          </p>
        </motion.div>

        <motion.div
          variants={rise}
          custom={5}
          initial="hidden"
          animate={animate}
          className="mt-10 w-full"
        >
          <Countdown />
        </motion.div>

        <motion.a
          href="#blessings"
          variants={rise}
          custom={6}
          initial="hidden"
          animate={animate}
          className="group mt-12 flex flex-col items-center gap-2 text-ink-mute transition-colors hover:text-gold"
          aria-label="Scroll to the invitation"
        >
          <span className="font-label text-[0.55rem]">Scroll</span>
          <span className="flex size-9 items-center justify-center rounded-full border border-gold/40 bg-white/40 backdrop-blur-sm transition-transform group-hover:translate-y-1">
            <ChevronDown className="size-4 animate-bounce" strokeWidth={1.5} />
          </span>
        </motion.a>
      </motion.div>

      {/* the Jaipur garden band that closes the printed card */}
      <motion.div
        style={{ y: sceneryY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        aria-hidden
      >
        <Image
          src="/art/scenery.png"
          alt=""
          width={1160}
          height={535}
          priority
          className="h-auto w-full min-w-[760px] translate-x-[max(0px,calc((100%-760px)*0))] select-none"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-21 h-16 bg-gradient-to-b from-transparent to-powder-100" />
    </section>
  );
}
