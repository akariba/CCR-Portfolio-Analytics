import React from 'react';
import { getDecision, utilPct } from '../data/counterparties';

export default function KpiBar({ counterparties }) {
  const cps = Object.values(counterparties);
  const totalNotional = cps.reduce((s, c) => s + c.notional, 0);
  const totalLimit    = cps.reduce((s, c) => s + c.limit, 0);
  const totalHeadroom = totalLimit - totalNotional;
  const portUtil      = utilPct(totalNotional, totalLimit);
  const portDec       = getDecision(portUtil);
  const rejectCount   = cps.filter(c => getDecision(utilPct(c.notional, c.limit)).cls === 'reject').length;
  const flagCount     = cps.filter(c => getDecision(utilPct(c.notional, c.limit)).cls === 'flag').length;

  return (
    <div className="kpi-row">
      <div className="kpi-card">
        <div className="kpi-label">Total Notional</div>
        <div className="kpi-value">${totalNotional.toLocaleString()}M</div>
        <div className="kpi-sub">across {cps.length} counterparties</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Portfolio Utilisation</div>
        <div className={`kpi-value ${portDec.cls === 'reject' ? 'danger' : portDec.cls === 'flag' ? 'warn' : ''}`}>
          {portUtil.toFixed(1)}%
        </div>
        <div className="kpi-sub">${totalHeadroom}M headroom available</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Breach Status</div>
        <div className={`kpi-value ${rejectCount > 0 ? 'danger' : flagCount > 0 ? 'warn' : ''}`}>
          {rejectCount > 0 ? `${rejectCount} REJECT` : flagCount > 0 ? `${flagCount} FLAG` : 'CLEAR'}
        </div>
        <div className="kpi-sub">{rejectCount + flagCount} counterparties need attention</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Available Capacity</div>
        <div className="kpi-value">${totalHeadroom.toLocaleString()}M</div>
        <div className="kpi-sub">of ${totalLimit.toLocaleString()}M total limit</div>
      </div>
    </div>
  );
}
