import React from 'react';

export default function CreditRisk({ cp }) {
  const jtdUtil  = (cp.jtd / cp.jtdLimit) * 100;
  const jtdDec   = jtdUtil > 85 ? 'reject' : jtdUtil > 70 ? 'flag' : 'approve';
  const wwrColor = cp.wwr === 'HIGH' ? 'var(--reject)' : cp.wwr === 'MEDIUM' ? 'var(--flag)' : 'var(--approve)';

  return (
    <>
      {cp.wwr === 'HIGH' && (
        <div className="lod1-box reject" style={{ marginBottom: 14 }}>
          <strong>Finding:</strong> Wrong-way risk rated HIGH — exposure and credit quality deteriorate together (ρ = {cp.wwr_rho}).<br />
          <strong>Action:</strong> Flag all new trades to Senior CCR. Obtain additional approval before booking.
        </div>
      )}

      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">WWR Rating</div>
          <div className={`a-metric-value ${cp.wwr === 'HIGH' ? 'danger' : cp.wwr === 'MEDIUM' ? 'warn' : 'good'}`}>
            {cp.wwr}
          </div>
          <div className="a-metric-sub">wrong-way risk level</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Correlation (ρ)</div>
          <div className={`a-metric-value ${cp.wwr_rho > 0.6 ? 'danger' : cp.wwr_rho > 0.4 ? 'warn' : 'good'}`}>
            {cp.wwr_rho}
          </div>
          <div className="a-metric-sub">exposure–credit correlation</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Jump-to-Default</div>
          <div className={`a-metric-value ${jtdDec === 'reject' ? 'danger' : jtdDec === 'flag' ? 'warn' : ''}`}>
            ${cp.jtd}M
          </div>
          <div className="a-metric-sub">loss at default</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">JTD Utilisation</div>
          <div className={`a-metric-value ${jtdUtil > 85 ? 'danger' : jtdUtil > 70 ? 'warn' : 'good'}`}>
            {jtdUtil.toFixed(1)}%
          </div>
          <div className="a-metric-sub">of ${cp.jtdLimit}M JTD limit</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">Wrong-Way Risk</span></div>
        <div className="a-card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <span className={`wwr-badge wwr-${cp.wwr}`}>{cp.wwr} WWR</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              Exposure–credit correlation ρ = <strong style={{ color: wwrColor }}>{cp.wwr_rho}</strong>
            </span>
          </div>
          <div className="fv-bar-row">
            <div className="fv-bar-label">Correlation</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${cp.wwr_rho * 100}%`, background: wwrColor }} />
            </div>
            <div className="fv-bar-val" style={{ color: wwrColor }}>{(cp.wwr_rho * 100).toFixed(0)}%</div>
          </div>
          <table className="a-table" style={{ marginTop: 14 }}>
            <thead>
              <tr><th>Scenario</th><th>Exposure ($M)</th><th>WWR Amplification</th><th>Effective Exposure ($M)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Base</td>
                <td>${cp.notional}M</td>
                <td>1.0×</td>
                <td>${cp.notional}M</td>
              </tr>
              <tr className={cp.wwr === 'HIGH' ? 'breach' : cp.wwr === 'MEDIUM' ? 'warn-row' : ''}>
                <td>WWR Stressed</td>
                <td>${cp.notional}M</td>
                <td style={{ color: wwrColor }}>{(1 + cp.wwr_rho * 0.5).toFixed(2)}×</td>
                <td style={{ color: wwrColor }}><strong>${(cp.notional * (1 + cp.wwr_rho * 0.5)).toFixed(0)}M</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">Jump-to-Default (JTD)</span></div>
        <div className="a-card-body">
          <div className="fv-bar-row">
            <div className="fv-bar-label">JTD Used</div>
            <div className="fv-bar-track">
              <div className="fv-bar-fill" style={{ width: `${Math.min(jtdUtil, 100)}%`, background: jtdDec === 'reject' ? 'var(--reject)' : jtdDec === 'flag' ? 'var(--flag)' : 'var(--approve)' }} />
            </div>
            <div className="fv-bar-val">{jtdUtil.toFixed(1)}%</div>
          </div>
          <table className="a-table" style={{ marginTop: 14 }}>
            <thead>
              <tr><th>Metric</th><th>Value</th><th>Limit</th><th>Headroom</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr className={jtdDec !== 'approve' ? (jtdDec === 'reject' ? 'breach' : 'warn-row') : ''}>
                <td>JTD Loss Estimate</td>
                <td><strong>${cp.jtd}M</strong></td>
                <td>${cp.jtdLimit}M</td>
                <td style={{ color: jtdDec === 'reject' ? 'var(--reject)' : jtdDec === 'flag' ? 'var(--flag)' : 'var(--approve)' }}>
                  ${(cp.jtdLimit - cp.jtd).toFixed(1)}M
                </td>
                <td><span className={`badge badge-${jtdDec}`}>{jtdDec === 'reject' ? 'BREACH' : jtdDec === 'flag' ? 'WARN' : 'OK'}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
