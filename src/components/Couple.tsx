"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { couple } from "@/lib/data";
import { ScriptName, SectionTitle } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

type Person = {
  short: string;
  formal: string;
  role: string;
  initial: string;
  portrait: string;
  lineage: readonly string[];
};

/**
 * Illustrated portrait, not a photograph. The artwork already carries its own
 * gold ring, dashed border and lotus motifs on a powder ground that matches
 * the section, so it is rendered square and left to blend — no extra chrome.
 */
function Portrait({ person, side }: { person: Person; side: "left" | "right" }) {
  return (
    <div className="js-portrait flex flex-col items-center" data-side={side}>
      <div className="group relative size-60 sm:size-68 md:size-76">
        <Image
          src={person.portrait}
          alt={`Illustrated portrait of ${person.short} (${person.formal})`}
          width={760}
          height={760}
          sizes="(max-width: 640px) 15rem, 19rem"
          className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={side === "left"}
        />
      </div>

      <p className="font-label mt-4 text-[0.55rem] text-gold">{person.role}</p>
      <p className="font-script mt-1 text-5xl text-ink sm:text-6xl">
        <ScriptName name={person.short} />
      </p>
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
