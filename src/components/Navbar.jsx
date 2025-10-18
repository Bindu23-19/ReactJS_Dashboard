
import React from 'react';
import { Bell, HelpCircle, UserCircle } from 'lucide-react';
import '../styles/app.css';

export default function Navbar(){
  return (
    <header className="navbar" role="banner" aria-label="Top navigation">
      <div className="top-left">
        <button aria-label="toggle menu" style={{border:'none',background:'transparent',cursor:'pointer'}}>☰</button>
        <div style={{fontWeight:700}}>Dashboard</div>
      </div>

      <input className="search-input" placeholder="Search" aria-label="Search" />

      <div className="nav-actions">
        <Bell />
        <HelpCircle />
        <div style={{width:36,height:36,borderRadius:'60%',background:'#ed6f0eff',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>BG</div>
      </div>
    </header>
  );
}
