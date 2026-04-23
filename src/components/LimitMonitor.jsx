import React from 'react';
import { getDecision, utilPct } from '../data/counterparties';

export default function LimitMonitor({ counterparties }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Limit / Headroom Monitor</span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>
          <span style={{ color: 'var(--flag)' }}>▎</span>70%
          {' '}
          <span style={{ color: 'var(--reject)' }}>▎</span>85%
        </span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const u = utilPct(cp.notional, cp.limit);
          const dec = getDecision(u);
          const headroom = cp.limit - cp.notional;
          return (
            <div key={cp.id} className="limit-row">
              <div className="limit-header">
                <span className="limit-name">{cp.name}</span>
                <span className="limit-values">
                  ${cp.notional}M / ${cp.limit}M
                  {' '}·{' '}
                  <span style={{ color: dec.color, fontWeight: 700 }}>{u.toFixed(1)}%</span>
                </span>
              </div>
              <div className="limit-bar-bg">
                <div
                  className="limit-bar-fill"
                  style={{ width: `${Math.min(u, 100)}%`, background: dec.color }}
                />
                <div className="limit-thresholds">
                  <div className="limit-line t70" />
                  <div className="limit-line t85" />
                </div>
              </div>
              <div className="limit-footer">
                <span>
                  <span className={`strip-badge badge-${dec.cls}`}>{dec.label}</span>
                </span>
                <span>
                  Headroom: <strong style={{ color: headroom < 50 ? 'var(--reject)' : 'var(--text)' }}>
                    ${headroom}M ({(100 - u).toFixed(1)}%)
                  </strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
