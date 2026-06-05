"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CandidatureChecker() {
  const [identifier, setIdentifier] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/candidature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setResult({ tone: "warning", message: payload.message });
        return;
      }

      if (!payload.ready) {
        setResult({
          tone: "info",
          message:
            "Les candidatures sont encore en cours d'analyse. Revenez plus tard pour consulter votre résultat.",
        });
        return;
      }

      if (payload.selected) {
        const name = payload.name ? `, ${payload.name}` : "";
        setResult({
          tone: "success",
          message: `Félicitations${name} ! Votre candidature fait partie des profils retenus pour la suite du processus.`,
        });
        return;
      }

      if (payload.found && payload.pending) {
        setResult({
          tone: "info",
          message:
            "Votre candidature est bien enregistrée, mais elle n'apparaît pas encore parmi les 100 candidats retenus.",
        });
        return;
      }

      setResult({
        tone: "error",
        message:
          "Votre candidature n'a pas été retenue parmi les 100 candidats présélectionnés.",
      });
    } catch {
      setResult({
        tone: "warning",
        message:
          "La vérification est momentanément indisponible. Merci de réessayer dans quelques instants.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toneClassName = {
    success: "border-emerald-500/25 bg-emerald-50 text-emerald-900",
    warning: "border-amber-500/25 bg-amber-50 text-amber-950",
    info: "border-[#0e3b61]/15 bg-[#0e3b61]/5 text-[#0e3b61]",
    error: "border-red-500/25 bg-red-50 text-red-700",
  }[result?.tone ?? "info"];

  return (
    <form className="mx-auto mt-8 max-w-xl space-y-4" onSubmit={handleSubmit}>
      <label
        className="block text-left text-sm font-semibold uppercase tracking-[0.22em] text-[#0e3b61]/60"
        htmlFor="candidate-identifier"
      >
        Email ou téléphone
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="candidate-identifier"
          className="h-12 min-w-0 flex-1 rounded-full border border-[#0e3b61]/15 bg-white px-5 text-base text-[#0e3b61] outline-none transition focus:border-[#0e3b61]/45 focus:ring-2 focus:ring-[#0e3b61]/12"
          onChange={(event) => setIdentifier(event.target.value)}
          placeholder="ex: 97000000 ou nom@email.com"
          type="text"
          value={identifier}
        />
        <Button
          className="h-12 min-w-[150px] px-6"
          disabled={isLoading}
          size="lg"
          type="submit"
        >
          <Search />
          {isLoading ? "Vérification..." : "Vérifier"}
        </Button>
      </div>

      {result ? (
        <p className={`rounded-2xl border px-5 py-4 text-left text-sm leading-7 ${toneClassName}`}>
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
