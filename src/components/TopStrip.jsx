import React from 'react';
import { getDecision, utilPct } from '../data/counterparties';

export default function TopStrip({ counterparties, selected, onSelect }) {
  return (
    <div className="top-strip">
      {Object.values(counterparties).map(cp => {
        const u = utilPct(cp.notional, cp.limit);
        const dec = getDecision(u);
        const headroom = cp.limit - cp.notional;
        const isSelected = selected === cp.id;
        return (
          <div
            key={cp.id}
            className={`strip-card dec-${dec.cls}${isSelected ? ' selected' : ''}`}
            onClick={() => onSelect(cp.id)}
            title={`Click to pre-trade with ${cp.name}`}
          >
            <div className="strip-name">{cp.id}</div>
            <div className="strip-notional">
              ${cp.notional}M <span>/ ${cp.limit}M</span>
            </div>
            <div className="strip-row">
              <span>Hdroom: <strong style={{ color: '#e2e8f0' }}>${headroom}M</strong></span>
              <span className={`strip-badge badge-${dec.cls}`}>{dec.label}</span>
            </div>
            <div className="strip-row" style={{ marginTop: 4 }}>
              <span className={`strip-util dec-${dec.cls}`}>{u.toFixed(1)}% utilised</span>
            </div>
            <div className="util-bar">
              <div
                className={`util-fill dec-${dec.cls}`}
                style={{ width: `${Math.min(u, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
