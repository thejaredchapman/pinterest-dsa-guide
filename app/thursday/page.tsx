import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["course-schedule", "merge-k-lists", "word-break", "three-sum", "trapping-rain-water", "lru-cache", "find-all-anagrams"];

const topics = [
  {
    number: 29,
    title: "Course Schedule",
    icon: "📅",
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    whenToUse: "Detect cycles in a directed graph, or find a valid ordering — topological sort with 3-state DFS",
    intuition: `Build a directed graph (prerequisite → course). Run DFS. Each node has 3 states: 0=unvisited, 1=in current DFS path (in-progress), 2=fully processed (safe).

If you hit a node with state 1 during DFS, you've found a cycle — prerequisites can never all be completed. If DFS completes without hitting state 1 nodes, a valid ordering exists.`,
    realWorld: {
      title: "Task Dependency Checker",
      description: "A project with tasks and dependencies. Can all tasks be completed? Build a dependency graph. If any task depends on itself through a chain (cycle), the project is deadlocked. DFS detects the cycle: if you're currently processing a task and you see it again, there's a circular dependency.",
    },
    problems: [
      {
        name: "Course Schedule",
        statement: "You have numCourses courses (labeled 0 to numCourses-1). Prerequisites is an array where [a, b] means you must take course b before course a. Determine if you can finish all courses.",
        example: "numCourses=2, prerequisites=[[1,0]] → True  (take 0 then 1)\nnumCourses=2, prerequisites=[[1,0],[0,1]] → False  (cycle: 0 needs 1 needs 0)",
      },
    ],
    prepQuestions: [
      "Directed or undirected graph?",
      "Do I need to return the ordering or just True/False?",
      "Can there be multiple edges between the same two nodes?",
      "What if numCourses is large but prerequisites is empty? (Always True — no dependencies)",
    ],
    code: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[course].append(prereq)   # course requires prereq first

    # 0 = unvisited, 1 = in current path (cycle risk), 2 = safe/processed
    state = [0] * numCourses

    def dfs(node):
        if state[node] == 1:   # currently in our DFS path → cycle
            return False
        if state[node] == 2:   # already fully processed → safe, skip
            return True

        state[node] = 1   # mark as in-progress

        for prereq in graph[node]:
            if not dfs(prereq):
                return False

        state[node] = 2   # fully processed — no cycles below this node
        return True

    for course in range(numCourses):
        if not dfs(course):
            return False

    return True`,
    trace: `numCourses=3, prerequisites=[[1,0],[2,1]]
graph: 1:[0], 2:[1], 0:[]

dfs(0): state[0]=1, no prereqs → state[0]=2, True
dfs(1): state[1]=1, prereq 0 → dfs(0): state=2 → skip True → state[1]=2, True
dfs(2): state[2]=1, prereq 1 → dfs(1): state=2 → skip True → state[2]=2, True
All pass → True ✓

With cycle [[1,0],[0,1]]:
dfs(0): state[0]=1, prereq 1 → dfs(1): state[1]=1, prereq 0 →
  dfs(0): state[0]==1 → cycle → return False ✓`,
    edgeCases: [
      { input: "No prerequisites", expected: "True", why: "Any order works" },
      { input: "Self-loop: [[0,0]]", expected: "False", why: "Direct cycle" },
      { input: "Disconnected components", expected: "True if neither has cycle", why: "DFS iterates all courses" },
    ],
    quotes: [
      "Three states: unvisited, in-progress, done. The in-progress state is what catches cycles — if you reach a node you're currently traversing, you found the cycle. That's the only line in DFS that detects it.",
    ],
    video: { id: "EgI5nU9etnU", title: "Course Schedule — Graph Adjacency List — Leetcode 207", channel: "NeetCode" },
    leetcode: [
      { number: 207, title: "Course Schedule", difficulty: "Medium", slug: "course-schedule" },
    ],
  },
  {
    number: 30,
    title: "Merge K Sorted Lists",
    icon: "🔀",
    complexity: { time: "O(N log k)", space: "O(k)" },
    whenToUse: "Merge multiple sorted sequences efficiently — min-heap to always pull the smallest next element",
    intuition: `A min-heap of size k: push the head of each list. Repeat: pop the minimum, add it to the result, push that node's next. The heap always gives you the smallest unmerged element in O(log k) time.

Without heap: comparing k lists naively is O(k) per element, O(Nk) total. Heap brings it to O(N log k).`,
    realWorld: {
      title: "Merging K Flight Manifests",
      description: "K airlines each provide a sorted passenger list. Build one merged sorted list. A min-heap of k pointers (one per airline, pointing to the next unprocessed passenger) always gives the next passenger to add. O(log k) per passenger, N passengers total.",
    },
    problems: [
      {
        name: "Merge K Sorted Lists",
        statement: "Given an array of k linked lists, each sorted in ascending order, merge all the lists into one sorted linked list and return it.",
        example: "Input:  [[1,4,5],[1,3,4],[2,6]]\nOutput: 1→1→2→3→4→4→5→6",
      },
    ],
    prepQuestions: [
      "Are all lists sorted in ascending order?",
      "Can any list be empty? (Yes — handle None nodes)",
      "Are there duplicate values across lists?",
      "Return new list or reuse existing nodes?",
    ],
    code: `import heapq

def mergeKLists(lists):
    heap = []
    counter = 0   # tiebreaker — ListNode is not comparable in Python

    for node in lists:
        if node:
            heapq.heappush(heap, (node.val, counter, node))
            counter += 1

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, _, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next

        if node.next:   # push the next node from the same list
            heapq.heappush(heap, (node.next.val, counter, node.next))
            counter += 1

    return dummy.next`,
    edgeCases: [
      { input: "Empty lists array", expected: "None", why: "No lists to merge" },
      { input: "All lists are empty nodes", expected: "None", why: "Nothing to add to heap" },
      { input: "k=1 list", expected: "The list itself", why: "No merging needed" },
      { input: "Lists of length 1 each", expected: "Sorted combination of all single nodes", why: "Minimal case" },
    ],
    quotes: [
      "The counter tiebreaker exists because Python's heapq compares all fields if values are equal — and ListNode has no __lt__. One extra integer avoids the TypeError.",
      "O(N log k) is a beautiful result. You're sorting N total elements but only doing log k work per element because the heap tracks the frontier for you.",
    ],
    video: { id: "q5a5OiGbT6Q", title: "Merge K Sorted Lists — Leetcode 23", channel: "NeetCode" },
    leetcode: [
      { number: 23, title: "Merge K Sorted Lists", difficulty: "Hard", slug: "merge-k-sorted-lists" },
    ],
  },
  {
    number: 31,
    title: "Word Break",
    icon: "📖",
    complexity: { time: "O(n² × m)", space: "O(n)" },
    whenToUse: "Can a string be decomposed into dictionary words — DP where dp[i] = True if s[:i] is decomposable",
    intuition: `dp[0] = True (empty prefix is always valid). For each position i from 1 to n: check every split point j from 0 to i. If dp[j] is True AND s[j:i] is in the dictionary, then dp[i] = True.

Put the word set in a Python set for O(1) lookup. This is the standard DP "segmentation" pattern.`,
    realWorld: {
      title: "Tokenizer",
      description: "A tokenizer breaking a run-on string into known words. 'leetcode' → 'leet' + 'code'. At each position, if everything up to some earlier point was valid, and the substring from there to here is a known word, then everything up to here is valid.",
    },
    problems: [
      {
        name: "Word Break",
        statement: "Given a string s and a list of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        example: "s=\"leetcode\", wordDict=[\"leet\",\"code\"] → True\ns=\"applepenapple\", wordDict=[\"apple\",\"pen\"] → True\ns=\"catsandog\", wordDict=[\"cats\",\"dog\",\"sand\",\"an\",\"cat\"] → False",
      },
    ],
    prepQuestions: [
      "Can the same word from the dictionary be used multiple times?",
      "Must the entire string be consumed (not just a prefix)?",
      "Case-sensitive matching?",
      "What if the dictionary is very large — use a set for O(1) lookup",
    ],
    code: `def wordBreak(s, wordDict):
    word_set = set(wordDict)   # O(1) lookup
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True   # empty prefix is always valid

    for i in range(1, n + 1):
        for j in range(i):
            # if s[:j] is valid AND s[j:i] is a word → s[:i] is valid
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break   # no need to check more splits for this i

    return dp[n]`,
    trace: `s="leetcode", wordDict=["leet","code"]
dp=[T,F,F,F,F,F,F,F,F]

i=1: j=0: dp[0]=T, s[0:1]='l' not in set → F
i=2: j=0: 'le' not in set → F; j=1: dp[1]=F → skip
i=3: similar → F
i=4: j=0: dp[0]=T, s[0:4]='leet' IN set → dp[4]=True
i=5..7: dp[4]=T, s[4:5]='c', s[4:6]='co', s[4:7]='cod' → not in set
i=8: j=4: dp[4]=T, s[4:8]='code' IN set → dp[8]=True ✓`,
    edgeCases: [
      { input: "s is a single word in dict", expected: "True", why: "dp[0]=T, s[0:n] in set" },
      { input: "No possible segmentation", expected: "False", why: "dp[n] stays False" },
      { input: "Empty string", expected: "True", why: "dp[0]=True — trivially segmented" },
    ],
    quotes: [
      "dp[j] is True means 'I can reach position j cleanly.' s[j:i] in word_set means 'there's a word that bridges j to i.' Together: dp[i] = True. That's the whole algorithm.",
    ],
    video: { id: "Sx9NNgInc3A", title: "Word Break — Dynamic Programming — Leetcode 139", channel: "NeetCode" },
    leetcode: [
      { number: 139, title: "Word Break", difficulty: "Medium", slug: "word-break" },
    ],
  },
  {
    number: 32,
    title: "3Sum",
    icon: "3️⃣",
    complexity: { time: "O(n²)", space: "O(1)" },
    whenToUse: "Find all unique triplets summing to zero — sort first, fix one element, two-pointer on the rest",
    intuition: `Sort the array. For each index i, use two pointers left=i+1, right=n-1. If the sum is too small, advance left. Too big, move right back. Found a triplet, record it and advance both pointers (skipping duplicates).

Skip duplicate values at the i level and at the pointer level to avoid duplicate triplets in the output.`,
    realWorld: {
      title: "Finding Balanced Budget Groups",
      description: "A list of expense adjustments (positive = added, negative = removed). Find all groups of 3 adjustments that net to zero — perfectly balanced. Sort the adjustments first, then for each starting adjustment, use two pointers to find the pair that cancels it out.",
    },
    problems: [
      {
        name: "3Sum",
        statement: "Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]] such that i, j, k are distinct indices and nums[i] + nums[j] + nums[k] == 0.",
        example: "Input:  nums=[-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]",
      },
    ],
    prepQuestions: [
      "Return all triplets or just check existence?",
      "Must triplets be unique in the output? (Yes — skip duplicates)",
      "Can the same element be used multiple times? (No — distinct indices)",
      "What about all-zeros input like [0,0,0,0]? (Return [[0,0,0]] — one unique triplet)",
    ],
    code: `def threeSum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue   # skip duplicate values at outer level

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left]  == nums[left+1]: left += 1
                while left < right and nums[right] == nums[right-1]: right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result`,
    trace: `nums=[-4,-1,-1,0,1,2] (after sort)

i=0, nums[0]=-4: left=1,right=5
  -4+-1+2=-3 < 0 → left=2
  -4+-1+2=-3 < 0 → left=3
  -4+0+2=-2 < 0 → left=4
  -4+1+2=-1 < 0 → left=5 → loop ends

i=1, nums[1]=-1: left=2,right=5
  -1+-1+2=0 → append [-1,-1,2], skip dup left, skip dup right, left=3,right=4
  -1+0+1=0 → append [-1,0,1], ...
  left=right → done

i=2, nums[2]=-1: nums[2]==nums[1] → skip

Result: [[-1,-1,2],[-1,0,1]] ✓`,
    edgeCases: [
      { input: "[0,0,0]", expected: "[[0,0,0]]", why: "Three zeros sum to zero — one unique triplet" },
      { input: "[0,0,0,0]", expected: "[[0,0,0]]", why: "Duplicate suppression — still only one unique triplet" },
      { input: "No valid triplets", expected: "[]", why: "No combination sums to zero" },
    ],
    quotes: [
      "Sort. Fix i. Two pointers. Skip duplicates at every level. The duplicate-skipping is what makes the output unique — without it, you'd have repeat triplets and a wrong answer.",
    ],
    video: { id: "jzZsG8n2R9A", title: "3Sum — Leetcode 15", channel: "NeetCode" },
    leetcode: [
      { number: 15, title: "3Sum", difficulty: "Medium", slug: "3sum" },
    ],
  },
  {
    number: 33,
    title: "Trapping Rain Water",
    icon: "🌧️",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Amount trapped at each position = min(max left, max right) − height — two pointers eliminate the arrays",
    intuition: `Water above position i is bounded by the shorter of the tallest wall to its left and the tallest wall to its right, minus the column's own height: water[i] = max(0, min(max_left[i], max_right[i]) − height[i]).

Two-pointer optimization: track max_left and max_right as running maximums. Always process the side with the smaller maximum — it's the binding constraint. No extra arrays.`,
    realWorld: {
      title: "Elevation Map After Rain",
      description: "A terrain cross-section. After rain, water pools wherever a valley has walls on both sides. At each valley point, water level = the shorter surrounding wall height minus the terrain height at that point. Total water = sum across all valleys.",
    },
    problems: [
      {
        name: "Trapping Rain Water",
        statement: "Given n non-negative integers representing an elevation map where each bar has width 1, compute how much water it can trap after raining.",
        example: "Input:  height=[0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
      },
    ],
    prepQuestions: [
      "Can height be zero? (Yes — positions with height 0 still trap water based on surrounding walls)",
      "What if the array has fewer than 3 elements? (No trapping possible — return 0)",
      "O(n) time and O(1) space required?",
    ],
    code: `def trap(height):
    if not height:
        return 0

    left, right = 0, len(height) - 1
    max_left = max_right = 0
    total = 0

    while left < right:
        if height[left] <= height[right]:
            # Left side is the constraint — process left
            if height[left] >= max_left:
                max_left = height[left]   # new max — no water here
            else:
                total += max_left - height[left]   # water = wall - floor
            left += 1
        else:
            # Right side is the constraint — process right
            if height[right] >= max_right:
                max_right = height[right]
            else:
                total += max_right - height[right]
            right -= 1

    return total`,
    trace: `height=[0,1,0,2,1,0,1,3,2,1,2,1]
left=0,right=11, max_l=0,max_r=0, total=0

h[0]=0 ≤ h[11]=1: max_l=0, 0 not > 0, total+=0-0=0, left=1
h[1]=1 ≤ h[11]=1: max_l=1, update max, left=2
h[2]=0 ≤ h[11]=1: max_l=1, 0<1, total+=1-0=1, left=3
h[3]=2 > h[11]=1: right side — max_r=1, update, right=10
h[3]=2 ≤ h[10]=2: max_l=2, update, left=4
h[4]=1 ≤ h[10]=2: total+=2-1=1(total=2), left=5
h[5]=0 ≤ h[10]=2: total+=2-0=2(total=4), left=6
h[6]=1 ≤ h[10]=2: total+=2-1=1(total=5), left=7
h[7]=3 > h[10]=2: right side — max_r=2, total+=2-2=0, right=9
h[7]=3 > h[9]=1: right side — max_r=2, total+=2-1=1(total=6), right=8
left=7 >= right=8? No. h[7]=3>h[8]=2: max_r=3, update, right=7
left=right=7 → done
Answer: 6 ✓`,
    edgeCases: [
      { input: "All same height", expected: "0", why: "No valleys — walls equal floor everywhere" },
      { input: "Strictly increasing", expected: "0", why: "No right wall for any left valley" },
      { input: "len < 3", expected: "0", why: "Need at least 3 elements to form a valley" },
    ],
    quotes: [
      "The insight: you process the side with the smaller max because that's the binding constraint on water height. The other side, whatever it is, can only be equal or taller. That's the logic that lets you run two pointers without precomputing arrays.",
    ],
    video: { id: "ZI2z5pq0TqA", title: "Trapping Rain Water — Leetcode 42", channel: "NeetCode" },
    leetcode: [
      { number: 42, title: "Trapping Rain Water", difficulty: "Hard", slug: "trapping-rain-water" },
    ],
  },
  {
    number: 34,
    title: "LRU Cache",
    icon: "💾",
    complexity: { time: "O(1) get and put", space: "O(capacity)" },
    whenToUse: "Cache with eviction of the least recently used item — hash map + doubly linked list",
    intuition: `Hash map gives O(1) key lookup. Doubly linked list gives O(1) removal and insertion at any position. Combine: map stores key → node. List maintains usage order (head = most recent, tail = least recent).

On get: move node to head. On put: add/update node at head, evict tail if over capacity. The two dummy nodes (head_dummy, tail_dummy) eliminate edge cases in insertion/removal.`,
    realWorld: {
      title: "Browser Tab Caching",
      description: "Browser keeps the most recently viewed pages in fast memory. When memory is full, evict the tab you visited least recently. Hash map for instant tab lookup by URL. Doubly linked list for instant reordering when you switch to a tab. O(1) both ways.",
    },
    problems: [
      {
        name: "LRU Cache",
        statement: "Design a data structure that follows the Least Recently Used cache constraints. Implement LRUCache(capacity), get(key), and put(key, value). get and put must both run in O(1) average time. If put exceeds capacity, evict the least recently used key.",
        example: "LRUCache(2)\nput(1,1) → cache: {1:1}\nput(2,2) → cache: {1:1,2:2}\nget(1) → 1  (1 is now most recent)\nput(3,3) → evict 2 (LRU), cache: {1:1,3:3}\nget(2) → -1  (evicted)",
      },
    ],
    prepQuestions: [
      "What does get return if key not found? (-1)",
      "Does get update recency? (Yes — any access makes it most recent)",
      "Are keys integers only, or any hashable?",
      "Thread-safe? (Assume no unless asked)",
    ],
    code: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}   # key → Node

        # Dummy head (most recent) and tail (least recent)
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._insert_head(node)   # move to most-recent position
        return node.val

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert_head(node)

        if len(self.cache) > self.capacity:
            lru = self.tail.prev   # least recently used
            self._remove(lru)
            del self.cache[lru.key]`,
    edgeCases: [
      { input: "capacity=1, put then put different key", expected: "First key evicted", why: "Always evicts on second put" },
      { input: "get on key then put new key", expected: "Got key stays, other evicted", why: "get updates recency" },
      { input: "put same key twice", expected: "Value updated, moves to front", why: "Update = remove + reinsert at head" },
    ],
    quotes: [
      "The dummy head and tail nodes are the trick. Without them, every insert/remove needs to check 'am I the first/last node?' With them, every operation is the same 4-pointer swap. No special cases.",
    ],
    video: { id: "7ABFKPK2hD4", title: "LRU Cache — Leetcode 146", channel: "NeetCode" },
    leetcode: [
      { number: 146, title: "LRU Cache", difficulty: "Medium", slug: "lru-cache" },
    ],
  },
  {
    number: 35,
    title: "Find All Anagrams in a String",
    icon: "🔤",
    complexity: { time: "O(n)", space: "O(1) — fixed 26-letter alphabet" },
    whenToUse: "Find all positions of a fixed-size pattern in a string — sliding window with frequency count comparison",
    intuition: `Fixed window of size len(p). Maintain a frequency count of characters in the current window. After each slide, compare the window's counts to p's counts. Comparing two 26-element arrays is O(1).

Optimization: track a "matches" counter — how many of the 26 characters currently have equal counts. Slide by incrementing/decrementing matches instead of comparing full arrays.`,
    realWorld: {
      title: "Plagiarism Detection — Rearranged Phrases",
      description: "Check if any window of a document contains the same words as a suspect phrase, in any order. Fixed window size = phrase length. Slide across document, tracking word frequencies. Match = window is an anagram of phrase.",
    },
    problems: [
      {
        name: "Find All Anagrams in a String",
        statement: "Given two strings s and p, return an array of all the start indices of p's anagrams in s. An anagram of p is a substring of s with the same characters in any order.",
        example: "s=\"cbaebabacd\", p=\"abc\" → [0,6]\n(s[0:3]=\"cba\" is anagram of \"abc\", s[6:9]=\"bac\" is anagram)",
      },
    ],
    prepQuestions: [
      "Only lowercase letters?",
      "Can p be longer than s? (Return empty list)",
      "Return start indices in sorted order?",
      "Overlapping anagrams count separately? (Yes)",
    ],
    code: `from collections import Counter

def findAnagrams(s, p):
    if len(p) > len(s):
        return []

    p_count = Counter(p)
    window = Counter(s[:len(p)])
    result = []

    if window == p_count:
        result.append(0)

    for i in range(len(p), len(s)):
        # Add character entering from right
        window[s[i]] += 1

        # Remove character leaving from left
        left_char = s[i - len(p)]
        window[left_char] -= 1
        if window[left_char] == 0:
            del window[left_char]   # keep counter clean — don't store zeros

        if window == p_count:
            result.append(i - len(p) + 1)

    return result`,
    trace: `s="cbaebabacd", p="abc", len(p)=3
p_count={'a':1,'b':1,'c':1}

Initial window "cba": {'c':1,'b':1,'a':1} == p_count → append 0

i=3, add 'e', remove 'c': {'b':1,'a':1,'e':1} ≠ p_count
i=4, add 'b', remove 'b': {'a':1,'e':1,'b':1} ≠ p_count
i=5, add 'a', remove 'a': {'e':1,'b':1,'a':1} ≠ p_count
i=6, add 'b', remove 'e': {'b':2,'a':1} ≠ p_count
i=7, add 'a', remove 'b': {'b':1,'a':2} ≠ p_count
i=8, add 'c', remove 'a': {'b':1,'a':1,'c':1} == p_count → append 6

Result: [0, 6] ✓`,
    edgeCases: [
      { input: "p longer than s", expected: "[]", why: "No window large enough" },
      { input: "Entire s is an anagram of p", expected: "[0]", why: "Only one window, it matches" },
      { input: "No anagrams", expected: "[]", why: "No window ever matches p_count" },
    ],
    quotes: [
      "Deleting zero-count keys keeps the Counter clean so equality comparison works correctly. Leaving 'a':0 in the window counter means it won't equal p_count even when it should.",
    ],
    video: { id: "G2_Q9FoD-oQ", title: "Find All Anagrams in a String — Leetcode 438", channel: "NeetCode" },
    leetcode: [
      { number: 438, title: "Find All Anagrams in a String", difficulty: "Medium", slug: "find-all-anagrams-in-a-string" },
    ],
  },
];

export default function ThursdayPage() {
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
          Stretch <span className="text-[#E60023]">—</span> Hard Mode
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Thursday · June 4 · Stretch Problems</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Stretch problems for Thursday June 4 if you finish Day 3 early or want to push harder. These require combining multiple patterns: graph theory + state machines (Course Schedule), heap + linked lists (Merge K), DP + hash sets (Word Break), and the two Hard problems (Rain Water, LRU Cache). Trace every algorithm on paper before coding.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Stretch Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/wednesday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Day 3: Thursday (back)
        </Link>
        <Link
          href="/friday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Day 4: Friday (Interview) →
        </Link>
      </div>
    </div>
  );
}
