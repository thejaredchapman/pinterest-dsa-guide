import Link from "next/link";

export default function SaturdayPage() {
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

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-2">
          Templates <span className="text-[#E60023]">&amp;</span> Reference
        </h1>
        <p className="text-lg text-[#E60023] font-semibold">
          Type all 7 from memory by interview day.
        </p>
      </div>

      {/* Section A — Python Idioms */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#E60023] mb-4">
          Python Idioms
        </h2>
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`from collections import Counter, defaultdict, deque
import heapq

Counter(iterable)              # frequency map — Counter("aab") → {'a':2,'b':1}
defaultdict(int)               # dict that auto-creates 0 for missing keys
defaultdict(list)              # dict that auto-creates [] — use for grouping
d.get(key, default)            # safe lookup — no KeyError
deque()                        # O(1) popleft()/appendleft() — ALWAYS use for BFS
heapq.heappush(h, x)           # insert into min-heap
heapq.heappop(h)               # remove and return smallest
heapq.heappush(h, -x)          # simulate max-heap by negating
float('inf')                   # useful sentinel for min/max tracking
s.isalnum(); s.lower()         # clean string for palindrome checks
''.join(chars)                 # build string from list
x in some_set                  # O(1) — sets and dicts only. x in list is O(n)!`}</pre>
        </div>
      </section>

      {/* Section B — Gotchas */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#E60023] mb-4">
          Gotchas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "`list.pop(0)` is O(n) — shifts every element. Use `deque.popleft()` which is O(1).",
            "`x in list` is O(n). Python scans every element. Use a `set` or `dict` for O(1) lookup.",
            "Default recursion limit is ~1000. Mention this for deep trees. Use iterative DFS or `sys.setrecursionlimit()`.",
            "Python has no integer overflow. Say this out loud on sum problems — it's a free signal of Python fluency.",
          ].map((gotcha, i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <p className="text-sm dark:text-gray-100 text-gray-700 leading-relaxed font-mono">{gotcha}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section C — The 7 Templates */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#E60023] mb-6">
          The 7 Templates
        </h2>

        {/* Template 1: Two Pointers */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 1: Two Pointers</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: sorted array, find pair summing to target</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`l, r = 0, len(arr) - 1
while l < r:
    if CONDITION:
        pass               # found the answer
    elif NEED_BIGGER:
        l += 1             # move left right to increase sum
    else:
        r -= 1             # move right left to decrease sum`}</pre>
        </div>

        {/* Template 2: Sliding Window (variable) */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 2: Sliding Window (variable)</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: longest/shortest substring with a constraint</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`left, seen, best = 0, set(), 0
for right in range(len(s)):
    while s[right] in seen:       # duplicate entered — shrink from left
        seen.remove(s[left])
        left += 1
    seen.add(s[right])
    best = max(best, right - left + 1)
return best`}</pre>
        </div>

        {/* Template 3: Binary Search */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 3: Binary Search</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: sorted array, search space that halves each step</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`lo, hi = 0, len(arr) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        lo = mid + 1              # target in right half
    else:
        hi = mid - 1              # target in left half
return -1`}</pre>
        </div>

        {/* Template 4: Fast / Slow Pointers */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 4: Fast / Slow Pointers</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: linked list cycle, middle of list</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`slow = fast = head
while fast and fast.next:         # fast needs 2 valid nodes to move 2 steps
    slow, fast = slow.next, fast.next.next
    if slow is fast:
        return True               # cycle confirmed
return False`}</pre>
        </div>

        {/* Template 5: Stack Matching */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 5: Stack Matching</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: bracket matching, expression parsing</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`pairs = {')': '(', ']': '[', '}': '{'}
stack = []
for ch in s:
    if ch in pairs:               # closing bracket
        if not stack or stack.pop() != pairs[ch]:
            return False
    else:
        stack.append(ch)          # opening bracket
return not stack`}</pre>
        </div>

        {/* Template 6: BFS on a Grid */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 6: BFS on a Grid</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: shortest path on grid, count connected components</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`from collections import deque
q = deque([start])
visited = {start}
steps = 0
while q:
    for _ in range(len(q)):       # process one entire level
        r, c = q.popleft()
        for dr, dc in ((0,1),(0,-1),(1,0),(-1,0)):
            nr, nc = r+dr, c+dc
            if 0<=nr<rows and 0<=nc<cols and (nr,nc) not in visited:
                visited.add((nr,nc)); q.append((nr,nc))
    steps += 1`}</pre>
        </div>

        {/* Template 7: DFS + Tree Height */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-5">
          <h3 className="font-bold dark:text-white text-gray-900 mb-1">Template 7: DFS + Tree Height</h3>
          <p className="text-xs dark:text-gray-400 text-gray-500 mb-3 italic">When to use: graph connectivity, tree measurements</p>
          <pre className="text-xs sm:text-sm font-mono dark:text-gray-100 text-gray-800 leading-relaxed overflow-x-auto whitespace-pre">{`def dfs(node, visited):
    if node in visited: return
    visited.add(node)
    for nei in graph[node]:
        dfs(nei, visited)

def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))`}</pre>
        </div>
      </section>

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Home
        </Link>
        <Link
          href="/sunday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Day 1: Sunday →
        </Link>
      </div>
    </div>
  );
}
