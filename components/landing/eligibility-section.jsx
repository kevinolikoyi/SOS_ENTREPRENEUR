import { CheckCircle2 } from "lucide-react";

import SectionHeading from "@/components/landing/section-heading";

const criteria = [
  "Tu vis une difficulte concrete dans ton activite.",
  "Ton projet existe deja ou repose sur une base serieuse.",
  "Tu es pret a agir rapidement si tu es selectionne.",
  "Tu ne cherches pas seulement de l'argent, mais une vraie relance.",
];

export default function EligibilitySection() {
  return (
    <section className="reference-surface">
      <div className="mx-auto max-w-6xl px-4 pb-0 pt-0 sm:px-6">
        <div className="mt-16">
          <SectionHeading badge="Eligibilite" title="Qui peut" accent="postuler ?" />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {criteria.map((item) => (
              <article key={item} className="reference-card rounded-[1.8rem] p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-brand-glow">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <p className="text-sm leading-8 text-white/82 sm:text-[15px]">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
