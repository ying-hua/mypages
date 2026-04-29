"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

type BalatroCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export default function BalatroCard({
  children,
  className = "",
  maxTilt = 14,
}: BalatroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{
    rx: number;
    ry: number;
    mx: number;
    my: number;
    hue: number;
  } | null>(null);

  const flush = useCallback(() => {
    rafRef.current = null;
    const el = cardRef.current;
    const v = pendingRef.current;
    if (!el || !v) return;
    el.style.setProperty("--rx", v.rx.toFixed(4));
    el.style.setProperty("--ry", v.ry.toFixed(4));
    el.style.setProperty("--mx", v.mx.toFixed(4));
    el.style.setProperty("--my", v.my.toFixed(4));
    el.style.setProperty("--hue", v.hue.toFixed(1));
    el.style.setProperty("--lift", "1");
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      pendingRef.current = {
        rx: px - 0.5,
        ry: py - 0.5,
        mx: px,
        my: py,
        hue: px * 360,
      };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    },
    [flush],
  );

  const handleLeave = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = null;
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0");
    el.style.setProperty("--ry", "0");
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.style.setProperty("--hue", "180");
    el.style.setProperty("--lift", "0");
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{ perspective: "1400px" }}
      className={`relative ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={
          {
            "--rx": "0",
            "--ry": "0",
            "--mx": "0.5",
            "--my": "0.5",
            "--hue": "180",
            "--lift": "0",
            "--max-tilt": `${maxTilt}deg`,
            transformStyle: "preserve-3d",
            transform:
              "rotateY(calc(var(--rx) * var(--max-tilt))) rotateX(calc(var(--ry) * var(--max-tilt) * -1)) translateZ(calc(var(--lift) * 16px))",
            transition:
              "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease-out",
            boxShadow:
              "0 40px 100px -24px rgba(0,0,0,0.9), 0 16px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            background: "#0D0D15",
          } as React.CSSProperties
        }
        className="relative w-full h-full rounded-[28px] overflow-hidden will-change-transform"
      >
        {/* Dark base */}
        <div className="absolute inset-0 rounded-[28px] bg-[#0D0D15]" />

        {/* Holographic rainbow foil
            Strategy: single linear-gradient covering the full hue wheel
            (0→360, ending back at red so the loop is seamless).
            hue-rotate() shifts the whole spectrum with mouse X — no
            repeating boundaries, no hard color jumps. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[28px]"
          style={{
            background: `linear-gradient(
              calc(45deg + var(--rx, 0) * 30deg),
              hsl(0,   92%, 66%) 0%,
              hsl(30,  90%, 66%) 9%,
              hsl(60,  88%, 66%) 18%,
              hsl(90,  86%, 66%) 27%,
              hsl(120, 88%, 66%) 36%,
              hsl(150, 86%, 66%) 45%,
              hsl(180, 88%, 66%) 54%,
              hsl(210, 86%, 66%) 63%,
              hsl(240, 88%, 66%) 72%,
              hsl(270, 86%, 66%) 81%,
              hsl(300, 88%, 66%) 90%,
              hsl(360, 92%, 66%) 100%
            )`,
            backgroundSize: "200% 200%",
            backgroundPosition:
              "calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.5) * 100%)",
            filter: "hue-rotate(calc(var(--hue, 0) * 1deg)) saturate(1.3)",
            mixBlendMode: "screen",
            opacity: "calc(0.08 + var(--lift, 0) * 0.3)",
            transition: "opacity 400ms ease-out",
          }}
        />

        {/* Specular glare — bright spotlight following the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[28px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at calc(var(--mx, 0.5) * 100%) calc(var(--my, 0.5) * 100%), rgba(255,255,255,0.18), transparent 60%)",
            mixBlendMode: "screen",
            transition: "opacity 300ms ease-out",
            opacity: "calc(0.4 + var(--lift, 0) * 0.6)",
          }}
        />

        {/* Prismatic edge shimmer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[28px]"
          style={{
            backgroundImage: `
              linear-gradient(
                calc(105deg + var(--rx, 0) * 40deg),
                transparent 35%,
                rgba(255,120,180,0.12) 40%,
                rgba(120,200,255,0.14) 45%,
                rgba(160,255,180,0.12) 50%,
                rgba(255,220,80,0.10) 55%,
                transparent 60%
              )
            `,
            backgroundSize: "200% 200%",
            backgroundPosition:
              "calc(var(--mx, 0.5) * 120%) calc(var(--my, 0.5) * 120%)",
            mixBlendMode: "screen",
            opacity: "calc(0.2 + var(--lift, 0) * 0.5)",
            transition: "opacity 350ms ease-out",
          }}
        />

        {/* Inner border ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[1px] z-30 rounded-[27px]"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "inset 0 0 60px rgba(255,255,255,0.03)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
