"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarPlus, MapPin, Send } from "lucide-react";
import { WEDDING_ISO, events } from "@/lib/data";
import { downloadIcs, mapsUrl } from "@/lib/calendar";

gsap.registerPlugin(ScrollTrigger);

const CardViewer = dynamic(() => import("./CardViewer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[760/1153] w-full max-w-[260px] animate-pulse rounded-xl bg-white/8" aria-hidden />
  ),
});

const MARQUEE = ["Avi & Guddu", "20 · 11 · 2026", "Jaipur", "Jodhpur", "Save the Date"];

function Row({ reverse = false }: { reverse?: boolean }) {
  // Rendered twice back-to-back so the -50% shift wraps seamlessly.
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="js-marquee-row flex w-max shrink-0 items-center gap-10 whitespace-nowrap will-change-transform"
      data-reverse={reverse ? "1" : "0"}
    >
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className="flex items-center gap-10">
          <span
            className={`font-display text-4xl font-semibold tracking-tight sm:text-6xl ${
              i % 2
                ? "text-transparent [-webkit-text-stroke:1px_rgba(211,171,99,0.55)]"
                : "text-cream-100/90"
            }`}
          >
            {t}
          </span>
          <span className="size-2 rotate-45 bg-gold-300/70" aria-hidden />
        </span>
      ))}
    </div>
  );
}

/** Shared tile chrome — solid enough to keep text legible on the navy ground. */
const TILE =
  "js-tile relative overflow-hidden rounded-2xl border border-gold-300/20 bg-white/[0.07] p-6 backdrop-blur-sm transition-colors hover:border-gold-300/45 sm:p-7";

function Countdown() {
  const [p, setP] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    const tick = () => {
      const ms = new Date(WEDDING_ISO).getTime() - Date.now();
      if (ms <= 0) return setP([0, 0, 0, 0]);
      setP([
        Math.floor(ms / 86_400_000),
        Math.floor(ms / 3_600_000) % 24,
        Math.floor(ms / 60_000) % 60,
        Math.floor(ms / 1_000) % 60,
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const labels = ["Days", "Hours", "Mins", "Secs"];

  return (
    <div className={`${TILE} flex flex-col justify-between md:col-span-2 md:row-span-2`}>
      <span
        className="pointer-events-none absolute -top-20 -right-16 size-56 rounded-full bg-marigold/25 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <p className="font-label text-[0.55rem] text-gold-300">The countdown is on</p>
        <p className="font-script mt-3 text-4xl text-cream-100 sm:text-5xl">
          Until we say yes
        </p>
      </div>

      <div className="relative mt-8 grid grid-cols-4 gap-2 sm:gap-3">
        {(p ?? [0, 0, 0, 0]).map((v, i) => (
          <div key={labels[i]} className="rounded-xl bg-ink/45 px-1 py-4 text-center ring-1 ring-gold-300/15">
            <p
              className="font-display text-3xl leading-none font-semibold text-cream-100 tabular-nums sm:text-4xl md:text-5xl"
              style={{ opacity: p ? 1 : 0.35 }}
            >
              {p ? String(v).padStart(2, "0") : "––"}
            </p>
            <p className="font-label mt-2 text-[0.45rem] text-gold-200">{labels[i]}</p>
          </div>
        ))}
      </div>

      <p className="relative mt-6 text-base text-cream-200/70 italic">
        Friday, 20 November 2026 — the pheras begin in Jaipur.
      </p>
    </div>
  );
}

function VenueTile({ index }: { index: 0 | 1 }) {
  const e = events[index];
  return (
    <a
      href={mapsUrl(e.mapQuery)}
      target="_blank"
      rel="noreferrer noopener"
      className={`${TILE} group flex flex-col justify-between md:col-span-2`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-label text-[0.5rem] text-gold-300">{e.tagline}</p>
          <p className="font-display mt-2 text-3xl leading-none font-semibold text-cream-100 sm:text-4xl">
            {e.city}
          </p>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-300/35 text-gold-200 transition-colors group-hover:bg-gold-300 group-hover:text-ink">
          <MapPin className="size-4.5" strokeWidth={1.6} />
        </span>
      </div>

      <div className="mt-6">
        <span className="mb-4 block h-px w-full bg-gradient-to-r from-gold-300/45 to-transparent" />
        <p className="text-base text-cream-100">{e.venue}</p>
        <p className="mt-0.5 text-base text-cream-200/65">
          {e.day}, {e.date}
        </p>
        <p className="font-label mt-4 text-[0.5rem] text-gold-200 underline-offset-4 group-hover:underline">
          Get directions
        </p>
      </div>
    </a>
  );
}

export default function SaveTheDate() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rows = gsap.utils.toArray<HTMLElement>(".js-marquee-row");
      const tweens = rows.map((row) => {
        const reverse = row.dataset.reverse === "1";
        gsap.set(row, { xPercent: reverse ? -50 : 0 });
        return gsap.to(row, {
          xPercent: reverse ? 0 : -50,
          duration: 26,
          ease: "none",
          repeat: -1,
        });
      });

      // Scrolling speeds the marquee up and flips it — the classic kinetic feel.
      let last = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          last = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 900, 5);
          tweens.forEach((t) =>
            gsap.to(t, { timeScale: last * boost, duration: 0.4, overwrite: true }),
          );
        },
      });

      gsap.from(".js-std-head", {
        y: 44,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".js-std-head", start: "top 88%" },
      });

      gsap.from(".js-tile", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".js-bento", start: "top 82%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="save-the-date" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(240,180,41,0.20),transparent_60%)]"
        aria-hidden
      />
      <div
        className="damask pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        aria-hidden
      />

      <div className="relative z-10 space-y-4 opacity-70">
        <Row />
        <Row reverse />
      </div>

      <div className="js-std-head relative z-10 mt-14 px-5 text-center sm:mt-16">
        <h2 className="font-script text-5xl leading-none text-cream-100 sm:text-6xl">
          Save the Date
        </h2>
        <p className="font-display mt-4 text-3xl font-semibold tracking-[0.14em] text-foil sm:text-5xl">
          20.11.2026
        </p>
        <motion.span
          className="mx-auto mt-5 block h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: 200 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* bento: everything a guest needs at a glance */}
      <div className="js-bento relative z-10 mx-auto mt-12 grid max-w-5xl gap-4 px-5 sm:mt-14 md:grid-cols-4">
        <Countdown />

        {/* the printed card itself, flippable */}
        <div className={`${TILE} flex flex-col items-center justify-between md:col-span-2 md:row-span-2`}>
          <div className="w-full text-left">
            <p className="font-label text-[0.55rem] text-gold-300">The printed card</p>
            <p className="font-script mt-2 text-3xl text-cream-100 sm:text-4xl">
              Flip through it
            </p>
          </div>
          <div className="mt-6 flex w-full justify-center">
            <CardViewer />
          </div>
        </div>

        <VenueTile index={0} />
        <VenueTile index={1} />

        {/* actions */}
        <div className={`${TILE} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:col-span-4`}>
          <div>
            <p className="font-script text-3xl text-cream-100 sm:text-4xl">
              Will you be there?
            </p>
            <p className="mt-1 text-base text-cream-200/70 italic">
              Two cities, two celebrations — and a seat with your name on it.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <button
              type="button"
              onClick={() => events.forEach(downloadIcs)}
              className="font-label inline-flex cursor-pointer items-center gap-2 rounded-full border border-gold-300/45 px-5 py-3 text-[0.55rem] text-gold-200 transition-colors hover:bg-gold-300 hover:text-ink"
            >
              <CalendarPlus className="size-3.5" strokeWidth={1.8} />
              Add both dates
            </button>
            <a
              href="#rsvp"
              className="font-label inline-flex items-center gap-2 rounded-full bg-cream-100 px-5 py-3 text-[0.55rem] text-ink transition-colors hover:bg-gold-200"
            >
              <Send className="size-3.5" strokeWidth={1.8} />
              RSVP now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
