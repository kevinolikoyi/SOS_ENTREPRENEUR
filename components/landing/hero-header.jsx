"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.getElementById("hero-cta-trigger");
      const target = document.getElementById("hero-cta-target");

      if (!trigger || !target) {
        return;
      }

      const triggerRect = trigger.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setIsScrolled(triggerRect.bottom <= targetRect.bottom + 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        isScrolled ? "hero-header shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1260px] items-center justify-between px-4 sm:px-6 lg:px-10 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <Image
          src="/img/logo-sos-entrepreneur.png"
          alt="SOS Entrepreneur"
          width={64}
          height={58}
          priority
          className="h-auto w-[52px] sm:w-[64px]"
        />

        <div
          className={`transition-all duration-500 ${
            isScrolled ? "translate-y-0 opacity-100" : "opacity-0"
          }`}
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
