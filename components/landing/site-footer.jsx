import { MessageCircle } from "lucide-react";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#150916]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row md:text-left">
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-glow transition-colors hover:text-brand-soft"
          href="https://wa.me/2290167088303"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle className="size-4" />
          +229 01 67 08 83 03
        </a>

        <p className="text-sm text-white">(c) {year} SOS Entrepreneur - AS WORLD TECH - Bénin</p>
      </div>
    </footer>
  );
}
