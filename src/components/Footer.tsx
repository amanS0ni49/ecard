"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { host } from "@/lib/data";
import { Divider, GaneshaSeal, ScriptName } from "./Ornaments";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cream-200 pt-[clamp(170px,24vh,230px)] pb-28">
      {/* the Jaipur garden band, mirroring the foot of the printed card */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(130px,19vh,190px)] overflow-hidden"
        aria-hidden
      >
        <Image
          src="/art/scenery.png"
          alt=""
          width={1160}
          height={535}
          className="absolute inset-0 size-full min-w-[720px] object-cover object-bottom select-none"
        />
        <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream-200" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-xl px-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        <GaneshaSeal size={48} className="mx-auto opacity-80" />

        <p className="font-label mt-6 text-[0.55rem] text-gold">: {host.label} :</p>
        <p className="font-display mt-3 text-xl font-bold text-ink sm:text-2xl">{host.names}</p>
        <div className="mt-2 space-y-0.5 text-base text-ink-soft sm:text-lg">
          {host.address.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </div>
        <p className="mt-3 text-base text-ink-soft italic sm:text-lg">
          {host.phones.map((p, i) => (
            <span key={p.tel}>
              {i > 0 && <span className="px-2 text-gold">|</span>}
              <a href={`tel:${p.tel}`} className="transition-colors hover:text-gold">
                {p.display}
              </a>
            </span>
          ))}
        </p>

        <Divider className="mt-10" width={90} />

        <p className="font-script mt-8 text-3xl leading-snug text-ink sm:text-4xl">
          <ScriptName name="Avi" /> <span className="text-gold">&amp;</span>{" "}
          <ScriptName name="Guddu" />
        </p>
        <p className="font-label mt-3 text-[0.55rem] text-gold">20 · 11 · 2026</p>
        <p className="mt-6 text-base text-ink-mute italic">
          With the blessings of our elders and the love of our families.
        </p>
      </motion.div>
    </footer>
  );
}
