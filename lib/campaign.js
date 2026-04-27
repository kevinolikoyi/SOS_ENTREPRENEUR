export const CAMPAIGN_FORM_URL = "https://ee.kobotoolbox.org/x/Ye9GEa7Q";
export const CAMPAIGN_APPLY_PATH = "/postuler";
export const CAMPAIGN_CLOSED_PATH = "/candidatures-cloturees";

export const CAMPAIGN_CLOSE_AT_ISO = "2026-05-08T23:00:00.000Z";

export const CAMPAIGN_CLOSE_AT_LABEL = "9 mai 2026 à 00 h";

const TIME_LABELS = ["Jours", "Heures", "Minutes", "Secondes"];

export function getCampaignCloseAt() {
  return new Date(CAMPAIGN_CLOSE_AT_ISO);
}

export function getCampaignState(now = new Date()) {
  const closesAt = getCampaignCloseAt();

  if (now.getTime() < closesAt.getTime()) {
    return "open";
  }

  return "closed";
}

export function getCountdownSnapshot(now = new Date()) {
  const state = getCampaignState(now);
  const target = getCampaignCloseAt();
  const difference = Math.max(target.getTime() - now.getTime(), 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  const titleByState = {
    open: "Temps restant pour candidater",
    closed: "Les candidatures sont clôturées",
  };

  return {
    state,
    title: titleByState[state],
    items: TIME_LABELS.map((label, index) => {
      const values = [days, hours, minutes, seconds];

      return {
        label,
        value: String(values[index]).padStart(2, "0"),
      };
    }),
  };
}
