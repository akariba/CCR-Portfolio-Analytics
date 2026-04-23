import React from 'react';

export default function SettlementRisk({ cp }) {
  const dslUtil = (cp.settlementExposure / cp.dsl) * 100;
  const dslDec  = dslUtil > 85 ? 'reject' : dslUtil > 70 ? 'flag' : 'approve';

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">Settlement Exposure</div>
          <div className={`a-metric-value ${dslDec === 'reject' ? 'danger' : dslDec === 'flag' ? 'warn' : ''}`}>
            ${cp.settlementExposure}M
          </div>
          <div className="a-metric-sub">current outstanding</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Daily Settlement Limit</div>
          <div className="a-metric-value">${cp.dsl}M</div>
          <div className="a-metric-sub">approved DSL</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">DSL Utilisation</div>
          <div className={`a-metric-value ${dslDec === 'reject' ? 'danger' : dslDec === 'flag' ? 'warn' : 'good'}`}>
            {dslUtil.toFixed(1)}%
          </div>
          <div className="a-metric-sub">of daily limit</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Settlement Window</div>
          <div className="a-metric-value">{cp.settlementWindow}d</div>
          <div className="a-metric-sub">standard T+{cp.settlementWindow}</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">Daily Settlement Limit (DSL)</span></div>
        <div className="a-card-body">
          <div className="fv-bar-row">
            <div className="fv-bar-label">DSL Used</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{
                width: `${Math.min(dslUtil, 100)}%`,
                background: dslDec === 'reject' ? 'var(--reject)' : dslDec === 'flag' ? 'var(--flag)' : 'var(--approve)'
              }} />
            </div>
            <div className="fv-bar-val">{dslUtil.toFixed(1)}%</div>
          </div>

          <table className="a-table" style={{ marginTop: 16 }}>
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Limit</th><th>Headroom</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr className={dslDec !== 'approve' ? (dslDec === 'reject' ? 'breach' : 'warn-row') : ''}>
                <td>Settlement Exposure</td>
                <td><strong>${cp.settlementExposure}M</strong></td>
                <td>${cp.dsl}M</td>
                <td style={{ color: dslDec === 'reject' ? 'var(--reject)' : dslDec === 'flag' ? 'var(--flag)' : 'var(--approve)' }}>
                  ${(cp.dsl - cp.settlementExposure).toFixed(1)}M
                </td>
                <td><span className={`badge badge-${dslDec}`}>{dslDec === 'reject' ? 'BREACH' : dslDec === 'flag' ? 'WARN' : 'OK'}</span></td>
              </tr>
              <tr>
                <td>Settlement Window</td>
                <td>T+{cp.settlementWindow}</td>
                <td>—</td>
                <td>—</td>
                <td>
                  <span className={`badge badge-${cp.settlementWindow > 1 ? 'flag' : 'approve'}`}>
                    {cp.settlementWindow > 1 ? 'STANDARD' : 'SAME-DAY'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {dslDec !== 'approve' && (
            <div className={`lod1-box ${dslDec}`} style={{ marginTop: 14 }}>
              <strong>Finding:</strong> Settlement exposure ${cp.settlementExposure}M is {dslUtil.toFixed(1)}% of DSL ${cp.dsl}M.<br />
              <strong>Action:</strong> {dslDec === 'reject'
                ? 'Halt new settlements. Contact Operations and CCR desk immediately.'
                : 'Monitor closely. Reduce outstanding settlements before booking new trades.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
