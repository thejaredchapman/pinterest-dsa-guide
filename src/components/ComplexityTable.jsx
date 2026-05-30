const COMPLEXITY_PATTERN = /^O\([^)]+\)/;

function formatCell(cell) {
  if (COMPLEXITY_PATTERN.test(cell)) {
    const match = cell.match(/^(O\([^)]+\))(.*)/);
    if (match) {
      return (
        <>
          <span className="complexity-badge">{match[1]}</span>
          {match[2] && <span style={{ marginLeft: 6 }}>{match[2]}</span>}
        </>
      );
    }
  }
  return cell;
}

export default function ComplexityTable({ headers, rows }) {
  return (
    <div className="complexity-table-wrap">
      <table className="complexity-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{formatCell(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
