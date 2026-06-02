import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TopicSection from './components/TopicSection';
import ScheduleSection from './components/ScheduleSection';
import ComplexityTable from './components/ComplexityTable';
import MotivationQuote from './components/MotivationQuote';
import { topics, days, interviewChecklist, pinterestContext } from './data/content';

const FILTER_ALL = 'all';

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dsa-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useState(topics[0]?.id ?? '');
  const [dayFilter, setDayFilter] = useState(FILTER_ALL);
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dsa-completed') ?? '[]');
      return new Set(saved);
    } catch {
      return new Set();
    }
  });

  const observerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('dsa-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    localStorage.setItem('dsa-completed', JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    const allIds = [...topics.map((t) => t.id), 'schedule', 'checklist', 'pinterest-context'];
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [dayFilter]);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  const handleToggleComplete = (id) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredTopics =
    dayFilter === FILTER_ALL ? topics : topics.filter((t) => t.day === dayFilter);

  return (
    <>
      <Header
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <div className="layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeId={activeId}
          onNavigate={handleNavigate}
          completedTopics={completedTopics}
          onToggleComplete={handleToggleComplete}
        />

        <main className="main-content">
          <div className="content-inner">
            <div className="hero">
              <h1>The Complete Technical Interview Blueprint</h1>
              <p>
                Mastering Data Structures &amp; Algorithms in Python — built specifically for the
                Pinterest Software Engineer interview.
              </p>
              <div className="hero-meta">
                <span className="hero-badge">🎯 Target: Pinterest SWE</span>
                <span className="hero-badge">🐍 Python 3</span>
                <span className="hero-badge">📅 June 2 – June 6</span>
                <span className="hero-badge">13 Topics</span>
              </div>
            </div>

            <MotivationQuote text="You are walking into this interview knowing exactly what you are doing. Every pattern here is a tool you own. This guide is just the arena — you already own everything in it." />

            <div style={{ height: '1.5rem' }} />

            <div className="day-tabs">
              <button
                className={`day-tab ${dayFilter === FILTER_ALL ? 'active' : ''}`}
                onClick={() => setDayFilter(FILTER_ALL)}
              >
                All Days
              </button>
              {days.map((d) => (
                <button
                  key={d.id}
                  className={`day-tab ${dayFilter === d.id ? 'active' : ''}`}
                  onClick={() => setDayFilter(d.id)}
                >
                  {d.label} · {d.date}
                </button>
              ))}
            </div>

            {filteredTopics.map((topic, i) => (
              <div key={topic.id}>
                <TopicSection topic={topic} />
                {i < filteredTopics.length - 1 && <div className="topic-divider" />}
              </div>
            ))}

            {dayFilter === FILTER_ALL && (
              <>
                <div className="topic-divider" />
                <ScheduleSection />

                <div className="topic-divider" />

                <section id="checklist" className="schedule-section">
                  <div className="topic-header">
                    <div className="topic-icon-wrap tuesday">✅</div>
                    <div className="topic-title-group">
                      <span className="topic-day-badge tuesday">Interview Day</span>
                      <h2 className="topic-title">Interview Execution Checklist</h2>
                    </div>
                  </div>
                  <div className="checklist-section">
                    <h3>📋 Before you write a single line of code:</h3>
                    {interviewChecklist.map((item, i) => (
                      <div key={i} className="checklist-item">
                        <span className="checklist-num">{i + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="topic-divider" />

                <section id="pinterest-context" className="schedule-section">
                  <div className="topic-header">
                    <div className="topic-icon-wrap tuesday">📌</div>
                    <div className="topic-title-group">
                      <span className="topic-day-badge tuesday">Know This Cold</span>
                      <h2 className="topic-title">Algorithm → Pinterest Connection</h2>
                    </div>
                  </div>
                  <p style={{ fontSize: '.875rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    When you see a problem pattern, map it instantly to a Pinterest real-world system.
                    This is what makes you stand out — you think like an engineer, not a test-taker.
                  </p>
                  <div className="context-table-wrap">
                    <table className="context-table">
                      <thead>
                        <tr>
                          <th>Pattern</th>
                          <th>Reach for…</th>
                          <th>Pinterest parallel</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pinterestContext.map((row, i) => (
                          <tr key={i}>
                            <td>{row.pattern}</td>
                            <td><span className="context-structure">{row.structure}</span></td>
                            <td>{row.pinterest || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <div className="topic-divider" />

                <section id="complexity-ref" className="schedule-section">
                  <div className="topic-header">
                    <div className="topic-icon-wrap tuesday">⚡</div>
                    <div className="topic-title-group">
                      <span className="topic-day-badge tuesday">Memorize This</span>
                      <h2 className="topic-title">Complexity Quick Reference</h2>
                    </div>
                  </div>
                  <MotivationQuote text="Thragg conquered an entire civilization and couldn't name the difference between O(n) and O(n²). You just did. You're already ahead of him." />
                  <div style={{ height: '.85rem' }} />
                  <ComplexityTable
                    headers={['Notation', 'Name', 'What it means']}
                    rows={[
                      ['O(1)', 'Constant', 'Does not grow with input. Hash map lookup, array index access.'],
                      ['O(log n)', 'Logarithmic', 'Cuts problem in half each step. Binary search, BST.'],
                      ['O(n)', 'Linear', 'One pass through input. Single loop.'],
                      ['O(n log n)', 'Linearithmic', 'Loop + halving. Merge sort, quicksort average.'],
                      ['O(n²)', 'Quadratic', 'Nested loops. Every pair. Gets slow fast.'],
                      ['O(2ⁿ)', 'Exponential', 'Doubles each element. Naive recursion. Never acceptable.'],
                    ]}
                  />
                </section>

                <div className="final-hype">
                  <h2>You Are a Bad Bitch. Go Get This Job.</h2>
                  <p>
                    You built autocomplete. You traversed graphs. You memoized recursion. You traced DP
                    tables by hand. This weekend was just the preparation loop before you go absolute gold
                    standard on their engineering panel.
                    <br /><br />
                    King Kong ain't got shit on you. Thragg is weak compared to you. Godzilla would catch
                    hands from someone who prepped this hard.
                    <br /><br />
                    <strong style={{ color: 'white' }}>It was already yours. Go take it.</strong>
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
