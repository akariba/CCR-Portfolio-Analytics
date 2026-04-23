import React from 'react';
import { getDecision, utilPct } from '../../state/riskState';

export default function TopStrip({ counterparties, selected, onSelect }) {
  return (
    <div className="top-strip">
      {Object.values(counterparties).map(cp => {
        const u   = utilPct(cp.notional, cp.limit);
        const dec = getDecision(u);
        const hdm = cp.limit - cp.notional;
        const adjFV = (cp.fairValue - cp.cva).toFixed(1);
        return (
          <div
            key={cp.id}
            className={`strip-card dec-${dec.cls}${selected === cp.id ? ' selected' : ''}`}
            onClick={() => onSelect(cp.id)}
            title="Click to pre-trade"
          >
            <div className="s-id">{cp.id} · {cp.rating}</div>
            <div className="s-name">{cp.name}</div>
            <div className="s-notional">${cp.notional}M <em>/ ${cp.limit}M</em></div>
            <div className="s-fv">FV <strong>${cp.fairValue}M</strong> · Adj <strong>${adjFV}M</strong></div>
            <div className="s-row" style={{ marginTop: 7 }}>
              <span className={`s-util dec-${dec.cls}`}>{u.toFixed(1)}%</span>
              <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
            </div>
            <div className="s-row" style={{ marginTop: 3, fontSize: 10, color: 'var(--muted)' }}>
              <span>Hdm: <strong style={{ color: hdm < 60 ? 'var(--reject)' : 'var(--text)' }}>${hdm}M</strong></span>
              <span>{cp.region}</span>
            </div>
            <div className="util-bar">
              <div className={`util-fill dec-${dec.cls}`} style={{ width: `${Math.min(u, 100)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
