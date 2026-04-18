import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ApplicationSection() {
  return (
    <section className="reference-surface tight-sections">
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 section-inner">
        <div
          id="postuler"
          className="reference-cta mt-8 rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                Candidature
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.96] tracking-tight text-white sm:text-5xl">
                Candidater ici
                <span className="block text-brand-soft">maintenant.</span>
              </h2>
              <p className="mt-4 text-base leading-8 text-white">
                Chaque édition retient un nombre limité de profils. Si ton activité peut
                rebondir avec le bon accompagnement, c'est le moment de te signaler.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="glow-button min-w-[240px] border-0 px-7 text-base text-white"
              >
                <a href="https://ee.kobotoolbox.org/x/f9y48cRE" target="_blank" rel="noreferrer">
                  Candidater ici
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/16 bg-white/8 px-7 text-base text-white hover:bg-white/14"
              >
                <a href="mailto:contact@sosentrepreneur.bj">
                  Nous contacter
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
