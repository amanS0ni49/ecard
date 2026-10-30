"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  spin: number;
  angle: number;
  hue: number;
  alpha: number;
};

const COLORS = ["#f0b429", "#f6cd5b", "#e79a1f", "#f3dca0", "#d9b4c4"];

/**
 * A soft drift of marigold petals over the hero. Canvas keeps it off the
 * main layout, and the loop stops entirely when the tab is hidden or the
 * guest prefers reduced motion.
 */
export default function Petals({ density = 26 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let petals: Petal[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spawn = (seedTop = false): Petal => ({
      x: Math.random() * w,
      y: seedTop ? Math.random() * h : -20,
      r: 4 + Math.random() * 7,
      vy: 0.25 + Math.random() * 0.75,
      vx: -0.35 + Math.random() * 0.7,
      spin: (-0.5 + Math.random()) * 0.02,
      angle: Math.random() * Math.PI * 2,
      hue: Math.floor(Math.random() * COLORS.length),
      alpha: 0.35 + Math.random() * 0.45,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(density * Math.min(1.4, Math.max(0.5, w / 900)));
      petals = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin((p.y + p.angle * 40) / 90) * 0.45;
        p.angle += p.spin;

        if (p.y > h + 24) Object.assign(p, spawn());
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = COLORS[p.hue];
        // a simple almond petal
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 size-full"
    />
  );
}
