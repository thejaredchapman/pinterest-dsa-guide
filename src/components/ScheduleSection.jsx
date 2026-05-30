import { schedule } from '../data/content';
import MotivationQuote from './MotivationQuote';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="schedule-section">
      <div className="topic-header">
        <div className="topic-icon-wrap tuesday">📅</div>
        <div className="topic-title-group">
          <span className="topic-day-badge tuesday">All Days</span>
          <h2 className="topic-title">Study Schedule</h2>
        </div>
      </div>

      {schedule.map((day) => (
        <div key={day.day} className="schedule-day-card">
          <div className="schedule-day-header">
            <span className="schedule-day-emoji">{day.emoji}</span>
            <div>
              <div className="schedule-day-title">{day.date}</div>
              <div className="schedule-day-date">{day.sessions.map((s) => s.title).join(' · ')}</div>
            </div>
          </div>

          <div className="schedule-sessions">
            {day.sessions.map((session) => (
              <div key={session.time} className="schedule-session">
                <div className="session-time-col">{session.time}</div>
                <div className="session-content">
                  <div className="session-title">{session.title}</div>
                  <ul className="session-tasks">
                    {session.tasks.map((task, i) => (
                      <li key={i} className="session-task">{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="schedule-motivation">
            <MotivationQuote text={day.motivation} />
          </div>
        </div>
      ))}
    </section>
  );
}
