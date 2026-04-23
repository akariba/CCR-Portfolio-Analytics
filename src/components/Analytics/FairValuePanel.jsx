import React from 'react';

export default function FairValuePanel({ cp }) {
  const adjFV    = cp.fairValue - cp.cva;
  const cvaShare = ((cp.cva / cp.fairValue) * 100).toFixed(1);
  const maxBar   = cp.fairValue;

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">Gross Fair Value</div>
          <div className="a-metric-value">${cp.fairValue}M</div>
          <div className="a-metric-sub">mark-to-market</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">CVA Charge</div>
          <div className="a-metric-value danger">${cp.cva}M</div>
          <div className="a-metric-sub">{cvaShare}% of gross FV</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Adjusted Fair Value</div>
          <div className="a-metric-value good">${adjFV.toFixed(1)}M</div>
          <div className="a-metric-sub">FV net of credit cost</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Credit Cost Rate</div>
          <div className="a-metric-value">{(cp.cvaRate * 100).toFixed(2)}%</div>
          <div className="a-metric-sub">per unit of exposure</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">Fair Value Breakdown</span></div>
        <div className="a-card-body">
          <div className="fv-bar-row">
            <div className="fv-bar-label">Gross FV</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: '100%', background: 'var(--accent)' }} />
            </div>
            <div className="fv-bar-val" style={{ color: 'var(--accent)' }}>${cp.fairValue}M</div>
          </div>
          <div className="fv-bar-row">
            <div className="fv-bar-label">CVA Deduction</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${(cp.cva / maxBar) * 100}%`, background: 'var(--reject)' }} />
            </div>
            <div className="fv-bar-val" style={{ color: 'var(--reject)' }}>−${cp.cva}M</div>
          </div>
          <div className="fv-bar-row">
            <div className="fv-bar-label">Adjusted FV</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${(adjFV / maxBar) * 100}%`, background: 'var(--approve)' }} />
            </div>
            <div className="fv-bar-val" style={{ color: 'var(--approve)' }}>${adjFV.toFixed(1)}M</div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
            <table className="a-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Value ($M)</th>
                  <th>% of Gross FV</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gross Fair Value</td>
                  <td><strong>${cp.fairValue}M</strong></td>
                  <td>100%</td>
                  <td style={{ color: 'var(--muted)' }}>mark-to-market</td>
                </tr>
                <tr>
                  <td>CVA</td>
                  <td style={{ color: 'var(--reject)' }}><strong>−${cp.cva}M</strong></td>
                  <td style={{ color: 'var(--reject)' }}>{cvaShare}%</td>
                  <td style={{ color: 'var(--muted)' }}>credit risk cost</td>
                </tr>
                <tr>
                  <td>Adjusted FV</td>
                  <td style={{ color: 'var(--approve)' }}><strong>${adjFV.toFixed(1)}M</strong></td>
                  <td style={{ color: 'var(--approve)' }}>{(100 - parseFloat(cvaShare)).toFixed(1)}%</td>
                  <td style={{ color: 'var(--muted)' }}>economic net value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
