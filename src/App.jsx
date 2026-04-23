import React, { useState } from 'react';
import Dashboard  from './pages/Dashboard';
import Analytics  from './pages/Analytics';

const NOW = new Date().toLocaleString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

export default function App() {
  const [page, setPage] = useState('cockpit');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-mark">CCR</div>
          <div>
            <div className="app-logo-text"><span>Trade Approval</span> Cockpit</div>
            <div className="app-logo-sub">Counterparty Credit Risk · Derivatives</div>
          </div>
        </div>

        <nav className="page-nav">
          <button
            className={`page-btn${page === 'cockpit' ? ' active' : ''}`}
            onClick={() => setPage('cockpit')}
          >TRADE COCKPIT</button>
          <button
            className={`page-btn${page === 'analytics' ? ' active' : ''}`}
            onClick={() => setPage('analytics')}
          >CCR ANALYTICS</button>
        </nav>

        <div className="header-right">
          <span className="live">● LIVE</span> · {NOW}<br />
          CCR Desk · Derivatives
        </div>
      </header>

      {page === 'cockpit'   ? <Dashboard />  : <Analytics />}
    </div>
  );
}
