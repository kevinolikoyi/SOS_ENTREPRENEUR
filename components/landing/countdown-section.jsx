import CountdownTimer from "@/components/countdown-timer";

export default function CountdownSection() {
  return (
    <section className="countdown-surface relative z-0 tight-sections">
      <div className="mx-auto max-w-6xl px-4 section-inner text-center">
        <p className="countdown-title text-2xl sm:text-4xl">
          Temps restants pour soumettre votre projet
        </p>
        <CountdownTimer />
      </div>
    </section>
  );
}
