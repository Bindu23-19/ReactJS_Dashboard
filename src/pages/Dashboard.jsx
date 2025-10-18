import React from 'react';
import StatCard from '../components/StatCard';
import DonutChart from '../components/DonutChart';
import SimpleCalendar from '../components/SimpleCalendar';
import '../styles/dashboard.css';

export default function Dashboard(){
  const payable = { title:'Payable amount', subtitle:'Total', value:'₹ 12,341,233' };
  const overdue = { title:'Overdue', subtitle:'Total', value:'₹ 1,234,123' };
  const dispute = { title:'Dispute', subtitle:'Total', value:'₹ 21,233' };
  const department = { title:'Department', subtitle:'Total', value:'₹ 123,412' };
  const vendors = { title:'Vendors', subtitle:'Total', value:'₹ 123,412' };

  const queuesData = [
    { name: 'Processing Queue', value: 54 },
    { name: 'Exception Queue', value: 26 },
    { name: 'Duplicate Queue', value: 20 }
  ];

  const kpiData = [
    { name: 'Role', value: 54 },
    { name: 'Person Responsible', value: 30 },
    { name: 'Triggers Alert', value: 16 }
  ];

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <div style={{color:'var(--muted)',fontSize:13}}>Dashboard</div>
          <h1 style={{margin:0}}>Dashboard</h1>
        </div>
        <SimpleCalendar />
      </div>

      <section className="cards-row" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:16}}>
        <StatCard {...payable} />
        <StatCard {...overdue} />
        <StatCard {...dispute} />
        <StatCard {...department} />
        <StatCard {...vendors} />
      </section>

      <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div style={{background:'#fff',padding:12,borderRadius:8}}>
          <DonutChart data={queuesData} title="Queues" />
        </div>
        <div style={{background:'#fff',padding:12,borderRadius:8}}>
          <DonutChart data={kpiData} title="KPI" />
        </div>
      </section>
    </div>
  );
}