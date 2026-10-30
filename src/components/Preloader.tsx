"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * The curtain-raiser: a sealed envelope the guest taps to open.
 * One GSAP timeline pops the wax seal, swings the flap, lifts the card
 * out of the pocket and then wipes the whole overlay away.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const flap = useRef<HTMLDivElement>(null);
  const seal = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const envelope = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);

  // Hold the page still until the envelope is out of the way.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Gentle entrance for the sealed envelope.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(envelope.current, {
        y: 70,
        opacity: 0,
        scale: 0.86,
        duration: 1.1,
        ease: "power3.out",
      });
      gsap.from(hint.current, { opacity: 0, y: 14, duration: 0.8, delay: 0.7 });
      gsap.to(envelope.current, {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }

    const tl = gsap.timeline({ onComplete: onDone });

    tl.killTweensOf(envelope.current);
    tl.to(hint.current, { opacity: 0, y: 10, duration: 0.3 })
      .to(envelope.current, { y: 0, duration: 0.3, ease: "power2.out" }, "<")
      // wax seal snaps off
      .to(
        seal.current,
        { scale: 1.25, duration: 0.22, ease: "back.out(3)" },
        "-=0.1",
      )
      .to(seal.current, {
        y: 140,
        scale: 0.6,
        rotate: 220,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in",
      })
      // flap swings up and over
      .to(
        flap.current,
        { rotateX: -168, duration: 0.85, ease: "power3.inOut" },
        "-=0.45",
      )
      .set(flap.current, { zIndex: 1 })
      // invitation rises out of the pocket
      .to(
        card.current,
        { y: -210, duration: 0.95, ease: "power3.out" },
        "-=0.25",
      )
      .to(card.current, {
        scale: 1.08,
        y: -224,
        duration: 0.5,
        ease: "power2.out",
      })
      // card fills the screen, overlay wipes away
      .to(card.current, {
        scale: 9,
        y: -260,
        opacity: 0,
        duration: 0.95,
        ease: "power2.in",
      })
      .to(
        root.current,
        { opacity: 0, duration: 0.6, ease: "power2.inOut" },
        "-=0.6",
      );
  };

  return (
    <div
      ref={root}
      className="damask fixed inset-0 z-90 flex flex-col items-center justify-center bg-powder-200"
      role="dialog"
      aria-label="Open the wedding invitation"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65),transparent_68%)]" />

      <button
        type="button"
        onClick={open}
        aria-label="Tap to open the invitation"
        className="relative cursor-pointer focus:outline-none"
        style={{ perspective: 1400 }}
      >
        <div
          ref={envelope}
          className="relative h-[210px] w-[310px] sm:h-[250px] sm:w-[370px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* envelope back panel */}
          <div className="absolute inset-0 rounded-[6px] bg-gradient-to-b from-cream-200 to-cream-300 shadow-[0_26px_60px_-24px_rgba(29,27,99,0.55)]" />

          {/* the invitation itself, tucked inside */}
          <div
            ref={card}
            className="absolute inset-x-[7%] top-[9%] z-2 flex h-[86%] flex-col items-center justify-center gap-2 rounded-[4px] bg-powder-50 px-4 text-center shadow-[0_10px_30px_-14px_rgba(29,27,99,0.5)] ring-1 ring-gold/25"
          >
            <Image
              src="/art/ganesha.png"
              alt=""
              width={299}
              height={417}
              className="h-auto w-7 opacity-90"
            />
            <p className="font-label text-[0.5rem] text-gold">Wedding Invitation</p>
            <p className="font-script -mt-1 text-3xl leading-tight text-ink">
              Avi <span className="text-xl text-gold">&amp;</span> Guddu
            </p>
            <p className="font-label text-[0.5rem] text-ink-mute">20 · 11 · 2026</p>
          </div>

          {/* front pocket */}
          <div
            className="absolute inset-0 z-3 rounded-[6px] bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300"
            style={{ clipPath: "polygon(0 42%, 50% 78%, 100% 42%, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-0 z-3"
            style={{
              clipPath: "polygon(0 0, 0 100%, 50% 56%)",
              background: "linear-gradient(135deg,#f4ead3,#e8d9b8)",
            }}
          />
          <div
            className="absolute inset-0 z-3"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 50% 56%)",
              background: "linear-gradient(225deg,#f4ead3,#e8d9b8)",
            }}
          />

          {/* top flap */}
          <div
            ref={flap}
            className="absolute inset-x-0 top-0 z-4 h-[58%] origin-top"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="h-full w-full"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg,#f8f1e0,#e8d9b8)",
                boxShadow: "0 8px 18px -10px rgba(29,27,99,0.4)",
              }}
            />
          </div>

          {/* wax seal */}
          <div
            ref={seal}
            className="absolute left-1/2 z-5 flex size-14 -translate-x-1/2 items-center justify-center rounded-full sm:size-16"
            style={{
              top: "44%",
              background:
                "radial-gradient(circle at 34% 30%, #d8b268, #9a7418 55%, #6f520b)",
              boxShadow: "0 6px 16px -6px rgba(29,27,99,0.6)",
            }}
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-gold-300/70" />
            <Image
              src="/art/ganesha.png"
              alt=""
              width={299}
              height={417}
              className="h-auto w-5 brightness-0 invert-[0.92] sm:w-6"
            />
          </div>
        </div>
      </button>

      <div ref={hint} className="relative mt-12 text-center">
        <p className="font-label text-[0.62rem] text-gold sm:text-xs">
          Tap the seal to open
        </p>
        <p className="font-script mt-2 text-2xl text-ink-soft">
          you are invited
        </p>
      </div>
    </div>
  );
}
