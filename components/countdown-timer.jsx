"use client";

import { useEffect, useState } from "react";

const TIME_LABELS = ["Jours", "Heures", "Minutes", "Secondes"];
const INITIAL_TIME_LEFT = TIME_LABELS.map((label) => ({
  label,
  value: "00",
}));

function getEditionDeadline() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

function getTimeLeft() {
  const difference = getEditionDeadline().getTime() - Date.now();
  const safeDifference = Math.max(difference, 0);

  const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDifference / 1000) % 60);

  return [
    { label: "Jours", value: String(days).padStart(2, "0") },
    { label: "Heures", value: String(hours).padStart(2, "0") },
    { label: "Minutes", value: String(minutes).padStart(2, "0") },
    { label: "Secondes", value: String(seconds).padStart(2, "0") },
  ];
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);

  useEffect(() => {
    const syncTimeLeft = () => {
      setTimeLeft(getTimeLeft());
    };

    syncTimeLeft();

    const interval = window.setInterval(() => {
      syncTimeLeft();
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-7 sm:flex-nowrap sm:gap-x-8 lg:gap-x-10">
        {timeLeft.map((item, index) => (
          <div key={item.label} className="flex items-start gap-6 lg:gap-9">
            <div className="min-w-[120px] text-center sm:min-w-[140px] lg:min-w-[170px]">
              <p className="countdown-number text-[3.85rem] leading-none tracking-[-0.08em] sm:text-[5.7rem] lg:text-[7.6rem]">
                {item.value}
              </p>
              <p className="mt-3 text-lg italic text-[#25142d] sm:text-2xl">
                {item.label}
              </p>
            </div>

            {index < timeLeft.length - 1 ? (
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
