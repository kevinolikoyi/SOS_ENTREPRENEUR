export default function SectionHeading({ title, accent }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="mt-5 text-4xl font-black uppercase leading-[0.96] tracking-tight text-[#24112c] sm:text-5xl">
        {title}
        <span className="block text-brand-glow">{accent}</span>
      </h2>
    </div>
  );
}
