"use client";

import { useState } from "react";

interface LeetCodeProblem {
  number: number;
  title: string;
  difficulty: string;
  slug: string;
}

interface VideoResource {
  id: string;
  title: string;
  channel: string;
}

interface OriginalProblem {
  name: string;
  statement: string;
  example?: string;
}

interface EdgeCase {
  input: string;
  expected: string;
  why: string;
}

interface TopicCardProps {
  number: number;
  title: string;
  icon: string;
  complexity: { time: string; space: string };
  whenToUse: string;
  intuition: string;
  realWorld: { title: string; description: string };
  problems?: OriginalProblem[];
  prepQuestions?: string[];
  code: string;
  trace?: string;
  edgeCases?: EdgeCase[];
  quotes: string[];
  video?: VideoResource;
  leetcode?: LeetCodeProblem[];
}

const DIFF_COLORS: Record<string, string> = {
  Easy:   "bg-green-500/20 text-green-400 border border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Hard:   "bg-red-500/20 text-[#E60023] border border-red-500/30",
};

function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full rounded-xl overflow-hidden group block"
      aria-label={`Play: ${title}`}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        className="w-full object-cover aspect-video"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-2">
        {/* Play button */}
        <div className="w-14 h-14 rounded-full bg-[#E60023] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span className="text-white text-xs font-medium px-3 text-center drop-shadow line-clamp-2 max-w-xs">
          {title}
        </span>
      </div>
    </button>
  );
}

function syntaxHighlight(code: string): string {
  const keywords = ["def", "class", "return", "import", "from", "elif", "else", "if", "while", "for", "in", "not", "and", "or", "True", "False", "None", "pass", "break", "continue", "with", "as", "try", "except", "raise", "lambda"];
  const builtins = ["len", "range", "print", "max", "min", "sum", "list", "dict", "set", "int", "str", "float", "bool", "type", "enumerate", "zip", "map", "filter", "sorted", "reversed", "append", "pop", "push"];

  let result = "";
  const lines = code.split("\n");

  for (const line of lines) {
    let processedLine = "";
    let i = 0;
    const chars = line;

    // Check for comment line
    const trimmed = chars.trimStart();
    if (trimmed.startsWith("#")) {
      const indent = chars.length - trimmed.length;
      result += " ".repeat(indent) + `<span class="kw-comment">${escapeHtml(chars.trimStart())}</span>\n`;
      continue;
    }

    while (i < chars.length) {
      // Check for inline comment
      if (chars[i] === "#") {
        processedLine += `<span class="kw-comment">${escapeHtml(chars.slice(i))}</span>`;
        break;
      }

      // Check for string
      if (chars[i] === '"' || chars[i] === "'") {
        const quote = chars[i];
        let j = i + 1;
        // Handle triple quotes
        if (chars.slice(i, i + 3) === quote.repeat(3)) {
          j = i + 3;
          while (j < chars.length && chars.slice(j, j + 3) !== quote.repeat(3)) j++;
          j += 3;
        } else {
          while (j < chars.length && chars[j] !== quote) j++;
          j++;
        }
        processedLine += `<span class="kw-str">${escapeHtml(chars.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Check for number
      if (/[0-9]/.test(chars[i]) && (i === 0 || /[\s,(=\[{+\-*/<>!]/.test(chars[i - 1]))) {
        let j = i;
        while (j < chars.length && /[0-9.]/.test(chars[j])) j++;
        processedLine += `<span class="kw-num">${escapeHtml(chars.slice(i, j))}</span>`;
        i = j;
        continue;
      }

      // Check for keyword or identifier
      if (/[a-zA-Z_]/.test(chars[i])) {
        let j = i;
        while (j < chars.length && /[a-zA-Z0-9_]/.test(chars[j])) j++;
        const word = chars.slice(i, j);
        if (keywords.includes(word)) {
          processedLine += `<span class="kw-def">${word}</span>`;
        } else if (builtins.includes(word)) {
          processedLine += `<span class="kw-builtin">${word}</span>`;
        } else {
          processedLine += escapeHtml(word);
        }
        i = j;
        continue;
      }

      processedLine += escapeHtml(chars[i]);
      i++;
    }

    result += processedLine + "\n";
  }

  return result;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-medium transition-all duration-200 ${
        copied
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-white/10 text-gray-300 border border-white/20 hover:bg-[#E60023]/20 hover:text-[#E60023] hover:border-[#E60023]/30"
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function TopicCard({
  number,
  title,
  icon,
  complexity,
  whenToUse,
  intuition,
  realWorld,
  problems,
  prepQuestions,
  code,
  trace,
  edgeCases,
  quotes,
  video,
  leetcode,
}: TopicCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-6 transition-all duration-300">
      {/* Header — always visible, clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
        aria-expanded={expanded}
      >
        <div className="pinterest-gradient p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            {/* Left: number + icon + title + badges */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
              {/* Number badge */}
              <span className="bg-white/20 text-white font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {number}
              </span>
              <div className="min-w-0 flex-1">
                {/* Icon + Title row */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <span className="font-bold text-white text-sm sm:text-base leading-tight">{title}</span>
                </div>
                {/* Complexity badges — always wrap naturally */}
                <div className="flex gap-1.5 flex-wrap">
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-mono">
                    ⏱ {complexity.time}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-mono">
                    💾 {complexity.space}
                  </span>
                </div>
              </div>
            </div>
            {/* Expand/collapse chevron */}
            <span
              className={`text-white/70 transition-transform duration-300 flex-shrink-0 mt-1 ${expanded ? "rotate-180" : ""}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={`expand-section ${expanded ? "expanded" : "collapsed"}`}
      >
        <div className="p-4 sm:p-6 space-y-5">
          {/* When to use */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E60023] block mb-1.5">
              When to use
            </span>
            <p className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed border-l-2 border-[#E60023] pl-3">
              {whenToUse}
            </p>
          </div>

          {/* Intuition */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-2">
              Plain English Explanation
            </h4>
            <div className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed space-y-2">
              {intuition.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Real World Example */}
          <div className="rounded-xl p-3 sm:p-4 dark:bg-white/5 bg-[#E60023]/5 border dark:border-white/10 border-[#E60023]/10">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base flex-shrink-0">🌍</span>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] leading-tight">
                Real-World Example — {realWorld.title}
              </h4>
            </div>
            <div className="dark:text-gray-100 text-gray-700 text-sm leading-relaxed space-y-2">
              {realWorld.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Original Problems */}
          {problems && problems.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-3 flex items-center gap-1.5">
                <span>📋</span> The Problems
              </h4>
              <div className="space-y-3">
                {problems.map((p, i) => (
                  <div key={i} className="rounded-xl p-3 sm:p-4 dark:bg-white/5 bg-white/80 border dark:border-white/10 border-gray-200">
                    <p className="text-sm font-bold dark:text-white text-gray-900 mb-1.5">{p.name}</p>
                    <p className="text-sm dark:text-gray-100 text-gray-700 leading-relaxed mb-2">{p.statement}</p>
                    {p.example && (
                      <div className="rounded-lg dark:bg-black/40 bg-gray-100 border dark:border-white/10 border-gray-200 overflow-x-auto">
                        <pre className="p-2.5 text-xs font-mono dark:text-green-300 text-green-700 leading-relaxed">{p.example}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prep Questions */}
          {prepQuestions && prepQuestions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-3 flex items-center gap-1.5">
                <span>🎤</span> Ask Before You Code
              </h4>
              <ul className="space-y-2">
                {prepQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm dark:text-gray-100 text-gray-700">
                    <span className="text-[#E60023] font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Block */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-2">
              Code
            </h4>
            <div className="relative">
              <div className="rounded-xl dark:bg-black/60 bg-gray-900 border dark:border-white/10 border-gray-700 overflow-x-auto">
                <pre
                  className="p-3 sm:p-4 text-xs font-mono text-gray-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(code) }}
                />
              </div>
              <CopyButton text={code} />
            </div>
          </div>

          {/* Trace */}
          {trace && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-2">
                Trace
              </h4>
              <div className="rounded-xl dark:bg-black/40 bg-gray-800/90 border dark:border-white/10 border-gray-600 overflow-x-auto">
                <pre className="p-3 sm:p-4 text-xs font-mono text-green-300 leading-relaxed">
                  {trace}
                </pre>
              </div>
            </div>
          )}

          {/* Edge Cases */}
          {edgeCases && edgeCases.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-3 flex items-center gap-1.5">
                <span>🧪</span> Edge Cases to Test
              </h4>
              <div className="space-y-2">
                {edgeCases.map((ec, i) => (
                  <div key={i} className="rounded-xl p-3 dark:bg-white/5 bg-white/70 border dark:border-white/10 border-gray-200">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <code className="text-xs font-mono text-[#E60023] bg-[#E60023]/10 px-2 py-0.5 rounded">{ec.input}</code>
                      <span className="text-xs dark:text-gray-400 text-gray-500">→</span>
                      <code className="text-xs font-mono dark:text-green-400 text-green-700 bg-green-500/10 px-2 py-0.5 rounded">{ec.expected}</code>
                    </div>
                    <p className="text-xs dark:text-gray-300 text-gray-600 italic">{ec.why}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video */}
          {video && expanded && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-2 flex items-center gap-1.5">
                <span>▶</span> Watch
              </h4>
              <YouTubeEmbed id={video.id} title={video.title} />
              <p className="text-xs dark:text-gray-400 text-gray-500 mt-1.5 text-right">
                {video.channel}
              </p>
            </div>
          )}

          {/* LeetCode Problems */}
          {leetcode && leetcode.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E60023] mb-2 flex items-center gap-1.5">
                <span>🟧</span> Practice on LeetCode
              </h4>
              <div className="flex flex-col gap-2">
                {leetcode.map((p) => (
                  <a
                    key={p.number}
                    href={`https://leetcode.com/problems/${p.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-200 hover:border-[#E60023]/40 transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-mono dark:text-gray-400 text-gray-500 flex-shrink-0">
                        #{p.number}
                      </span>
                      <span className="text-sm font-medium dark:text-white text-gray-800 truncate group-hover:text-[#E60023] transition-colors">
                        {p.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[p.difficulty]}`}>
                        {p.difficulty}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dark:text-gray-500 text-gray-400 group-hover:text-[#E60023]">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quotes */}
          <div className="space-y-3">
            {quotes.map((quote, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-4 border-l-4 border-[#E60023]"
              >
                <p className="dark:text-gray-100 text-gray-700 text-sm italic font-medium leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
