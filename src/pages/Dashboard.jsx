import React, { useState } from 'react';
import { COUNTERPARTIES } from '../data/counterparties';
import AlertStrip          from '../components/Cockpit/AlertStrip';
import TopStrip            from '../components/Cockpit/TopStrip';
import KpiBar              from '../components/Cockpit/KpiBar';
import PreTradeCalculator  from '../components/Cockpit/PreTradeCalculator';
import ExposurePanel       from '../components/Cockpit/ExposurePanel';
import LimitMonitor        from '../components/Cockpit/LimitMonitor';

export default function Dashboard() {
  const [selectedCp, setSelectedCp] = useState('');

  return (
    <>
      <AlertStrip counterparties={COUNTERPARTIES} />
      <TopStrip
        counterparties={COUNTERPARTIES}
        selected={selectedCp}
        onSelect={setSelectedCp}
      />
      <KpiBar counterparties={COUNTERPARTIES} />
      <div className="main-grid">
        <PreTradeCalculator selectedCp={selectedCp} onSelect={setSelectedCp} />
        <div className="right-col">
          <ExposurePanel counterparties={COUNTERPARTIES} />
          <LimitMonitor  counterparties={COUNTERPARTIES} />
        </div>
      </div>
    </>
  );
}
