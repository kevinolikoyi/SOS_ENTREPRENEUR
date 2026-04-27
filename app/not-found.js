import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-glow">
          404
        </p>
        <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-[#0e3b61]">
          Page introuvable
        </h1>
        <p className="mt-4 text-base leading-7 text-[#0e3b61]/70">
          Cette page n'existe pas ou a ete deplacee.
        </p>
        <Link
          href="/"
          className="glow-button mt-8 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-black text-white"
        >
          Retour a l'accueil
        </Link>
      </div>
    </main>
  );
}
