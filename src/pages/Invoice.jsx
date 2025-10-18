import React from 'react';
import DataTable from '../components/DataTable';

export default function Invoice(){
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <div style={{color:'var(--muted)',fontSize:13}}>Dashboard › Invoice Received</div>
          <h1 style={{margin:0}}>Invoice Received</h1>
        </div>
        <div style={{textAlign:'right',color: 'var(--muted)'}}>October 2025<br/><small>S M T W T F S</small></div>
      </div>

      <DataTable />
    </div>
  );
}