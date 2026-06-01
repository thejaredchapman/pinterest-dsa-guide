import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["validate-bst", "level-order", "number-of-islands", "snakes-and-ladders", "fibonacci-memo", "longest-substring", "colorful-number"];

const topics = [
  {
    number: 15,
    title: "Validate BST",
    icon: "✅",
    complexity: { time: "O(n)", space: "O(h)" },
    whenToUse: "BST validation — pass inherited min/max bounds down recursion, not just parent comparison",
    intuition: `Common mistake: only compare node to its direct parent. Wrong — a right-subtree node must be greater than every ancestor, not just its immediate parent.

Fix: pass valid bounds as you recurse. Root bounds: (-inf, +inf). Going left: upper bound tightens to current node's value. Going right: lower bound tightens. Every node must be strictly inside its inherited bounds.`,
    realWorld: {
      title: "Access Control Levels",
      description: "Every manager must have a salary strictly between their skip-level and their direct manager. Checking only direct-parent comparison misses violations from higher up. Bounds propagate downward — each level inherits tighter constraints from its entire ancestry.",
    },
    problems: [
      {
        name: "Validate Binary Search Tree",
        statement: "Given the root of a binary tree, determine if it is a valid BST. A valid BST has: left subtree values strictly less than the node, right subtree values strictly greater, and both subtrees are also valid BSTs.",
        example: "    2\n   / \\\n  1   3    → True\n\n    5\n   / \\\n  1   4\n     / \\\n    3   6  → False  (4 in right subtree of 5 but 4 < 5)",
      },
    ],
    prepQuestions: [
      "Is this strictly less/greater, or are equal values allowed on one side?",
      "What about duplicate values?",
      "What is the range of node values? (Could hit INT_MIN / INT_MAX boundary cases)",
      "Is the tree guaranteed to be a binary tree, or could there be structural issues?",
    ],
    code: `def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True   # empty subtree is always valid

        # this node's value must be STRICTLY within inherited bounds
        if not (min_val < node.val < max_val):
            return False

        # left subtree: all values must be < node.val (tighten upper bound)
        # right subtree: all values must be > node.val (tighten lower bound)
        return (validate(node.left,  min_val,   node.val) and
                validate(node.right, node.val,  max_val))

    return validate(root, float('-inf'), float('inf'))`,
    edgeCases: [
      { input: "root=None", expected: "True", why: "Empty tree is a valid BST" },
      { input: "root=[1]", expected: "True", why: "Single node is always valid" },
      { input: "[5,4,6,null,null,3,7]", expected: "False", why: "Node 3 in right subtree of 5 but 3 < 5 — caught by bounds, not parent check" },
      { input: "[2,2,2]", expected: "False", why: "Duplicates — strictly greater/less means equal is invalid" },
    ],
    quotes: [
      "float('-inf') and float('+inf') as starting bounds — no constraint yet. Every level tightens the bounds. The bounds trick is what separates people who've seen this before from people who figure it out live.",
    ],
    video: { id: "s6ATEkipzow", title: "Validate Binary Search Tree — Leetcode 98", channel: "NeetCode" },
    leetcode: [{ number: 98, title: "Validate Binary Search Tree", difficulty: "Medium", slug: "validate-binary-search-tree" }],
  },
  {
    number: 16,
    title: "Level Order Traversal",
    icon: "🌊",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Process tree level by level — BFS with deque, snapshot queue length per level",
    intuition: `BFS with a deque processes nodes level by level. The key: at the START of each level, snapshot the queue length — that's exactly how many nodes are on this level. Process that many, collect their values, add their children for the next level.`,
    realWorld: {
      title: "Org Chart Floor by Floor",
      description: "Walk a company org chart floor by floor: CEO on floor 1, all VPs on floor 2, all Directors on floor 3. At the start of each floor, count how many people are on it, process all of them, add their reports to the next floor's list.",
    },
    problems: [
      {
        name: "Binary Tree Level Order Traversal",
        statement: "Given the root of a binary tree, return the level order traversal as a list of lists — each inner list contains all node values at that depth, left to right.",
        example: "Tree:  3\n      / \\\n     9  20\n       /  \\\n      15   7\nOutput: [[3], [9,20], [15,7]]",
      },
    ],
    prepQuestions: [
      "Return one flat list or a list of lists grouped by level?",
      "What to return for an empty tree?",
      "Left to right within each level?",
      "Iterative BFS or recursive DFS? (BFS with deque is the natural fit)",
    ],
    code: `from collections import deque

def levelOrder(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)   # snapshot: how many nodes on THIS level right now
        level = []

        for _ in range(level_size):   # process exactly this many nodes
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)

        result.append(level)   # finished one complete level

    return result`,
    edgeCases: [
      { input: "root=None", expected: "[]", why: "Empty tree" },
      { input: "root=[1]", expected: "[[1]]", why: "Single node — one level" },
      { input: "Right-skewed: 1→2→3", expected: "[[1],[2],[3]]", why: "Each level has exactly one node" },
    ],
    quotes: [
      "Snapshot the queue length. Process exactly that many. Add children. That's the entire BFS level trick. Every level-by-level tree problem uses this exact pattern.",
    ],
    video: { id: "6ZnyEApgFYg", title: "Binary Tree Level Order Traversal — BFS — Leetcode 102", channel: "NeetCode" },
    leetcode: [{ number: 102, title: "Binary Tree Level Order Traversal", difficulty: "Medium", slug: "binary-tree-level-order-traversal" }],
  },
  {
    number: 17,
    title: "Number of Islands",
    icon: "🏝️",
    complexity: { time: "O(m×n)", space: "O(m×n)" },
    whenToUse: "Count connected components in a grid — DFS flood-fill each component",
    intuition: `Scan every cell. When you find a '1' you haven't visited, it's the start of a new island. Run DFS from that cell, marking every connected '1' as '#' (visited in-place). Count how many times you start a fresh DFS.`,
    realWorld: {
      title: "Satellite Map Analysis",
      description: "A satellite image grid. Analyst scans pixel by pixel. Finding unvisited land triggers a flood-fill — paint the entire connected landmass. Count how many times the analyst had to start a new flood-fill.",
    },
    problems: [
      {
        name: "Number of Islands",
        statement: "Given an m×n grid of '1's (land) and '0's (water), count the number of islands. An island is a group of '1's connected horizontally or vertically (not diagonally), surrounded by water.",
        example: "Grid: [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]\nOutput: 2",
      },
    ],
    prepQuestions: [
      "Are diagonal connections considered? (Usually no — only horizontal/vertical)",
      "Can I modify the grid in place, or should I use a separate visited set?",
      "Are cells strings ('1'/'0') or integers (1/0)?",
      "What should I return for an empty grid?",
      "Could the grid be very deep — should I mention recursion limit?",
    ],
    code: `def numIslands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '#'   # mark visited in-place — won't be '1' so won't revisit
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':   # unvisited land = new island
                dfs(r, c)           # flood-fill entire island in one call
                count += 1

    return count`,
    edgeCases: [
      { input: "grid=[]", expected: "0", why: "Empty grid" },
      { input: "All water: [['0','0'],['0','0']]", expected: "0", why: "No land" },
      { input: "All land: [['1','1'],['1','1']]", expected: "1", why: "One giant island" },
      { input: "Single cell: [['1']]", expected: "1", why: "Smallest possible island" },
      { input: "Diagonal: [['1','0'],['0','1']]", expected: "2", why: "Diagonals don't connect — two separate islands" },
    ],
    quotes: [
      "DFS flood-fill is beautiful: one function call handles the entire island. Find a '1', call dfs, the entire connected island is marked. Count it and move on.",
      "You found every island and marked every connected cell in a single DFS sweep. You'd fuck Godzilla up — then calmly count the islands he left behind.",
    ],
    video: { id: "gCswsDauXPc", title: "Number of Islands — Leetcode 200 — Graphs (Python)", channel: "NeetCode" },
    leetcode: [{ number: 200, title: "Number of Islands", difficulty: "Medium", slug: "number-of-islands" }],
  },
  {
    number: 18,
    title: "Snakes and Ladders",
    icon: "🎲",
    complexity: { time: "O(n²)", space: "O(n²)" },
    whenToUse: "Shortest path on a board — BFS where snakes/ladders are teleportations applied after landing",
    intuition: `Model each square as a graph node. A dice roll from square i connects to squares i+1 through i+6 (apply snake/ladder if applicable). Minimum rolls = shortest path from square 1 to n².

BFS processes squares in order of rolls taken — first time you reach n² is guaranteed to be via the minimum rolls.`,
    realWorld: {
      title: "City Navigation With Shortcuts and Detours",
      description: "Manhattan grid where some intersections have express subways (ladders = jump ahead) or mandatory detours (snakes = forced backward). BFS finds minimum turns to destination accounting for all teleportations.",
    },
    problems: [
      {
        name: "Snakes and Ladders",
        statement: "On an n×n board numbered 1 to n² (boustrophedon — alternating direction by row, bottom to top), snakes and ladders teleport you between squares. Each move rolls a dice (1-6). Find the minimum moves to reach n² from square 1. Return -1 if impossible.",
        example: "If square 2 has a ladder to 15 and square 17 has a snake to 13:\nMinimum rolls to reach n² from square 1",
      },
    ],
    prepQuestions: [
      "How is the board numbered? (Boustrophedon — alternating left-right/right-left by row, bottom to top)",
      "If a snake/ladder leads to another snake/ladder, do I follow it again?",
      "Can I visit the same square twice? (Yes, but BFS ensures no revisit)",
      "What does -1 mean in the return value?",
    ],
    code: `from collections import deque

def snakesAndLadders(board):
    n = len(board)

    def get_cell(pos):
        # convert 1-based square to board[row][col]
        # board numbered bottom-to-top, alternating direction per row
        pos -= 1
        row = pos // n
        col = pos % n
        if row % 2 == 1:        # odd rows go right-to-left
            col = n - 1 - col
        return board[n - 1 - row][col]   # board row 0 = top row, invert

    queue = deque([(1, 0)])   # (square_number, moves_taken)
    visited = {1}

    while queue:
        square, moves = queue.popleft()
        if square == n * n:
            return moves

        for roll in range(1, 7):
            next_sq = square + roll
            if next_sq > n * n:
                break
            cell_val = get_cell(next_sq)
            if cell_val != -1:   # -1 means no snake/ladder
                next_sq = cell_val
            if next_sq not in visited:
                visited.add(next_sq)
                queue.append((next_sq, moves + 1))

    return -1`,
    edgeCases: [
      { input: "No snakes or ladders", expected: "Minimum pure dice rolls", why: "Baseline" },
      { input: "Ladder from square 2 to n²", expected: "1", why: "One roll and done" },
      { input: "Snake from n² back to 1", expected: "Longer path required", why: "Trap at the finish line" },
    ],
    quotes: [
      "Snakes and Ladders is BFS shortest path wearing a board game costume. Strip it: nodes are squares, edges are dice rolls, teleportations are conditional redirections. BFS on a graph.",
    ],
    video: { id: "6ZnyEApgFYg", title: "Binary Tree Level Order Traversal — BFS", channel: "NeetCode" },
    leetcode: [{ number: 909, title: "Snakes and Ladders", difficulty: "Medium", slug: "snakes-and-ladders" }],
  },
  {
    number: 19,
    title: "Fibonacci — Memoization",
    icon: "🔢",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Overlapping subproblems — cache results so each unique input is computed once",
    intuition: `Naive recursion recomputes the same subproblems exponentially. fib(5) calls fib(4) AND fib(3). fib(4) calls fib(3) AGAIN. Every unique value gets recomputed multiple times — O(2ⁿ).

Memoization: before computing fib(n), check the cache. Already there? Return instantly. After computing, store it. Now every unique n is computed exactly once → O(n).`,
    realWorld: {
      title: "Counting Staircase Paths",
      description: "Climbing stairs 1 or 2 steps at a time — how many distinct ways to reach step n? ways(n) = ways(n-1) + ways(n-2). This IS Fibonacci. Without memo: each stair count is recomputed for every path that passes through it. With memo: computed once, retrieved instantly.",
    },
    problems: [
      {
        name: "Fibonacci with Memoization",
        statement: "Return F(n) where F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Implement with memoization. This demonstrates DP instinct — recognizing that overlapping subproblems should be cached.",
        example: "F(6) = 8\nWithout memo: 25 function calls\nWith memo:    11 function calls (each unique n once)",
      },
    ],
    prepQuestions: [
      "What is F(0)? What is F(1)? (Confirm base cases)",
      "Is there a maximum n? (Deep n → Python recursion limit — mention it)",
      "Top-down memoization (cache + recursion) or bottom-up DP (iterative table)?",
      "Can I use @lru_cache or must I implement the cache manually?",
    ],
    code: `def fib(n, memo=None):
    # memo=None not memo={} — Python creates mutable defaults ONCE at function
    # definition time, so memo={} would persist state across all calls
    if memo is None:
        memo = {}

    if n in memo:      # cache hit — already computed, return instantly
        return memo[n]

    if n <= 1:         # base cases: F(0)=0, F(1)=1
        return n

    memo[n] = fib(n-1, memo) + fib(n-2, memo)   # compute and cache
    return memo[n]

# Python's built-in memoization — mention this as an alternative
from functools import lru_cache

@lru_cache(maxsize=None)   # maxsize=None = unlimited cache
def fib_builtin(n):
    if n <= 1:
        return n
    return fib_builtin(n-1) + fib_builtin(n-2)`,
    edgeCases: [
      { input: "n=0", expected: "0", why: "Base case" },
      { input: "n=1", expected: "1", why: "Base case" },
      { input: "n=2", expected: "1", why: "First non-trivial case" },
      { input: "n=50", expected: "12586269025", why: "Large n — verify memo avoids exponential blowup" },
    ],
    quotes: [
      "You took O(2ⁿ) — 1 quadrillion calls for n=50 — down to O(n) with a dictionary. Not by changing the algorithm. By adding a cache. That instinct IS dynamic programming.",
      "Goku went Super Saiyan and you were already there.",
    ],
    video: { id: "WRoz58oOO7o", title: "Fibonacci Number — Recursion + Memoization + Tabulation", channel: "take U forward" },
    leetcode: [{ number: 509, title: "Fibonacci Number", difficulty: "Easy", slug: "fibonacci-number" }],
  },
  {
    number: 20,
    title: "Longest Substring Without Repeating Characters",
    icon: "🪟",
    complexity: { time: "O(n)", space: "O(min(m,n))" },
    whenToUse: "Longest substring with a constraint — variable sliding window that shrinks on violation",
    intuition: `Variable sliding window. Expand from the right. If the new character creates a duplicate, shrink from the left until the duplicate is evicted. The window always represents the current valid substring. Track the maximum size seen.

One pass. O(n).`,
    realWorld: {
      title: "Warehouse Scanner Without Re-scanning",
      description: "A scanner moves along a conveyor belt. Its window holds any items as long as no item appears twice. Duplicate enters from the right → push items off the left until there's no duplicate. Longest the window ever was = longest valid scan sequence.",
    },
    problems: [
      {
        name: "Longest Substring Without Repeating Characters",
        statement: "Given a string s, find the length of the longest substring with no duplicate characters. A substring is a contiguous sequence of characters.",
        example: "Input:  s=\"abcabcbb\"\nOutput: 3  (\"abc\")\n\nInput:  s=\"bbbbb\"\nOutput: 1  (\"b\")\n\nInput:  s=\"pwwkew\"\nOutput: 3  (\"wke\" — not \"kew\" which would be the same length)",
      },
    ],
    prepQuestions: [
      "Only lowercase letters, or also uppercase, digits, and symbols?",
      "What to return for empty string? (0)",
      "Return the length or the actual substring?",
      "Is this no repeats, or at most k repeats? (Confirm: no repeats for this problem)",
    ],
    code: `def lengthOfLongestSubstring(s):
    seen = set()   # characters currently inside the window
    left = 0       # left boundary of the window
    best = 0       # longest valid window seen so far

    for right in range(len(s)):
        # new character s[right] entering from the right
        while s[right] in seen:
            # duplicate — shrink from left until s[right] is no longer in window
            seen.remove(s[left])
            left += 1

        seen.add(s[right])                   # add new character to window
        best = max(best, right - left + 1)   # window size = right - left + 1

    return best`,
    edgeCases: [
      { input: 's=""', expected: "0", why: "Empty string" },
      { input: 's="a"', expected: "1", why: "Single character" },
      { input: 's="aaaaaa"', expected: "1", why: "All same — window never grows past 1" },
      { input: 's="abcdef"', expected: "6", why: "All unique — entire string is valid" },
      { input: 's=" "', expected: "1", why: "Space is a valid character" },
    ],
    quotes: [
      "Shrink when forced. Grow when safe. The window always contains your current best candidate. One pass. O(n). That's the sliding window pattern.",
    ],
    video: { id: "jMjS8h65xcA", title: "Arrays - Sliding Window — NeetCode Advance DSA", channel: "NeetCode" },
    leetcode: [{ number: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", slug: "longest-substring-without-repeating-characters" }],
  },
  {
    number: 21,
    title: "Colorful Number",
    icon: "🎨",
    complexity: { time: "O(n²)", space: "O(n²)" },
    whenToUse: "All contiguous digit subsequences — nested window with running product (not recomputed each time)",
    intuition: `Nested sliding window. Outer loop: pick a starting digit. Inner loop: extend right one digit at a time, MULTIPLYING the product (not recomputing from scratch). Check each product against a set.

This is the 'chewy' problem on the Pinterest list. The trick is extending the product instead of restarting.`,
    realWorld: {
      title: "Unique Product Codes Across All Shelf Sections",
      description: "Shelf with items 3,2,4,5. Every consecutive section must have a unique total (product). Single items: 3,2,4,5. Two-item sections: 6,8,20. Three-item: 24,40. Full shelf: 120. Any two sections with the same total = fail.",
    },
    problems: [
      {
        name: "Colorful Number",
        statement: "A number is 'colorful' if every contiguous subsequence of its digits has a unique product. For number 3245: check products of [3],[2],[4],[5],[3,2],[2,4],[4,5],[3,2,4],[2,4,5],[3,2,4,5]. If all products are distinct → colorful.",
        example: "Input:  3245\nProducts: 3,2,4,5,6,8,20,24,40,120 — all unique → True\n\nInput:  326\nProducts: 3,2,6,6,12,36 — '6' appears twice ([6] and [3,2]) → False",
      },
    ],
    prepQuestions: [
      "Contiguous subsequences only, or all subsequences?",
      "What about digit 0? (Makes every product containing it equal 0 — duplicates guaranteed)",
      "Single-digit numbers — are they always colorful? (Yes, only one product)",
      "What is the max number of digits? (Affects whether O(n²) is acceptable)",
    ],
    code: `def isColorful(num):
    digits = [int(d) for d in str(num)]   # break number into individual digits
    n = len(digits)
    seen = set()   # all products seen so far

    for start in range(n):
        product = 1   # reset for each new starting position

        for end in range(start, n):
            # EXTEND the window — multiply by next digit instead of recomputing
            product *= digits[end]

            if product in seen:
                return False     # duplicate product found — not colorful
            seen.add(product)

    return True   # all products unique`,
    edgeCases: [
      { input: "num=1", expected: "True", why: "Single digit — one product, always unique" },
      { input: "num=10", expected: "False", why: "Contains 0 — subsequences [1,0] and [0] both produce 0" },
      { input: "num=23", expected: "True", why: "Products: 2, 3, 6 — all unique" },
      { input: "num=326", expected: "False", why: "3×2=6 and digit 6 = 6 — duplicate" },
    ],
    quotes: [
      "Colorful Number is the chewy problem on the Pinterest list. Nested loops but with the running product trick — you extend the window instead of recomputing. That's the move that makes you stand out.",
    ],
    video: { id: "KLlXCFG5TnA", title: "Two Sum — Leetcode 1 — HashMap", channel: "NeetCode" },
    leetcode: [{ number: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", slug: "longest-substring-without-repeating-characters" }],
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

      {/* Countdown badge */}
      <div className="mb-4">
        <CountdownBadge />
      </div>

      {/* Day header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-2">
          Day 3 <span className="text-[#E60023]">—</span> Interview Day
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Tuesday · June 3 · 3:30 PM PDT</p>
        <div className="glass-card rounded-2xl p-5 border border-[#E60023]/30">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Day 3 focus: BST validation, Level Order BFS, Graphs (Islands + Snakes &amp; Ladders), Fibonacci memoization, then the two stretch problems. You have until 3:30 PM. Do problems 15–19 with full ritual, then run problems 20–21 under a timer. After noon: stop grinding, re-type all 7 templates from memory, and sort logistics.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Day 3 Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Interview Day Checklist */}
      <div className="glass-card rounded-2xl p-5 sm:p-6 mt-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#E60023] mb-4">
          Interview Day Checklist
        </h3>
        <ul className="space-y-2">
          {[
            "Restate the problem before touching the keyboard",
            "Ask clarifying questions out loud",
            "State brute force + Big-O before optimizing",
            "Name the pattern and explain the tradeoff",
            "Narrate while coding",
            "Trace through your example after coding",
            "Test: empty, single element, duplicate, negative",
            "Say 'What I'd improve given more time...'",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm dark:text-gray-100 text-gray-700">
              <span className="w-5 h-5 rounded border-2 border-[#E60023]/50 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/monday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Day 2: Monday
        </Link>
      </div>
    </div>
  );
}
