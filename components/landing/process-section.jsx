import SectionHeading from "@/components/landing/section-heading";

const steps = [
  "Tu soumets ton cas avec les informations essentielles.",
  "Nous etudions les candidatures retenues pour l'edition.",
  "3 entrepreneurs et 1 porteur de projet sont accompagnes.",
];

export default function ProcessSection() {
  return (
    <section className="reference-surface">
      <div className="mx-auto max-w-6xl px-4 pb-0 pt-0 sm:px-6">
        <div className="mt-16">
          <SectionHeading badge="Processus" title="Comment ca" accent="marche" />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((item, index) => (
              <article key={item} className="reference-card rounded-[1.8rem] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-soft">
                  Etape 0{index + 1}
                </p>
                <p className="mt-4 text-sm leading-8 text-white/82 sm:text-[15px]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
