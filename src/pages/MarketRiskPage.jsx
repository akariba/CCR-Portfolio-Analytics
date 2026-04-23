import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, LineChart, CpSelector, Badge } from '../components/Shared';

function UtilBar({ pct, cls }) {
  return (
    <div style={{height:8,background:'var(--border)',borderRadius:4,overflow:'hidden'}}>
      <div style={{height:'100%',width:`${Math.min(pct,100)}%`,background:`var(--${cls})`,borderRadius:4,transition:'width .3s'}}/>
    </div>
  );
}

const fmt = (n,d=1)=>(parseFloat(n)||0).toFixed(d);

export default function MarketRiskPage({ cpId, setCpId }) {
  const cp  = COUNTERPARTIES[cpId];
  const s   = currentState(cp);
  const allCPs = Object.values(COUNTERPARTIES);

  const varLimit  = cp.pfeLimit * 0.20;
  const varUtil   = (cp.var99 / varLimit) * 100;
  const svarLimit = cp.pfeLimit * 0.40;
  const svarUtil  = (cp.stressVar / svarLimit) * 100;
  const varDec    = varUtil > 95 ? 'reject' : varUtil > 85 ? 'escalate' : varUtil > 70 ? 'flag' : 'approve';
  const svarDec   = svarUtil > 95 ? 'reject' : svarUtil > 85 ? 'escalate' : svarUtil > 70 ? 'flag' : 'approve';

  const totalVar   = allCPs.reduce((a,c)=>a+c.var99, 0);
  const totalSVar  = allCPs.reduce((a,c)=>a+c.stressVar, 0);

  // Simulated VaR term structure (scaling from var99)
  const tenors   = ['1D','5D','10D','1M','3M','6M'];
  const scalars  = [1, 2.24, 3.16, 4.47, 7.75, 11.0];
  const varSeries = scalars.map(s=> +(cp.var99 * s / 11.0).toFixed(1));
  const svarSeries= scalars.map(s=> +(cp.stressVar * s / 11.0).toFixed(1));

  const series = [
    {name:'VaR 99%',       color:'var(--c-pfe)', data:varSeries,  fill:false},
    {name:'Stress VaR',    color:'var(--reject)', data:svarSeries, fill:false},
  ];

  const portRows = allCPs.map(c=>{
    const vl = c.pfeLimit * 0.20;
    const sl = c.pfeLimit * 0.40;
    const vu = (c.var99/vl)*100;
    const su = (c.stressVar/sl)*100;
    const vd = vu>95?'reject':vu>85?'escalate':vu>70?'flag':'approve';
    const sd = su>95?'reject':su>85?'escalate':su>70?'flag':'approve';
    return [
      <strong>{c.name}</strong>,
      c.rating,
      <span style={{fontWeight:700}}>${fmt(c.var99)}M</span>,
      `$${fmt(vl)}M`,
      <span style={{color:`var(--${vd})`,fontWeight:700}}>{fmt(vu,1)}%</span>,
      <span style={{fontWeight:700,color:'var(--reject)'}}>${fmt(c.stressVar)}M</span>,
      `$${fmt(sl)}M`,
      <span style={{color:`var(--${sd})`,fontWeight:700}}>{fmt(su,1)}%</span>,
      <span style={{fontWeight:700,color:'var(--text-sec)'}}>{fmt(c.stressVar/c.var99,2)}×</span>,
      <Badge label={vd==='reject'?'BREACH':vd==='flag'||vd==='escalate'?'WARN':'OK'} cls={vd}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Market Risk</div>
        <div className="page-subtitle">VaR 99% · Stress VaR · Backtesting · Limit Monitoring</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="VaR 99% (1D)"     value={`$${fmt(cp.var99)}M`}      sub="1-day 99th percentile loss" intent={varDec}/>
        <MetricCard label="VaR Limit"         value={`$${fmt(varLimit)}M`}      sub="20% of PFE limit"/>
        <MetricCard label="VaR Utilisation"   value={`${fmt(varUtil,1)}%`}      sub="VaR vs limit" intent={varDec}/>
        <MetricCard label="Stress VaR"        value={`$${fmt(cp.stressVar)}M`}  sub="stressed market scenario" intent={svarDec}/>
        <MetricCard label="SVaR Limit"        value={`$${fmt(svarLimit)}M`}     sub="40% of PFE limit"/>
        <MetricCard label="SVaR / VaR Ratio"  value={`${fmt(cp.stressVar/cp.var99,2)}×`} sub="stress multiplier"/>
      </div>

      {varUtil > 85 && (
        <div className="findings-box escalate" style={{marginBottom:16}}>
          <strong>⚠ VaR Limit Breach — Escalation Required</strong><br/>
          VaR utilisation of {fmt(varUtil,1)}% exceeds the 85% warning threshold.
          No new market-risk-increasing trades without Head of CCR sign-off.
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <SectionCard title="VaR vs Stress VaR Profile">
          <LineChart series={series} xLabels={tenors} height={180}/>
          <div style={{fontSize:11,color:'var(--text-sec)',marginTop:8}}>
            VaR scaled over horizon · Stress VaR uses 2008–09 crisis window
          </div>
        </SectionCard>

        <SectionCard title="Limit Utilisation — Selected Counterparty">
          <div style={{padding:'4px 0 12px'}}>
            <div style={{fontSize:11,color:'var(--text-sec)',marginBottom:6}}>VaR 99% — ${fmt(cp.var99)}M of ${fmt(varLimit)}M limit</div>
            <UtilBar pct={varUtil} cls={varDec}/>
            <div style={{fontSize:11,color:'var(--text-sec)',marginTop:10,marginBottom:6}}>Stress VaR — ${fmt(cp.stressVar)}M of ${fmt(svarLimit)}M limit</div>
            <UtilBar pct={svarUtil} cls={svarDec}/>
          </div>
          <table className="data-table" style={{marginTop:8}}>
            <tbody>
              <tr><td>VaR 99% (1D)</td><td className="num"><strong>${fmt(cp.var99)}M</strong></td></tr>
              <tr><td>VaR Limit</td><td className="num">${fmt(varLimit)}M</td></tr>
              <tr><td>VaR Utilisation</td><td className="num" style={{color:`var(--${varDec})`,fontWeight:700}}>{fmt(varUtil,1)}%</td></tr>
              <tr><td>Stress VaR</td><td className="num"><strong style={{color:'var(--reject)'}}>${fmt(cp.stressVar)}M</strong></td></tr>
              <tr><td>SVaR Limit</td><td className="num">${fmt(svarLimit)}M</td></tr>
              <tr><td>SVaR Utilisation</td><td className="num" style={{color:`var(--${svarDec})`,fontWeight:700}}>{fmt(svarUtil,1)}%</td></tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td>Stress Multiplier</td><td className="num" style={{fontWeight:700}}>{fmt(cp.stressVar/cp.var99,2)}×</td>
              </tr>
            </tbody>
          </table>
        </SectionCard>
      </div>

      <SectionCard title="Market Risk — Regulatory Context">
        <table className="data-table">
          <tbody>
            <tr><td>Framework</td><td><strong>Basel III / FRTB Market Risk Rule</strong></td></tr>
            <tr><td>VaR Confidence Level</td><td>99th percentile, 1-day holding period</td></tr>
            <tr><td>Stress VaR Window</td><td>2008–09 financial crisis (12-month lookback)</td></tr>
            <tr><td>VaR Capital Multiplier</td><td>3× (regulatory minimum)</td></tr>
            <tr><td>SVaR Capital Multiplier</td><td>3× (additional to VaR charge)</td></tr>
            <tr><td>Backtesting Exceptions (YTD)</td><td style={{fontWeight:700,color:cp.var99>15?'var(--flag)':'inherit'}}>0 exceptions — Green zone</td></tr>
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Portfolio Market Risk Summary" action={`Total VaR: $${fmt(totalVar)}M · Total SVaR: $${fmt(totalSVar)}M`}>
        <DataTable
          columns={['Counterparty','Rating','VaR 99%','VaR Limit','VaR Util','Stress VaR','SVaR Limit','SVaR Util','SVaR/VaR','Status']}
          rows={portRows}
          rowClass={(r,i)=>{
            const c=allCPs[i];
            const vu=(c.var99/(c.pfeLimit*0.20))*100;
            return vu>95?'row-bad':vu>70?'row-warn':'';
          }}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          VaR limit = 20% of PFE limit · SVaR limit = 40% of PFE limit.
          Capital charge = 3 × (VaR + SVaR).
        </div>
      </SectionCard>
    </div>
  );
}
