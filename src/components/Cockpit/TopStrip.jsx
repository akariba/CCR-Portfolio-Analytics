import React from 'react';
import { currentState } from '../../state/riskState';

export default function TopStrip({ counterparties, selected, onSelect }) {
  return (
    <div className="top-strip">
      {Object.values(counterparties).map(cp => {
        const s = currentState(cp);
        return (
          <div
            key={cp.id}
            className={`strip-card dec-${s.dec.cls}${selected === cp.id ? ' selected' : ''}`}
            onClick={() => onSelect(cp.id)}
            title="Click to pre-trade"
          >
            <div className="s-id">{cp.id} · {cp.rating}</div>
            <div className="s-name">{cp.name}</div>

            {/* PFE vs limit — primary metric */}
            <div className="s-notional">
              ${s.effPFE.toFixed(1)}M <em>PFE / ${cp.pfeLimit}M</em>
            </div>
            <div className="s-fv" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>
              Notional ${cp.notional}M · FV ${cp.fairValue}M · AdjFV ${s.adjFV.toFixed(1)}M
            </div>

            <div className="s-row" style={{ marginTop: 7 }}>
              <span className={`s-util dec-${s.dec.cls}`}>{s.util.toFixed(1)}%</span>
              <span className={`badge badge-${s.dec.cls}`}>{s.dec.label}</span>
            </div>
            <div className="s-row" style={{ marginTop: 3, fontSize: 10, color: 'var(--muted)' }}>
              <span>Hdm: <strong style={{ color: s.headroom < 10 ? 'var(--reject)' : 'var(--text)' }}>
                ${s.headroom.toFixed(1)}M PFE
              </strong></span>
              <span>{cp.csa.type === 'One-Way' ? '⚠ 1-way CSA' : cp.region}</span>
            </div>
            <div className="util-bar">
              <div className={`util-fill dec-${s.dec.cls}`} style={{ width: `${Math.min(s.util, 100)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
