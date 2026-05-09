import { describe, it, expect } from "vitest";
import {
  getCampaignState,
  getCountdownSnapshot,
  CAMPAIGN_CLOSE_AT_ISO,
} from "../campaign.js";

const CLOSE_AT = new Date(CAMPAIGN_CLOSE_AT_ISO);

describe("getCampaignState", () => {
  it("retourne 'open' avant la date de clôture", () => {
    const before = new Date(CLOSE_AT.getTime() - 1000);
    expect(getCampaignState(before)).toBe("open");
  });

  it("retourne 'closed' après la date de clôture", () => {
    const after = new Date(CLOSE_AT.getTime() + 1000);
    expect(getCampaignState(after)).toBe("closed");
  });

  it("retourne 'closed' exactement à la date de clôture", () => {
    expect(getCampaignState(CLOSE_AT)).toBe("closed");
  });
});

describe("getCountdownSnapshot", () => {
  it("retourne le bon état 'open' et le bon titre", () => {
    const before = new Date(CLOSE_AT.getTime() - 60_000);
    const snap = getCountdownSnapshot(before);
    expect(snap.state).toBe("open");
    expect(snap.title).toBe("Temps restant pour candidater");
  });

  it("retourne le bon état 'closed' et le bon titre", () => {
    const after = new Date(CLOSE_AT.getTime() + 60_000);
    const snap = getCountdownSnapshot(after);
    expect(snap.state).toBe("closed");
    expect(snap.title).toBe("Les candidatures sont clôturées");
  });

  it("retourne 4 items avec les bons labels", () => {
    const snap = getCountdownSnapshot(new Date(CLOSE_AT.getTime() - 1000));
    expect(snap.items).toHaveLength(4);
    const labels = snap.items.map((i) => i.label);
    expect(labels).toEqual(["Jours", "Heures", "Minutes", "Secondes"]);
  });

  it("les valeurs sont padées sur 2 chiffres", () => {
    const snap = getCountdownSnapshot(new Date(CLOSE_AT.getTime() - 1000));
    snap.items.forEach((item) => {
      expect(item.value).toMatch(/^\d{2}$/);
    });
  });

  it("différence nulle quand now > closeAt (pas de valeur négative)", () => {
    const after = new Date(CLOSE_AT.getTime() + 999_999);
    const snap = getCountdownSnapshot(after);
    snap.items.forEach((item) => {
      expect(Number(item.value)).toBe(0);
    });
  });
});
