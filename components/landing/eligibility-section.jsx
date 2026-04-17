"use client";

import { useEffect, useState } from "react";

const criteria = [
  {
    text: "Tu vis une difficulte concrete dans ton activite.",
    image: "/img/problem.png",
    position: "center 38%",
  },
  {
    text: "Ton projet existe deja ou repose sur une base serieuse.",
    image: "/img/project.jpg",
    position: "center 52%",
  },
  {
    text: "Tu es pret a agir rapidement si tu es selectionne.",
    image: "/img/problem.png",
    position: "center 62%",
  },
  {
    text: "Tu ne cherches pas seulement de l'argent, mais une vraie relance.",
    image: "/img/project.jpg",
    position: "center 34%",
  },
];

export default function EligibilitySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const section = document.getElementById("eligibility");

        if (!section) {
          ticking = false;
          return;
        }

        const start = section.offsetTop;
        const end = start + section.offsetHeight - window.innerHeight;
        const rawProgress = end <= start ? 0 : (window.scrollY - start) / (end - start);
        const progress = Math.min(0.999, Math.max(0, rawProgress));
        const nextIndex = Math.min(
          criteria.length - 1,
          Math.floor(progress * criteria.length)
        );

        setActiveIndex(nextIndex);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="eligibility" className="relative h-[320vh]">
      <div className="eligibility-stage sticky top-0 h-screen overflow-hidden">
        {criteria.map((item, index) => (
          <div
            key={item.text}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
              index === activeIndex ? "scale-100 opacity-30" : "scale-105 opacity-0"
            }`}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundPosition: item.position,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,8,21,0.1)_0%,rgba(17,8,21,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.06),transparent_28%)]" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/55 sm:text-sm">
              Critere 0{activeIndex + 1}
            </p>
            <p className="mt-6 text-3xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-[4.4rem]">
              {criteria[activeIndex].text}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 sm:bottom-10">
          <div className="eligibility-pill flex w-full max-w-[430px] items-center justify-between gap-4 rounded-full px-4 py-4 sm:px-5">
            <div className="min-w-0 text-left">
            
              <p className="truncate text-lg font-semibold text-white sm:text-[1.65rem]">
                Qui peut postuler ?
              </p>
            </div>

            <div className="eligibility-pill-badge flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-black text-white sm:size-14 sm:text-base">
              0{activeIndex + 1}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
