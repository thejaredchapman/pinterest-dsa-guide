import { useState } from 'react';
import CodeBlock from './CodeBlock';
import MotivationQuote from './MotivationQuote';

export default function ProblemCard({ problem, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="problem-card">
      <div
        className={`problem-card-header ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
      >
        <h3>{problem.title}</h3>
        <span className={`problem-toggle ${open ? 'open' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="problem-body">
          {problem.description && (
            <p className="problem-description">{problem.description}</p>
          )}

          {problem.code && <CodeBlock code={problem.code} />}

          {problem.trace && (
            <div className="trace-block">
              <div className="trace-header">
                <span>📋</span> Trace Through
              </div>
              <pre className="trace-pre">{problem.trace}</pre>
            </div>
          )}

          {problem.interviewNote && (
            <p className="interview-note">💬 {problem.interviewNote}</p>
          )}

          {problem.motivation && (
            <MotivationQuote text={problem.motivation} />
          )}
        </div>
      )}
    </div>
  );
}
