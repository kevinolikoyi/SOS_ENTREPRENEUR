import { CAMPAIGN_CLOSE_AT_LABEL } from "@/lib/campaign";

export default function CandidaturesClotureesPage() {
  return (
    <main className="reference-surface flex min-h-screen items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-[#0e3b61]/10 bg-white p-8 text-center shadow-[0_22px_54px_rgba(22,10,28,0.12)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0e3b61]/55">
          Candidatures
        </p>
        <h1 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-tight text-[#0e3b61] sm:text-5xl">
          Les candidatures
          <span className="block text-brand-glow">sont clôturées.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#0e3b61]/78 sm:text-lg">
          Cette session s&apos;est terminée le {CAMPAIGN_CLOSE_AT_LABEL}. Merci
          pour votre intérêt.
        </p>
      </div>
    </main>
  );
}
