"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { gallery } from "@/lib/data";
import { SectionTitle } from "./Ornaments";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  // Arrow keys and Escape drive the lightbox once it is open.
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
    <section id="story" className="relative overflow-hidden bg-powder-200 px-0 py-20 sm:py-28">
      <div className="damask pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative z-10">
        <div className="px-5">
          <SectionTitle kicker="Little things, big love" title="Our Moments">
            A few frames from the chapters that brought us here.
          </SectionTitle>
        </div>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation, Keyboard]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          keyboard={{ enabled: true }}
          slidesPerView="auto"
          spaceBetween={24}
          autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
          coverflowEffect={{ rotate: 26, stretch: 0, depth: 140, modifier: 1.1, slideShadows: false }}
          pagination={{ clickable: true, el: ".js-gallery-dots" }}
          navigation={{ prevEl: ".js-gallery-prev", nextEl: ".js-gallery-next" }}
          className="!px-5 !pb-4"
        >
          {gallery.map((item, i) => (
            <SwiperSlide key={item.src} className="!w-[72vw] max-w-[330px] sm:!w-[330px]">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-xl bg-powder-50 ring-1 ring-gold/30 shadow-[0_26px_60px_-30px_rgba(29,27,99,0.65)]"
                aria-label={`Open photo: ${item.caption}`}
              >
                <div className="relative aspect-[3/4.2] w-full">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 72vw, 330px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 text-left">
                  <span className="font-script text-2xl text-cream-100 drop-shadow">
                    {item.caption}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-cream-100 backdrop-blur-sm transition-colors group-hover:bg-gold/80">
                    <ZoomIn className="size-4" strokeWidth={1.6} />
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-2 rounded-lg border border-cream-100/25" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            className="js-gallery-prev flex size-10 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-white/60 text-ink transition-colors hover:bg-gold hover:text-cream-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-5" strokeWidth={1.6} />
          </button>
          <div className="js-gallery-dots flex items-center gap-2 [&_.swiper-pagination-bullet]:size-2 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-ink/25 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:bg-gold [&_.swiper-pagination-bullet]:transition-all" />
          <button
            type="button"
            className="js-gallery-next flex size-10 cursor-pointer items-center justify-center rounded-full border border-gold/40 bg-white/60 text-ink transition-colors hover:bg-gold hover:text-cream-100"
            aria-label="Next photo"
          >
            <ChevronRight className="size-5" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-80 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
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
              aria-label="Previous photo"
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
              aria-label="Next photo"
              className="absolute right-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream-100/30 text-cream-100 transition-colors hover:bg-cream-100/15 sm:right-8"
            >
              <ChevronRight className="size-5" strokeWidth={1.6} />
            </button>

            <motion.figure
              key={open}
              className="relative max-h-[86dvh] w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[open].src}
                alt={gallery[open].caption}
                width={853}
                height={1280}
                className="max-h-[76dvh] w-full rounded-lg object-contain ring-1 ring-gold/30"
              />
              <figcaption className="font-script mt-4 text-center text-2xl text-cream-200">
                {gallery[open].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
