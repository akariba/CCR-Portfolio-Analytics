import React from 'react';
import { currentState } from '../../state/riskState';

export default function ExposurePanel({ counterparties }) {
  return (
    <div className="panel" style={{ flex: 1 }}>
      <div className="panel-header">
        <span className="panel-title">Counterparty Exposure</span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>effective PFE · CSA &amp; WWR adjusted</span>
      </div>
      <div className="panel-body">
        {Object.values(counterparties).map(cp => {
          const { effPFE, csaPFE, util, dec, headroom, adjFV } = currentState(cp);
          return (
            <div key={cp.id} className="cp-row">
              <div>
                <div className="cp-name">{cp.name}</div>
                <div className="cp-sub">{cp.rating} · {cp.region}</div>
                <div className="cp-sub" style={{ marginTop: 2 }}>
                  FV <strong style={{ color: 'var(--text)' }}>${cp.fairValue}M</strong>
                  {' '}· Adj <strong style={{ color: 'var(--text)' }}>${adjFV.toFixed(1)}M</strong>
                </div>
              </div>
              <div>
                <div className="cp-bar-bg">
                  {/* raw PFE bar (lighter) */}
                  <div style={{
                    height: '100%', borderRadius: 3, position: 'absolute',
                    width: `${Math.min((cp.currentPFE / cp.pfeLimit) * 100, 100)}%`,
                    background: dec.color, opacity: 0.25,
                  }} />
                  {/* effective PFE bar */}
                  <div className="cp-bar-fill" style={{ width: `${Math.min(util, 100)}%`, background: dec.color }} />
                </div>
                <div className="cp-bar-label">
                  <span>PFE ${effPFE.toFixed(1)}M</span>
                  <span>limit ${cp.pfeLimit}M</span>
                </div>
                <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>
                  {cp.csa.type === 'One-Way' ? '⚠ No CSA benefit' : `CSA −$${Math.max(cp.currentPFE - csaPFE, 0).toFixed(1)}M`}
                  {' · '}
                  {cp.wwr !== 'LOW' ? `WWR ${cp.wwr} ×${(1 + cp.wwr_rho * (cp.wwr === 'HIGH' ? 0.3 : 0.1)).toFixed(3)}` : 'WWR LOW'}
                </div>
              </div>
              <div>
                <div className="cp-util" style={{ color: dec.color }}>{util.toFixed(1)}%</div>
                <div style={{ marginTop: 3 }}>
                  <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
                </div>
              </div>
              <div>
                <div className="cp-hdroom" style={{ color: headroom < 8 ? 'var(--reject)' : 'var(--text)' }}>
                  ${headroom.toFixed(1)}M
                </div>
                <div className="cp-sub" style={{ textAlign: 'right' }}>PFE hdm</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
