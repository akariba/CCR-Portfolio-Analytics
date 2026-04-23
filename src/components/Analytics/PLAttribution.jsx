import React from 'react';

export default function PLAttribution({ cp }) {
  const { market, carry, residual } = cp.pl;
  const total    = market + carry + residual;
  const maxAbs   = Math.max(Math.abs(market), Math.abs(carry), Math.abs(residual)) * 1.2 || 1;

  function Bar({ value, color }) {
    const pct = (Math.abs(value) / maxAbs) * 100;
    return (
      <div className="pl-track">
        <div className="pl-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    );
  }

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">Total P&L</div>
          <div className={`a-metric-value ${total >= 0 ? 'good' : 'danger'}`}>
            {total >= 0 ? '+' : ''}${total.toFixed(1)}M
          </div>
          <div className="a-metric-sub">daily attribution</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Market</div>
          <div className={`a-metric-value ${market >= 0 ? 'good' : 'danger'}`}>
            {market >= 0 ? '+' : ''}${market}M
          </div>
          <div className="a-metric-sub">rate / FX moves</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Carry</div>
          <div className="a-metric-value good">+${carry}M</div>
          <div className="a-metric-sub">time value / coupon</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Residual</div>
          <div className={`a-metric-value ${residual < 0 ? 'danger' : 'good'}`}>
            {residual >= 0 ? '+' : ''}${residual}M
          </div>
          <div className="a-metric-sub">unexplained</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header"><span className="a-card-title">P&L Attribution</span></div>
        <div className="a-card-body">
          <div className="pl-row">
            <div className="pl-row-label">Market</div>
            <Bar value={market} color="var(--accent)" />
            <div className="pl-val" style={{ color: market >= 0 ? 'var(--approve)' : 'var(--reject)' }}>
              {market >= 0 ? '+' : ''}${market}M
            </div>
          </div>
          <div className="pl-row">
            <div className="pl-row-label">Carry</div>
            <Bar value={carry} color="var(--approve)" />
            <div className="pl-val" style={{ color: 'var(--approve)' }}>+${carry}M</div>
          </div>
          <div className="pl-row">
            <div className="pl-row-label">Residual</div>
            <Bar value={residual} color={residual < 0 ? 'var(--reject)' : 'var(--approve)'} />
            <div className="pl-val" style={{ color: residual < 0 ? 'var(--reject)' : 'var(--approve)' }}>
              {residual >= 0 ? '+' : ''}${residual}M
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
            <table className="a-table">
              <thead>
                <tr><th>Component</th><th>P&L ($M)</th><th>% of Total</th><th>Alert</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Market</td>
                  <td style={{ color: market >= 0 ? 'var(--approve)' : 'var(--reject)' }}>
                    <strong>{market >= 0 ? '+' : ''}${market}M</strong>
                  </td>
                  <td>{total ? ((market / total) * 100).toFixed(0) : 0}%</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Carry</td>
                  <td style={{ color: 'var(--approve)' }}><strong>+${carry}M</strong></td>
                  <td>{total ? ((carry / total) * 100).toFixed(0) : 0}%</td>
                  <td>—</td>
                </tr>
                <tr className={Math.abs(residual) > 0.5 ? 'warn-row' : ''}>
                  <td>Residual / Unexplained</td>
                  <td style={{ color: residual < 0 ? 'var(--reject)' : 'var(--approve)' }}>
                    <strong>{residual >= 0 ? '+' : ''}${residual}M</strong>
                  </td>
                  <td>{total ? ((residual / total) * 100).toFixed(0) : 0}%</td>
                  <td>
                    {Math.abs(residual) > 0.5
                      ? <span className="badge badge-flag">REVIEW</span>
                      : <span className="badge badge-approve">OK</span>}
                  </td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td style={{ color: total >= 0 ? 'var(--approve)' : 'var(--reject)' }}>
                    <strong>{total >= 0 ? '+' : ''}${total.toFixed(1)}M</strong>
                  </td>
                  <td>100%</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
