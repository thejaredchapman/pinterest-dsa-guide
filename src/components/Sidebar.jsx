import { topics, days } from '../data/content';

export default function Sidebar({ isOpen, onClose, activeId, onNavigate, completedTopics, onToggleComplete }) {
  const grouped = days.map((d) => ({
    ...d,
    topics: topics.filter((t) => t.day === d.id),
  }));

  const completedCount = completedTopics.size;
  const totalCount = topics.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div style={{ padding: '.75rem .75rem .5rem' }}>
          <span className="sidebar-section-label">Progress</span>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div style={{ fontSize: '.68rem', color: 'var(--text-muted)', marginTop: '.2rem' }}>
            {completedCount}/{totalCount} topics marked done
          </div>
        </div>

        <span className="sidebar-section-label" style={{ paddingTop: '.5rem' }}>Topics</span>

        {grouped.map((group) => (
          <div key={group.id} className="sidebar-day-group">
            <div className="sidebar-day-header">
              <span className={`day-dot ${group.id}`} />
              {group.label} · {group.date}
            </div>
            {group.topics.map((t) => (
              <button
                key={t.id}
                className={`sidebar-link ${activeId === t.id ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(t.id);
                  onClose();
                }}
              >
                <span className="link-icon">{t.icon}</span>
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {t.title}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(t.id);
                  }}
                  style={{
                    fontSize: '.85rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                    opacity: completedTopics.has(t.id) ? 1 : 0.3,
                    transition: 'opacity .2s',
                  }}
                  title={completedTopics.has(t.id) ? 'Mark incomplete' : 'Mark complete'}
                >
                  ✓
                </span>
              </button>
            ))}
          </div>
        ))}

        <div className="sidebar-footer">
          Pinterest DSA Prep · Jared Chapman
        </div>
      </nav>
    </>
  );
}
