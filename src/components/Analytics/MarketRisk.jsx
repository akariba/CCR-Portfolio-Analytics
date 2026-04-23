import React from 'react';

export default function MarketRisk({ cp }) {
  const sVarRatio = (cp.stressVar / cp.var99).toFixed(2);
  const maxBar    = cp.stressVar * 1.1;

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">VaR (99%, 1-day)</div>
          <div className="a-metric-value warn">${cp.var99}M</div>
          <div className="a-metric-sub">parametric</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Stress VaR</div>
          <div className="a-metric-value danger">${cp.stressVar}M</div>
          <div className="a-metric-sub">10-day stressed period</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Stress / VaR Ratio</div>
          <div className={`a-metric-value ${parseFloat(sVarRatio) > 3 ? 'danger' : 'warn'}`}>{sVarRatio}×</div>
          <div className="a-metric-sub">tail amplification</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Limit</div>
          <div className="a-metric-value">$50M</div>
          <div className="a-metric-sub">VaR limit (daily)</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">VaR vs Stress VaR</span></div>
        <div className="a-card-body">
          <div className="fv-bar-row">
            <div className="fv-bar-label">VaR 99%</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${(cp.var99 / maxBar) * 100}%`, background: 'var(--flag)' }} />
            </div>
            <div className="fv-bar-val" style={{ color: 'var(--flag)' }}>${cp.var99}M</div>
          </div>
          <div className="fv-bar-row">
            <div className="fv-bar-label">Stress VaR</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${(cp.stressVar / maxBar) * 100}%`, background: 'var(--reject)' }} />
            </div>
            <div className="fv-bar-val" style={{ color: 'var(--reject)' }}>${cp.stressVar}M</div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
            <table className="a-table">
              <thead>
                <tr><th>Metric</th><th>Value</th><th>Limit</th><th>Headroom</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily VaR (99%)</td>
                  <td style={{ color: 'var(--flag)' }}><strong>${cp.var99}M</strong></td>
                  <td>$50M</td>
                  <td style={{ color: cp.var99 > 40 ? 'var(--reject)' : 'var(--approve)' }}>
                    ${(50 - cp.var99).toFixed(1)}M
                  </td>
                  <td><span className={`badge badge-${cp.var99 > 40 ? 'flag' : 'approve'}`}>{cp.var99 > 40 ? 'WARN' : 'OK'}</span></td>
                </tr>
                <tr>
                  <td>Stress VaR</td>
                  <td style={{ color: 'var(--reject)' }}><strong>${cp.stressVar}M</strong></td>
                  <td>$120M</td>
                  <td style={{ color: cp.stressVar > 100 ? 'var(--reject)' : 'var(--approve)' }}>
                    ${(120 - cp.stressVar).toFixed(1)}M
                  </td>
                  <td><span className={`badge badge-${cp.stressVar > 100 ? 'reject' : 'approve'}`}>{cp.stressVar > 100 ? 'BREACH' : 'OK'}</span></td>
                </tr>
                <tr>
                  <td>Stress Multiplier</td>
                  <td><strong>{sVarRatio}×</strong></td>
                  <td>3.0×</td>
                  <td style={{ color: parseFloat(sVarRatio) > 3 ? 'var(--reject)' : 'var(--approve)' }}>
                    {(3 - parseFloat(sVarRatio)).toFixed(2)}× buffer
                  </td>
                  <td><span className={`badge badge-${parseFloat(sVarRatio) > 3 ? 'flag' : 'approve'}`}>{parseFloat(sVarRatio) > 3 ? 'WARN' : 'OK'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
