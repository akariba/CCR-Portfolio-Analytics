import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, CpSelector, Badge } from '../components/Shared';

const fmt  = (n, d=1) => (parseFloat(n)||0).toFixed(d);
const fmtM = (n, d=1) => `$${fmt(n, d)}M`;
const pct  = (n, d=1) => `${fmt(n, d)}%`;

// ─── Wide institutional line chart ───────────────────────────────────────────
function WideLineChart({ series, xLabels, height = 400, title }) {
  const W=900, H=280, PL=58, PR=24, PT=32, PB=44;
  const dW=W-PL-PR, dH=H-PT-PB;
  const allV = series.flatMap(s=>s.data).filter(v=>v!=null);
  const maxV = allV.length ? Math.max(...allV)*1.18 : 1;
  const n = xLabels.length;

  const toX = i => PL + (n>1 ? (i/(n-1))*dW : dW/2);
  const toY = v => PT + dH - (v/maxV)*dH;
  const yTicks = [0, maxV*0.25, maxV*0.5, maxV*0.75, maxV];

  return (
    <div style={{width:'100%',maxWidth:1200,margin:'0 auto'}}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{width:'100%',height:`${height}px`,display:'block'}}
      >
        {/* Chart area background */}
        <rect x={PL} y={PT} width={dW} height={dH} fill="#fafafa" rx="1"/>

        {/* Horizontal grid + Y-axis labels */}
        {yTicks.map((v,i)=>(
          <g key={`y${i}`}>
            <line x1={PL} y1={toY(v)} x2={W-PR} y2={toY(v)}
              stroke={i===0?'#d1d5db':'#e9ecef'}
              strokeWidth={i===0?'0.9':'0.5'}
              strokeDasharray={i>0?'4,4':''}/>
            <text x={PL-6} y={toY(v)+3} textAnchor="end" fontSize="9.5" fill="#6b7280">
              ${v.toFixed(0)}M
            </text>
          </g>
        ))}

        {/* Vertical grid + X-axis labels */}
        {xLabels.map((l,i)=>(
          <g key={`x${i}`}>
            <line x1={toX(i)} y1={PT} x2={toX(i)} y2={PT+dH}
              stroke="#f0f0f0" strokeWidth="0.6"/>
            <text x={toX(i)} y={PT+dH+18} textAnchor="middle"
              fontSize="10.5" fill="#374151" fontWeight="600">{l}</text>
          </g>
        ))}

        {/* Y-axis label */}
        <text transform={`translate(12,${PT+dH/2}) rotate(-90)`}
          textAnchor="middle" fontSize="9" fill="#9ca3af">Exposure ($M)</text>

        {/* Series */}
        {series.map(s=>{
          if(!s.data.length) return null;
          const pts = s.data.map((v,i)=>`${toX(i)},${toY(v)}`).join(' ');
          return (
            <g key={s.name}>
              {s.fill && (
                <polygon
                  points={`${toX(0)},${toY(0)} ${pts} ${toX(s.data.length-1)},${toY(0)}`}
                  fill={s.color} opacity="0.10"/>
              )}
              <polyline points={pts} fill="none" stroke={s.color}
                strokeWidth={s.width||2.5} strokeLinejoin="round" strokeLinecap="round"/>
              {s.data.map((v,i)=>(
                <circle key={i} cx={toX(i)} cy={toY(v)} r="4.5"
                  fill={s.color} stroke="#fff" strokeWidth="1.8"/>
              ))}
            </g>
          );
        })}

        {/* Border */}
        <rect x={PL} y={PT} width={dW} height={dH} fill="none"
          stroke="#d1d5db" strokeWidth="0.8"/>

        {/* Legend */}
        {series.map((s,i)=>(
          <g key={`lg${i}`} transform={`translate(${PL+i*170},${PT-17})`}>
            <line x1={0} y1={0} x2={26} y2={0} stroke={s.color} strokeWidth="2.5"/>
            <circle cx={13} cy={0} r="4.5" fill={s.color} stroke="#fff" strokeWidth="1.5"/>
            <text x={34} y={4} fontSize="10.5" fill="#111827" fontWeight="600">{s.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Risk Heatmap (SVG scatter) ───────────────────────────────────────────────
function RiskHeatmap({ counterparties }) {
  const allCPs = Object.values(counterparties);
  const W=900, H=340, PL=68, PR=40, PT=44, PB=64;
  const dW=W-PL-PR, dH=H-PT-PB;

  const maxPD  = Math.max(...allCPs.map(c=>c.pd1y))  * 1.3;
  const maxPFE = Math.max(...allCPs.map(c=>c.currentPFE)) * 1.25;

  const toX = pd  => PL + (pd  / maxPD)  * dW;
  const toY = pfe => PT + dH - (pfe / maxPFE) * dH;

  function dotColor(pd, pfe) {
    const score = (pd/maxPD)*0.45 + (pfe/maxPFE)*0.55;
    if (score > 0.52) return { fill:'#dc2626', halo:'#fca5a5', text:'#fff' };
    if (score > 0.30) return { fill:'#d97706', halo:'#fde68a', text:'#fff' };
    return               { fill:'#16a34a', halo:'#86efac', text:'#fff' };
  }

  const xTicks = [0, maxPD*0.25, maxPD*0.5, maxPD*0.75, maxPD];
  const yTicks = [0, maxPFE*0.25, maxPFE*0.5, maxPFE*0.75, maxPFE];
  const zoneW  = dW / 3;

  return (
    <div style={{width:'100%',maxWidth:1200,margin:'0 auto'}}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{width:'100%',height:'400px',display:'block'}}
      >
        {/* Background risk zones */}
        <rect x={PL}          y={PT} width={zoneW}   height={dH} fill="#dcfce7" opacity="0.65"/>
        <rect x={PL+zoneW}    y={PT} width={zoneW}   height={dH} fill="#fef9c3" opacity="0.65"/>
        <rect x={PL+zoneW*2}  y={PT} width={zoneW}   height={dH} fill="#fee2e2" opacity="0.65"/>

        {/* Zone labels */}
        {[['LOW RISK','#15803d'],['MEDIUM RISK','#92400e'],['HIGH RISK','#991b1b']].map(([label,color],i)=>(
          <text key={label} x={PL+zoneW*i+zoneW/2} y={PT+18}
            textAnchor="middle" fontSize="9" fill={color} fontWeight="700"
            opacity="0.7" letterSpacing="0.8">{label}</text>
        ))}

        {/* Grid */}
        {xTicks.map((v,i)=>(
          <g key={`xt${i}`}>
            <line x1={toX(v)} y1={PT} x2={toX(v)} y2={PT+dH}
              stroke="#e5e7eb" strokeWidth="0.6"/>
            <text x={toX(v)} y={PT+dH+22} textAnchor="middle"
              fontSize="9.5" fill="#6b7280">{v.toFixed(2)}%</text>
          </g>
        ))}
        {yTicks.map((v,i)=>(
          <g key={`yt${i}`}>
            <line x1={PL} y1={toY(v)} x2={PL+dW} y2={toY(v)}
              stroke="#e5e7eb" strokeWidth="0.6"/>
            <text x={PL-8} y={toY(v)+3} textAnchor="end"
              fontSize="9.5" fill="#6b7280">${v.toFixed(0)}M</text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={PL+dW/2} y={H-8} textAnchor="middle"
          fontSize="11.5" fill="#111827" fontWeight="700">
          Probability of Default — PD 1Y (%)
        </text>
        <text transform={`translate(14,${PT+dH/2}) rotate(-90)`}
          textAnchor="middle" fontSize="11.5" fill="#111827" fontWeight="700">
          Effective PFE ($M)
        </text>

        {/* Counterparty bubbles */}
        {allCPs.map(c=>{
          const {fill,halo,text} = dotColor(c.pd1y, c.currentPFE);
          const st = currentState(c);
          const cx = toX(c.pd1y);
          const cy = toY(c.currentPFE);
          return (
            <g key={c.id}>
              <circle cx={cx} cy={cy} r="22" fill={halo} opacity="0.30"/>
              <circle cx={cx} cy={cy} r="14" fill={fill}
                stroke="#fff" strokeWidth="2.5" opacity="0.95"/>
              <text x={cx} y={cy+5} textAnchor="middle"
                fontSize="9.5" fill={text} fontWeight="800">{c.id}</text>
              {/* Label above */}
              <text x={cx} y={cy-26} textAnchor="middle"
                fontSize="9" fill="#111827" fontWeight="700">
                {c.name.split(' ')[0]}
              </text>
              <text x={cx} y={cy-16} textAnchor="middle"
                fontSize="8" fill="#6b7280">
                {fmt(st.util,0)}% util
              </text>
            </g>
          );
        })}

        {/* Border */}
        <rect x={PL} y={PT} width={dW} height={dH}
          fill="none" stroke="#d1d5db" strokeWidth="1"/>
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExposurePage({ cpId, setCpId }) {
  const cp     = COUNTERPARTIES[cpId];
  const s      = currentState(cp);
  const allCPs = Object.values(COUNTERPARTIES);

  const peakEE      = Math.max(...cp.ee);
  const peakPFE     = Math.max(...cp.pfe);
  const peakPFETenor = cp.tenors[cp.pfe.indexOf(peakPFE)];
  const ce           = cp.pfe.map(p => Math.min(p * 0.30, cp.fairValue));

  // ── Stress EE profiles
  const stressedEERatesUp   = cp.ee.map((v,i) => +(v * (1.10 + i*0.013)).toFixed(1));
  const stressedEECredit    = cp.ee.map(v      => +(v * 1.21).toFixed(1));

  // ── Chart 1: EE + PFE
  const exposureSeries = [
    { name:'EE — Expected Exposure',  color:'#2563eb', data:cp.ee,   fill:true,  width:2.5 },
    { name:'PFE 95% — Worst Case',    color:'#dc2626', data:cp.pfe,  fill:false, width:2.5 },
  ];

  // ── Chart 2: Stress
  const stressSeries = [
    { name:'Base EE',             color:'#2563eb', data:cp.ee,              fill:true,  width:2.5 },
    { name:'Stressed — Rates +100bps',  color:'#d97706', data:stressedEERatesUp,  fill:false, width:2 },
    { name:'Stressed — Credit +100bps', color:'#dc2626', data:stressedEECredit,   fill:false, width:2 },
  ];

  // ── Tenor table
  const tenorRows = cp.tenors.map((t,i)=>{
    const hdm    = cp.tenorLimits[i] - cp.pfe[i];
    const breach = hdm < 0;
    const warn   = !breach && hdm < 10;
    return [
      <strong>{t}</strong>,
      fmtM(ce[i], 1),
      fmtM(cp.ee[i], 1),
      <strong>{fmtM(cp.pfe[i], 1)}</strong>,
      fmtM(cp.tenorLimits[i], 1),
      <span style={{color:breach?'var(--reject)':warn?'var(--flag)':'var(--approve)',fontWeight:600}}>
        {breach?'−':''}${Math.abs(hdm).toFixed(1)}M
      </span>,
      <Badge label={breach?'BREACH':warn?'WARN':'OK'} cls={breach?'reject':warn?'flag':'approve'}/>,
    ];
  });

  // ── Exposure decomposition
  const rawPFE   = s.rawPFE;
  const mktFactor = +(rawPFE * 0.468).toFixed(1);
  const tenorEff  = +(rawPFE * 0.263).toFixed(1);
  const modelRes  = +(rawPFE * 0.131).toFixed(1);
  const collUnwind = +(rawPFE * 0.138).toFixed(1);
  const csaOffset  = -(s.csaSaving).toFixed(1);
  const wwrAddon   = +(s.effPFE - s.csaPFE).toFixed(1);

  const decompRows = [
    { driver:'Market Risk Factor',      desc:'IR delta, FX delta, credit spread DV01 × notional',  val:+mktFactor,  pct:(mktFactor/rawPFE*100), sign:1  },
    { driver:'Tenor Profile Effect',    desc:'Long-dated exposure amplification (hump shape)',      val:+tenorEff,   pct:(tenorEff/rawPFE*100),  sign:1  },
    { driver:'Model / Residual',        desc:'Simulation rounding, correlations, path dependency',  val:+modelRes,   pct:(modelRes/rawPFE*100),  sign:1  },
    { driver:'Collateral & Unwind Cost',desc:'Close-out costs, bid/offer, margin period of risk',   val:+collUnwind, pct:(collUnwind/rawPFE*100),sign:1  },
    { driver:'CSA Threshold Offset',    desc:`Bilateral netting — $${cp.csa.threshold}M threshold`, val:+csaOffset,  pct:(s.csaSaving/rawPFE*100),sign:-1 },
    { driver:'WWR Amplification',       desc:`${cp.wwr} WWR: ρ=${cp.wwr_rho} → ×${s.wwrFactor.toFixed(3)}`,  val:+wwrAddon,   pct:(wwrAddon/rawPFE*100),  sign:1  },
  ];

  // ── Stress scenario table
  const stressRows = [
    { scenario:'Base Case',                 pfe:peakPFE,                   chg:0,    cls:'approve' },
    { scenario:'Interest Rates +100bps',    pfe:+(peakPFE*1.185).toFixed(1), chg:18.5, cls:'flag'   },
    { scenario:'Interest Rates −100bps',    pfe:+(peakPFE*0.882).toFixed(1), chg:-11.8,cls:'approve'},
    { scenario:'Credit Spread +100bps',     pfe:+(peakPFE*1.247).toFixed(1), chg:24.7, cls:'flag'   },
    { scenario:'Combined Stress (2008)',    pfe:+(peakPFE*1.398).toFixed(1), chg:39.8, cls:'reject' },
  ];

  // ── Counterparty comparison
  const cpCompRows = allCPs.map(c=>{
    const st   = currentState(c);
    const pdD  = c.pd1y>2.5?'reject':c.pd1y>1.5?'flag':'approve';
    const score = (c.pd1y/3.5)*0.4 + (st.util/100)*0.6;
    const risk  = score>0.60?'HIGH':score>0.38?'MEDIUM':'LOW';
    const riskCls = risk==='HIGH'?'reject':risk==='MEDIUM'?'flag':'approve';
    return [
      <strong>{c.name}</strong>,
      c.rating,
      <strong>{fmtM(st.effPFE, 1)}</strong>,
      fmtM(c.pfeLimit),
      <span style={{color:st.dec.color,fontWeight:700}}>{fmt(st.util)}%</span>,
      <span style={{color:`var(--${pdD})`,fontWeight:700}}>{c.pd1y}%</span>,
      `${(c.lgd*100).toFixed(0)}%`,
      `${c.cdsSpread} bps`,
      <Badge label={risk} cls={riskCls}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Exposure Analytics</div>
        <div className="page-subtitle">
          CE · EE · PFE@95% · Stress Scenarios · Risk Heatmap · Federal Reserve Supervisory Framework
        </div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      {/* ── 1. KPI SUMMARY ── */}
      <div className="metrics-row">
        <MetricCard label="Current Exposure (CE)"  value={fmtM(Math.max(cp.fairValue,0))}   sub="max(FV, 0)"/>
        <MetricCard label="Peak EE"                value={fmtM(peakEE)}                      sub={`at ${cp.tenors[cp.ee.indexOf(peakEE)]}`}/>
        <MetricCard label="Peak PFE@95%"           value={fmtM(peakPFE)}                     sub={`at ${peakPFETenor}`} intent="flag"/>
        <MetricCard label="PFE Limit"              value={fmtM(cp.pfeLimit)}                 sub="approved credit limit"/>
        <MetricCard label="Eff. Utilisation"       value={pct(s.util)}                       sub="after CSA & WWR adj." intent={s.dec.cls}/>
        <MetricCard label="Headroom"               value={fmtM(s.headroom)}                  sub="remaining PFE capacity" intent={s.headroom<10?'reject':s.headroom<20?'flag':''}/>
      </div>

      {/* ── 2. EXPOSURE CURVE ── */}
      <SectionCard
        title="Exposure Curve — EE & PFE@95%"
        action={`${cp.name} · ${cp.rating} · tenor profile 6M → 10Y`}
      >
        <WideLineChart series={exposureSeries} xLabels={cp.tenors} height={400}/>
        <div style={{display:'flex',gap:32,marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          <span><strong>EE</strong> = Expected Exposure — probability-weighted average MTM at each tenor</span>
          <span><strong>PFE 95%</strong> = Potential Future Exposure — 95th percentile worst-case loss</span>
          <span><strong>Peak PFE</strong> = {fmtM(peakPFE)} at {peakPFETenor}</span>
        </div>
      </SectionCard>

      {/* ── 3. STRESS ANALYSIS ── */}
      <SectionCard
        title="Stress Analysis — EE Under Adverse Scenarios"
        action="Base EE vs Rates +100bps vs Credit Widening +100bps"
      >
        <WideLineChart series={stressSeries} xLabels={cp.tenors} height={400}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:14,fontSize:11,color:'var(--text-sec)'}}>
          <div style={{background:'#fffbeb',border:'1px solid #fde68a',borderRadius:4,padding:'8px 12px'}}>
            <strong style={{color:'#92400e'}}>Rates +100bps:</strong> Parallel shift in yield curve increases
            DV01 exposure on pay-floating legs. Peak EE impact: +{fmt((stressedEERatesUp[cp.ee.indexOf(peakEE)]-peakEE)/peakEE*100,0)}% at {peakPFETenor}.
          </div>
          <div style={{background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:4,padding:'8px 12px'}}>
            <strong style={{color:'#991b1b'}}>Credit Widening +100bps:</strong> CDS spread increase amplifies
            WWR correlation and CVA. EE stressed peak: {fmtM(Math.max(...stressedEECredit))}.
          </div>
        </div>
      </SectionCard>

      {/* ── 4. TENOR BUCKET TABLE ── */}
      <SectionCard title="Tenor Bucket Analysis" action="CE · EE · PFE vs sub-limit per tenor bucket">
        <DataTable
          columns={['Tenor','CE','EE','PFE@95%','Sub-Limit','Headroom','Status']}
          rows={tenorRows}
          rowClass={(_,i)=>{
            const hdm = cp.tenorLimits[i]-cp.pfe[i];
            return hdm<0?'row-bad':hdm<10?'row-warn':'';
          }}
        />
      </SectionCard>

      {/* ── 5. EXPOSURE DECOMPOSITION ── */}
      <SectionCard
        title="Exposure Decomposition"
        action={`Effective PFE = ${fmtM(s.effPFE)} · breakdown of risk drivers`}
      >
        <div style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Description</th>
                <th className="num">Contribution ($M)</th>
                <th className="num">Share of Raw PFE</th>
                <th className="num">Direction</th>
              </tr>
            </thead>
            <tbody>
              {decompRows.map((row,i)=>(
                <tr key={i}>
                  <td><strong>{row.driver}</strong></td>
                  <td style={{color:'var(--text-sec)',fontSize:11}}>{row.desc}</td>
                  <td className="num" style={{fontWeight:700,color:row.sign<0?'var(--approve)':'var(--reject)'}}>
                    {row.sign<0?'−':'+'}{Math.abs(row.val).toFixed(1)}M
                  </td>
                  <td className="num">{Math.abs(row.pct).toFixed(1)}%</td>
                  <td className="num">
                    <span style={{
                      fontSize:10,fontWeight:700,padding:'2px 7px',borderRadius:3,
                      background:row.sign<0?'var(--approve-bg)':'#f1f5f9',
                      color:row.sign<0?'var(--approve)':'#475569'
                    }}>
                      {row.sign<0?'▼ REDUCES':'▲ ADDS'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr style={{background:'var(--surface2)',borderTop:'2px solid var(--border2)'}}>
                <td colSpan={2}><strong>Effective PFE (pipeline result)</strong></td>
                <td className="num"><strong style={{color:'var(--reject)',fontSize:13}}>{fmtM(s.effPFE)}</strong></td>
                <td className="num"><strong>{fmt(s.util)}% utilised</strong></td>
                <td className="num"><Badge label={s.dec.label} cls={s.dec.cls}/></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{marginTop:10,fontSize:11,color:'var(--text-sec)'}}>
          Raw PFE = {fmtM(rawPFE)} · CSA saving = {fmtM(s.csaSaving)} · WWR add-on = {fmtM(wwrAddon)} ·
          Effective PFE = {fmtM(s.effPFE)} / {fmtM(cp.pfeLimit)} limit
        </div>
      </SectionCard>

      {/* ── 6. STRESS SCENARIO TABLE ── */}
      <SectionCard
        title="Stress Scenario Analysis"
        action="Peak PFE sensitivity to market dislocations"
      >
        <DataTable
          columns={['Scenario','Stressed Peak PFE','vs Base ($)','% Change','vs PFE Limit','Status']}
          rows={stressRows.map(row=>{
            const vsLimit = row.pfe - cp.pfeLimit;
            const limitCls = vsLimit>0?'reject':vsLimit>-10?'flag':'approve';
            return [
              <strong>{row.scenario}</strong>,
              <strong style={{color:row.chg>20?'var(--reject)':row.chg>0?'var(--flag)':'var(--approve)'}}>
                {fmtM(row.pfe)}
              </strong>,
              <span style={{color:row.chg>=0?'var(--reject)':'var(--approve)',fontWeight:600}}>
                {row.chg>=0?'+':''}{fmtM(row.pfe-peakPFE)}
              </span>,
              <span style={{color:row.chg>20?'var(--reject)':row.chg>0?'var(--flag)':row.chg<0?'var(--approve)':'var(--text)',fontWeight:700}}>
                {row.chg>=0?'+':''}{row.chg.toFixed(1)}%
              </span>,
              <span style={{color:vsLimit>0?'var(--reject)':vsLimit>-10?'var(--flag)':'var(--approve)',fontWeight:600}}>
                {vsLimit>0?'OVER':'UNDER'} by {fmtM(Math.abs(vsLimit))}
              </span>,
              <Badge
                label={row.cls==='reject'?'BREACH':row.cls==='flag'?'WARN':'WITHIN'}
                cls={row.cls}
              />,
            ];
          })}
          rowClass={(_,i)=>stressRows[i].cls==='reject'?'row-bad':stressRows[i].cls==='flag'?'row-warn':''}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          PFE limit = {fmtM(cp.pfeLimit)} · Combined stress scenario uses 2008–09 crisis parameters ·
          Rates scenarios assume parallel yield curve shift with no convexity hedge
        </div>
      </SectionCard>

      {/* ── 7. COUNTERPARTY RISK HEATMAP ── */}
      <SectionCard
        title="Counterparty Risk Heatmap"
        action="PD (1Y) vs Effective PFE — all counterparties"
      >
        <RiskHeatmap counterparties={COUNTERPARTIES}/>
        <div style={{display:'flex',gap:24,marginTop:14,fontSize:11,color:'var(--text-sec)',flexWrap:'wrap'}}>
          <span style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:12,height:12,borderRadius:'50%',background:'#16a34a',display:'inline-block'}}/>
            Low Risk: PD &lt;1.5% and PFE below threshold
          </span>
          <span style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:12,height:12,borderRadius:'50%',background:'#d97706',display:'inline-block'}}/>
            Medium Risk: PD 1.5–2.5% or elevated PFE
          </span>
          <span style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:12,height:12,borderRadius:'50%',background:'#dc2626',display:'inline-block'}}/>
            High Risk: PD &gt;2.5% and high PFE exposure
          </span>
        </div>
      </SectionCard>

      {/* ── 8. COUNTERPARTY COMPARISON TABLE ── */}
      <SectionCard
        title="Counterparty Comparison"
        action="PFE · Utilisation · PD · Risk Category — all counterparties"
      >
        <DataTable
          columns={['Counterparty','Rating','Eff. PFE','PFE Limit','Utilisation','PD (1Y)','LGD','CDS Spread','Risk Level']}
          rows={cpCompRows}
          rowClass={(_,i)=>{
            const st = currentState(allCPs[i]);
            return st.dec.cls==='reject'?'row-bad':st.dec.cls!=='approve'?'row-warn':'';
          }}
        />
      </SectionCard>
    </div>
  );
}
