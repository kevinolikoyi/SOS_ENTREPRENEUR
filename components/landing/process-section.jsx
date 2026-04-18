"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Étape 01",
    title: "Tu remplis le formulaire",
    description:
      "Tu remplis le formulaire en cliquant sur le lien « Candidater ici ». Ensuite, tu publies sur ton réseau une vidéo où tu essaies de vendre ton produit, ton service ou ton idée, tu poses ton problème et tu identifies nos réseaux dans la vidéo.",
  },
  {
    label: "Étape 02",
    title: "Les projets sont analysés",
    description:
      "Les projets sont analysés en fonction de leur pertinence et de leur impact après la vidéo, notamment selon le nombre de ventes par rapport au nombre de vues.",
  },
  {
    label: "Étape 03",
    title: "Les profils retenus sont accompagnés",
    description:
      "Les profils retenus sont 2 entrepreneurs et 1 porteur de projet. L'accompagnement va de 30 000 à 1 million.",
  },
];

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const cards = cardRefs.current.filter(Boolean);

        if (!cards.length) {
          ticking = false;
          return;
        }

        const viewportCenter = window.innerHeight * 0.52;
        let nextIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < bestDistance) {
            bestDistance = distance;
            nextIndex = index;
          }
        });

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
    <section id="process" className="reference-surface relative py-16 sm:py-20 lg:py-24">
      <div className="process-stage relative overflow-visible">
        <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#24112c]/42 sm:text-sm">
              Parcours
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tight text-[#24112c] sm:text-6xl lg:text-[5.2rem]">
              Comment ça
              <span className="block text-brand-glow">marche</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-16 w-full">
            <div className="process-path-grid relative">
              <div className="process-route-network" aria-hidden="true">
                <svg className="h-full w-full" viewBox="0 0 1200 880" fill="none" preserveAspectRatio="none">
                  <path className="process-route-base" d="M500 188 H770 V366 H700" />
                  <path className="process-route-glow" d="M500 188 H770 V366 H700" />
                  <path className="process-route-base" d="M700 516 H430 V694 H500" />
                  <path className="process-route-glow" d="M700 516 H430 V694 H500" />
                </svg>
              </div>

              <div className="process-card-slot process-card-slot-1">
                <div
                  ref={(node) => {
                    cardRefs.current[0] = node;
                  }}
                >
                  <article
                    className={`process-card rounded-[2rem] p-7 transition-all duration-500 sm:p-8 ${
                      activeIndex === 0 ? "process-card-active" : "process-card-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-soft">
                          {steps[0].label}
                        </p>
                        <h3 className="mt-4 max-w-[16ch] text-2xl font-black leading-[1] tracking-tight text-white sm:text-[2rem]">
                          {steps[0].title}
                        </h3>
                      </div>

                      <div className="process-card-index flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f514a2] text-sm font-black text-white sm:size-14 sm:text-base">
                        01
                      </div>
                    </div>

                    <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white sm:text-[15px]">
                      {steps[0].description}
                    </p>
                  </article>
                </div>
              </div>

              <div className="process-card-slot process-card-slot-2">
                <div
                  ref={(node) => {
                    cardRefs.current[1] = node;
                  }}
                >
                  <article
                    className={`process-card rounded-[2rem] p-7 transition-all duration-500 sm:p-8 ${
                      activeIndex === 1 ? "process-card-active" : "process-card-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-soft">
                          {steps[1].label}
                        </p>
                        <h3 className="mt-4 max-w-[16ch] text-2xl font-black leading-[1] tracking-tight text-white sm:text-[2rem]">
                          {steps[1].title}
                        </h3>
                      </div>

                      <div className="process-card-index flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f514a2] text-sm font-black text-white sm:size-14 sm:text-base">
                        02
                      </div>
                    </div>

                    <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white sm:text-[15px]">
                      {steps[1].description}
                    </p>
                  </article>
                </div>
              </div>

              <div className="process-card-slot process-card-slot-3">
                <div
                  ref={(node) => {
                    cardRefs.current[2] = node;
                  }}
                >
                  <article
                    className={`process-card rounded-[2rem] p-7 transition-all duration-500 sm:p-8 ${
                      activeIndex === 2 ? "process-card-active" : "process-card-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-soft">
                          {steps[2].label}
                        </p>
                        <h3 className="mt-4 max-w-[16ch] text-2xl font-black leading-[1] tracking-tight text-white sm:text-[2rem]">
                          {steps[2].title}
                        </h3>
                      </div>

                      <div className="process-card-index flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f514a2] text-sm font-black text-white sm:size-14 sm:text-base">
                        03
                      </div>
                    </div>

                    <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white sm:text-[15px]">
                      {steps[2].description}
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
