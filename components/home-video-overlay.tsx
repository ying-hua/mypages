"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import BalatroCard from "./balatro-card";
import BurnDissolve from "./burn-dissolve";

const TRIGGER_AT_SECONDS = 2.8;

export default function HomeVideoOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggeredRef = useRef(false);
  const [shown, setShown] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevBg = document.body.style.backgroundColor;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#000";

    const style = document.createElement("style");
    style.textContent = `
      body > footer { display: none !important; }
      body::after { opacity: 0.6; }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.backgroundColor = prevBg;
      style.remove();
    };
  }, []);

  // All close paths start the burn animation instead of instantly hiding the card.
  const startBurn = useCallback(() => {
    if (isBurning) return;
    setIsBurning(true);
  }, [isBurning]);

  // Called by BurnDissolve once the fire animation finishes.
  const onBurnComplete = useCallback(() => {
    setShown(false);
    setIsBurning(false);
  }, []);

  // ESC triggers burn.
  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") startBurn(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown, startBurn]);

  const onTimeUpdate = useCallback(() => {
    if (triggeredRef.current) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime >= TRIGGER_AT_SECONDS) {
      triggeredRef.current = true;
      setShown(true);
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        className="fixed inset-0 z-0 h-full w-full object-cover"
      />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/15 via-transparent to-black/30"
      />

      {shown && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="关闭卡片"
            onClick={startBurn}
            className="absolute inset-0 z-0 cursor-default bg-black/55 backdrop-blur-[2px]"
          />

          {/* Card — enters with spring animation, exits via BurnDissolve */}
          <motion.div
            className="relative z-10 h-[85vh] w-[92vw] max-w-6xl"
            initial={{ opacity: 0, scale: 0.82, y: 40, rotateX: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.9 }}
          >
            <BurnDissolve
              burning={isBurning}
              onComplete={onBurnComplete}
              className="h-full w-full"
            >
              <BalatroCard className="h-full w-full">
                <CardContent />
              </BalatroCard>
            </BurnDissolve>
          </motion.div>
        </div>
      )}
    </>
  );
}

function CardContent() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-8 py-12 md:px-16">
      <p
        style={{ fontFamily: "var(--font-caveat)" }}
        className="mb-4 text-2xl text-[#C68B59] tracking-wide"
      >
        嗨～从屏幕里掉出来一张卡片
      </p>

      <h2
        style={{ fontFamily: "var(--font-fraunces)" }}
        className="mb-8 text-center text-7xl font-black leading-[0.95] text-[#EDE4D8] md:text-9xl"
      >
        WELCOME
        <span className="block text-2xl font-normal italic text-[#D4643A] md:text-3xl mt-4">
          to Astro&apos;s little corner
        </span>
      </h2>

      <div className="my-2 h-px w-24 bg-[#C68B59]/40" />

      <p
        style={{ fontFamily: "var(--font-lora)" }}
        className="mt-6 max-w-2xl text-center text-base leading-relaxed text-[#8A7868] md:text-lg"
      >
        这是一张<span className="text-[#C68B59] font-semibold">镭射全息</span>风格的卡片。
        <br />
        试试把鼠标移到上面，看彩虹光怎么在卡面上漂移——
        <br />
        倾斜的角度会改变你看到的色彩。
      </p>

      <p
        style={{ fontFamily: "var(--font-caveat)" }}
        className="mt-12 text-xl text-[#C68B59]/70"
      >
        —— 鼠标移开后它会慢慢转回来
      </p>

      <p
        style={{ fontFamily: "var(--font-lora)" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#8A7868]/50"
      >
        ESC · 点击遮罩 · 关闭
      </p>
    </div>
  );
}
