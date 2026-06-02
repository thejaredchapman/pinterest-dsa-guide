import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["binary-search", "rotated-sorted-array", "climbing-stairs", "house-robber", "word-search", "combination-sum", "product-except-self"];

const topics = [
  {
    number: 22,
    title: "Binary Search",
    icon: "🔍",
    complexity: { time: "O(log n)", space: "O(1)" },
    whenToUse: "Sorted array + find a target, or minimize/maximize a value that has a monotone property",
    intuition: `Eliminate half the search space on every step. Left pointer starts at 0, right at n-1. Mid = left + (right - left) // 2 — never (left + right) // 2 which can overflow in other languages.

If mid is the answer, return it. If answer is to the right, left = mid + 1. If to the left, right = mid - 1. Exit when left > right.`,
    realWorld: {
      title: "Guessing Game",
      description: "Guess a number 1–1000. Each guess: told higher/lower. Never guess randomly — always guess the midpoint of what's still possible. 1000 → 500 → 250 → ... At most 10 guesses. That's O(log n).",
    },
    problems: [
      {
        name: "Binary Search",
        statement: "Given a sorted array of distinct integers and a target, return the target's index. Return -1 if not found.",
        example: "Input:  nums=[-1,0,3,5,9,12], target=9\nOutput: 4\n\nInput:  nums=[-1,0,3,5,9,12], target=2\nOutput: -1",
      },
    ],
    prepQuestions: [
      "Is the array sorted? (Binary search requires sorted input)",
      "Are there duplicates? (Standard binary search with distinct values; duplicates need lower/upper bound variants)",
      "Return index or value?",
      "What to return if not found?",
    ],
    code: `def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2   # avoid overflow — use this form always

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1    # target is in right half — discard left
        else:
            right = mid - 1   # target is in left half — discard right

    return -1   # exhausted search space`,
    trace: `nums=[-1,0,3,5,9,12], target=9
left=0, right=5, mid=2 → nums[2]=3 < 9 → left=3
left=3, right=5, mid=4 → nums[4]=9 == target → return 4 ✓`,
    edgeCases: [
      { input: "nums=[5], target=5", expected: "0", why: "Single-element array, found" },
      { input: "nums=[5], target=3", expected: "-1", why: "Single-element, not found" },
      { input: "Empty array", expected: "-1", why: "left > right from the start" },
      { input: "target at index 0", expected: "0", why: "Leftmost boundary" },
      { input: "target at last index", expected: "n-1", why: "Rightmost boundary" },
    ],
    quotes: [
      "left + (right - left) // 2. Never (left + right) // 2. Overflow is a real bug in other languages and the interviewer knows the difference.",
      "Every time you use binary search you're saying: I know with certainty that the answer cannot be in that half. That certainty is what makes it O(log n).",
    ],
    video: { id: "s4DPM8ct1pI", title: "Binary Search — Leetcode 704", channel: "NeetCode" },
    leetcode: [
      { number: 704, title: "Binary Search", difficulty: "Easy", slug: "binary-search" },
    ],
  },
  {
    number: 23,
    title: "Search in Rotated Sorted Array",
    icon: "🌀",
    complexity: { time: "O(log n)", space: "O(1)" },
    whenToUse: "Sorted array that was rotated — binary search still works, determine which half is sorted first",
    intuition: `A rotated sorted array is still partially sorted: one of the two halves around mid is always fully sorted. Figure out which half is sorted, then check if target falls within it. If yes, search that half. If no, search the other.

Key: check if left ≤ mid to determine if left half is sorted (vs right half).`,
    realWorld: {
      title: "Circular Shelf",
      description: "A sorted shelf was rotated — the items wrap around. One half of the shelf (left or right of your current position) is still in correct sorted order. Figure out which half is sorted, check if your item belongs there, then narrow accordingly.",
    },
    problems: [
      {
        name: "Search in Rotated Sorted Array",
        statement: "An integer array sorted in ascending order was rotated at some pivot. Given the array and a target, return the target's index. Return -1 if not found. Must be O(log n).",
        example: "Input:  nums=[4,5,6,7,0,1,2], target=0\nOutput: 4\n\nInput:  nums=[4,5,6,7,0,1,2], target=3\nOutput: -1",
      },
    ],
    prepQuestions: [
      "Are there duplicates? (This problem: no. With duplicates, worst case degrades to O(n))",
      "What if the array was never rotated? (Standard binary search behavior — still works)",
      "Must be O(log n), or is O(n) scan acceptable?",
    ],
    code: `def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[left] <= nums[mid]:           # LEFT half is sorted
            if nums[left] <= target < nums[mid]:  # target in sorted left half?
                right = mid - 1
            else:
                left = mid + 1
        else:                                  # RIGHT half is sorted
            if nums[mid] < target <= nums[right]: # target in sorted right half?
                left = mid + 1
            else:
                right = mid - 1

    return -1`,
    trace: `nums=[4,5,6,7,0,1,2], target=0
mid=3, nums[3]=7 ≠ 0
nums[0]=4 ≤ nums[3]=7 → left half sorted: [4,5,6,7]
target 0 not in [4,7) → left = mid+1 = 4

mid=5, nums[5]=1 ≠ 0
nums[4]=0 ≤ nums[5]=1 → left half sorted: [0,1]
target 0 in [0,1) → right = mid-1 = 4

mid=4, nums[4]=0 == target → return 4 ✓`,
    edgeCases: [
      { input: "Not rotated: [1,2,3,4,5]", expected: "Standard binary search result", why: "Works correctly — left half check still holds" },
      { input: "Single element matching target", expected: "0", why: "Base case" },
      { input: "Target not present", expected: "-1", why: "Exhausts both halves" },
    ],
    quotes: [
      "One half is always sorted. Which half? Check if nums[left] ≤ nums[mid]. That one decision unlocks binary search on a rotated array. That's not memorization — that's reasoning.",
    ],
    video: { id: "U8XENwh8Oy8", title: "Search in Rotated Sorted Array — Leetcode 33", channel: "NeetCode" },
    leetcode: [
      { number: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", slug: "search-in-rotated-sorted-array" },
    ],
  },
  {
    number: 24,
    title: "Climbing Stairs",
    icon: "🪜",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Count distinct ways to reach a goal taking steps of fixed sizes — DP recurrence",
    intuition: `To reach stair n, you came from stair n-1 (took 1 step) or stair n-2 (took 2 steps). So ways(n) = ways(n-1) + ways(n-2). That's Fibonacci.

Only need the last two values — O(1) space. This is the DP pattern in its purest form: identify what sub-solutions you need, express the recurrence, compute bottom-up.`,
    realWorld: {
      title: "Number of Routes to Your Desk",
      description: "Floor has 10 steps. You can take 1 or 2 at a time. How many different step sequences reach the top? To be at step 10, you were at step 9 (took 1) or step 8 (took 2). Routes to 10 = routes to 9 + routes to 8. Pure recurrence.",
    },
    problems: [
      {
        name: "Climbing Stairs",
        statement: "You climb a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        example: "Input:  n=3\nOutput: 3\n(1+1+1, 1+2, 2+1)",
      },
    ],
    prepQuestions: [
      "Only 1-step and 2-step allowed, or also 3-step?",
      "n=1 and n=2 edge cases — confirm base cases before coding",
      "Return count or list the actual paths?",
    ],
    code: `def climbStairs(n):
    if n <= 2:
        return n   # base cases: 1 way to climb 1 stair, 2 ways for 2 stairs

    prev2, prev1 = 1, 2   # ways to reach stair 1, stair 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2   # ways to reach this stair
        prev2 = prev1
        prev1 = curr

    return prev1`,
    trace: `n=5:
stair 1: 1 way  (prev2)
stair 2: 2 ways (prev1)
stair 3: 1+2=3, prev2=2, prev1=3
stair 4: 2+3=5, prev2=3, prev1=5
stair 5: 3+5=8, prev2=5, prev1=8
Answer: 8`,
    edgeCases: [
      { input: "n=1", expected: "1", why: "One step, one way" },
      { input: "n=2", expected: "2", why: "(1+1) or (2)" },
      { input: "n=3", expected: "3", why: "(1+1+1), (1+2), (2+1)" },
    ],
    quotes: [
      "Climbing Stairs is Fibonacci wearing a different costume. Once you recognize the recurrence, the DP writes itself. Two variables. No array. O(1) space.",
      "Every DP problem is the same question: what do I need from the past to solve the present?",
    ],
    video: { id: "Y0lT9Fck7qI", title: "Climbing Stairs — Dynamic Programming — Leetcode 70", channel: "NeetCode" },
    leetcode: [
      { number: 70, title: "Climbing Stairs", difficulty: "Easy", slug: "climbing-stairs" },
    ],
  },
  {
    number: 25,
    title: "House Robber",
    icon: "🏠",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Make choices on a sequence where adjacent choices are forbidden — DP with skip-one recurrence",
    intuition: `At house i: either rob it (take nums[i] + best up to i-2) or skip it (take best up to i-1). dp[i] = max(dp[i-1], dp[i-2] + nums[i]).

Space-optimize to two variables. This is the template for "adjacent forbidden" DP problems.`,
    realWorld: {
      title: "Non-Adjacent Salary Bonuses",
      description: "Ten employees in a row with different bonus amounts. Policy: you can only grant bonuses to non-adjacent employees (alarm triggers if two neighbors both get bonused). Maximize total bonuses granted. Classic non-adjacent selection.",
    },
    problems: [
      {
        name: "House Robber",
        statement: "You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have a security system — robbing two adjacent houses triggers an alarm. Given an integer array nums representing each house's value, return the maximum amount you can rob tonight.",
        example: "Input:  nums=[2,7,9,3,1]\nOutput: 12  (rob 2, 9, 1 — houses 0, 2, 4)",
      },
    ],
    prepQuestions: [
      "Are all values non-negative? (Yes — robbing is always better than not if allowed)",
      "What about n=1? (Return nums[0])",
      "What about n=2? (Return max(nums[0], nums[1]))",
      "Circular arrangement (House Robber II)? (Clarify — this one is linear)",
    ],
    code: `def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2 = nums[0]              # best up to house 0
    prev1 = max(nums[0], nums[1])  # best up to house 1

    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])   # rob this house or skip it
        prev2 = prev1
        prev1 = curr

    return prev1`,
    trace: `nums=[2,7,9,3,1]
prev2=2, prev1=max(2,7)=7
i=2: curr=max(7, 2+9)=11, prev2=7, prev1=11
i=3: curr=max(11,7+3)=11, prev2=11, prev1=11
i=4: curr=max(11,11+1)=12, prev2=11, prev1=12
Answer: 12 ✓`,
    edgeCases: [
      { input: "nums=[1]", expected: "1", why: "Single house" },
      { input: "nums=[2,1]", expected: "2", why: "Take the larger one" },
      { input: "nums=[2,7,9,3,1]", expected: "12", why: "Rob houses 0,2,4: 2+9+1" },
      { input: "All same value, odd length", expected: "ceil(n/2) * val", why: "Rob every other house" },
    ],
    quotes: [
      "Rob it or skip it. Two choices. One recurrence. O(n) time, O(1) space. The moment you spot 'no two adjacent' in a problem, you know exactly what DP shape you're using.",
    ],
    video: { id: "73r3KWiEvyk", title: "House Robber — Dynamic Programming — Leetcode 198", channel: "NeetCode" },
    leetcode: [
      { number: 198, title: "House Robber", difficulty: "Medium", slug: "house-robber" },
    ],
  },
  {
    number: 26,
    title: "Word Search",
    icon: "🔤",
    complexity: { time: "O(m×n×4^L)", space: "O(L)" },
    whenToUse: "Find a sequence on a 2D grid with path constraints — backtracking DFS with in-place visited marking",
    intuition: `Try every cell as a starting point. From each cell, DFS in all 4 directions. If the current cell matches the expected character, mark it visited (temporarily), recurse deeper, then unmark (backtrack). The backtrack step is critical — it lets other paths reuse the cell.`,
    realWorld: {
      title: "Word Hunt Puzzle",
      description: "Classic word-find grid. You trace a path letter by letter — each step must be adjacent. You can't use the same cell twice in one word, but other words can reuse it. Backtracking lets you explore and abandon bad paths without permanently marking cells.",
    },
    problems: [
      {
        name: "Word Search",
        statement: "Given an m×n grid of characters and a word, return true if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same letter cell may not be used more than once.",
        example: "board=[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nword=\"ABCCED\" → True\nword=\"SEE\" → True\nword=\"ABCB\" → False",
      },
    ],
    prepQuestions: [
      "Adjacent = 4-directional or 8-directional (including diagonals)?",
      "Can the same cell be reused in one path? (No)",
      "Case-sensitive matching?",
      "What if word is longer than all cells combined? (Can return False immediately)",
    ],
    code: `def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, i):
        if i == len(word):
            return True   # matched all characters
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False  # out of bounds
        if board[r][c] != word[i]:
            return False  # wrong character
        if board[r][c] == '#':
            return False  # already visited this path

        temp = board[r][c]
        board[r][c] = '#'   # mark visited — prevent reuse in this path

        found = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or
                 dfs(r,c+1,i+1) or dfs(r,c-1,i+1))

        board[r][c] = temp   # backtrack — restore for other paths
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True

    return False`,
    edgeCases: [
      { input: "Single-char word, present", expected: "True", why: "Any matching cell" },
      { input: "Word longer than grid has cells", expected: "False", why: "Impossible by pigeonhole" },
      { input: "Word uses same character multiple times", expected: "Depends on path", why: "Character can appear elsewhere — not same cell" },
      { input: "Entire grid is one word", expected: "True", why: "Valid if path traces entire grid" },
    ],
    quotes: [
      "Mark it, explore, unmark it. Three lines. That's backtracking. Without the unmark, a path that fails poisons every other path through those cells.",
    ],
    video: { id: "pfiQ_PS2g6w", title: "Word Search — Backtracking — Leetcode 79", channel: "NeetCode" },
    leetcode: [
      { number: 79, title: "Word Search", difficulty: "Medium", slug: "word-search" },
    ],
  },
  {
    number: 27,
    title: "Combination Sum",
    icon: "➕",
    complexity: { time: "O(n^(T/M))", space: "O(T/M)" },
    whenToUse: "All combinations summing to target (reuse allowed) — backtracking with a running total",
    intuition: `Build combinations by deciding, at each step, which number to add next. Allow reusing the same number by passing the same index back. Skip the current number by advancing the index. Prune when the running total exceeds the target — no point going deeper.

This is the template for all combination/subset backtracking problems.`,
    realWorld: {
      title: "Exact Change with Unlimited Coins",
      description: "Given coin denominations, find all combinations of coins that sum to exactly a target amount. Each denomination has unlimited quantity. You build each combination incrementally, abandoning any path where the running total overshoots.",
    },
    problems: [
      {
        name: "Combination Sum",
        statement: "Given an array of distinct positive integers candidates and a target, return all unique combinations of candidates that sum to target. Each number may be used unlimited times. The solution set must not contain duplicate combinations.",
        example: "Input:  candidates=[2,3,6,7], target=7\nOutput: [[2,2,3],[7]]\n\nInput:  candidates=[2,3], target=6\nOutput: [[2,2,2],[3,3]]",
      },
    ],
    prepQuestions: [
      "Can each number be reused? (Yes in this problem — pass same index)",
      "Are the candidates distinct? (Yes — no need to deduplicate)",
      "Return count or the actual combinations?",
      "Does order matter? ([2,3] vs [3,2] — same combination)?",
    ],
    code: `def combinationSum(candidates, target):
    results = []

    def backtrack(start, current, remaining):
        if remaining == 0:
            results.append(list(current))   # found a valid combination
            return
        if remaining < 0:
            return   # overshot — prune this branch

        for i in range(start, len(candidates)):
            current.append(candidates[i])
            # pass i (not i+1) to allow reusing same element
            backtrack(i, current, remaining - candidates[i])
            current.pop()   # backtrack — remove last element

    backtrack(0, [], target)
    return results`,
    trace: `candidates=[2,3,6,7], target=7
backtrack(0, [], 7)
  add 2 → backtrack(0, [2], 5)
    add 2 → backtrack(0, [2,2], 3)
      add 2 → backtrack(0, [2,2,2], 1)
        add 2 → remaining=-1 → prune
        add 3 → remaining=-2 → prune
      add 3 → backtrack(0, [2,2,3], 0) → append [2,2,3] ✓
  add 3 → backtrack(1, [2,3], 2)
    add 3 → remaining=-1 → prune
  add 6 → remaining=-1 → prune
  add 7 → remaining=0 → append [7] wait, no: [2] + 7 = 9 > 7, prune
backtrack(3, [7], 0) → append [7] ✓`,
    edgeCases: [
      { input: "target = one of the candidates", expected: "[[candidate]]", why: "Single-element combo" },
      { input: "No combination sums to target", expected: "[]", why: "All branches pruned" },
      { input: "candidates=[1], target=5", expected: "[[1,1,1,1,1]]", why: "Single candidate used 5 times" },
    ],
    quotes: [
      "Backtracking is recursion with an undo button. Pick a candidate, recurse, undo. That 'current.pop()' line is the backtrack — it's what lets you explore every branch without contaminating the others.",
    ],
    video: { id: "GBKI9VSKdGg", title: "Combination Sum — Backtracking — Leetcode 39", channel: "NeetCode" },
    leetcode: [
      { number: 39, title: "Combination Sum", difficulty: "Medium", slug: "combination-sum" },
    ],
  },
  {
    number: 28,
    title: "Product of Array Except Self",
    icon: "✖️",
    complexity: { time: "O(n)", space: "O(1) output" },
    whenToUse: "Product of all elements except current — prefix/suffix product, no division",
    intuition: `For position i: the product of everything except nums[i] = (product of all elements left of i) × (product of all elements right of i).

Pass 1 left-to-right: build prefix products. Pass 2 right-to-left: multiply by suffix products. Never divide — handles zeros correctly. Output array counts as O(1) extra space by convention.`,
    realWorld: {
      title: "Revenue Impact Analysis",
      description: "Each store's contribution to total network revenue if that store closed = product of every other store's revenue. Compute for all stores simultaneously without O(n²) nested multiplication. Prefix pass captures everything to the left; suffix pass captures everything to the right.",
    },
    problems: [
      {
        name: "Product of Array Except Self",
        statement: "Given an integer array nums, return an array answer where answer[i] equals the product of all elements of nums except nums[i]. Must run in O(n) without using the division operator.",
        example: "Input:  nums=[1,2,3,4]\nOutput: [24,12,8,6]\n(24=2×3×4, 12=1×3×4, 8=1×2×4, 6=1×2×3)",
      },
    ],
    prepQuestions: [
      "Can we use division? (No — the constraint is the point)",
      "Can input contain zeros? (Yes — two zeros → all zeros except possibly index of second zero)",
      "Guaranteed at least 2 elements?",
      "32-bit product overflow concern?",
    ],
    code: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    # Pass 1: result[i] = product of all elements LEFT of i
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]   # extend prefix for next position

    # Pass 2: multiply by product of all elements RIGHT of i
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]   # extend suffix for next position

    return result`,
    trace: `nums=[1,2,3,4]
After prefix pass:
  result = [1, 1, 2, 6]    (1, 1, 1×2, 1×2×3)

After suffix pass (suffix=1,4,12,24):
  i=3: result[3]=6×1=6,    suffix=1×4=4
  i=2: result[2]=2×4=8,    suffix=4×3=12
  i=1: result[1]=1×12=12,  suffix=12×2=24
  i=0: result[0]=1×24=24,  suffix=24×1=24
result = [24,12,8,6] ✓`,
    edgeCases: [
      { input: "[1,0]", expected: "[0,1]", why: "Zero: product including zero is 0; product excluding zero is 1" },
      { input: "[0,0]", expected: "[0,0]", why: "Two zeros: product excluding either zero still has a zero" },
      { input: "[-1,1]", expected: "[1,-1]", why: "Negatives work correctly" },
    ],
    quotes: [
      "Two passes. No division. Handles zeros. O(n). The interviewer is watching to see if you reach for division — don't. Prefix×suffix is the elegant path and you know it.",
    ],
    video: { id: "bNvIQI2wAjk", title: "Product of Array Except Self — Leetcode 238", channel: "NeetCode" },
    leetcode: [
      { number: 238, title: "Product of Array Except Self", difficulty: "Medium", slug: "product-of-array-except-self" },
    ],
  },
];

export default function WednesdayPage() {
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
          Day 3 <span className="text-[#E60023]">—</span> Binary Search & Backtracking
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Thursday · June 4</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Day 3 focus: Binary Search (classic + rotated), DP (Climbing Stairs + House Robber), Backtracking (Word Search + Combination Sum), and Product Except Self. These are the patterns that separate solid candidates from exceptional ones. Binary search is fast and surgical — know it cold. Backtracking is the hardest to hold in your head — trace it on paper first.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Day 3 Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/tuesday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Day 2: Wednesday
        </Link>
        <Link
          href="/thursday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Stretch: Hard Problems →
        </Link>
      </div>
    </div>
  );
}
