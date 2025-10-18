import React, { useState, useMemo } from "react";
import "../styles/datatable.css";

const sampleData = [
  { orderId:'ORD-001', invoiceId:'INV-1001', company:'Geodesic Pvt Ltd', department:'Admin', gst:'18%', date:'2025-09-01', amount:314151, remark: 'It is a long established fact that a reader will be distracted by the readable content...'},
  { orderId:'ORD-003', invoiceId:'INV-1003', company:'Sony India', department:'Accounts', gst:'18%', date:'2025-09-05', amount:5424247, remark:' '},
  { orderId:'ORD-004', invoiceId:'INV-1004', company:'Acme Pvt Ltd', department:'Procurement', gst:'18%', date:'2025-09-06', amount:123456, remark:' ' },
  { orderId:'ORD-005', invoiceId:'INV-1005', company:'Infosys', department:'IT', gst:'18%', date:'2025-09-10', amount:789321 , remark:' '},
  { orderId:'ORD-006', invoiceId:'INV-1006', company:'TCS', department:'Finance', gst:'18%', date:'2025-09-12', amount:45678, remark:' ' },
  { orderId:'ORD-007', invoiceId:'INV-1007', company:'Wipro', department:'Accounts', gst:'18%', date:'2025-09-15', amount:951357, remark:' ' },
  { orderId:'ORD-008', invoiceId:'INV-1008', company:'Reliance', department:'Sales', gst:'18%', date:'2025-09-18', amount:753951 , remark:' '},
  { orderId:'ORD-009', invoiceId:'INV-1009', company:'Deloitte', department:'Consulting', gst:'18%', date:'2025-09-20', amount:852963 , remark:' '},
  { orderId:'ORD-010', invoiceId:'INV-1010', company:'Amazon', department:'Logistics', gst:'18%', date:'2025-09-25', amount:147852, remark:' ' },
  { orderId:'ORD-011', invoiceId:'INV-1011', company:'Samsung', department:'Accounts', gst:'18%', date:'2025-09-24', amount:679054, remark:' ' },
  { orderId:'ORD-012', invoiceId:'INV-1012', company:'Accenture', department:'Logistics', gst:'18%', date:'2025-06-25', amount:976874, remark:' ' }
];

export default function DataTable({pageSizeOptions=[5,10,20], defaultPageSize=5}){
  const [rows, setRows] = useState(sampleData.map((r,i)=>({ ...r, id: i+1, checked: false })));
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState({key: null, dir: 'asc'});

  const toggle = (id) => {
    setRows(rs => rs.map(r => r.id === id ? {...r, checked: !r.checked} : r));
  };

  const filtered = useMemo(()=>{
    const q = search.trim().toLowerCase();
    let list = rows.filter(r => {
      if(!q) return true;
      return (
        r.company.toLowerCase().includes(q) ||
        r.orderId.toLowerCase().includes(q) ||
        r.invoiceId.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
      );
    });
    if(sortBy.key){
      list = list.slice().sort((a,b)=>{
        let A = a[sortBy.key];
        let B = b[sortBy.key];
        // normalize strings/dates/numbers
        if(sortBy.key === 'amount') { A = Number(A); B = Number(B); }
        if(sortBy.key === 'date'){ A = new Date(A); B = new Date(B); }
        if(typeof A === 'string') A = A.toLowerCase();
        if(typeof B === 'string') B = B.toLowerCase();
        if(A < B) return sortBy.dir === 'asc' ? -1 : 1;
        if(A > B) return sortBy.dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rows, search, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = filtered.slice((page-1)*pageSize, page*pageSize);

  const checkedCount = rows.filter(r=>r.checked).length;

  const changeSort = (key)=>{
    setSortBy(s => {
      if(s.key === key) {
        return { key, dir: s.dir === 'asc' ? 'desc' : 'asc' };
      }
      return { key, dir: 'asc' };
    });
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Search by company, order, invoice or department..." value={search} onChange={(e)=>{setSearch(e.target.value); setPage(1);}} style={{padding:8,width:420}} />
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <label style={{fontSize:13,color:'#666'}}>Rows:</label>
          <select value={pageSize} onChange={(e)=>{setPageSize(Number(e.target.value)); setPage(1);}}>
            {pageSizeOptions.map(p=> <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {checkedCount>0 && (
        <div style={{padding:10,background:'#e9f8ee',border:'1px solid #c6efd6',color:'#127a3d',borderRadius:6,marginBottom:12}}>
           {checkedCount} remark:'It is a long established fact that a reader will be distracted by the readable content...' 
        </div>
      )}

      <table className="data-table" style={{width:'100%'}}>
        <thead>
          <tr>
            <th style={{width:48}}>No.</th>
            <th style={{width:60}}>Select</th>
            <th onClick={()=>changeSort('orderId')} style={{cursor:'pointer'}}>Order ID {sortBy.key==='orderId' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th onClick={()=>changeSort('invoiceId')} style={{cursor:'pointer'}}>Invoice ID {sortBy.key==='invoiceId' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th onClick={()=>changeSort('company')} style={{cursor:'pointer'}}>Company {sortBy.key==='company' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th onClick={()=>changeSort('department')} style={{cursor:'pointer'}}>Department {sortBy.key==='department' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th>GST</th>
            <th onClick={()=>changeSort('date')} style={{cursor:'pointer'}}>Issued Date {sortBy.key==='date' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
            <th onClick={()=>changeSort('amount')} style={{cursor:'pointer', textAlign:'right'}}>Invoice Amount {sortBy.key==='amount' ? (sortBy.dir==='asc' ? '▲' : '▼') : ''}</th>
          </tr>
        </thead>
        <tbody>
          {current.map((r)=> (
            <tr key={r.id} className={r.checked ? 'selected' : ''}>
              <td>{r.id}</td>
              <td style={{textAlign:'center'}}>
                <input type="checkbox" checked={r.checked} onChange={()=>toggle(r.id)} />
              </td>
              <td>{r.orderId}</td>
              <td>{r.invoiceId}</td>
              <td>{r.company}</td>
              <td>{r.department}</td>
              <td>{r.gst}</td>
              <td>{r.date}</td>
              <td style={{textAlign:'right'}}>₹ {Number(r.amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12}}>
        <div style={{color:'#666'}}>Showing {(page-1)*pageSize + 1} - {Math.min(page*pageSize, total)} of {total} entries</div>
        <div style={{display:'flex',gap:6,alignItems:'center'}}>
          <button className="btn" onClick={()=>setPage(1)} disabled={page===1}>First</button>
          <button className="btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
          <div style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:4}}>Page {page} / {totalPages}</div>
          <button className="btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
          <button className="btn" onClick={()=>setPage(totalPages)} disabled={page===totalPages}>Last</button>
        </div>
      </div>
    </div>
  );
}