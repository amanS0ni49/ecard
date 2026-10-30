"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const PAGES = [
  { src: "/card/1.jpg", label: "The invitation" },
  { src: "/card/2.jpg", label: "With blessings of" },
  { src: "/card/3.jpg", label: "Sangeet Sparkles" },
  { src: "/card/4.jpg", label: "Mathur Family" },
];

/**
 * Flips through the four pages of the printed card, with a full-screen reader.
 * Client-only: Swiper reads the clock while it renders, which Cache Components
 * rejects during prerender.
 */
export default function CardViewer() {
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + PAGES.length) % PAGES.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <>
      <div className="relative w-full max-w-[260px]">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          keyboard={{ enabled: true }}
          autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: ".js-card-dots" }}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="overflow-hidden rounded-xl ring-1 ring-gold-300/35"
        >
          {PAGES.map((p, i) => (
            <SwiperSlide key={p.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full cursor-zoom-in"
                aria-label={`Open full screen: ${p.label}`}
              >
                <Image
                  src={p.src}
                  alt={`Printed invitation — ${p.label}`}
                  width={760}
                  height={1153}
                  sizes="260px"
                  className="h-auto w-full"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
                <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-ink/70 text-cream-100 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Expand className="size-4" strokeWidth={1.7} />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-label min-w-0 truncate text-[0.5rem] text-gold-200">
            {PAGES[active].label}
          </p>
          <div className="js-card-dots flex items-center gap-1.5 [&_.swiper-pagination-bullet]:size-1.5 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-cream-100/30 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet-active]:bg-gold-300" />
        </div>
      </div>

      {/* This component only ever renders on the client (ssr: false), so
          document.body is always available here. */}
      {createPortal(
        <AnimatePresence>
            {open !== null && (
              <motion.div
                className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label="Printed invitation viewer"
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-5 right-5 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors hover:bg-cream-100/15"
                >
                  <X className="size-5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous page"
                  className="absolute left-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors hover:bg-cream-100/15 sm:left-8"
                >
                  <ChevronLeft className="size-5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next page"
                  className="absolute right-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors hover:bg-cream-100/15 sm:right-8"
                >
                  <ChevronRight className="size-5" strokeWidth={1.6} />
                </button>

                <motion.figure
                  key={open}
                  className="relative max-h-[88dvh]"
                  initial={{ scale: 0.92, opacity: 0, y: 18 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={PAGES[open].src}
                    alt={`Printed invitation — ${PAGES[open].label}`}
                    width={760}
                    height={1153}
                    className="max-h-[80dvh] w-auto rounded-lg ring-1 ring-gold-300/30"
                  />
                  <figcaption className="font-label mt-4 text-center text-[0.55rem] text-gold-200">
                    {PAGES[open].label} · {open + 1} of {PAGES.length}
                  </figcaption>
                </motion.figure>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
