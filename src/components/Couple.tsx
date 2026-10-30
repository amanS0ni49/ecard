"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { couple } from "@/lib/data";
import { BrideAvatar, GroomAvatar } from "./Avatars";
import { SectionTitle } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

type Person = {
  short: string;
  formal: string;
  role: string;
  initial: string;
  avatar: "groom" | "bride";
  lineage: readonly string[];
};

/** A drawn avatar in a gold medallion — the card carries no photographs. */
function Portrait({ person, side }: { person: Person; side: "left" | "right" }) {
  const Avatar = person.avatar === "groom" ? GroomAvatar : BrideAvatar;

  return (
    <div className="js-portrait flex flex-col items-center" data-side={side}>
      <div className="group relative">
        <span className="absolute -inset-3 rounded-full border border-dashed border-gold/35 transition-transform duration-[6000ms] group-hover:rotate-180" />
        <div className="relative flex size-52 items-end justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_28%,#ffffff,#e2f1f6_52%,#bfdfea)] ring-1 ring-gold/40 shadow-[0_22px_50px_-26px_rgba(29,27,99,0.6)] sm:size-60 md:size-68">
          <span className="damask absolute inset-0 opacity-50" aria-hidden />

          {/* the initial sits behind the figure like a watermark */}
          <span
            className="font-script absolute inset-0 flex items-center justify-center text-[9rem] leading-none text-gold/12 select-none"
            aria-hidden
          >
            {person.initial}
          </span>

          <Avatar className="relative z-10 size-[88%] translate-y-1 transition-transform duration-700 group-hover:scale-105" />

          <span className="pointer-events-none absolute inset-0 rounded-full ring-6 ring-white/35 ring-inset" aria-hidden />
        </div>
      </div>

      <p className="font-label mt-6 text-[0.55rem] text-gold">{person.role}</p>
      <p className="font-script mt-1 text-5xl text-ink sm:text-6xl">{person.short}</p>
      <p className="font-display text-lg text-gold-400 italic sm:text-xl">({person.formal})</p>
      <div className="mt-3 max-w-xs space-y-1 text-center text-sm text-ink-mute sm:text-base">
        {person.lineage.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}

export default function Couple() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The two portraits glide in from their own sides and meet in the middle.
      gsap.utils.toArray<HTMLElement>(".js-portrait").forEach((el) => {
        const fromLeft = el.dataset.side === "left";
        gsap.from(el, {
          x: fromLeft ? -70 : 70,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.from(".js-knot", {
        scale: 0,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".js-knot", start: "top 88%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="couple" className="relative bg-powder-100 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle kicker="Two families, one celebration" title="The Couple">
          Years of small moments, one very big day.
        </SectionTitle>

        <div className="flex flex-col items-center gap-14 md:flex-row md:items-start md:justify-center md:gap-10">
          <Portrait person={couple.groom} side="left" />

          <div className="js-knot flex shrink-0 flex-col items-center gap-3 md:mt-24">
            <span className="h-10 w-px bg-gradient-to-b from-transparent to-gold/60 md:hidden" />
            <span className="relative flex size-14 items-center justify-center rounded-full border border-gold/40 bg-white/60 backdrop-blur-sm">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/50" />
              <Heart className="size-6 text-rose" strokeWidth={1.4} fill="currentColor" />
            </span>
            <span className="h-10 w-px bg-gradient-to-t from-transparent to-gold/60 md:hidden" />
          </div>

          <Portrait person={couple.bride} side="right" />
        </div>
      </div>
    </section>
  );
}
