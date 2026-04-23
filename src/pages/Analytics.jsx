import React, { useState } from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import ExposureAnalysis from '../components/Analytics/ExposureAnalysis';
import FairValuePanel   from '../components/Analytics/FairValuePanel';
import MarketRisk       from '../components/Analytics/MarketRisk';
import PLAttribution    from '../components/Analytics/PLAttribution';
import CreditRisk       from '../components/Analytics/CreditRisk';
import SettlementRisk   from '../components/Analytics/SettlementRisk';
import CollateralPanel  from '../components/Analytics/CollateralPanel';

const SECTIONS = [
  { id: 'exposure',    letter: 'A', label: 'Exposure Analysis' },
  { id: 'fairvalue',   letter: 'B', label: 'Fair Value' },
  { id: 'marketrisk',  letter: 'C', label: 'Market Risk' },
  { id: 'pl',          letter: 'D', label: 'P&L Attribution' },
  { id: 'credit',      letter: 'E', label: 'Credit Risk' },
  { id: 'settlement',  letter: 'F', label: 'Settlement Risk' },
  { id: 'collateral',  letter: 'G', label: 'CSA / Collateral' },
];

export default function Analytics() {
  const [cpId,    setCpId]    = useState('DB');
  const [section, setSection] = useState('exposure');
  const cp = COUNTERPARTIES[cpId];

  return (
    <div className="analytics-layout">
      {/* Sidebar */}
      <aside className="analytics-sidebar">
        <div className="a-sidebar-section">
          <div className="a-sidebar-section-label">Counterparty</div>
          <select
            className="a-cp-select"
            value={cpId}
            onChange={e => setCpId(e.target.value)}
          >
            {Object.values(COUNTERPARTIES).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="a-sidebar-section" style={{ flex: 1, padding: 0 }}>
          {SECTIONS.map(s => (
            <div
              key={s.id}
              className={`a-nav-item${section === s.id ? ' active' : ''}`}
              onClick={() => setSection(s.id)}
            >
              <span className="a-nav-letter">{s.letter}.</span> {s.label}
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="analytics-main">
        <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{cp.name}</span>
          <span className={`badge badge-neutral`}>{cp.rating}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{cp.region}</span>
        </div>

        {section === 'exposure'   && <ExposureAnalysis cp={cp} />}
        {section === 'fairvalue'  && <FairValuePanel   cp={cp} />}
        {section === 'marketrisk' && <MarketRisk       cp={cp} />}
        {section === 'pl'         && <PLAttribution    cp={cp} />}
        {section === 'credit'     && <CreditRisk       cp={cp} />}
        {section === 'settlement' && <SettlementRisk   cp={cp} />}
        {section === 'collateral' && <CollateralPanel  cp={cp} />}
      </main>
    </div>
  );
}
