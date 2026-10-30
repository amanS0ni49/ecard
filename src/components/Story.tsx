"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { story } from "@/lib/data";
import { SectionTitle } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

const CardViewer = dynamic(() => import("./CardViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[760/1153] w-full max-w-[260px] animate-pulse rounded-xl bg-cream-300/50"
      aria-hidden
    />
  ),
});

function Chapter({ item, i }: { item: (typeof story)[number]; i: number }) {
  const flipped = i % 2 === 1;

  return (
    <article
      className={`js-chapter relative flex flex-col items-center gap-8 md:flex-row md:gap-14 ${
        flipped ? "md:flex-row-reverse" : ""
      }`}
      data-flipped={flipped ? "1" : "0"}
    >
      {/* the illustrated scene, tilted like a photo laid on paper */}
      <div className="md:w-1/2">
        <div
          className={`js-chapter-art relative mx-auto w-full max-w-[380px] rotate-[-1.4deg] ${
            flipped ? "md:rotate-[1.6deg]" : ""
          }`}
        >
          <span
            className="absolute -inset-2.5 rounded-2xl bg-white/80 shadow-[0_26px_55px_-30px_rgba(29,27,99,0.55)]"
            aria-hidden
          />
          <Image
            src={item.image}
            alt={item.alt}
            width={588}
            height={476}
            sizes="(max-width: 768px) 90vw, 380px"
            className="relative h-auto w-full rounded-xl ring-1 ring-gold/25"
          />
          <span
            className="absolute -top-3 -right-3 flex size-9 items-center justify-center rounded-full bg-rose/90 text-cream-100 shadow-md"
            aria-hidden
          >
            <Heart className="size-4" fill="currentColor" strokeWidth={0} />
          </span>
        </div>
      </div>

      {/* the words */}
      <div className={`js-chapter-copy md:w-1/2 ${flipped ? "md:text-right" : ""}`}>
        <span
          className={`flex size-11 items-center justify-center rounded-full border border-gold/40 bg-white/70 ${
            flipped ? "md:ml-auto" : ""
          }`}
        >
          <span className="font-label text-[0.6rem] text-gold">{item.step}</span>
        </span>

        <h3 className="font-script mt-5 text-4xl leading-tight text-ink sm:text-5xl">
          {item.title}
        </h3>

        <span
          className={`rule-gold mt-4 block h-px w-24 ${flipped ? "md:ml-auto" : ""}`}
          aria-hidden
        />

        <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-soft/90 italic sm:text-xl">
          {item.body}
        </p>
      </div>
    </article>
  );
}

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The thread between chapters draws itself as you read down the page.
      gsap.fromTo(
        ".js-thread",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".js-chapters",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".js-chapter").forEach((el) => {
        const flipped = el.dataset.flipped === "1";

        gsap.from(el.querySelector(".js-chapter-art"), {
          x: flipped ? 60 : -60,
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });

        gsap.from(el.querySelector(".js-chapter-copy"), {
          x: flipped ? -40 : 40,
          opacity: 0,
          duration: 1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });

        // a slow drift so the scenes feel alive as they pass
        gsap.to(el.querySelector(".js-chapter-art"), {
          y: flipped ? 26 : -26,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" className="relative overflow-hidden bg-cream-100 px-5 py-20 sm:py-28">
      {/* warm paper wash */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.9),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionTitle kicker="How we got here" title="Our Story">
          Three chapters, a lot of coffee, and one very easy yes.
        </SectionTitle>

        <div className="js-chapters relative space-y-20 md:space-y-28">
          <span
            className="js-thread absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-gold/10 via-gold/45 to-gold/10 md:block"
            aria-hidden
          />
          {story.map((item, i) => (
            <Chapter key={item.id} item={item} i={i} />
          ))}
        </div>

        {/* closing beat — the invitation itself */}
        <div className="mt-24 flex flex-col items-center text-center">
          <p className="font-label text-[0.55rem] text-gold">And now</p>
          <p className="font-script mt-3 text-4xl text-ink sm:text-5xl">
            …this invitation
          </p>
          <p className="mt-4 max-w-sm text-base text-ink-mute italic">
            Flip through the card our families had printed for you.
          </p>
          <div className="mt-10">
            <CardViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
