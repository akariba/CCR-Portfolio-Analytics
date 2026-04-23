import React, { useState, useEffect } from 'react';
import { COUNTERPARTIES, TRADE_TYPES } from '../../data/counterparties';
import { runPreTrade } from '../../state/riskState';

export default function PreTradeCalculator({ selectedCp, onSelect }) {
  const [form, setForm]   = useState({ cp: selectedCp || '', type: '', notional: '', maturity: '5' });
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedCp) setForm(f => ({ ...f, cp: selectedCp }));
  }, [selectedCp]);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setResult(null); }

  function run() {
    const cp = COUNTERPARTIES[form.cp];
    setResult(runPreTrade(cp, form.type, form.notional, form.maturity));
  }

  const tradeType  = TRADE_TYPES.find(t => t.value === form.type);
  const canRun     = form.cp && form.type && parseFloat(form.notional) > 0;

  return (
    <div className="panel" style={{ gridColumn: 1 }}>
      <div className="panel-header">
        <span className="panel-title">Pre-Trade Impact Calculator</span>
        {result && <span className={`badge badge-${result.dec.cls}`}>{result.dec.label}</span>}
      </div>
      <div className="panel-body">
        <div className="form-group">
          <label className="form-label">Counterparty</label>
          <select className="form-ctrl" value={form.cp}
            onChange={e => { set('cp', e.target.value); onSelect(e.target.value); }}>
            <option value="">— Select —</option>
            {Object.values(COUNTERPARTIES).map(cp => (
              <option key={cp.id} value={cp.id}>{cp.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Trade Type</label>
          <select className="form-ctrl" value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="">— Select —</option>
            {TRADE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Notional (USD millions)</label>
          <input className="form-ctrl" type="number" min="1" placeholder="e.g. 50"
            value={form.notional} onChange={e => set('notional', e.target.value)} />
        </div>
        {tradeType?.maturityRequired && (
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input className="form-ctrl" type="number" min="0.25" max="30" step="0.25"
              value={form.maturity} onChange={e => set('maturity', e.target.value)} />
          </div>
        )}
        <div className="threshold-hint">
          <span style={{ color: 'var(--approve)' }}>APPROVE &lt;70%</span>
          {' · '}
          <span style={{ color: 'var(--flag)' }}>FLAG 70–85%</span>
          {' · '}
          <span style={{ color: 'var(--reject)' }}>REJECT &gt;85%</span>
        </div>
        <button className="run-btn" onClick={run} disabled={!canRun}>
          RUN IMPACT ANALYSIS
        </button>

        {result && <ResultPanel result={result} />}
      </div>
    </div>
  );
}

function fmt(n, d = 1) { return n.toFixed(d); }

function ResultPanel({ result }) {
  const {
    dec, reason, action,
    currUtil, newUtil, utilDelta,
    headroomBefore, headroomAfter, addon,
    currFV, currCVA, currAdjFV,
    postFV, postCVA, postAdjFV, deltaAdjFV,
    cp,
  } = result;

  return (
    <>
      {/* Decision */}
      <div className={`decision-box ${dec.cls}`}>
        <div className={`decision-label ${dec.cls}`}>{dec.label}</div>
        <div className="decision-reason">{reason}</div>
      </div>

      {/* Exposure Pro-Forma */}
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '12px 0 6px' }}>
        Exposure Impact
      </div>
      <div className="proforma">
        <div className="pf-card">
          <div className="pf-label">Current Util.</div>
          <div className="pf-value">{fmt(currUtil)}%</div>
          <div className="pf-sub">${cp.notional}M / ${cp.limit}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Post-Trade</div>
          <div className={`pf-value ${dec.cls === 'reject' ? 'neg' : dec.cls === 'approve' ? 'pos' : ''}`}>
            {fmt(newUtil)}%
          </div>
          <div className="pf-sub">+{fmt(utilDelta)}pp move</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Headroom Left</div>
          <div className={`pf-value ${headroomAfter < 0 ? 'neg' : ''}`}>${fmt(headroomAfter, 0)}M</div>
          <div className="pf-sub">was ${fmt(headroomBefore, 0)}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Exposure Added</div>
          <div className="pf-value neg">${fmt(addon)}M</div>
          <div className="pf-sub">regulatory</div>
        </div>
      </div>

      {/* Fair Value Pro-Forma */}
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '12px 0 6px' }}>
        Fair Value Impact
      </div>
      <div className="proforma">
        <div className="pf-card">
          <div className="pf-label">Current FV</div>
          <div className="pf-value">${fmt(currFV)}M</div>
          <div className="pf-sub">CVA ${fmt(currCVA)}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Adj FV (now)</div>
          <div className="pf-value">${fmt(currAdjFV)}M</div>
          <div className="pf-sub">FV minus CVA</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Adj FV (after)</div>
          <div className={`pf-value ${deltaAdjFV < 0 ? 'neg' : 'pos'}`}>${fmt(postAdjFV)}M</div>
          <div className="pf-sub">Δ {deltaAdjFV >= 0 ? '+' : ''}{fmt(deltaAdjFV)}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Post FV</div>
          <div className="pf-value">${fmt(postFV)}M</div>
          <div className="pf-sub">gross</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Post CVA</div>
          <div className="pf-value neg">${fmt(postCVA)}M</div>
          <div className="pf-sub">+${fmt(postCVA - currCVA)}M added</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Net FV Δ</div>
          <div className={`pf-value ${deltaAdjFV < 0 ? 'neg' : 'pos'}`}>
            {deltaAdjFV >= 0 ? '+' : ''}{fmt(deltaAdjFV)}M
          </div>
          <div className="pf-sub">after CVA cost</div>
        </div>
      </div>

      {/* LOD1 */}
      <div className={`lod1-box ${dec.cls}`}>
        <strong>Finding:</strong> {reason}<br />
        <strong>Action:</strong> {action}
      </div>
    </>
  );
}
