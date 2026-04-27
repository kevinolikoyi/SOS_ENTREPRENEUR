import { NextResponse } from "next/server";

import {
  CAMPAIGN_CLOSED_PATH,
  CAMPAIGN_FORM_URL,
  getCampaignState,
} from "@/lib/campaign";

export function GET(request) {
  const state = getCampaignState();

  if (state === "closed") {
    return NextResponse.redirect(new URL(CAMPAIGN_CLOSED_PATH, request.url));
  }

  return NextResponse.redirect(new URL(CAMPAIGN_FORM_URL));
}

export const dynamic = "force-dynamic";
