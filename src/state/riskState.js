// CCR Decision Pipeline — 8-step deterministic evaluation
// FV → CE → PFE → Portfolio PFE → CSA → WWR → Utilisation → Decision

export function step1_fairValue(type, notional) {
  const N = parseFloat(notional) || 0;
  return type === 'fxopt' ? N * 0.02 : type === 'eq' ? N * 0.01 : 0;
}
export function step2_currentExposure(fv) { return Math.max(fv, 0); }

export function step3_pfeAddon(type, notional, maturity) {
  const M  = Math.max(parseFloat(maturity) || 1, 0.25);
  const N  = parseFloat(notional) || 0;
  const MF = Math.sqrt(Math.min(M, 1));
  const sf = {fx:0.04, fxopt:0.052, irs:0.005*MF*M, cds:0.0038*MF*M, eq:0.32}[type] ?? 0.04;
  return 1.4 * sf * N;
}

export function step5_csaAdjustment(pfe, csa) {
  if (csa.type === 'One-Way') return {csaPFE:pfe, csaSaving:0, note:'One-way CSA — no collateral received'};
  const saving = Math.min(pfe, csa.threshold);
  return {csaPFE:Math.max(pfe - csa.threshold, 0), csaSaving:saving, note:`Bilateral — threshold $${csa.threshold}M`};
}

export function step6_wwrAdjustment(csaPFE, wwr, rho) {
  const f = wwr==='HIGH' ? 1+rho*0.30 : wwr==='MEDIUM' ? 1+rho*0.10 : 1.0;
  return {wwrPFE:csaPFE*f, wwrFactor:f};
}

export function step7_utilPct(effPFE, limit) { return (effPFE / limit) * 100; }

export function getDecision(pct) {
  if (pct < 70)  return {label:'APPROVE',  cls:'approve',  color:'#006644'};
  if (pct <= 85) return {label:'FLAG',     cls:'flag',     color:'#974f0c'};
  if (pct <= 95) return {label:'ESCALATE', cls:'escalate', color:'#bf2600'};
  return               {label:'REJECT',   cls:'reject',   color:'#991b1b'};
}
export { getDecision as step8_decision };

export function currentState(cp) {
  const {csaPFE, csaSaving}     = step5_csaAdjustment(cp.currentPFE, cp.csa);
  const {wwrPFE, wwrFactor}     = step6_wwrAdjustment(csaPFE, cp.wwr, cp.wwr_rho);
  const util                     = step7_utilPct(wwrPFE, cp.pfeLimit);
  const dec                      = getDecision(util);
  return {rawPFE:cp.currentPFE, csaPFE, csaSaving, effPFE:wwrPFE, wwrFactor, util, dec,
          headroom:cp.pfeLimit - wwrPFE, adjFV:cp.fairValue - cp.cva};
}

export function runPreTrade(cp, type, notional, maturity) {
  const fv       = step1_fairValue(type, notional);
  const ce       = step2_currentExposure(fv);
  const addon    = step3_pfeAddon(type, notional, maturity);
  const currCSA  = step5_csaAdjustment(cp.currentPFE, cp.csa);
  const newCSA   = step5_csaAdjustment(cp.currentPFE + addon, cp.csa);
  const currWWR  = step6_wwrAdjustment(currCSA.csaPFE, cp.wwr, cp.wwr_rho);
  const newWWR   = step6_wwrAdjustment(newCSA.csaPFE,  cp.wwr, cp.wwr_rho);
  const currUtil = step7_utilPct(currWWR.wwrPFE, cp.pfeLimit);
  const newUtil  = step7_utilPct(newWWR.wwrPFE,  cp.pfeLimit);
  const dec      = getDecision(newUtil);
  const cvaCost  = addon * cp.cvaRate;

  const findings = [];
  const M = parseFloat(maturity) || 1;
  findings.push(`PFE add-on +$${addon.toFixed(1)}M → portfolio PFE $${cp.currentPFE}M → $${(cp.currentPFE+addon).toFixed(1)}M`);
  findings.push(`Utilisation ${currUtil.toFixed(1)}% → ${newUtil.toFixed(1)}% (PFE limit $${cp.pfeLimit}M)`);
  if (type==='irs'||type==='cds') findings.push(`${M}Y tenor adds long-dated exposure — peak PFE at mid-life`);
  if (newCSA.csaSaving>0) findings.push(`Bilateral CSA threshold $${cp.csa.threshold}M offsets $${newCSA.csaSaving.toFixed(1)}M`);
  else findings.push(`One-way CSA — no collateral benefit on this trade`);
  if (cp.wwr!=='LOW') findings.push(`WWR ${cp.wwr}: amplification ${newWWR.wwrFactor.toFixed(3)}× (ρ=${cp.wwr_rho})`);
  findings.push(`CVA credit cost $${cvaCost.toFixed(2)}M at ${(cp.cvaRate*100).toFixed(2)}% rate`);

  const action = dec.cls==='approve'  ? 'Submit for standard booking. No additional approval required.'
               : dec.cls==='flag'     ? `Obtain Senior Desk sign-off and CCR countersign before booking.`
               : dec.cls==='escalate' ? `Escalate to Head of CCR and FO Management. Do not book without dual sign-off.`
               : `Trade rejected. Compress existing exposure or obtain formal limit increase.`;

  return {
    fv, ce, addon, cvaCost, dec,
    currUtil, newUtil, utilDelta:newUtil-currUtil,
    currEffPFE:currWWR.wwrPFE, newEffPFE:newWWR.wwrPFE,
    headroomBefore:cp.pfeLimit-currWWR.wwrPFE, headroomAfter:cp.pfeLimit-newWWR.wwrPFE,
    currFV:cp.fairValue, currCVA:cp.cva, currAdjFV:cp.fairValue-cp.cva,
    postFV:cp.fairValue+fv, postCVA:cp.cva+cvaCost, postAdjFV:(cp.fairValue+fv)-(cp.cva+cvaCost),
    deltaAdjFV:fv-cvaCost, findings, action,
  };
}

export function utilPct(n, l) { return (n/l)*100; }
