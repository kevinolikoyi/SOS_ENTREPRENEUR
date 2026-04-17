"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    label: "Etape 01",
    title: "Tu soumets ton cas",
    description:
      "Tu partages l'essentiel de ta situation, les blocages du moment et ce qui merite d'etre relance rapidement.",
  },
  {
    label: "Etape 02",
    title: "Nous etudions ton dossier",
    description:
      "Les candidatures sont relues pour identifier les projets les plus solides, les plus urgents et les plus actionnables.",
  },
  {
    label: "Etape 03",
    title: "Les profils retenus sont accompagnes",
    description:
      "3 entrepreneurs et 1 porteur de projet beneficient d'un accompagnement concret pour relancer leur trajectoire.",
  },
];

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const section = document.getElementById("process");

        if (!section) {
          ticking = false;
          return;
        }

        const start = section.offsetTop;
        const end = start + section.offsetHeight - window.innerHeight;
        const rawProgress = end <= start ? 0 : (window.scrollY - start) / (end - start);
        const progress = Math.min(0.999, Math.max(0, rawProgress));
        const nextIndex = Math.min(
          steps.length - 1,
          Math.floor(progress * steps.length)
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
    <section id="process" className="reference-surface relative py-16 lg:h-[220vh] lg:py-0">
      <div className="process-stage relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.88fr_minmax(0,1.12fr)] lg:gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#24112c]/42 sm:text-sm">
                Parcours
              </p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tight text-[#24112c] sm:text-6xl lg:text-[5.2rem]">
                Comment ca
                <span className="block text-brand-glow">marche</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-[#24112c]/68 sm:text-lg">
                Tu suis un chemin simple, lisible et progressif: candidature,
                etude du dossier, puis accompagnement des profils retenus.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[720px]">
              <div className="process-path-grid relative">
                <div className="process-card-slot process-card-slot-1">
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

                <div className="process-route process-route-1" aria-hidden="true">
                  <svg className="h-full w-full" viewBox="0 0 240 160" fill="none" preserveAspectRatio="none">
                    <path className="process-route-base" d="M22 12 H208 V78 H42 V148" />
                    <path className="process-route-glow" d="M22 12 H208 V78 H42 V148" />
                  </svg>
                </div>

                <div className="process-card-slot process-card-slot-2">
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

                <div className="process-route process-route-2" aria-hidden="true">
                  <svg className="h-full w-full" viewBox="0 0 240 160" fill="none" preserveAspectRatio="none">
                    <path className="process-route-base" d="M218 12 H32 V78 H198 V148" />
                    <path className="process-route-glow" d="M218 12 H32 V78 H198 V148" />
                  </svg>
                </div>

                <div className="process-card-slot process-card-slot-3">
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
