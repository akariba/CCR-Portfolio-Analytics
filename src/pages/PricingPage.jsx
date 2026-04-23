import React, { useState } from 'react';
import { priceIRS, getRateCurve } from '../state/irsModel';
import { MetricCard, SectionCard, LineChart } from '../components/Shared';

const fmt = (n,d=2)=>(parseFloat(n)||0).toFixed(d);
const fmt1 = (n)=>(parseFloat(n)||0).toFixed(1);

function RateCurveChart() {
  const curve = getRateCurve();
  const data  = curve.map(p=>p.r);
  const xLabels = curve.map(p=>p.t<=1?`${p.t}Y`:p.t+'Y').map((l,i)=>curve[i].t===0.25?'3M':curve[i].t===0.5?'6M':l);
  return (
    <LineChart
      series={[{name:'USD Spot Rate',color:'var(--accent)',data,fill:true}]}
      xLabels={xLabels}
      height={140}
      yUnit="%"
    />
  );
}

export default function PricingPage() {
  const [form, setForm] = useState({notional:'100', fixedRate:'4.5', maturity:'5', freq:'2', payFixed:true});
  const [result, setResult] = useState(null);

  function set(k,v){setForm(f=>({...f,[k]:v})); setResult(null);}

  function run() {
    setResult(priceIRS({
      notional:  parseFloat(form.notional),
      fixedRate: parseFloat(form.fixedRate),
      maturity:  parseFloat(form.maturity),
      freq:      parseInt(form.freq),
      payFixed:  form.payFixed,
    }));
  }

  const canRun = parseFloat(form.notional)>0 && parseFloat(form.fixedRate)>0 && parseFloat(form.maturity)>0;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Derivative Pricing — IRS</div>
        <div className="page-subtitle">Interest Rate Swap · USD Yield Curve · Fixed vs Floating Valuation</div>
      </div>

      <SectionCard title="USD Yield Curve" action="Approximate spot rates — as of pricing date">
        <RateCurveChart/>
        <div style={{fontSize:11,color:'var(--text-sec)',marginTop:6}}>
          Rates sourced from USD Treasury / swap curve. Discount factors: DF(t) = exp(−r(t)×t)
        </div>
      </SectionCard>

      <SectionCard title="IRS Trade Setup">
        <div className="form-row" style={{marginBottom:8}}>
          <div className="form-group">
            <label className="form-label">Notional ($M)</label>
            <input className="form-input" type="number" min="1" placeholder="100"
              value={form.notional} onChange={e=>set('notional',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Fixed Rate (%)</label>
            <input className="form-input" type="number" step="0.01" placeholder="4.50"
              value={form.fixedRate} onChange={e=>set('fixedRate',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input className="form-input" type="number" step="0.25" min="0.25" max="30" placeholder="5"
              value={form.maturity} onChange={e=>set('maturity',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Payment Frequency</label>
            <select className="form-select" value={form.freq} onChange={e=>set('freq',e.target.value)}>
              <option value="1">Annual</option>
              <option value="2">Semi-Annual</option>
              <option value="4">Quarterly</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <select className="form-select" value={form.payFixed?'pf':'rf'}
              onChange={e=>set('payFixed',e.target.value==='pf')}>
              <option value="pf">Pay Fixed / Receive Float</option>
              <option value="rf">Receive Fixed / Pay Float</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={run} disabled={!canRun}>PRICE IRS</button>
      </SectionCard>

      {result && (
        <>
          <div className="metrics-row">
            <MetricCard label="PV Fixed Leg"   value={`$${fmt(result.pvFixed)}M`}   sub={`${form.payFixed?'we pay':'we receive'} fixed`}  intent={form.payFixed?'reject':'approve'}/>
            <MetricCard label="PV Float Leg"   value={`$${fmt(result.pvFloat)}M`}   sub={`${form.payFixed?'we receive':'we pay'} SOFR`}   intent={form.payFixed?'approve':'reject'}/>
            <MetricCard label="Fair Value"     value={`${result.fairValue>=0?'+':''}$${fmt(result.fairValue)}M`} sub="PV float − PV fixed" intent={result.fairValue>=0?'approve':'reject'}/>
            <MetricCard label="Par Rate"       value={`${(result.parRate*100).toFixed(3)}%`} sub="at-market fixed rate"/>
            <MetricCard label="Fixed Rate"     value={`${form.fixedRate}%`}           sub="contracted"/>
            <MetricCard label="Rate Spread"    value={`${((parseFloat(form.fixedRate)/100 - result.parRate)*100).toFixed(1)} bps`} sub="vs par rate" intent={Math.abs((parseFloat(form.fixedRate)/100-result.parRate)*100)>20?'flag':'approve'}/>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <SectionCard title="Fair Value Summary">
              <table className="data-table">
                <tbody>
                  <tr><td>Notional</td><td className="num"><strong>${parseFloat(form.notional).toFixed(0)}M</strong></td></tr>
                  <tr><td>Fixed Rate</td><td className="num">{form.fixedRate}%</td></tr>
                  <tr><td>Par (ATM) Rate</td><td className="num" style={{fontWeight:700}}>{(result.parRate*100).toFixed(3)}%</td></tr>
                  <tr><td>Maturity</td><td className="num">{form.maturity}Y</td></tr>
                  <tr><td>Frequency</td><td className="num">{{1:'Annual',2:'Semi-Annual',4:'Quarterly'}[form.freq]}</td></tr>
                  <tr><td>Position</td><td className="num">{form.payFixed?'Pay Fixed':'Receive Fixed'}</td></tr>
                  <tr style={{borderTop:'2px solid var(--border2)'}}>
                    <td>PV Fixed Leg</td><td className="num" style={{color:'var(--reject)'}}>${fmt(result.pvFixed)}M</td>
                  </tr>
                  <tr>
                    <td>PV Float Leg</td><td className="num" style={{color:'var(--approve)'}}>${fmt(result.pvFloat)}M</td>
                  </tr>
                  <tr>
                    <td><strong>Net Fair Value</strong></td>
                    <td className="num"><strong style={{color:result.fairValue>=0?'var(--approve)':'var(--reject)'}}>
                      {result.fairValue>=0?'+':''}{fmt(result.fairValue)}M
                    </strong></td>
                  </tr>
                </tbody>
              </table>
              <div style={{marginTop:12,background:'var(--surface2)',padding:'8px 10px',borderRadius:4,fontSize:11,color:'var(--text-sec)',lineHeight:1.6}}>
                {form.payFixed?'Pay Fixed':'Receive Fixed'} at {form.fixedRate}% · Par rate {(result.parRate*100).toFixed(3)}% ·
                FV = PV(float) − PV(fixed) = {result.fairValue>=0?'+':''}{fmt(result.fairValue)}M
              </div>
            </SectionCard>

            <SectionCard title="Yield Curve — Pricing Inputs">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tenor</th><th className="num">Spot Rate</th><th className="num">DF(t)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yieldCurve.map(p=>(
                    <tr key={p.t}>
                      <td>{p.t<=0.25?'3M':p.t<=0.5?'6M':p.t+'Y'}</td>
                      <td className="num">{p.r.toFixed(2)}%</td>
                      <td className="num" style={{color:'var(--text-sec)'}}>{Math.exp(-p.r/100*p.t).toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </div>

          <SectionCard title="Payment Schedule" action={`${result.n} payment periods · notional $${parseFloat(form.notional).toFixed(0)}M`}>
            <div style={{overflowX:'auto'}}>
              <table className="data-table" style={{minWidth:700}}>
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Date</th>
                    <th className="num">t</th>
                    <th className="num">DF(t)</th>
                    <th className="num">Fixed ($M)</th>
                    <th className="num">Float ($M)</th>
                    <th className="num">Net ($M)</th>
                    <th className="num">PV Fixed</th>
                    <th className="num">PV Float</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map(row=>{
                    const net = parseFloat(row.net);
                    return (
                      <tr key={row.period}>
                        <td style={{fontWeight:700}}>{row.period}</td>
                        <td style={{color:'var(--text-sec)'}}>{row.date}</td>
                        <td className="num">{row.t}</td>
                        <td className="num" style={{color:'var(--text-sec)'}}>{row.df}</td>
                        <td className="num" style={{color:'var(--reject)'}}>{row.fixed}</td>
                        <td className="num" style={{color:'var(--approve)'}}>{row.float}</td>
                        <td className="num" style={{fontWeight:700,color:net>=0?'var(--approve)':'var(--reject)'}}>
                          {net>=0?'+':''}{row.net}
                        </td>
                        <td className="num" style={{color:'var(--text-sec)'}}>{row.pvFixed}</td>
                        <td className="num" style={{color:'var(--text-sec)'}}>{row.pvFloat}</td>
                      </tr>
                    );
                  })}
                  <tr style={{borderTop:'2px solid var(--border2)',background:'var(--surface2)'}}>
                    <td colSpan={7}><strong>Present Value Totals</strong></td>
                    <td className="num"><strong style={{color:'var(--reject)'}}>{fmt(result.pvFixed)}</strong></td>
                    <td className="num"><strong style={{color:'var(--approve)'}}>{fmt(result.pvFloat)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{marginTop:10,fontSize:11,color:'var(--text-sec)'}}>
              Fixed = N × r × Δt · Float = N × SOFR_fwd(t₋₁,t) × Δt · Net = {form.payFixed?'Float − Fixed':'Fixed − Float'} ·
              Discounted at USD risk-free curve (exp(−r·t))
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
}
