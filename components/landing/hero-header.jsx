"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}

export default function HeroHeader() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const syncHeader = () => {
      const brandMark = document.getElementById("hero-brand-mark");

      if (!brandMark) {
        setProgress(0);
        return;
      }

      const brandRect = brandMark.getBoundingClientRect();
      const compactHeaderHeight = window.innerWidth < 640 ? 72 : 80;
      const revealLine = compactHeaderHeight + 12;
      const travelDistance = Math.max(brandRect.height * 0.58, 76);
      const nextProgress = clamp((revealLine - brandRect.top) / travelDistance, 0, 1);

      setProgress(nextProgress);
    };

    const requestSync = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        syncHeader();
      });
    };

    syncHeader();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const easedProgress = easeOutCubic(progress);
  const verticalPadding = 20 - 8 * easedProgress;
  const logoTranslateY = 10 * (1 - easedProgress);
  const ctaTranslateY = 12 * (1 - easedProgress);

  return (
    <div className="fixed inset-x-0 top-0 z-[80]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-header"
        style={{
          opacity: easedProgress,
          boxShadow: `0 18px 42px rgba(12, 4, 16, ${0.22 * easedProgress})`,
        }}
      />

      <div
        className="relative mx-auto flex max-w-[1260px] items-center justify-between px-4 sm:px-6 lg:px-10"
        style={{
          paddingTop: `${verticalPadding}px`,
          paddingBottom: `${verticalPadding}px`,
        }}
      >
        <div
          style={{
            opacity: easedProgress,
            transform: `translate3d(0, ${logoTranslateY}px, 0) scale(${0.94 + 0.06 * easedProgress})`,
            transformOrigin: "left center",
          }}
        >
          <Image
            src="/img/logo-sos-entrepreneur.png"
            alt="SOS Entrepreneur"
            width={64}
            height={58}
            priority
            className="h-auto w-[52px] sm:w-[64px]"
          />
        </div>

        <div
          style={{
            opacity: easedProgress,
            transform: `translate3d(0, ${ctaTranslateY}px, 0)`,
          }}
        >
          <Button
            id="hero-cta-target"
            size="sm"
            aria-hidden="true"
            tabIndex={-1}
            className="glow-button pointer-events-none h-10 min-w-[210px] border-0 px-7 text-base font-extrabold tracking-[-0.01em] text-white opacity-0"
          >
            <span>
              Candidater ici
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
