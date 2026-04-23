import React from 'react';
import { currentState } from '../../state/riskState';

export default function AlertStrip({ counterparties }) {
  const alerts = [];
  Object.values(counterparties).forEach(cp => {
    const { dec, util, headroom, effPFE } = currentState(cp);
    if (dec.cls === 'reject') {
      alerts.push({ cls: 'reject',   text: `${cp.name}: PFE util ${util.toFixed(1)}% — exceeds 95% ceiling. No new trades.` });
    } else if (dec.cls === 'escalate') {
      alerts.push({ cls: 'escalate', text: `${cp.name}: PFE util ${util.toFixed(1)}% — 85–95% band. Escalate to Head of CCR before any new trades.` });
    } else if (dec.cls === 'flag') {
      alerts.push({ cls: 'flag',     text: `${cp.name}: PFE util ${util.toFixed(1)}% — Senior Desk sign-off required for new trades.` });
    } else if (headroom < 8) {
      alerts.push({ cls: 'flag',     text: `${cp.name}: PFE headroom $${headroom.toFixed(1)}M — limited capacity. Monitor before adding exposure.` });
    }
    if (cp.csa.type === 'One-Way') {
      alerts.push({ cls: 'flag',     text: `${cp.name}: One-way CSA — no collateral received. Higher capital charge applies.` });
    }
    if (cp.wwr === 'HIGH') {
      alerts.push({ cls: 'escalate', text: `${cp.name}: HIGH wrong-way risk (ρ=${cp.wwr_rho}) — exposure amplified in stress.` });
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
