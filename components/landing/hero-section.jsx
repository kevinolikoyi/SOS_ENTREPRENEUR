import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative z-20">
      <div className="hero-shell w-full overflow-visible">
        <div className="hero-stage relative min-h-screen px-4 pb-0 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-12">
          <div className="hero-header fixed inset-x-0 top-0 z-50">
            <div className="mx-auto flex max-w-[1260px] items-start justify-start px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
              <div className="shrink-0 rounded-[1rem] bg-transparent p-1">
                <Image
                  src="/img/logo-sos-entrepreneur.png"
                  alt="SOS Entrepreneur"
                  width={64}
                  height={58}
                  priority
                  className="h-auto w-[52px] sm:w-[64px]"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-[1260px]">
            <div className="mt-24 grid gap-6 sm:mt-28 lg:relative lg:mt-24 lg:grid-cols-[470px_minmax(430px,560px)] lg:items-end lg:justify-center lg:gap-10 xl:grid-cols-[500px_minmax(470px,590px)] xl:gap-14">
              <div className="relative order-2 min-h-[360px] sm:min-h-[440px] lg:order-1 lg:min-h-[620px]">
                <div className="absolute bottom-0 left-1/2 h-full w-[330px] -translate-x-[58%] sm:w-[420px] lg:left-8 lg:w-[520px] lg:translate-x-0">
                  <Image
                    src="/img/richard.png"
                    alt="Richard Odjirado"
                    fill
                    priority
                    className="hero-person object-contain object-bottom"
                    sizes="(max-width: 1024px) 420px, 520px"
                  />
                </div>

                <div className="hero-nameplate absolute -bottom-3 left-1/2 z-30 w-[250px] -translate-x-1/2 origin-bottom -rotate-[2deg] px-5 py-4 text-center sm:w-[280px] lg:-bottom-4 lg:left-1 lg:translate-x-0 xl:left-8">
                  <p className="text-xs italic tracking-[0.02em] text-brand-soft">By</p>
                  <p className="mt-1 text-xl font-black uppercase leading-none text-white">
                    Richard ODJRADO
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-tight text-white/88">
                    CEO AS WORLD TECH
                  </p>
                </div>
              </div>

              <div className="order-1 flex flex-col items-center pt-4 text-center lg:absolute lg:left-[46%] lg:top-1/2 lg:z-20 lg:w-[560px] lg:-translate-y-1/2 lg:items-start lg:pt-0 lg:text-left xl:left-[47%]">
                <div className="mt-6 max-w-[560px] lg:mt-0">
                  <p className="hero-kicker whitespace-nowrap text-lg sm:text-3xl lg:text-[3.4rem]">
                    Entrepreneur en difficulte ?
                  </p>

                  <h1 className="hero-title mt-4 whitespace-nowrap text-4xl leading-[0.88] sm:text-5xl lg:text-[4.8rem]">
                    on te laisse pas tomber !
                  </h1>

                  <p className="mt-5 text-base leading-7 text-white sm:text-[1.5rem] sm:leading-[1.28] lg:max-w-[560px] lg:text-[1.55rem]">
                    <span className="font-black text-brand-glow">3 entrepreneurs</span>{" "}
                    et <span className="font-black text-brand-glow">un porteur de projet</span>
                    <br className="hidden sm:block" />
                    <span className="text-white/92">seront accompagnes par edition.</span>
                  </p>

                  <div className="mt-7 flex justify-center lg:justify-start">
                    <Button
                      asChild
                      size="lg"
                      className="glow-button h-12 min-w-[250px] border-0 px-7 text-base font-black text-white sm:h-14 sm:min-w-[320px]"
                    >
                      <a href="#postuler">
                        Candidater ici
                        <ArrowRight />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
