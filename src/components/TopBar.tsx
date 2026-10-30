"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check, Music2, Share2, VolumeX } from "lucide-react";
import { subscribe, toggle } from "@/lib/audio";

/** Gold progress rule plus the share and music controls. */
export default function TopBar({ visible }: { visible: boolean }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mirrors the shared player, which the envelope tap may have already started.
  useEffect(() => subscribe(setPlaying), []);

  const share = async () => {
    const data = {
      title: "Avi & Guddu — Wedding Invitation",
      text: "You are invited to the wedding of Avi (Bhavesh) & Guddu (Janhavi), 20 November 2026.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* guest dismissed the sheet — fall through to copying */
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable; nothing useful left to do */
    }
  };

  const btn =
    "flex size-10 cursor-pointer items-center justify-center rounded-full border border-gold/30 bg-powder-50/85 text-ink shadow-[0_10px_28px_-16px_rgba(29,27,99,0.6)] backdrop-blur-md transition-colors hover:bg-gold hover:text-cream-100";

  return (
    <>
      <motion.div
        className="rule-gold fixed inset-x-0 top-0 z-70 h-[3px] origin-left"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <motion.div
        className="fixed top-4 right-4 z-60 flex flex-col gap-2.5"
        initial={{ opacity: 0, x: 30 }}
        animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: visible ? 0.6 : 0 }}
      >
        <button type="button" onClick={share} className={btn} aria-label="Share this invitation">
          {copied ? (
            <Check className="size-4.5" strokeWidth={1.8} />
          ) : (
            <Share2 className="size-4.5" strokeWidth={1.6} />
          )}
        </button>

        <button
          type="button"
          onClick={() => toggle()}
          className={btn}
          aria-label={playing ? "Pause music" : "Play music"}
          aria-pressed={playing}
        >
          {playing ? (
            <Music2 className="size-4.5 animate-pulse" strokeWidth={1.6} />
          ) : (
            <VolumeX className="size-4.5" strokeWidth={1.6} />
          )}
        </button>
      </motion.div>
    </>
  );
}
