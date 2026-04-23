// ═══════════════════════════════════════════════════════════════════
// CCR DECISION PIPELINE — deterministic 8-step evaluation
// Input: counterparty + trade params
// Output: APPROVE / FLAG / ESCALATE / REJECT + structured findings
// ═══════════════════════════════════════════════════════════════════

// ── STEP 1: Fair Value ───────────────────────────────────────────
// At-market trades have zero initial FV; options carry a premium.
// FV is the starting point — only positive FV creates exposure.
export function step1_fairValue(type, notional) {
  const N = parseFloat(notional) || 0;
  switch (type) {
    case 'fxopt': return N * 0.02;   // option premium ~2%
    case 'eq':    return N * 0.01;   // equity deriv ~1%
    default:      return 0;           // at-market: FV = 0 at inception
  }
}

// ── STEP 2: Current Exposure ─────────────────────────────────────
// CE = max(FV, 0) — negative MtM has no credit exposure.
export function step2_currentExposure(fv) {
  return Math.max(fv, 0);
}

// ── STEP 3: PFE Add-on ───────────────────────────────────────────
// Supervisory factor × maturity adjustment × alpha = regulatory PFE add-on.
// This represents the worst-case future exposure from this trade.
export function step3_pfeAddon(type, notional, maturity) {
  const M  = Math.max(parseFloat(maturity) || 1, 0.25);
  const N  = parseFloat(notional) || 0;
  const MF = Math.sqrt(Math.min(M, 1));
  const sf = {
    fx:    0.04,
    fxopt: 0.052,
    irs:   0.005 * MF * M,
    cds:   0.0038 * MF * M,
    eq:    0.32,
  }[type] ?? 0.04;
  return 1.4 * sf * N;
}

// ── STEP 4: Portfolio PFE ────────────────────────────────────────
// New portfolio PFE = current portfolio PFE + incremental add-on.
export function step4_portfolioPFE(currentPFE, pfeAddon) {
  return currentPFE + pfeAddon;
}

// ── STEP 5: CSA / Collateral Adjustment ─────────────────────────
// Bilateral CSA: threshold reduces effective exposure.
// One-way CSA: no collateral received — no adjustment applied.
// Collateral reduces exposure but does NOT eliminate risk.
export function step5_csaAdjustment(portfolioPFE, csa) {
  if (csa.type === 'One-Way') {
    return { csaPFE: portfolioPFE, csaSaving: 0, csaNote: 'One-way CSA — no collateral received' };
  }
  const saving = Math.min(portfolioPFE, Math.max(csa.threshold, 0));
  return {
    csaPFE:   Math.max(portfolioPFE - csa.threshold, 0),
    csaSaving: saving,
    csaNote:  `Bilateral CSA — threshold $${csa.threshold}M reduces exposure by $${saving.toFixed(1)}M`,
  };
}

// ── STEP 6: WWR Adjustment ───────────────────────────────────────
// Wrong-Way Risk: when counterparty credit worsens, exposure tends to rise.
// HIGH WWR amplifies effective exposure by (1 + ρ × 0.30).
// MEDIUM WWR amplifies by (1 + ρ × 0.10).
// LOW WWR: no amplification.
export function step6_wwrAdjustment(csaPFE, wwr, rho) {
  const factor = wwr === 'HIGH'   ? 1 + rho * 0.30
               : wwr === 'MEDIUM' ? 1 + rho * 0.10
               : 1.0;
  return {
    wwrPFE:   csaPFE * factor,
    wwrFactor: factor,
    wwrNote:  wwr === 'LOW' ? 'LOW WWR — no amplification' :
              `${wwr} WWR — exposure amplified ${factor.toFixed(3)}× (ρ = ${rho})`,
  };
}

// ── STEP 7: Limit Check ──────────────────────────────────────────
// Utilisation = effective PFE / PFE credit limit.
// Notional does NOT drive this decision — PFE does.
export function step7_utilPct(effectivePFE, pfeLimit) {
  return (effectivePFE / pfeLimit) * 100;
}

// ── STEP 8: Decision Engine ──────────────────────────────────────
// Deterministic 4-state output based on utilisation.
export function step8_decision(pct) {
  if (pct < 70)  return { label: 'APPROVE',   cls: 'approve',   color: '#16a34a', threshold: '<70%' };
  if (pct <= 85) return { label: 'FLAG',       cls: 'flag',      color: '#d97706', threshold: '70–85%' };
  if (pct <= 95) return { label: 'ESCALATE',   cls: 'escalate',  color: '#ea580c', threshold: '85–95%' };
  return               { label: 'REJECT',     cls: 'reject',    color: '#dc2626', threshold: '>95%' };
}

// ─────────────────────────────────────────────────────────────────
// FULL PIPELINE — current counterparty state (no new trade)
// ─────────────────────────────────────────────────────────────────
export function currentState(cp) {
  const { csaPFE, csaSaving }       = step5_csaAdjustment(cp.currentPFE, cp.csa);
  const { wwrPFE, wwrFactor }       = step6_wwrAdjustment(csaPFE, cp.wwr, cp.wwr_rho);
  const util                         = step7_utilPct(wwrPFE, cp.pfeLimit);
  const dec                          = step8_decision(util);
  return {
    rawPFE:    cp.currentPFE,
    csaPFE,    csaSaving,
    effPFE:    wwrPFE,   wwrFactor,
    util,      dec,
    headroom:  cp.pfeLimit - wwrPFE,
    adjFV:     cp.fairValue - cp.cva,
  };
}

// ─────────────────────────────────────────────────────────────────
// FULL PIPELINE — pre-trade evaluation
// ─────────────────────────────────────────────────────────────────
export function runPreTrade(cp, type, notional, maturity) {
  // Step 1
  const fv   = step1_fairValue(type, notional);
  // Step 2
  const ce   = step2_currentExposure(fv);
  // Step 3
  const pfeAddon = step3_pfeAddon(type, notional, maturity);
  // Step 4 — before & after
  const currPortPFE = cp.currentPFE;
  const newPortPFE  = step4_portfolioPFE(currPortPFE, pfeAddon);
  // Step 5 — before & after
  const currCSA = step5_csaAdjustment(currPortPFE, cp.csa);
  const newCSA  = step5_csaAdjustment(newPortPFE,  cp.csa);
  // Step 6 — before & after
  const currWWR = step6_wwrAdjustment(currCSA.csaPFE, cp.wwr, cp.wwr_rho);
  const newWWR  = step6_wwrAdjustment(newCSA.csaPFE,  cp.wwr, cp.wwr_rho);
  // Step 7
  const currUtil = step7_utilPct(currWWR.wwrPFE, cp.pfeLimit);
  const newUtil  = step7_utilPct(newWWR.wwrPFE,  cp.pfeLimit);
  // Step 8
  const dec = step8_decision(newUtil);

  const cvaCost  = pfeAddon * cp.cvaRate;
  const findings = buildFindings(cp, type, notional, maturity, {
    fv, ce, pfeAddon, currPortPFE, newPortPFE,
    currCSA, newCSA, currWWR, newWWR,
    currUtil, newUtil, dec, cvaCost,
  });

  return {
    // Pipeline trace (all 8 steps)
    trace: {
      step1: { label: 'Fair Value',          before: null,             after: fv,           note: fv === 0 ? 'At-market — zero initial FV' : `Option premium ${(fv / parseFloat(notional) * 100).toFixed(1)}%` },
      step2: { label: 'Current Exposure',    before: null,             after: ce,           note: 'max(FV, 0) — negative MtM = no exposure' },
      step3: { label: 'PFE Add-on',          before: null,             after: pfeAddon,     note: `${type.toUpperCase()} supervisory factor × α=1.4` },
      step4: { label: 'Portfolio PFE',       before: currPortPFE,      after: newPortPFE,   note: `+$${pfeAddon.toFixed(1)}M incremental` },
      step5: { label: 'CSA Adjustment',      before: currCSA.csaPFE,   after: newCSA.csaPFE,  note: newCSA.csaNote },
      step6: { label: 'WWR Adjustment',      before: currWWR.wwrPFE,   after: newWWR.wwrPFE,  note: newWWR.wwrNote },
      step7: { label: 'Utilisation',         before: currUtil,         after: newUtil,       note: `vs PFE limit $${cp.pfeLimit}M` },
      step8: { label: 'Decision',            before: null,             after: null,          note: dec.label },
    },
    // Summary
    currUtil, newUtil, utilDelta: newUtil - currUtil,
    currEffPFE: currWWR.wwrPFE, newEffPFE: newWWR.wwrPFE,
    headroomBefore: cp.pfeLimit - currWWR.wwrPFE,
    headroomAfter:  cp.pfeLimit - newWWR.wwrPFE,
    fv, ce, pfeAddon, cvaCost, dec, findings,
    action: getAction(dec, cp),
    // FV pro-forma
    currFV: cp.fairValue,    currCVA: cp.cva,    currAdjFV: cp.fairValue - cp.cva,
    postFV: cp.fairValue + fv, postCVA: cp.cva + cvaCost,
    postAdjFV: (cp.fairValue + fv) - (cp.cva + cvaCost),
    deltaAdjFV: fv - cvaCost,
  };
}

function buildFindings(cp, type, notional, maturity, d) {
  const M   = parseFloat(maturity) || 1;
  const out = [];
  out.push(`PFE increases +$${d.pfeAddon.toFixed(1)}M → portfolio PFE $${d.currPortPFE}M → $${d.newPortPFE.toFixed(1)}M`);
  out.push(`Utilisation ${d.currUtil.toFixed(1)}% → ${d.newUtil.toFixed(1)}% (limit $${cp.pfeLimit}M)`);
  if (type === 'irs' || type === 'cds') {
    out.push(`${M}Y tenor adds long-dated exposure — peak PFE typically at 30–50% of maturity`);
  }
  if (d.newCSA.csaSaving > 0) {
    out.push(`CSA bilateral threshold $${cp.csa.threshold}M offsets $${d.newCSA.csaSaving.toFixed(1)}M of exposure`);
  } else {
    out.push(`One-way CSA — no collateral received from ${cp.name}`);
  }
  if (cp.wwr !== 'LOW') {
    out.push(`WWR ${cp.wwr}: exposure amplified ${d.newWWR.wwrFactor.toFixed(3)}× (ρ=${cp.wwr_rho}) — credit and exposure correlated`);
  }
  out.push(`Credit cost (CVA) = $${d.cvaCost.toFixed(2)}M at rate ${(cp.cvaRate * 100).toFixed(2)}%`);
  return out;
}

function getAction(dec, cp) {
  switch (dec.cls) {
    case 'approve':  return 'Submit trade ticket for standard booking. No additional approval required.';
    case 'flag':     return `Obtain Senior Desk sign-off and CCR countersign. Confirm no other pending trades with ${cp.name} before booking.`;
    case 'escalate': return `Escalate to Head of CCR and Front Office Management. Do not book without escalation sign-off from both.`;
    case 'reject':   return `Trade rejected. Effective PFE would exceed 95% of credit limit. Compress existing exposure with ${cp.name} or obtain a formal limit increase before retrying.`;
    default:         return '';
  }
}

// Convenience: utilPct alias for display components
export function utilPct(n, l) { return (n / l) * 100; }
// Convenience: getDecision alias
export { step8_decision as getDecision };
