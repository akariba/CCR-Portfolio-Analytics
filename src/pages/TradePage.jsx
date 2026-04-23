import React, { useState } from 'react';
import { COUNTERPARTIES, TRADE_TYPES } from '../data/counterparties';
import { currentState, runPreTrade, getDecision, utilPct } from '../state/riskState';
import { MetricCard, SectionCard, DataTable, Badge } from '../components/Shared';

function fmt(n, d=1) { return (parseFloat(n)||0).toFixed(d); }

function AlertStrip() {
  const alerts = [];
  Object.values(COUNTERPARTIES).forEach(cp => {
    const {dec, util} = currentState(cp);
    if (dec.cls==='reject')   alerts.push({cls:'reject',   text:`${cp.name}: util ${fmt(util)}% — exceeds 95%. No new trades.`});
    else if (dec.cls==='escalate') alerts.push({cls:'escalate', text:`${cp.name}: util ${fmt(util)}% — 85–95% band. Head of CCR sign-off required.`});
    else if (dec.cls==='flag') alerts.push({cls:'flag',    text:`${cp.name}: util ${fmt(util)}% — Senior Desk sign-off required.`});
    if (cp.csa.type==='One-Way') alerts.push({cls:'flag', text:`${cp.name}: One-way CSA — no collateral received. Elevated capital charge.`});
  });
  if (!alerts.length) alerts.push({cls:'approve',text:'All counterparties within normal operating range.'});
  return (
    <div className="alert-strip">
      {alerts.map((a,i)=>(
        <div key={i} className={`alert-chip ${a.cls}`}>
          <div className="chip-dot"/>{a.text}
        </div>
      ))}
    </div>
  );
}

function CpStrip({ selected, onSelect }) {
  return (
    <div className="cp-strip">
      {Object.values(COUNTERPARTIES).map(cp => {
        const s = currentState(cp);
        return (
          <div
            key={cp.id}
            className={`cp-strip-card dec-${s.dec.cls}${selected===cp.id?' selected':''}`}
            onClick={()=>onSelect(cp.id)}
            title="Click to select for pre-trade"
          >
            <div className="cs-id">{cp.id} · {cp.rating}</div>
            <div className="cs-name">{cp.name}</div>
            <div className="cs-pfe">${fmt(s.effPFE)}M <em>PFE / ${cp.pfeLimit}M limit</em></div>
            <div className="util-bar-track">
              <div className={`util-bar-fill ub-${s.dec.cls}`} style={{width:`${Math.min(s.util,100)}%`}}/>
            </div>
            <div className="cs-row">
              <span style={{fontWeight:700,color:s.dec.color}}>{fmt(s.util)}%</span>
              <Badge label={s.dec.label} cls={s.dec.cls}/>
            </div>
            <div className="cs-row" style={{fontSize:10,color:'var(--text-sec)',marginTop:4}}>
              <span>Hdm: ${fmt(s.headroom)}M</span>
              <span>FV ${cp.fairValue}M</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PreTradeCalc({ cpId, setCpId }) {
  const [form, setForm] = useState({cp:cpId,type:'',notional:'',maturity:'5'});
  const [result, setResult] = useState(null);

  React.useEffect(()=>{setForm(f=>({...f,cp:cpId})); setResult(null);},[cpId]);
  function set(k,v){setForm(f=>({...f,[k]:v})); setResult(null);}

  function run() {
    const cp = COUNTERPARTIES[form.cp];
    setResult(runPreTrade(cp, form.type, form.notional, form.maturity));
  }

  const tt = TRADE_TYPES.find(t=>t.value===form.type);
  const canRun = form.cp && form.type && parseFloat(form.notional)>0;
  const currSt = form.cp ? currentState(COUNTERPARTIES[form.cp]) : null;

  return (
    <SectionCard title="Pre-Trade Impact Calculator">
      {currSt && (
        <div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:4,padding:'8px 12px',marginBottom:14,fontSize:11,display:'flex',gap:16}}>
          <span style={{color:'var(--text-sec)'}}>Current position —</span>
          <strong>{COUNTERPARTIES[form.cp]?.name}</strong>
          <span>PFE {fmt(currSt.effPFE)}M / {COUNTERPARTIES[form.cp]?.pfeLimit}M</span>
          <span style={{color:currSt.dec.color,fontWeight:700}}>{fmt(currSt.util)}%</span>
          <Badge label={currSt.dec.label} cls={currSt.dec.cls}/>
        </div>
      )}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Counterparty</label>
          <select className="form-select" value={form.cp} onChange={e=>{set('cp',e.target.value);setCpId(e.target.value);}}>
            <option value="">— Select —</option>
            {Object.values(COUNTERPARTIES).map(cp=><option key={cp.id} value={cp.id}>{cp.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Trade Type</label>
          <select className="form-select" value={form.type} onChange={e=>set('type',e.target.value)}>
            <option value="">— Select —</option>
            {TRADE_TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Notional ($M)</label>
          <input className="form-input" type="number" min="1" placeholder="e.g. 50"
            value={form.notional} onChange={e=>set('notional',e.target.value)}/>
        </div>
        {tt?.maturityRequired && (
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input className="form-input" type="number" min="0.25" max="30" step="0.25"
              value={form.maturity} onChange={e=>set('maturity',e.target.value)}/>
          </div>
        )}
      </div>
      <div style={{fontSize:11,color:'var(--text-sec)',marginBottom:12}}>
        Decision thresholds: &nbsp;
        <span style={{color:'var(--approve)',fontWeight:600}}>&lt;70% APPROVE</span> ·{' '}
        <span style={{color:'var(--flag)',fontWeight:600}}>70–85% FLAG</span> ·{' '}
        <span style={{color:'var(--escalate)',fontWeight:600}}>85–95% ESCALATE</span> ·{' '}
        <span style={{color:'var(--reject)',fontWeight:600}}>&gt;95% REJECT</span>
      </div>
      <button className="btn-primary" onClick={run} disabled={!canRun}>EVALUATE TRADE</button>

      {result && (
        <>
          <div className={`decision-output ${result.dec.cls}`}>
            <div className={`decision-label ${result.dec.cls}`}>{result.dec.label}</div>
            <div className="decision-reason">{result.action}</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
            {/* Exposure */}
            <SectionCard title="Exposure Impact">
              <table className="data-table">
                <tbody>
                  <tr><td>Current PFE</td><td className="num">${fmt(result.currEffPFE)}M</td></tr>
                  <tr><td>Post-Trade PFE</td><td className="num" style={{fontWeight:700}}>${fmt(result.newEffPFE)}M</td></tr>
                  <tr><td>PFE Add-on</td><td className="num" style={{color:'var(--reject)'}}>+${fmt(result.addon)}M</td></tr>
                  <tr><td>Utilisation Before</td><td className="num">{fmt(result.currUtil)}%</td></tr>
                  <tr><td>Utilisation After</td><td className="num" style={{color:result.dec.color,fontWeight:700}}>{fmt(result.newUtil)}%</td></tr>
                  <tr><td>Headroom After</td><td className="num">${fmt(result.headroomAfter)}M</td></tr>
                </tbody>
              </table>
            </SectionCard>
            {/* Fair Value */}
            <SectionCard title="Fair Value Impact">
              <table className="data-table">
                <tbody>
                  <tr><td>Current FV</td><td className="num">${fmt(result.currFV)}M</td></tr>
                  <tr><td>Post-Trade FV</td><td className="num">${fmt(result.postFV)}M</td></tr>
                  <tr><td>CVA Charge</td><td className="num" style={{color:'var(--reject)'}}>−${fmt(result.cvaCost,2)}M</td></tr>
                  <tr><td>Adj FV (before)</td><td className="num">${fmt(result.currAdjFV)}M</td></tr>
                  <tr><td>Adj FV (after)</td><td className="num" style={{fontWeight:700}}>${fmt(result.postAdjFV)}M</td></tr>
                  <tr><td>Net FV Impact</td><td className="num" style={{color:result.deltaAdjFV<0?'var(--reject)':'var(--approve)'}}>{result.deltaAdjFV>=0?'+':''}{fmt(result.deltaAdjFV)}M</td></tr>
                </tbody>
              </table>
            </SectionCard>
          </div>

          <div className={`findings-box ${result.dec.cls}`}>
            <div style={{fontWeight:700,marginBottom:8,fontSize:11,textTransform:'uppercase',letterSpacing:'.05em'}}>Risk Findings</div>
            <ul className="findings-list">
              {result.findings.map((f,i)=><li key={i}>{f}</li>)}
            </ul>
          </div>
        </>
      )}
    </SectionCard>
  );
}

function LimitTable() {
  const rows = Object.values(COUNTERPARTIES).map(cp=>{
    const s = currentState(cp);
    return [
      <strong>{cp.name}</strong>,
      cp.rating,
      `$${fmt(s.rawPFE)}M`,
      `$${fmt(s.csaPFE)}M`,
      `$${fmt(s.effPFE)}M`,
      `$${cp.pfeLimit}M`,
      <span style={{color:s.dec.color,fontWeight:700}}>{fmt(s.util)}%</span>,
      <span style={{color:s.headroom<8?'var(--reject)':'var(--text)'}}>${fmt(s.headroom)}M</span>,
      <Badge label={s.dec.label} cls={s.dec.cls}/>,
    ];
  });
  return (
    <SectionCard title="Limit Utilisation Summary" action="PFE-based · CSA & WWR adjusted">
      <DataTable
        columns={['Counterparty','Rating','Raw PFE','CSA-Adj PFE','Eff. PFE','PFE Limit','Utilisation','Headroom','Status']}
        rows={rows}
        rowClass={(r,i)=>{
          const cp = Object.values(COUNTERPARTIES)[i];
          const s  = currentState(cp);
          return s.dec.cls==='reject'?'row-bad':s.dec.cls==='escalate'||s.dec.cls==='flag'?'row-warn':'';
        }}
      />
    </SectionCard>
  );
}

export default function TradePage({ cpId, setCpId }) {
  const cps = Object.values(COUNTERPARTIES);
  const states = cps.map(cp=>currentState(cp));
  const totalPFE = states.reduce((a,s)=>a+s.effPFE,0);
  const totalLim = cps.reduce((a,c)=>a+c.pfeLimit,0);
  const portUtil = (totalPFE/totalLim)*100;
  const portDec  = getDecision(portUtil);

  return (
    <div>
      <AlertStrip/>
      <div className="page-container">
        <div className="page-header">
          <div className="page-title">Trade Decision</div>
          <div className="page-subtitle">Pre-trade evaluation · CCR LOD1 decision support · Pipeline: FV → CE → PFE → CSA → WWR → Limit → Decision</div>
        </div>

        <div className="metrics-row">
          <MetricCard label="Total Eff. PFE"    value={`$${fmt(totalPFE)}M`}        sub={`of $${totalLim}M PFE limit`}/>
          <MetricCard label="Portfolio Util."   value={`${fmt(portUtil)}%`}          sub="PFE-based" intent={portDec.cls}/>
          <MetricCard label="Portfolio FV"      value={`$${cps.reduce((a,c)=>a+c.fairValue,0).toFixed(1)}M`} sub={`Adj FV $${cps.reduce((a,c)=>a+(c.fairValue-c.cva),0).toFixed(1)}M`}/>
          <MetricCard label="Total CVA"         value={`$${cps.reduce((a,c)=>a+c.cva,0).toFixed(1)}M`} sub="portfolio credit cost"/>
          <MetricCard label="Breach Count"      value={states.filter(s=>s.dec.cls!=='approve').length} sub={`of ${cps.length} counterparties`} intent={states.some(s=>s.dec.cls==='reject')?'reject':states.some(s=>s.dec.cls==='escalate')?'escalate':'flag'}/>
        </div>

        <CpStrip selected={cpId} onSelect={setCpId}/>
        <div style={{display:'grid',gridTemplateColumns:'420px 1fr',gap:16,alignItems:'start'}}>
          <PreTradeCalc cpId={cpId} setCpId={setCpId}/>
          <LimitTable/>
        </div>
      </div>
    </div>
  );
}
