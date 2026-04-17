import { BriefcaseBusiness, Handshake, Wallet } from "lucide-react";

import SectionHeading from "@/components/landing/section-heading";

const helpItems = [
  {
    icon: BriefcaseBusiness,
    title: "Accompagnement strategique",
    description:
      "Nous analysons ta situation et nous t'aidons a remettre ton activite dans une direction claire et realiste.",
  },
  {
    icon: Handshake,
    title: "Mise en relation",
    description:
      "Tu peux etre connecte aux bons partenaires, mentors et relais utiles pour accelerer ton rebond.",
  },
  {
    icon: Wallet,
    title: "Orientation financiere",
    description:
      "Quand c'est pertinent, nous t'orientons vers des solutions adaptees a ton niveau de maturite.",
  },
];

export default function SupportSection() {
  return (
    <section className="reference-surface tight-sections">
      <div className="mx-auto max-w-6xl px-4 section-inner-padded">
        <SectionHeading
            title="On ne te laisse"
          accent="pas tomber."
        />

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {helpItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.8rem] border border-[#ff8fd7] bg-brand-glow p-6 shadow-[0_18px_45px_rgba(255,65,187,0.28)] sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-[#24112c]/10 bg-white text-brand-glow shadow-[0_10px_24px_rgba(36,17,44,0.12)]">
                    <Icon className="size-7" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-[#24112c]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-[#24112c]/80 sm:text-[15px]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
