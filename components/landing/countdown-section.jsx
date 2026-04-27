import CountdownTimer from "@/components/countdown-timer";

export default function CountdownSection() {
  return (
    <section id="countdown" className="countdown-surface relative z-30 -mt-28 sm:-mt-32 lg:-mt-30 py-[12rem]">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-14">
        <p className="countdown-title text-2xl sm:text-4xl mb-12">
          Temps restants pour soumettre votre projet
        </p>
        <CountdownTimer />
      </div>
    </section>
  );
}
