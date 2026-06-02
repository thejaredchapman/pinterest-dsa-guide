"use client";

import { useState, useEffect } from "react";

// Interview: Friday June 5, 2026 — 3:30 PM CST (Central Standard Time = UTC-6)
const INTERVIEW_DATE = new Date("2026-06-05T15:30:00-06:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(): TimeLeft {
  const diff = INTERVIEW_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  return {
    total: diff,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function urgencyMessage(days: number): string {
  if (days >= 4) return "Four days. Build the reps. Earn the confidence.";
  if (days === 3) return "Three days left. Depth over breadth.";
  if (days === 2) return "Two days. Every rep counts.";
  if (days === 1) return "Tomorrow is the day. Sleep tonight.";
  return "Today is the day. You are ready.";
}

// Large countdown for the home page
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft.total <= 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center mb-8 max-w-2xl mx-auto border-2 border-[#E60023]/50">
        <div className="text-5xl mb-4">🎯</div>
        <p className="text-2xl sm:text-3xl font-bold text-[#E60023] mb-2">
          It&apos;s Interview Time.
        </p>
        <p className="dark:text-gray-100 text-gray-800 text-lg font-medium">
          You prepared for this. Walk in, own the room, get the job.
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days",    value: timeLeft.days },
    { label: "Hours",   value: timeLeft.hours },
    { label: "Min",     value: timeLeft.minutes },
    { label: "Sec",     value: timeLeft.seconds },
  ];

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6 mb-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <span className="text-lg">⏱</span>
        <p className="text-xs font-bold uppercase tracking-widest text-[#E60023]">
          Pinterest Interview Countdown
        </p>
      </div>

      {/* Digit grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
        {units.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <div className="w-full rounded-xl dark:bg-black/30 bg-white/70 border dark:border-white/10 border-[#E60023]/15 shadow-inner flex items-center justify-center py-3 sm:py-4">
              <span
                className={`text-3xl sm:text-4xl font-bold text-[#E60023] font-mono tabular-nums transition-transform duration-100 ${
                  label === "Sec" && tick ? "scale-110" : "scale-100"
                }`}
              >
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs font-semibold dark:text-gray-300 text-gray-600 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Urgency message */}
      <p className="text-center text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">
        {urgencyMessage(timeLeft.days)}
      </p>
      <p className="text-center text-xs dark:text-gray-400 text-gray-500">
        Friday · June 5 · 3:30 PM CST · Pinterest Interview
      </p>
    </div>
  );
}

// Compact badge for day pages
export function CountdownBadge() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;
  if (timeLeft.total <= 0) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E60023] text-white text-xs font-bold">
        🎯 Interview Day
      </div>
    );
  }

  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
  parts.push(`${String(timeLeft.hours).padStart(2, "0")}h`);
  parts.push(`${String(timeLeft.minutes).padStart(2, "0")}m`);
  parts.push(`${String(timeLeft.seconds).padStart(2, "0")}s`);

  return (
    <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2">
      <span className="text-xs font-bold text-[#E60023] uppercase tracking-widest">
        ⏱ Interview in
      </span>
      <span className="text-sm font-bold dark:text-white text-gray-900 font-mono tabular-nums">
        {parts.join(" ")}
      </span>
    </div>
  );
}
