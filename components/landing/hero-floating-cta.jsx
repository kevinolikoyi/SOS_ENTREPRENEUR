"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}

function buildOverlayLayout(sourceRect, targetRect, progress) {
  const easedProgress = easeOutCubic(progress);
  const scaleX = lerp(1, targetRect.width / Math.max(sourceRect.width, 1), easedProgress);
  const scaleY = lerp(1, targetRect.height / Math.max(sourceRect.height, 1), easedProgress);

  return {
    left: sourceRect.left,
    top: sourceRect.top,
    width: sourceRect.width,
    height: sourceRect.height,
    compact: easedProgress > 0.72,
    progress: easedProgress,
    transform: `translate3d(${lerp(0, targetRect.left - sourceRect.left, easedProgress)}px, ${lerp(0, targetRect.top - sourceRect.top, easedProgress)}px, 0) scale(${scaleX}, ${scaleY})`,
  };
}

export default function HeroFloatingCta() {
  const [overlay, setOverlay] = useState(null);
  const [shouldShake, setShouldShake] = useState(false);
  const rafRef = useRef(null);
  const snapshotRef = useRef(null);
  const shakeTimeoutRef = useRef(null);
  const wasPastCountdownRef = useRef(false);

  useEffect(() => {
    const getElements = () => {
      const source = document.getElementById("hero-cta-source");
      const target = document.getElementById("hero-cta-target");
      const trigger = document.getElementById("hero-cta-trigger");

      return { source, target, trigger };
    };

    const syncUrgency = () => {
      const countdown = document.getElementById("countdown");

      if (!countdown) {
        wasPastCountdownRef.current = false;
        setShouldShake(false);
        return;
      }

      const countdownRect = countdown.getBoundingClientRect();
      const compactHeaderHeight = window.innerWidth < 640 ? 72 : 80;
      const isPastCountdown = countdownRect.bottom <= compactHeaderHeight + 16;

      if (isPastCountdown && !wasPastCountdownRef.current) {
        setShouldShake(true);

        if (shakeTimeoutRef.current !== null) {
          window.clearTimeout(shakeTimeoutRef.current);
        }

        shakeTimeoutRef.current = window.setTimeout(() => {
          shakeTimeoutRef.current = null;
          setShouldShake(false);
        }, 820);
      }

      if (!isPastCountdown && wasPastCountdownRef.current) {
        setShouldShake(false);

        if (shakeTimeoutRef.current !== null) {
          window.clearTimeout(shakeTimeoutRef.current);
          shakeTimeoutRef.current = null;
        }
      }

      wasPastCountdownRef.current = isPastCountdown;
    };

    const setSourceVisible = (visible) => {
      const { source } = getElements();
      if (!source) {
        return;
      }

      source.style.opacity = visible ? "1" : "0";
      source.style.pointerEvents = visible ? "auto" : "none";
    };

    const syncOverlay = () => {
      const { source, target, trigger } = getElements();
      syncUrgency();

      if (!source || !target || !trigger) {
        snapshotRef.current = null;
        setOverlay(null);
        return;
      }

      const currentTargetRect = target.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      const currentThreshold = currentTargetRect.bottom + 8;

      if (!snapshotRef.current && triggerRect.bottom <= currentThreshold) {
        const sourceRect = source.getBoundingClientRect();

        snapshotRef.current = {
          sourceRect,
          threshold: currentThreshold,
          travelDistance: Math.max(sourceRect.top - currentTargetRect.top, 180),
        };
      }

      if (!snapshotRef.current) {
        setSourceVisible(true);
        setOverlay(null);
        return;
      }

      const { sourceRect, threshold, travelDistance } = snapshotRef.current;
      const progress = clamp((threshold - triggerRect.bottom) / travelDistance, 0, 1);

      if (progress <= 0 && triggerRect.bottom > threshold) {
        snapshotRef.current = null;
        setSourceVisible(true);
        setOverlay(null);
        return;
      }

      setSourceVisible(false);
      setOverlay(buildOverlayLayout(sourceRect, currentTargetRect, progress));
    };

    const requestSync = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        syncOverlay();
      });
    };

    syncOverlay();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      setSourceVisible(true);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (shakeTimeoutRef.current !== null) {
        window.clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, []);

  if (!overlay) {
    return null;
  }

  const fontSizeClass = overlay.compact ? "text-base font-extrabold tracking-[-0.01em]" : "text-base";
  const arrowOpacity = Math.max(0, 1 - overlay.progress * 1.35);
  const arrowWidth = 16 * arrowOpacity;

  return (
    <div
      className="pointer-events-none fixed z-[81] will-change-transform"
      style={{
        left: `${overlay.left}px`,
        top: `${overlay.top}px`,
        width: `${overlay.width}px`,
        height: `${overlay.height}px`,
        transform: overlay.transform,
        transformOrigin: "top left",
      }}
    >
      <Button
        asChild
        size="lg"
        className={`glow-button pointer-events-auto h-full w-full border-0 px-6 font-black text-white transition-none hover:translate-y-0 ${fontSizeClass} ${shouldShake ? "urgent-cta" : ""}`}
        style={{ gap: `${8 * arrowOpacity}px` }}
      >
        <a href="https://ee.kobotoolbox.org/x/f9y48cRE" target="_blank" rel="noreferrer">
          <span>Candidater ici</span>
          <span
            aria-hidden="true"
            className="inline-flex shrink-0 overflow-hidden transition-none"
            style={{ opacity: arrowOpacity, width: `${arrowWidth}px` }}
          >
            <ArrowRight />
          </span>
        </a>
      </Button>
    </div>
  );
}
