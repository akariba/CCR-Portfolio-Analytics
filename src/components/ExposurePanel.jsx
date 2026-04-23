import React from 'react';
import { getDecision, utilPct } from '../data/counterparties';

export default function ExposurePanel({ counterparties }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Counterparty Exposure</span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>notional vs limit</span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const u = utilPct(cp.notional, cp.limit);
          const dec = getDecision(u);
          const headroom = cp.limit - cp.notional;
          return (
            <div key={cp.id} className="cp-row">
              <div>
                <div className="cp-name">{cp.name}</div>
                <div className="cp-region">{cp.region} · {cp.rating}</div>
              </div>
              <div className="cp-bar-wrap">
                <div className="cp-bar-bg">
                  <div
                    className={`cp-bar-fill dec-${dec.cls}`}
                    style={{ width: `${Math.min(u, 100)}%`, background: dec.color }}
                  />
                </div>
                <div className="cp-bar-label">
                  <span>${cp.notional}M notional</span>
                  <span>limit ${cp.limit}M</span>
                </div>
              </div>
              <div>
                <div className={`cp-util-val`} style={{ color: dec.color }}>{u.toFixed(1)}%</div>
                <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 1, textAlign: 'right' }}>
                  <span className={`strip-badge badge-${dec.cls}`}>{dec.label}</span>
                </div>
              </div>
              <div className="cp-headroom">
                <div style={{ fontSize: 13, fontWeight: 700, color: headroom < 50 ? 'var(--reject)' : 'var(--text)' }}>
                  ${headroom}M
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>headroom</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
