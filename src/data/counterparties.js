export const COUNTERPARTIES = {
  DB:  { id: 'DB',  name: 'Deutsche Bank',  notional: 490, limit: 600, cvaRate: 0.0695, region: 'EU',  rating: 'BBB+' },
  CS:  { id: 'CS',  name: 'Credit Suisse',  notional: 230, limit: 400, cvaRate: 0.0957, region: 'EU',  rating: 'BBB'  },
  BAR: { id: 'BAR', name: 'Barclays',       notional: 310, limit: 450, cvaRate: 0.0903, region: 'UK',  rating: 'BBB+' },
  JPM: { id: 'JPM', name: 'JP Morgan',      notional: 570, limit: 750, cvaRate: 0.0333, region: 'US',  rating: 'AA-'  },
  BNP: { id: 'BNP', name: 'BNP Paribas',   notional: 250, limit: 400, cvaRate: 0.0960, region: 'EU',  rating: 'BBB+' },
};

export const TRADE_TYPES = [
  { value: 'fx',    label: 'FX Forward',      factor: 0.04,   maturityRequired: false },
  { value: 'fxopt', label: 'FX Option',       factor: 0.052,  maturityRequired: false },
  { value: 'irs',   label: 'Interest Rate Swap', factor: null, maturityRequired: true  },
  { value: 'cds',   label: 'Credit Default Swap', factor: null, maturityRequired: true },
  { value: 'eq',    label: 'Equity Derivative', factor: 0.32, maturityRequired: false },
];

export function calcExposureAddon(type, notional, maturity) {
  const M = Math.max(parseFloat(maturity) || 1, 0.25);
  const N = parseFloat(notional) || 0;
  const MF = Math.sqrt(Math.min(M, 1));
  let sf;
  switch (type) {
    case 'fx':    sf = 0.04; break;
    case 'fxopt': sf = 0.052; break;
    case 'irs':   sf = 0.005 * MF * M; break;
    case 'cds':   sf = 0.0038 * MF * M; break;
    case 'eq':    sf = 0.32; break;
    default:      sf = 0.04;
  }
  return 1.4 * sf * N;
}

export function getDecision(utilPct) {
  if (utilPct < 70) return { label: 'APPROVE', cls: 'approve', color: '#16a34a' };
  if (utilPct <= 85) return { label: 'FLAG',    cls: 'flag',    color: '#d97706' };
  return                     { label: 'REJECT',  cls: 'reject',  color: '#dc2626' };
}

export function utilPct(notional, limit) {
  return (notional / limit) * 100;
}
