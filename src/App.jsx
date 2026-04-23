import React, { useState } from 'react';
import { COUNTERPARTIES } from './data/counterparties';
import TopStrip from './components/TopStrip';
import KpiBar from './components/KpiBar';
import PreTradeCalculator from './components/PreTradeCalculator';
import ExposurePanel from './components/ExposurePanel';
import LimitMonitor from './components/LimitMonitor';
import AlertStrip from './components/AlertStrip';

const NOW = new Date().toLocaleString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit',
});

export default function App() {
  const [selectedCp, setSelectedCp] = useState('');
  const [lastDecision, setLastDecision] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header className="app-header">
        <h1>CCR <span>Trade Approval</span> Cockpit</h1>
        <div className="header-meta">
          <strong>LIVE</strong> · {NOW}<br />
          CCR Desk · Derivatives
        </div>
      </header>

      {/* Alert bar */}
      <AlertStrip counterparties={COUNTERPARTIES} />

      {/* Top strip — always visible */}
      <TopStrip
        counterparties={COUNTERPARTIES}
        selected={selectedCp}
        onSelect={setSelectedCp}
      />

      {/* Portfolio KPIs */}
      <KpiBar counterparties={COUNTERPARTIES} />

      {/* Main workspace */}
      <div className="main-grid">
        {/* LEFT: calculator */}
        <PreTradeCalculator
          selectedCp={selectedCp}
          onResult={setLastDecision}
        />

        {/* RIGHT: exposure + limits stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
          <ExposurePanel counterparties={COUNTERPARTIES} />
          <LimitMonitor  counterparties={COUNTERPARTIES} />
        </div>
      </div>
    </div>
  );
}
