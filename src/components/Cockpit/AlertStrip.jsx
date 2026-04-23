import React from 'react';
import { getDecision, utilPct } from '../../state/riskState';

export default function AlertStrip({ counterparties }) {
  const alerts = [];
  Object.values(counterparties).forEach(cp => {
    const u   = utilPct(cp.notional, cp.limit);
    const dec = getDecision(u);
    const hdm = cp.limit - cp.notional;
    if (dec.cls === 'reject') {
      alerts.push({ cls: 'reject', text: `${cp.name}: ${u.toFixed(1)}% utilised — exceeds 85% ceiling. No new trades. Compress exposure or raise limit.` });
    } else if (dec.cls === 'flag') {
      alerts.push({ cls: 'flag',   text: `${cp.name}: ${u.toFixed(1)}% utilised — in review band. Senior Desk sign-off required for new trades.` });
    } else if (hdm < 80) {
      alerts.push({ cls: 'flag',   text: `${cp.name}: headroom $${hdm}M — limited capacity. Monitor before adding exposure.` });
    }
  });
  if (!alerts.length) {
    alerts.push({ cls: 'approve', text: 'All counterparties within normal operating range.' });
  }
  return (
    <div className="alert-strip">
      {alerts.map((a, i) => (
        <div key={i} className={`alert-chip ${a.cls}`}>
          <div className="dot" />{a.text}
        </div>
      ))}
    </div>
  );
}
