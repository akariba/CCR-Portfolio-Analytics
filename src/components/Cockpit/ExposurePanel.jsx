import React from 'react';
import { getDecision, utilPct } from '../../state/riskState';

export default function ExposurePanel({ counterparties }) {
  return (
    <div className="panel" style={{ flex: 1 }}>
      <div className="panel-header">
        <span className="panel-title">Counterparty Exposure</span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>notional · fair value · utilisation</span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const u   = utilPct(cp.notional, cp.limit);
          const dec = getDecision(u);
          const hdm = cp.limit - cp.notional;
          return (
            <div key={cp.id} className="cp-row">
              <div>
                <div className="cp-name">{cp.name}</div>
                <div className="cp-sub">{cp.rating} · {cp.region}</div>
                <div className="cp-sub" style={{ marginTop: 2 }}>
                  FV <strong style={{ color: 'var(--text)' }}>${cp.fairValue}M</strong>
                  {' · '}
                  Adj <strong style={{ color: 'var(--text)' }}>${(cp.fairValue - cp.cva).toFixed(1)}M</strong>
                </div>
              </div>
              <div>
                <div className="cp-bar-bg">
                  <div className="cp-bar-fill" style={{ width: `${Math.min(u,100)}%`, background: dec.color }} />
                </div>
                <div className="cp-bar-label">
                  <span>${cp.notional}M</span><span>/ ${cp.limit}M</span>
                </div>
              </div>
              <div>
                <div className="cp-util" style={{ color: dec.color }}>{u.toFixed(1)}%</div>
                <div style={{ marginTop: 3 }}>
                  <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
                </div>
              </div>
              <div>
                <div className="cp-hdroom" style={{ color: hdm < 60 ? 'var(--reject)' : 'var(--text)' }}>
                  ${hdm}M
                </div>
                <div className="cp-sub" style={{ textAlign: 'right' }}>headroom</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
