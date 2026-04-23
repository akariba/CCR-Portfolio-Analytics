import React, { useState, useEffect } from 'react';
import { COUNTERPARTIES, TRADE_TYPES, calcExposureAddon, getDecision, utilPct } from '../data/counterparties';

const EMPTY = { cp: '', type: '', notional: '', maturity: '1' };

export default function PreTradeCalculator({ selectedCp, onResult }) {
  const [form, setForm] = useState({ ...EMPTY, cp: selectedCp || '' });
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedCp) setForm(f => ({ ...f, cp: selectedCp }));
  }, [selectedCp]);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setResult(null); }

  function run() {
    const cp = COUNTERPARTIES[form.cp];
    const addon = calcExposureAddon(form.type, form.notional, form.maturity);
    const newNotional = cp.notional + addon;
    const currUtil = utilPct(cp.notional, cp.limit);
    const newUtil = utilPct(newNotional, cp.limit);
    const dec = getDecision(newUtil);
    const headroomAfter = cp.limit - newNotional;
    const cvaCost = addon * cp.cvaRate;

    let reason, action;
    if (dec.cls === 'approve') {
      reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — within limit. Trade can proceed.`;
      action = 'Submit trade ticket for standard booking. No additional approval required.';
    } else if (dec.cls === 'flag') {
      reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — enters review band (70–85%). Senior Desk sign-off required.`;
      action = `Obtain Senior Desk sign-off and CCR countersign before booking. Confirm no other pending trades with ${cp.name}.`;
    } else {
      reason = `Post-trade utilisation ${newUtil.toFixed(1)}% — exceeds 85% hard ceiling. Trade cannot be executed.`;
      action = `Compress existing exposure with ${cp.name} or obtain a formal limit increase before retrying.`;
    }

    const r = { cp, addon, newNotional, currUtil, newUtil, dec, headroomAfter, cvaCost, reason, action };
    setResult(r);
    onResult && onResult(r);
  }

  const tradeType = TRADE_TYPES.find(t => t.value === form.type);
  const needsMaturity = tradeType?.maturityRequired;
  const canRun = form.cp && form.type && parseFloat(form.notional) > 0;

  return (
    <div className="panel calc-panel">
      <div className="panel-header">
        <span className="panel-title">Pre-Trade Impact Calculator</span>
        {result && (
          <span className={`strip-badge badge-${result.dec.cls}`}>{result.dec.label}</span>
        )}
      </div>
      <div className="panel-body">
        <div className="form-group">
          <label className="form-label">Counterparty</label>
          <select className="form-control" value={form.cp} onChange={e => set('cp', e.target.value)}>
            <option value="">— Select —</option>
            {Object.values(COUNTERPARTIES).map(cp => (
              <option key={cp.id} value={cp.id}>{cp.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Trade Type</label>
          <select className="form-control" value={form.type} onChange={e => set('type', e.target.value)}>
            <option value="">— Select —</option>
            {TRADE_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Notional (USD millions)</label>
          <input
            className="form-control"
            type="number"
            min="1"
            placeholder="e.g. 50"
            value={form.notional}
            onChange={e => set('notional', e.target.value)}
          />
        </div>

        {needsMaturity && (
          <div className="form-group">
            <label className="form-label">Maturity (years)</label>
            <input
              className="form-control"
              type="number"
              min="0.25"
              max="30"
              step="0.25"
              placeholder="e.g. 5"
              value={form.maturity}
              onChange={e => set('maturity', e.target.value)}
            />
          </div>
        )}

        <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.6 }}>
          Thresholds: <span style={{ color: 'var(--approve)' }}>APPROVE &lt;70%</span>
          {' · '}
          <span style={{ color: 'var(--flag)' }}>FLAG 70–85%</span>
          {' · '}
          <span style={{ color: 'var(--reject)' }}>REJECT &gt;85%</span>
        </div>

        <button className="calc-btn" onClick={run} disabled={!canRun}>
          RUN IMPACT ANALYSIS
        </button>

        {result && <ResultPanel result={result} />}
      </div>
    </div>
  );
}

function ResultPanel({ result }) {
  const { cp, addon, newNotional, currUtil, newUtil, dec, headroomAfter, cvaCost, reason, action } = result;
  const delta = newUtil - currUtil;

  return (
    <>
      <div className={`decision-box ${dec.cls}`}>
        <div className={`decision-label ${dec.cls}`}>{dec.label}</div>
        <div className="decision-reason">{reason}</div>
      </div>

      <div className="proforma">
        <div className="pf-card">
          <div className="pf-label">Current Util.</div>
          <div className="pf-value">{currUtil.toFixed(1)}%</div>
          <div className="pf-sub">${cp.notional}M / ${cp.limit}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Post-Trade</div>
          <div className={`pf-value ${dec.cls === 'reject' ? 'neg' : dec.cls === 'approve' ? 'pos' : ''}`}>
            {newUtil.toFixed(1)}%
          </div>
          <div className="pf-sub">${newNotional.toFixed(0)}M / ${cp.limit}M</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Headroom Left</div>
          <div className={`pf-value ${headroomAfter < 0 ? 'neg' : ''}`}>
            ${headroomAfter.toFixed(0)}M
          </div>
          <div className="pf-sub">after trade</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Exposure Added</div>
          <div className="pf-value neg">${addon.toFixed(1)}M</div>
          <div className="pf-sub">regulatory</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Util. Delta</div>
          <div className={`pf-value ${delta > 10 ? 'neg' : ''}`}>+{delta.toFixed(1)}%</div>
          <div className="pf-sub">utilisation move</div>
        </div>
        <div className="pf-card">
          <div className="pf-label">Credit Cost</div>
          <div className="pf-value">${cvaCost.toFixed(2)}M</div>
          <div className="pf-sub">est. CVA charge</div>
        </div>
      </div>

      <div className={`lod1-box ${dec.cls}`}>
        <strong>Finding:</strong> {reason}<br />
        <strong>Action:</strong> {action}
      </div>
    </>
  );
}
