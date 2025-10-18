
import React from 'react';
import { Grid, FileText, PlusCircle, UserPlus, Building } from 'lucide-react';
import '../styles/sidebar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar(){
  const loc = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo">Logo</div>
      <nav>
        <Link to="/" className={'side-link ' + (loc.pathname === '/' ? 'active' : '')}>
          <Grid size={18}/> <span>Dashboard</span>
        </Link>
        <a className="side-link"><FileText size={18}/> <span>Report</span></a>
        <Link to="/invoice" className={'side-link ' + (loc.pathname.startsWith('/invoice') ? 'active' : '')}>
          <PlusCircle size={18}/> <span>Invoice</span>
        </Link>
        <a className="side-link"><UserPlus size={18}/> <span>Add User</span></a>
        <a className="side-link"><Building size={18}/> <span>Company</span></a>
      </nav>
    </aside>
  );
}
