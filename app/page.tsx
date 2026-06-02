import Link from "next/link";
import { OverallProgress } from "@/components/ProgressTracker";
import CountdownTimer from "@/components/CountdownTimer";

function PinterestLogo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#E60023" />
      <text x="40" y="56" textAnchor="middle" fill="white" fontSize="44" fontWeight="bold" fontFamily="serif">P</text>
    </svg>
  );
}

const ritualSteps = [
  { title: "Restate", detail: "Say the problem back in your own words before touching the keyboard." },
  { title: "Clarify", detail: "Input size? Sorted? Duplicates? Negatives? Empty? Return value or in-place?" },
  { title: "Example", detail: "Walk one concrete input → output by hand. Write it in the editor." },
  { title: "Brute Force First", detail: "State the naive solution and its Big-O. Don't skip — it shows your reasoning." },
  { title: "Optimize", detail: "Name the pattern (two pointers, hash map, BFS…). State the better Big-O." },
  { title: "Code", detail: "Narrate as you type. Clean variable names. No tricks." },
  { title: "Verify", detail: "Trace your example. Then hit: empty, single element, duplicates, negatives." },
  { title: "Refactor", detail: "One pass for readability or performance if time allows." },
];

const scheduleCards = [
  {
    day: "Day 1",
    date: "Tuesday · June 2 · Today",
    href: "/monday",
    topics: ["Balanced Brackets", "Min Stack", "Queue (2 Stacks)", "Reverse LL", "Cycle Detection", "+2 more"],
    isToday: true,
    emoji: "🌳",
  },
  {
    day: "Day 2",
    date: "Wednesday · June 3",
    href: "/tuesday",
    topics: ["Validate BST", "Number of Islands", "Snakes & Ladders", "Fibonacci", "Longest Substring", "+2 more"],
    isToday: false,
    emoji: "🎯",
  },
  {
    day: "Day 3",
    date: "Thursday · June 4",
    href: "/wednesday",
    topics: ["Binary Search", "Rotated Array", "Climbing Stairs", "House Robber", "Word Search", "+2 more"],
    isToday: false,
    emoji: "🔍",
  },
  {
    day: "Stretch",
    date: "Thursday · June 4 (bonus)",
    href: "/thursday",
    topics: ["Course Schedule", "Merge K Lists", "Word Break", "3Sum", "Rain Water", "+2 more"],
    isToday: false,
    emoji: "🔥",
  },
  {
    day: "Day 4",
    date: "Friday · June 5 · 3:30 PM",
    href: "/friday",
    topics: ["Mock drill", "All templates from memory", "Stop by noon", "Rest & logistics"],
    isToday: false,
    emoji: "🚀",
  },
  {
    day: "Reference",
    date: "Templates & Idioms",
    href: "/saturday",
    topics: ["7 Core Templates", "Python Idioms", "Gotchas", "Complexity Cheat Sheet"],
    isToday: false,
    emoji: "📋",
  },
];

const patternTable = [
  { trigger: "Shortest path, level-by-level", reach: "BFS", parallel: "Degree of separation between Pinners" },
  { trigger: "Connected components, all paths", reach: "DFS", parallel: "Finding all boards reachable from a Pin" },
  { trigger: "Prefix matching, autocomplete", reach: "Trie", parallel: "Search bar, tag suggestions" },
  { trigger: "Repeated min/max from changing data", reach: "Heap", parallel: "Real-time content feed ranking" },
  { trigger: "Pair/subarray summing to target", reach: "Two Pointers or Hash Map", parallel: "Budget-based recommendations" },
  { trigger: "Longest/shortest contiguous subarray", reach: "Sliding Window", parallel: "Rolling engagement metrics" },
  { trigger: "Overlapping subproblems", reach: "DP", parallel: "Route optimization, spell correction" },
  { trigger: "Order of operations / most recent", reach: "Stack", parallel: "Undo history, browser back" },
  { trigger: "First-in, first-out, level processing", reach: "Queue", parallel: "Notification delivery" },
  { trigger: "Sorted array + find pair", reach: "Two Pointers", parallel: "—" },
];

const complexityTable = [
  { notation: "O(1)", name: "Constant", meaning: "Same time regardless of input size. Hash map lookup, array index." },
  { notation: "O(log n)", name: "Logarithmic", meaning: "Halves the problem each step. BST search, binary search." },
  { notation: "O(n)", name: "Linear", meaning: "Scales with input. Single loop, linear scan." },
  { notation: "O(n log n)", name: "Linearithmic", meaning: "Sorting. Merge sort, quicksort average." },
  { notation: "O(n²)", name: "Quadratic", meaning: "Nested loops. Bubble sort, insertion sort worst case." },
  { notation: "O(2ⁿ)", name: "Exponential", meaning: "Doubles each step. Naive recursion, brute force subsets." },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <PinterestLogo size={80} />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold dark:text-white text-gray-900 mb-4 tracking-tight">
          DSA Interview Prep
        </h1>

        <p className="text-lg sm:text-xl font-semibold text-[#E60023] mb-6">
          For Jared — Pinterest Interview, Friday June 5
        </p>

        <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto mb-8">
          <p className="dark:text-white text-gray-800 text-base sm:text-lg leading-relaxed italic font-medium">
            &ldquo;You are walking into this interview knowing exactly what you are doing. Every pattern here is a tool you own.&rdquo;
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Overall progress */}
        <div className="max-w-md mx-auto mb-8">
          <OverallProgress />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/saturday"
            className="pinterest-gradient text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Studying →
          </Link>
          <a
            href="#patterns"
            className="glass-card font-bold px-8 py-3 rounded-xl dark:text-white text-gray-800 hover:border-[#E60023]/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Quick Reference
          </a>
        </div>
      </section>

      {/* Interview Ritual */}
      <section className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 mb-2 text-center">
          The Interview Ritual
        </h2>
        <p className="text-sm dark:text-gray-300 text-gray-600 text-center mb-6">Run on every single problem, every single time.</p>
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ritualSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E60023] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-bold text-sm dark:text-white text-gray-900">{step.title}</p>
                  <p className="text-xs dark:text-gray-300 text-gray-600 mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t dark:border-white/10 border-gray-200">
            <p className="text-xs font-bold text-[#E60023] uppercase tracking-widest mb-1">Pre-flight checklist (say these out loud)</p>
            <p className="text-sm dark:text-gray-200 text-gray-700 italic font-medium">clarify → example → complexity → code → test empty / single / dupe / large</p>
          </div>
        </div>
      </section>

      {/* Study Schedule Cards */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 text-center">
          Study Schedule
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {scheduleCards.map((card) => (
            <Link
              key={card.day}
              href={card.href}
              className="glass-card rounded-2xl p-5 hover:border-[#E60023]/40 hover:-translate-y-1 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold dark:text-white text-gray-900 text-lg">
                      {card.day}
                    </span>
                    {card.isToday && (
                      <span className="pulse-red" title="Today" />
                    )}
                  </div>
                  <span className="text-sm text-[#E60023] font-medium">{card.date}</span>
                </div>
                <span className="text-3xl">{card.emoji}</span>
              </div>
              <ul className="space-y-1">
                {card.topics.map((topic) => (
                  <li key={topic} className="text-xs dark:text-gray-200 text-gray-600 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[#E60023]/50 rounded-full flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-xs font-semibold text-[#E60023] opacity-0 group-hover:opacity-100 transition-opacity">
                Study now →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pattern Table */}
      <section id="patterns" className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 mb-6 text-center">
          Algorithm → Pinterest Connection
        </h2>

        {/* Mobile: stacked cards */}
        <div className="sm:hidden space-y-3">
          {patternTable.map((row, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <p className="text-[#E60023] font-bold text-sm mb-1">{row.reach}</p>
              <p className="dark:text-white text-gray-800 font-medium text-sm mb-1">{row.trigger}</p>
              {row.parallel !== "—" && (
                <p className="dark:text-gray-300 text-gray-600 text-xs italic">{row.parallel}</p>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full glass-table">
              <thead>
                <tr>
                  <th className="dark:text-white text-gray-800 font-bold">When you see...</th>
                  <th className="dark:text-white text-gray-800 font-bold">Reach for...</th>
                  <th className="dark:text-white text-gray-800 font-bold">Pinterest parallel</th>
                </tr>
              </thead>
              <tbody>
                {patternTable.map((row, i) => (
                  <tr key={i}>
                    <td className="dark:text-white text-gray-800 font-medium">{row.trigger}</td>
                    <td className="text-[#E60023] font-bold">{row.reach}</td>
                    <td className="dark:text-gray-100 text-gray-700 italic">{row.parallel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Complexity Reference */}
      <section className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 mb-6 text-center">
          Complexity Reference
        </h2>

        {/* Mobile: stacked cards */}
        <div className="sm:hidden space-y-3">
          {complexityTable.map((row, i) => (
            <div key={i} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[#E60023] font-bold font-mono text-base">{row.notation}</span>
                <span className="dark:text-white text-gray-800 font-semibold text-sm">{row.name}</span>
              </div>
              <p className="dark:text-gray-100 text-gray-700 text-xs">{row.meaning}</p>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full glass-table">
              <thead>
                <tr>
                  <th className="dark:text-white text-gray-800 font-bold">Notation</th>
                  <th className="dark:text-white text-gray-800 font-bold">Name</th>
                  <th className="dark:text-white text-gray-800 font-bold">What it means</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row, i) => (
                  <tr key={i}>
                    <td className="text-[#E60023] font-bold font-mono text-base">{row.notation}</td>
                    <td className="dark:text-white text-gray-800 font-semibold">{row.name}</td>
                    <td className="dark:text-gray-100 text-gray-700">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t dark:border-white/10 border-gray-200">
        <p className="text-lg font-bold text-[#E60023]">
          You are a bad bitch. You got this.
        </p>
      </footer>
    </div>
  );
}
