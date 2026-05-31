import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["stacks", "queues", "hash-maps", "sorting"];

const topics = [
  {
    number: 5,
    title: "Stacks",
    icon: "📚",
    complexity: { time: "Push/Pop/Peek O(1)", space: "O(n)" },
    whenToUse: "Most-recently-seen item needed, undo/redo, bracket matching, function call tracking",
    intuition: `A stack is a pile. You add to the top. You remove from the top. Last in, first out — LIFO.

Why stacks solve the brackets problem: every time you see an open bracket, push it. When you see a close bracket, the most recent unmatched open bracket is right there on top. Check if they match. If they don't — or the stack is empty — it's invalid. At the end, an empty stack means every opener got a closer.

In Python: list works as a stack. append() to push. pop() to pop. [-1] to peek. All O(1).`,
    realWorld: {
      title: "Browser Back Button & Undo",
      description: `Browser back button. Every page you visit gets pushed onto a history stack. When you hit back, the most recent page pops off. The page you're on is always the top of the stack.

Ctrl+Z undo. Every action gets pushed to an undo stack. Ctrl+Z pops the most recent action and reverses it. This is why undo goes in reverse chronological order — it's a stack.

Nested code blocks. When Python reads your code and hits a {, it pushes it. When it hits }, it checks that the top matches. This is literally how your code gets parsed — a stack validates every open bracket gets a close.`,
    },
    code: `def isBalanced(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    open_brackets = set(mapping.values())

    for char in s:
        if char in open_brackets:
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return "NO"

    return "YES" if not stack else "NO"`,
    trace: `"({[]})"
char='(' → push → stack=['(']
char='{' → push → stack=['(', '{']
char='[' → push → stack=['(', '{', '[']
char=']' → pop '[' → mapping[']']='[' ✓ → stack=['(', '{']
char='}' → pop '{' → mapping['}']='{' ✓ → stack=['(']
char=')' → pop '(' → mapping[')']=​'(' ✓ → stack=[]
stack empty → "YES" ✓`,
    quotes: [
      "You are the call stack. When someone hands you a complex problem, you push the subproblems onto your mental stack, solve the deepest one first, and work your way back up. Hermione Granger had a stack of every spell she'd ever learned and pulled the right one every time. That's you. Hermione energy.",
      "The call stack doesn't scare you — you ARE the call stack.",
      "Batman doesn't get confused when situations nest inside each other. Hostage situation inside a burning building inside a blackout inside a city under attack. He pushes each layer onto his mental stack, solves the deepest one, and unwinds. You just described recursion. You just described Batman.",
      "Thanos has all six Infinity Stones. You have a stack. Yours is more useful.",
    ],
    video: { id: "WTzjTskDFMg", title: "Valid Parentheses — Leetcode 20 — Stack", channel: "NeetCode" },
    leetcode: [
      { number: 20,  title: "Valid Parentheses", difficulty: "Easy",   slug: "valid-parentheses" },
      { number: 155, title: "Min Stack",          difficulty: "Medium", slug: "min-stack" },
      { number: 739, title: "Daily Temperatures",  difficulty: "Medium", slug: "daily-temperatures" },
    ],
  },
  {
    number: 6,
    title: "Queues",
    icon: "🚶",
    complexity: { time: "Enqueue/Dequeue O(1)", space: "O(n)" },
    whenToUse: "First-in first-out processing, BFS traversal, task scheduling",
    intuition: `A queue is a line. First in, first out — FIFO.

NEVER use list.pop(0) as a queue. It removes the first element then shifts every other element left — O(n). Use collections.deque — popleft() is O(1). At Pinterest's scale, the difference between O(1) and O(n) per operation is the difference between a working product and a down service.

Queue from two stacks: One stack receives new items. One stack serves items. When the serving stack is empty, dump everything from the incoming stack into it (reversing the order, putting the oldest item on top). Only dump when the serving stack is completely empty — lazy transfer. Each element is transferred exactly once: amortized O(1).`,
    realWorld: {
      title: "Pinterest Notification Queue",
      description: `Pinterest notification queue. When your pin goes viral and you get 47 notifications, they enter a queue in the order they happened. The first like gets delivered first. If Pinterest used list.pop(0) instead of a deque, every notification delivery would scan the whole list. With 100 million users generating notifications simultaneously, that would melt their servers.

Two stacks making a queue — the coffee shop version: Orders come in on the left counter (inbox stack). When the barista is free, they flip the entire left counter onto the right counter (reversing order), and serve from the right. The first order placed is now on top. Only flip when the right counter is empty. That's the lazy transfer.`,
    },
    code: `from collections import deque

class MyQueue:
    def __init__(self):
        self.stack_in = []
        self.stack_out = []

    def enqueue(self, x):
        self.stack_in.append(x)

    def dequeue(self):
        self._shift_if_needed()
        return self.stack_out.pop()

    def peek(self):
        self._shift_if_needed()
        return self.stack_out[-1]

    def _shift_if_needed(self):
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())`,
    quotes: [
      "Two stacks. One queue. FIFO behavior out of two LIFOs. You understand this at the mechanical level. The Predator is hiding in the jungle terrified of your data structure knowledge.",
      "You know why deque exists, you know why list.pop(0) is a trap, and you can explain it in production terms. Most candidates know WHAT a queue is. You know WHY the implementation detail matters. That's the difference between someone who passed a course and someone who builds systems.",
      "Goku figured out that combining Kaioken with Super Saiyan was too much for his body. You figured out that combining two stacks is exactly right for a queue. Better than Goku. Confirmed.",
    ],
    video: { id: "eanwa3ht3YQ", title: "Implement Queue using Stacks — Leetcode 232", channel: "NeetCode" },
    leetcode: [
      { number: 232, title: "Implement Queue using Stacks", difficulty: "Easy", slug: "implement-queue-using-stacks" },
      { number: 933, title: "Number of Recent Calls",       difficulty: "Easy", slug: "number-of-recent-calls" },
    ],
  },
  {
    number: 7,
    title: "Hash Maps & Sets",
    icon: "🗺️",
    complexity: { time: "Lookup/Insert/Delete O(1) avg", space: "O(n)" },
    whenToUse: "Duplicate check, pair sum, count occurrences, complement lookup",
    intuition: `A hash map converts your key into an array index via a math function (the hash function), then jumps straight there. Lookup is O(1) not because it's magic — it's because it's secretly an array access with a math step upfront.

The mental shift: any time you're about to write a nested loop to find pairs or check duplicates, ask: "Can I store what I've seen so far in a hash map and look it up in O(1)?" Almost always yes.

The complement trick: you want two numbers summing to target. For each number, the complement is target - current. Check if the complement is already in your map. If yes, done. If no, store the current number. One pass. O(n).`,
    realWorld: {
      title: "Pinterest Pin ID Lookup",
      description: `Pinterest's pin ID lookup. Every pin has a unique ID. When you click a pin, Pinterest doesn't scan 200 billion pins. It hashes the pin ID to a bucket and retrieves the data directly. That's a hash map at planetary scale. O(1) lookup whether you have 100 pins or 100 billion.

Detecting duplicate usernames on signup. When you try to register "jared_c" on Pinterest, it hashes "jared_c" and checks if that slot is taken. Instant answer. This is why username checks are real-time even with 400 million users.

The complement trick in real life: You're buying two groceries and have $20. Walk through the store once. For each item at price P, check your mental "prices I've already seen" list for the item costing $20 - P. First time you find the complement, done. One pass.`,
    },
    code: `def icecreamParlor(m, arr):
    seen = {}

    for i, price in enumerate(arr):
        complement = m - price

        if complement in seen:
            return [seen[complement], i + 1]

        seen[price] = i + 1

    return []`,
    quotes: [
      "The complement trick is beautiful because it inverts the problem. Instead of asking 'does this pair work?' you ask 'what do I still need, and have I seen it?' Future Jared set up the answer for Present Jared. The hash map is a message from your past self.",
      "Jason Bourne doesn't enter a room and check every person for a threat. He scans once, maps the room, and now every threat is retrievable in O(1). That's a hash map. You are Jason Bourne every time you reach for a dict instead of a nested loop.",
      "Hash maps turn O(n²) pair-finding into a single pass. You didn't just learn a data structure. You learned how Pinterest serves billions of requests per day without melting. Walter White didn't just cook — he understood chemistry at a molecular level. You understand hash maps at the same level. You are the one who hashes.",
    ],
    video: { id: "KLlXCFG5TnA", title: "Two Sum — Leetcode 1 — HashMap", channel: "NeetCode" },
    leetcode: [
      { number: 1,   title: "Two Sum",                  difficulty: "Easy",   slug: "two-sum" },
      { number: 49,  title: "Group Anagrams",            difficulty: "Medium", slug: "group-anagrams" },
      { number: 347, title: "Top K Frequent Elements",   difficulty: "Medium", slug: "top-k-frequent-elements" },
    ],
  },
  {
    number: 8,
    title: "Sorting",
    icon: "🔢",
    complexity: { time: "Insertion O(n²) / Quicksort O(n log n) avg", space: "O(log n)" },
    whenToUse: "Before applying two pointers, binary search, or when duplicates need to be adjacent",
    intuition: `Sorting converts an unordered mess into a structure where powerful techniques become possible: two pointers, binary search, duplicate detection. Sorting first is often the opening move on hard problems.

Insertion sort: sorting a hand of playing cards. Pick each card and slide it left past any card that's bigger until it's in the right spot. O(n²) generally, O(n) if nearly sorted.

Quicksort: pick a pivot element. Put everything smaller on the left, everything larger on the right. The pivot is in its permanent position. Recurse on both halves. Average O(n log n). Degrades to O(n²) on already-sorted arrays if you always pick the first element as pivot — fix with random pivot.`,
    realWorld: {
      title: "Bookshelf & Amazon Price Sort",
      description: `Insertion sort — sorting photos by date on your phone. Go through photos one at a time. For each new photo, slide it back through already-sorted photos until it's in chronological order. Your processed section is always sorted.

Quicksort — organizing a bookshelf. Pick any book as the pivot. Put alphabetically-before books on the left, alphabetically-after on the right. That book is permanently shelved. Repeat for each pile.

Why sorting unlocks everything: Amazon's "sort by price low to high." Before displaying results, they sort all products once — O(n log n). Now every price query is O(n). Without pre-sorting, every query would scan unsorted data. Sorting is an investment.`,
    },
    code: `def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def quickSort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left  = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]
    return quickSort(left) + [pivot] + quickSort(right)`,
    quotes: [
      "Insertion sort is patient. It handles one card at a time, places it perfectly, and moves on. That's how Rocky Balboa trained. One punch at a time. Each one placed correctly. He didn't brute-force his way to the championship. You sort like Rocky trains.",
      "You know WHEN quicksort hits O(n²) and you know the fix. Most people know quicksort is fast. You know its failure mode AND its remedy. Oppenheimer didn't just know how to build the bomb. He knew exactly when and how it would fail. You have that same clarity.",
      "Kobe Bryant said 'the details are not the details. They make the design.' You have Kobe's attention to detail in a sorting algorithm.",
    ],
    video: { id: "Vtckgz38QHs", title: "Learn Quick Sort in 13 minutes ⚡", channel: "Bro Code" },
    leetcode: [
      { number: 75,  title: "Sort Colors",      difficulty: "Medium", slug: "sort-colors" },
      { number: 912, title: "Sort an Array",    difficulty: "Medium", slug: "sort-an-array" },
      { number: 56,  title: "Merge Intervals",  difficulty: "Medium", slug: "merge-intervals" },
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
          Sunday <span className="text-[#E60023]">—</span> Core Data Structures
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">June 1</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Today you cover: <strong className="dark:text-white text-gray-900">Stacks</strong>, <strong className="dark:text-white text-gray-900">Queues</strong>, <strong className="dark:text-white text-gray-900">Hash Maps & Sets</strong>, and <strong className="dark:text-white text-gray-900">Sorting</strong>. These are the workhorses of every real system — and the secret weapon behind Pinterest&apos;s feed, notifications, and search.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Sunday Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Bottom nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/saturday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 text-gray-700 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Saturday: Arrays & Pointers
        </Link>
        <Link
          href="/monday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Monday: Trees, Heaps, Tries →
        </Link>
      </div>
    </div>
  );
}
