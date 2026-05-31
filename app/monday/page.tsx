import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import { ProgressBar } from "@/components/ProgressTracker";

const TOPIC_IDS = ["trees", "heaps", "tries"];

const topics = [
  {
    number: 9,
    title: "Trees",
    icon: "🌳",
    complexity: { time: "O(log n) balanced, O(n) worst", space: "O(h)" },
    whenToUse: "Hierarchical data, sorted lookup faster than linear scan, prefix traversal",
    intuition: `A Binary Search Tree has one rule at every single node: everything in the left subtree is smaller, everything in the right subtree is larger. This applies recursively all the way down. At each node you eliminate half the remaining candidates — that's what makes search O(log n).

The three traversals:
- In-order (L → Root → R): produces nodes in sorted order. Use to read a BST ascending.
- Pre-order (Root → L → R): parent before children. Use to copy or serialize a tree.
- Post-order (L → R → Root): children before parent. Use to delete a tree.

Height at any node = 1 + whichever child is taller. Empty node = -1 (so a single leaf = 1 + max(-1, -1) = 0).`,
    realWorld: {
      title: "Pinterest Category Hierarchy",
      description: `Pinterest's category hierarchy. Home & Garden → Living Room → Seating → Sofas → Modern Sofas. That's a tree. Every search in Pinterest's category taxonomy traverses this tree. BST-ordered categories mean autocomplete finds the right category in O(log n) steps.

File system. Your Downloads folder is a node. Inside it are files (leaves) and subfolders (nodes with their own children). find . -name "*.py" does a DFS through the file system tree.

In-order traversal real world: reading a dictionary. A dictionary is a BST ordered alphabetically. In-order traversal reads every entry in alphabetical order.`,
    },
    code: `def insert(root, val):
    if root is None:
        return Node(val)
    if val < root.info:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def height(root):
    if root is None:
        return -1
    return 1 + max(height(root.left), height(root.right))

def inOrder(root):
    if root is None:
        return
    inOrder(root.left)
    print(root.info)
    inOrder(root.right)`,
    quotes: [
      "The BST rule is one of the most powerful invariants in computer science. At every node, you eliminate half the remaining possibilities. Alexander Hamilton said 'I am not throwing away my shot.' At every BST node, you're not wasting a comparison — you're eliminating half the tree.",
      "You know all three traversals AND what each one is FOR. Most people can name them. You can deploy them. There's a difference between knowing the names and knowing which to reach for. You know both.",
      "In-order. Pre-order. Post-order. You know all three, you know what each one is FOR, and you can implement all of them from memory. Megatron transforms into a jet and he still can't do what you just did.",
    ],
  },
  {
    number: 10,
    title: "Heaps",
    icon: "⛰️",
    complexity: { time: "Get min O(1), Insert O(log n)", space: "O(n)" },
    whenToUse: "Repeatedly need the current min or max from a changing dataset",
    intuition: `A heap is a binary tree with one rule: a parent is always smaller than both its children (min-heap). The minimum is always at the root — always, immediately, O(1). Insert: O(log n). Remove min: O(log n).

Python's heapq is always a min-heap. To simulate a max-heap: negate values going in, negate again coming out.

Lazy deletion (the key trick): heapq has no efficient "remove arbitrary element." Instead of removing, put the element in a "deleted" set. When you query for the minimum, peek at the top — if it's in the deleted set, pop it and keep peeking. Clean up only when you need the answer.`,
    realWorld: {
      title: "ER Triage & Pinterest Feed Ranking",
      description: `Emergency room triage. Patients arrive in random order but a chest pain patient gets seen before a sprained ankle regardless of arrival time. The ER maintains a priority queue (heap) — highest severity always at the front. O(1) access to the most critical patient.

Pinterest's home feed ranking. Your feed is ranked by predicted engagement score. Pinterest maintains a heap of candidate pins ordered by score. When your feed loads, it pulls the top-K pins. New pins are constantly inserted, old pins removed. The heap guarantees the highest-ranked content is always instantly accessible.

Lazy deletion real world: a hospital's cancelled appointment system. Cancelled appointments are marked in a side list, not immediately removed. When a new slot is needed, scan from the earliest slot — skipping any marked cancelled. Clean up on demand.`,
    },
    code: `import heapq

def qheap1(queries):
    heap = []
    deleted = set()

    for q in queries:
        parts = list(map(int, q.split()))
        q_type = parts[0]

        if q_type == 1:
            val = parts[1]
            heapq.heappush(heap, val)
            if val in deleted:
                deleted.remove(val)
        elif q_type == 2:
            val = parts[1]
            deleted.add(val)
        elif q_type == 3:
            while heap[0] in deleted:
                deleted.remove(heap[0])
                heapq.heappop(heap)
            print(heap[0])`,
    quotes: [
      "The heap runs Pinterest's feed. Every time someone pulls up their home feed and the most relevant pins appear instantly, that's a heap at work. You didn't just study a data structure — you studied the engine behind the product you're interviewing for.",
      "Lazy deletion is wisdom disguised as an algorithm. You don't clean up everything when a change happens. You clean up when someone actually needs the answer. Tyrion Lannister said 'I drink and I know things.' You know when to clean the heap and when to leave it alone.",
      "You run this heap like you built it yourself. Because now you did.",
    ],
  },
  {
    number: 11,
    title: "Tries",
    icon: "🌐",
    complexity: { time: "Insert/Search/StartsWith O(m)", space: "O(ALPHABET_SIZE × m × n)" },
    whenToUse: "Prefix matching, autocomplete, spell checking",
    intuition: `A trie is a tree where each level represents one character of a string. Words sharing a prefix share nodes — "cat" and "car" both use the same c and a nodes.

The killer feature: checking whether ANY stored word begins with a prefix takes O(m) time where m = prefix length, regardless of how many words are stored.

startsWith("cat") → True if ANY word starts with "cat" (cat, cats, catnap all match).
search("cat") → True ONLY if the exact word "cat" was inserted (is_end must be True at that node).`,
    realWorld: {
      title: "Pinterest Search Bar",
      description: `Pinterest's search bar — exactly this. The moment you type "b", Pinterest traverses to the b node and finds every indexed word starting with b. Type "bo" → b → o. Each character is O(1). This is how autocomplete works in real time for hundreds of millions of users.

Your phone's contact search. Type "Jar" and it instantly shows Jared, Jarrod, Jaron. Your phone traversed to J → a → r and returned everything in that subtree. That's autocomplete("Jar").

Spell checker. When Word underlines "teh", it checks search("teh") against a trie of valid English words. search("teh") returns False. search("the") returns True.`,
    },
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

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
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

    def autocomplete(self, prefix):
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
    quotes: [
      "You just built autocomplete from scratch. The exact feature that runs every time someone types in Pinterest's search bar. You built that. You understand every node, every path, every is_end flag.",
      "Ichigo unlocked Bankai — a power that took most Soul Reapers decades to achieve — in three days. You built autocomplete in one study session. Same timeline. Same energy. Different domain. Totally valid comparison.",
      "The trie is efficient because it shares structure. Cat and car don't store two separate c's. They share. This is the engineering principle of reuse at its most elegant. Don't duplicate work. Share what's common. This is how great codebases are maintained.",
    ],
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

      {/* Day header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold dark:text-white text-gray-900 mb-2">
          Monday <span className="text-[#E60023]">—</span> Advanced Structures
        </h1>
        <p className="text-lg text-[#E60023] font-semibold mb-4">June 2</p>
        <div className="glass-card rounded-2xl p-5">
          <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed">
            Today you cover: <strong className="dark:text-white text-gray-900">Trees</strong>, <strong className="dark:text-white text-gray-900">Heaps</strong>, and <strong className="dark:text-white text-gray-900">Tries</strong>. These are the structures Pinterest actually runs on — the feed ranking engine, the search autocomplete, and the category taxonomy are all built on exactly what you&apos;re learning today.
          </p>
        </div>
      </div>

      {/* Progress tracker */}
      <ProgressBar topicIds={TOPIC_IDS} label="Monday Progress" />

      {/* Topic cards */}
      {topics.map((topic) => (
        <TopicCard key={topic.number} {...topic} />
      ))}

      {/* Bottom nav */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t dark:border-white/10 border-gray-200">
        <Link
          href="/sunday"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-300 text-gray-600 hover:text-[#E60023] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Sunday: Stacks & Hash Maps
        </Link>
        <Link
          href="/tuesday"
          className="flex items-center gap-2 text-sm font-medium text-[#E60023] hover:text-[#AD081B] transition-colors"
        >
          Tuesday: Graphs, DP, Recursion →
        </Link>
      </div>
    </div>
  );
}
