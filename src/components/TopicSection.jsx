import ComplexityTable from './ComplexityTable';
import ProblemCard from './ProblemCard';

export default function TopicSection({ topic }) {
  return (
    <section id={topic.id} className="topic-section">
      <div className="topic-header">
        <div className={`topic-icon-wrap ${topic.day}`}>{topic.icon}</div>
        <div className="topic-title-group">
          <span className={`topic-day-badge ${topic.day}`}>
            {topic.day.charAt(0).toUpperCase() + topic.day.slice(1)}
          </span>
          <h2 className="topic-title">{topic.title}</h2>
        </div>
      </div>

      <p className="topic-intro">{topic.intro}</p>

      {topic.complexityTable && (
        <>
          <span className="section-label">Complexity Reference</span>
          <ComplexityTable
            headers={topic.complexityTable.headers}
            rows={topic.complexityTable.rows}
          />
          <div style={{ height: '1rem' }} />
        </>
      )}

      {topic.problems && topic.problems.length > 0 && (
        <>
          <span className="section-label">Problems</span>
          {topic.problems.map((p, i) => (
            <ProblemCard key={p.id} problem={p} defaultOpen={i === 0} />
          ))}
        </>
      )}
    </section>
  );
}
