import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { currentState } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, CpSelector, Badge } from '../components/Shared';

const fmt = (n,d=1)=>(parseFloat(n)||0).toFixed(d);
const fmtSgn = (n,d=2)=>{ const v=(parseFloat(n)||0).toFixed(d); return n>=0?'+'+v:v; };

function PLBar({ label, value, max, color }) {
  const pct = Math.min(Math.abs(value)/Math.abs(max)*100, 100);
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:3}}>
        <span style={{color:'var(--text-sec)'}}>{label}</span>
        <span style={{fontWeight:700,color:value<0?'var(--reject)':'var(--approve)'}}>{fmtSgn(value)}M</span>
      </div>
      <div style={{height:8,background:'var(--border)',borderRadius:4,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:color||'var(--accent)',borderRadius:4,transition:'width .3s'}}/>
      </div>
    </div>
  );
}

export default function PLPage({ cpId, setCpId }) {
  const cp  = COUNTERPARTIES[cpId];
  const pl  = cp.pl;
  const allCPs = Object.values(COUNTERPARTIES);

  const totalPL = pl.market + pl.carry + pl.residual;
  const plDec   = totalPL < 0 ? 'reject' : totalPL > 2 ? 'approve' : 'flag';

  const portTotalMkt  = allCPs.reduce((a,c)=>a+c.pl.market,0);
  const portTotalCar  = allCPs.reduce((a,c)=>a+c.pl.carry,0);
  const portTotalRes  = allCPs.reduce((a,c)=>a+c.pl.residual,0);
  const portTotalPL   = portTotalMkt + portTotalCar + portTotalRes;

  const maxAbs = Math.max(...allCPs.map(c=>Math.abs(c.pl.market+c.pl.carry+c.pl.residual)), 1);

  const portRows = allCPs.map(c=>{
    const tot = c.pl.market + c.pl.carry + c.pl.residual;
    const d   = tot < 0 ? 'reject' : tot > 2 ? 'approve' : 'flag';
    return [
      <strong>{c.name}</strong>,
      c.rating,
      <span style={{color:c.pl.market>=0?'var(--approve)':'var(--reject)',fontWeight:700}}>{fmtSgn(c.pl.market)}M</span>,
      <span style={{color:c.pl.carry>=0?'var(--approve)':'var(--reject)',fontWeight:700}}>{fmtSgn(c.pl.carry)}M</span>,
      <span style={{color:c.pl.residual>=0?'var(--approve)':'var(--reject)',fontWeight:700}}>{fmtSgn(c.pl.residual)}M</span>,
      <strong style={{color:d==='reject'?'var(--reject)':d==='approve'?'var(--approve)':'var(--flag)'}}>{fmtSgn(tot)}M</strong>,
      `$${fmt(c.cva)}M`,
      <strong style={{color:(tot-c.cva)>=0?'var(--approve)':'var(--reject)'}}>{fmtSgn(tot-c.cva)}M</strong>,
      <Badge label={d==='reject'?'LOSS':d==='approve'?'PROFIT':'FLAT'} cls={d}/>,
    ];
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">P&L Attribution</div>
        <div className="page-subtitle">Market P&L · Carry · Residual · CVA Impact</div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      <div className="metrics-row">
        <MetricCard label="Market P&L"    value={`${fmtSgn(pl.market)}M`}           sub="MTM change"      intent={pl.market>=0?'approve':'reject'}/>
        <MetricCard label="Carry"         value={`${fmtSgn(pl.carry)}M`}            sub="accrual P&L"     intent={pl.carry>=0?'approve':'reject'}/>
        <MetricCard label="Residual"      value={`${fmtSgn(pl.residual)}M`}         sub="unexplained"     intent={Math.abs(pl.residual)>1?'flag':'approve'}/>
        <MetricCard label="Total P&L"     value={`${fmtSgn(totalPL)}M`}             sub="daily attribution" intent={plDec}/>
        <MetricCard label="CVA Charge"    value={`−$${fmt(cp.cva)}M`}               sub="credit valuation adj." intent="flag"/>
        <MetricCard label="P&L net CVA"   value={`${fmtSgn(totalPL-cp.cva)}M`}     sub="after CVA cost"  intent={(totalPL-cp.cva)>=0?'approve':'reject'}/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <SectionCard title="P&L Attribution — Selected Counterparty">
          <div style={{padding:'8px 0'}}>
            <PLBar label="Market P&L (MTM)"  value={pl.market}   max={4} color="var(--approve)"/>
            <PLBar label="Carry (Accrual)"   value={pl.carry}    max={4} color="var(--accent)"/>
            <PLBar label="Residual"          value={pl.residual} max={4} color={Math.abs(pl.residual)>0.5?'var(--flag)':'var(--muted)'}/>
          </div>
          <table className="data-table" style={{marginTop:4}}>
            <tbody>
              <tr><td>Market P&L</td><td className="num" style={{color:pl.market>=0?'var(--approve)':'var(--reject)',fontWeight:700}}>{fmtSgn(pl.market)}M</td></tr>
              <tr><td>Carry</td><td className="num" style={{color:pl.carry>=0?'var(--approve)':'var(--reject)',fontWeight:700}}>{fmtSgn(pl.carry)}M</td></tr>
              <tr><td>Residual</td><td className="num" style={{color:Math.abs(pl.residual)>0.5?'var(--flag)':'inherit',fontWeight:700}}>{fmtSgn(pl.residual)}M</td></tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td><strong>Total P&L</strong></td>
                <td className="num"><strong style={{color:plDec==='approve'?'var(--approve)':plDec==='reject'?'var(--reject)':'var(--flag)'}}>{fmtSgn(totalPL)}M</strong></td>
              </tr>
              <tr><td>CVA Charge</td><td className="num" style={{color:'var(--reject)'}}>{fmtSgn(-cp.cva)}M</td></tr>
              <tr><td><strong>Net of CVA</strong></td><td className="num"><strong style={{color:(totalPL-cp.cva)>=0?'var(--approve)':'var(--reject)'}}>{fmtSgn(totalPL-cp.cva)}M</strong></td></tr>
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Attribution Methodology">
          <table className="data-table">
            <tbody>
              <tr><td>Market P&L</td><td>Change in MTM fair value from market moves (rates, FX, credit)</td></tr>
              <tr><td>Carry / Theta</td><td>P&L from passage of time — accrual and theta decay</td></tr>
              <tr><td>Residual</td><td>Unexplained difference vs prior-day VaR estimate (IPV gap)</td></tr>
              <tr><td>CVA P&L</td><td>Daily change in Credit Valuation Adjustment (CVA). Market-standard deduction from gross P&L.</td></tr>
              <tr><td>Residual Threshold</td><td>
                <span style={{color:Math.abs(pl.residual)>1?'var(--reject)':Math.abs(pl.residual)>0.5?'var(--flag)':'var(--approve)',fontWeight:700}}>
                  {Math.abs(pl.residual)>1?'BREACH':'WITHIN'} ±$1M tolerance
                </span>
              </td></tr>
              <tr><td>P&L Explain Coverage</td><td style={{color:'var(--approve)',fontWeight:600}}>
                {fmt(Math.abs((pl.market+pl.carry)/(totalPL||1)*100),0)}% — market + carry vs total
              </td></tr>
            </tbody>
          </table>
          <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)',background:'var(--surface2)',padding:'8px 10px',borderRadius:4,lineHeight:1.6}}>
            Market P&L: {fmtSgn(pl.market)}M &nbsp;·&nbsp;
            Carry: {fmtSgn(pl.carry)}M &nbsp;·&nbsp;
            Residual: {fmtSgn(pl.residual)}M &nbsp;·&nbsp;
            Total: {fmtSgn(totalPL)}M &nbsp;·&nbsp;
            Net CVA: {fmtSgn(totalPL-cp.cva)}M
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Portfolio P&L Summary" action={`Total: ${fmtSgn(portTotalPL)}M · Mkt: ${fmtSgn(portTotalMkt)}M · Carry: ${fmtSgn(portTotalCar)}M · Res: ${fmtSgn(portTotalRes)}M`}>
        <DataTable
          columns={['Counterparty','Rating','Market P&L','Carry','Residual','Total P&L','CVA','Net CVA','Status']}
          rows={portRows}
          rowClass={(r,i)=>{
            const c=allCPs[i];
            const t=c.pl.market+c.pl.carry+c.pl.residual;
            return t<0?'row-bad':t<1?'row-warn':'';
          }}
        />
        <div style={{marginTop:12,padding:'8px 12px',background:'var(--surface2)',borderRadius:4,fontSize:11,display:'flex',gap:24}}>
          <span style={{color:'var(--text-sec)'}}>Portfolio totals —</span>
          <span>Market: <strong style={{color:portTotalMkt>=0?'var(--approve)':'var(--reject)'}}>{fmtSgn(portTotalMkt)}M</strong></span>
          <span>Carry: <strong style={{color:portTotalCar>=0?'var(--approve)':'var(--reject)'}}>{fmtSgn(portTotalCar)}M</strong></span>
          <span>Residual: <strong style={{color:Math.abs(portTotalRes)>1?'var(--flag)':'inherit'}}>{fmtSgn(portTotalRes)}M</strong></span>
          <span>Total: <strong style={{color:portTotalPL>=0?'var(--approve)':'var(--reject)'}}>{fmtSgn(portTotalPL)}M</strong></span>
        </div>
      </SectionCard>
    </div>
  );
}
