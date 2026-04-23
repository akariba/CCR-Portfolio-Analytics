import React from 'react';
import { getDecision, utilPct } from '../../state/riskState';

export default function KpiBar({ counterparties }) {
  const cps = Object.values(counterparties);
  const totalNotional  = cps.reduce((s, c) => s + c.notional, 0);
  const totalLimit     = cps.reduce((s, c) => s + c.limit, 0);
  const totalFV        = cps.reduce((s, c) => s + c.fairValue, 0);
  const totalCVA       = cps.reduce((s, c) => s + c.cva, 0);
  const portUtil       = utilPct(totalNotional, totalLimit);
  const portDec        = getDecision(portUtil);
  const rejectCount    = cps.filter(c => getDecision(utilPct(c.notional, c.limit)).cls === 'reject').length;
  const flagCount      = cps.filter(c => getDecision(utilPct(c.notional, c.limit)).cls === 'flag').length;

  return (
    <div className="kpi-bar">
      <div className="kpi-card">
        <div className="kpi-label">Total Notional</div>
        <div className="kpi-value">${totalNotional.toLocaleString()}M</div>
        <div className="kpi-sub">{cps.length} counterparties · ${(totalLimit - totalNotional).toLocaleString()}M headroom</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Portfolio Utilisation</div>
        <div className={`kpi-value ${portDec.cls === 'reject' ? 'danger' : portDec.cls === 'flag' ? 'warn' : ''}`}>
          {portUtil.toFixed(1)}%
        </div>
        <div className="kpi-sub">of ${totalLimit.toLocaleString()}M aggregate limit</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Portfolio Fair Value</div>
        <div className="kpi-value">${totalFV.toFixed(1)}M</div>
        <div className="kpi-sub">Adj (net CVA) ${(totalFV - totalCVA).toFixed(1)}M · CVA ${totalCVA.toFixed(1)}M</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Breach Status</div>
        <div className={`kpi-value ${rejectCount > 0 ? 'danger' : flagCount > 0 ? 'warn' : ''}`}>
          {rejectCount > 0 ? `${rejectCount} REJECT` : flagCount > 0 ? `${flagCount} FLAG` : 'CLEAR'}
        </div>
        <div className="kpi-sub">{rejectCount + flagCount} counterpart{rejectCount + flagCount === 1 ? 'y' : 'ies'} need attention</div>
      </div>
    </div>
  );
}
