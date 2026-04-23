import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, WideLineChart, CpSelector, Badge } from '../components/Shared';

const fmt = (n,d=1) => (parseFloat(n)||0).toFixed(d);
const fmtM = (n,d=1) => `$${fmt(n,d)}M`;

function UtilBar({ pct, cls }) {
  return (
    <div style={{height:10,background:'var(--border)',borderRadius:5,overflow:'hidden'}}>
      <div style={{
        height:'100%',
        width:`${Math.min(pct,100)}%`,
        background:`var(--${cls})`,
        borderRadius:5,
        transition:'width .3s'
      }}/>
    </div>
  );
}

export default function MarketRiskPage({ cpId, setCpId }) {
  const cp     = COUNTERPARTIES[cpId];
  const s      = currentState(cp);
  const allCPs = Object.values(COUNTERPARTIES);

  const varLimit  = cp.pfeLimit * 0.20;
  const varUtil   = (cp.var99 / varLimit) * 100;
  const svarLimit = cp.pfeLimit * 0.40;
  const svarUtil  = (cp.stressVar / svarLimit) * 100;
  const varDec    = varUtil  > 95 ? 'reject' : varUtil  > 85 ? 'escalate' : varUtil  > 70 ? 'flag' : 'approve';
  const svarDec   = svarUtil > 95 ? 'reject' : svarUtil > 85 ? 'escalate' : svarUtil > 70 ? 'flag' : 'approve';

  const totalVar  = allCPs.reduce((a,c) => a+c.var99,      0);
  const totalSVar = allCPs.reduce((a,c) => a+c.stressVar,  0);

  // VaR term-structure (square-root scaling)
  const horizons = ['1D','5D','10D','1M','3M','6M'];
  const sqrtScale= [1, Math.sqrt(5), Math.sqrt(10), Math.sqrt(21), Math.sqrt(63), Math.sqrt(126)];
  const maxScale = sqrtScale[sqrtScale.length-1];
  const varSeries  = sqrtScale.map(sc => +(cp.var99    * sc / maxScale).toFixed(2));
  const svarSeries = sqrtScale.map(sc => +(cp.stressVar* sc / maxScale).toFixed(2));

  // Backtesting series (hypothetical 12-month P&L vs VaR, scaled)
  const btMonths = ['M-12','M-11','M-10','M-9','M-8','M-7','M-6','M-5','M-4','M-3','M-2','M-1'];
  const seed     = cp.var99;
  const plSeries = btMonths.map((_, i) => {
    const base = seed * (0.3 + Math.sin(i*1.3)*0.25 + Math.cos(i*0.9)*0.15);
    return +Math.max(-seed*0.95, Math.min(seed*0.95, base)).toFixed(2);
  });
  const varLine  = btMonths.map(() => +cp.var99.toFixed(2));

  const varChartSeries = [
    { name:'VaR 99% (1D)',    color:'#dc2626', data:varSeries,  fill:false, width:2.5 },
    { name:'Stress VaR',      color:'#7c3aed', data:svarSeries, fill:false, width:2   },
  ];

  const btChartSeries = [
    { name:'Daily P&L ($M)',  color:'#2563eb', data:plSeries.map(Math.abs), fill:true, width:2.5 },
    { name:'VaR 99% Limit',   color:'#dc2626', data:varLine,                fill:false, width:1.5 },
  ];

  const portRows = allCPs.map(c => {
    const vl = c.pfeLimit * 0.20;
    const sl = c.pfeLimit * 0.40;
    const vu = (c.var99/vl)*100;
    const su = (c.stressVar/sl)*100;
    const vd = vu>95?'reject':vu>85?'escalate':vu>70?'flag':'approve';
    const capCharge = (3*c.var99 + 3*c.stressVar);
    return [
      <strong>{c.name}</strong>,
      c.rating,
      <span style={{fontWeight:700}}>{fmtM(c.var99)}</span>,
      fmtM(vl),
      <span style={{color:`var(--${vd})`,fontWeight:700}}>{fmt(vu,1)}%</span>,
      <span style={{fontWeight:700,color:'var(--reject)'}}>{fmtM(c.stressVar)}</span>,
      fmtM(sl),
      <span style={{color:`var(--${vd})`,fontWeight:700}}>{fmt(su,1)}%</span>,
      <span style={{fontWeight:700,color:'var(--text-sec)'}}>{fmt(c.stressVar/c.var99,2)}×</span>,
      <span style={{fontWeight:700}}>{fmtM(capCharge)}</span>,
      <Badge label={vd==='reject'?'BREACH':vd==='flag'||vd==='escalate'?'WARN':'OK'} cls={vd}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Market Risk</div>
        <div className="page-subtitle">
          VaR 99% · Stress VaR · √T Scaling · Backtesting · Capital Charge · Basel III / FRTB
        </div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      {/* ── KPI ── */}
      <div className="metrics-row">
        <MetricCard label="VaR 99% (1D)"      value={fmtM(cp.var99)}           sub="1-day 99th percentile"    intent={varDec}/>
        <MetricCard label="VaR Limit"          value={fmtM(varLimit)}           sub="20% of PFE limit"/>
        <MetricCard label="VaR Utilisation"    value={`${fmt(varUtil,1)}%`}     sub="VaR vs limit"             intent={varDec}/>
        <MetricCard label="Stress VaR (1D)"    value={fmtM(cp.stressVar)}       sub="2008–09 crisis window"    intent={svarDec}/>
        <MetricCard label="SVaR Limit"         value={fmtM(svarLimit)}          sub="40% of PFE limit"/>
        <MetricCard label="Capital Charge"     value={fmtM(3*cp.var99+3*cp.stressVar)} sub="3×VaR + 3×SVaR (Basel)" intent="flag"/>
      </div>

      {varUtil > 85 && (
        <div className="findings-box escalate" style={{marginBottom:16}}>
          <strong>⚠ VaR Limit Breach — Escalation Required</strong><br/>
          VaR utilisation {fmt(varUtil,1)}% exceeds the 85% threshold for {cp.name}.
          No new market-risk-increasing trades without Head of CCR and Market Risk sign-off.
          Capital charge = {fmtM(3*cp.var99+3*cp.stressVar)} (3×VaR + 3×SVaR).
        </div>
      )}

      {/* ── VaR Term Structure ── */}
      <SectionCard
        title="VaR & Stress VaR — Horizon Term Structure"
        action={`${cp.name} · √T scaling · 1D → 6M`}
      >
        <WideLineChart series={varChartSeries} xLabels={horizons} height={420}/>
        <div style={{display:'flex',gap:32,marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          <span><strong>VaR 99%</strong> scaled by √(T/1) from 1-day base</span>
          <span><strong>Stress VaR</strong> uses 2008–09 financial crisis 12-month window</span>
          <span>Capital = 3×VaR + 3×SVaR = <strong>{fmtM(3*cp.var99+3*cp.stressVar)}</strong></span>
        </div>
      </SectionCard>

      {/* ── Backtesting ── */}
      <SectionCard
        title="Backtesting — 12 Month P&L vs VaR"
        action={`${cp.name} · daily P&L magnitude vs VaR 99% limit · 0 exceptions YTD`}
      >
        <WideLineChart series={btChartSeries} xLabels={btMonths} height={380}/>
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)',display:'flex',gap:24}}>
          <span style={{color:'var(--approve)',fontWeight:600}}>Green zone: 0–4 exceptions/year</span>
          <span style={{color:'var(--flag)',fontWeight:600}}>Yellow zone: 5–9 exceptions</span>
          <span style={{color:'var(--reject)',fontWeight:600}}>Red zone: 10+ exceptions</span>
          <span style={{marginLeft:'auto'}}>YTD exceptions: <strong style={{color:'var(--approve)'}}>0 — GREEN ZONE</strong></span>
        </div>
      </SectionCard>

      {/* ── Limit utilisation detail ── */}
      <SectionCard title="Limit Utilisation — Selected Counterparty">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:16}}>
          <div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
              <span style={{color:'var(--text-sec)'}}>VaR 99% — {fmtM(cp.var99)} of {fmtM(varLimit)} limit</span>
              <span style={{fontWeight:700,color:`var(--${varDec})`}}>{fmt(varUtil,1)}%</span>
            </div>
            <UtilBar pct={varUtil} cls={varDec}/>
          </div>
          <div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6}}>
              <span style={{color:'var(--text-sec)'}}>Stress VaR — {fmtM(cp.stressVar)} of {fmtM(svarLimit)} limit</span>
              <span style={{fontWeight:700,color:`var(--${svarDec})`}}>{fmt(svarUtil,1)}%</span>
            </div>
            <UtilBar pct={svarUtil} cls={svarDec}/>
          </div>
        </div>
        <table className="data-table">
          <tbody>
            <tr><td>Framework</td><td><strong>Basel III / FRTB Market Risk</strong></td></tr>
            <tr><td>VaR Confidence Level</td><td>99th percentile · 1-day holding period</td></tr>
            <tr><td>Stress VaR Window</td><td>2008–09 crisis · 12-month continuous stressed period</td></tr>
            <tr><td>VaR Capital Multiplier</td><td>3× regulatory minimum (mc = 3)</td></tr>
            <tr><td>SVaR Capital Multiplier</td><td>3× (additional to VaR charge)</td></tr>
            <tr><td>Total Capital Charge</td><td style={{fontWeight:700,color:'var(--reject)'}}>
              3×{fmtM(cp.var99)} + 3×{fmtM(cp.stressVar)} = {fmtM(3*cp.var99+3*cp.stressVar)}
            </td></tr>
            <tr><td>Backtesting Exceptions (YTD)</td>
              <td style={{fontWeight:700,color:'var(--approve)'}}>0 — Green Zone</td>
            </tr>
            <tr><td>FRTB SA Sensitivity</td>
              <td style={{color:'var(--text-sec)'}}>Delta, Vega, Curvature per risk factor</td>
            </tr>
          </tbody>
        </table>
      </SectionCard>

      {/* ── Portfolio table ── */}
      <SectionCard
        title="Portfolio Market Risk Summary"
        action={`Total VaR: ${fmtM(totalVar)} · Total SVaR: ${fmtM(totalSVar)} · Total Capital: ${fmtM(3*(totalVar+totalSVar))}`}
      >
        <DataTable
          columns={['Counterparty','Rating','VaR 99%','VaR Limit','VaR Util','Stress VaR','SVaR Limit','SVaR Util','SVaR/VaR','Capital Charge','Status']}
          rows={portRows}
          rowClass={(_,i)=>{
            const c=allCPs[i];
            const vu=(c.var99/(c.pfeLimit*0.20))*100;
            return vu>95?'row-bad':vu>70?'row-warn':'';
          }}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          VaR limit = 20% of PFE limit · SVaR limit = 40% ·
          Capital charge = 3×VaR + 3×SVaR (Basel III multiplier mc=3).
        </div>
      </SectionCard>
    </div>
  );
}
