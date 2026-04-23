import React from 'react';
import Dashboard from './pages/Dashboard';

const NOW = new Date().toLocaleString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-mark">CCR</div>
          <div>
            <div className="app-logo-text"><span>Trade Approval</span> Cockpit</div>
            <div className="app-logo-sub">CCR LOD1 · Derivatives · Decision Pipeline</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--approve)', fontWeight: 700 }}>&lt;70% APPROVE</span>
            {' · '}
            <span style={{ color: 'var(--flag)', fontWeight: 700 }}>70–85% FLAG</span>
            {' · '}
            <span style={{ color: 'var(--escalate)', fontWeight: 700 }}>85–95% ESCALATE</span>
            {' · '}
            <span style={{ color: 'var(--reject)', fontWeight: 700 }}>&gt;95% REJECT</span>
          </div>
        </div>
        <div className="header-right">
          <span className="live">● LIVE</span> · {NOW}<br />
          CCR Desk · Derivatives
        </div>
      </header>
      <Dashboard />
    </div>
  );
}
