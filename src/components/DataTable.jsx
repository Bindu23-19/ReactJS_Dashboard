import React, { useState, useMemo } from "react";
import "../styles/datatable.css";

export default function DataTable({
  columns = [],
  data = [],
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 5,
}) {
  const [rows, setRows] = useState(data.map((r, i) => ({ ...r, id: i + 1, checked: false })));
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState({ key: null, dir: "asc" });

  const toggle = (id) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, checked: !r.checked } : r));
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = rows.filter(r => {
      if (!q) return true;
      return Object.values(r).some(v =>
        String(v).toLowerCase().includes(q)
      );
    });
    if (sortBy.key) {
      list = list.slice().sort((a, b) => {
        let A = a[sortBy.key];
        let B = b[sortBy.key];
        if (sortBy.key === "amount") { A = Number(A); B = Number(B); }
        if (sortBy.key === "date") { A = new Date(A); B = new Date(B); }
        if (typeof A === "string") A = A.toLowerCase();
        if (typeof B === "string") B = B.toLowerCase();
        if (A < B) return sortBy.dir === "asc" ? -1 : 1;
        if (A > B) return sortBy.dir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rows, search, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const checkedCount = rows.filter(r => r.checked).length;

  const changeSort = (key) => {
    setSortBy(s => {
      if (s.key === key) return { key, dir: s.dir === "asc" ? "desc" : "asc" };
      return { key, dir: "asc" };
    });
  };

  return (
    <div className="table-card">
      
      <div className="table-controls">
        <input
          className="table-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <div>
          <label style={{ fontSize: 13, color: "#666" }}>Rows:</label>
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
            {pageSizeOptions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Remark Section */}
{rows.some(r => r.checked) && (
  <div
    style={{
      padding: "12px 14px",
      background: "#e9f8ee",
      border: "1px solid #c6efd6",
      color: "#127a3d",
      borderRadius: 6,
      marginBottom: 12,
    }}
  >
    <strong> Remark:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</strong>
    <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18 }}>
      {rows
        .filter(r => r.checked && r.remark)
        .map(r => (
          <li key={r.id}>
            <strong>{r.company}</strong> — {r.remark}
          </li>
        ))}
    </ul>
  </div>
)}
      <table className="data-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Select</th>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable && changeSort(col.key)}
                style={{ cursor: col.sortable ? "pointer" : "default", textAlign: col.align || "left" }}
              >
                {col.label}
                {col.sortable && sortBy.key === col.key && (sortBy.dir === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {current.map(r => (
            <tr key={r.id} className={r.checked ? "selected" : ""}>
              <td>{r.id}</td>
              <td style={{ textAlign: "center" }}>
                <input type="checkbox" checked={r.checked} onChange={() => toggle(r.id)} />
              </td>
              {columns.map(col => (
                <td key={col.key} style={{ textAlign: col.align || "left" }}>
                  {col.key === "amount"
                    ? `₹ ${Number(r[col.key]).toLocaleString()}`
                    : r[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

  
      <div className="pagination">
        <div>Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total} entries</div>
        <div>
          <button className="btn" onClick={() => setPage(1)} disabled={page === 1}>First</button>
          <button className="btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
          <span style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 4 }}>Page {page} / {totalPages}</span>
          <button className="btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
          <button className="btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
}
