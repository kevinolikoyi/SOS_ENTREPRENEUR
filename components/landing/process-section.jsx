"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const steps = [
  {
    label: "Étape 01",
    title: "Candidature",
    description: "Tu remplis le formulaire que tu peux trouver en cliquant sur le lien « Candidater ici ».",
  },
  {
    label: "Étape 02",
    title: "Pré-sélection",
    description:
      "Ton dossier est vérifié pour confirmer que ton profil, ton problème et ton projet correspondent aux critères du programme puis 100 personnes sont présélectionnées.",
  },
  {
    label: "Étape 03",
    title: "Sélection des 10",
    description:
      "Si tu fais partie des 100 présélectionnés, tu feras une vidéo d’une minute dans laquelle tu vendras ton produit, ton service ou ton idée pendant les 30 premières secondes, puis tu exposeras ton problème, tes difficultés ou tes besoins pendant les 30 secondes suivantes, afin de faire la minute requise. Les 100 vidéos seront postées sur la page \"Richard ODJRADO\". Ta vidéo et ton projet sont évalués en fonction de l'engagement du public et de la solidité de ton idée ou de ton entreprise. Les 10 candidats les plus convaincants deviennent finalistes.",
  },
  {
    label: "Étape 04",
    title: "Passage au top 5",
    description:
      "Si tu fais partie des 10, tu participes aux challenges terrain et aux votes publics. À la fin, 5 profils continuent vers la grande finale.",
  },
  {
    label: "Étape 05",
    title: "Finale",
    description:
      "Tu entres en immersion avec coaching, simulation business et pitch final pour défendre ton projet et montrer ta capacité à passer à l'action. A l'issus de cette phase, seulement 3 vainqueurs seront retenus pour bénéficier du programme \"SOS ENTREPRENEUR\"",
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getBetweenProgress(position, start, end) {
  return clamp((position - start) / Math.max(end - start, 1), 0, 1);
}

export default function ProcessSection() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [routeProgress, setRouteProgress] = useState(0);
  const [desktopLayout, setDesktopLayout] = useState({
    leftSpacerHeights: [0, 0],
    rightSpacerHeights: [0, 0],
  });
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleViewport();
    window.addEventListener("resize", handleViewport);

    return () => {
      window.removeEventListener("resize", handleViewport);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) {
      setDesktopLayout({
        leftSpacerHeights: [0, 0],
        rightSpacerHeights: [0, 0],
      });
      return;
    }

    let frameId = 0;

    const measureDesktopLayout = () => {
      const [card1, card2, card3, card4] = cardRefs.current;

      if (!card1 || !card2 || !card3 || !card4) {
        return;
      }

      const nextLayout = {
        leftSpacerHeights: [card2.offsetHeight, card4.offsetHeight],
        rightSpacerHeights: [card1.offsetHeight, card3.offsetHeight],
      };

      setDesktopLayout((currentLayout) => {
        if (
          currentLayout.leftSpacerHeights[0] === nextLayout.leftSpacerHeights[0] &&
          currentLayout.leftSpacerHeights[1] === nextLayout.leftSpacerHeights[1] &&
          currentLayout.rightSpacerHeights[0] === nextLayout.rightSpacerHeights[0] &&
          currentLayout.rightSpacerHeights[1] === nextLayout.rightSpacerHeights[1]
        ) {
          return currentLayout;
        }

        return nextLayout;
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measureDesktopLayout);
    });

    cardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    measureDesktopLayout();
    window.addEventListener("resize", measureDesktopLayout);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureDesktopLayout);
    };
  }, [isDesktop]);

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
        const cardCenters = cards.map((card) => {
          const rect = card.getBoundingClientRect();

          return rect.top + rect.height / 2;
        });
        let nextIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;

        cardCenters.forEach((cardCenter, index) => {
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < bestDistance) {
            bestDistance = distance;
            nextIndex = index;
          }
        });

        if (cardCenters.length >= 2) {
          setRouteProgress(getBetweenProgress(viewportCenter, cardCenters[0], cardCenters[cardCenters.length - 1]));
        }

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

  const renderCard = (step, index, extraClassName = "") => {
    const stepNumber = String(index + 1).padStart(2, "0");

    return (
      <div key={step.title} className={`process-card-slot ${extraClassName}`.trim()}>
        <div
          ref={(node) => {
            cardRefs.current[index] = node;
          }}
        >
          <article
            className={`process-card rounded-[2rem] p-7 transition-all duration-500 sm:p-8 ${
              activeIndex === index ? "process-card-active" : "process-card-muted"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-soft">{step.label}</p>
                <h3 className="mt-4 max-w-[16ch] text-2xl font-black leading-[1] tracking-tight text-white sm:text-[2rem]">
                  {step.title}
                </h3>
              </div>

              <div className="process-card-index flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e52e76] text-sm font-black text-white sm:size-14 sm:text-base">
                {stepNumber}
              </div>
            </div>

            <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white sm:text-[15px]">{step.description}</p>
          </article>
        </div>
      </div>
    );
  };

  return (
    <section id="process" className="reference-surface relative py-16 sm:py-20 lg:py-24">
      <div className="process-stage relative overflow-visible">
        <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#0e3b61]/48 sm:text-sm">Parcours</p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tight text-[#0e3b61] sm:text-6xl lg:text-[5.2rem]">
              Comment ça
              <span className="block text-brand-glow">marche</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-16 w-full">
            {isDesktop ? (
              <div
                className="process-path-grid relative"
                style={{
                  "--process-route-progress": `${routeProgress * 100}%`,
                }}
              >
                <div className="process-route-network" aria-hidden="true">
                  <span className="process-route-line-base" />
                  <span className="process-route-line-glow" />
                </div>

                <div className="process-column process-column-left">
                  {renderCard(steps[0], 0, "process-card-slot-1")}
                  <div
                    aria-hidden="true"
                    className="process-spacer"
                    style={{ height: `${desktopLayout.leftSpacerHeights[0]}px` }}
                  />
                  {renderCard(steps[2], 2, "process-card-slot-3")}
                  <div
                    aria-hidden="true"
                    className="process-spacer"
                    style={{ height: `${desktopLayout.leftSpacerHeights[1]}px` }}
                  />
                  {renderCard(steps[4], 4, "process-card-slot-5")}
                </div>

                <div className="process-column process-column-right">
                  <div
                    aria-hidden="true"
                    className="process-spacer"
                    style={{ height: `${desktopLayout.rightSpacerHeights[0]}px` }}
                  />
                  {renderCard(steps[1], 1, "process-card-slot-2")}
                  <div
                    aria-hidden="true"
                    className="process-spacer"
                    style={{ height: `${desktopLayout.rightSpacerHeights[1]}px` }}
                  />
                  {renderCard(steps[3], 3, "process-card-slot-4")}
                </div>
              </div>
            ) : (
              <div
                className="process-path-grid relative"
                style={{
                  "--process-route-progress": `${routeProgress * 100}%`,
                }}
              >
                <div className="process-route-network" aria-hidden="true">
                  <span className="process-route-line-base" />
                  <span className="process-route-line-glow" />
                </div>

                {steps.map((step, index) => renderCard(step, index, `process-card-slot-${index + 1}`))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
