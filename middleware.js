import { NextResponse } from "next/server";

import { CAMPAIGN_CLOSED_PATH, getCampaignState } from "./lib/campaign";

export function middleware(request) {
  if (getCampaignState() !== "closed") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(CAMPAIGN_CLOSED_PATH, request.url));
}

export const config = {
  matcher: ["/"],
};
