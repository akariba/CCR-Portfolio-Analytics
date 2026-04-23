import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { computeCVA, computePortfolioCVA } from '../state/cvaModel';
import { MetricCard, SectionCard, DataTable, LineChart, CpSelector, Badge } from '../components/Shared';

const fmt  = (n,d=2)=>(parseFloat(n)||0).toFixed(d);
const fmt1 = (n)   =>(parseFloat(n)||0).toFixed(1);

export default function CVAPage({ cpId, setCpId }) {
  const cp  = COUNTERPARTIES[cpId];
  const res = computeCVA(cp);
  const allCPs = Object.values(COUNTERPARTIES);
  const portCVA = computePortfolioCVA(COUNTERPARTIES);
  const totalCVA = portCVA.reduce((a,r)=>a+r.cva, 0);

  const eeData   = cp.ee;
  const cvaContribs = res.buckets.map(b=>parseFloat(b.contrib)*10);
  const survData = res.buckets.map(b=>parseFloat(b.survPct));

  const series = [
    {name:'EE ($M)',       color:'var(--c-ee)',   data:eeData,       fill:true},
    {name:'CVA contrib×10',color:'var(--c-pfe)',  data:cvaContribs,  fill:false},
  ];

  const bucketRows = res.buckets.map(b=>[
    <strong>{b.tenor}</strong>,
    `${b.t}Y`,
    `$${b.ee}M`,
    `${b.survPct}%`,
    `${b.pdPct}%`,
    b.df,
    b.lgd,
    <span style={{color:'var(--reject)',fontWeight:700}}>${b.contrib}M</span>,
    <strong style={{color:'var(--reject)'}}>${b.cumCVA}M</strong>,
  ]);

  const portRows = portCVA.map(r=>{
    const c = COUNTERPARTIES[r.id];
    const cvaShare = parseFloat(r.cvaShare);
    const d = cvaShare>15?'reject':cvaShare>10?'flag':'approve';
    return [
      <strong>{r.name}</strong>,
      c.rating,
      `${c.cdsSpread} bps`,
      `${(c.lgd*100).toFixed(0)}%`,
      `$${fmt1(r.rfValue)}M`,
      <strong style={{color:'var(--reject)'}}>${fmt(r.cva)}M</strong>,
      <strong style={{color:(r.adjValue)>=0?'var(--approve)':'var(--reject)'}}>${fmt1(r.adjValue)}M</strong>,
      <span style={{color:`var(--${d})`,fontWeight:700}}>{r.cvaShare}%</span>,
      <Badge label={d==='reject'?'HIGH':d==='flag'?'MED':'LOW'} cls={d}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">CVA Pricing</div>
        <div className="page-subtitle">Credit Valuation Adjustment · Hazard Rate Model · CVA = LGD × Σ EE(tᵢ) × [S(tᵢ₋₁) − S(tᵢ)] × DF(tᵢ)</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="Risk-Free Value"  value={`$${fmt1(res.rfValue)}M`}   sub="MTM before credit adj."/>
        <MetricCard label="CVA"              value={`−$${fmt(res.cva)}M`}       sub="credit valuation adj." intent="reject"/>
        <MetricCard label="Adj. Value"       value={`$${fmt1(res.adjValue)}M`}  sub="RF Value − CVA"       intent={res.adjValue>=0?'approve':'reject'}/>
        <MetricCard label="CDS Spread"       value={`${res.cdsSpread} bps`}     sub="market-implied credit cost"/>
        <MetricCard label="Hazard Rate λ"    value={fmt(res.lambda,5)}          sub="default intensity p.a."/>
        <MetricCard label="CVA Rate"         value={`${fmt(res.cvaRate,2)}%`}   sub="CVA as % of PFE"      intent={res.cvaRate>15?'reject':res.cvaRate>10?'flag':'approve'}/>
      </div>

      {res.cva > cp.fairValue * 0.20 && (
        <div className="findings-box flag" style={{marginBottom:16}}>
          <strong>⚠ Elevated CVA — Review Required</strong><br/>
          CVA of ${fmt(res.cva)}M represents {fmt(res.cva/cp.fairValue*100,0)}% of gross fair value.
          Driven by high CDS spread ({res.cdsSpread} bps) and high EE at peak tenor.
          CVA desk review required before increasing exposure.
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <SectionCard title="CVA Model Inputs & Output">
          <table className="data-table">
            <tbody>
              <tr><td>Counterparty</td><td><strong>{cp.name}</strong></td></tr>
              <tr><td>Rating</td><td>{cp.rating}</td></tr>
              <tr><td>CDS Spread</td><td style={{fontWeight:700}}>{res.cdsSpread} bps</td></tr>
              <tr><td>LGD</td><td>{(res.lgd*100).toFixed(0)}%</td></tr>
              <tr><td>Hazard Rate λ = CDS / (1−LGD)</td><td style={{fontWeight:700}}>{fmt(res.lambda,5)}</td></tr>
              <tr><td>S(1Y) — Survival Probability</td><td>{fmt(Math.exp(-res.lambda*1)*100,2)}%</td></tr>
              <tr><td>S(5Y) — Survival Probability</td><td>{fmt(Math.exp(-res.lambda*5)*100,2)}%</td></tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td>Risk-Free Value</td><td style={{fontWeight:700}}>${fmt1(res.rfValue)}M</td>
              </tr>
              <tr>
                <td>CVA</td>
                <td style={{fontWeight:700,color:'var(--reject)'}}>${fmt(res.cva)}M</td>
              </tr>
              <tr>
                <td><strong>Adjusted Value</strong></td>
                <td><strong style={{color:res.adjValue>=0?'var(--approve)':'var(--reject)'}}>${fmt1(res.adjValue)}M</strong></td>
              </tr>
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="EE Profile & CVA Contribution">
          <LineChart series={series} xLabels={cp.tenors} height={180}/>
          <div style={{fontSize:11,color:'var(--text-sec)',marginTop:8}}>
            EE = Expected Exposure ($M) · CVA contrib scaled ×10 for visibility ·
            CVA = LGD × Σ EEᵢ × marginalPDᵢ × DFᵢ
          </div>
        </SectionCard>
      </div>

      <SectionCard title="CVA Bucket Decomposition" action="Per-tenor CVA contribution">
        <DataTable
          columns={['Tenor','t (Y)','EE ($M)','Surv. Prob','Marginal PD','DF(t)','LGD','CVA Contrib','Cumul. CVA']}
          rows={bucketRows}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)',lineHeight:1.6}}>
          Marginal PD = S(t₋₁) − S(t) where S(t) = exp(−λt) ·
          CVA Contrib = LGD × EE × PD × DF ·
          Total CVA = ${fmt(res.cva)}M
        </div>
      </SectionCard>

      <SectionCard title="Portfolio CVA Summary" action={`Total portfolio CVA: $${fmt(totalCVA)}M`}>
        <DataTable
          columns={['Counterparty','Rating','CDS Spread','LGD','RF Value','CVA','Adj. Value','CVA Share','Risk Level']}
          rows={portRows}
          rowClass={(r,i)=>{
            const cvaShare = parseFloat(portCVA[i].cvaShare);
            return cvaShare>15?'row-bad':cvaShare>10?'row-warn':'';
          }}
        />
        <div style={{marginTop:10,padding:'8px 12px',background:'var(--surface2)',borderRadius:4,fontSize:11,display:'flex',gap:24}}>
          <span style={{color:'var(--text-sec)'}}>Portfolio —</span>
          <span>Total CVA: <strong style={{color:'var(--reject)'}}>${fmt(totalCVA)}M</strong></span>
          <span>Total RF Value: <strong>${fmt1(portCVA.reduce((a,r)=>a+r.rfValue,0))}M</strong></span>
          <span>Total Adj Value: <strong style={{color:'var(--approve)'}}>${fmt1(portCVA.reduce((a,r)=>a+r.adjValue,0))}M</strong></span>
        </div>
      </SectionCard>
    </div>
  );
}
