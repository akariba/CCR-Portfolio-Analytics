import React from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import { computeCVA, computePortfolioCVA } from '../state/cvaModel';
import { MetricCard, SectionCard, DataTable, WideLineChart, CpSelector, Badge } from '../components/Shared';

const fmt  = (n,d=2) => (parseFloat(n)||0).toFixed(d);
const fmt1 = n       => (parseFloat(n)||0).toFixed(1);
const fmtM = (n,d=2) => `$${fmt(n,d)}M`;

// ─── CS01: sensitivity of CVA to +1bp CDS spread ─────────────────────────────
function computeCS01(cp) {
  const base    = computeCVA(cp);
  const bumpedL = (cp.cdsSpread + 1) / 10000 / cp.lgd;
  const bumped  = computeCVA({ ...cp, cdsSpread: cp.cdsSpread + 1, lambda: bumpedL });
  return bumped.cva - base.cva;   // $M per +1bp
}

// ─── IR01: approximate sensitivity to +1bp discount rate ─────────────────────
// CVA_duration = Σ t_i × contrib_i / total_CVA → IR01 = −CVA × dur × 0.0001
function computeIR01(cp) {
  const { cva, buckets } = computeCVA(cp);
  if (cva === 0) return 0;
  const totalC = buckets.reduce((a,b) => a + parseFloat(b.contrib), 0);
  const dur    = totalC > 0
    ? buckets.reduce((a,b) => a + parseFloat(b.t) * parseFloat(b.contrib), 0) / totalC
    : 3;
  return -cva * dur * 0.0001;     // $M per +1bp rate shift
}

export default function CVAPage({ cpId, setCpId }) {
  const cp      = COUNTERPARTIES[cpId];
  const res     = computeCVA(cp);
  const allCPs  = Object.values(COUNTERPARTIES);
  const portCVA = computePortfolioCVA(COUNTERPARTIES);
  const totalCVA = portCVA.reduce((a,r) => a + r.cva, 0);

  // ── CVA profile chart (wide)
  const cvaContribs = res.buckets.map(b => +(parseFloat(b.contrib)*10).toFixed(2));
  const eeSeries = [
    { name:'EE ($M)',            color:'#2563eb', data:cp.ee,       fill:true,  width:2.5 },
    { name:'CVA Contrib ×10',   color:'#dc2626', data:cvaContribs, fill:false, width:2   },
  ];

  // ── CS01 / IR01 per counterparty
  const sensRows = allCPs.map(c => {
    const r    = computeCVA(c);
    const cs01 = computeCS01(c);
    const ir01 = computeIR01(c);
    const cs01D = Math.abs(cs01) > 0.005 ? 'flag' : 'approve';
    const ir01D = Math.abs(ir01) > 0.002 ? 'flag' : 'approve';
    return [
      <strong>{c.name}</strong>,
      c.rating,
      `${c.cdsSpread} bps`,
      `${(c.lgd*100).toFixed(0)}%`,
      <strong style={{color:'var(--reject)'}}>{fmtM(r.cva)}</strong>,
      <span style={{color:`var(--${cs01D})`,fontWeight:700}}>
        {cs01>=0?'+':''}{(cs01*1000).toFixed(3)}k
      </span>,
      <span style={{color:`var(--${ir01D})`,fontWeight:700}}>
        {ir01>=0?'+':''}{(ir01*1000).toFixed(3)}k
      </span>,
      <Badge label={c.wwr} cls={c.wwr==='HIGH'?'reject':c.wwr==='MEDIUM'?'flag':'approve'}/>,
      <span style={{fontWeight:700}}>{c.wwr_rho.toFixed(2)}</span>,
      <Badge label={cs01D==='flag'?'MONITOR':'OK'} cls={cs01D}/>,
    ];
  });

  // ── Portfolio CVA rows
  const portRows = portCVA.map(r => {
    const c       = COUNTERPARTIES[r.id];
    const share   = parseFloat(r.cvaShare);
    const d       = share>15?'reject':share>10?'flag':'approve';
    const cs01    = computeCS01(c);
    return [
      <strong>{r.name}</strong>,
      c.rating,
      `${c.cdsSpread} bps`,
      `${(c.lgd*100).toFixed(0)}%`,
      fmtM(r.rfValue,1),
      <strong style={{color:'var(--reject)'}}>{fmtM(r.cva)}</strong>,
      <strong style={{color:r.adjValue>=0?'var(--approve)':'var(--reject)'}}>{fmtM(r.adjValue,1)}</strong>,
      <span style={{color:`var(--${d})`,fontWeight:700}}>{r.cvaShare}%</span>,
      <span style={{color:'var(--flag)',fontWeight:600}}>{cs01>=0?'+':''}{(cs01*1000).toFixed(3)}k</span>,
      <Badge label={d==='reject'?'HIGH':d==='flag'?'MED':'LOW'} cls={d}/>,
    ];
  });

  const cs01Cp  = computeCS01(cp);
  const ir01Cp  = computeIR01(cp);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title">CVA Pricing & Sensitivities</div>
        <div className="page-subtitle">
          CVA = LGD × Σ EE(tᵢ)×[S(tᵢ₋₁)−S(tᵢ)]×DF(tᵢ) · CS01 · IR01 · Wrong-Way Risk
        </div>
      </div>

      <CpSelector value={cpId} onChange={setCpId} counterparties={COUNTERPARTIES}/>

      {/* ── KPI ── */}
      <div className="metrics-row">
        <MetricCard label="Risk-Free Value" value={fmtM(res.rfValue,1)}              sub="MTM before credit adj."/>
        <MetricCard label="CVA"             value={`−${fmtM(res.cva)}`}              sub="credit valuation adj." intent="reject"/>
        <MetricCard label="Adj. Value"      value={fmtM(res.adjValue,1)}             sub="RF Value − CVA"        intent={res.adjValue>=0?'approve':'reject'}/>
        <MetricCard label="CS01"            value={`${cs01Cp>=0?'+':''}${(cs01Cp*1000).toFixed(2)}k`} sub="CVA Δ per +1bp CDS" intent={Math.abs(cs01Cp)>0.005?'flag':'approve'}/>
        <MetricCard label="IR01"            value={`${ir01Cp>=0?'+':''}${(ir01Cp*1000).toFixed(2)}k`} sub="CVA Δ per +1bp rate" intent={Math.abs(ir01Cp)>0.002?'flag':'approve'}/>
        <MetricCard label="CVA Rate"        value={`${fmt(res.cvaRate,2)}%`}         sub="CVA as % of PFE"      intent={res.cvaRate>15?'reject':res.cvaRate>10?'flag':'approve'}/>
      </div>

      {/* ── WWR Alert ── */}
      {cp.wwr !== 'LOW' && (
        <div className={`findings-box ${cp.wwr==='HIGH'?'reject':'flag'}`} style={{marginBottom:16}}>
          <strong>⚠ {cp.wwr} Wrong-Way Risk — CVA Amplification Active</strong><br/>
          Exposure and credit quality are correlated (ρ = {cp.wwr_rho}).
          When {cp.name} credit deteriorates, our EE rises simultaneously.
          WWR factor: ×{(1 + cp.wwr_rho*(cp.wwr==='HIGH'?0.30:0.10)).toFixed(3)}.
          CVA understates true risk — apply stress CVA = CVA × WWR factor ={' '}
          <strong>{fmtM(res.cva * (1 + cp.wwr_rho*(cp.wwr==='HIGH'?0.30:0.10)))}</strong>.
        </div>
      )}

      {res.cva > cp.fairValue * 0.20 && (
        <div className="findings-box flag" style={{marginBottom:16}}>
          <strong>⚠ Elevated CVA — CVA Desk Review Required</strong><br/>
          CVA {fmtM(res.cva)} = {fmt(res.cva/cp.fairValue*100,0)}% of gross FV.
          CDS spread {res.cdsSpread} bps drives high hazard rate λ={fmt(res.lambda,4)}.
          CS01 = {cs01Cp>=0?'+':''}{(cs01Cp*1000).toFixed(2)}k per bp — material spread sensitivity.
        </div>
      )}

      {/* ── Model inputs + EE chart ── */}
      <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:16,alignItems:'start'}}>
        <SectionCard title="CVA Model — Selected CP">
          <table className="data-table">
            <tbody>
              <tr><td>Counterparty</td><td><strong>{cp.name}</strong></td></tr>
              <tr><td>Rating</td><td>{cp.rating}</td></tr>
              <tr><td>CDS Spread</td><td style={{fontWeight:700}}>{res.cdsSpread} bps</td></tr>
              <tr><td>LGD</td><td>{(res.lgd*100).toFixed(0)}%</td></tr>
              <tr><td>λ = CDS / LGD</td><td style={{fontWeight:700}}>{fmt(res.lambda,5)}</td></tr>
              <tr><td>S(1Y)</td><td>{fmt(Math.exp(-res.lambda)*100,2)}%</td></tr>
              <tr><td>S(5Y)</td><td>{fmt(Math.exp(-res.lambda*5)*100,2)}%</td></tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td>Risk-Free Value</td><td style={{fontWeight:700}}>{fmtM(res.rfValue,1)}</td>
              </tr>
              <tr><td>CVA</td>
                <td style={{fontWeight:700,color:'var(--reject)'}}>{fmtM(res.cva)}</td>
              </tr>
              <tr><td><strong>Adj. Value</strong></td>
                <td><strong style={{color:res.adjValue>=0?'var(--approve)':'var(--reject)'}}>{fmtM(res.adjValue,1)}</strong></td>
              </tr>
              <tr style={{borderTop:'2px solid var(--border2)'}}>
                <td>CS01 (+1bp CDS)</td>
                <td style={{fontWeight:700,color:'var(--flag)'}}>
                  {cs01Cp>=0?'+':''}{(cs01Cp*1000).toFixed(3)}k
                </td>
              </tr>
              <tr><td>IR01 (+1bp rate)</td>
                <td style={{fontWeight:700,color:'var(--flag)'}}>
                  {ir01Cp>=0?'+':''}{(ir01Cp*1000).toFixed(3)}k
                </td>
              </tr>
              <tr><td>WWR</td>
                <td><Badge label={cp.wwr} cls={cp.wwr==='HIGH'?'reject':cp.wwr==='MEDIUM'?'flag':'approve'}/></td>
              </tr>
              <tr><td>WWR ρ</td><td style={{fontWeight:700}}>{cp.wwr_rho}</td></tr>
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="EE Profile & CVA Contribution" action={`${cp.name} · CVA contrib scaled ×10`}>
          <WideLineChart series={eeSeries} xLabels={cp.tenors} height={380}/>
          <div style={{fontSize:11,color:'var(--text-sec)',marginTop:8}}>
            EE = Expected Exposure · CVA contrib per bucket scaled ×10 ·
            Total CVA = {fmtM(res.cva)} · Hazard rate λ = {fmt(res.lambda,5)}
          </div>
        </SectionCard>
      </div>

      {/* ── CVA Bucket Decomposition ── */}
      <SectionCard title="CVA Bucket Decomposition" action="Per-tenor CVA contribution">
        <DataTable
          columns={['Tenor','t (Y)','EE ($M)','Surv. S(t)','Marg. PD','DF(t)','LGD','CVA Contrib','Cumul. CVA']}
          rows={res.buckets.map(b=>[
            <strong>{b.tenor}</strong>,
            `${b.t}Y`,
            <span style={{fontWeight:600}}>${b.ee}M</span>,
            <span style={{color:'var(--approve)'}}>{b.survPct}%</span>,
            `${b.pdPct}%`,
            b.df,
            b.lgd,
            <span style={{color:'var(--reject)',fontWeight:700}}>${b.contrib}M</span>,
            <strong style={{color:'var(--reject)'}}>${b.cumCVA}M</strong>,
          ])}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)'}}>
          Marg. PD = S(t−1)−S(t) · CVA contrib = LGD×EE×PD×DF ·
          Total CVA = {fmtM(res.cva)} · CS01 = {(cs01Cp*1000).toFixed(3)}k per bp
        </div>
      </SectionCard>

      {/* ── Sensitivity Table ── */}
      <SectionCard
        title="CVA Sensitivities — Portfolio"
        action="CS01 (per +1bp CDS) · IR01 (per +1bp discount rate) · Wrong-Way Risk"
      >
        <DataTable
          columns={['Counterparty','Rating','CDS Spread','LGD','CVA','CS01 ($/1bp)','IR01 ($/1bp)','WWR','ρ','Sensitivity']}
          rows={sensRows}
          rowClass={(_,i)=>{
            const c=allCPs[i];
            return c.wwr==='HIGH'?'row-bad':c.wwr==='MEDIUM'?'row-warn':'';
          }}
        />
        <div style={{marginTop:12,fontSize:11,color:'var(--text-sec)',lineHeight:1.6}}>
          CS01 = ΔCVA per +1bp CDS spread · IR01 ≈ −CVA×Duration×0.0001 ·
          Units: k = $1,000 · WWR amplifies CVA by (1+ρ×0.30) for HIGH, (1+ρ×0.10) for MEDIUM.
        </div>
      </SectionCard>

      {/* ── Portfolio CVA ── */}
      <SectionCard title="Portfolio CVA Summary" action={`Total CVA: ${fmtM(totalCVA)} · ${fmt(totalCVA/portCVA.reduce((a,r)=>a+r.rfValue,0)*100,1)}% of gross FV`}>
        <DataTable
          columns={['Counterparty','Rating','CDS Spread','LGD','RF Value','CVA','Adj. Value','CVA Share','CS01','Risk Level']}
          rows={portRows}
          rowClass={(_,i)=>{
            const share=parseFloat(portCVA[i].cvaShare);
            return share>15?'row-bad':share>10?'row-warn':'';
          }}
        />
        <div style={{marginTop:10,padding:'8px 12px',background:'var(--surface2)',borderRadius:4,fontSize:11,display:'flex',gap:24}}>
          <span style={{color:'var(--text-sec)'}}>Portfolio —</span>
          <span>Total CVA: <strong style={{color:'var(--reject)'}}>{fmtM(totalCVA)}</strong></span>
          <span>RF Value: <strong>{fmtM(portCVA.reduce((a,r)=>a+r.rfValue,0),1)}</strong></span>
          <span>Adj. Value: <strong style={{color:'var(--approve)'}}>{fmtM(portCVA.reduce((a,r)=>a+r.adjValue,0),1)}</strong></span>
          <span>Port. CS01: <strong style={{color:'var(--flag)'}}>{
            (() => { const s=allCPs.reduce((a,c)=>a+computeCS01(c),0); return `${s>=0?'+':''}${(s*1000).toFixed(2)}k`; })()
          }</strong></span>
        </div>
      </SectionCard>
    </div>
  );
}
