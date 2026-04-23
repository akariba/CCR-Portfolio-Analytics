import React, { useState, useEffect } from 'react';
import { COUNTERPARTIES, TRADE_TYPES } from '../../data/counterparties';
import { runPreTrade, currentState } from '../../state/riskState';

function fmt(n, d = 1) { return (typeof n === 'number' ? n : 0).toFixed(d); }

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

  const tradeType = TRADE_TYPES.find(t => t.value === form.type);
  const canRun    = form.cp && form.type && parseFloat(form.notional) > 0;
  const currCP    = form.cp ? COUNTERPARTIES[form.cp] : null;
  const currSt    = currCP ? currentState(currCP) : null;

  return (
    <div className="panel" style={{ gridColumn: 1 }}>
      <div className="panel-header">
        <span className="panel-title">Pre-Trade Decision Pipeline</span>
        {result && <span className={`badge badge-${result.dec.cls}`}>{result.dec.label}</span>}
      </div>
      <div className="panel-body">

        {/* Current state summary before trade */}
        {currSt && (
          <div style={{
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 3, padding: '8px 11px', marginBottom: 12, fontSize: 11,
          }}>
            <span style={{ color: 'var(--muted)', marginRight: 8 }}>Current:</span>
            <strong>{currCP.name}</strong>
            {' — '}
            PFE ${currSt.effPFE.toFixed(1)}M / ${currCP.pfeLimit}M
            {' · '}
            <span style={{ color: currSt.dec.color, fontWeight: 700 }}>{currSt.util.toFixed(1)}%</span>
            {' · '}
            <span className={`badge badge-${currSt.dec.cls}`}>{currSt.dec.label}</span>
          </div>
        )}

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

        <button className="run-btn" onClick={run} disabled={!canRun}>
          EVALUATE TRADE
        </button>

        {result && <PipelineResult result={result} cp={COUNTERPARTIES[form.cp]} />}
      </div>
    </div>
  );
}

function PipelineResult({ result, cp }) {
  const { trace, dec, findings, action,
          currUtil, newUtil, utilDelta,
          currEffPFE, newEffPFE, headroomBefore, headroomAfter,
          fv, ce, pfeAddon, cvaCost,
          currFV, currCVA, currAdjFV, postFV, postCVA, postAdjFV, deltaAdjFV } = result;

  return (
    <>
      {/* ── Decision ── */}
      <div className={`decision-box ${dec.cls}`}>
        <div className={`decision-label ${dec.cls}`}>{dec.label}</div>
        <div className="decision-reason">{trace.step7.note} — post-trade {fmt(newUtil)}%</div>
      </div>

      {/* ── Pipeline Trace ── */}
      <div className="pipeline-trace">
        <div className="pipeline-title">CCR Decision Pipeline — Step-by-Step</div>
        {Object.entries(trace).map(([key, step]) => {
          const isUtil    = key === 'step7';
          const isDec     = key === 'step8';
          const hasChange = step.before !== null && step.after !== null;
          return (
            <div key={key} className="pipeline-row">
              <div className="pipeline-step">{key.replace('step', '')}</div>
              <div className="pipeline-label">{step.label}</div>
              <div className="pipeline-values" style={{ color: isDec ? dec.color : undefined }}>
                {isDec
                  ? <span className={`badge badge-${dec.cls}`}>{dec.label}</span>
                  : hasChange
                    ? isUtil
                      ? <span>
                          <span style={{ color: 'var(--muted)' }}>{fmt(step.before)}%</span>
                          {' → '}
                          <span style={{ color: newUtil > 85 ? 'var(--reject)' : newUtil > 70 ? 'var(--flag)' : 'var(--approve)', fontWeight: 700 }}>
                            {fmt(step.after)}%
                          </span>
                        </span>
                      : <span>
                          <span style={{ color: 'var(--muted)' }}>${fmt(step.before)}M</span>
                          {' → '}
                          <strong>${fmt(step.after)}M</strong>
                        </span>
                    : step.after !== null
                      ? <span style={{ color: step.after === 0 ? 'var(--muted)' : 'var(--text)' }}>
                          {isUtil ? `${fmt(step.after)}%` : `$${fmt(step.after)}M`}
                        </span>
                      : null
                }
              </div>
              <div className="pipeline-note">{step.note}</div>
            </div>
          );
        })}
      </div>

      {/* ── Structured Findings ── */}
      <div className={`lod1-box ${dec.cls}`} style={{ marginTop: 10 }}>
        <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Decision: {dec.label} — Findings
        </div>
        <ul className="findings-list">
          {findings.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border)', fontWeight: 700, lineHeight: 1.5 }}>
          Action: {action}
        </div>
      </div>

      {/* ── Pro-Forma: Exposure ── */}
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '12px 0 6px' }}>
        Exposure Pro-Forma
      </div>
      <div className="proforma">
        <div className="pf-card">
          <div className="pf-label">PFE (now)</div>
          <div className="pf-value">${fmt(currEffPFE)}M</div>
          <div className="pf-sub">{fmt(currUtil)}% util</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">PFE (after)</div>
          <div className={`pf-value ${dec.cls === 'reject' || dec.cls === 'escalate' ? 'neg' : dec.cls === 'approve' ? 'pos' : ''}`}>
            ${fmt(newEffPFE)}M
          </div>
          <div className="pf-sub">{fmt(newUtil)}% util</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Util Δ</div>
          <div className={`pf-value ${utilDelta > 10 ? 'neg' : ''}`}>+{fmt(utilDelta)}pp</div>
          <div className="pf-sub">utilisation move</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">PFE Add-on</div>
          <div className="pf-value neg">+${fmt(pfeAddon)}M</div>
          <div className="pf-sub">new exposure</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Headroom Δ</div>
          <div className={`pf-value ${headroomAfter < 0 ? 'neg' : ''}`}>${fmt(headroomAfter)}M</div>
          <div className="pf-sub">was ${fmt(headroomBefore)}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">CVA Cost</div>
          <div className="pf-value neg">${fmt(cvaCost, 2)}M</div>
          <div className="pf-sub">credit charge</div>
        </div>
      </div>

      {/* ── Pro-Forma: Fair Value ── */}
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '12px 0 6px' }}>
        Fair Value Pro-Forma
      </div>
      <div className="proforma">
        <div className="pf-card">
          <div className="pf-label">FV (now)</div>
          <div className="pf-value">${fmt(currFV)}M</div>
          <div className="pf-sub">gross</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Adj FV (now)</div>
          <div className="pf-value">${fmt(currAdjFV)}M</div>
          <div className="pf-sub">FV − CVA</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Adj FV (after)</div>
          <div className={`pf-value ${deltaAdjFV < 0 ? 'neg' : 'pos'}`}>${fmt(postAdjFV)}M</div>
          <div className="pf-sub">Δ {deltaAdjFV >= 0 ? '+' : ''}{fmt(deltaAdjFV)}M</div>
        </div>
      </div>
    </>
  );
}
