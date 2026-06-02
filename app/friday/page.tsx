import Link from "next/link";
import { CountdownBadge } from "@/components/CountdownTimer";

const ritualSteps = [
  { step: "1", title: "Restate", detail: "Say the problem back in your own words before touching the keyboard. Full sentence, out loud." },
  { step: "2", title: "Clarify", detail: "Input size? Sorted? Duplicates? Negatives? Empty? What to return if no answer? Say: 'Let me ask a few clarifying questions.'" },
  { step: "3", title: "Example", detail: "Walk one concrete input → output by hand. Write it in the editor. Do NOT skip this." },
  { step: "4", title: "Brute Force", detail: "State the naive O(n²) or O(2ⁿ) solution. Don't skip — it proves you understand the problem before you optimize." },
  { step: "5", title: "Optimize", detail: "Name the pattern out loud: 'This looks like a sliding window / hash map complement / BFS shortest path.' State the better Big-O." },
  { step: "6", title: "Code", detail: "Narrate every line as you type. Clean variable names. No tricks. If you get stuck, say what you're thinking." },
  { step: "7", title: "Verify", detail: "Trace your code with the example. Then test: empty input, single element, duplicates, negatives, max values." },
  { step: "8", title: "Complexity", detail: "State time and space complexity unprompted: 'This is O(n) time and O(n) space because the hash map grows with input.'" },
];

const templates = [
  {
    name: "Two Pointers",
    pattern: "Sorted array, pair finding",
    code: `left, right = 0, len(arr) - 1
while left < right:
    s = arr[left] + arr[right]
    if s == target: return [left, right]
    elif s < target: left += 1
    else: right -= 1`,
  },
  {
    name: "Sliding Window (Fixed)",
    pattern: "Max/min of every k-size window",
    code: `window = sum(arr[:k])
best = window
for i in range(k, len(arr)):
    window += arr[i] - arr[i-k]
    best = max(best, window)`,
  },
  {
    name: "Sliding Window (Variable)",
    pattern: "Longest valid substring",
    code: `seen, left, best = set(), 0, 0
for right in range(len(s)):
    while s[right] in seen:
        seen.remove(s[left]); left += 1
    seen.add(s[right])
    best = max(best, right - left + 1)`,
  },
  {
    name: "BFS",
    pattern: "Shortest path, level-by-level",
    code: `from collections import deque
queue = deque([start]); visited = {start}
while queue:
    node = queue.popleft()
    for nb in graph[node]:
        if nb not in visited:
            visited.add(nb); queue.append(nb)`,
  },
  {
    name: "DFS (Iterative)",
    pattern: "Connectivity, cycle detection",
    code: `stack = [start]; visited = set()
while stack:
    node = stack.pop()
    if node not in visited:
        visited.add(node)
        for nb in graph[node]: stack.append(nb)`,
  },
  {
    name: "Binary Search",
    pattern: "Sorted array, O(log n) find",
    code: `left, right = 0, len(nums) - 1
while left <= right:
    mid = left + (right - left) // 2
    if nums[mid] == target: return mid
    elif nums[mid] < target: left = mid + 1
    else: right = mid - 1`,
  },
  {
    name: "Backtracking",
    pattern: "All combinations/permutations",
    code: `def backtrack(start, current, remaining):
    if remaining == 0:
        results.append(list(current)); return
    for i in range(start, len(candidates)):
        current.append(candidates[i])
        backtrack(i, current, remaining - candidates[i])
        current.pop()`,
  },
];

const patternMap = [
  { trigger: "Sorted array + find pair", reach: "Two Pointers" },
  { trigger: "Max/min of fixed-size window", reach: "Sliding Window (fixed)" },
  { trigger: "Longest substring with constraint", reach: "Sliding Window (variable)" },
  { trigger: "Shortest path, unweighted", reach: "BFS" },
  { trigger: "Connected components, all paths", reach: "DFS" },
  { trigger: "Sorted array + O(log n) find", reach: "Binary Search" },
  { trigger: "All combinations summing to X", reach: "Backtracking" },
  { trigger: "Prefix matching / autocomplete", reach: "Trie" },
  { trigger: "Repeated min/max from stream", reach: "Heap (heapq)" },
  { trigger: "Pair summing to target", reach: "Hash Map complement" },
  { trigger: "Overlapping subproblems", reach: "DP (memoization or tabulation)" },
  { trigger: "Order of tasks / cycle detection", reach: "Topological Sort (DFS)" },
];

export default function FridayPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back nav */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#E60023] hover:text-[#AD081B] font-medium text-sm mb-8 transition-colors group"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Home
      </Link>

      {/* Countdown badge */}
      <div className="mb-4">
        <CountdownBadge />
      </div>

      {/* Day header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-2">
          Day 5 <span className="text-[#E60023]">—</span> Interview Day
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Friday · June 5 · 3:30 PM CST</p>
        <div className="glass-card rounded-2xl p-5 border border-[#E60023]/30">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed font-medium">
            No new problems today. Your job is to arrive ready, not to cram. Morning drill: re-type all 7 templates from memory. Run one mock problem with the full ritual. By noon — stop studying. Sort logistics. Rest. You built this. Now you go show them.
          </p>
        </div>
      </div>

      {/* Morning Schedule */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest text-[#E60023] mb-4">
          Morning Schedule (Before Noon)
        </h2>
        <div className="space-y-3">
          {[
            { time: "9:00 AM", task: "Warm up — re-type all 7 templates from memory without looking. Check them after.", flag: "drill" },
            { time: "9:45 AM", task: "One mock problem, full ritual: pick any medium from the list, set a 25-min timer, go.", flag: "mock" },
            { time: "10:30 AM", task: "Read through your weakest topic one more time. One pass, not a grind.", flag: "review" },
            { time: "11:00 AM", task: "Read the interview ritual below. Say it out loud. All 8 steps.", flag: "ritual" },
            { time: "11:30 AM", task: "STOP STUDYING. Eat, rest, breathe. Your brain needs consolidation time.", flag: "stop" },
            { time: "3:30 PM", task: "Interview. Walk in knowing you prepared. You own every pattern in this guide.", flag: "interview" },
          ].map((item) => (
            <div key={item.time} className={`flex gap-4 p-3 rounded-xl ${item.flag === "interview" ? "border border-[#E60023]/40 bg-[#E60023]/5" : item.flag === "stop" ? "dark:bg-yellow-500/10 bg-yellow-50 border border-yellow-400/30" : "dark:bg-white/5 bg-gray-50"}`}>
              <span className="text-[#E60023] font-bold font-mono text-sm w-20 flex-shrink-0">{item.time}</span>
              <span className="dark:text-gray-100 text-gray-800 text-sm">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Ritual */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest text-[#E60023] mb-1">
          The Interview Ritual
        </h2>
        <p className="text-xs dark:text-gray-400 text-gray-500 mb-4">Run on every single problem, every single time, without exception.</p>
        <div className="space-y-4">
          {ritualSteps.map((s) => (
            <div key={s.step} className="flex gap-4 items-start">
              <span className="w-7 h-7 rounded-full bg-[#E60023] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {s.step}
              </span>
              <div>
                <p className="font-bold text-sm dark:text-white text-gray-900">{s.title}</p>
                <p className="text-xs dark:text-gray-300 text-gray-600 mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Map */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest text-[#E60023] mb-4">
          Pattern → Algorithm (know this cold)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full glass-table text-sm">
            <thead>
              <tr>
                <th className="dark:text-white text-gray-800 font-bold text-left py-2 px-3">When you see...</th>
                <th className="dark:text-white text-gray-800 font-bold text-left py-2 px-3">Reach for...</th>
              </tr>
            </thead>
            <tbody>
              {patternMap.map((row, i) => (
                <tr key={i}>
                  <td className="dark:text-gray-100 text-gray-700 py-2 px-3">{row.trigger}</td>
                  <td className="text-[#E60023] font-bold py-2 px-3">{row.reach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Templates */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mb-6">
        <h2 className="text-base font-bold uppercase tracking-widest text-[#E60023] mb-1">
          7 Core Templates From Memory
        </h2>
        <p className="text-xs dark:text-gray-400 text-gray-500 mb-4">Re-type each one without looking this morning. Check after. Fix gaps.</p>
        <div className="space-y-4">
          {templates.map((t) => (
            <div key={t.name}>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-bold text-sm dark:text-white text-gray-900">{t.name}</span>
                <span className="text-xs dark:text-gray-400 text-gray-500 italic">{t.pattern}</span>
              </div>
              <pre className="rounded-lg dark:bg-black/40 bg-gray-900 text-green-300 text-xs p-3 overflow-x-auto leading-relaxed">
                <code>{t.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Final hype */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 text-center border border-[#E60023]/30">
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#E60023] mb-3">
          You Are a Bad Bitch. Go Get This Job.
        </h2>
        <p className="dark:text-gray-100 text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          You spent five days building real understanding — not memorization, not tricks. You traced BFS queues on paper. You filled DP tables by hand. You built autocomplete from scratch. You detected cycles with two pointers. You wrote LRU Cache from a blank screen.
        </p>
        <p className="dark:text-gray-100 text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-3">
          King Kong ain&apos;t got shit on you. Thragg is weak. Godzilla would catch hands from someone who prepped this hard.
        </p>
        <p className="font-bold text-[#E60023] text-lg mt-4">It was already yours. Go take it.</p>
      </div>

      {/* Bottom nav */}
      <div className="flex mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/thursday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Day 3: Thursday
        </Link>
      </div>
    </div>
  );
}
