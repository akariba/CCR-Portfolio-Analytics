import React from 'react';

export function Badge({ label, cls }) {
  return <span className={`badge badge-${cls}`}>{label}</span>;
}

export function MetricCard({ label, value, sub, intent, style }) {
  return (
    <div className="metric-card" style={style}>
      <div className="metric-label">{label}</div>
      <div className={`metric-value${intent ? ` mv-${intent}` : ''}`}>{value}</div>
      {sub && <div className="metric-sub">{sub}</div>}
    </div>
  );
}

export function SectionCard({ title, action, children, style }) {
  return (
    <div className="section-card" style={style}>
      <div className="section-card-hd">
        <span className="section-card-title">{title}</span>
        {action && <span style={{fontSize:11,color:'var(--text-sec)'}}>{action}</span>}
      </div>
      <div className="section-card-body">{children}</div>
    </div>
  );
}

export function DataTable({ columns, rows, rowClass }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map((c,i) => <th key={i}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i} className={rowClass ? rowClass(r, i) : ''}>
              {r.map((c,j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Reusable SVG line chart
export function LineChart({ series=[], xLabels=[], height=160, yPrefix='$', yUnit='M' }) {
  const W=100, H=100, PL=30, PR=8, PT=10, PB=20;
  const dW=W-PL-PR, dH=H-PT-PB;
  const allV = series.flatMap(s=>s.data).filter(v=>v!=null);
  const maxV = allV.length ? Math.max(...allV)*1.15 : 1;
  const n    = xLabels.length;

  function toX(i) { return PL + (n>1 ? (i/(n-1))*dW : dW/2); }
  function toY(v) { return PT + dH - (v/maxV)*dH; }

  const yTicks = [0, maxV/2, maxV];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:`${height}px`,display:'block'}}>
      {/* Grid */}
      {yTicks.map((v,i) => (
        <g key={i}>
          <line x1={PL} y1={toY(v)} x2={W-PR} y2={toY(v)} stroke="#e1e4e8" strokeWidth="0.4" />
          <text x={PL-2} y={toY(v)+1.5} textAnchor="end" fontSize="4.5" fill="#97a0af">
            {yPrefix}{v>=1000?(v/1000).toFixed(0)+'K':v.toFixed(0)}{yUnit}
          </text>
        </g>
      ))}
      {/* X labels */}
      {xLabels.map((l,i) => (
        <text key={l} x={toX(i)} y={H-2} textAnchor="middle" fontSize="4.5" fill="#97a0af">{l}</text>
      ))}
      {/* Series */}
      {series.map(s => {
        if (!s.data.length) return null;
        const pts = s.data.map((v,i)=>`${toX(i)},${toY(v)}`).join(' ');
        const area = `${toX(0)},${toY(0)} ${pts} ${toX(s.data.length-1)},${toY(0)}`;
        return (
          <g key={s.name}>
            {s.fill && <polygon points={area} fill={s.color} opacity="0.08"/>}
            <polyline points={pts} fill="none" stroke={s.color} strokeWidth={s.width||1.2}/>
          </g>
        );
      })}
      {/* Legend */}
      {series.map((s,i) => (
        <g key={`lg-${s.name}`}>
          <line x1={PL + i*22} y1={PT-3} x2={PL+i*22+8} y2={PT-3} stroke={s.color} strokeWidth="1.2"/>
          <text x={PL+i*22+10} y={PT-1.5} fontSize="4.5" fill="#5e6c84">{s.name}</text>
        </g>
      ))}
    </svg>
  );
}

// Horizontal bar chart for PL attribution
export function HBar({ label, value, maxAbs, color }) {
  const pct = (Math.abs(value)/maxAbs)*100;
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
      <div style={{width:90,fontSize:12,color:'var(--text-sec)',textAlign:'right',flexShrink:0}}>{label}</div>
      <div style={{flex:1,height:8,background:'var(--border)',borderRadius:4,overflow:'hidden'}}>
        <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:4}}/>
      </div>
      <div style={{width:56,fontSize:12,fontWeight:600,textAlign:'right',flexShrink:0,color}}>
        {value>=0?'+':''}{value.toFixed(2)}M
      </div>
    </div>
  );
}

export function CpSelector({ value, onChange, counterparties }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
      <label style={{fontSize:11,color:'var(--text-sec)',fontWeight:600,textTransform:'uppercase',letterSpacing:'.04em'}}>
        Counterparty
      </label>
      <select className="form-select" value={value} onChange={e=>onChange(e.target.value)} style={{width:200}}>
        {Object.values(counterparties).map(cp=>(
          <option key={cp.id} value={cp.id}>{cp.name}</option>
        ))}
      </select>
    </div>
  );
}
