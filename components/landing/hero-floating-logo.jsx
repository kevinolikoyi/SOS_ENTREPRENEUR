"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    progress: easedProgress,
    transform: `translate3d(${lerp(0, targetRect.left - sourceRect.left, easedProgress)}px, ${lerp(0, targetRect.top - sourceRect.top, easedProgress)}px, 0) scale(${scaleX}, ${scaleY})`,
  };
}

export default function HeroFloatingLogo() {
  const [overlay, setOverlay] = useState(null);
  const rafRef = useRef(null);
  const snapshotRef = useRef(null);

  useEffect(() => {
    const getElements = () => {
      const source = document.getElementById("hero-brand-mark");
      const target = document.getElementById("hero-logo-target");

      return { source, target };
    };

    const setSourceVisible = (visible) => {
      const { source } = getElements();
      if (!source) {
        return;
      }

      source.style.opacity = visible ? "1" : "0";
    };

    const syncOverlay = () => {
      const { source, target } = getElements();

      if (!source || !target) {
        snapshotRef.current = null;
        setOverlay(null);
        return;
      }

      const currentSourceRect = source.getBoundingClientRect();
      const currentTargetRect = target.getBoundingClientRect();
      const threshold = currentTargetRect.bottom + 24;

      if (!snapshotRef.current && currentSourceRect.top <= threshold) {
        snapshotRef.current = {
          sourceRect: currentSourceRect,
          threshold,
          travelDistance: Math.max(currentSourceRect.top - currentTargetRect.top + 56, 132),
        };
      }

      if (!snapshotRef.current) {
        setSourceVisible(true);
        setOverlay(null);
        return;
      }

      const { sourceRect, travelDistance } = snapshotRef.current;
      const progress = clamp((sourceRect.top - currentSourceRect.top) / travelDistance, 0, 1);

      if (progress <= 0 && currentSourceRect.top > threshold) {
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
    };
  }, []);

  if (!overlay) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[82] will-change-transform"
      style={{
        left: `${overlay.left}px`,
        top: `${overlay.top}px`,
        width: `${overlay.width}px`,
        height: `${overlay.height}px`,
        transform: overlay.transform,
        transformOrigin: "top left",
      }}
    >
      <Image
        src="/img/logo-sos-entrepreneur.png"
        alt=""
        fill
        priority
        className="object-contain"
        sizes="(max-width: 640px) 132px, (max-width: 1024px) 168px, 220px"
      />
    </div>
  );
}
