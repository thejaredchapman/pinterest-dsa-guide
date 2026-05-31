import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["two-sum", "valid-palindrome", "best-time-stock", "left-rotation", "group-anagrams", "ice-cream-parlor", "top-k-frequent", "balanced-brackets", "min-stack", "queue-two-stacks"];

const topics = [
  {
    number: 1,
    title: "Two Sum",
    icon: "🎯",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Unsorted array + find pair summing to target → hash map complement lookup",
    intuition: `Brute force: two nested loops, check every pair. O(n²) — for 10,000 elements that's 100 million comparisons.

The insight: for each number x, the number you need is (target - x) — the complement. Store every number you've seen so far in a hash map keyed by value. For each new number, check if its complement is already in the map. If yes, you're done. If no, store this number.

One pass. O(n) time, O(n) space.`,
    realWorld: {
      title: "Finding Two Items That Fit Your Budget",
      description: "Shopping with exactly $20 for two items. Walk the shelf once. For each item at price P, the item you need costs $20-P. Check your mental 'prices already seen' list. First match = done. One sweep, no backtracking.",
    },
    problems: [
      {
        name: "Two Sum",
        statement: "Given an array of integers nums and a target integer, return the indices of the two numbers that add up to target. Each input has exactly one solution. You may not use the same element twice.",
        example: "Input:  nums=[2, 7, 11, 15], target=9\nOutput: [0, 1]  (nums[0] + nums[1] = 2 + 7 = 9)",
      },
    ],
    prepQuestions: [
      "Is the array sorted? (If yes, two pointers O(1) space is possible instead of a hash map)",
      "Can I use the same element twice? e.g. nums=[3], target=6 — should that return [0,0]?",
      "Are there duplicate values? Could there be multiple valid pairs?",
      "What if no solution exists — return empty array, or is a solution guaranteed?",
      "Are indices 0-based or 1-based in the expected output?",
    ],
    code: `def twoSum(nums, target):
    seen = {}           # maps number → its index in nums

    for i, num in enumerate(nums):
        complement = target - num   # the value we need to pair with num

        if complement in seen:
            # found it — complement was stored in an earlier iteration
            return [seen[complement], i]

        # haven't found the pair yet — store this number for future lookups
        seen[num] = i

    return []   # problem guarantees a solution, so we never actually reach this`,
    edgeCases: [
      { input: "nums=[], target=9", expected: "[]", why: "Empty array — no pairs possible" },
      { input: "nums=[3], target=6", expected: "[]", why: "Single element — can't pair with itself" },
      { input: "nums=[3,3], target=6", expected: "[0,1]", why: "Duplicate values — use both, not same index twice" },
      { input: "nums=[-1,-2,-3,-4], target=-6", expected: "[1,3]", why: "All negatives — complement trick still works" },
      { input: "nums=[1,2,3,4], target=10", expected: "[]", why: "No valid pair exists" },
    ],
    quotes: [
      "The complement trick inverts the problem. Instead of asking 'does this pair work?' you ask 'have I already seen what I need?' Future Jared stored the answer for Present Jared.",
      "Jason Bourne doesn't check every person in the room. He maps it once. O(1) retrieval from that point on. That's you with a dict.",
    ],
    video: { id: "KLlXCFG5TnA", title: "Two Sum — Leetcode 1 — HashMap", channel: "NeetCode" },
    leetcode: [
      { number: 1, title: "Two Sum", difficulty: "Easy", slug: "two-sum" },
    ],
  },
  {
    number: 2,
    title: "Valid Palindrome",
    icon: "🔁",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Check if string reads same forwards and backwards, ignoring non-alphanumeric characters",
    intuition: `Naive approach: strip non-alphanumeric characters, lowercase everything, check if string equals its reverse. O(n) time but O(n) space — builds a cleaned copy.

Better: two pointers. Left starts at beginning, right at end. Skip non-alphanumeric characters on each side. Compare characters (case-insensitive). If mismatch → False. If pointers meet → True. O(n) time, O(1) space — never builds the cleaned string.`,
    realWorld: {
      title: "Quality Control From Both Ends",
      description: "A factory inspector checks a production line from both ends simultaneously. Left inspector skips defective (non-alphanumeric) items. Right inspector does the same. They compare. Mismatch = reject. Meet in the middle = symmetric.",
    },
    problems: [
      {
        name: "Valid Palindrome",
        statement: "Given a string s, return True if it is a palindrome considering only alphanumeric characters and ignoring case. A palindrome reads the same forward and backward.",
        example: "Input:  \"A man, a plan, a canal: Panama\"\nOutput: True  (cleaned: \"amanaplanacanalpanama\")\n\nInput:  \"race a car\"\nOutput: False",
      },
    ],
    prepQuestions: [
      "Do I consider only alphanumeric characters, or all characters including spaces and punctuation?",
      "Is it case-sensitive? (Is 'A' the same as 'a'?)",
      "What should I return for an empty string? (Convention: True)",
      "Can I use extra O(n) space to clean the string, or must I solve it in-place with two pointers?",
    ],
    code: `def isPalindrome(s):
    l, r = 0, len(s) - 1   # two pointers starting at both ends

    while l < r:
        # skip non-alphanumeric characters from the left
        while l < r and not s[l].isalnum():
            l += 1
        # skip non-alphanumeric characters from the right
        while l < r and not s[r].isalnum():
            r -= 1

        # compare the characters (case-insensitive)
        if s[l].lower() != s[r].lower():
            return False    # mismatch — not a palindrome

        l += 1   # move both pointers inward
        r -= 1

    return True  # all characters matched — it's a palindrome`,
    edgeCases: [
      { input: 's=""', expected: "True", why: "Empty string — trivially a palindrome by convention" },
      { input: 's=" "', expected: "True", why: "Only whitespace (non-alphanumeric) — becomes empty after filtering" },
      { input: 's="a"', expected: "True", why: "Single character is always a palindrome" },
      { input: 's="Aa"', expected: "True", why: "Case insensitivity — 'A' and 'a' must match" },
      { input: 's="0P"', expected: "False", why: "Digit vs letter — '0' ≠ 'p'" },
    ],
    quotes: [
      "Two pointers. No extra string. O(1) space. You didn't just solve it — you solved it the right way. Kobe didn't take the easy shot. Neither do you.",
    ],
    video: { id: "6lX7x1RcLvg", title: "Solving All Two Pointer Problems — Blind75", channel: "NeetCode" },
    leetcode: [
      { number: 125, title: "Valid Palindrome", difficulty: "Easy", slug: "valid-palindrome" },
    ],
  },
  {
    number: 3,
    title: "Best Time to Buy & Sell Stock",
    icon: "📈",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Single-pass min tracking — maximize gain from one buy before one sell",
    intuition: `You want to maximize profit = sell_price - buy_price, and buy must come before sell.

Key insight: scan left to right, track the minimum price seen so far (the best buying opportunity up to now). At each price, check if selling today beats the current best profit.

One pass. O(n) time, O(1) space. No nested loops needed.`,
    realWorld: {
      title: "Buying Low on a Price History Chart",
      description: "Scrolling through a product's price history from left to right. You note 'lowest price seen so far.' At each new price, ask: 'If I had bought at the lowest and sold today, would that beat my current best deal?' Update your best when it does. Never need to look backward.",
    },
    problems: [
      {
        name: "Best Time to Buy and Sell Stock",
        statement: "Given an array prices where prices[i] is the price on day i, return the maximum profit from ONE buy and ONE sell. You must buy before you sell. If no profit is possible, return 0.",
        example: "Input:  prices=[7, 1, 5, 3, 6, 4]\nOutput: 5  (buy at 1 on day 2, sell at 6 on day 5)\n\nInput:  prices=[7, 6, 4, 3, 1]\nOutput: 0  (prices only decrease — no profitable trade)",
      },
    ],
    prepQuestions: [
      "Can I make multiple transactions, or just one buy and one sell?",
      "What if prices are all the same? (Return 0)",
      "What if the array has only one price? (Can't trade — return 0)",
      "Can prices be negative? (Unusual but worth clarifying)",
      "Do I need to return the profit or the buy/sell days?",
    ],
    code: `def maxProfit(prices):
    if not prices:
        return 0

    min_price = float('inf')   # cheapest buying opportunity seen so far
    max_profit = 0             # best profit found so far

    for price in prices:
        if price < min_price:
            min_price = price           # found a cheaper buy — update target buy day
        elif price - min_price > max_profit:
            max_profit = price - min_price  # selling today beats our current best

    return max_profit`,
    edgeCases: [
      { input: "prices=[]", expected: "0", why: "Empty array — no prices to trade" },
      { input: "prices=[5]", expected: "0", why: "Single price — can't buy and sell on the same day" },
      { input: "prices=[7,6,5,4,3]", expected: "0", why: "Prices only decrease — never profitable" },
      { input: "prices=[1,1,1,1]", expected: "0", why: "All same price — profit is always 0" },
      { input: "prices=[1,2]", expected: "1", why: "Minimum case with profit" },
    ],
    quotes: [
      "One pass. Track the min. Track the best profit. The whole algorithm fits in your head in 10 seconds. Muhammad Ali said 'It's not bragging if you can back it up.' You can back this up.",
    ],
    video: { id: "IiDuXLqV6e4", title: "Arrays & Hashing Explained — NeetCode 150 Ep.1", channel: "NeetCode" },
    leetcode: [
      { number: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", slug: "best-time-to-buy-and-sell-stock" },
    ],
  },
  {
    number: 4,
    title: "Left Rotation",
    icon: "🔄",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Rotate an array by d positions — Python slicing makes this a one-liner",
    intuition: `Left rotating by d: elements from index d onward become the new front, elements 0 to d-1 become the new tail.

Python: arr[d:] + arr[:d].

The modulo trick: if d >= n, rotating n times returns you to the start. Always compute d % n first to handle oversized d.`,
    realWorld: {
      title: "Factory Conveyor Belt",
      description: "A conveyor belt with 5 items. 'Rotate left by 2' means the first 2 items fall off the front and attach to the back. If you rotate 7 positions on a 5-item belt, 7 % 5 = 2 — same as rotating by 2.",
    },
    problems: [
      {
        name: "Left Rotation",
        statement: "Given an array arr and integer d, perform d left rotations. Each rotation shifts every element one position to the left, with the first element wrapping to the back. Return the resulting array.",
        example: "Input:  arr=[1,2,3,4,5], d=2\nOutput: [3,4,5,1,2]  (elements 1,2 rotate to the back)",
      },
    ],
    prepQuestions: [
      "Is this a left rotation or right rotation? (Confirm direction)",
      "What if d is larger than the array length? (Use d % n)",
      "What if d is 0? (Return original array unchanged)",
      "Should I modify the array in place or return a new one?",
      "What if the array is empty?",
    ],
    code: `def rotateLeft(d, arr):
    n = len(arr)
    if n == 0:
        return arr          # edge case: empty array

    d = d % n               # rotating n times = back to start
                            # so only the remainder matters

    # arr[d:] = from index d to end   → new front
    # arr[:d] = from index 0 to d-1   → new tail
    return arr[d:] + arr[:d]`,
    edgeCases: [
      { input: "arr=[], d=3", expected: "[]", why: "Empty array — nothing to rotate" },
      { input: "arr=[1], d=5", expected: "[1]", why: "Single element — rotation has no effect" },
      { input: "arr=[1,2,3], d=0", expected: "[1,2,3]", why: "Zero rotation — return unchanged" },
      { input: "arr=[1,2,3], d=3", expected: "[1,2,3]", why: "d equals n — full rotation, back to start" },
      { input: "arr=[1,2,3], d=7", expected: "[2,3,1]", why: "d > n — 7 % 3 = 1, same as rotating by 1" },
    ],
    quotes: [
      "The modulo trick is number theory. Rotating n times = full circle = same array. You just applied modular arithmetic in a coding interview without flinching. Vegeta called. Your power level is too damn high.",
    ],
    video: { id: "9kdHxplyl5I", title: "Introduction to Sliding Window and 2 Pointers", channel: "take U forward" },
    leetcode: [
      { number: 189, title: "Rotate Array", difficulty: "Medium", slug: "rotate-array" },
    ],
  },
  {
    number: 5,
    title: "Group Anagrams",
    icon: "🔡",
    complexity: { time: "O(n × k log k)", space: "O(n)" },
    whenToUse: "Group strings by shared property — sorted characters as the hash map key",
    intuition: `Two strings are anagrams if and only if their sorted characters are identical: "eat" sorted = "aet", "tea" sorted = "aet". Same key!

Use defaultdict(list). For each word, sort its characters to get the canonical key, append the word to that key's bucket. Return all buckets.`,
    realWorld: {
      title: "Sorting Mail Into Bins",
      description: "Letters addressed to 'PARIS', 'PAIRS', 'RAPIS' all contain the same letters. Sort each address alphabetically — all become 'AIPRS'. Same key = same bin. defaultdict(list) is the bin system.",
    },
    problems: [
      {
        name: "Group Anagrams",
        statement: "Given an array of strings, group all anagrams together. Anagrams are words containing the same characters in any order. Return the groups in any order.",
        example: "Input:  [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
      },
    ],
    prepQuestions: [
      "Are all strings lowercase? What about uppercase and special characters?",
      "Can the input array be empty? Can individual strings be empty?",
      "Does the order of groups in the output matter?",
      "Does the order of strings within each group matter?",
      "What is the max string length? (Affects whether O(k log k) sort per string is acceptable)",
    ],
    code: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)   # auto-creates an empty list for any new key

    for word in strs:
        # sorting the characters gives a canonical key for all anagrams
        # "eat", "tea", "ate" all sort to "aet" → same key, same bucket
        key = tuple(sorted(word))   # tuple because lists can't be dict keys

        groups[key].append(word)

    return list(groups.values())`,
    edgeCases: [
      { input: "strs=[]", expected: "[]", why: "Empty input — no groups" },
      { input: 'strs=[""]', expected: '[[""]]', why: "Empty string — its own group (sorts to ())" },
      { input: 'strs=["",""]', expected: '[["","  "]]', why: "Multiple empty strings — same group" },
      { input: 'strs=["a"]', expected: '[["a"]]', why: "Single character — one group" },
      { input: 'strs=["ab","ba","abc"]', expected: '[["ab","ba"],["abc"]]', why: "Only some strings are anagrams" },
    ],
    quotes: [
      "defaultdict(list) is one of the most useful Python tools in interviews. It removes all the 'if key not in d: d[key] = []' boilerplate. Group and go.",
    ],
    video: { id: "IiDuXLqV6e4", title: "Arrays & Hashing Explained — NeetCode 150 Ep.1", channel: "NeetCode" },
    leetcode: [
      { number: 49, title: "Group Anagrams", difficulty: "Medium", slug: "group-anagrams" },
    ],
  },
  {
    number: 6,
    title: "Ice Cream Parlor",
    icon: "🍦",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Two Sum variant — find two values summing to budget, return 1-based indices",
    intuition: `This is Two Sum with 1-based indexing and a story wrapper. Strip away the story: array of prices, budget m, find two prices summing to m, return their 1-based positions.

Complement trick: for each price, the complement is (m - price). Check the hash map. If found, return the pair. If not, store.`,
    realWorld: {
      title: "Splitting a Restaurant Bill",
      description: "Two friends splitting a $40 dinner by ordering exactly two items totaling $40. Walk the menu once. For each item, ask: 'Have I already seen an item costing $40 minus this price?' First match wins.",
    },
    problems: [
      {
        name: "Ice Cream Parlor",
        statement: "Sunny and Johnny pool their money (budget m) and buy exactly two ice cream flavors. Given the prices array, find the 1-based indices of the two flavors whose prices sum to exactly m. A solution is always guaranteed.",
        example: "Input:  m=4, arr=[1, 4, 5, 3, 2]\nOutput: [1, 4]  (price 1 at index 1, price 3 at index 4 → 1+3=4)",
      },
    ],
    prepQuestions: [
      "Are there duplicate prices? Can I use two elements with the same price value?",
      "Is the output 0-based or 1-based? (This problem uses 1-based)",
      "Is a solution always guaranteed, or do I need to handle no-solution?",
      "Should I return indices in ascending order?",
    ],
    code: `def icecreamParlor(m, arr):
    seen = {}   # maps price → 1-based index

    for i, price in enumerate(arr):
        complement = m - price   # the other flavor must cost this much

        if complement in seen:
            # seen[complement] is its 1-based index, i+1 is this item's 1-based index
            return [seen[complement], i + 1]

        seen[price] = i + 1   # i + 1 converts 0-based enumerate to 1-based

    return []   # guaranteed to find solution, never reached`,
    edgeCases: [
      { input: "m=4, arr=[2,2]", expected: "[1,2]", why: "Duplicate prices — must use two different indices" },
      { input: "m=10, arr=[5,5,5]", expected: "[1,2]", why: "Three identical prices — first valid pair" },
      { input: "m=6, arr=[1,2,3,4,5]", expected: "[1,5]", why: "Complement is at the end" },
      { input: "m=3, arr=[1,2]", expected: "[1,2]", why: "Minimum valid array" },
    ],
    quotes: [
      "Ice Cream Parlor is Two Sum wearing a costume. Strip the story: budget m, two prices summing to m, find positions. Hash map complement lookup. You've already solved this.",
    ],
    video: { id: "KLlXCFG5TnA", title: "Two Sum — Leetcode 1 — HashMap", channel: "NeetCode" },
    leetcode: [
      { number: 1, title: "Two Sum", difficulty: "Easy", slug: "two-sum" },
    ],
  },
  {
    number: 7,
    title: "Top K Frequent Elements",
    icon: "📊",
    complexity: { time: "O(n log k)", space: "O(n)" },
    whenToUse: "Find k most common items — Counter to count, min-heap of size k to track top",
    intuition: `Count frequencies with Counter. Maintain a min-heap of size k — smallest-frequency element is always at the top and gets evicted when a more frequent element arrives.

After processing all elements, the k remaining items in the heap are the top k most frequent.

Alternative: Counter.most_common(k) — mention it, offer to implement from scratch if required.`,
    realWorld: {
      title: "Pinterest Trending Topics",
      description: "Pinterest counts every search query. To find top 10 trending searches: count occurrences (Counter), maintain a leaderboard of size 10 (heap). Each new query either enters the leaderboard or gets dropped. Heap size never exceeds 10 — O(n log k) not O(n log n).",
    },
    problems: [
      {
        name: "Top K Frequent Elements",
        statement: "Given an integer array nums and integer k, return the k most frequently occurring elements. The answer may be in any order.",
        example: "Input:  nums=[1,1,1,2,2,3], k=2\nOutput: [1,2]  (1 appears 3 times, 2 appears 2 times)",
      },
    ],
    prepQuestions: [
      "Is k always valid — guaranteed between 1 and the number of unique elements?",
      "What if multiple elements have the same frequency — is any tiebreaker acceptable?",
      "Can I use Python's Counter directly, or is this a 'no library' question?",
      "Should I return exactly k elements, even if some have frequency 1?",
    ],
    code: `from collections import Counter
import heapq

def topKFrequent(nums, k):
    count = Counter(nums)   # count occurrences: {1: 3, 2: 2, 3: 1}

    heap = []   # min-heap of (frequency, element) — size capped at k
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))  # push with frequency as sort key
        if len(heap) > k:
            heapq.heappop(heap)   # evict the least frequent element

    # heap now holds exactly the k most frequent elements
    return [num for freq, num in heap]`,
    edgeCases: [
      { input: "nums=[1], k=1", expected: "[1]", why: "Single element, k=1" },
      { input: "nums=[1,2], k=2", expected: "[1,2]", why: "k equals number of unique elements" },
      { input: "nums=[1,1,2,2,3], k=2", expected: "[1,2] (any order)", why: "Tie in frequency" },
      { input: "nums=[4,4,4,4], k=1", expected: "[4]", why: "All same element" },
    ],
    quotes: [
      "Counter + heap. Two data structures, one problem. You know when to reach for each and why. That's Pinterest-level thinking.",
    ],
    video: { id: "rrbZz23DWHI", title: "Learn Heaps and Priority Queues — NeetCode 150 Ep.17", channel: "NeetCode" },
    leetcode: [
      { number: 347, title: "Top K Frequent Elements", difficulty: "Medium", slug: "top-k-frequent-elements" },
    ],
  },
  {
    number: 8,
    title: "Balanced Brackets",
    icon: "🔗",
    complexity: { time: "O(n)", space: "O(n)" },
    whenToUse: "Matching pairs in order — stack holds unmatched openers, closer checks the top",
    intuition: `A stack is perfect: when you see an opener, push it. When you see a closer, the most recent unmatched opener must be its partner — check the top. If the stack is empty (no opener waiting) or the top is the wrong type → invalid.

At the end, an empty stack = everything matched. Non-empty = unclosed openers remain.`,
    realWorld: {
      title: "Nesting Dolls Quality Check",
      description: "Inspecting nesting dolls on a line. Opening a doll = push to stack. Closing a doll = the one on top must be its exact match. Wrong size = fail. End with open dolls on stack = fail. Empty stack at end = every doll opened and closed correctly.",
    },
    problems: [
      {
        name: "Balanced Brackets / Valid Parentheses",
        statement: "Given a string containing only ()[]{}  determine if it is valid. Valid means every opening bracket has a matching closing bracket of the same type, in the correct order.",
        example: "Input:  \"({[]})\"\nOutput: True\n\nInput:  \"([)]\"\nOutput: False  (improperly nested)",
      },
    ],
    prepQuestions: [
      "Does the string contain only bracket characters, or also letters and spaces?",
      "What should I return for an empty string? (True — trivially balanced)",
      "Are there multiple bracket types or just parentheses?",
      "Should I return boolean, 'YES'/'NO', or integer?",
    ],
    code: `def isBalanced(s):
    pairs = {')': '(', ']': '[', '}': '{'}  # closer → required opener
    stack = []

    for ch in s:
        if ch in pairs:
            # closing bracket — check top of stack matches the required opener
            if not stack or stack.pop() != pairs[ch]:
                return False   # empty stack OR wrong opener on top
        else:
            stack.append(ch)   # opening bracket — push, wait for its closer

    return not stack   # True if empty (all matched), False if openers remain`,
    trace: `"({[]})"
ch='(' → push → stack=['(']
ch='{' → push → stack=['(', '{']
ch='[' → push → stack=['(', '{', '[']
ch=']' → pop '[' → pairs[']']='[' ✓ → stack=['(', '{']
ch='}' → pop '{' → pairs['}']='{' ✓ → stack=['(']
ch=')' → pop '(' → pairs[')']=​'(' ✓ → stack=[]
stack empty → True ✓`,
    edgeCases: [
      { input: 's=""', expected: "True", why: "Empty string — trivially balanced" },
      { input: 's="("', expected: "False", why: "Unclosed opener at end" },
      { input: 's=")"', expected: "False", why: "Closer with no matching opener" },
      { input: 's="([)]"', expected: "False", why: "Improperly nested — [ and ) don't match" },
      { input: 's="[[]]"', expected: "True", why: "Properly nested same-type brackets" },
    ],
    quotes: [
      "You are the call stack. You hold the openers until their closers arrive. Every unmatched bracket is a bug waiting to crash production. You catch it before it ships.",
      "The call stack doesn't scare you — you ARE the call stack.",
    ],
    video: { id: "WTzjTskDFMg", title: "Valid Parentheses — Stack — Leetcode 20", channel: "NeetCode" },
    leetcode: [
      { number: 20, title: "Valid Parentheses", difficulty: "Easy", slug: "valid-parentheses" },
      { number: 155, title: "Min Stack", difficulty: "Medium", slug: "min-stack" },
    ],
  },
  {
    number: 9,
    title: "Min Stack",
    icon: "📉",
    complexity: { time: "O(1) all operations", space: "O(n)" },
    whenToUse: "Stack that tracks running minimum — maintain a parallel auxiliary stack",
    intuition: `Challenge: after popping the current minimum, what's the new minimum? A single variable doesn't work — popping might remove the min.

Solution: a second parallel stack (min_stack) that tracks the running minimum at every point. Every push also pushes the current minimum to min_stack. Every pop pops both. min_stack's top = current minimum. Always O(1).`,
    realWorld: {
      title: "Temperature Recorder With History",
      description: "A weather station tracks all temperatures AND always knows the coldest on record. Regular stack = all temperatures. Min stack = coldest temperature AT EACH POINT IN HISTORY. Pop a reading = revert coldest-on-record to what it was before that reading.",
    },
    problems: [
      {
        name: "Min Stack",
        statement: "Design a stack supporting push, pop, top, and getMin — all in O(1) time. getMin returns the minimum element currently in the stack, and must stay correct even after pops.",
        example: "push(-2), push(0), push(-3)\ngetMin() → -3\npop()\ngetMin() → -2  (the -3 was popped, -2 is the new min)",
      },
    ],
    prepQuestions: [
      "Must all operations be O(1) time, including getMin?",
      "What happens on pop() or top() of an empty stack? Can I assume valid input?",
      "Can values be negative? (Yes — matters for trick solutions that store encoded values)",
    ],
    code: `class MinStack:
    def __init__(self):
        self.stack = []       # main stack — holds actual values
        self.min_stack = []   # parallel stack — each entry = minimum AT THAT POINT

    def push(self, val):
        self.stack.append(val)
        # new minimum = smaller of new value OR current minimum
        # if min_stack is empty (first push), new value IS the minimum
        current_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(current_min)

    def pop(self):
        self.stack.pop()        # remove from main stack
        self.min_stack.pop()    # remove corresponding minimum snapshot

    def top(self):
        return self.stack[-1]   # peek main stack

    def getMin(self):
        return self.min_stack[-1]   # current min always on top of min_stack`,
    edgeCases: [
      { input: "push(1), getMin()", expected: "1", why: "Single element is the minimum" },
      { input: "push(5),push(3),push(7),getMin()", expected: "3", why: "Min is not at top of main stack" },
      { input: "push(3),push(3),pop(),getMin()", expected: "3", why: "Duplicate minimums — popping one shouldn't lose the min" },
      { input: "push(-1),push(0),pop(),getMin()", expected: "-1", why: "Negative minimum survives pop of larger value" },
    ],
    quotes: [
      "The auxiliary stack isn't extra work — it's extra information you carry for free. Every push costs you one extra append. In exchange, getMin is always O(1). That trade is always worth it.",
    ],
    video: { id: "WTzjTskDFMg", title: "Valid Parentheses — Stack — Leetcode 20", channel: "NeetCode" },
    leetcode: [
      { number: 155, title: "Min Stack", difficulty: "Medium", slug: "min-stack" },
    ],
  },
  {
    number: 10,
    title: "Queue Using Two Stacks",
    icon: "🚶",
    complexity: { time: "Amortized O(1)", space: "O(n)" },
    whenToUse: "FIFO behavior from LIFO structures — lazy transfer gives amortized O(1)",
    intuition: `One stack reverses order. Two stacks reverse it twice — restoring FIFO order.

stack_in collects new items. stack_out serves items. When stack_out is empty, dump all of stack_in into it — this reversal puts the oldest item on top. Only dump when stack_out is completely empty. Each element is transferred at most once total → amortized O(1).`,
    realWorld: {
      title: "Coffee Shop With Two Counters",
      description: "Orders arrive at the left counter (stack_in). When ready to serve, flip the entire left counter onto the right counter (stack_out), reversing the order. Oldest order is now on top. Only flip when the right counter is empty. Lazy flip = O(1) amortized per coffee.",
    },
    problems: [
      {
        name: "Implement Queue Using Two Stacks",
        statement: "Implement a FIFO queue using only two stacks. Support enqueue (add to back), dequeue (remove from front), and peek (read front). Each operation must run in amortized O(1) time.",
        example: "enqueue(1), enqueue(2), enqueue(3)\ndequeue() → 1\npeek()    → 2\ndequeue() → 2",
      },
    ],
    prepQuestions: [
      "Must all operations be strictly O(1), or is amortized O(1) acceptable?",
      "What happens if I call dequeue or peek on an empty queue?",
      "Do I need to support any operations besides enqueue, dequeue, and peek?",
    ],
    code: `class MyQueue:
    def __init__(self):
        self.stack_in = []    # receives new items — top = most recently added
        self.stack_out = []   # serves items — top = oldest item (FIFO order)

    def enqueue(self, x):
        self.stack_in.append(x)   # always push to inbox — O(1)

    def dequeue(self):
        self._transfer_if_empty()
        return self.stack_out.pop()   # oldest item is on top

    def peek(self):
        self._transfer_if_empty()
        return self.stack_out[-1]     # read without removing

    def _transfer_if_empty(self):
        # LAZY: only transfer when outbox is empty
        # ensures each element is transferred at most once → amortized O(1)
        if not self.stack_out:
            while self.stack_in:
                # pop newest first from inbox, push to outbox
                # this reversal puts oldest on top of outbox
                self.stack_out.append(self.stack_in.pop())`,
    edgeCases: [
      { input: "enqueue(1), dequeue()", expected: "1", why: "Single enqueue then dequeue" },
      { input: "enqueue(1),enqueue(2),enqueue(3),dequeue(),dequeue()", expected: "1 then 2", why: "FIFO order across multiple dequeues" },
      { input: "enqueue(1),dequeue(),enqueue(2),dequeue()", expected: "1 then 2", why: "Interleaved ops — transfer happens twice" },
    ],
    quotes: [
      "Two LIFOs make one FIFO. Two reversals restore the original order. That's not a trick — it's mathematical elegance. The Predator is hiding in the jungle terrified of your data structure knowledge.",
      "Goku figured out combining Kaioken with Super Saiyan was wrong. You figured out combining two stacks is exactly right for a queue. Better than Goku.",
    ],
    video: { id: "eanwa3ht3YQ", title: "Implement Queue using Stacks — Leetcode 232", channel: "NeetCode" },
    leetcode: [
      { number: 232, title: "Implement Queue using Stacks", difficulty: "Easy", slug: "implement-queue-using-stacks" },
    ],
  },
];

export default function SundayPage() {
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
          Day 1 <span className="text-[#E60023]">—</span> Foundation
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">Sunday · May 31</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Fluency, not heroics. Arrays, Strings, Hashmaps, Stacks — the patterns in 70%+ of all interviews. Hit every problem with the full ritual: clarify, example, brute force, optimize, code, verify.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Day 1 Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

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
          href="/monday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Day 2: Monday →
        </Link>
      </div>
    </div>
  );
}
