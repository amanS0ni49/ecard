"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/** Fraction of the foil that must be cleared before it lifts itself. */
const CLEAR_FRACTION = 0.45;
/** Coarse grid used to measure how much has been scratched. */
const SAMPLE_W = 48;
const SAMPLE_H = 36;

function heartPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.38);
  ctx.bezierCurveTo(cx - s * 1.05, cy - s * 0.3, cx - s * 0.55, cy - s * 1.05, cx, cy - s * 0.42);
  ctx.bezierCurveTo(cx + s * 0.55, cy - s * 1.05, cx + s * 1.05, cy - s * 0.3, cx, cy + s * 0.38);
  ctx.closePath();
}

/**
 * A photo hidden under a gold-foil scratch layer — like the scratch panel on
 * a printed card. Drag (or rub on touch) to erase the foil; a tap or Enter
 * reveals it outright. The image itself is always rendered underneath, so it
 * still shows for no-JS guests.
 */
export default function ScratchImage({
  src,
  alt,
  width,
  height,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sampler = useRef<HTMLCanvasElement | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const drawing = useRef(false);
  const travelled = useRef(0);
  const segments = useRef(0);
  const revealed = useRef(false);
  const [done, setDone] = useState(false);

  const paint = useCallback(() => {
    const c = canvas.current;
    const host = wrap.current;
    if (!c || !host || revealed.current) return;

    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);

    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // brushed gold foil
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#e9d9a4");
    g.addColorStop(0.45, "#d3b669");
    g.addColorStop(1, "#b08a2c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // diagonal sheen bands
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    for (let x = -h; x < w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 18, 0);
      ctx.lineTo(x + 18 + h, h);
      ctx.lineTo(x + h, h);
      ctx.closePath();
      ctx.fill();
    }

    // damask diamond lattice
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    for (let y = 14; y < h; y += 28) {
      for (let x = 14; x < w; x += 28) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-2.2, -2.2, 4.4, 4.4);
        ctx.restore();
      }
    }

    // vignette so the edge reads like pressed foil
    const edge = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    edge.addColorStop(0, "rgba(90,65,10,0)");
    edge.addColorStop(1, "rgba(90,65,10,0.28)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, w, h);

    // center heart + label
    const deep = "rgba(80,58,10,0.85)";
    heartPath(ctx, w / 2, h * 0.42, Math.min(w, h) * 0.085);
    ctx.strokeStyle = deep;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.fillStyle = deep;
    ctx.font = `600 ${Math.max(9, w * 0.024)}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("· S C R A T C H   T O   R E V E A L ·", w / 2, h * 0.6);
  }, []);

  // Paint once the label font is in, and repaint on resize (foil resets).
  useEffect(() => {
    let alive = true;
    const go = () => {
      if (alive) paint();
    };
    go();
    document.fonts?.ready.then(go).catch(() => {});
    const ro = new ResizeObserver(go);
    if (wrap.current) ro.observe(wrap.current);
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [paint]);

  const reveal = useCallback(() => {
    revealed.current = true;
    setDone(true);
  }, []);

  /** Downscale onto a tiny grid and count cleared pixels. */
  const check = useCallback(() => {
    const c = canvas.current;
    if (!c) return;
    if (!sampler.current) {
      sampler.current = document.createElement("canvas");
      sampler.current.width = SAMPLE_W;
      sampler.current.height = SAMPLE_H;
    }
    const sctx = sampler.current.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;
    sctx.clearRect(0, 0, SAMPLE_W, SAMPLE_H);
    sctx.drawImage(c, 0, 0, SAMPLE_W, SAMPLE_H);
    const data = sctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 64) clear += 1;
    if (clear / (SAMPLE_W * SAMPLE_H) >= CLEAR_FRACTION) reveal();
  }, [reveal]);

  const point = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const eraseTo = useCallback(
    (p: { x: number; y: number }) => {
      const c = canvas.current;
      const ctx = c?.getContext("2d");
      if (!c || !ctx) return;
      const w = c.clientWidth;

      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(34, Math.min(70, w * 0.16));
      ctx.beginPath();
      const from = last.current ?? { x: p.x, y: p.y - 0.01 };
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();

      travelled.current += Math.hypot(p.x - from.x, p.y - from.y);
      last.current = p;
      segments.current += 1;
      if (segments.current % 8 === 0) check();
    },
    [check],
  );

  return (
    <div ref={wrap} className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
      />
      <canvas
        ref={canvas}
        role="button"
        tabIndex={done ? -1 : 0}
        aria-label="Scratch to reveal the photo"
        className={`absolute inset-0 size-full rounded-xl transition-opacity duration-700 ${
          done ? "pointer-events-none opacity-0" : "cursor-crosshair touch-none opacity-100"
        }`}
        onPointerDown={(e) => {
          if (done) return;
          canvas.current?.setPointerCapture(e.pointerId);
          drawing.current = true;
          travelled.current = 0;
          last.current = null;
          eraseTo(point(e));
        }}
        onPointerMove={(e) => {
          if (!drawing.current || done) return;
          eraseTo(point(e));
        }}
        onPointerUp={() => {
          drawing.current = false;
          last.current = null;
          // a tap with no real stroke counts as "just show me"
          if (!done && travelled.current < 8) reveal();
        }}
        onPointerCancel={() => {
          drawing.current = false;
          last.current = null;
        }}
        onKeyDown={(e) => {
          if (!done && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            reveal();
          }
        }}
      />
    </div>
  );
}
