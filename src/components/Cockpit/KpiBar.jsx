import React from 'react';
import { currentState, step8_decision, utilPct } from '../../state/riskState';

export default function KpiBar({ counterparties }) {
  const cps      = Object.values(counterparties);
  const states   = cps.map(cp => ({ cp, s: currentState(cp) }));
  const totalEff = states.reduce((a, { s }) => a + s.effPFE, 0);
  const totalLim = cps.reduce((a, c) => a + c.pfeLimit, 0);
  const portUtil  = utilPct(totalEff, totalLim);
  const portDec   = step8_decision(portUtil);
  const counts    = { reject: 0, escalate: 0, flag: 0 };
  states.forEach(({ s }) => { if (counts[s.dec.cls] !== undefined) counts[s.dec.cls]++; });
  const worst     = counts.reject > 0 ? 'reject' : counts.escalate > 0 ? 'escalate' : counts.flag > 0 ? 'flag' : 'approve';

  return (
    <div className="kpi-bar">
      <div className="kpi-card">
        <div className="kpi-label">Effective PFE (Portfolio)</div>
        <div className="kpi-value">${totalEff.toFixed(1)}M</div>
        <div className="kpi-sub">vs ${totalLim}M aggregate PFE limit · ${(totalLim - totalEff).toFixed(1)}M headroom</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Portfolio Utilisation</div>
        <div className={`kpi-value ${portDec.cls === 'reject' ? 'danger' : portDec.cls === 'escalate' || portDec.cls === 'flag' ? 'warn' : ''}`}>
          {portUtil.toFixed(1)}%
        </div>
        <div className="kpi-sub">PFE-based · CSA &amp; WWR adjusted</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Fair Value (Portfolio)</div>
        <div className="kpi-value">${cps.reduce((a, c) => a + c.fairValue, 0).toFixed(1)}M</div>
        <div className="kpi-sub">Adj FV ${cps.reduce((a, c) => a + (c.fairValue - c.cva), 0).toFixed(1)}M · CVA ${cps.reduce((a, c) => a + c.cva, 0).toFixed(1)}M</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Breach Status</div>
        <div className={`kpi-value ${worst === 'reject' ? 'danger' : worst !== 'approve' ? 'warn' : ''}`}>
          {counts.reject > 0 ? `${counts.reject} REJECT` : counts.escalate > 0 ? `${counts.escalate} ESCALATE` : counts.flag > 0 ? `${counts.flag} FLAG` : 'CLEAR'}
        </div>
        <div className="kpi-sub">{(counts.reject + counts.escalate + counts.flag)} counterpart{(counts.reject + counts.escalate + counts.flag) !== 1 ? 'ies' : 'y'} need attention</div>
      </div>
    </div>
  );
}
