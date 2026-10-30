"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarPlus, Clock, MapPin, Music4, Sparkles } from "lucide-react";
import { events, type EventItem } from "@/lib/data";
import { downloadIcs, mapsUrl } from "@/lib/calendar";
import { SectionTitle } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

const ART: Record<EventItem["icon"], { src: string; w: number; h: number }> = {
  rings: { src: "/art/pavilion.png", w: 362, h: 1026 },
  music: { src: "/art/dancers.png", w: 401, h: 564 },
};

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const Icon = event.icon === "music" ? Music4 : Sparkles;
  const flipped = index % 2 === 1;

  return (
    <article
      className={`js-event relative flex flex-col gap-6 md:flex-row md:items-center md:gap-12 ${
        flipped ? "md:flex-row-reverse" : ""
      }`}
      data-flipped={flipped ? "1" : "0"}
    >
      {/* the node that sits on the timeline spine */}
      <span className="js-event-dot absolute top-6 left-1/2 hidden size-4 -translate-x-1/2 rotate-45 border border-gold bg-powder-100 md:block" />

      <div className="md:w-1/2">
        <div className="card-paper relative overflow-hidden rounded-xl px-6 py-8 sm:px-8 sm:py-10">
          <span className="pointer-events-none absolute -top-8 -right-6 size-28 rounded-full bg-marigold/10 blur-2xl" />

          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/40 bg-white/60">
              <Icon className="size-4.5 text-gold" strokeWidth={1.5} />
            </span>
            <p className="font-label text-[0.55rem] text-gold">{event.tagline}</p>
          </div>

          <h3 className="font-display mt-4 text-2xl leading-snug font-semibold text-ink sm:text-3xl">
            {event.name}
          </h3>

          <p className="mt-3 text-base text-ink-soft/90 italic sm:text-lg">{event.blurb}</p>

          <div className="mt-6 space-y-3 text-sm sm:text-base">
            <p className="flex items-start gap-3 text-ink">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
              <span>
                <span className="font-display font-semibold">
                  {event.day}, {event.date}
                </span>
                <span className="block text-ink-mute">{event.time}</span>
              </span>
            </p>
            <p className="flex items-start gap-3 text-ink">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
              <span>
                <span className="font-display font-semibold">{event.venue}</span>
                {event.address.map((a) => (
                  <span key={a} className="block text-ink-mute">
                    {a}
                  </span>
                ))}
                <span className="block text-ink-mute">{event.city}</span>
              </span>
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={mapsUrl(event.mapQuery)}
              target="_blank"
              rel="noreferrer noopener"
              className="font-label inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.55rem] text-cream-100 transition-colors hover:bg-ink-soft"
            >
              <MapPin className="size-3.5" strokeWidth={1.8} />
              Get Directions
            </a>
            <button
              type="button"
              onClick={() => downloadIcs(event)}
              className="font-label inline-flex cursor-pointer items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-[0.55rem] text-gold transition-colors hover:bg-gold hover:text-cream-100"
            >
              <CalendarPlus className="size-3.5" strokeWidth={1.8} />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center md:w-1/2">
        <Image
          src={ART[event.icon].src}
          alt=""
          width={ART[event.icon].w}
          height={ART[event.icon].h}
          className="js-event-art h-auto w-40 select-none drop-shadow-[0_18px_28px_rgba(29,27,99,0.18)] sm:w-52"
          aria-hidden
        />
      </div>
    </article>
  );
}

export default function Events() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The gold spine draws itself as the guest scrolls down the timeline.
      gsap.fromTo(
        ".js-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ".js-timeline",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".js-event").forEach((el) => {
        const flipped = el.dataset.flipped === "1";
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
        gsap.from(el.querySelector(".js-event-dot"), {
          scale: 0,
          duration: 0.6,
          ease: "back.out(3)",
          scrollTrigger: { trigger: el, start: "top 78%" },
        });
        gsap.to(el.querySelector(".js-event-art"), {
          y: flipped ? 34 : -34,
          rotate: flipped ? -3 : 3,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="events" className="relative bg-powder-100 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle kicker="Save these dates" title="The Celebrations">
          Two days, two cities, and one very loud family.
        </SectionTitle>

        <div className="js-timeline relative space-y-20 md:space-y-28">
          <span
            className="js-spine absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-gold/10 via-gold/60 to-gold/10 md:block"
            aria-hidden
          />
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* a nod to the dholak on the printed sangeet page */}
        <div className="mt-16 flex justify-center">
          <Image
            src="/art/dholak.png"
            alt=""
            width={239}
            height={144}
            className="animate-float h-auto w-28 select-none opacity-90 sm:w-32"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
