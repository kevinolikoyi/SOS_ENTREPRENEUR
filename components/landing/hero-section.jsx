import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="hero-shell w-full overflow-visible">
        <div className="hero-stage relative min-h-[70vh] px-4 pb-0 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32">

          {/* CONTENT */}
          <div className="relative z-10 mx-auto max-w-[1260px]">
            <div className="mt-10 grid gap-6 sm:mt-12 lg:relative lg:grid-cols-[470px_minmax(430px,560px)] lg:items-end lg:justify-center lg:gap-10 xl:grid-cols-[500px_minmax(470px,590px)] xl:gap-14">
              
              {/* IMAGE PERSON */}
              <div className="relative order-2 min-h-[360px] sm:min-h-[440px] lg:order-1 lg:min-h-[620px]">
                <div className="absolute -bottom-20 left-1/2 h-full w-[330px] -translate-x-1/2 sm:w-[420px] sm:-translate-x-[58%] lg:left-8 lg:w-[520px] lg:translate-x-0">
                  <Image
                    src="/img/richard.png"
                    alt="Richard Odjirado"
                    fill
                    priority
                    className="hero-person object-contain object-bottom"
                    sizes="(max-width: 1024px) 420px, 520px"
                  />
                </div>
              </div>

              {/* TEXTE */}
              <div className="order-1 flex flex-col items-center pt-4 text-center lg:absolute lg:left-[46%] lg:top-1/2 lg:z-20 lg:w-[560px] lg:-translate-y-1/2 lg:items-start lg:pt-0 lg:text-left xl:left-[47%]">
                <div className="mt-6 max-w-[560px] lg:mt-0">
                  
                  <p className="hero-kicker whitespace-nowrap text-[1.6rem] sm:text-3xl lg:text-[3.4rem]">
                    Entrepreneur en difficulté ?
                  </p>

                  <h1 className="mt-4 flex justify-center lg:justify-start" aria-label="On te laisse pas tomber !">
                    <Image
                      src="/img/hero-title.png"
                      alt="On te laisse pas tomber !"
                      width={668}
                      height={115}
                      priority
                      className="h-auto w-[300px] sm:w-[430px] lg:w-[668px]"
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 430px, 668px"
                    />
                  </h1>

                  <p
                    id="hero-cta-trigger"
                    className="mt-5 text-base leading-7 text-white sm:text-[1.5rem] sm:leading-[1.28] lg:max-w-[560px] lg:text-[1.55rem]"
                  >
                    <span className="font-black text-brand-glow">2 entrepreneurs</span>{" "}
                    et <span className="font-black text-brand-glow">1 porteur de projet </span> 
                    <br className="hidden sm:block" />
                    <span className="text-white/92">
                      seront accompagnés par édition.
                    </span>
                  </p>

                  {/* BOUTON HERO */}
                  <div className="mt-7 flex justify-center transition-all duration-500 lg:justify-start">
                    <Button
                      id="hero-cta-source"
                      asChild
                      size="lg"
                      className="glow-button h-12 min-w-[250px] border-0 px-7 text-base font-black text-white transition-opacity duration-300 sm:h-14 sm:min-w-[320px]"
                    >
                      <a href="https://ee.kobotoolbox.org/x/f9y48cRE" target="_blank" rel="noreferrer">
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
