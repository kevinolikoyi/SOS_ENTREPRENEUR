export default function HeroNameplate() {
  return (
    <div className="relative z-40 -translate-y-12 lg:-translate-y-15">
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[470px_minmax(430px,560px)] lg:justify-center lg:gap-10 xl:grid-cols-[500px_minmax(470px,590px)] xl:gap-14">
          <div className="flex justify-center lg:block">
            <div className="hero-nameplate w-[220px] origin-bottom -rotate-[2deg] px-4 py-3 text-center sm:w-[280px] sm:px-5 sm:py-4 lg:ml-4 xl:ml-8">
              <p className="text-xs italic tracking-[0.02em] text-brand-soft">By</p>
              <p className="mt-1 text-lg font-black uppercase leading-none text-white sm:text-xl">
                RICHARD ODJRADO
              </p>
              <p className="mt-1 text-xs uppercase tracking-tight text-white sm:text-sm">
                CEO AS WORLD TECH
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
