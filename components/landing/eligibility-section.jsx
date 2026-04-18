"use client";

import { useEffect, useState } from "react";

const criteria = [
  {
    text: "Tu vis une difficulté concrète dans ton activité.",
    image: "/img/problem.png",
    position: "center 38%",
  },
  {
    text: "Ton projet existe déjà ou repose sur une base sérieuse.",
    image: "/img/project.jpg",
    position: "center 52%",
  },
  {
    text: "Tu es prêt à agir rapidement si tu es sélectionné.",
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
  const [sectionProgress, setSectionProgress] = useState(0);

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

        setSectionProgress(progress);
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

  const orbReveal = Math.min(sectionProgress / 0.16, 1);
  const orbVerticalProgress = Math.min(sectionProgress / 0.88, 1);
  const orbTop = 10 + orbVerticalProgress * 74;
  const orbTranslateX = -130 + orbReveal * 162;
  const orbScale = 0.55 + orbReveal * 0.45;
  const orbGlowScale = 0.8 + orbReveal * 0.45;

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
          <div className="max-w-5xl">
            <div className="eligibility-kicker mx-auto w-fit px-5 py-2 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white sm:text-base">
                Tu peux postuler si
              </p>
            </div>
            
            <h2 className="eligibility-title mx-auto mt-7 max-w-[13ch] text-4xl text-white sm:mt-8 sm:text-6xl lg:text-[5.2rem]">
              {criteria[activeIndex].text}
            </h2>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-0 z-20"
          style={{
            top: `${orbTop}%`,
            transform: `translate3d(${orbTranslateX}px, -50%, 0)`,
          }}
        >
          <div
            className="eligibility-orb flex items-center justify-center"
            style={{
              transform: `scale(${orbScale})`,
            }}
          >
            <div
              className="eligibility-orb-glow"
              style={{
                transform: `translate(-50%, -50%) scale(${orbGlowScale})`,
                opacity: 0.2 + orbReveal * 0.35,
              }}
            />
            <div className="eligibility-orb-core">
              <span className="eligibility-orb-step">0{activeIndex + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
