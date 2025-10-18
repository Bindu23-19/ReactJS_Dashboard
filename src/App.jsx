
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Invoice from './pages/Invoice';
import './styles/app.css';

export default function App(){
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
