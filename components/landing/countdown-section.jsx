import CountdownTimer from "@/components/countdown-timer";

export default function CountdownSection() {
  return (
    <section className="countdown-surface relative z-0">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="countdown-title text-2xl sm:text-4xl">
          Temps restants pour soumettre votre projet
        </p>
        <div className="mt-8 sm:mt-10">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
