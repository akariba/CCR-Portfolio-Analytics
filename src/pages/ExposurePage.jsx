import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, LineChart, CpSelector, Badge } from '../components/Shared';

const fmt = (n,d=1)=>(parseFloat(n)||0).toFixed(d);

const TENOR_YEARS = {'6M':0.5,'1Y':1,'2Y':2,'3Y':3,'4Y':4,'5Y':5,'7Y':7,'10Y':10};

export default function ExposurePage({ cpId, setCpId }) {
  const cp = COUNTERPARTIES[cpId];
  const s  = currentState(cp);

  const peakEE  = Math.max(...cp.ee);
  const peakPFE = Math.max(...cp.pfe);
  const peakPFEtenor = cp.tenors[cp.pfe.indexOf(peakPFE)];

  // CE = max(FV, 0) simplified as a fraction of PFE at each point
  const ce = cp.pfe.map(p => Math.min(p * 0.3, cp.fairValue));

  const series = [
    {name:'CE',  color:'var(--c-ce)',  data:ce,     fill:false},
    {name:'EE',  color:'var(--c-ee)',  data:cp.ee,  fill:true},
    {name:'PFE', color:'var(--c-pfe)', data:cp.pfe, fill:false},
  ];

  const tenorRows = cp.tenors.map((t,i)=>{
    const hdm = cp.tenorLimits[i] - cp.pfe[i];
    const breach = hdm < 0;
    const warn   = !breach && hdm < 10;
    return [
      <strong>{t}</strong>,
      `$${ce[i].toFixed(1)}M`,
      `$${cp.ee[i]}M`,
      <strong>${cp.pfe[i]}M</strong>,
      `$${cp.tenorLimits[i]}M`,
      <span style={{color:breach?'var(--reject)':warn?'var(--flag)':'var(--approve)',fontWeight:600}}>
        {breach?'−':''}${Math.abs(hdm)}M
      </span>,
      <Badge label={breach?'BREACH':warn?'WARN':'OK'} cls={breach?'reject':warn?'flag':'approve'}/>,
    ];
  });

  // Portfolio exposure summary
  const allCPs = Object.values(COUNTERPARTIES);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Exposure Analytics</div>
        <div className="page-subtitle">CE · EE · PFE evolution over trade tenor · Federal Reserve supervisory framework</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="Current Exposure (CE)" value={`$${fmt(Math.max(cp.fairValue,0))}M`}  sub="max(FV, 0)"/>
        <MetricCard label="Peak EE"               value={`$${peakEE}M`}                          sub={`at ${cp.tenors[cp.ee.indexOf(peakEE)]}`}/>
        <MetricCard label="Peak PFE@95%"          value={`$${peakPFE}M`}                          sub={`at ${peakPFEtenor}`} intent="flag"/>
        <MetricCard label="PFE Limit"             value={`$${cp.pfeLimit}M`}                       sub="approved credit limit"/>
        <MetricCard label="Eff. Utilisation"      value={`${fmt(s.util)}%`}                        sub={`after CSA & WWR adj.`} intent={s.dec.cls}/>
        <MetricCard label="Headroom"              value={`$${fmt(s.headroom)}M`}                   sub="remaining PFE capacity"/>
      </div>

      <SectionCard title="Exposure Profile — CE · EE · PFE" action={`${cp.name} · ${cp.rating}`}>
        <LineChart series={series} xLabels={cp.tenors} height={200}/>
        <div style={{fontSize:11,color:'var(--text-sec)',marginTop:8}}>
          CE = Current Exposure (max of fair value, 0) &nbsp;·&nbsp;
          EE = Expected Exposure (probability-weighted average) &nbsp;·&nbsp;
          PFE@95% = Potential Future Exposure (95th percentile worst-case)
        </div>
      </SectionCard>

      <SectionCard title="Tenor Bucket Analysis" action="PFE vs sub-limit">
        <DataTable
          columns={['Tenor','CE','EE','PFE@95%','Sub-Limit','Headroom','Status']}
          rows={tenorRows}
          rowClass={(r,i)=>{
            const hdm = cp.tenorLimits[i]-cp.pfe[i];
            return hdm<0?'row-bad':hdm<10?'row-warn':'';
          }}
        />
      </SectionCard>

      <SectionCard title="Portfolio Exposure Summary" action="All counterparties · effective PFE">
        <DataTable
          columns={['Counterparty','Rating','Current PFE','CSA-Adj','Eff. PFE','PFE Limit','Util%','Status']}
          rows={allCPs.map(c=>{
            const st = currentState(c);
            return [
              <strong>{c.name}</strong>, c.rating,
              `$${c.currentPFE}M`, `$${fmt(st.csaPFE)}M`,
              <strong>${fmt(st.effPFE)}M</strong>,
              `$${c.pfeLimit}M`,
              <span style={{color:st.dec.color,fontWeight:700}}>{fmt(st.util)}%</span>,
              <Badge label={st.dec.label} cls={st.dec.cls}/>,
            ];
          })}
          rowClass={(r,i)=>{
            const st=currentState(allCPs[i]);
            return st.dec.cls==='reject'?'row-bad':st.dec.cls!=='approve'?'row-warn':'';
          }}
        />
      </SectionCard>
    </div>
  );
}
