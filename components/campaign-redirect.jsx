"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CAMPAIGN_CLOSED_PATH, getCampaignState } from "@/lib/campaign";

export default function CampaignRedirect() {
  const router = useRouter();

  useEffect(() => {
    const syncRedirect = () => {
      if (getCampaignState() === "closed") {
        router.replace(CAMPAIGN_CLOSED_PATH);
      }
    };

    syncRedirect();

    const interval = window.setInterval(syncRedirect, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [router]);

  return null;
}
