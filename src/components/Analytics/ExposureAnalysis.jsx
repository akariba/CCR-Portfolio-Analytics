import React from 'react';

function ExposureChart({ cp }) {
  const W = 500, H = 130, PX = 44, PY = 14;
  const dW = W - PX * 2, dH = H - PY - 20;
  const maxV = Math.max(...cp.pfe) * 1.1;

  function toX(i) { return PX + (i / (cp.tenors.length - 1)) * dW; }
  function toY(v) { return PY + dH - (v / maxV) * dH; }

  const eeArea = `${PX},${PY + dH} ${cp.ee.map((v,i) => `${toX(i)},${toY(v)}`).join(' ')} ${toX(cp.ee.length-1)},${PY+dH}`;
  const eeLine = cp.ee.map((v,i) => `${toX(i)},${toY(v)}`).join(' ');
  const pfeLine = cp.pfe.map((v,i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {/* grid */}
      {[0,.25,.5,.75,1].map(f => (
        <line key={f} x1={PX} y1={toY(maxV*f)} x2={W-PX} y2={toY(maxV*f)}
              stroke="var(--border)" strokeWidth="1" strokeDasharray="3,3" />
      ))}
      {/* EE area */}
      <polygon points={eeArea} fill="var(--ee-color)" opacity="0.12" />
      {/* PFE line */}
      <polyline points={pfeLine} fill="none" stroke="var(--pfe-color)" strokeWidth="2" />
      {/* EE line */}
      <polyline points={eeLine}  fill="none" stroke="var(--ee-color)"  strokeWidth="2" />
      {/* x labels */}
      {cp.tenors.map((t,i) => (
        <text key={t} x={toX(i)} y={H-4} textAnchor="middle" fontSize="9" fill="var(--muted)">{t}</text>
      ))}
      {/* y labels */}
      {[0, Math.round(maxV/2), Math.round(maxV)].map((v,i) => (
        <text key={i} x={PX-4} y={toY(v)+3} textAnchor="end" fontSize="9" fill="var(--muted)">${v}M</text>
      ))}
      {/* legend */}
      <circle cx={PX}    cy={9} r={3} fill="var(--ee-color)" />
      <text   x={PX+7}  y={12} fontSize="9" fill="var(--text)">EE</text>
      <circle cx={PX+40} cy={9} r={3} fill="var(--pfe-color)" />
      <text   x={PX+47} y={12} fontSize="9" fill="var(--text)">PFE@95%</text>
    </svg>
  );
}

export default function ExposureAnalysis({ cp }) {
  const peakEE  = Math.max(...cp.ee);
  const peakPFE = Math.max(...cp.pfe);
  const peakIdx = cp.pfe.indexOf(peakPFE);

  return (
    <>
      <div className="a-metrics">
        <div className="a-metric">
          <div className="a-metric-label">Peak EE</div>
          <div className="a-metric-value">${peakEE}M</div>
          <div className="a-metric-sub">at {cp.tenors[cp.ee.indexOf(Math.max(...cp.ee))]}</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Peak PFE@95%</div>
          <div className="a-metric-value warn">${peakPFE}M</div>
          <div className="a-metric-sub">at {cp.tenors[peakIdx]}</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Notional</div>
          <div className="a-metric-value">${cp.notional}M</div>
          <div className="a-metric-sub">of ${cp.limit}M limit</div>
        </div>
        <div className="a-metric">
          <div className="a-metric-label">Headroom</div>
          <div className={`a-metric-value ${(cp.limit - cp.notional) < 80 ? 'warn' : 'good'}`}>
            ${cp.limit - cp.notional}M
          </div>
          <div className="a-metric-sub">remaining capacity</div>
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Exposure Profile — EE &amp; PFE</span>
        </div>
        <div className="a-card-body">
          <ExposureChart cp={cp} />
        </div>
      </div>

      <div className="a-card">
        <div className="a-card-header">
          <span className="a-card-title">Tenor Bucket Detail</span>
          <span style={{ fontSize: 10, color: 'var(--muted)' }}>PFE vs sub-limit</span>
        </div>
        <div className="a-card-body">
          <table className="a-table">
            <thead>
              <tr>
                <th>Tenor</th>
                <th>EE ($M)</th>
                <th>PFE@95% ($M)</th>
                <th>Sub-Limit ($M)</th>
                <th>Headroom ($M)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cp.tenors.map((t, i) => {
                const hdm   = cp.tenorLimits[i] - cp.pfe[i];
                const breach = hdm < 0;
                const warn   = hdm < 10 && !breach;
                return (
                  <tr key={t} className={breach ? 'breach' : warn ? 'warn-row' : ''}>
                    <td><strong>{t}</strong></td>
                    <td>${cp.ee[i]}M</td>
                    <td><strong>${cp.pfe[i]}M</strong></td>
                    <td>${cp.tenorLimits[i]}M</td>
                    <td style={{ color: breach ? 'var(--reject)' : warn ? 'var(--flag)' : 'var(--approve)' }}>
                      {breach ? '–' : ''}${Math.abs(hdm)}M
                    </td>
                    <td>
                      <span className={`badge badge-${breach ? 'reject' : warn ? 'flag' : 'approve'}`}>
                        {breach ? 'BREACH' : warn ? 'WARN' : 'OK'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
