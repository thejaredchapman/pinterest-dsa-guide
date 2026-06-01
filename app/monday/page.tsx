import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";
import { CountdownBadge } from "@/components/CountdownTimer";

const TOPIC_IDS = ["balanced-brackets", "min-stack", "queue-two-stacks", "reverse-linked-list", "linked-list-cycle", "merge-sorted-lists", "max-depth"];

const topics = [
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
            Day 2 focus: Stacks, Linked Lists, and Trees — 7 problems. Master bracket matching, the auxiliary min stack, two-stack queue, pointer rewiring, Floyd's cycle detection, and tree recursion. These patterns build on each other. The mock at the end of today is mandatory.
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
