import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["longest-substring", "colorful-number"];

const topics = [
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
            Two fresh mediums under a timer, then stop grinding. Re-type all 7 templates from memory. Check your logistics. Sleep.
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
