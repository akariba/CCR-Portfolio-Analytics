import React from 'react';

export default function CollateralPanel({ cp }) {
  const { type, threshold, mta, law, capitalFlag } = cp.csa;
  const isBilateral = type === 'Bilateral';

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">CSA Type</div>
          <div className={`a-metric-value ${isBilateral ? 'good' : 'warn'}`} style={{ fontSize: 14 }}>
            {type}
          </div>
          <div className="a-metric-sub">{isBilateral ? 'mutual collateral posting' : 'one-directional posting'}</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Threshold</div>
          <div className="a-metric-value">${threshold}M</div>
          <div className="a-metric-sub">exposure before margin call</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">MTA</div>
          <div className="a-metric-value">${mta}M</div>
          <div className="a-metric-sub">minimum transfer amount</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Capital Cost</div>
          <div className={`a-metric-value ${capitalFlag ? 'danger' : 'good'}`} style={{ fontSize: 14 }}>
            {capitalFlag ? 'FLAGGED' : 'CLEAR'}
          </div>
          <div className="a-metric-sub">RWA / capital impact</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">CSA / Collateral Detail</span></div>
        <div className="a-card-body">
          {!isBilateral && (
            <div className="lod1-box flag" style={{ marginBottom: 14 }}>
              <strong>Finding:</strong> One-way CSA — {cp.name} does not post collateral to us.<br />
              <strong>Action:</strong> Higher capital charge applies. Escalate to Legal for renegotiation.
            </div>
          )}
          {capitalFlag && (
            <div className="lod1-box reject" style={{ marginBottom: 14 }}>
              <strong>Finding:</strong> Capital cost flag active — elevated RWA charge on this counterparty.<br />
              <strong>Action:</strong> Review with Capital Management before increasing exposure.
            </div>
          )}

          <div className="csa-grid">
            <div className="csa-item">
              <div className="csa-label">Agreement Type</div>
              <div className="csa-value">ISDA 2002</div>
            </div>
            <div className="csa-item">
              <div className="csa-label">CSA Type</div>
              <div className="csa-value">{type}</div>
              {!isBilateral && <div className="csa-flag warn">ONE-WAY — HIGHER RISK</div>}
              {isBilateral  && <div className="csa-flag ok">BILATERAL</div>}
            </div>
            <div className="csa-item">
              <div className="csa-label">Threshold</div>
              <div className="csa-value">${threshold}M</div>
            </div>
            <div className="csa-item">
              <div className="csa-label">Min Transfer Amount</div>
              <div className="csa-value">${mta}M</div>
            </div>
            <div className="csa-item">
              <div className="csa-label">Governing Law</div>
              <div className="csa-value">{law}</div>
            </div>
            <div className="csa-item">
              <div className="csa-label">Capital Cost Flag</div>
              <div className="csa-value">{capitalFlag ? 'Yes' : 'No'}</div>
              <div className={`csa-flag ${capitalFlag ? 'warn' : 'ok'}`}>
                {capitalFlag ? 'ELEVATED RWA' : 'STANDARD'}
              </div>
            </div>
          </div>

          <table className="a-table" style={{ marginTop: 16 }}>
            <thead>
              <tr><th>Parameter</th><th>Value</th><th>Risk Note</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Threshold</td>
                <td>${threshold}M</td>
                <td style={{ color: threshold > 10 ? 'var(--flag)' : 'var(--muted)' }}>
                  {threshold > 10 ? 'High threshold — large uncollateralised exposure window' : 'Acceptable threshold level'}
                </td>
              </tr>
              <tr>
                <td>MTA</td>
                <td>${mta}M</td>
                <td style={{ color: mta > 0.5 ? 'var(--flag)' : 'var(--muted)' }}>
                  {mta > 0.5 ? 'Large MTA — delays collateral flow' : 'MTA within standard range'}
                </td>
              </tr>
              <tr>
                <td>CSA Type</td>
                <td>{type}</td>
                <td style={{ color: !isBilateral ? 'var(--reject)' : 'var(--muted)' }}>
                  {!isBilateral ? 'One-way: no collateral received from counterparty' : 'Mutual margin posting in place'}
                </td>
              </tr>
              <tr>
                <td>Governing Law</td>
                <td>{law}</td>
                <td style={{ color: 'var(--muted)' }}>
                  {law.includes('English') ? 'English Law — standard for UK/EU counterparties' :
                   law.includes('NY')      ? 'NY Law — standard for US counterparties' :
                   law.includes('French')  ? 'French Law — EU jurisdiction' : law}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
