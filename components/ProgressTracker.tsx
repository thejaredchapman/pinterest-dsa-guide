"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "dsa-progress";

const ALL_TOPICS = [
  "arrays-strings",
  "two-pointers",
  "sliding-window",
  "linked-lists",
  "stacks",
  "queues",
  "hash-maps",
  "sorting",
  "trees",
  "heaps",
  "tries",
  "bfs",
  "dfs",
  "recursion-memoization",
  "dynamic-programming",
];

const TOTAL = ALL_TOPICS.length;

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const toggle = (topicId: string) => {
    setProgress((prev) => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const completed = Object.values(progress).filter(Boolean).length;

  return { progress, toggle, completed, total: TOTAL, mounted };
}

interface ProgressBarProps {
  topicIds: string[];
  label?: string;
}

export function ProgressBar({ topicIds, label }: ProgressBarProps) {
  const { progress, toggle, mounted } = useProgress();

  if (!mounted) return null;

  const completed = topicIds.filter((id) => progress[id]).length;
  const pct = topicIds.length ? Math.round((completed / topicIds.length) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E60023]">
          {label || "Progress"}
        </span>
        <span className="text-sm font-bold dark:text-white text-gray-800">
          {completed}/{topicIds.length} — {pct}%
        </span>
      </div>
      <div className="h-2 dark:bg-white/10 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-[#E60023] to-[#AD081B] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {topicIds.map((id) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 ${
              progress[id]
                ? "bg-[#E60023] text-white"
                : "dark:bg-white/10 bg-gray-100 dark:text-gray-100 text-gray-700 hover:bg-[#E60023]/20 hover:text-[#E60023]"
            }`}
          >
            {progress[id] ? "✓ " : ""}{id.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
}

export function OverallProgress() {
  const { completed, total, mounted } = useProgress();

  if (!mounted) return null;

  const pct = Math.round((completed / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 dark:bg-white/10 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E60023] to-[#AD081B] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold dark:text-gray-100 text-gray-700 whitespace-nowrap">
        {completed}/{total} topics
      </span>
    </div>
  );
}
