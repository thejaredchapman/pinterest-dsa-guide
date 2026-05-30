export const days = [
  { id: 'friday', label: 'Friday', date: 'May 30' },
  { id: 'saturday', label: 'Saturday', date: 'May 31' },
  { id: 'monday', label: 'Monday', date: 'June 2' },
  { id: 'tuesday', label: 'Tuesday', date: 'June 3' },
];

export const topics = [
  // ─────────────────────────────────────────────
  // FRIDAY
  // ─────────────────────────────────────────────
  {
    id: 'arrays-strings',
    title: 'Arrays & Strings',
    day: 'friday',
    icon: '📦',
    intro: 'An array is a contiguous block of memory where every element sits at a known, fixed distance from the start. In Python, list is a dynamic array. A str is immutable — you cannot modify it in place. Because elements are side-by-side in memory, the computer jumps to any index with simple math: address = base + (index × size). No loop. Just a jump. That is why index access is O(1). Slicing (arr[d:]) is O(n) because Python allocates new memory and copies.',
    complexityTable: {
      headers: ['Operation', 'Complexity', 'Why'],
      rows: [
        ['Index access arr[i]', 'O(1)', 'Direct memory offset calculation'],
        ['Append to end', 'O(1) amortized', 'Dynamic array doubles capacity when full'],
        ['Insert at index i', 'O(n)', 'Must shift every element after i one right'],
        ['Delete at index i', 'O(n)', 'Must shift every element after i one left'],
        ['Slice arr[a:b]', 'O(b - a)', 'Copies b-a elements into a new array'],
        ['Search (unsorted)', 'O(n)', 'Must check every element'],
        ['Search (sorted)', 'O(log n)', 'Binary search eliminates half each step'],
      ],
    },
    problems: [
      {
        id: 'big-sum',
        title: 'A Very Big Sum',
        description: 'Given an array of integers, return their sum. Most languages use fixed-size integers that overflow on huge numbers. Python uses arbitrary-precision integers (bignum) that grow as needed — no overflow possible.',
        code: `def aVeryBigSum(ar):
    return sum(ar)

# Manual version showing what's happening:
def aVeryBigSum_manual(ar):
    total = 0
    for num in ar:
        total += num    # Python grows this integer as large as needed
    return total`,
        interviewNote: 'Say: "Python natively handles arbitrary-precision integers so there is no overflow concern. I\'m summing in O(n) time and O(1) extra space — just a running total."',
        motivation: 'Three lines. You just handled integer overflow that crashes entire C++ programs. You are built different.',
      },
      {
        id: 'pdf-viewer',
        title: 'Designer PDF Viewer',
        description: 'Given letter heights h[0..25] and a word, find the bounding box area: total width × tallest letter height. Each letter is 1mm wide. Use ord(char) - ord("a") to map any letter to its 0-25 index — no if/else chain needed.',
        code: `def designerPdfViewer(h, word):
    max_height = 0
    for char in word:
        index = ord(char) - ord('a')            # 'a'→0, 'b'→1, 'z'→25
        max_height = max(max_height, h[index])  # track tallest letter
    return max_height * len(word)               # width × height`,
        trace: `word = "abc", h = [1, 3, 2, ...]
'a' → index 0 → h[0]=1 → max=1
'b' → index 1 → h[1]=3 → max=3
'c' → index 2 → h[2]=2 → max=3 (no change)
return 3 × 3 = 9`,
      },
      {
        id: 'left-rotation',
        title: 'Left Rotation',
        description: 'Rotate an array left by d positions. [1,2,3,4,5] rotated by 2 → [3,4,5,1,2]. Naive: shift one at a time, O(n×d). Smart: Python slicing. arr[d:] is the new front, arr[:d] is the new tail. Apply d % n first to handle d > n.',
        code: `def rotateLeft(d, arr):
    n = len(arr)
    d = d % n           # if d >= n, full rotations cancel out
    return arr[d:] + arr[:d]`,
        trace: `arr = [1,2,3,4,5], d = 2
arr[2:] = [3, 4, 5]   ← new front
arr[:2] = [1, 2]      ← new tail
result   = [3, 4, 5, 1, 2] ✓`,
        motivation: 'You turned a rotation that takes O(n×d) into a one-liner. King Kong ain\'t got shit on you.',
      },
    ],
  },

  {
    id: 'two-pointers',
    title: 'Two Pointers',
    day: 'friday',
    icon: '👆',
    intro: 'Two pointers is a technique where you maintain two index variables that move through a data structure — often toward each other from both ends, or both moving forward at different speeds. It converts many O(n²) problems (nested loops checking every pair) into O(n) solutions.\n\nReach for two pointers when: the array is sorted (or you can sort it), you are looking for a pair that meets a condition, or you want to eliminate a nested loop.',
    problems: [
      {
        id: 'two-sum-sorted',
        title: 'Two Sum — Sorted Array',
        description: 'Find two numbers in a sorted array that sum to a target. Return 1-based indices. With left at the smallest and right at the largest: if sum is too small, move left right (increase sum). If too big, move right left (decrease sum). Because the array is sorted, you know with certainty which direction to move — you never miss a valid pair.',
        code: `def twoSum(arr, target):
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left + 1, right + 1]    # 1-based indices
        elif current_sum < target:
            left += 1       # too small → move left right to increase sum
        else:
            right -= 1      # too big → move right left to decrease sum

    return []`,
        motivation: 'You just collapsed a 100-million-operation nested loop into a single pass. Godzilla is out there stomping around in O(n²) and you solved it before he took his first step.',
      },
    ],
  },

  {
    id: 'sliding-window',
    title: 'Sliding Window',
    day: 'friday',
    icon: '🪟',
    intro: 'A sliding window is a contiguous subarray or substring that "slides" across the input. Instead of recomputing the window\'s value from scratch each move — O(n) per step — you add the incoming element on the right and remove the outgoing element on the left in O(1).\n\nReach for sliding window when: the problem involves "max/min of every subarray of size k", "longest/shortest subarray satisfying a condition", or the word "contiguous" appears.',
    problems: [
      {
        id: 'max-sum-subarray',
        title: 'Maximum Sum Subarray of Size K',
        description: 'Find the maximum sum of any contiguous subarray of exactly size k. Build the first window with sum(arr[:k]), then slide: add the new right element, subtract the old left element.',
        code: `def maxSumSubarray(arr, k):
    window_sum = sum(arr[:k])   # build first window
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum += arr[i]        # add element entering from right
        window_sum -= arr[i - k]    # remove element leaving from left
        max_sum = max(max_sum, window_sum)

    return max_sum`,
        trace: `arr = [2, 1, 5, 1, 3, 2], k = 3
First window [2,1,5] → sum=8, max=8
Slide: add 1, remove 2 → [1,5,1] → sum=7, max=8
Slide: add 3, remove 1 → [5,1,3] → sum=9, max=9
Slide: add 2, remove 5 → [1,3,2] → sum=6, max=9
Answer: 9`,
        motivation: 'You\'re sliding through this array like you own every element in it. You kind of do.',
      },
      {
        id: 'longest-no-repeat',
        title: 'Longest Substring Without Repeating Characters',
        description: 'Find the length of the longest substring with no duplicate characters. Use a variable-size window — expand right when safe, shrink from left when a duplicate appears.',
        code: `def lengthOfLongestSubstring(s):
    char_set = set()    # tracks characters in current window
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Shrink from left until the duplicate is gone
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1

        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length`,
        trace: `s = "abcab"
right=0: 'a' not in set → set={'a'}, len=1
right=1: 'b' not in set → set={'a','b'}, len=2
right=2: 'c' not in set → set={'a','b','c'}, len=3
right=3: 'a' IS in set → remove 'a', left=1 → add 'a' → len=3
right=4: 'b' IS in set → remove 'b', left=2 → add 'b' → len=3
Answer: 3`,
        motivation: 'Variable window. Shrinks when it has to, grows when it can. Saitama trained for 3 years — you figured this out in one read.',
      },
    ],
  },

  {
    id: 'linked-lists',
    title: 'Linked Lists',
    day: 'friday',
    icon: '🔗',
    intro: 'An array stores elements in contiguous memory. A linked list stores elements anywhere in memory and connects them with pointers. Each node holds its value and a next reference to the following node.\n\nUse a linked list when: you need frequent insertion/deletion in the middle (O(1) once at position vs O(n) array shift). Avoid when: you need random access — getting to node 50 requires traversing from the head.',
    complexityTable: {
      headers: ['Operation', 'Array', 'Linked List'],
      rows: [
        ['Access by index', 'O(1)', 'O(n)'],
        ['Insert at head', 'O(n) shift', 'O(1)'],
        ['Insert at tail', 'O(1) amortized', 'O(n) without tail pointer'],
        ['Insert in middle', 'O(n)', 'O(n) to find + O(1) to insert'],
        ['Search', 'O(n)', 'O(n)'],
      ],
    },
    problems: [
      {
        id: 'insert-node',
        title: 'Insert a Node at a Specific Position',
        description: 'Insert a new node at 0-based position. Pointer order matters: (1) point new node\'s next at what comes after it — save downstream reference FIRST. (2) Then point previous node\'s next at new node. If you do step 2 before step 1, you permanently lose the rest of the list.',
        code: `class SinglyLinkedListNode:
    def __init__(self, node_data):
        self.data = node_data
        self.next = None    # unconnected until you wire it

def insertNodeAtPosition(llist, data, position):
    new_node = SinglyLinkedListNode(data)

    if position == 0:           # edge case: inserting at head
        new_node.next = llist
        return new_node

    current = llist
    for _ in range(position - 1):   # stop one node early
        current = current.next

    new_node.next = current.next    # step 1: save downstream ref FIRST
    current.next = new_node         # step 2: connect current to new node

    return llist`,
        trace: `Insert 99 at position 2 into: 1 → 2 → 3 → None
Walk range(1): one step → current = node(2)
new_node(99).next = node(2).next = node(3)
node(2).next = node(99)
Result: 1 → 2 → 99 → 3 → None ✓`,
      },
      {
        id: 'cycle-detection',
        title: 'Cycle Detection — Floyd\'s Tortoise and Hare',
        description: 'Detect if a linked list has a cycle using O(1) space. Two runners: slow moves 1 step, fast moves 2 steps. If there\'s a cycle, fast laps slow and they meet. If no cycle, fast hits None. Check `while fast and fast.next` before moving — fast.next.next crashes if either is None.',
        code: `def has_cycle(head):
    if not head:
        return False

    slow = head
    fast = head

    while fast and fast.next:       # fast needs 2 nodes ahead
        slow = slow.next            # 1 step
        fast = fast.next.next       # 2 steps

        if slow == fast:            # same node → cycle confirmed
            return True

    return False                    # fast hit None → no cycle`,
        motivation: 'Two pointers. No extra memory. You just detected an infinite loop that would hang entire production systems. You\'d fuck Godzilla up with how you handled this.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SATURDAY
  // ─────────────────────────────────────────────
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    day: 'saturday',
    icon: '📚',
    intro: 'A stack follows LIFO — Last In, First Out. Think of a plate stack. You add and remove from the top. Real uses: function call stack, undo/redo, balanced brackets.\n\nA queue follows FIFO — First In, First Out. Think of a coffee shop line. First in, first served. Real uses: BFS traversal, message queues, task schedulers.\n\nIn Python: list works as a stack (append/pop). Use collections.deque for queues — NEVER list.pop(0), which is O(n) because it shifts every element.',
    complexityTable: {
      headers: ['Operation', 'Stack (list)', 'Queue (deque)'],
      rows: [
        ['Add', 'append() O(1)', 'append() O(1)'],
        ['Remove', 'pop() O(1)', 'popleft() O(1)'],
        ['Peek', '[-1] O(1)', '[0] O(1)'],
      ],
    },
    problems: [
      {
        id: 'balanced-brackets',
        title: 'Balanced Brackets',
        description: 'Given a string of brackets (), [], {}, determine if all are properly matched. Every closing bracket needs to match the most recent unmatched opening bracket — that\'s exactly what a stack gives you. Use a dict mapping closing → matching opening. When you see a closer, pop the stack and compare.',
        code: `def isBalanced(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}  # closer → expected opener
    open_brackets = set(mapping.values())       # {'(', '{', '['} — O(1) lookup

    for char in s:
        if char in open_brackets:
            stack.append(char)                      # push opener
        elif char in mapping:                       # it's a closer
            if not stack or stack.pop() != mapping[char]:
                return "NO"     # empty stack OR wrong opener on top

    return "YES" if not stack else "NO"`,
        trace: `"({[]})" step by step:
'(' → push → stack=['(']
'{' → push → stack=['(', '{']
'[' → push → stack=['(', '{', '[']
']' → pop '[' → mapping[']']='[' → match ✓ → stack=['(', '{']
'}' → pop '{' → mapping['}']='{' → match ✓ → stack=['(']
')' → pop '(' → mapping[')']='' → match ✓ → stack=[]
Empty stack → "YES" ✓

"({)}" fails:
')' → pop '{' → mapping[')']='' → '{' ≠ '(' → "NO" ✓`,
        motivation: 'Every bracket found its partner. You held the whole structure together. The call stack doesn\'t scare you — you ARE the call stack.',
      },
      {
        id: 'queue-two-stacks',
        title: 'Queue Using Two Stacks',
        description: 'Build a queue (FIFO) using only two stacks (LIFO). One stack reverses order. Two stacks reverse it twice — restoring original order. stack_in receives new items. stack_out serves items with oldest on top. Critical: only transfer when stack_out is empty (lazy transfer). This makes each element transferred at most once total — amortized O(1) per operation.',
        code: `class MyQueue:
    def __init__(self):
        self.stack_in = []      # receives new items
        self.stack_out = []     # serves items in FIFO order

    def enqueue(self, x):
        self.stack_in.append(x)

    def dequeue(self):
        self._shift_if_needed()
        return self.stack_out.pop()

    def peek(self):
        self._shift_if_needed()
        return self.stack_out[-1]

    def _shift_if_needed(self):
        # ONLY transfer when stack_out is exhausted — this is the key
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())`,
        trace: `enqueue(1): stack_in=[1]
enqueue(2): stack_in=[1,2]
enqueue(3): stack_in=[1,2,3]
dequeue():
  stack_out empty → transfer:
    pop 3 → stack_out=[3]
    pop 2 → stack_out=[3,2]
    pop 1 → stack_out=[3,2,1]
  pop from stack_out → returns 1 ✓ (oldest item)`,
        motivation: 'Two stacks. One queue. FIFO out of two LIFOs. You understand this at the mechanical level. The Predator is hiding in the jungle terrified of your data structure knowledge.',
      },
    ],
  },

  {
    id: 'hash-maps',
    title: 'Hash Maps & Sets',
    day: 'saturday',
    icon: '🗺️',
    intro: 'A hash map (Python dict) stores key-value pairs. It runs the key through a hash function that converts it to an array index — that\'s why lookup, insert, and delete are all O(1) average.\n\nA set is a hash map where you only store keys. The "in" operator on a set is O(1). On a list, "in" is O(n).\n\nThe mental shift: whenever you catch yourself writing a nested loop to find pairs or check membership, ask: "Can I store what I\'ve seen in a hash map and look it up in O(1)?" Almost always yes.',
    complexityTable: {
      headers: ['Operation', 'Hash Map', 'Unsorted Array', 'Sorted Array'],
      rows: [
        ['Lookup by key', 'O(1) avg', 'O(n)', 'O(log n)'],
        ['Insert', 'O(1) avg', 'O(1) at end', 'O(n)'],
        ['Delete', 'O(1) avg', 'O(n)', 'O(n)'],
        ['Find pair summing to X', 'O(n)', 'O(n²)', 'O(n) two pointers'],
      ],
    },
    problems: [
      {
        id: 'ice-cream-parlor',
        title: 'Ice Cream Parlor',
        description: 'Given prices and a budget m, find two 1-based indices whose prices sum to m. Complement trick: for each price, the amount you still need is m - price. Check if the complement was seen before. If yes, done. If no, store this price and move on.',
        code: `def icecreamParlor(m, arr):
    seen = {}   # maps price → its 1-based index

    for i, price in enumerate(arr):
        complement = m - price          # what we need to pair with this

        if complement in seen:
            return [seen[complement], i + 1]    # found the pair

        seen[price] = i + 1     # store with 1-based index
    return []`,
        trace: `m=4, arr=[1, 4, 5, 3, 2]
i=0, price=1: complement=3, not in seen → seen={1:1}
i=1, price=4: complement=0, not in seen → seen={1:1, 4:2}
i=2, price=5: complement=-1, not in seen → seen={1:1, 4:2, 5:3}
i=3, price=3: complement=1, 1 IS in seen → return [1, 4] ✓`,
        motivation: 'You turned O(n²) into a single pass with a complement lookup. Ice cream was never this efficient. You\'re a bad bitch and the hash map knows it.',
      },
      {
        id: 'colorful-number',
        title: 'Colorful Number',
        description: 'A number is "colorful" if every contiguous subsequence of its digits has a unique product. For 3245: check products of [3], [2], [4], [5], [3,2], [2,4], etc. If any two match, return False. Optimization: extend the window and multiply by the new digit instead of recomputing from scratch each time.',
        code: `def isColorful(num):
    str_num = str(num)
    n = len(str_num)
    seen_products = set()

    for i in range(n):
        product = 1
        for j in range(i, n):
            product *= int(str_num[j])  # extend window — multiply new digit
            if product in seen_products:
                return False            # duplicate product
            seen_products.add(product)

    return True`,
        motivation: 'You tracked every subsequence product in real time. Most people write three nested loops. Not you.',
      },
    ],
  },

  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    day: 'saturday',
    icon: '🔢',
    intro: 'Sorting converts messy, unstructured input into something where powerful techniques work — binary search becomes possible, two pointers work, duplicates become adjacent. Many problems that look hard become straightforward once you sort first.\n\nPython\'s built-in sorted() uses Timsort (hybrid merge sort + insertion sort) — O(n log n) guaranteed, stable. Always fine to use unless they ask you to implement sorting yourself.',
    complexityTable: {
      headers: ['Algorithm', 'Best', 'Average', 'Worst', 'Space', 'Stable?'],
      rows: [
        ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
        ['Quicksort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'No'],
        ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
        ['Python sorted()', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Yes'],
      ],
    },
    problems: [
      {
        id: 'insertion-sort',
        title: 'Insertion Sort',
        description: 'Mental model: sorting a hand of playing cards. You pick up one card at a time. Each new card, you slide it left past any larger cards until it\'s in the right spot. The left portion is always sorted. Best on small arrays (< 20 elements) or nearly-sorted data — this is why Timsort uses it for small subarrays.',
        code: `def insertionSort(arr):
    for i in range(1, len(arr)):    # index 0 is trivially sorted
        key = arr[i]                # the card we're currently placing
        j = i - 1                   # start comparing left neighbor

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]     # shift this element one right
            j -= 1

        arr[j + 1] = key            # place key in the gap created
    return arr`,
        trace: `[3, 1, 4, 1, 5]:
i=1, key=1: 3>1 shift → [3,3,4,1,5], j=-1 → place → [1,3,4,1,5]
i=2, key=4: 3<4 stop → [1,3,4,1,5] (no change)
i=3, key=1: 4>1,3>1,1 not >1 → place → [1,1,3,4,5]
i=4, key=5: 4<5 stop → [1,1,3,4,5]`,
        motivation: 'You sorted cards by sliding them into position one at a time. That\'s not just an algorithm — that\'s patience and precision. Bowser called. He\'s scared of your ordered subarrays.',
      },
      {
        id: 'quicksort',
        title: 'Quicksort',
        description: 'Pick a pivot. Split into elements smaller (left) and larger/equal (right). Pivot is now in final position. Recurse. Worst case O(n²) when array is already sorted and you always pick first element as pivot — fix by picking random pivot or median-of-three. Duplicates in "right" is correct but can degrade — mention 3-way partitioning in interviews.',
        code: `def quickSort(arr):
    if len(arr) <= 1:
        return arr          # base case: already sorted

    pivot = arr[0]

    left  = [x for x in arr[1:] if x < pivot]      # strictly less
    right = [x for x in arr[1:] if x >= pivot]     # >= pivot (handles duplicates)

    return quickSort(left) + [pivot] + quickSort(right)`,
        motivation: 'Pivot. Partition. Recurse. You know exactly why this works AND exactly when it breaks. Thanos has all the Infinity Stones and still couldn\'t sort faster than you on average.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MONDAY
  // ─────────────────────────────────────────────
  {
    id: 'trees',
    title: 'Trees',
    day: 'monday',
    icon: '🌳',
    intro: 'A tree is a hierarchical structure with a root at the top. A Binary Search Tree (BST) adds an ordering rule: left subtree has only values less than the parent, right subtree has only values greater. This applies at every node recursively.\n\nThis ordering makes BST search O(log n) on a balanced tree — at each node you cut remaining candidates in half.',
    complexityTable: {
      headers: ['Operation', 'Balanced BST', 'Unbalanced (worst)'],
      rows: [
        ['Search', 'O(log n)', 'O(n)'],
        ['Insert', 'O(log n)', 'O(n)'],
        ['Delete', 'O(log n)', 'O(n)'],
      ],
    },
    problems: [
      {
        id: 'bst-insert',
        title: 'Binary Tree Insertion',
        description: 'Insert a value into a BST while maintaining ordering. At each node: if value < current, go left; if value ≥ current, go right. Keep going until you hit None — that\'s where the new node goes. Recursion is natural here because each subtree is itself a BST.',
        code: `class Node:
    def __init__(self, info):
        self.info = info
        self.left = None
        self.right = None

def insert(root, val):
    if root is None:
        return Node(val)            # found the empty slot

    if val < root.info:
        root.left = insert(root.left, val)      # go left
    else:
        root.right = insert(root.right, val)    # go right

    return root`,
        trace: `Insert 5 into: root=8, 8.left=3, 8.right=10
insert(8, 5): 5 < 8 → go left → insert(3, 5)
insert(3, 5): 5 > 3 → go right → insert(None, 5)
insert(None, 5): None → return Node(5)
3.right = Node(5), return 3
8.left = 3 (same), return 8`,
      },
      {
        id: 'traversals',
        title: 'Tree Traversals',
        description: 'Three fundamental ways to visit every node. In-Order (L→Root→R): sorted ascending order, use to verify BST. Pre-Order (Root→L→R): parent before children, use to serialize/copy. Post-Order (L→R→Root): children before parent, use to delete tree or evaluate expressions.',
        code: `def inOrder(root):      # L → Root → R (sorted output)
    if root is None: return
    inOrder(root.left)
    print(root.info)
    inOrder(root.right)

def preOrder(root):     # Root → L → R (visit before children)
    if root is None: return
    print(root.info)
    preOrder(root.left)
    preOrder(root.right)

def postOrder(root):    # L → R → Root (visit after children)
    if root is None: return
    postOrder(root.left)
    postOrder(root.right)
    print(root.info)`,
        motivation: 'In-order. Pre-order. Post-order. You know all three, you know what each one is FOR, and you can implement all from memory. Megatron transforms into a jet and still can\'t do what you just did.',
      },
      {
        id: 'tree-height',
        title: 'Height of a Binary Tree',
        description: 'Height = number of edges on the longest path from root to any leaf. Single node = height 0. Empty tree = -1 (so a leaf returns 1 + max(-1,-1) = 0). Recursive insight: height at any node = 1 + max(height of left, height of right).',
        code: `def height(root):
    if root is None:
        return -1                   # empty tree convention

    left_height  = height(root.left)
    right_height = height(root.right)

    return 1 + max(left_height, right_height)`,
        trace: `Tree: 1 → 2 → 4 (left chain)
height(4): max(-1,-1) = -1 → return 0
height(2): max(0, -1)  = 0  → return 1
height(1): max(1, -1)  = 1  → return 2`,
        motivation: 'You recursively computed the height of an arbitrary binary tree and can explain every line. You could explain it to a five-year-old OR a senior staff engineer. That\'s range. King Kong ain\'t got shit on you.',
      },
    ],
  },

  {
    id: 'heaps',
    title: 'Heaps',
    day: 'monday',
    icon: '⛰️',
    intro: 'A heap is a specialized binary tree stored as an array where a parent-child ordering rule is maintained. Min-heap: every parent ≤ children — minimum is always at root (index 0). Max-heap: every parent ≥ children.\n\nUse when: you need to repeatedly grab the min or max from a changing dataset. Python\'s heapq implements a min-heap. To simulate max-heap, negate values when pushing and popping.',
    complexityTable: {
      headers: ['Operation', 'Heap', 'Sorted Array'],
      rows: [
        ['Get min/max', 'O(1)', 'O(1)'],
        ['Insert', 'O(log n)', 'O(n) shift'],
        ['Delete min/max', 'O(log n)', 'O(n) shift'],
        ['Build from n elements', 'O(n)', 'O(n log n)'],
      ],
    },
    problems: [
      {
        id: 'qheap1',
        title: 'QHeap1 — Lazy Deletion',
        description: 'Process three query types: (1) add value, (2) delete one occurrence, (3) print minimum. Problem: heapq has no efficient arbitrary deletion. Solution: lazy deletion — mark items as deleted in a set instead of removing from heap. When querying minimum, skip over any deleted items at the top. Each element is only physically removed once — when it would actually be returned.',
        code: `import heapq

def qheap1(queries):
    heap = []
    deleted = set()

    for q in queries:
        parts = list(map(int, q.split()))
        q_type = parts[0]

        if q_type == 1:             # add value
            val = parts[1]
            heapq.heappush(heap, val)
            if val in deleted:      # cancel a pending deletion
                deleted.remove(val)

        elif q_type == 2:           # delete (lazy — just mark it)
            deleted.add(parts[1])

        elif q_type == 3:           # print minimum, skip deleted
            while heap[0] in deleted:
                deleted.remove(heap[0])
                heapq.heappop(heap)
            print(heap[0])`,
        motivation: 'Lazy deletion. You don\'t actually delete — you mark it and clean up when you need to. That\'s not a shortcut, that\'s wisdom. You run this heap like you built it yourself. Because now you did.',
      },
    ],
  },

  {
    id: 'tries',
    title: 'Tries (Prefix Trees)',
    day: 'monday',
    icon: '🌲',
    intro: 'A trie (pronounced "try") is a tree where each node represents a single character. A path from root to a marked node spells out a complete word. Nodes are shared — "cat" and "car" share nodes for \'c\' and \'a\'.\n\nThe killer feature: checking whether ANY stored word begins with a given prefix takes O(m) time where m = length of prefix, regardless of how many words are stored.\n\nWhy Pinterest uses Tries: When you type in Pinterest\'s search bar, autocomplete must find all terms starting with what you\'ve typed — one character at a time, in milliseconds, across millions of indexed terms. A trie traverses exactly those paths and no others.',
    problems: [
      {
        id: 'trie-implementation',
        title: 'Full Trie Implementation with Autocomplete',
        description: 'Each TrieNode has a children dict (char → TrieNode) and is_end bool. insert() walks down creating nodes as needed. search() checks if the EXACT word exists (must hit is_end=True). startsWith() checks if the PREFIX exists (doesn\'t need is_end). autocomplete() walks to prefix then DFS-collects all complete words below.',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}      # char → TrieNode
        self.is_end = False     # True if a word ends here

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        """Exact word match — must hit is_end=True"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end      # prefix exists but is it a complete word?

    def startsWith(self, prefix):
        """Any word starting with prefix — don't need is_end"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

    def autocomplete(self, prefix):
        """Return all words starting with prefix"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        results = []
        self._dfs(node, prefix, results)
        return results

    def _dfs(self, node, current_word, results):
        if node.is_end:
            results.append(current_word)
        for char, child in node.children.items():
            self._dfs(child, current_word + char, results)`,
        trace: `insert("cat"), insert("car"), autocomplete("ca"):

insert("cat"): root→c(new)→a(new)→t(new), t.is_end=True
insert("car"): root→c(exists)→a(exists)→r(new), r.is_end=True

autocomplete("ca"):
  Walk: root→c→a ✓
  DFS from a-node:
    → t: is_end=True → append "cat"
    → r: is_end=True → append "car"
  return ["cat", "car"] ✓

search("ca") → False  (a.is_end is False)
startsWith("ca") → True (path exists)`,
        motivation: 'You just built autocomplete from scratch. The exact feature that runs every time someone types in Pinterest\'s search bar. You built that. Thragg is pretty weak compared to you.',
      },
    ],
    complexityTable: {
      headers: ['Operation', 'Time', 'Notes'],
      rows: [
        ['insert(word length m)', 'O(m)', ''],
        ['search(word length m)', 'O(m)', ''],
        ['startsWith(prefix length m)', 'O(m)', ''],
        ['autocomplete(prefix)', 'O(m + k)', 'k = total chars in all results'],
      ],
    },
  },

  // ─────────────────────────────────────────────
  // TUESDAY
  // ─────────────────────────────────────────────
  {
    id: 'graphs',
    title: 'Graphs (BFS & DFS)',
    day: 'tuesday',
    icon: '🕸️',
    intro: 'A graph is a set of nodes connected by edges. Unlike trees, graphs can have cycles, multiple connected components, directed edges, and weighted edges.\n\nPinterest\'s product IS a graph: Nodes = Pinners, Boards, Pins. Edges = follows, saves, links. Graph traversal powers recommendations, connection discovery, and feed ranking.',
    complexityTable: {
      headers: ['', 'BFS', 'DFS'],
      rows: [
        ['Data structure', 'Queue (FIFO)', 'Stack or recursion'],
        ['Traversal order', 'Layer by layer', 'Deep along one path'],
        ['Use for', 'Shortest path (unweighted)', 'Connectivity, cycle detection, all paths'],
        ['Complexity', 'O(V + E)', 'O(V + E)'],
      ],
    },
    problems: [
      {
        id: 'bfs',
        title: 'BFS — Breadth First Search',
        description: 'Mental model: a wave spreading outward. You visit every node 1 hop away before any node 2 hops away. This guarantees the first time you reach any node, it\'s via the shortest path. Mark visited BEFORE pushing to queue — if you mark after popping, the same node can be enqueued multiple times.',
        code: `from collections import deque, defaultdict

def bfs(n, edges, start):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    distances = {i: -1 for i in range(1, n + 1)}   # -1 = unvisited
    distances[start] = 0
    queue = deque([start])

    while queue:
        curr = queue.popleft()              # FIFO — take from front

        for neighbor in graph[curr]:
            if distances[neighbor] == -1:   # unvisited
                distances[neighbor] = distances[curr] + 1
                queue.append(neighbor)      # mark BEFORE enqueuing

    return distances`,
        motivation: 'Layer by layer. Shortest path guaranteed. You know WHY BFS finds shortest paths, not just THAT it does. Xerxes had a whole army — you just need a queue and a visited set.',
      },
      {
        id: 'snakes-ladders',
        title: 'Snakes and Ladders',
        description: 'Minimum dice rolls to reach square 100 on a board with snakes and ladders (teleporters). Each square = a node. Dice roll = edges to next 1-6 squares. Snakes and ladders = redirections applied after landing. Minimum moves = shortest path in unweighted graph → BFS.',
        code: `from collections import deque

def quickestWayUp(ladders, snakes):
    shortcuts = {}
    for start, end in ladders + snakes:
        shortcuts[start] = end      # landing here → teleport to end

    queue = deque([(1, 0)])         # (square, moves taken)
    visited = set([1])

    while queue:
        curr, moves = queue.popleft()
        if curr == 100:
            return moves

        for roll in range(1, 7):    # dice 1-6
            next_sq = curr + roll
            if next_sq <= 100:
                if next_sq in shortcuts:
                    next_sq = shortcuts[next_sq]   # apply teleport
                if next_sq not in visited:
                    visited.add(next_sq)
                    queue.append((next_sq, moves + 1))

    return -1`,
      },
      {
        id: 'dfs',
        title: 'DFS — Depth First Search',
        description: 'Mental model: exploring a maze by following one path to the end before backtracking. Swap BFS\'s queue for a stack and you have DFS — everything else is the same structure. Recursive DFS uses the call stack as memory. Iterative DFS uses an explicit stack (avoids recursion limit).',
        code: `# Recursive DFS
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited

# Iterative DFS — same result, no recursion limit
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()          # LIFO — take from top
        if node not in visited:
            visited.add(node)
            print(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    stack.append(neighbor)
    return visited`,
        motivation: 'Recursive or iterative, you can write DFS both ways and explain WHY they\'re different. That\'s not trivia — that\'s mastery. You handle graph traversal like it personally owes you a job offer.',
      },
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        description: 'Given a 2D grid of "1" (land) and "0" (water), count connected groups of land. When you find a "1", DFS into all 4 neighbors and mark the entire connected island visited. Count how many times you start a fresh DFS — each start is one island. Mark visited in-place (grid[r][c] = "#") to avoid an extra set.',
        code: `def numIslands(grid):
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return                      # out of bounds, water, or visited
        grid[r][c] = '#'               # mark visited in-place
        dfs(r+1, c); dfs(r-1, c)      # down, up
        dfs(r, c+1); dfs(r, c-1)      # right, left

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)              # DFS marks entire island
                count += 1

    return count`,
        trace: `Grid:
1 1 0
0 1 0
0 0 1

(0,0)='1' → DFS marks (0,0),(0,1),(1,1) → count=1
(2,2)='1' → DFS marks (2,2) → count=2
Answer: 2 islands ✓`,
        motivation: 'You found every island on that grid and marked every connected cell in one DFS sweep. You\'d fuck Godzilla up — then calmly count the islands he left behind.',
      },
    ],
  },

  {
    id: 'recursion-memo',
    title: 'Recursion & Memoization',
    day: 'tuesday',
    icon: '🔄',
    intro: 'Recursion: a function solves a problem by calling itself with a smaller version. Every recursive function needs: (1) a base case — the smallest version you can answer directly without recursing, and (2) a recursive case — reduce to a smaller version and call yourself.\n\nMemoization: cache results you\'ve already computed. Before computing, check the cache. After computing, store it. Converts O(2ⁿ) to O(n).',
    problems: [
      {
        id: 'fibonacci-naive',
        title: 'Fibonacci — Why Naive Recursion Is Broken',
        description: 'The naive recursive Fibonacci is O(2ⁿ). For n=40, that\'s ~1 billion calls. fibonacci(3) is computed twice, fibonacci(2) computed 3 times, etc. — pure wasted repeated work. This is called "overlapping subproblems" and it\'s the signal to use memoization.',
        code: `# BROKEN for large n — O(2ⁿ)
def fibonacci_naive(n):
    if n == 0: return 0
    if n == 1: return 1
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)

# The call tree for fib(5):
# fib(5)
# ├── fib(4)
# │   ├── fib(3)        ← computed here
# │   └── fib(2)
# └── fib(3)            ← computed AGAIN (wasted)
#     ├── fib(2)        ← computed a third time
#     └── fib(1)`,
      },
      {
        id: 'fibonacci-memo',
        title: 'Fibonacci — Fixed with Memoization',
        description: 'Store results you\'ve already computed. Each fibonacci(k) is now computed exactly once — every subsequent call hits the cache in O(1). Time drops from O(2ⁿ) to O(n). Space is O(n) for the cache.',
        code: `# Top-down memoization — O(n) time, O(n) space
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]          # already computed — return instantly

    if n == 0: return 0
    if n == 1: return 1

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Python's built-in memoization decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)`,
        motivation: 'You took O(2ⁿ) — literally exponential — down to O(n) with a dictionary. You didn\'t just fix the code. You understood WHY it was broken first. Goku went Super Saiyan and you were already there.',
      },
    ],
  },

  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    day: 'tuesday',
    icon: '⚡',
    intro: 'Dynamic programming (DP) is an optimization technique for problems with two properties: (1) Overlapping subproblems — the same sub-calculation appears multiple times. (2) Optimal substructure — the best solution to the big problem can be built from best solutions to subproblems.\n\nTwo approaches: Top-down (memoization) — start big, recurse, cache. Bottom-up (tabulation) — start small, fill a table, build up. Bottom-up is usually faster (no recursion overhead) and avoids stack overflow.',
    problems: [
      {
        id: 'fibonacci-dp',
        title: 'Fibonacci — Bottom-Up DP',
        description: 'Instead of recursing down and caching, build up from the smallest subproblems. dp[0]=0, dp[1]=1, then fill forward. Each cell uses previously computed values. Space-optimized version only needs the last two values — O(1) space.',
        code: `# Bottom-up tabulation — O(n) time, O(n) space
def fibonacci_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]  # build on previously computed values
    return dp[n]

# Space-optimized — O(n) time, O(1) space
def fibonacci_optimal(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr  = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
      },
      {
        id: 'coin-change',
        title: 'Coin Change',
        description: 'Given coin denominations and a target amount, return minimum coins needed. Return -1 if impossible. Recurrence: dp[i] = min(dp[i - coin] + 1) for each coin ≤ i. Start: dp[0]=0, all others=infinity. Build table from amount 0 up to target.',
        code: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0   # 0 coins to make amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:                           # can we use this coin?
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,
        trace: `coins=[1,3,4], amount=6
dp = [0, ∞, ∞, ∞, ∞, ∞, ∞]

i=1: coin=1 → dp[1]=min(∞,dp[0]+1)=1
i=2: coin=1 → dp[2]=min(∞,dp[1]+1)=2
i=3: coin=1→3, coin=3→dp[0]+1=1 → dp[3]=1
i=4: coin=1→2, coin=3→2, coin=4→dp[0]+1=1 → dp[4]=1
i=5: coin=1→2, coin=3→dp[2]+1=3, coin=4→dp[1]+1=2 → dp[5]=2
i=6: coin=1→3, coin=3→dp[3]+1=2, coin=4→dp[2]+1=3 → dp[6]=2

Answer: 2 (3+3=6) ✓`,
        motivation: 'You filled that DP table by hand, row by row, and can explain every cell. That\'s not guessing — that\'s understanding the recurrence at a mechanical level. You just did what most bootcamp grads can\'t do in a week.',
      },
      {
        id: 'lcs',
        title: 'Longest Common Subsequence',
        description: 'Find length of the longest common subsequence of two strings — characters appearing in both in the same relative order, not necessarily contiguous. "abcde" and "ace" → LCS="ace" → length 3. Recurrence: if chars match, dp[i][j] = dp[i-1][j-1] + 1. If not, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
        code: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    # dp[i][j] = LCS length of text1[:i] and text2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1        # chars match — extend
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # take better option

    return dp[m][n]`,
        trace: `text1="abc", text2="ac"
     ""  a   c
""    0   0   0
a     0   1   1
b     0   1   1
c     0   1   2
LCS = 2 ("ac") ✓`,
        motivation: 'Two strings. One table. Darth Vader is out there breathing heavily with anxiety watching you fill this DP grid.',
      },
    ],
  },
];

export const schedule = [
  {
    day: 'friday',
    date: 'Friday, May 30',
    emoji: '🔥',
    sessions: [
      {
        time: 'Morning',
        title: 'Arrays, Two Pointers, Sliding Window',
        tasks: [
          'Read Topic 1 fully. Trace every example on paper.',
          'Re-implement designerPdfViewer and rotateLeft from memory.',
          'Implement two-sum (sorted) and explain out loud WHY it works.',
          'Implement max sum sliding window — trace step by step.',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Linked Lists',
        tasks: [
          'Draw a 4-node linked list on paper. Label each node\'s data and next.',
          'Implement insertNodeAtPosition — draw the pointer wiring before writing code.',
          'Implement has_cycle — trace on a 4-node list where the last node loops to node 2.',
        ],
      },
      {
        time: 'Evening',
        title: 'Review Pass',
        tasks: [
          'Say the complexity of every operation out loud: index access, slicing, append, insert, linked list search.',
          'You covered ground today that some people spend a whole week on.',
        ],
      },
    ],
    motivation: 'Friday done. Arrays, Two Pointers, Sliding Window, Linked Lists. You covered ground today that some people spend a whole week on. That\'s not luck — that\'s you.',
  },
  {
    day: 'saturday',
    date: 'Saturday, May 31',
    emoji: '💪',
    sessions: [
      {
        time: 'Morning',
        title: 'Stacks & Queues',
        tasks: [
          'Implement isBalanced from memory. Trace "({[]})" and "({)}" manually.',
          'Implement MyQueue with two stacks. Trace 3 enqueues and 2 dequeues.',
          'Explain out loud why lazy transfer gives amortized O(1).',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Hash Maps',
        tasks: [
          'Implement icecreamParlor. Say "complement trick" out loud as you explain it.',
          'Implement optimized isColorful with the extended-product inner loop.',
        ],
      },
      {
        time: 'Evening',
        title: 'Sorting',
        tasks: [
          'Implement insertionSort. Trace [3,1,4,1,5] fully on paper.',
          'Implement quickSort. Pick an array, trace one partition level by hand.',
          'Explain out loud when each algorithm degrades to worst case.',
        ],
      },
    ],
    motivation: 'Saturday done. Stacks, Queues, Hash Maps, Sorting. The Mountain from Game of Thrones would tap out watching your study session.',
  },
  {
    day: 'monday',
    date: 'Monday, June 2',
    emoji: '🧠',
    sessions: [
      {
        time: 'Morning',
        title: 'Trees',
        tasks: [
          'Draw a BST with 7 nodes on paper before writing any code.',
          'Implement insert and height from memory.',
          'Implement all three traversals (in-order, pre-order, post-order) from memory.',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Heaps & Tries',
        tasks: [
          'Implement qheap1. Explain lazy deletion out loud: "I mark it deleted now and clean up when I need the minimum."',
          'Implement the full Trie class — all four methods.',
          'Trace insert("cat"), insert("car"), search("cat"), startsWith("ca"), autocomplete("ca").',
        ],
      },
      {
        time: 'Evening',
        title: 'Pinterest Context Pass',
        tasks: [
          'For each topic, connect it to Pinterest: graph traversal, prefix search, priority feeds.',
          'Say: "When I see autocomplete, I think Trie. When I see a social graph, I think BFS or DFS."',
        ],
      },
    ],
    motivation: 'Monday done. Trees, Heaps, Tries. You built autocomplete. You understand priority queues mechanically. Thragg is out there conquering planets and he couldn\'t touch you right now.',
  },
  {
    day: 'tuesday',
    date: 'Tuesday, June 3',
    emoji: '🚀',
    sessions: [
      {
        time: 'Morning',
        title: 'BFS & DFS',
        tasks: [
          'Implement BFS. Draw the queue state at each step on a 5-node graph.',
          'Implement DFS recursive and iterative. Explain when you\'d prefer each.',
          'Implement numIslands. Trace the 3×3 grid example fully on paper.',
        ],
      },
      {
        time: 'Afternoon',
        title: 'Recursion & Dynamic Programming',
        tasks: [
          'Implement fibonacci_naive. Explain why it\'s O(2ⁿ) — draw the call tree.',
          'Implement fibonacci_memo. Explain what caching does to the call tree.',
          'Implement coinChange bottom-up. Trace with coins=[1,3,4], amount=6.',
          'Implement longestCommonSubsequence. Fill the table on paper for "abc" and "ac".',
        ],
      },
      {
        time: 'Evening',
        title: 'Full Dry Run',
        tasks: [
          'For each of the topics, pick one problem. Set a 20-minute timer.',
          'When done: trace your code manually, state complexity, connect it to Pinterest\'s system.',
          'Interview is tomorrow. You are not going in hoping — you are going in KNOWING.',
        ],
      },
    ],
    motivation: 'Tuesday done. That\'s the whole thing. 13 topics in 4 days. You are a bad bitch. You know how to solve problems. Go get this job. It was already yours.',
  },
];

export const interviewChecklist = [
  'Repeat the problem in your own words to confirm you understood it.',
  'State your approach and its time + space complexity BEFORE you start coding.',
  'Handle edge cases up front: empty input, single element, duplicates, negatives.',
  'Write clean code with variable names that say what they are.',
  'Trace through a normal example AND one edge case after writing.',
  'State complexity when done: "This is O(n) time and O(n) space because..."',
];

export const pinterestContext = [
  { pattern: 'Shortest path, level-by-level', structure: 'BFS', pinterest: 'Degree of separation between Pinners' },
  { pattern: 'Connected components, all paths', structure: 'DFS', pinterest: 'Finding all boards reachable from a Pin' },
  { pattern: 'Prefix matching, autocomplete', structure: 'Trie', pinterest: 'Search bar, tag suggestions' },
  { pattern: 'Repeated min/max from changing data', structure: 'Heap', pinterest: 'Real-time content feed ranking' },
  { pattern: 'Pair/subarray summing to target', structure: 'Two Pointers or Hash Map', pinterest: '' },
  { pattern: 'Longest/shortest contiguous subarray', structure: 'Sliding Window', pinterest: '' },
  { pattern: 'Overlapping subproblems', structure: 'DP (memoization or tabulation)', pinterest: '' },
];
