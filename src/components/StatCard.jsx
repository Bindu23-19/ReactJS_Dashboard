
import React from 'react';
import '../styles/statcard.css';

export default function StatCard({title, subtitle, value}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-title">{title}</div>
        <div className="stat-sub">{subtitle}</div>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
