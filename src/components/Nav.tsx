"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  BookHeart,
  Heart,
  Home,
  MailCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { navSections } from "@/lib/data";

/** Narrow screens show icons only — six text labels do not fit on a phone. */
const ICONS: Record<string, LucideIcon> = {
  home: Home,
  couple: Heart,
  story: BookHeart,
  events: CalendarDays,
  family: Users,
  rsvp: MailCheck,
};

/**
 * A floating gold dock. The pill marker slides between sections using a
 * shared layoutId, and the active section is tracked with IntersectionObserver.
 */
export default function Nav({ visible }: { visible: boolean }) {
  const [active, setActive] = useState(navSections[0].id);

  useEffect(() => {
    const targets = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <motion.nav
      className="fixed inset-x-0 bottom-4 z-60 flex justify-center px-4"
      initial={{ y: 90, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
      transition={{ duration: 0.7, delay: visible ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Section navigation"
    >
      <ul className="flex max-w-full items-center gap-0.5 rounded-full border border-gold/30 bg-powder-50/85 px-1.5 py-1.5 shadow-[0_14px_40px_-18px_rgba(29,27,99,0.55)] backdrop-blur-md">
        {navSections.map((s) => {
          const on = active === s.id;
          const Icon = ICONS[s.id];
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                aria-label={s.label}
                className={`font-label relative flex items-center justify-center rounded-full px-3 py-2.5 text-[0.55rem] transition-colors sm:px-4 sm:py-2 ${
                  on ? "text-cream-100" : "text-ink-mute hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 size-4 sm:hidden" strokeWidth={1.7} />
                <span className="relative z-10 hidden sm:inline">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
