"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { blessings, couple, events } from "@/lib/data";
import { Divider, GaneshaSeal, MarigoldCorner, ScriptName } from "./Ornaments";

const wedding = events[0];

/** Each line of the formal invitation fades up in sequence, like it is being read aloud. */
function Line({
  i,
  className = "",
  children,
  show,
}: {
  i: number;
  className?: string;
  children: React.ReactNode;
  show: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Blessings() {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section id="blessings" className="relative bg-powder-100 px-4 py-20 sm:py-28">
      <div
        ref={ref}
        className="damask card-paper relative mx-auto max-w-3xl overflow-hidden rounded-xl bg-powder-200/70 px-5 py-14 text-center sm:px-12 sm:py-20"
      >
        <MarigoldCorner side="left" size={92} className="sm:w-[120px]" />
        <MarigoldCorner side="right" size={92} className="sm:w-[120px]" />

        <div className="relative z-30 mx-auto max-w-xl">
          <Line i={0} show={show}>
            <p className="font-display text-sm font-semibold text-ink italic sm:text-base">
              {blessings.invocation}
            </p>
          </Line>

          <Line i={1} show={show} className="mt-6 flex items-center justify-center gap-5 sm:gap-8">
            <Image src="/art/swastik.png" alt="" width={112} height={113} className="h-auto w-6 opacity-80 sm:w-7" />
            <GaneshaSeal size={58} className="sm:w-[70px]" />
            <Image src="/art/swastik.png" alt="" width={112} height={113} className="h-auto w-6 opacity-80 sm:w-7" />
          </Line>

          <Line i={2} show={show} className="mt-9">
            <p className="text-lg text-ink-soft italic sm:text-xl">{blessings.lead}</p>
          </Line>

          <Line i={3} show={show} className="mt-3 space-y-1">
            {blessings.elders.map((e) => (
              <p key={e} className="font-display text-base font-semibold text-ink sm:text-lg">
                {e}
              </p>
            ))}
          </Line>

          <Line i={4} show={show} className="mt-7">
            <p className="font-display text-xl font-semibold text-foil sm:text-2xl">
              {blessings.hosts}
            </p>
            <p className="mx-auto mt-2 max-w-md text-base text-ink-soft italic sm:text-lg">
              {blessings.request}
            </p>
          </Line>

          <Line i={5} show={show} className="mt-7">
            <p className="font-script text-5xl text-foil sm:text-6xl">
              <ScriptName name={couple.groom.short} />
            </p>
            <p className="font-script -mt-1 text-2xl text-gold-400 sm:text-3xl">
              (<ScriptName name={couple.groom.formal} />)
            </p>
            <p className="mt-2 text-sm text-ink-mute sm:text-base">{couple.groom.lineage[1]}</p>
          </Line>

          <Line i={6} show={show} className="mt-6">
            <p className="text-lg text-ink-soft italic sm:text-xl">With</p>
          </Line>

          <Line i={7} show={show} className="mt-4">
            <p className="font-script text-5xl text-foil sm:text-6xl">
              <ScriptName name={couple.bride.short} />
            </p>
            <p className="font-script -mt-1 text-2xl text-gold-400 sm:text-3xl">
              (<ScriptName name={couple.bride.formal} />)
            </p>
            <div className="mt-2 space-y-0.5 text-sm text-ink-mute sm:text-base">
              {couple.bride.lineage.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </Line>

          <Divider className="mt-9" width={90} />

          <Line i={8} show={show} className="mt-7">
            <p className="text-lg text-ink-soft italic sm:text-xl">on</p>
            <p className="font-display mt-1 text-2xl font-semibold text-ink italic sm:text-3xl">
              {wedding.day}, {wedding.date}
            </p>
          </Line>

          <Line i={9} show={show} className="mt-6">
            <p className="text-lg text-ink-soft italic sm:text-xl">at</p>
            <p className="font-display mt-1 text-xl font-semibold text-ink sm:text-2xl">
              {wedding.venue}
            </p>
            {wedding.address.map((a) => (
              <p key={a} className="text-base text-ink-soft sm:text-lg">
                {a}
              </p>
            ))}
            <p className="text-base text-ink-soft sm:text-lg">{wedding.city}</p>
          </Line>
        </div>
      </div>
    </section>
  );
}
