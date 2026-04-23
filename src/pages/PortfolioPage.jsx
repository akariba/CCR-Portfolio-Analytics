import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState, getDecision } from '../state/riskState';
import { computeCVA } from '../state/cvaModel';
import { MetricCard, SectionCard, DataTable, WideBarChart, Badge } from '../components/Shared';

const fmt  = (n,d=1) => (parseFloat(n)||0).toFixed(d);
const fmtM = (n,d=1) => `$${fmt(n,d)}M`;
const pct  = (n,d=1) => `${fmt(n,d)}%`;

// ─── Inline risk heatmap ─────────────────────────────────────────────────────
function RiskHeatmap({ points }) {
  const W=900, H=340, PL=68, PR=40, PT=44, PB=64;
  const dW=W-PL-PR, dH=H-PT-PB;

  const maxPD  = Math.max(...points.map(p=>p.pd)) * 1.3;
  const maxPFE = Math.max(...points.map(p=>p.pfe)) * 1.25;

  const toX = pd  => PL + (pd/maxPD)*dW;
  const toY = pfe => PT + dH - (pfe/maxPFE)*dH;

  function dotColor(pd, pfe) {
    const s = (pd/maxPD)*0.45 + (pfe/maxPFE)*0.55;
    if (s > 0.52) return { fill:'#dc2626', halo:'#fca5a5', text:'#fff' };
    if (s > 0.30) return { fill:'#d97706', halo:'#fde68a', text:'#fff' };
    return               { fill:'#16a34a', halo:'#86efac', text:'#fff' };
  }

  const xTicks = [0, maxPD*0.25, maxPD*0.5, maxPD*0.75, maxPD];
  const yTicks = [0, maxPFE*0.25, maxPFE*0.5, maxPFE*0.75, maxPFE];
  const zoneW  = dW/3;

  return (
    <div style={{width:'100%',maxWidth:1200,margin:'0 auto'}}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
           style={{width:'100%',height:'400px',display:'block'}}>
        <rect x={PL}         y={PT} width={zoneW} height={dH} fill="#dcfce7" opacity="0.65"/>
        <rect x={PL+zoneW}   y={PT} width={zoneW} height={dH} fill="#fef9c3" opacity="0.65"/>
        <rect x={PL+zoneW*2} y={PT} width={zoneW} height={dH} fill="#fee2e2" opacity="0.65"/>
        {[['LOW RISK','#15803d'],['MEDIUM RISK','#92400e'],['HIGH RISK','#991b1b']].map(([lbl,col],i)=>(
          <text key={lbl} x={PL+zoneW*i+zoneW/2} y={PT+18}
            textAnchor="middle" fontSize="9" fill={col} fontWeight="700" opacity="0.7" letterSpacing="0.8">{lbl}</text>
        ))}
        {xTicks.map((v,i)=>(
          <g key={`xt${i}`}>
            <line x1={toX(v)} y1={PT} x2={toX(v)} y2={PT+dH} stroke="#e5e7eb" strokeWidth="0.6"/>
            <text x={toX(v)} y={PT+dH+22} textAnchor="middle" fontSize="9.5" fill="#6b7280">{v.toFixed(2)}%</text>
          </g>
        ))}
        {yTicks.map((v,i)=>(
          <g key={`yt${i}`}>
            <line x1={PL} y1={toY(v)} x2={PL+dW} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.6"/>
            <text x={PL-8} y={toY(v)+3} textAnchor="end" fontSize="9.5" fill="#6b7280">${v.toFixed(0)}M</text>
          </g>
        ))}
        <text x={PL+dW/2} y={H-8} textAnchor="middle" fontSize="11.5" fill="#111827" fontWeight="700">
          Probability of Default — PD 1Y (%)
        </text>
        <text transform={`translate(14,${PT+dH/2}) rotate(-90)`} textAnchor="middle" fontSize="11.5" fill="#111827" fontWeight="700">
          Effective PFE ($M)
        </text>
        {points.map(p=>{
          const {fill,halo,text} = dotColor(p.pd, p.pfe);
          const cx=toX(p.pd), cy=toY(p.pfe);
          return (
            <g key={p.id}>
              <circle cx={cx} cy={cy} r="22" fill={halo} opacity="0.30"/>
              <circle cx={cx} cy={cy} r="14" fill={fill} stroke="#fff" strokeWidth="2.5" opacity="0.95"/>
              <text x={cx} y={cy+5} textAnchor="middle" fontSize="9.5" fill={text} fontWeight="800">{p.id}</text>
              <text x={cx} y={cy-26} textAnchor="middle" fontSize="9" fill="#111827" fontWeight="700">{p.shortName}</text>
              <text x={cx} y={cy-16} textAnchor="middle" fontSize="8" fill="#6b7280">{fmt(p.util,0)}% util</text>
            </g>
          );
        })}
        <rect x={PL} y={PT} width={dW} height={dH} fill="none" stroke="#d1d5db" strokeWidth="1"/>
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const allCPs   = Object.values(COUNTERPARTIES);
  const states   = allCPs.map(cp => ({ cp, st: currentState(cp) }));

  // ── Portfolio aggregates
  const totalEffPFE  = states.reduce((a,{st}) => a + st.effPFE, 0);
  const totalLimit   = allCPs.reduce((a,c) => a + c.pfeLimit, 0);
  const totalCVA     = allCPs.reduce((a,c) => a + c.cva, 0);
  const totalFV      = allCPs.reduce((a,c) => a + c.fairValue, 0);
  const portUtil     = (totalEffPFE / totalLimit) * 100;
  const portDec      = getDecision(portUtil);
  const breachCount  = states.filter(({st}) => st.dec.cls !== 'approve').length;
  const topConc      = Math.max(...states.map(({st}) => st.effPFE / totalEffPFE * 100));

  // ── Top contributors sorted desc
  const sorted = [...states].sort((a,b) => b.st.effPFE - a.st.effPFE);

  // ── Concentration bar chart data
  const barColors = {
    reject:'#dc2626', escalate:'#bf2600', flag:'#d97706', approve:'#16a34a'
  };
  const bars = sorted.map(({cp,st}) => ({
    label: cp.id,
    value: st.effPFE,
    fill:  barColors[st.dec.cls] || '#2563eb',
    pct:   (st.effPFE / totalEffPFE) * 100,
  }));

  // ── Tenor distribution (aggregate EE across all CPs per tenor bucket)
  const buckets = [
    { label:'Short-term (<1Y)',  key:'<1Y',   idxs:[0,1] },
    { label:'Medium (1Y–5Y)',    key:'1Y–5Y', idxs:[2,3,4,5] },
    { label:'Long-term (5Y+)',   key:'5Y+',   idxs:[6,7] },
  ];
  const tenorBuckets = buckets.map(b => {
    const sumEE  = allCPs.reduce((a,c) => a + b.idxs.reduce((s,i)=>s+c.ee[i],0), 0);
    const sumPFE = allCPs.reduce((a,c) => a + b.idxs.reduce((s,i)=>s+c.pfe[i],0), 0);
    return { ...b, sumEE, sumPFE };
  });
  const totalTenorEE = tenorBuckets.reduce((a,b)=>a+b.sumEE,0);

  // ── Portfolio stress
  const stressScenarios = [
    { name:'Base Case',               mult:1.000, cls:'approve' },
    { name:'Interest Rates +100bps',  mult:1.185, cls:'flag'   },
    { name:'Interest Rates −100bps',  mult:0.882, cls:'approve'},
    { name:'Credit Spread +100bps',   mult:1.247, cls:'flag'   },
    { name:'Combined Stress (2008)',   mult:1.398, cls:'reject' },
  ];

  // ── Heatmap points
  const heatPoints = allCPs.map(cp => {
    const st = currentState(cp);
    return {
      id: cp.id,
      shortName: cp.name.split(' ')[0],
      pd: cp.pd1y,
      pfe: st.effPFE,
      util: st.util,
    };
  });

  // ── CVA per counterparty
  const cvaData = allCPs.map(cp => {
    const { cva, rfValue, adjValue } = computeCVA(cp);
    return { cp, cva, rfValue, adjValue, share: (cva / totalCVA) * 100 };
  }).sort((a,b) => b.cva - a.cva);

  // ── Concentration metrics
  const hhi = states.reduce((a,{st}) => a + Math.pow(st.effPFE/totalEffPFE*100, 2), 0); // Herfindahl Index
  const topCp = sorted[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Portfolio Analytics</div>
        <div className="page-subtitle">
          Aggregate CCR · Concentration · Tenor Distribution · Portfolio Stress · Risk Heatmap
        </div>
      </div>

      {/* ── 1. PORTFOLIO KPI ── */}
      <div className="metrics-row">
        <MetricCard label="Total Eff. PFE"    value={fmtM(totalEffPFE)}    sub={`of ${fmtM(totalLimit)} limit`} intent={portDec.cls}/>
        <MetricCard label="Portfolio Util."   value={pct(portUtil)}         sub="PFE-based aggregate"          intent={portDec.cls}/>
        <MetricCard label="Total CVA"         value={fmtM(totalCVA)}        sub={`of ${fmtM(totalFV)} gross FV`} intent="flag"/>
        <MetricCard label="HHI Concentration" value={fmt(hhi,0)}            sub="Herfindahl index (10K=mono)"  intent={hhi>3000?'reject':hhi>1500?'flag':'approve'}/>
        <MetricCard label="Peak Concentration" value={pct(topConc)}         sub={`${topCp.cp.name}`}           intent={topConc>40?'reject':topConc>25?'flag':'approve'}/>
        <MetricCard label="Breach Count"      value={`${breachCount} / ${allCPs.length}`} sub="counterparties flagged" intent={breachCount>2?'reject':breachCount>0?'flag':'approve'}/>
      </div>

      {/* ── 2. TOP RISK CONTRIBUTORS ── */}
      <SectionCard title="Top Risk Contributors" action="Sorted by effective PFE — descending">
        <DataTable
          columns={['Rank','Counterparty','Rating','Eff. PFE','% Portfolio','PFE Limit','Util.','CVA','Adj. FV','Status']}
          rows={sorted.map(({cp,st},i)=>{
            const portShare = (st.effPFE/totalEffPFE*100);
            return [
              <strong style={{color:'var(--text-sec)'}}>{i+1}</strong>,
              <strong>{cp.name}</strong>,
              cp.rating,
              <strong style={{color:st.dec.color}}>{fmtM(st.effPFE)}</strong>,
              <span style={{
                fontWeight:700,
                color:portShare>35?'var(--reject)':portShare>20?'var(--flag)':'var(--text)'
              }}>{pct(portShare)}</span>,
              fmtM(cp.pfeLimit),
              <span style={{color:st.dec.color,fontWeight:700}}>{pct(st.util)}</span>,
              <span style={{color:'var(--reject)'}}>{fmtM(cp.cva)}</span>,
              fmtM(cp.fairValue - cp.cva),
              <Badge label={st.dec.label} cls={st.dec.cls}/>,
            ];
          })}
          rowClass={(_,i)=>{
            const {st}=sorted[i];
            return st.dec.cls==='reject'?'row-bad':st.dec.cls!=='approve'?'row-warn':'';
          }}
        />
        <div style={{marginTop:10,padding:'8px 12px',background:'var(--surface2)',borderRadius:4,fontSize:11,display:'flex',gap:24}}>
          <span style={{color:'var(--text-sec)'}}>Portfolio aggregates —</span>
          <span>Total PFE: <strong>{fmtM(totalEffPFE)}</strong></span>
          <span>Utilisation: <strong style={{color:portDec.color}}>{pct(portUtil)}</strong></span>
          <span>Total CVA: <strong style={{color:'var(--reject)'}}>{fmtM(totalCVA)}</strong></span>
          <span>HHI: <strong>{fmt(hhi,0)}</strong></span>
        </div>
      </SectionCard>

      {/* ── 3. CONCENTRATION BAR CHART ── */}
      <SectionCard
        title="Exposure Concentration"
        action="Effective PFE per counterparty — colour = decision status"
      >
        <WideBarChart bars={bars} height={380} yLabel="Effective PFE ($M)"/>
        <div style={{display:'flex',gap:24,marginTop:12,fontSize:11,color:'var(--text-sec)',flexWrap:'wrap'}}>
          {[['APPROVE','var(--approve)'],['FLAG','var(--flag)'],['ESCALATE / REJECT','var(--reject)']].map(([lbl,col])=>(
            <span key={lbl} style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:12,height:12,borderRadius:2,background:col,display:'inline-block'}}/>
              {lbl}
            </span>
          ))}
          <span style={{marginLeft:'auto'}}>HHI = {fmt(hhi,0)} (0 = perfect diversification, 10,000 = monopoly)</span>
        </div>
      </SectionCard>

      {/* ── 4. TENOR DISTRIBUTION ── */}
      <SectionCard title="Tenor Distribution" action="Aggregate exposure by maturity bucket — all counterparties">
        <div style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Tenor Bucket</th>
                <th>Tenors Included</th>
                <th className="num">Aggregate EE ($M)</th>
                <th className="num">% of Total EE</th>
                <th className="num">Aggregate PFE ($M)</th>
                <th className="num">Risk Concentration</th>
                <th>Visual</th>
              </tr>
            </thead>
            <tbody>
              {tenorBuckets.map(b=>{
                const eePct = totalTenorEE>0 ? b.sumEE/totalTenorEE*100 : 0;
                const cl    = eePct>50?'reject':eePct>35?'flag':'approve';
                return (
                  <tr key={b.key}>
                    <td><strong>{b.label}</strong></td>
                    <td style={{color:'var(--text-sec)',fontSize:11}}>
                      {b.key==='<1Y'?'6M, 1Y':b.key==='1Y–5Y'?'2Y, 3Y, 4Y, 5Y':'7Y, 10Y'}
                    </td>
                    <td className="num"><strong>{fmtM(b.sumEE)}</strong></td>
                    <td className="num">
                      <span style={{color:`var(--${cl})`,fontWeight:700}}>{pct(eePct)}</span>
                    </td>
                    <td className="num">{fmtM(b.sumPFE)}</td>
                    <td className="num"><Badge label={cl==='reject'?'HIGH':cl==='flag'?'MEDIUM':'LOW'} cls={cl}/></td>
                    <td>
                      <div style={{height:8,background:'var(--border)',borderRadius:4,overflow:'hidden',width:120}}>
                        <div style={{
                          height:'100%',
                          width:`${Math.min(eePct,100)}%`,
                          background:`var(--${cl})`,
                          borderRadius:4
                        }}/>
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr style={{background:'var(--surface2)',borderTop:'2px solid var(--border2)'}}>
                <td><strong>Total</strong></td>
                <td style={{color:'var(--text-sec)',fontSize:11}}>All tenors</td>
                <td className="num"><strong>{fmtM(totalTenorEE)}</strong></td>
                <td className="num"><strong>100%</strong></td>
                <td className="num">{fmtM(tenorBuckets.reduce((a,b)=>a+b.sumPFE,0))}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── 5. PORTFOLIO STRESS ── */}
      <SectionCard title="Portfolio Stress Scenarios" action="Aggregate PFE under adverse market conditions">
        <DataTable
          columns={['Scenario','Portfolio PFE','vs Base ($)','% Change','vs Total Limit','Status']}
          rows={stressScenarios.map(sc=>{
            const stressPFE = totalEffPFE * sc.mult;
            const vsBase    = stressPFE - totalEffPFE;
            const chgPct    = (sc.mult-1)*100;
            const vsLimit   = stressPFE - totalLimit;
            const limitCls  = vsLimit>0?'reject':vsLimit>-totalLimit*0.1?'flag':'approve';
            return [
              <strong>{sc.name}</strong>,
              <strong style={{color:chgPct>20?'var(--reject)':chgPct>0?'var(--flag)':'var(--approve)'}}>
                {fmtM(stressPFE)}
              </strong>,
              <span style={{color:vsBase>0?'var(--reject)':'var(--approve)',fontWeight:600}}>
                {vsBase>=0?'+':''}{fmtM(vsBase)}
              </span>,
              <span style={{color:chgPct>20?'var(--reject)':chgPct>0?'var(--flag)':chgPct<0?'var(--approve)':'var(--text)',fontWeight:700}}>
                {chgPct>=0?'+':''}{chgPct.toFixed(1)}%
              </span>,
              <span style={{color:vsLimit>0?'var(--reject)':'var(--approve)',fontWeight:600}}>
                {vsLimit>0?'+':''}{fmtM(vsLimit)} {vsLimit>0?'OVER':'under limit'}
              </span>,
              <Badge label={sc.cls==='reject'?'BREACH':sc.cls==='flag'?'WARN':'WITHIN'} cls={sc.cls}/>,
            ];
          })}
          rowClass={(_,i)=>stressScenarios[i].cls==='reject'?'row-bad':stressScenarios[i].cls==='flag'?'row-warn':''}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          Base portfolio PFE = {fmtM(totalEffPFE)} · Total limit = {fmtM(totalLimit)} ·
          Stress multipliers applied uniformly across all counterparties.
          Combined 2008 scenario uses historical peak parameters.
        </div>
      </SectionCard>

      {/* ── 6. CVA BREAKDOWN ── */}
      <SectionCard title="CVA Breakdown by Counterparty" action={`Total portfolio CVA: ${fmtM(totalCVA)} · ${pct(totalCVA/totalFV*100)} of gross FV`}>
        <DataTable
          columns={['Counterparty','Rating','CDS Spread','LGD','Gross FV','CVA','% of Port. CVA','Adj. FV','CVA/FV Ratio']}
          rows={cvaData.map(({cp,cva,rfValue,adjValue,share})=>{
            const ratio = cva/rfValue*100;
            const ratioD = ratio>20?'reject':ratio>12?'flag':'approve';
            return [
              <strong>{cp.name}</strong>,
              cp.rating,
              `${cp.cdsSpread} bps`,
              `${(cp.lgd*100).toFixed(0)}%`,
              fmtM(rfValue),
              <strong style={{color:'var(--reject)'}}>{fmtM(cva)}</strong>,
              <span style={{fontWeight:700,color:share>30?'var(--reject)':share>20?'var(--flag)':'var(--text)'}}>
                {pct(share)}
              </span>,
              fmtM(adjValue),
              <span style={{color:`var(--${ratioD})`,fontWeight:700}}>{pct(ratio)}</span>,
            ];
          })}
          rowClass={(_,i)=>{
            const share=cvaData[i].share;
            return share>30?'row-bad':share>20?'row-warn':'';
          }}
        />
      </SectionCard>

      {/* ── 7. RISK HEATMAP ── */}
      <SectionCard
        title="Portfolio Risk Heatmap"
        action="PD (1Y) vs Effective PFE — all counterparties · green/yellow/red risk zones"
      >
        <RiskHeatmap points={heatPoints}/>
        <div style={{display:'flex',gap:24,marginTop:14,fontSize:11,color:'var(--text-sec)',flexWrap:'wrap'}}>
          {[
            ['Low Risk: PD <1.5% and PFE below 50th percentile','#16a34a'],
            ['Medium Risk: PD 1.5–2.5% or elevated PFE','#d97706'],
            ['High Risk: PD >2.5% with high PFE','#dc2626'],
          ].map(([label,col])=>(
            <span key={col} style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:12,height:12,borderRadius:'50%',background:col,display:'inline-block'}}/>
              {label}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* ── 8. COUNTERPARTY COMPARISON ── */}
      <SectionCard
        title="Counterparty Comparison"
        action="PFE · Utilisation · PD · LGD · WWR · Risk Level"
      >
        <DataTable
          columns={['Counterparty','Rating','Region','Eff. PFE','Util.','PD 1Y','LGD','CDS','WWR','Risk Level']}
          rows={allCPs.map(cp=>{
            const st   = currentState(cp);
            const pdD  = cp.pd1y>2.5?'reject':cp.pd1y>1.5?'flag':'approve';
            const score= (cp.pd1y/3.5)*0.4 + (st.util/100)*0.6;
            const risk = score>0.60?'HIGH':score>0.38?'MEDIUM':'LOW';
            const rCls = risk==='HIGH'?'reject':risk==='MEDIUM'?'flag':'approve';
            return [
              <strong>{cp.name}</strong>,
              cp.rating, cp.region,
              <strong style={{color:st.dec.color}}>{fmtM(st.effPFE)}</strong>,
              <span style={{color:st.dec.color,fontWeight:700}}>{pct(st.util)}</span>,
              <span style={{color:`var(--${pdD})`,fontWeight:700}}>{cp.pd1y}%</span>,
              `${(cp.lgd*100).toFixed(0)}%`,
              `${cp.cdsSpread} bps`,
              <Badge label={cp.wwr} cls={cp.wwr==='HIGH'?'reject':cp.wwr==='MEDIUM'?'flag':'approve'}/>,
              <Badge label={risk} cls={rCls}/>,
            ];
          })}
          rowClass={(_,i)=>{
            const st=currentState(allCPs[i]);
            return st.dec.cls==='reject'?'row-bad':st.dec.cls!=='approve'?'row-warn':'';
          }}
        />
      </SectionCard>
    </div>
  );
}
