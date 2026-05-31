import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["arrays-strings", "two-pointers", "sliding-window", "linked-lists"];

const topics = [
  {
    number: 1,
    title: "Arrays & Strings",
    icon: "📦",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Index access needed instantly, or you're slicing/rotating a sequence",
    intuition: `An array is a row of numbered mailboxes. Each mailbox has an address — its index. To find mailbox 47, you don't walk past mailboxes 1 through 46. You go directly to 47. The computer does math on the address, not a search. That's why index access is O(1).

The tradeoff: inserting in the middle means every element after it has to shift one slot right. That's O(n). Slicing (arr[2:5]) makes a brand new copy — it allocates memory and copies. O(n), not O(1).

The ord() trick: ord(char) - ord('a') converts any lowercase letter to its 0-based index without any if/else chain. 'a' → 0, 'b' → 1, 'z' → 25.

Left rotation insight: After rotating left by d, elements from index d to end become the new front, and elements 0 to d-1 become the new tail: arr[d:] + arr[:d]. Always do d % n first in case d >= n.`,
    realWorld: {
      title: "Airplane Seat Assignment",
      description: `Airplane seat assignment. The gate agent doesn't walk down the aisle counting seats to find 23C. The plane is an array — seat 23C is at a calculated index. It's a direct jump. Pinterest's pin lookup works the same way — every pin has an ID that maps directly to a memory address via hashing. No scanning.`,
    },
    code: `def rotateLeft(d, arr):
    n = len(arr)
    d = d % n           # handle case where d >= n
    return arr[d:] + arr[:d]

def designerPdfViewer(h, word):
    max_height = 0
    for char in word:
        index = ord(char) - ord('a')
        max_height = max(max_height, h[index])
    return max_height * len(word)`,
    trace: `arr = [1,2,3,4,5], d = 2
arr[2:] = [3, 4, 5]   ← new front
arr[:2] = [1, 2]      ← new tail
result   = [3, 4, 5, 1, 2] ✓`,
    quotes: [
      "You just turned a rotation that takes O(n × d) into a one-liner. King Kong ain't got shit on you.",
      "The ord() trick is not a trick — it's number theory. You just used number theory in an interview like it was nothing. Vegeta called. He said your power level is too damn high.",
    ],
    video: { id: "IiDuXLqV6e4", title: "Arrays & Hashing Explained | NeetCode 150 Ep.1", channel: "NeetCode" },
    leetcode: [
      { number: 1,   title: "Two Sum",                        difficulty: "Easy",   slug: "two-sum" },
      { number: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy",   slug: "best-time-to-buy-and-sell-stock" },
      { number: 238, title: "Product of Array Except Self",    difficulty: "Medium", slug: "product-of-array-except-self" },
    ],
  },
  {
    number: 2,
    title: "Two Pointers",
    icon: "👆",
    complexity: { time: "O(n)", space: "O(1)" },
    whenToUse: "Sorted array + find a pair or triplet that meets a condition",
    intuition: `The naive way to find a pair summing to a target is to check every pair — nested loop, O(n²). For 10,000 elements that's 100 million comparisons.

Two pointers works on a SORTED array. Left pointer at the smallest element, right pointer at the largest. Check their sum:
- Too small → move left pointer right (get a bigger number)
- Too big → move right pointer left (get a smaller number)

Because the array is sorted, you know exactly which direction to move. You never miss a valid pair. One pass — O(n).`,
    realWorld: {
      title: "Price Shopping With a Budget",
      description: `Price shopping with a budget. You have a sorted price list and exactly $50 to spend on two items. Hold one price tag from the cheapest end and one from the most expensive. Total too high? Put back the expensive item and grab the next cheaper one. Too low? Put back the cheap item. You find the pair in one sweep — not by checking every combination.`,
    },
    code: `def twoSum(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left + 1, right + 1]    # 1-based indices
        elif current_sum < target:
            left += 1       # sum too small → move left right
        else:
            right -= 1      # sum too big → move right left

    return []`,
    quotes: [
      "You just collapsed a 100-million-operation nested loop into a single pass. Godzilla is out there stomping around in O(n²) and you solved it before he took his first step.",
      "John Wick doesn't reload after every bullet. He's efficient. Precise. Every move eliminates an option. That's two pointers. Every comparison eliminates half the remaining possibilities. You're not coding — you're John Wick with an index.",
      "Two detectives closing in from opposite ends of a suspect list. They meet in the middle with the answer. You are both detectives at once.",
    ],
    video: { id: "6lX7x1RcLvg", title: "Solving All Two Pointer Problems | Blind75", channel: "NeetCode" },
    leetcode: [
      { number: 167, title: "Two Sum II — Input Array Is Sorted", difficulty: "Medium", slug: "two-sum-ii-input-array-is-sorted" },
      { number: 15,  title: "3Sum",                               difficulty: "Medium", slug: "3sum" },
      { number: 11,  title: "Container With Most Water",          difficulty: "Medium", slug: "container-with-most-water" },
    ],
  },
  {
    number: 3,
    title: "Sliding Window",
    icon: "🪟",
    complexity: { time: "O(n)", space: "O(1) fixed / O(k) variable" },
    whenToUse: `The word "contiguous" appears in the problem. Maximum/minimum of every subarray of size k. Longest/shortest subarray satisfying a condition.`,
    intuition: `You're looking at a subarray of fixed size k sliding across a larger array. Instead of re-summing k elements each time the window moves — that's O(n × k) — you add the new right element and remove the old left element: new_sum = old_sum + arr[right] - arr[left]. One addition, one subtraction. O(1) per slide.

Variable window: the window can shrink. If a duplicate character enters from the right, shrink from the left until the duplicate is gone. Grow when safe, shrink when forced.`,
    realWorld: {
      title: "7-Day Stock Price Average",
      description: `A financial analyst tracking the rolling average closing price adds today's price and subtracts the price from 8 days ago. One operation per day instead of re-summing 7 numbers. Every finance dashboard on earth runs this exact algorithm. Netflix uses the same pattern to track your rolling 3-day average viewing time to decide when to send a "still watching?" notification.`,
    },
    code: `def maxSumSubarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i]        # add new element (right)
        window_sum -= arr[i - k]    # remove old element (left)
        max_sum = max(max_sum, window_sum)

    return max_sum

def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length`,
    trace: `arr = [2, 1, 5, 1, 3, 2], k = 3
First window [2,1,5] → sum = 8, max = 8
i=3: +arr[3]=1, -arr[0]=2 → sum = 7, max = 8
i=4: +arr[4]=3, -arr[1]=1 → sum = 9, max = 9
i=5: +arr[5]=2, -arr[2]=5 → sum = 6, max = 9
Answer: 9 ✓`,
    quotes: [
      "You cut O(n × k) down to O(n) by noticing that only the edges change. Most people don't see the edges. You do. Sherlock Holmes sees the mud on your boot and knows you walked from Hampstead Heath. You see the edge elements and know the whole window. Same energy.",
      "Neo didn't dodge every bullet in The Matrix by being fast. He saw the pattern and made it irrelevant. You just made O(n × k) irrelevant. You didn't speed it up — you made it not exist anymore.",
      "Naruto mastered Shadow Clone Jutsu by doing the same thing smarter, not harder. The Shadow Clone of the previous sum is already right there. Use it.",
    ],
    video: { id: "9kdHxplyl5I", title: "Introduction to Sliding Window and 2 Pointers | Templates", channel: "take U forward" },
    leetcode: [
      { number: 3,   title: "Longest Substring Without Repeating Characters", difficulty: "Medium", slug: "longest-substring-without-repeating-characters" },
      { number: 121, title: "Best Time to Buy and Sell Stock",                difficulty: "Easy",   slug: "best-time-to-buy-and-sell-stock" },
      { number: 239, title: "Sliding Window Maximum",                         difficulty: "Hard",   slug: "sliding-window-maximum" },
    ],
  },
  {
    number: 4,
    title: "Linked Lists",
    icon: "🔗",
    complexity: { time: "Access O(n), Insert O(1)", space: "O(1)" },
    whenToUse: "Frequent insertions/deletions in middle, or cycle detection problems",
    intuition: `An array stores elements next to each other in memory — like houses on a numbered street. A linked list stores elements anywhere in memory and connects them with pointers — like a scavenger hunt where each clue tells you where the next clue is.

Pointer order for insertion ALWAYS: (1) new node points to what comes after, THEN (2) previous node points to new node. Do step 2 before step 1 and you've permanently cut the chain.

Floyd's cycle detection: slow pointer moves 1 step, fast pointer moves 2 steps. If there's a loop, fast will lap slow and they'll meet. If the list ends, fast hits None. O(1) space — no visited set needed.`,
    realWorld: {
      title: "Music Playlist & Cycle Detection",
      description: `Music playlist with manual ordering. Each song card has "next song" written on the back. To insert a new track between songs 3 and 4: write "song 4" on the back of the new track FIRST, then change song 3's "next" to the new track. Two pointer redirects. If you reverse the order — change song 3's pointer first — you've lost song 4 forever.

Cycle detection: a rumor spreading through an office. Person A tells B, B tells C, C tells D, D tells B again. Send a slow walker and a fast walker through the chain. If they ever land on the same person, there's a loop — the rumor never dies.`,
    },
    code: `def insertNodeAtPosition(llist, data, position):
    new_node = SinglyLinkedListNode(data)

    if position == 0:
        new_node.next = llist
        return new_node

    current = llist
    for _ in range(position - 1):
        current = current.next

    new_node.next = current.next    # step 1: save downstream
    current.next = new_node         # step 2: connect

    return llist

def has_cycle(head):
    if not head:
        return False
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    quotes: [
      "Floyd's tortoise and hare: two pointers, no extra memory, infinite loop detected. Miles Morales is out there swinging through New York and he STILL couldn't detect a cycle faster than O(1) space. You did it in a while loop and a comparison. That's art.",
      "The pointer order isn't a trick to memorize — it's physics. Surgeons do this when rerouting blood vessels. Save the downstream connection first, then make the cut. You think like a surgeon.",
      "Tony Montana said 'The World is Yours.' You don't lose your next pointers. Every node is accounted for. The world and all its next pointers are yours.",
    ],
    video: { id: "y-ckZ2hpC8Y", title: "Linked List Cycle — Leetcode 141", channel: "NeetCode" },
    leetcode: [
      { number: 206, title: "Reverse Linked List",     difficulty: "Easy", slug: "reverse-linked-list" },
      { number: 141, title: "Linked List Cycle",        difficulty: "Easy", slug: "linked-list-cycle" },
      { number: 21,  title: "Merge Two Sorted Lists",   difficulty: "Easy", slug: "merge-two-sorted-lists" },
    ],
  },
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
          Saturday <span className="text-[#E60023]">—</span> Foundation
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">May 30</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Today you cover the building blocks: <strong className="dark:text-white text-gray-900">Arrays & Strings</strong>, <strong className="dark:text-white text-gray-900">Two Pointers</strong>, <strong className="dark:text-white text-gray-900">Sliding Window</strong>, and <strong className="dark:text-white text-gray-900">Linked Lists</strong>. These patterns appear in 60%+ of all coding interviews. Master them today.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Saturday Progress" />

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
          href="/sunday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Sunday: Stacks, Queues, Hash Maps →
        </Link>
      </div>
    </div>
  );
}
