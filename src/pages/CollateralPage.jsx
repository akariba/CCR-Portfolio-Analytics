import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, CpSelector, Badge } from '../components/Shared';

const fmt = (n,d=1)=>(parseFloat(n)||0).toFixed(d);

export default function CollateralPage({ cpId, setCpId }) {
  const cp  = COUNTERPARTIES[cpId];
  const col = cp.collateral;
  const csa = cp.csa;
  const s   = currentState(cp);

  const adjCollateral   = col.posted * (1 - col.haircut);
  const netExposure     = Math.max(s.effPFE - adjCollateral, 0);
  const collatEfficacy  = Math.min(adjCollateral / s.effPFE * 100, 100);
  const allCPs          = Object.values(COUNTERPARTIES);

  const portRows = allCPs.map(c=>{
    const col2 = c.collateral;
    const st   = currentState(c);
    const adj  = col2.posted * (1 - col2.haircut);
    const net  = Math.max(st.effPFE - adj, 0);
    return [
      <strong>{c.name}</strong>,
      c.csa.type,
      `$${fmt(col2.posted)}M`,
      `${(col2.haircut*100).toFixed(0)}%`,
      <strong>${fmt(adj)}M</strong>,
      `$${fmt(col2.received)}M`,
      `$${fmt(st.effPFE)}M`,
      <strong style={{color:net>st.effPFE*0.5?'var(--reject)':'var(--approve)'}}>${fmt(net)}M</strong>,
      <Badge label={c.csa.type==='One-Way'?'ONE-WAY':'BILATERAL'} cls={c.csa.type==='One-Way'?'flag':'approve'}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Collateral & Haircut Analysis</div>
        <div className="page-subtitle">CSA structure · Collateral mitigation · Haircut-adjusted net exposure</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="CSA Type"            value={csa.type}               sub={csa.law} intent={csa.type==='One-Way'?'flag':''}/>
        <MetricCard label="Collateral Received" value={`$${fmt(col.posted)}M`} sub="held from counterparty"/>
        <MetricCard label="Haircut Applied"     value={`${(col.haircut*100).toFixed(0)}%`} sub="stressed discount"/>
        <MetricCard label="Adj. Collateral"     value={`$${fmt(adjCollateral)}M`} sub="post-haircut value" intent="approve"/>
        <MetricCard label="Net Exposure"        value={`$${fmt(netExposure)}M`}  sub="PFE minus adj. collateral" intent={netExposure>30?'reject':netExposure>15?'flag':'approve'}/>
        <MetricCard label="Collateral Coverage" value={`${fmt(collatEfficacy,0)}%`} sub="of effective PFE"/>
      </div>

      {csa.type==='One-Way' && (
        <div className="findings-box flag" style={{marginBottom:16}}>
          <strong>⚠ One-Way CSA — Elevated Risk</strong><br/>
          {cp.name} does not post collateral to us. We receive no margin protection.
          A higher capital charge applies to this counterparty. Legal should be engaged to renegotiate terms.
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <SectionCard title="CSA Terms">
          <table className="data-table">
            <tbody>
              <tr><td>Agreement Type</td><td><strong>ISDA 2002 Master Agreement</strong></td></tr>
              <tr><td>CSA Type</td><td><strong>{csa.type}</strong></td></tr>
              <tr><td>Threshold</td><td>${csa.threshold}M — below this, no margin call</td></tr>
              <tr><td>Minimum Transfer Amount</td><td>${csa.mta}M</td></tr>
              <tr><td>Governing Law</td><td>{csa.law}</td></tr>
              <tr><td>Capital Cost Flag</td><td>
                <Badge label={csa.capitalFlag?'FLAGGED':'CLEAR'} cls={csa.capitalFlag?'escalate':'approve'}/>
                {csa.capitalFlag && <span style={{marginLeft:8,fontSize:11,color:'var(--text-sec)'}}>Elevated RWA</span>}
              </td></tr>
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Haircut Computation">
          <table className="data-table">
            <tbody>
              <tr><td>Gross Collateral (posted to us)</td><td className="num"><strong>${fmt(col.posted)}M</strong></td></tr>
              <tr><td>Haircut</td><td className="num">{(col.haircut*100).toFixed(0)}%</td></tr>
              <tr><td>Haircut Amount</td><td className="num" style={{color:'var(--reject)'}}>−${fmt(col.posted*col.haircut)}M</td></tr>
              <tr><td>Adjusted Collateral Value</td><td className="num"><strong style={{color:'var(--approve)'}}>${fmt(adjCollateral)}M</strong></td></tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td>Effective PFE</td><td className="num">${fmt(s.effPFE)}M</td>
              </tr>
              <tr><td>Collateral Offset</td><td className="num" style={{color:'var(--approve)'}}>−${fmt(adjCollateral)}M</td></tr>
              <tr><td>We Post to Counterparty</td><td className="num" style={{color:'var(--reject)'}}>+${fmt(col.received)}M</td></tr>
              <tr><td><strong>Net Exposure</strong></td>
                <td className="num"><strong style={{color:netExposure>30?'var(--reject)':'var(--text)'}}>${fmt(netExposure)}M</strong></td></tr>
            </tbody>
          </table>
          <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)',lineHeight:1.6,background:'var(--surface2)',padding:'8px 10px',borderRadius:4}}>
            Collateral Value: ${fmt(col.posted)}M &nbsp;·&nbsp; Haircut: {(col.haircut*100).toFixed(0)}% &nbsp;·&nbsp;
            Adjusted: ${fmt(adjCollateral)}M &nbsp;·&nbsp; Net Exposure: ${fmt(netExposure)}M
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Portfolio Collateral Summary" action="All counterparties · net exposure after haircut">
        <DataTable
          columns={['Counterparty','CSA Type','Coll. Received','Haircut','Adj. Collateral','We Posted','Eff. PFE','Net Exposure','CSA Flag']}
          rows={portRows}
          rowClass={(r,i)=>{
            const c=allCPs[i];
            return c.csa.type==='One-Way'?'row-warn':'';
          }}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          Haircuts represent stressed collateral discounts per Basel III requirements.
          Net exposure = Effective PFE − Adjusted Collateral (+ amounts we have posted).
        </div>
      </SectionCard>
    </div>
  );
}
