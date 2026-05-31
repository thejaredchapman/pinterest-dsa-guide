import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";

const TOPIC_IDS = ["bfs", "dfs", "recursion-memoization", "dynamic-programming"];

const topics = [
  {
    number: 12,
    title: "BFS (Breadth-First Search)",
    icon: "🌊",
    complexity: { time: "O(V+E)", space: "O(V)" },
    whenToUse: "Shortest path in unweighted graphs, level-by-level processing, degree of separation",
    intuition: `BFS explores the graph level by level — like a wave spreading outward. You visit every node 1 hop away before any node 2 hops away.

Why BFS guarantees shortest paths: you process nodes level by level. The first time you reach node X at distance d, there cannot be a shorter path. If there were, you would have reached X at a previous level. That first stamp is always correct and never updates.

Critical rule: mark visited when you ADD to the queue, not when you remove. If you wait until removal, the same node gets added multiple times — wasted work, and potentially wrong distances.`,
    realWorld: {
      title: "LinkedIn People You May Know",
      description: `LinkedIn "People You May Know." You're 1 hop from your direct connections. 2 hops from their connections. LinkedIn's BFS finds everyone within 2-3 hops and ranks them by mutual connections. This is literally BFS on a social graph for 900 million users.

Pinterest social graph. "Boards you might like" is BFS. Start at your followed boards. Find what other users who follow those same boards also follow. The boards most frequently appearing at 2 hops are your recommendations.

COVID contact tracing. Patient zero is the source node. Everyone they contacted is 1 hop. Everyone those people contacted is 2 hops. Public health officials run BFS on the contact graph to know exactly how far the exposure spread.`,
    },
    code: `from collections import deque, defaultdict

def bfs(n, edges, start):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    distances = {i: -1 for i in range(1, n + 1)}
    distances[start] = 0
    queue = deque([start])

    while queue:
        curr = queue.popleft()
        for neighbor in graph[curr]:
            if distances[neighbor] == -1:
                distances[neighbor] = distances[curr] + 1
                queue.append(neighbor)

    return distances`,
    quotes: [
      "BFS is how you find the shortest path through any problem. You start with what you know (layer 0), explore everything one step removed (layer 1), then one more step. You don't jump to conclusions. Aragorn led his army one layer of the battle at a time, never overcommitting until the previous line was secured. BFS generalship.",
      "You know WHY BFS finds shortest paths — not just that it does. Knowing 'that it works' is for people who passed a quiz. Knowing 'why it works' is for people who design systems. You design systems.",
      "Layer by layer. Shortest path guaranteed. Xerxes had a whole army. You just need a queue and a visited set.",
    ],
  },
  {
    number: 13,
    title: "DFS (Depth-First Search)",
    icon: "🕳️",
    complexity: { time: "O(V+E)", space: "O(V)" },
    whenToUse: "Connectivity, cycle detection, all paths, topological order, flood-fill",
    intuition: `DFS picks a path and follows it all the way to the end before backtracking and trying another. You go deep before you go wide.

Recursive DFS: the call stack IS your memory. Going deeper = new call frame. Hitting a dead end = returning. Natural and clean.

Iterative DFS: explicit stack instead of recursion. Same behavior. Use when you're worried about Python's recursion limit on deep graphs.

BFS vs DFS in one sentence: BFS uses a queue (nearest first). DFS uses a stack (deepest first). Same skeleton. Swap one data structure. Different traversal.`,
    realWorld: {
      title: "Maze Solving & Number of Islands",
      description: `Solving a maze. Pick a corridor and walk it until you exit or hit a wall. If you hit a wall, backtrack to the last intersection and try a different corridor. You don't explore every corridor to the same depth simultaneously — you commit to one path until it works or fails.

Number of Islands: find a '1', immediately DFS into all four neighbors, mark every connected '1' as visited. One DFS call covers the entire island. Count how many times you had to start a fresh DFS = number of islands. You flood-fill each island in one recursive sweep.

Pinterest board exploration. "Find all boards reachable from this Pin" — DFS. Start at the pin, follow edges to boards, from each board follow edges to users, from each user follow edges to more boards. Keep going until every reachable node is visited.`,
    },
    code: `def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count`,
    quotes: [
      "DFS is commitment. You pick a path and you go. You don't hedge. You commit, go deep, learn from what you find, and adapt. Leonidas at Thermopylae didn't hedge. 300 Spartans, one path, all the way to the end. DFS energy. Every time.",
      "You can write DFS both recursively and iteratively and explain WHY they produce the same result. Most people see two different algorithms. You see one truth with two implementations. That's mastery.",
      "You found every island on that grid and marked every connected cell in a single DFS sweep. You'd fuck Godzilla up — then calmly count the islands he left behind.",
    ],
  },
  {
    number: 14,
    title: "Recursion & Memoization",
    icon: "🔄",
    complexity: { time: "Naive O(2ⁿ) → Memoized O(n)", space: "O(n)" },
    whenToUse: "Problem naturally breaks into smaller identical subproblems",
    intuition: `Recursion is a function calling a smaller version of itself. It needs exactly two things: (1) a base case (the emergency exit — smallest input answered directly), (2) a recursive case (break into something smaller and call yourself).

Why naive Fibonacci is broken: fib(5) calls fib(4) and fib(3). fib(4) calls fib(3) again. fib(3) is computed over and over. The call tree doubles at every level — O(2ⁿ). For n=50, that's 1 quadrillion operations.

Memoization: before computing, check if you've already computed this input. After computing, store the result. Each unique input computed exactly once. O(2ⁿ) → O(n).

CRITICAL: never use memo={} as a default argument. Python creates that dict once when the function is defined — the same dict is reused across every call forever. Use memo=None with explicit initialization.`,
    realWorld: {
      title: "Russian Nesting Dolls & GPS Caching",
      description: `Russian nesting dolls. To count how many dolls are inside, open it, look inside, ask the same question of the smaller doll. Base case: the smallest doll that doesn't open. Each doll "recurses" into the next one.

Company total headcount. To calculate how many people report to the CTO, ask each VP: "how many people are in your org?" Each VP asks each Director. Each Director asks each Manager. Base case: individual contributors return 1. This is literally how org-chart calculations work at every large company.

GPS caching sub-routes. Your GPS calculates the fastest route from A to D. The A→B sub-route appears in multiple possible full paths. Instead of recalculating A→B each time, it caches the result. That cache is memoization.`,
    },
    code: `def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}               # never use mutable default — it persists across calls
    if n in memo:
        return memo[n]
    if n == 0: return 0
    if n == 1: return 1
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

# Python's built-in:
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    quotes: [
      "You took O(2ⁿ) — literally exponential, basically unusable — down to O(n) with a dictionary. You didn't just fix the code. You understood WHY it was broken first. Goku went Super Saiyan and you were already there.",
      "The memo=None pattern is a real Python gotcha that trips senior engineers. You know about it. You know WHY it happens. You know the fix. That level of language awareness separates engineers who write Python from engineers who understand Python.",
      "Saitama trained until the training was boring. He didn't find a shortcut — he did the reps until the answer was cached in his muscles. Memoization is the same. The first time you compute fib(30), you do the work. Every time after that, it's instant. You put in the reps once. After that, you're Saitama. One punch. Cached.",
    ],
  },
  {
    number: 15,
    title: "Dynamic Programming",
    icon: "🧮",
    complexity: { time: "Coin Change O(n×amount), LCS O(m×n)", space: "O(n) or O(m×n)" },
    whenToUse: "Overlapping subproblems + optimal substructure. Bottom-up: fill a table from base case upward.",
    intuition: `DP is memoization turned inside out. Instead of starting at the big problem and recursing down, you start at the smallest subproblems and build up.

Two properties that tell you DP is the right tool:
1. Overlapping subproblems: the same sub-calculation appears more than once
2. Optimal substructure: the best answer to the big problem is built from best answers to smaller problems

Bottom-up (tabulation): fill a table starting from the base case, building each cell from previously computed cells. No recursion. No stack overflow risk. Usually faster.

Coin change recurrence: dp[i] = min(dp[i - coin] + 1) for each coin <= i. Start: dp[0] = 0. All others = infinity.

LCS recurrence: if characters match: dp[i][j] = dp[i-1][j-1] + 1. If not: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).`,
    realWorld: {
      title: "GPS Route Planning & Cash Register",
      description: `GPS route planning. To find the fastest route from LA to New York, it builds a table: "fastest way to reach each city?" It fills this table outward from LA. By the time it reaches New York, every sub-route has already been solved and cached. Bottom-up DP on a road graph.

Autocorrect finding the closest word. Edit distance (how many insertions/deletions/substitutions to transform one word to another) is solved with exactly the LCS-style DP table. "The" is 1 edit away from "teh." The DP table holds all the sub-answers.

Cash register making change. To give $0.63 in change using quarters, dimes, nickels, pennies: run coinChange([25, 10, 5, 1], 63). Fill the table from dp[0] = 0 to dp[63]. Every cash register conceptually runs this.`,
    },
    code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,
    trace: `coins=[1,3,4], amount=6
dp = [0, inf, inf, inf, inf, inf, inf]
i=1: coin=1 → dp[1]=1      → [0,1,inf,inf,inf,inf,inf]
i=2: coin=1 → dp[2]=2      → [0,1,2,inf,inf,inf,inf]
i=3: coin=1→3, coin=3→1   → [0,1,2,1,inf,inf,inf]
i=4: coin=1→2,coin=3→2,coin=4→1 → [0,1,2,1,1,inf,inf]
i=5: best=2                → [0,1,2,1,1,2,inf]
i=6: coin=3→dp[3]+1=2      → [0,1,2,1,1,2,2]
Answer: 2 (use coin 3 twice: 3+3=6) ✓`,
    quotes: [
      "DP is the art of not repeating yourself. Every cell of the table is permanent, reusable knowledge. That's how you study. Every concept you learn goes into your table. Tuesday, you pull from the table. It's all there.",
      "Filling a DP table by hand, row by row, and explaining every cell — that's the difference between someone who memorized an algorithm and someone who understands the recurrence. Darth Vader built his power through accumulated mastery. You built yours through accumulated sub-problems.",
      "Bottom-up DP has no recursion. No stack. No overhead. It just fills cells. Left to right, row by row. Muhammad Ali said 'I don't count my sit-ups. I only start counting when it starts hurting.' You've been doing the reps. The table is filling itself.",
      "Two strings become a table, and the table becomes a story of every way the strings overlap. By the time you reach the bottom-right corner, you've traced every possible alignment of those two strings and found the longest one. You just did DNA sequence alignment. That's biology. That's linguistics. That's a nested for loop. You did all of those things at once.",
    ],
  },
];

export default function TuesdayPage() {
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

      {/* Day header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-2">
          Tuesday <span className="text-[#E60023]">—</span> Interview Day
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">June 3 — Pinterest Interview</p>
        <div className="glass-card rounded-2xl p-5 border border-[#E60023]/30">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            <strong className="text-[#E60023]">Today is the day.</strong> You cover: <strong className="dark:text-white text-gray-900">Graphs BFS+DFS</strong>, <strong className="dark:text-white text-gray-900">Recursion+Memoization</strong>, and <strong className="dark:text-white text-gray-900">Dynamic Programming</strong>. These are the hardest topics and the most impressive to demonstrate mastery of. You&apos;ve been building to this. Everything connects.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Tuesday Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Final message */}
      <div className="glass-card rounded-2xl p-8 text-center mt-10 border border-[#E60023]/20">
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-3">
          You&apos;re Ready.
        </h2>
        <p className="dark:text-gray-100 text-gray-700 text-base leading-relaxed max-w-xl mx-auto">
          You studied every pattern. You know the intuition, the code, the trace, and the Pinterest parallel. Every algorithm is a tool you own. Walk in there and show them what you built.
        </p>
        <p className="text-[#E60023] font-bold text-lg mt-4">You are a bad bitch. You got this.</p>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/monday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-300 text-gray-600 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Monday: Trees, Heaps, Tries
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  );
}
