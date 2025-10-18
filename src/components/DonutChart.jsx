import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#2E86AB','#F29E4C','#E15759','#6AB187','#8F7AA6'];

export default function DonutChart({ data, title }) {
  const total = data.reduce((s,d)=>s+d.value,0);
  return (
    <div style={{width: '100%'}}>
      <h3 style={{margin:'6px 0'}}>{title}</h3>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <PieChart width={220} height={180}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} >
            {data.map((entry, index) => <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>

        <div style={{lineHeight:1}}>
          {data.map((d,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <div style={{width:12,height:12,background:COLORS[i % COLORS.length],borderRadius:3}} />
              <div style={{minWidth:120}}>
                <div style={{fontSize:13}}>{d.name}</div>
                <div style={{fontSize:12,color:'#666'}}>{d.value} ({Math.round((d.value/total)*100)}%)</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}