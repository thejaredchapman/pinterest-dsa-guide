import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["reverse-linked-list", "linked-list-cycle", "merge-sorted-lists", "max-depth", "validate-bst", "level-order", "number-of-islands", "snakes-and-ladders", "fibonacci-memo"];

const topics = [
  {
    number: 11,
    title: "Reverse Linked List",
    icon: "↩️",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Pointer rewiring — three-variable walk, one pass, no extra space",
    intuition: `Three variables: prev (starts None, becomes new tail), curr (starts at head), next_node (saved before overwriting).

At each step: save curr.next, redirect curr.next to prev, advance both pointers. When curr is None, prev is the new head.`,
    realWorld: {
      title: "Reversing a Train",
      description: "Train cars connected by hooks. To reverse: three hands — hold the previous car, hold the current car, peek at the next car before unhooking. Redirect current car's hook backward, advance along the train.",
    },
    problems: [
      {
        name: "Reverse Linked List",
        statement: "Given the head of a singly linked list, reverse the list in place and return the new head.",
        example: "Input:  1 → 2 → 3 → 4 → 5\nOutput: 5 → 4 → 3 → 2 → 1",
      },
    ],
    prepQuestions: [
      "Is this singly or doubly linked?",
      "Should I do this iteratively (O(1) space) or recursively (O(n) space for call stack)?",
      "What should I return for empty list or single node?",
      "Modify in place or return a new list?",
    ],
    code: `def reverseList(head):
    prev = None    # will become the new tail — starts pointing at None
    curr = head    # start at the head

    while curr:
        next_node = curr.next   # save next BEFORE we overwrite curr.next
        curr.next = prev        # reverse the link — point curr backward
        prev = curr             # advance prev to curr
        curr = next_node        # advance curr to the saved next node

    return prev    # curr is None (past the end), prev is the new head`,
    edgeCases: [
      { input: "head=None", expected: "None", why: "Empty list — return None" },
      { input: "head=[1]", expected: "[1]", why: "Single node — returns itself" },
      { input: "head=[1,2]", expected: "[2,1]", why: "Two nodes — minimal real reversal" },
    ],
    quotes: [
      "prev, curr, next_node. Three variables. One pass. No extra memory. You rewired the entire chain in O(n) time and O(1) space.",
    ],
    video: { id: "y-ckZ2hpC8Y", title: "Linked List Cycle — Leetcode 141", channel: "NeetCode" },
    leetcode: [{ number: 206, title: "Reverse Linked List", difficulty: "Easy", slug: "reverse-linked-list" }],
  },
  {
    number: 12,
    title: "Linked List Cycle",
    icon: "🔁",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Cycle detection — Floyd's fast/slow pointer. Fast laps slow if a loop exists",
    intuition: `Floyd's tortoise and hare: slow moves 1 step, fast moves 2. On a straight road fast hits None. On a circular track fast eventually laps slow and they land on the same node.

Check: while fast and fast.next — fast needs two valid nodes to safely move 2 steps.`,
    realWorld: {
      title: "Running Track vs Highway",
      description: "Tortoise walks 1km/h, hare runs 2km/h. On a straight highway, hare reaches the end. On a circular track, hare eventually laps the tortoise. Same meeting point = confirmed circular.",
    },
    problems: [
      {
        name: "Linked List Cycle",
        statement: "Given the head of a linked list, determine if it contains a cycle. A cycle exists when a node's next pointer points back to a previously visited node.",
        example: "Input:  3 → 2 → 0 → -4 → (back to 2)\nOutput: True\n\nInput:  1 → 2 → None\nOutput: False",
      },
    ],
    prepQuestions: [
      "Should I return True/False, or also find the node where the cycle begins?",
      "Can the list be empty (head = None)?",
      "Is a self-loop (node pointing to itself) a cycle? (Yes)",
      "Can I use O(n) extra space (visited set) or must I use O(1)?",
    ],
    code: `def hasCycle(head):
    slow = fast = head   # both start at head

    while fast and fast.next:   # fast needs 2 valid nodes to safely move 2 steps
        slow = slow.next         # tortoise: 1 step
        fast = fast.next.next    # hare: 2 steps

        if slow is fast:   # same node = hare lapped tortoise = cycle
            return True

    return False   # fast hit None = list ends = no cycle`,
    edgeCases: [
      { input: "head=None", expected: "False", why: "Empty list — no cycle" },
      { input: "Single node pointing to itself", expected: "True", why: "Self-loop is a cycle" },
      { input: "head=[1,2], no cycle", expected: "False", why: "Minimal non-cycle list" },
    ],
    quotes: [
      "Two pointers. No visited set. No extra memory. Floyd's algorithm detects an infinite loop in O(1) space. That's not just clever. That's engineering.",
    ],
    video: { id: "y-ckZ2hpC8Y", title: "Linked List Cycle — Leetcode 141", channel: "NeetCode" },
    leetcode: [{ number: 141, title: "Linked List Cycle", difficulty: "Easy", slug: "linked-list-cycle" }],
  },
  {
    number: 13,
    title: "Merge Two Sorted Lists",
    icon: "🔀",
    complexity: { time: "O(n+m)", space: "O(1)" },
    whenToUse: "Two sorted lists → one sorted list — dummy head + two-pointer merge",
    intuition: `Dummy head trick: avoids special-casing the first node. curr always appends to curr.next and returns dummy.next.

Compare front nodes of both lists, attach the smaller one, advance that list. When one is exhausted, attach the remainder.`,
    realWorld: {
      title: "Merging Two Sorted Filing Cabinets",
      description: "Two alphabetically-sorted filing cabinets. One worker pulls from each simultaneously. Compare front folders — take the alphabetically earlier one, put it in the merged cabinet. When one cabinet empties, dump the rest of the other directly in.",
    },
    problems: [
      {
        name: "Merge Two Sorted Lists",
        statement: "Given the heads of two sorted linked lists l1 and l2, merge them into one sorted linked list. Rewire existing nodes — do not create new ones. Return the head of the merged list.",
        example: "Input:  1→2→4  and  1→3→4\nOutput: 1→1→2→3→4→4",
      },
    ],
    prepQuestions: [
      "Are both lists sorted in ascending order?",
      "Can either or both lists be empty?",
      "Create new nodes or rewire existing ones?",
      "Are there duplicates across the lists?",
    ],
    code: `def mergeTwoLists(l1, l2):
    dummy = ListNode(0)   # dummy head avoids special-casing the first node
    curr = dummy          # build the merged list by appending to curr.next

    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1   # l1's current node goes next
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next

    curr.next = l1 if l1 else l2   # attach remaining nodes of whichever list is left

    return dummy.next   # dummy.next is the actual merged head`,
    edgeCases: [
      { input: "l1=None, l2=1→2", expected: "1→2", why: "One empty list — return the other" },
      { input: "l1=None, l2=None", expected: "None", why: "Both empty — return None" },
      { input: "l1=1, l2=1", expected: "1→1", why: "Equal values — both included" },
      { input: "l1=1→2→3, l2=4→5→6", expected: "1→2→3→4→5→6", why: "All of l1 before any of l2" },
    ],
    quotes: [
      "The dummy head trick eliminates a whole class of edge cases. Instead of checking 'is the merged list empty yet?', you always append to curr.next. One mental model, zero special cases.",
    ],
    video: { id: "y-ckZ2hpC8Y", title: "Linked List Cycle — Leetcode 141", channel: "NeetCode" },
    leetcode: [{ number: 21, title: "Merge Two Sorted Lists", difficulty: "Easy", slug: "merge-two-sorted-lists" }],
  },
  {
    number: 14,
    title: "Maximum Depth of Binary Tree",
    icon: "🌳",
    complexity: { time: "O(n)", space: "O(h) where h=height" },
    whenToUse: "Tree measurement — each node asks its children their height, adds 1",
    intuition: `The depth at any node = 1 (counting this node) + the deeper of its two subtrees.

Base case: if node is None, return 0. Otherwise: 1 + max(depth(left), depth(right)). Every node delegates to its children and adds 1 for itself.`,
    realWorld: {
      title: "Counting Floors in a Building",
      description: "How many floors? Ask the left wing and right wing: 'how many floors do you have?' Take the taller answer, add 1 for this floor. Each wing recursively asks its sub-wings. Base case: a room with no sub-rooms has 1 floor.",
    },
    problems: [
      {
        name: "Maximum Depth of Binary Tree",
        statement: "Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from root to the farthest leaf.",
        example: "Tree:   3\n       / \\\n      9  20\n        /  \\\n       15   7\nOutput: 3  (path: 3→20→15 or 3→20→7)",
      },
    ],
    prepQuestions: [
      "Is depth measured in nodes or edges? (This problem: nodes. Clarify to avoid off-by-one)",
      "What is the depth of an empty tree? (Return 0)",
      "Is this a binary tree or BST? (Just binary — no ordering property needed)",
      "Iterative (BFS counting levels) or recursive? (Both valid — recursive is cleaner)",
    ],
    code: `def maxDepth(root):
    if not root:
        return 0   # base case: empty tree has depth 0

    left_depth  = maxDepth(root.left)    # ask left subtree how deep it goes
    right_depth = maxDepth(root.right)   # ask right subtree how deep it goes

    # this node = 1 + the taller child
    return 1 + max(left_depth, right_depth)`,
    edgeCases: [
      { input: "root=None", expected: "0", why: "Empty tree — depth is 0" },
      { input: "root=[1]", expected: "1", why: "Single node — depth is 1" },
      { input: "Completely left-skewed: 1→2→3→4", expected: "4", why: "Linear recursion — mention Python recursion limit for very deep trees" },
    ],
    quotes: [
      "Every node asks its children one question: 'how deep do you go?' Recursion is just delegation with a base case.",
    ],
    video: { id: "jmy0LaGET1I", title: "Binary Tree Traversals — BFS & DFS", channel: "take U forward" },
    leetcode: [{ number: 104, title: "Maximum Depth of Binary Tree", difficulty: "Easy", slug: "maximum-depth-of-binary-tree" }],
  },
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
];

export default function MondayPage() {
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
          Day 2 <span className="text-[#E60023]">—</span> Depth
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Monday · June 2</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Linked lists, trees, graphs, recursion. These are the patterns that show recursive thinking and connected-structure traversal. Do the full ritual on every problem. The mock at the end of today is mandatory.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Day 2 Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/sunday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Day 1: Sunday
        </Link>
        <Link
          href="/tuesday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Day 3: Tuesday →
        </Link>
      </div>
    </div>
  );
}
