import Image from "next/image";
import { BriefcaseBusiness, Handshake, Wallet } from "lucide-react";

const helpItems = [
  {
    icon: BriefcaseBusiness,
    image: "/img/diagnostic.png",
    imageWidth: 1536,
    imageHeight: 1024,
    imageClassName: "object-cover object-center",
    eyebrow: "Diagnostic",
    title: "Accompagnement stratégique",
    description:
      "Nous analysons ta situation et nous t'aidons à remettre ton activité dans une direction claire et réaliste.",
  },
  {
    icon: Handshake,
    image: "/img/connexion.png",
    imageWidth: 1536,
    imageHeight: 1024,
    imageClassName: "object-cover object-center",
    eyebrow: "Connexions",
    title: "Mise en relation",
    description:
      "Tu peux être connecté aux bons partenaires, mentors et relais utiles pour accélérer ton rebond, ton développement ou ta croissance.",
  },
  {
    icon: Wallet,
    image: "/img/solution.png",
    imageWidth: 1536,
    imageHeight: 1024,
    imageClassName: "object-cover object-center",
    eyebrow: "Solutions",
    title: "Orientation financière",
    description:
      "Quand c'est pertinent, nous t'orientons vers des solutions adaptées à ton niveau de maturité.",
  },
];

export default function SupportSection() {
  return (
    <section className="support-stage tight-sections">
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black leading-[0.92] tracking-[-0.05em] text-[#0e3b61] sm:text-5xl lg:text-[4.5rem]">
            On te laisse
            <span className="block text-brand-glow">pas tomber.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-9">
          {helpItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="support-card">
                <div className="support-card-media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    className={`block h-auto w-full ${item.imageClassName}`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="support-card-overlay" />
                  <div className="support-card-badge">
                    <div className="support-card-icon">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-sm font-semibold tracking-[-0.02em] text-white/90">
                      {item.eyebrow}
                    </span>
                  </div>
                </div>

                <div className="support-card-copy">
                  <h3 className="text-[2rem] font-bold leading-[1.02] tracking-[-0.05em] text-[#0e3b61] sm:text-[2.15rem]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-lg leading-[1.5] tracking-[-0.02em] text-[#0e3b61]/70 sm:text-[1.7rem] sm:leading-[1.42]">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
