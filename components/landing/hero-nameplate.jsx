export default function HeroNameplate() {
  return (
    <div className="relative z-40 -mt-16 sm:-mt-20 lg:-mt-24">
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-[470px_minmax(430px,560px)] lg:justify-center lg:gap-10 xl:grid-cols-[500px_minmax(470px,590px)] xl:gap-14">
          <div className="flex justify-center lg:block">
            <div className="hero-nameplate w-[250px] origin-bottom -rotate-[2deg] px-5 py-4 text-center sm:w-[280px] lg:ml-4 xl:ml-8">
              <p className="text-xs italic tracking-[0.02em] text-brand-soft">By</p>
              <p className="mt-1 text-xl font-black uppercase leading-none text-white">
                Richard ODJRADO
              </p>
              <p className="mt-1 text-sm uppercase tracking-tight text-white">
                CEO AS WORLD TECH
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
