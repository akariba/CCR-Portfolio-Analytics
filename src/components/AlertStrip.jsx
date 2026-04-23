import React from 'react';
import { getDecision, utilPct } from '../data/counterparties';

export default function AlertStrip({ counterparties }) {
  const alerts = [];

  Object.values(counterparties).forEach(cp => {
    const u = utilPct(cp.notional, cp.limit);
    const dec = getDecision(u);
    const headroom = cp.limit - cp.notional;

    if (dec.cls === 'reject') {
      alerts.push({
        cls: 'reject',
        text: `${cp.name}: utilisation ${u.toFixed(1)}% — exceeds 85% ceiling. No new trades until limit increased or exposure compressed.`,
      });
    } else if (dec.cls === 'flag') {
      alerts.push({
        cls: 'flag',
        text: `${cp.name}: utilisation ${u.toFixed(1)}% — in review band. Senior Desk sign-off required for new trades.`,
      });
    } else if (headroom < 80) {
      alerts.push({
        cls: 'flag',
        text: `${cp.name}: headroom $${headroom}M — approaching limit. Monitor before adding new exposure.`,
      });
    }
  });

  if (alerts.length === 0) {
    alerts.push({ cls: 'approve', text: 'All counterparties within normal operating range.' });
  }

  return (
    <div className="alert-strip">
      {alerts.map((a, i) => (
        <div key={i} className={`alert-chip ${a.cls}`}>
          <div className="dot" />
          {a.text}
        </div>
      ))}
    </div>
  );
}
