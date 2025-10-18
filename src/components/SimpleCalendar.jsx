import React, {useState} from 'react';

/**
 * Very small calendar component showing current month and selectable date.
 * This is a simplified calendar to match the Invoice calendar in the design.
 */
export default function SimpleCalendar(){
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  return (
    <div style={{border:'1px solid #e6e6e6',padding:10,borderRadius:6,background:'#fff',width:180}}>
      <div style={{fontSize:12,color:'#666',marginBottom:6}}>Select date</div>
      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={{width:'100%'}} />
      <div style={{marginTop:8,fontSize:12,color:'#333'}}>Selected: {date}</div>
    </div>
  );
}