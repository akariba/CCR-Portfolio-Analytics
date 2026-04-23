import React from 'react';
import { currentState } from '../../state/riskState';

export default function LimitMonitor({ counterparties }) {
  return (
    <div className="panel" style={{ flex: 1 }}>
      <div className="panel-header">
        <span className="panel-title">PFE Limit Monitor</span>
        <span style={{ fontSize: 10 }}>
          <span style={{ color: 'var(--flag)' }}>▎</span>70%{' '}
          <span style={{ color: 'var(--escalate)' }}>▎</span>85%{' '}
          <span style={{ color: 'var(--reject)' }}>▎</span>95%
        </span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const { effPFE, util, dec, headroom } = currentState(cp);
          return (
            <div key={cp.id} className="lm-row">
              <div className="lm-header">
                <span className="lm-name">{cp.name}</span>
                <span className="lm-vals">
                  PFE ${effPFE.toFixed(1)}M / ${cp.pfeLimit}M ·{' '}
                  <strong style={{ color: dec.color }}>{util.toFixed(1)}%</strong>
                </span>
              </div>
              <div className="lm-bar-bg">
                <div className="lm-bar-fill" style={{ width: `${Math.min(util, 100)}%`, background: dec.color }} />
                <div className="lm-line lm-t70" />
                <div className="lm-line lm-t85" />
                {/* 95% threshold line */}
                <div className="lm-line" style={{ left: '95%', background: 'var(--reject)' }} />
              </div>
              <div className="lm-footer">
                <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
                <span>
                  Headroom:{' '}
                  <strong style={{ color: headroom < 8 ? 'var(--reject)' : 'var(--text)' }}>
                    ${headroom.toFixed(1)}M ({(100 - util).toFixed(1)}%)
                  </strong>
                  {' '}PFE capacity
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
