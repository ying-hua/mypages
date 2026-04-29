"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

// ─── Noise config ────────────────────────────────────────────────────────────
const NW = 220;   // offscreen canvas width  (lower = chunkier fire, faster)
const NH = 165;   // offscreen canvas height
const DURATION = 900; // ms
const BURN_SIZE = 0.075; // width of the glowing edge band (0–1 noise range)

// Smooth value noise (bilinear interpolation on a random grid)
function makeNoise(w: number, h: number): Float32Array {
  const gs = 24; // grid cell size in pixels
  const gw = Math.ceil(w / gs) + 2;
  const gh = Math.ceil(h / gs) + 2;
  const grid = new Float32Array(gw * gh);
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random();

  const fade = (t: number) => t * t * (3 - 2 * t);
  const at = (xi: number, yi: number) =>
    grid[Math.min(yi, gh - 1) * gw + Math.min(xi, gw - 1)];

  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const fx = x / gs, fy = y / gs;
      const ix = Math.floor(fx), iy = Math.floor(fy);
      const tx = fade(fx - ix), ty = fade(fy - iy);
      out[y * w + x] =
        at(ix,   iy  ) * (1 - tx) * (1 - ty) +
        at(ix+1, iy  ) *  tx      * (1 - ty) +
        at(ix,   iy+1) * (1 - tx) *  ty      +
        at(ix+1, iy+1) *  tx      *  ty;
    }
  }
  return out;
}

// ─── Shader logic (mirrors the Godot fragment shader) ────────────────────────
// dv goes 1 (fully visible) → 0 (fully dissolved), matching Godot's convention.
//
//   threshold = smoothstep(n – bs, n, dv)   → card alpha
//   border    = smoothstep(n, n + bs, dv)   → mix(burn_color, texture, border)
//   fire      = threshold × (1 – border)    → glow band intensity
//
// Linear approximation of smoothstep is fast enough for per-pixel JS:
const c01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

// ─── Component ───────────────────────────────────────────────────────────────
type Props = {
  burning: boolean;
  onComplete: () => void;
  children: ReactNode;
  className?: string;
};

export default function BurnDissolve({
  burning, onComplete, children, className,
}: Props) {
  const innerRef  = useRef<HTMLDivElement>(null);
  const fireRef   = useRef<HTMLCanvasElement>(null);
  const noiseRef  = useRef<Float32Array | null>(null);
  const maskCvs   = useRef<HTMLCanvasElement | null>(null);
  const rafRef    = useRef<number | null>(null);
  const t0Ref     = useRef<number | null>(null);

  // Generate noise + allocate offscreen mask canvas once.
  useEffect(() => {
    noiseRef.current = makeNoise(NW, NH);
    const c = document.createElement("canvas");
    c.width = NW; c.height = NH;
    maskCvs.current = c;
  }, []);

  const stopAnim = useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    t0Ref.current = null;
  }, []);

  useEffect(() => {
    if (!burning) { stopAnim(); return; }

    const noise = noiseRef.current;
    const mc    = maskCvs.current;
    const inner = innerRef.current;
    const fireEl = fireRef.current;
    if (!noise || !mc || !inner || !fireEl) return;

    const mctx  = mc.getContext("2d")!;
    const fctx  = fireEl.getContext("2d")!;

    // Pre-allocate ImageData so we don't re-allocate each frame.
    const mImg  = mctx.createImageData(NW, NH);
    const fImg  = fctx.createImageData(NW, NH);
    const md    = mImg.data;
    const fd    = fImg.data;

    // Prefill mask alpha channel with 255 (we only update the alpha byte).
    for (let i = 0; i < NW * NH; i++) {
      const j = i << 2;
      md[j] = md[j+1] = md[j+2] = 255;
    }

    function frame(now: number) {
      if (t0Ref.current === null) t0Ref.current = now;
      const progress = Math.min(1, (now - t0Ref.current) / DURATION);
      const dv = 1 - progress; // 1→0

      // Zero the burn_size at the endpoints to avoid artefacts (Godot does the same).
      const bs = BURN_SIZE * (dv > 0.004 && dv < 0.996 ? 1 : 0);
      const bsInv = bs > 0 ? 1 / bs : 1e5;

      for (let i = 0; i < NW * NH; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const n = noise![i];
        const threshold = c01((dv - n + bs) * bsInv); // 1=intact, 0=dissolved
        const border    = c01((dv - n)      * bsInv); // 1=past burn, 0=at boundary
        const fire      = threshold * (1 - border);   // glow band intensity

        const j = i << 2;

        // Mask: alpha = threshold (white with variable alpha → CSS mask)
        md[j+3] = (threshold * 255 + 0.5) | 0;

        // Fire overlay: orange-yellow glow at the burning edge
        if (fire > 0.015) {
          const heat = 1 - border; // 1 = hottest (boundary), 0 = cooler
          fd[j]   = 255;
          fd[j+1] = ((170 - heat * 120) + 0.5) | 0; // 170 → 50
          fd[j+2] = ((35  - heat * 33 ) + 0.5) | 0; // 35  → 2
          fd[j+3] = (fire * 255 + 0.5) | 0;
        } else {
          fd[j+3] = 0;
        }
      }

      // Write mask to offscreen canvas and extract as data URL → CSS mask.
      mctx.putImageData(mImg, 0, 0);
      const url = mc!.toDataURL("image/png");
      inner!.style.setProperty("-webkit-mask-image", `url(${url})`);
      inner!.style.setProperty("mask-image",         `url(${url})`);

      // Draw fire overlay.
      fctx.putImageData(fImg, 0, 0);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        // Clean up and signal completion.
        inner!.style.removeProperty("-webkit-mask-image");
        inner!.style.removeProperty("mask-image");
        rafRef.current = null;
        t0Ref.current  = null;
        onComplete();
      }
    }

    rafRef.current = requestAnimationFrame(frame);
    return stopAnim;
  }, [burning, onComplete, stopAnim]);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* This div receives the CSS mask — its children dissolve pixel-by-pixel. */}
      <div
        ref={innerRef}
        className="h-full w-full"
        style={{ WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}
      >
        {children}
      </div>

      {/* Fire/glow overlay — positioned on top, outside the masked layer. */}
      <canvas
        ref={fireRef}
        width={NW}
        height={NH}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
