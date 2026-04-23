export function utilPct(notional, limit) {
  return (notional / limit) * 100;
}

export function getDecision(pct) {
  if (pct < 70)  return { label: 'APPROVE', cls: 'approve', color: '#16a34a' };
  if (pct <= 85) return { label: 'FLAG',    cls: 'flag',    color: '#d97706' };
  return               { label: 'REJECT',  cls: 'reject',  color: '#dc2626' };
}

export function calcExposureAddon(type, notional, maturity) {
  const M  = Math.max(parseFloat(maturity) || 1, 0.25);
  const N  = parseFloat(notional) || 0;
  const MF = Math.sqrt(Math.min(M, 1));
  const sf = { fx: 0.04, fxopt: 0.052, irs: 0.005 * MF * M, cds: 0.0038 * MF * M, eq: 0.32 }[type] ?? 0.04;
  return 1.4 * sf * N;
}

export function calcFVImpact(type, notional) {
  const N = parseFloat(notional) || 0;
  // At-market trades have near-zero initial FV; options carry a premium
  return type === 'fxopt' ? N * 0.02 : type === 'eq' ? N * 0.01 : 0;
}

export function runPreTrade(cp, type, notional, maturity) {
  const addon      = calcExposureAddon(type, notional, maturity);
  const fvImpact   = calcFVImpact(type, notional);
  const cvaCost    = addon * cp.cvaRate;
  const newNotional= cp.notional + addon;
  const currUtil   = utilPct(cp.notional, cp.limit);
  const newUtil    = utilPct(newNotional, cp.limit);
  const dec        = getDecision(newUtil);

  const currAdjFV  = cp.fairValue - cp.cva;
  const postFV     = cp.fairValue + fvImpact;
  const postCVA    = cp.cva + cvaCost;
  const postAdjFV  = postFV - postCVA;
  const deltaAdjFV = postAdjFV - currAdjFV;

  let reason, action;
  if (dec.cls === 'approve') {
    reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — within limit. Trade can proceed.`;
    action = 'Submit trade ticket for standard booking. No additional approval required.';
  } else if (dec.cls === 'flag') {
    reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — enters review band (70–85%).`;
    action = `Obtain Senior Desk sign-off and CCR countersign. Confirm no other pending trades with ${cp.name}.`;
  } else {
    reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — exceeds 85% hard ceiling. Trade blocked.`;
    action = `Compress existing exposure with ${cp.name} or obtain a formal limit increase before retrying.`;
  }

  return {
    addon, fvImpact, cvaCost, newNotional, currUtil, newUtil, dec,
    headroomBefore: cp.limit - cp.notional,
    headroomAfter:  cp.limit - newNotional,
    utilDelta:      newUtil - currUtil,
    currFV: cp.fairValue, currCVA: cp.cva, currAdjFV,
    postFV, postCVA, postAdjFV, deltaAdjFV,
    reason, action,
  };
}
