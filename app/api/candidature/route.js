import { NextResponse } from "next/server";

import { checkCandidate } from "@/lib/candidatures";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const identifier = String(body.identifier ?? "").trim();

  if (!identifier) {
    return NextResponse.json(
      { message: "Entrez votre email ou votre numéro de téléphone." },
      { status: 400 }
    );
  }

  return NextResponse.json(checkCandidate(identifier));
}
