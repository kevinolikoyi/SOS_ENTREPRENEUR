"use client";

import { useEffect, useState } from "react";

import { getCountdownSnapshot } from "@/lib/campaign";

const INITIAL_COUNTDOWN = {
  title: "Temps restant pour candidater",
  items: [
    { label: "Jours", value: "00" },
    { label: "Heures", value: "00" },
    { label: "Minutes", value: "00" },
    { label: "Secondes", value: "00" },
  ],
};

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    const syncCountdown = () => {
      setCountdown(getCountdownSnapshot());
    };

    syncCountdown();

    const interval = window.setInterval(() => {
      syncCountdown();
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10">
      <p className="countdown-title mb-12 text-2xl sm:text-4xl">
        {countdown.title}
      </p>
      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-7 sm:flex-nowrap sm:gap-x-8 lg:gap-x-10">
        {countdown.items.map((item, index) => (
          <div key={item.label} className="flex items-start gap-6 lg:gap-9">
            <div className="min-w-[120px] text-center sm:min-w-[140px] lg:min-w-[170px]">
              <p className="countdown-number text-[3.85rem] leading-none tracking-[-0.08em] sm:text-[5.7rem] lg:text-[7.6rem]">
                {item.value}
              </p>
              <p className="mt-3 text-lg italic text-[#0e3b61] sm:text-2xl">
                {item.label}
              </p>
            </div>

            {index < countdown.items.length - 1 ? (
              <span className="countdown-separator hidden text-[4.2rem] leading-none sm:block lg:text-[7.2rem]">
                :
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
