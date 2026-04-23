import React from 'react';
import { getDecision, utilPct } from '../../state/riskState';

export default function LimitMonitor({ counterparties }) {
  return (
    <div className="panel" style={{ flex: 1 }}>
      <div className="panel-header">
        <span className="panel-title">Limit / Headroom Monitor</span>
        <span style={{ fontSize: 10 }}>
          <span style={{ color: 'var(--flag)' }}>▎</span>70%{' '}
          <span style={{ color: 'var(--reject)' }}>▎</span>85%
        </span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const u   = utilPct(cp.notional, cp.limit);
          const dec = getDecision(u);
          const hdm = cp.limit - cp.notional;
          return (
            <div key={cp.id} className="lm-row">
              <div className="lm-header">
                <span className="lm-name">{cp.name}</span>
                <span className="lm-vals">
                  ${cp.notional}M / ${cp.limit}M ·{' '}
                  <strong style={{ color: dec.color }}>{u.toFixed(1)}%</strong>
                </span>
              </div>
              <div className="lm-bar-bg">
                <div className="lm-bar-fill" style={{ width: `${Math.min(u,100)}%`, background: dec.color }} />
                <div className="lm-line lm-t70" />
                <div className="lm-line lm-t85" />
              </div>
              <div className="lm-footer">
                <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
                <span>
                  Headroom:{' '}
                  <strong style={{ color: hdm < 60 ? 'var(--reject)' : 'var(--text)' }}>
                    ${hdm}M ({(100 - u).toFixed(1)}%)
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
