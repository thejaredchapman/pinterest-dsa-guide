"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const MODES = {
  focus:       { label: "Focus",       minutes: 25, color: "#E60023" },
  short_break: { label: "Short Break", minutes: 5,  color: "#16a34a" },
  long_break:  { label: "Long Break",  minutes: 15, color: "#2563eb" },
};

type Mode = keyof typeof MODES;

export default function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const current = MODES[mode];
  const totalSeconds = current.minutes * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const playDone = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // AudioContext unavailable — silent fallback
    }
  }, []);

  const reset = useCallback((m: Mode = mode) => {
    setRunning(false);
    setSecondsLeft(MODES[m].minutes * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    reset(m);
    setSecondsLeft(MODES[m].minutes * 60);
    setRunning(false);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            playDone();
            if (mode === "focus") setSessions((n) => n + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode, playDone]);

  // Circle SVG
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const strokeDash = circumference * (1 - progress);

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Pomodoro Timer"
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ background: current.color }}
      >
        <span className="text-white text-xl select-none">🍅</span>
      </button>

      {/* Timer panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-72 glass-card rounded-2xl shadow-2xl p-5 border border-white/10">
          {/* Mode tabs */}
          <div className="flex gap-1 mb-4">
            {(Object.keys(MODES) as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all duration-150 ${
                  mode === m
                    ? "text-white"
                    : "dark:text-gray-300 text-gray-600 hover:opacity-80"
                }`}
                style={mode === m ? { background: MODES[m].color } : {}}
              >
                {MODES[m].label}
              </button>
            ))}
          </div>

          {/* Ring + timer */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Track */}
                <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="dark:text-white/10 text-gray-200" />
                {/* Progress */}
                <circle
                  cx="60" cy="60" r={r} fill="none"
                  stroke={current.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDash}
                  style={{ transition: "stroke-dashoffset 0.8s linear" }}
                />
              </svg>
              {/* Time text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-mono dark:text-white text-gray-900 tabular-nums">
                  {mins}:{secs}
                </span>
                <span className="text-xs font-medium mt-0.5" style={{ color: current.color }}>
                  {current.label}
                </span>
              </div>
            </div>

            {/* Session dots */}
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300 dark:bg-white/20 bg-gray-300"
                  style={i < sessions % 4 ? { background: current.color } : {}}
                />
              ))}
            </div>
            <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
              {sessions} session{sessions !== 1 ? "s" : ""} completed
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex-1 py-2 rounded-xl font-bold text-sm text-white transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ background: current.color }}
            >
              {running ? "Pause" : secondsLeft === 0 ? "Done ✓" : "Start"}
            </button>
            <button
              onClick={() => reset(mode)}
              className="px-3 py-2 rounded-xl font-bold text-sm dark:text-gray-300 text-gray-600 dark:bg-white/10 bg-gray-100 hover:opacity-80 transition-all duration-150"
            >
              ↺
            </button>
          </div>

          {/* Tip */}
          <p className="text-xs dark:text-gray-500 text-gray-400 text-center mt-3 leading-relaxed">
            25 min focus → 5 min break → after 4 sessions, take 15 min
          </p>
        </div>
      )}
    </>
  );
}
