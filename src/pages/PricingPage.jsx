import React, { useState } from 'react';
import { priceIRS, getRateCurve } from '../state/irsModel';
import { MetricCard, SectionCard, WideLineChart, Badge } from '../components/Shared';

const fmt  = (n,d=2)=>(parseFloat(n)||0).toFixed(d);
const fmt1 = (n)   =>(parseFloat(n)||0).toFixed(1);
const fmtSgn = (n,d=2)=>{ const v=(parseFloat(n)||0).toFixed(d); return parseFloat(n)>=0?'+'+v:v; };

// ─── CDS Pricing ─────────────────────────────────────────────────────────────
function priceCDS({ spread=100, notional=100, maturity=5, lgd=0.60 }) {
  const N       = parseFloat(notional);
  const bps     = parseFloat(spread) / 10000;
  const M       = parseFloat(maturity);
  const lgdN    = parseFloat(lgd);
  const lambda  = bps / lgdN;           // hazard rate: λ = CDS/(LGD)
  const discR   = 0.044;
  const dt      = 0.25;
  const periods = Math.round(M / dt);

  let premPV = 0, protPV = 0, annuity = 0;
  const sched = [];

  for (let i = 1; i <= periods; i++) {
    const t    = i * dt;
    const tPrev= (i-1) * dt;
    const dfT  = Math.exp(-discR * t);
    const sCurr= Math.exp(-lambda * t);
    const sPrev= Math.exp(-lambda * tPrev);
    const margPD = sPrev - sCurr;

    const premUnit = bps  * dt * sCurr * dfT;
    const protUnit = lgdN * margPD      * dfT;
    premPV  += premUnit;
    protPV  += protUnit;
    annuity += dt * sCurr * dfT;

    if (i <= 20) sched.push({
      period: i,
      t:    t.toFixed(2),
      df:   dfT.toFixed(4),
      surv: (sCurr*100).toFixed(2),
      pd:   (margPD*100).toFixed(3),
      prem: (premUnit*N).toFixed(3),
      prot: (protUnit*N).toFixed(3),
      net:  ((protUnit-premUnit)*N).toFixed(3),
    });
  }

  const fairSpreadBps  = annuity>0 ? (protPV/annuity)*10000 : 0;
  const impliedPD1Y    = (1 - Math.exp(-lambda))   * 100;
  const impliedPD5Y    = (1 - Math.exp(-lambda*5)) * 100;
  const expectedLoss   = N * lgdN * (1 - Math.exp(-lambda * M));
  const netMTM         = (protPV - premPV) * N;

  // CVA on the CDS: credit risk to protection seller if MTM > 0
  const sellerLambda   = 0.0180;  // generic counterparty ~108bps/60% LGD
  const sellerSurv     = (1 - Math.exp(-sellerLambda * M));
  const cvaImpact      = Math.max(netMTM, 0) * lgdN * sellerSurv;

  return {
    fairSpreadBps, impliedPD1Y, impliedPD5Y, lambda,
    premiumPV: premPV*N, protectionPV: protPV*N,
    netMTM, expectedLoss, cvaImpact, annuity, sched,
  };
}

// ─── Rate Curve with WideLineChart ───────────────────────────────────────────
function RateCurveChart() {
  const curve   = getRateCurve();
  const data    = curve.map(p => p.r);
  const xLabels = curve.map(p =>
    p.t===0.25?'3M':p.t===0.5?'6M':p.t===1?'1Y':p.t+'Y'
  );
  return (
    <WideLineChart
      series={[{ name:'USD Spot Rate (%)', color:'#2563eb', data, fill:true, width:2.5 }]}
      xLabels={xLabels}
      height={420}
      yLabel="%"
      yPrefix=""
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [irsForm, setIrsForm] = useState({ notional:'100', fixedRate:'4.5', maturity:'5', freq:'2', payFixed:true });
  const [irsResult, setIrsResult] = useState(null);

  const [cdsForm, setCdsForm] = useState({ spread:'120', notional:'100', maturity:'5', lgd:'0.60' });
  const [cdsResult, setCdsResult] = useState(null);

  function setIrs(k,v){ setIrsForm(f=>({...f,[k]:v})); setIrsResult(null); }
  function setCds(k,v){ setCdsForm(f=>({...f,[k]:v})); setCdsResult(null); }

  function runIRS() {
    setIrsResult(priceIRS({
      notional:  parseFloat(irsForm.notional),
      fixedRate: parseFloat(irsForm.fixedRate),
      maturity:  parseFloat(irsForm.maturity),
      freq:      parseInt(irsForm.freq),
      payFixed:  irsForm.payFixed,
    }));
  }

  function runCDS() {
    setCdsResult(priceCDS({
      spread:   parseFloat(cdsForm.spread),
      notional: parseFloat(cdsForm.notional),
      maturity: parseFloat(cdsForm.maturity),
      lgd:      parseFloat(cdsForm.lgd),
    }));
  }

  const canRunIRS = parseFloat(irsForm.notional)>0 && parseFloat(irsForm.fixedRate)>0 && parseFloat(irsForm.maturity)>0;
  const canRunCDS = parseFloat(cdsForm.spread)>0 && parseFloat(cdsForm.notional)>0 && parseFloat(cdsForm.maturity)>0;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">Derivative Pricing</div>
        <div className="page-subtitle">IRS Valuation · CDS Pricing · USD Yield Curve · Implied PD · CVA Impact</div>
      </div>

      {/* ── USD Yield Curve ── */}
      <SectionCard title="USD Yield Curve" action="Approximate spot rates — pricing date basis">
        <RateCurveChart/>
        <div style={{fontSize:11,color:'var(--text-sec)',marginTop:8}}>
          USD Treasury / OIS swap curve · DF(t) = exp(−r(t)×t) · Forward rates by bootstrapping
        </div>
      </SectionCard>

      {/* ══════════════════════════════ IRS MODULE ══════════════════════════ */}
      <div style={{borderTop:'2px solid var(--border)',paddingTop:8,marginTop:4}}>
        <div style={{fontSize:12,fontWeight:700,color:'var(--text-sec)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:16}}>
          Module 1 — Interest Rate Swap (IRS)
        </div>
      </div>

      <SectionCard title="IRS Trade Setup">
        <div className="form-row" style={{marginBottom:8}}>
          <div className="form-group">
            <label className="form-label">Notional ($M)</label>
            <input className="form-input" type="number" min="1" placeholder="100"
              value={irsForm.notional} onChange={e=>setIrs('notional',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Fixed Rate (%)</label>
            <input className="form-input" type="number" step="0.01" placeholder="4.50"
              value={irsForm.fixedRate} onChange={e=>setIrs('fixedRate',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input className="form-input" type="number" step="0.25" min="0.25" max="30"
              value={irsForm.maturity} onChange={e=>setIrs('maturity',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Payment Frequency</label>
            <select className="form-select" value={irsForm.freq} onChange={e=>setIrs('freq',e.target.value)}>
              <option value="1">Annual</option>
              <option value="2">Semi-Annual</option>
              <option value="4">Quarterly</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <select className="form-select" value={irsForm.payFixed?'pf':'rf'}
              onChange={e=>setIrs('payFixed',e.target.value==='pf')}>
              <option value="pf">Pay Fixed / Receive Float</option>
              <option value="rf">Receive Fixed / Pay Float</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={runIRS} disabled={!canRunIRS}>PRICE IRS</button>
      </SectionCard>

      {irsResult && (
        <>
          <div className="metrics-row">
            <MetricCard label="PV Fixed Leg"  value={`$${fmt(irsResult.pvFixed)}M`}    sub={irsForm.payFixed?'we pay':'we receive'} intent={irsForm.payFixed?'reject':'approve'}/>
            <MetricCard label="PV Float Leg"  value={`$${fmt(irsResult.pvFloat)}M`}    sub={irsForm.payFixed?'we receive':'we pay'} intent={irsForm.payFixed?'approve':'reject'}/>
            <MetricCard label="Fair Value"    value={`${irsResult.fairValue>=0?'+':''}$${fmt(irsResult.fairValue)}M`} sub="PV float − PV fixed" intent={irsResult.fairValue>=0?'approve':'reject'}/>
            <MetricCard label="Par Rate"      value={`${(irsResult.parRate*100).toFixed(3)}%`} sub="at-market rate"/>
            <MetricCard label="Rate vs Par"   value={`${((parseFloat(irsForm.fixedRate)/100-irsResult.parRate)*10000).toFixed(1)} bps`} sub="spread to par" intent={Math.abs((parseFloat(irsForm.fixedRate)/100-irsResult.parRate)*10000)>25?'flag':'approve'}/>
            <MetricCard label="Periods"       value={irsResult.n} sub={{1:'annual',2:'semi-ann',4:'quarterly'}[irsForm.freq]}/>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <SectionCard title="IRS Fair Value Summary">
              <table className="data-table">
                <tbody>
                  <tr><td>Notional</td><td className="num"><strong>${parseFloat(irsForm.notional).toFixed(0)}M</strong></td></tr>
                  <tr><td>Fixed Rate</td><td className="num">{irsForm.fixedRate}%</td></tr>
                  <tr><td>Par (ATM) Rate</td><td className="num" style={{fontWeight:700}}>{(irsResult.parRate*100).toFixed(3)}%</td></tr>
                  <tr><td>Maturity · Frequency</td><td className="num">{irsForm.maturity}Y · {{1:'Ann',2:'S/A',4:'Qrtly'}[irsForm.freq]}</td></tr>
                  <tr style={{borderTop:'2px solid var(--border2)'}}>
                    <td>PV Fixed Leg</td><td className="num" style={{color:'var(--reject)'}}>${fmt(irsResult.pvFixed)}M</td>
                  </tr>
                  <tr><td>PV Float Leg</td><td className="num" style={{color:'var(--approve)'}}>${fmt(irsResult.pvFloat)}M</td></tr>
                  <tr><td><strong>Net Fair Value</strong></td>
                    <td className="num"><strong style={{color:irsResult.fairValue>=0?'var(--approve)':'var(--reject)'}}>
                      {irsResult.fairValue>=0?'+':''}${fmt(irsResult.fairValue)}M
                    </strong></td>
                  </tr>
                </tbody>
              </table>
            </SectionCard>

            <SectionCard title="Yield Curve Inputs">
              <table className="data-table">
                <thead><tr><th>Tenor</th><th className="num">Spot Rate</th><th className="num">DF(t)</th></tr></thead>
                <tbody>
                  {irsResult.yieldCurve.map(p=>(
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

          <SectionCard title="IRS Payment Schedule" action={`${irsResult.n} periods · $${parseFloat(irsForm.notional).toFixed(0)}M notional`}>
            <div style={{overflowX:'auto'}}>
              <table className="data-table" style={{minWidth:700}}>
                <thead>
                  <tr>
                    <th>#</th><th>Date</th><th className="num">t</th><th className="num">DF</th>
                    <th className="num">Fixed ($M)</th><th className="num">Float ($M)</th>
                    <th className="num">Net ($M)</th><th className="num">PV Fixed</th><th className="num">PV Float</th>
                  </tr>
                </thead>
                <tbody>
                  {irsResult.schedule.map(row=>{
                    const net=parseFloat(row.net);
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
                    <td colSpan={7}><strong>PV Totals</strong></td>
                    <td className="num"><strong style={{color:'var(--reject)'}}>{fmt(irsResult.pvFixed)}</strong></td>
                    <td className="num"><strong style={{color:'var(--approve)'}}>{fmt(irsResult.pvFloat)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>
        </>
      )}

      {/* ══════════════════════════════ CDS MODULE ══════════════════════════ */}
      <div style={{borderTop:'2px solid var(--border)',paddingTop:8,marginTop:4}}>
        <div style={{fontSize:12,fontWeight:700,color:'var(--text-sec)',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:16}}>
          Module 2 — Credit Default Swap (CDS)
        </div>
      </div>

      <SectionCard title="CDS Trade Setup">
        <div className="form-row" style={{marginBottom:8}}>
          <div className="form-group">
            <label className="form-label">CDS Spread (bps)</label>
            <input className="form-input" type="number" min="1" step="1" placeholder="120"
              value={cdsForm.spread} onChange={e=>setCds('spread',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Notional ($M)</label>
            <input className="form-input" type="number" min="1" placeholder="100"
              value={cdsForm.notional} onChange={e=>setCds('notional',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input className="form-input" type="number" step="0.5" min="0.5" max="10"
              value={cdsForm.maturity} onChange={e=>setCds('maturity',e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Recovery Rate (%)</label>
            <select className="form-select" value={cdsForm.lgd}
              onChange={e=>setCds('lgd',e.target.value)}>
              <option value="0.60">40% recovery / LGD 60%</option>
              <option value="0.65">35% recovery / LGD 65%</option>
              <option value="0.55">45% recovery / LGD 55%</option>
              <option value="0.40">60% recovery / LGD 40%</option>
            </select>
          </div>
        </div>
        <button className="btn-primary" onClick={runCDS} disabled={!canRunCDS}>PRICE CDS</button>
      </SectionCard>

      {cdsResult && (
        <>
          <div className="metrics-row">
            <MetricCard label="Fair CDS Spread"  value={`${fmt(cdsResult.fairSpreadBps,1)} bps`}  sub="par spread (at-market)"/>
            <MetricCard label="Implied PD (1Y)"  value={`${fmt(cdsResult.impliedPD1Y)}%`}          sub="1-year default probability" intent={cdsResult.impliedPD1Y>3?'reject':cdsResult.impliedPD1Y>1.5?'flag':'approve'}/>
            <MetricCard label="Implied PD (5Y)"  value={`${fmt(cdsResult.impliedPD5Y)}%`}          sub="5-year cumulative PD"       intent={cdsResult.impliedPD5Y>12?'reject':cdsResult.impliedPD5Y>6?'flag':''}/>
            <MetricCard label="Expected Loss"    value={`$${fmt(cdsResult.expectedLoss)}M`}        sub={`over ${cdsForm.maturity}Y maturity`} intent="flag"/>
            <MetricCard label="Net MTM"          value={`${cdsResult.netMTM>=0?'+':''}$${fmt(cdsResult.netMTM)}M`} sub="protection − premium PV" intent={cdsResult.netMTM>=0?'approve':'reject'}/>
            <MetricCard label="CVA Impact"       value={`$${fmt(cdsResult.cvaImpact)}M`}           sub="seller default risk on MTM" intent={cdsResult.cvaImpact>0.5?'flag':'approve'}/>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <SectionCard title="CDS Valuation Summary">
              <table className="data-table">
                <tbody>
                  <tr><td>Reference Entity</td><td><strong>User-defined</strong></td></tr>
                  <tr><td>CDS Spread (contractual)</td><td style={{fontWeight:700}}>{cdsForm.spread} bps</td></tr>
                  <tr><td>Fair Spread (par)</td><td style={{fontWeight:700,color:'var(--accent)'}}>{fmt(cdsResult.fairSpreadBps,1)} bps</td></tr>
                  <tr><td>Hazard Rate λ = S/(LGD)</td><td style={{fontWeight:700}}>{cdsResult.lambda.toFixed(5)}</td></tr>
                  <tr><td>Recovery Rate</td><td>{fmt((1-parseFloat(cdsForm.lgd))*100,0)}%</td></tr>
                  <tr><td>LGD</td><td>{fmt(parseFloat(cdsForm.lgd)*100,0)}%</td></tr>
                  <tr style={{borderTop:'2px solid var(--border2)'}}>
                    <td>PV Premium Leg (we receive)</td>
                    <td className="num" style={{color:'var(--approve)'}}>${fmt(cdsResult.premiumPV)}M</td>
                  </tr>
                  <tr>
                    <td>PV Protection Leg (we pay)</td>
                    <td className="num" style={{color:'var(--reject)'}}>${fmt(cdsResult.protectionPV)}M</td>
                  </tr>
                  <tr>
                    <td><strong>Net MTM</strong></td>
                    <td className="num"><strong style={{color:cdsResult.netMTM>=0?'var(--approve)':'var(--reject)'}}>
                      {cdsResult.netMTM>=0?'+':''}${fmt(cdsResult.netMTM)}M
                    </strong></td>
                  </tr>
                </tbody>
              </table>
            </SectionCard>

            <SectionCard title="Credit Risk Metrics">
              <table className="data-table">
                <tbody>
                  <tr><td>Implied PD (1Y)</td>
                    <td className="num" style={{fontWeight:700,color:cdsResult.impliedPD1Y>3?'var(--reject)':cdsResult.impliedPD1Y>1.5?'var(--flag)':'var(--approve)'}}>
                      {fmt(cdsResult.impliedPD1Y)}%
                    </td>
                  </tr>
                  <tr><td>Implied PD (5Y cumul.)</td>
                    <td className="num" style={{fontWeight:700,color:cdsResult.impliedPD5Y>15?'var(--reject)':cdsResult.impliedPD5Y>8?'var(--flag)':'inherit'}}>
                      {fmt(cdsResult.impliedPD5Y)}%
                    </td>
                  </tr>
                  <tr><td>Hazard Rate λ</td><td className="num">{cdsResult.lambda.toFixed(5)}</td></tr>
                  <tr><td>S(1Y) Survival</td><td className="num">{fmt(Math.exp(-cdsResult.lambda*1)*100,2)}%</td></tr>
                  <tr><td>S(5Y) Survival</td><td className="num">{fmt(Math.exp(-cdsResult.lambda*5)*100,2)}%</td></tr>
                  <tr><td>Expected Loss ({cdsForm.maturity}Y)</td>
                    <td className="num" style={{fontWeight:700,color:'var(--reject)'}}>
                      ${fmt(cdsResult.expectedLoss)}M
                    </td>
                  </tr>
                  <tr style={{borderTop:'2px solid var(--border2)'}}>
                    <td>CVA on CDS</td>
                    <td className="num" style={{fontWeight:700,color:'var(--flag)'}}>
                      ${fmt(cdsResult.cvaImpact)}M
                    </td>
                  </tr>
                  <tr><td>Risky Annuity (RPV01)</td><td className="num">{cdsResult.annuity.toFixed(4)}</td></tr>
                </tbody>
              </table>
              <div style={{marginTop:10,fontSize:11,color:'var(--text-sec)',background:'var(--surface2)',padding:'8px 10px',borderRadius:4}}>
                λ = CDS spread / LGD &nbsp;·&nbsp; S(t) = exp(−λt) &nbsp;·&nbsp;
                EL = N × LGD × (1−S(T)) &nbsp;·&nbsp;
                CVA = max(MTM,0) × LGD_seller × (1−S_seller(T))
              </div>
            </SectionCard>
          </div>

          <SectionCard title="CDS Cash Flow Schedule" action={`${cdsResult.sched.length} quarterly periods · $${parseFloat(cdsForm.notional).toFixed(0)}M notional`}>
            <div style={{overflowX:'auto'}}>
              <table className="data-table" style={{minWidth:640}}>
                <thead>
                  <tr>
                    <th>#</th><th className="num">t (Y)</th><th className="num">DF</th>
                    <th className="num">Surv. %</th><th className="num">Marg. PD %</th>
                    <th className="num">Premium ($M)</th><th className="num">Protection ($M)</th>
                    <th className="num">Net ($M)</th>
                  </tr>
                </thead>
                <tbody>
                  {cdsResult.sched.map(row=>{
                    const net=parseFloat(row.net);
                    return (
                      <tr key={row.period}>
                        <td style={{fontWeight:700}}>{row.period}</td>
                        <td className="num">{row.t}</td>
                        <td className="num" style={{color:'var(--text-sec)'}}>{row.df}</td>
                        <td className="num">{row.surv}%</td>
                        <td className="num" style={{color:'var(--reject)'}}>{row.pd}%</td>
                        <td className="num" style={{color:'var(--approve)'}}>{row.prem}</td>
                        <td className="num" style={{color:'var(--reject)'}}>{row.prot}</td>
                        <td className="num" style={{fontWeight:700,color:net>=0?'var(--approve)':'var(--reject)'}}>
                          {net>=0?'+':''}{row.net}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{borderTop:'2px solid var(--border2)',background:'var(--surface2)'}}>
                    <td colSpan={5}><strong>Totals</strong></td>
                    <td className="num"><strong style={{color:'var(--approve)'}}>{fmt(cdsResult.premiumPV)}</strong></td>
                    <td className="num"><strong style={{color:'var(--reject)'}}>{fmt(cdsResult.protectionPV)}</strong></td>
                    <td className="num"><strong style={{color:cdsResult.netMTM>=0?'var(--approve)':'var(--reject)'}}>
                      {cdsResult.netMTM>=0?'+':''}{fmt(cdsResult.netMTM)}
                    </strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{marginTop:10,fontSize:11,color:'var(--text-sec)'}}>
              Premium = CDS spread × dt × S(t) × DF(t) · Protection = LGD × [S(t−1)−S(t)] × DF(t) ·
              Quarterly coupon payments · Flat hazard rate model
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
}
