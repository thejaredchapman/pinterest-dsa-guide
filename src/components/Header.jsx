export default function Header({ dark, onToggleDark, onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          ☰
        </button>
        <div className="header-logo">P</div>
        <div>
          <div className="header-title">DSA Blueprint</div>
          <div className="header-subtitle">Pinterest Interview Prep</div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="icon-btn"
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
