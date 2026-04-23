import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { MetricCard, SectionCard, DataTable, CpSelector, Badge } from '../components/Shared';

const fmt = (n,d=2)=>(parseFloat(n)||0).toFixed(d);

export default function CreditRiskPage({ cpId, setCpId }) {
  const cp = COUNTERPARTIES[cpId];

  const jtdUtil = (cp.jtd / cp.jtdLimit) * 100;
  const jtdDec  = jtdUtil>85?'reject':jtdUtil>70?'flag':'approve';
  const wwrColor = cp.wwr==='HIGH'?'var(--reject)':cp.wwr==='MEDIUM'?'var(--flag)':'var(--approve)';
  const pd5yRaw = (1 - Math.exp(-cp.lambda * 5)) * 100;
  const pd1yRaw = (1 - Math.exp(-cp.lambda))     * 100;

  const allCPs = Object.values(COUNTERPARTIES);

  const wwrRows = allCPs.map(c=>[
    <strong>{c.name}</strong>,
    c.rating,
    <span style={{fontWeight:700}}>{c.cdsSpread} bps</span>,
    <span style={{fontWeight:700}}>{fmt(c.pd1y)}%</span>,
    `${(c.lgd*100).toFixed(0)}%`,
    <span style={{
      fontWeight:700,
      color:c.wwr==='HIGH'?'var(--reject)':c.wwr==='MEDIUM'?'var(--flag)':'var(--approve)'
    }}>{c.wwr}</span>,
    fmt(c.wwr_rho,2),
    <span style={{color:c.wwr==='HIGH'?'var(--reject)':c.wwr==='MEDIUM'?'var(--flag)':'var(--approve)',fontWeight:700}}>
      {(1 + c.wwr_rho*(c.wwr==='HIGH'?0.30:c.wwr==='MEDIUM'?0.10:0)).toFixed(3)}×
    </span>,
    <Badge label={c.wwr} cls={c.wwr==='HIGH'?'reject':c.wwr==='MEDIUM'?'flag':'approve'}/>,
  ]);

  const jtdRows = allCPs.map(c=>{
    const u = (c.jtd/c.jtdLimit)*100;
    const d = u>85?'reject':u>70?'flag':'approve';
    return [
      <strong>{c.name}</strong>, c.rating,
      `$${c.fairValue}M`,
      <strong style={{color:d==='reject'?'var(--reject)':d==='flag'?'var(--flag)':'var(--approve)'}}>${c.jtd}M</strong>,
      `$${c.jtdLimit}M`,
      <span style={{color:d==='reject'?'var(--reject)':d==='flag'?'var(--flag)':'var(--approve)',fontWeight:700}}>{fmt(u,1)}%</span>,
      <span style={{color:`${u>=85?'var(--reject)':u>=70?'var(--flag)':'var(--approve)'}`}}>${(c.jtdLimit-c.jtd).toFixed(1)}M</span>,
      <Badge label={d==='reject'?'BREACH':d==='flag'?'WARN':'OK'} cls={d}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Credit Risk Analytics</div>
        <div className="page-subtitle">Jump-to-Default · Wrong-Way Risk · Credit Quality Indicators</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="CDS Spread"      value={`${cp.cdsSpread} bps`}   sub="market-implied credit cost"/>
        <MetricCard label="PD (1Y)"         value={`${fmt(pd1yRaw)}%`}       sub="1-year default probability"/>
        <MetricCard label="PD (5Y)"         value={`${fmt(pd5yRaw)}%`}       sub="5-year default probability" intent={pd5yRaw>10?'reject':pd5yRaw>5?'flag':''}/>
        <MetricCard label="LGD"             value={`${(cp.lgd*100).toFixed(0)}%`} sub="loss given default"/>
        <MetricCard label="Hazard Rate λ"   value={fmt(cp.lambda,4)}          sub="annualised default intensity"/>
        <MetricCard label="WWR Rating"      value={cp.wwr}                   sub={`ρ = ${cp.wwr_rho}`} intent={cp.wwr==='HIGH'?'reject':cp.wwr==='MEDIUM'?'flag':''}/>
      </div>

      {cp.wwr === 'HIGH' && (
        <div className="findings-box reject" style={{marginBottom:16}}>
          <strong>⚠ HIGH Wrong-Way Risk Alert</strong><br/>
          Exposure and credit quality are highly correlated (ρ = {cp.wwr_rho}).
          When {cp.name} credit deteriorates, our exposure rises simultaneously.
          WWR amplification factor: ×{(1+cp.wwr_rho*0.30).toFixed(3)}.
          All new trades require Head of CCR sign-off.
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <SectionCard title="Credit Quality — Selected Counterparty">
          <table className="data-table">
            <tbody>
              <tr><td>Counterparty</td><td><strong>{cp.name}</strong></td></tr>
              <tr><td>Rating</td><td><strong>{cp.rating}</strong></td></tr>
              <tr><td>CDS Spread</td><td style={{fontWeight:700}}>{cp.cdsSpread} bps</td></tr>
              <tr><td>Hazard Rate (λ)</td><td>{fmt(cp.lambda,5)}</td></tr>
              <tr><td>LGD</td><td>{(cp.lgd*100).toFixed(0)}%</td></tr>
              <tr><td>PD (1Y)</td><td style={{color:pd1yRaw>3?'var(--flag)':'inherit',fontWeight:600}}>{fmt(pd1yRaw)}%</td></tr>
              <tr><td>PD (5Y)</td><td style={{color:pd5yRaw>10?'var(--reject)':pd5yRaw>5?'var(--flag)':'inherit',fontWeight:600}}>{fmt(pd5yRaw)}%</td></tr>
              <tr><td>Expected Loss (1Y)</td><td style={{color:'var(--reject)',fontWeight:600}}>${fmt(cp.currentPFE * (pd1yRaw/100) * cp.lgd)}M</td></tr>
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Jump-to-Default — Selected Counterparty">
          <table className="data-table">
            <tbody>
              <tr><td>Fair Value at Default</td><td style={{fontWeight:700}}>${cp.fairValue}M</td></tr>
              <tr><td>LGD</td><td>{(cp.lgd*100).toFixed(0)}%</td></tr>
              <tr><td>JTD Loss Estimate</td><td style={{fontWeight:700,color:jtdDec==='reject'?'var(--reject)':jtdDec==='flag'?'var(--flag)':'inherit'}}>${cp.jtd}M</td></tr>
              <tr><td>JTD Limit</td><td>${cp.jtdLimit}M</td></tr>
              <tr><td>JTD Utilisation</td><td style={{fontWeight:700,color:jtdDec==='reject'?'var(--reject)':jtdDec==='flag'?'var(--flag)':'var(--approve)'}}>{fmt(jtdUtil,1)}%</td></tr>
              <tr><td>JTD Headroom</td><td style={{color:jtdDec!=='approve'?'var(--reject)':'inherit'}}>${(cp.jtdLimit-cp.jtd).toFixed(1)}M</td></tr>
              <tr><td>Status</td><td><Badge label={jtdDec==='reject'?'BREACH':jtdDec==='flag'?'WARN':'OK'} cls={jtdDec}/></td></tr>
            </tbody>
          </table>
        </SectionCard>
      </div>

      <SectionCard title="Wrong-Way Risk — Portfolio Summary" action="Exposure × Credit correlation">
        <DataTable
          columns={['Counterparty','Rating','CDS Spread','PD(1Y)','LGD','WWR Rating','ρ Correlation','Amplification','Status']}
          rows={wwrRows}
          rowClass={(r,i)=>{
            const c=allCPs[i];
            return c.wwr==='HIGH'?'row-bad':c.wwr==='MEDIUM'?'row-warn':'';
          }}
        />
      </SectionCard>

      <SectionCard title="Jump-to-Default — Portfolio Summary" action="FV at default vs JTD limit">
        <DataTable
          columns={['Counterparty','Rating','Fair Value','JTD Estimate','JTD Limit','Utilisation','Headroom','Status']}
          rows={jtdRows}
          rowClass={(r,i)=>{const u=(allCPs[i].jtd/allCPs[i].jtdLimit)*100; return u>85?'row-bad':u>70?'row-warn':'';}}
        />
      </SectionCard>
    </div>
  );
}
