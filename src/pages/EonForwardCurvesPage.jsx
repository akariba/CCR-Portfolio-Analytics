import React, { useState } from 'react';
import { SectionCard, MetricCard, DataTable } from '../components/Shared';

// ── Static data ────────────────────────────────────────────────────────────────

const EYEBROW  = 'E.ON Energy Markets GmbH · Senior Analyst — Forward Curve Modelling & Governance · Job ID 243900';
const TITLE    = 'Price Forward Curve: Methodology, Governance & Quality';
const SUBTITLE = 'A structured view of how the group-wide forward curve function could be designed, owned, and governed — covering methodology, market quality, governance architecture, and cloud-native implementation — organised against the stated responsibilities of the role.';

const JD_MAP_ROWS = [
  ['Methodology & construction',       'A1, A3, Q3'],
  ['Market analysis & instruments',    'B1, Q2'],
  ['Seasonality & expert judgement',   'A2, Q5'],
  ['Curve quality & monitoring',       'B2, A3'],
  ['Quantitative methods',             'A3, Q1, Q3, Q4'],
  ['Governance & approval cycles',     'C3, C4, C2'],
  ['Stakeholder & decision support',   'C1, C2, Q6, Q7'],
  ['Implementation & cloud enablement','D1, D2, Q4'],
];

const INTERP_ROWS = [
  ['0–5 days', 'Flat / step',              'Day-ahead/spot settlement; no interpolation needed'],
  ['5D–3M',    'Linear on flat-forward',   'Preserves no-arbitrage at product boundaries'],
  ['3M–2Y',    'Cubic spline (clamped)',    'Smooth seasonal shape; clamped endpoints prevent oscillation'],
  ['2Y+',      'Nelson-Siegel / log-linear','Parsimonious long-end extrapolation; interpretable parameters'],
];

const INSTR_ROWS = [
  ['Exchange futures (EEX, ICE)',      'Primary anchor — near/mid curve',          'High / continuous'],
  ['Calendar/seasonal swaps (OTC)',    'Mid-curve shape; peak/off-peak structure',  'Medium / broker-quoted'],
  ['Spark spread & clean dark spread', 'Cross-commodity consistency check',         'Indicative'],
  ['Capacity market contracts',        'Long-end anchor (e.g. GB, DE)',             'Auction-based'],
  ['Regulatory reference prices',      'Expert overlay; stress scenario',           'Periodic'],
  ['Gas hub prices (TTF, NCG)',        'Gas-to-power spread constraint',            'High / benchmark'],
];

const QUAL_ROWS = [
  ['Round-trip / re-pricing', 'Curve re-prices all calibrating instruments: zero error (bootstrapping) or minimised weighted error (best-fit); verified each production cycle', 'Non-zero re-pricing error on calibrating instruments → solver failure or bad input quote; block publication until root cause resolved'],
  ['No-arbitrage',     'Calendar-spread / monotonicity test',                    'Violation → escalation; curve locked'],
  ['Market alignment', 'Deviation from broker mid by maturity bucket',           'Deviation beyond bid-ask width → parameter review'],
  ['Stability',        'Day-on-day change vs market move; jump detection',       'Unexplained jump beyond threshold → audit-trail review'],
  ['Sensitivity',      'DV01 by anchor; cross-gamma',                           'Sensitivity concentration → diversify anchors'],
  ['Model limitation', 'Long-end confidence-interval width; overlay frequency', 'High overlay frequency → methodology review'],
];

const GOV_ROWS = [
  ['Curve approval cycle',    'Automated quality checks each cycle; periodic methodology review with local owners; committee sign-off on parameter/methodology changes'],
  ['Change management',       'Methodology changes require written impact assessment, back-test evidence, and approval before production deployment'],
  ['Documentation standards', 'Each curve has a living methodology note: instrument rationale, interpolation choices, known limitations, timestamped expert-overlay log; version-controlled'],
  ['Escalation protocol',     'Arbitrage violation or unexplained jump → freeze affected curve + same-day Risk/Trading notification; unfrozen only after root cause confirmed'],
  ['Model review cycle',      'Periodic formal review of methodologies vs market-structure change; ad hoc trigger on detected structural break'],
];

const TABS = [
  'Methodology & construction',
  'Market analysis & instruments',
  'Seasonality & expert judgement',
  'Curve quality & monitoring',
];

const QTABS = [
  'Construction models compared',
  'Stochastic models for power',
  'Full worked example (Python)',
  'Limitations & failure modes',
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function Callout({ children, intent = 'accent' }) {
  const palette = {
    accent:   { bg: 'var(--accent-bg)',   border: 'var(--accent-b)'   },
    flag:     { bg: 'var(--flag-bg)',     border: 'var(--flag-b)'     },
    escalate: { bg: 'var(--escalate-bg)', border: 'var(--escalate-b)' },
    approve:  { bg: 'var(--approve-bg)',  border: 'var(--approve-b)'  },
  };
  const c = palette[intent] || palette.accent;
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderLeft: `3px solid ${c.border}`, borderRadius: 4,
      padding: '12px 16px', margin: '14px 0',
      fontSize: 12, color: 'var(--text)', lineHeight: 1.65,
    }}>
      {children}
    </div>
  );
}

function MaturityZones() {
  const zones = [
    {
      num: '01', label: 'Near curve', range: '0–3 months',
      desc: 'Exchange-quoted contracts; direct instrument mapping; minimal model risk. Curve deviation versus exchange settlement is the primary quality check.',
    },
    {
      num: '02', label: 'Mid-term', range: '3 months – 2 years',
      desc: 'Quarterly and seasonal swaps; OTC price discovery from broker composite; cubic-spline interpolation regime. Liquidity is sufficient for objective anchoring.',
    },
    {
      num: '03', label: 'Long end', range: '2 years+',
      desc: 'Sparse liquidity; expert judgement and extrapolation dominate. Highest governance burden: every parameter choice must be documented, versioned, and formally approved.',
    },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '16px 0' }}>
      {zones.map(z => (
        <div key={z.num} style={{
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: 4, padding: '14px 16px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 12, right: 14,
            fontSize: 30, fontWeight: 900, color: 'var(--border2)', lineHeight: 1,
            userSelect: 'none',
          }}>{z.num}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{z.label}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>{z.range}</div>
          <div style={{ fontSize: 12, color: 'var(--text-sec)', lineHeight: 1.55 }}>{z.desc}</div>
        </div>
      ))}
    </div>
  );
}

function FourCardGrid({ cards }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)', borderRadius: 4, padding: '14px 16px',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6,
          }}>{c.title}</div>
          <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{c.body}</div>
        </div>
      ))}
    </div>
  );
}

function TabStrip({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', borderBottom: '1px solid var(--border)',
      marginBottom: 20, overflowX: 'auto',
    }}>
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          style={{
            padding: '8px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: 'none', background: 'none', whiteSpace: 'nowrap', flexShrink: 0,
            color: active === i ? 'var(--accent)' : 'var(--text-sec)',
            borderBottom: active === i ? '2px solid var(--accent)' : '2px solid transparent',
            transition: 'all .12s',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ── Governance SVG diagram ─────────────────────────────────────────────────────

function GovernanceDiagram() {
  return (
    <svg
      viewBox="0 0 800 340"
      role="img"
      aria-label="Governance hierarchy diagram: Curve Governance Committee at top; Central Methodology and Risk Management in the middle tier; DE/AT, GB/NL, and Other BU local-owner boxes at the bottom. Solid arrows indicate direction of authority; dashed arrows indicate curve submissions and feedback."
      style={{ width: '100%', maxWidth: 860, display: 'block', margin: '0 auto' }}
    >
      <defs>
        <marker id="pfc-arr-blue"  viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#0052cc"/></marker>
        <marker id="pfc-arr-light" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4c9aff"/></marker>
        <marker id="pfc-arr-gray"  viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#97a0af"/></marker>
      </defs>

      {/* Top tier — Curve Governance Committee */}
      <rect x="260" y="10" width="280" height="54" rx="4" fill="#deebff" stroke="#4c9aff" strokeWidth="1.5"/>
      <text x="400" y="32"  textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0052cc">Curve Governance Committee</text>
      <text x="400" y="50"  textAnchor="middle" fontSize="9.5"  fill="#0052cc">Policy ownership · Curve approval · Escalation</text>

      {/* Middle tier — Central Methodology */}
      <rect x="225" y="115" width="320" height="60" rx="4" fill="#0052cc" stroke="#003d99" strokeWidth="1.5"/>
      <text x="385" y="136" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">Central Methodology (this role)</text>
      <text x="385" y="153" textAnchor="middle" fontSize="9.5"  fill="#c0d8ff">Standards · Validation · Cross-BU coordination</text>
      <text x="385" y="167" textAnchor="middle" fontSize="9"    fill="#c0d8ff">Resource steering · Stakeholder interface</text>

      {/* Side box — Risk Management */}
      <rect x="585" y="115" width="190" height="60" rx="4" fill="#f8f9fa" stroke="#c1c7d0" strokeWidth="1.5"/>
      <text x="680" y="136" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#172b4d">Risk Management</text>
      <text x="680" y="153" textAnchor="middle" fontSize="9.5"  fill="#5e6c84">Limits · Model sign-off</text>
      <text x="680" y="167" textAnchor="middle" fontSize="9"    fill="#5e6c84">Independent oversight</text>

      {/* Bottom tier — local owners */}
      {/* DE/AT */}
      <rect x="20"  y="235" width="210" height="58" rx="4" fill="#f4f5f7" stroke="#dfe1e6" strokeWidth="1.5"/>
      <text x="125" y="258" textAnchor="middle" fontSize="11"   fontWeight="600" fill="#172b4d">DE/AT curves</text>
      <text x="125" y="273" textAnchor="middle" fontSize="9.5"  fill="#5e6c84">Power · Gas · Heat</text>
      <text x="125" y="285" textAnchor="middle" fontSize="9"    fill="#97a0af">Local curve owners</text>
      {/* GB/NL */}
      <rect x="265" y="235" width="240" height="58" rx="4" fill="#f4f5f7" stroke="#dfe1e6" strokeWidth="1.5"/>
      <text x="385" y="258" textAnchor="middle" fontSize="11"   fontWeight="600" fill="#172b4d">GB/NL curves</text>
      <text x="385" y="273" textAnchor="middle" fontSize="9.5"  fill="#5e6c84">Power · Capacity</text>
      <text x="385" y="285" textAnchor="middle" fontSize="9"    fill="#97a0af">Local curve owners</text>
      {/* Other BUs */}
      <rect x="540" y="235" width="240" height="58" rx="4" fill="#f4f5f7" stroke="#dfe1e6" strokeWidth="1.5"/>
      <text x="660" y="258" textAnchor="middle" fontSize="11"   fontWeight="600" fill="#172b4d">Other BUs</text>
      <text x="660" y="273" textAnchor="middle" fontSize="9.5"  fill="#5e6c84">e.g. HU, CZ, SE</text>
      <text x="660" y="285" textAnchor="middle" fontSize="9"    fill="#97a0af">Local curve owners</text>

      {/* ── Arrows ── */}
      {/* Committee → Central (solid blue, authority/direction) */}
      <line x1="393" y1="64" x2="393" y2="113" stroke="#0052cc" strokeWidth="1.5" markerEnd="url(#pfc-arr-blue)"/>
      {/* Central → Committee (dashed light, proposals up) */}
      <line x1="407" y1="113" x2="407" y2="64" stroke="#4c9aff" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#pfc-arr-light)"/>

      {/* Central → Risk Management (dashed gray) */}
      <line x1="545" y1="145" x2="583" y2="145" stroke="#5e6c84" strokeWidth="1.2" strokeDasharray="4,3" markerEnd="url(#pfc-arr-gray)"/>

      {/* Central → local owners (solid blue, methodology direction) */}
      <line x1="385" y1="175" x2="133" y2="233" stroke="#0052cc" strokeWidth="1.2" markerEnd="url(#pfc-arr-blue)"/>
      <line x1="385" y1="175" x2="385" y2="233" stroke="#0052cc" strokeWidth="1.2" markerEnd="url(#pfc-arr-blue)"/>
      <line x1="385" y1="175" x2="648" y2="233" stroke="#0052cc" strokeWidth="1.2" markerEnd="url(#pfc-arr-blue)"/>

      {/* Local owners → Central (dashed gray, curve submission / feedback) */}
      <line x1="143" y1="233" x2="365" y2="175" stroke="#97a0af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#pfc-arr-gray)"/>
      <line x1="395" y1="233" x2="395" y2="175" stroke="#97a0af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#pfc-arr-gray)"/>
      <line x1="638" y1="233" x2="405" y2="175" stroke="#97a0af" strokeWidth="1" strokeDasharray="3,3" markerEnd="url(#pfc-arr-gray)"/>

      {/* Legend */}
      <g transform="translate(20, 305)">
        <line x1="0" y1="8" x2="22" y2="8" stroke="#0052cc" strokeWidth="1.5"/>
        <polygon points="18,5 24,8 18,11" fill="#0052cc"/>
        <text x="28" y="12" fontSize="9" fill="#5e6c84">Direction of authority / methodology</text>

        <line x1="185" y1="8" x2="207" y2="8" stroke="#97a0af" strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points="203,5 209,8 203,11" fill="#97a0af"/>
        <text x="213" y="12" fontSize="9" fill="#5e6c84">Curve submission / feedback</text>

        <line x1="370" y1="8" x2="392" y2="8" stroke="#4c9aff" strokeWidth="1" strokeDasharray="4,3"/>
        <polygon points="388,5 394,8 388,11" fill="#4c9aff"/>
        <text x="398" y="12" fontSize="9" fill="#5e6c84">Methodology proposals up</text>
      </g>
    </svg>
  );
}

// ── Cloud architecture two-column block ───────────────────────────────────────

function CloudLayer({ title, items }) {
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 4, padding: '16px 18px' }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--text)', textTransform: 'uppercase',
        letterSpacing: '.05em', marginBottom: 10, borderBottom: '1px solid var(--border)', paddingBottom: 8,
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            paddingBottom: i < items.length - 1 ? 6 : 0,
            marginBottom: i < items.length - 1 ? 6 : 0,
          }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ── Code block ─────────────────────────────────────────────────────────────────
function CodeBlock({ children }) {
  return (
    <div style={{ overflowX: 'auto', margin: '10px 0' }}>
      <pre style={{
        fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        fontSize: 11.5, lineHeight: 1.7,
        background: '#1a1e2e', color: '#cdd6f4',
        borderRadius: 4, padding: '14px 18px', margin: 0,
        whiteSpace: 'pre', tabSize: 4,
        border: '1px solid #2a2f3f',
        overflowX: 'auto',
      }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ── Inline monospace formula block ─────────────────────────────────────────────
function Formula({ children }) {
  return (
    <div style={{
      fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
      fontSize: 12, background: 'var(--surface2)', border: '1px solid var(--border)',
      borderRadius: 4, padding: '9px 14px', color: 'var(--text)',
      margin: '4px 0 10px', lineHeight: 1.8, whiteSpace: 'pre',
    }}>
      {children}
    </div>
  );
}

// ── Sub-section label ──────────────────────────────────────────────────────────
function SubLabel({ children }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, color: 'var(--text-sec)',
      textTransform: 'uppercase', letterSpacing: '.05em', margin: '16px 0 8px',
    }}>
      {children}
    </div>
  );
}

// ── Tab JD tag ─────────────────────────────────────────────────────────────────
function TabTag({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 14,
    }}>
      Maps to: <span style={{ color: 'var(--accent)' }}>{children}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function EonForwardCurvesPage() {
  const [tab,  setTab]  = useState(0);
  const [qTab, setQTab] = useState(0);

  return (
    <div className="page-container">

      {/* ── 0. Hero ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: '#fff', border: '1px solid var(--border)', borderRadius: 5,
        padding: '24px 28px', marginBottom: 20,
        borderTop: '3px solid var(--accent)',
        boxShadow: '0 1px 3px rgba(9,30,66,.06)',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: 'var(--text-sec)',
          textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10,
        }}>
          {EYEBROW}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: 12 }}>
          {TITLE}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.7, maxWidth: 860 }}>
          {SUBTITLE}
        </div>
      </div>

      {/* ── 0b. JD mapping ──────────────────────────────────────────────────── */}
      <SectionCard title="How this page maps to the role" action="JD · Job ID 243900">
        <DataTable
          columns={['Page section', 'JD coverage']}
          rows={JD_MAP_ROWS.map(([sec, cov]) => [
            sec,
            <span style={{ fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>{cov}</span>,
          ])}
        />
        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10 }}>
          A — Quantitative Ownership &amp; Methodological Leadership &nbsp;·&nbsp;
          B — Market Analysis &amp; Curve Quality &nbsp;·&nbsp;
          C — Governance, Stakeholder Management &amp; Decision Support &nbsp;·&nbsp;
          D — Implementation &amp; Data / Reporting Enablement &nbsp;·&nbsp;
          Q — Qualifications
        </p>
      </SectionCard>

      {/* ── 1. Context & mandate ────────────────────────────────────────────── */}
      <SectionCard title="Context & mandate" action="A1 · C1">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
          An energy markets business that coordinates market access for regional business units across multiple European jurisdictions and bundles the associated risks at group level uses the price forward curve (PFC) as its methodological backbone: every transaction that carries multi-year price exposure is valued, hedged, and reported against a curve the central function owns and defends. The function must ensure that these curves are consistent, quality-controlled, and traceable — regardless of which local team originates them.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
          The senior analyst role in this function owns the intellectual quality of curve construction group-wide. That means designing and evolving methodologies, independently challenging parameter choices, running model validation and back-testing, and acting as the central interface between local curve owners, quantitative developers, trading desks, risk management, and senior management across a multi-country portfolio.
        </p>
        <Callout intent="accent">
          <strong>The core tension:</strong> forward curves must be simultaneously <em>technically defensible</em> — to quantitative analysts, model validators, and auditors who scrutinise interpolation choices and calibration assumptions — and <em>commercially interpretable</em> — to traders and senior management who make decisions based on the numbers. Governance is what makes both true at once: it enforces rigour without sacrificing accessibility, and creates an auditable record that separates agreed methodology from ad hoc adjustment.
        </Callout>
      </SectionCard>

      {/* ── 2–5. Tabbed technical block ─────────────────────────────────────── */}
      <SectionCard title="Technical analysis" action="A1 · A2 · A3 · B1 · B2 · Q2 · Q3 · Q5">
        <TabStrip tabs={TABS} active={tab} onChange={setTab} />

        {/* ── Tab 1: Methodology & construction ── */}
        {tab === 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 14 }}>
              Maps to: <span style={{ color: 'var(--accent)' }}>A1 · A3 · Q3</span>
            </div>

            {/* 2a. Mathematical foundation */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
              Mathematical foundation
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
              A price forward curve maps maturity to a rate or price. The spot (yield) curve y(t) gives the rate from today to future date t; the forward curve gives the implied rate between two future dates. The forward rate implied by the yield curve is:
            </p>
            <div style={{
              fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: 12, background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 4, padding: '10px 16px', color: 'var(--text)',
              margin: '8px 0 12px', letterSpacing: '.01em', lineHeight: 1.8,
            }}>
              f(t₁, t₂) = [ (1 + y(t₂))^t₂ / (1 + y(t₁))^t₁ ]^(1/(t₂−t₁)) − 1
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
              The discount factor — the present value of one unit received at time t — is used directly in log-linear interpolation:
            </p>
            <div style={{
              fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: 12, background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 4, padding: '10px 16px', color: 'var(--text)',
              margin: '8px 0 12px', letterSpacing: '.01em', lineHeight: 1.8,
            }}>
              P(t) = 1 / (1 + y(t))^t
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-sec)', lineHeight: 1.65, marginBottom: 16 }}>
              <strong>Log-linear interpolation precision note:</strong> interpolating log-linearly on discount factors means interpolating ln P(t) linearly between knot points t₁ and t₂ — i.e.{' '}
              <span style={{ fontFamily: 'monospace' }}>ln P(t) = α·ln P(t₁) + (1−α)·ln P(t₂)</span> where <span style={{ fontFamily: 'monospace' }}>α = (t₂−t)/(t₂−t₁)</span>.{' '}
              This is equivalent to assuming constant implied forward rates between knots and guarantees non-negative forward rates — the precise motivation for the "log-linear" entry in the interpolation table below.
            </p>

            {/* Construction approaches */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
              Construction approaches — trade-offs
            </div>
            <DataTable
              columns={['Approach', 'Mechanism', 'Key trade-offs']}
              rows={[
                [
                  <strong>Sequential bootstrapping</strong>,
                  'Build the curve date-by-date; each calibrating instrument re-prices to exactly zero error before advancing to the next maturity',
                  'Simple, transparent, and interpretable; each anchor is independently verifiable. Can produce instability or oscillation at illiquid-tenor endpoints where anchors are sparse.',
                ],
                [
                  <strong>Simultaneous best-fit</strong>,
                  'Solve all curve points jointly via a Newton-type (nonlinear least-squares) solver that minimises weighted pricing error across all instruments simultaneously',
                  'Robust when instruments overlap or span the same maturity; handles interdependencies well. Requires solver convergence monitoring; pricing errors are minimised but not always zero.',
                ],
                [
                  <strong>Reference / spread-template</strong>,
                  'Express the target curve as a base curve plus calibrated per-tenor spread adjustments; calibrate only the spreads rather than the full curve',
                  'Efficient when many related curves share structure (e.g. peak vs off-peak, or adjacent markets). Base-curve governance is critical: spread adjustments can mask errors in the base.',
                ],
              ]}
            />
            <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, marginBottom: 16, fontStyle: 'italic' }}>
              The choice of construction approach is a governance decision: each method has different failure modes, different auditability profiles, and different dependencies on input quality. The function documents the rationale for the approach chosen for each curve family and reviews it when market structure changes.
            </p>

            {/* Maturity zones */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>
              Three maturity zones
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 4 }}>
              Regardless of construction approach, the curve is governed across three distinct maturity regimes with different liquidity, model-risk, and governance profiles:
            </p>
            <MaturityZones />

            {/* Interpolation table */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-sec)', textTransform: 'uppercase', letterSpacing: '.05em', margin: '16px 0 8px' }}>
              Interpolation methods by maturity zone
            </div>
            <DataTable
              columns={['Zone', 'Method', 'Justification']}
              rows={INTERP_ROWS}
            />

            <Callout intent="accent">
              <strong>Q3 linkage:</strong> the long end (2Y+) requires stochastic and extrapolation models informed by time-series analysis. Parameter choices — long-run mean, mean-reversion speed, seasonal decay — must be calibrated from historical data using rigorous statistical methods and reviewed whenever the underlying generation mix or regulatory regime changes structurally. This is the intersection of statistics and stochastic modelling (Q3) with methodology ownership (A1) and model-limitation assessment (A3).
            </Callout>
          </div>
        )}

        {/* ── Tab 2: Market analysis & instruments ── */}
        {tab === 1 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 14 }}>
              Maps to: <span style={{ color: 'var(--accent)' }}>B1 · Q2</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              Input-instrument choice determines curve quality at least as much as the interpolation algorithm: a technically correct bootstrapper built on poorly chosen or illiquid inputs produces a curve that is internally consistent but commercially wrong. The function maintains an explicit, regularly reviewed instrument hierarchy that distinguishes primary anchors — which the curve must reprice exactly — from cross-checks (detecting internal inconsistency) and expert overlays (filling structural gaps where no liquid instrument exists).
            </p>
            <DataTable
              columns={['Instrument', 'Role in PFC', 'Liquidity regime']}
              rows={INSTR_ROWS}
            />
            <Callout intent="flag">
              <strong>Market monitoring obligation (B1):</strong> liquidity migration and structural changes — a shifting generation mix reducing the predictive content of dark spreads, the emergence of new auction-based capacity mechanisms, or the rise of a new benchmark hub — directly change which instruments should anchor the curve and how much weight expert overlay should carry. The function tracks these developments continuously and triggers a formal instrument-hierarchy reassessment whenever a material change is identified, rather than waiting for the scheduled periodic review.
            </Callout>
          </div>
        )}

        {/* ── Tab 3: Seasonality & expert judgement ── */}
        {tab === 2 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 14 }}>
              Maps to: <span style={{ color: 'var(--accent)' }}>A2 · Q5</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              Seasonality is the defining structural feature of power forward curves and the hardest component to govern, because it is partly market-implied and partly model-derived. The two must be kept strictly separate: <em>traded</em> seasonality is objective and governed by instrument-selection rules, while <em>shape</em> seasonality is subjective, introduced by the modelling layer, and must be versioned and formally approved between review cycles.
            </p>
            <FourCardGrid cards={[
              {
                title: 'Traded seasonality',
                body: 'Implied directly by calendar swap spreads, Q1–Q4 relative pricing, and peak/off-peak differentials. Objective in origin; governed by the instrument-selection framework. Changes only when the market structure changes — not by analyst discretion between approval cycles.',
              },
              {
                title: 'Shape seasonality',
                body: 'Imposed by a load or temperature model that converts base/peak quarterly quotes into hourly granularity. Subjective by nature; must be explicitly versioned, documented, and formally approved before application to production curves. The primary source of cross-BU price inconsistency when ungoverned.',
              },
              {
                title: 'Renewable intermittency',
                body: 'Solar and wind penetration distorts the intraday shape, particularly the duck-curve phenomenon in summer quarters. Parameterised explicitly in the shape model and reviewed as the generation mix evolves — not treated as a residual, but as a structural input that changes at a known frequency tied to renewable capacity data.',
              },
              {
                title: 'Temperature sensitivity',
                body: 'Heating and cooling degree-day models for demand-side seasonality. Requires an agreed reference climate baseline and a defined historical normalisation window; both are governance parameters that must be locked between approval cycles and disclosed in the methodology note.',
              },
            ]} />
            <Callout intent="escalate">
              <strong>A2 / Q5 — Challenging expert judgement constructively:</strong> seasonality parameters are locked between formal approval cycles for precisely this reason. Undocumented ad hoc adjustments — made individually by a local curve owner to improve short-term P&L fit — are the primary source of unexplained P&L and cross-business-unit price inconsistency. The central function challenges parameter choices through evidence (back-test statistics, historical fit data) and process (a documented change-management procedure), not through override authority. The objective is to make the methodologically correct path the path of least resistance, not to police individual analysts.
            </Callout>
          </div>
        )}

        {/* ── Tab 4: Curve quality & monitoring ── */}
        {tab === 3 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 14 }}>
              Maps to: <span style={{ color: 'var(--accent)' }}>B2 · A3</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              Curve quality is a continuous monitoring problem, not a pass/fail gate. A quantitative scorecard runs each production cycle, evaluating the curve across five dimensions and feeding the result directly into the approval decision. A persistent deteriorating trend across multiple cycles triggers a methodology review rather than waiting for the periodic schedule. All targets below are illustrative of the monitoring framework; operational thresholds are governance parameters set through the approval process.
            </p>
            <div className="metrics-row" style={{ marginBottom: 4 }}>
              <MetricCard
                label="Bid-ask penetration"
                value="Within mid"
                sub="Illustrative target · deviation vs market mid"
                intent="approve"
              />
              <MetricCard
                label="Arbitrage violations"
                value="Zero"
                sub="Illustrative target · calendar-spread monotonicity"
                intent="approve"
              />
              <MetricCard
                label="Back-test error"
                value="Monitored"
                sub="Illustrative · rolling window vs settled prompt prices"
                intent="accent"
              />
              <MetricCard
                label="Sensitivity coverage"
                value="Full"
                sub="Illustrative · DV01 across anchor instruments"
                intent="accent"
              />
            </div>
            <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, fontStyle: 'italic' }}>
              All metric labels and targets above are illustrative of the monitoring concept; operational thresholds are set through the governance process.
            </p>
            <DataTable
              columns={['Dimension', 'Metric', 'Action trigger']}
              rows={QUAL_ROWS}
            />
            <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10, fontStyle: 'italic' }}>
              Action triggers are illustrative; specific threshold values are governance parameters reviewed periodically.
            </p>
          </div>
        )}
      </SectionCard>

      {/* ── NEW: Quantitative methods ─────────────────────────────────────── */}
      <SectionCard title="Quantitative methods" action="A3 · Q1 · Q3 · Q4">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
          Curve construction is a modelling choice, not a fixed procedure. The central function must understand the trade-offs between construction families, the stochastic structure specific to power markets, the failure modes of each approach, and how to validate outputs quantitatively. This section sets out the methods, their comparison, reference code, and — critically — their limitations.
        </p>

        <TabStrip tabs={QTABS} active={qTab} onChange={setQTab} />

        {/* ── QTab 1: Construction models compared ── */}
        {qTab === 0 && (
          <div>
            <TabTag>A3 · Q1 · Q3</TabTag>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              Four families of curve construction represent different positions on the flexibility / transparency / stability triangle. No single method is universally superior; the function selects per maturity zone and documents the rationale as a governance parameter.
            </p>
            <DataTable
              columns={['Method', 'How it works', 'Strengths', 'Weaknesses', 'Best for']}
              rows={[
                [
                  <strong>Sequential bootstrapping</strong>,
                  'Solve date-by-date so each calibrating instrument re-prices to exactly zero error before advancing to the next maturity',
                  'Transparent; exact reprice; fast; every anchor independently auditable',
                  'Local — a bad input quote distorts one node without smoothing to neighbours; sensitive to instrument ordering',
                  'Liquid near/mid curve with clean, reliable anchors',
                ],
                [
                  <strong>Spline interpolation (cubic / tension)</strong>,
                  'Fit a smooth piecewise-polynomial through pillar rates; C² continuity across knots',
                  'Smooth seasonal shape; no discontinuities; visually interpretable',
                  'Can oscillate or produce negative implied forwards between sparse pillars; not arbitrage-aware by default',
                  'Seasonal mid-curve where smoothness matters more than exactness',
                ],
                [
                  <strong>Parametric — Nelson-Siegel / Svensson</strong>,
                  'Fit a low-parameter functional form to the whole curve via least squares',
                  'Parsimonious; stable; interpretable parameters (level, slope, curvature); well-behaved extrapolation',
                  'Cannot reprice every pillar exactly; misspecification risk; less suited to strong multi-scale seasonality',
                  'Sparse, illiquid long end where stability outweighs exactness',
                ],
                [
                  <strong>Dynamic / HJM-style (no-arbitrage forward dynamics)</strong>,
                  'Model the entire forward curve\'s stochastic evolution under a no-arbitrage drift condition',
                  'Arbitrage-free by construction; supports scenario generation and derivative valuation',
                  'Calibration-intensive; computationally heavy; overkill for a static daily production mark',
                  'Scenario generation, risk simulation, path-dependent derivative valuation — not the daily mark',
                ],
              ]}
            />
            <Callout intent="accent">
              <strong>Which to use where:</strong> bootstrap the liquid near end (exact reprice matters for settlement and audit); spline the seasonal mid curve (smoothness matters for interpolation between quarterly anchors); apply Nelson-Siegel to the illiquid long end (stability and parsimony matter where anchors are sparse); reserve HJM-style dynamics for scenario generation and derivative valuation, not the daily production mark.
            </Callout>

            <SubLabel>Core formulas (plain monospace — no additional renderer loaded)</SubLabel>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>Forward rate implied by the yield curve:</div>
            <Formula>f(t−n, t) = [ (1 + y(t))^t / (1 + y(t−n))^(t−n) ]^(1/n) − 1</Formula>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>Discount factor:</div>
            <Formula>P(t) = 1 / (1 + y(t))^t</Formula>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>Nelson-Siegel (β₀: level  β₁: slope  β₂: curvature  λ: decay rate):</div>
            <Formula>{`y(τ) = β₀ + β₁·(1−e^(−τ/λ))/(τ/λ) + β₂·[ (1−e^(−τ/λ))/(τ/λ) − e^(−τ/λ) ]`}</Formula>

            <SubLabel>Pseudocode — illustrative structure of each family</SubLabel>
            <CodeBlock>{`# 1. Sequential bootstrapping (illustrative pseudocode)
def bootstrap_curve(instruments, quotes):
    """Step-function curve; each pillar reprices to exactly zero error."""
    curve = {}
    for instr, q in sorted(zip(instruments, quotes)):
        curve[instr.end] = q    # flat-price instrument: direct assignment
    return curve                # callable via step-function lookup

# 2. Cubic spline (illustrative pseudocode)
def spline_curve(pillars, rates):
    """Natural cubic spline; callable as cs(t) for any maturity t."""
    from scipy.interpolate import CubicSpline
    return CubicSpline(pillars, rates, bc_type='natural')

# 3. Nelson-Siegel fit (illustrative pseudocode)
def fit_nelson_siegel(taus, yields):
    """Bounded least-squares NS calibration."""
    from scipy.optimize import least_squares
    def ns(t, b0, b1, b2, lam):
        x  = t / max(lam, 1e-6)
        f1 = (1 - exp(-x)) / x     # slope loading (→1 as x→0)
        f2 = f1 - exp(-x)           # curvature loading
        return b0 + b1 * f1 + b2 * f2
    result = least_squares(
        lambda p: ns(taus, *p) - yields,
        x0=[yields.mean(), 1.0, 0.5, 1.5],
        bounds=([0, -500, -500, 0.05], [1000, 500, 500, 30.0])
    )
    return result.x   # (β₀, β₁, β₂, λ)
# Tab 3 contains the complete, runnable implementation of all three families.`}
            </CodeBlock>
          </div>
        )}

        {/* ── QTab 2: Stochastic models for power ── */}
        {qTab === 1 && (
          <div>
            <TabTag>A3 · Q3</TabTag>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 14 }}>
              Power prices are not a random walk. Any forward-curve or scenario model must capture mean reversion, strong multi-scale seasonality, and spikes — features that distinguish power from rates or FX and that have direct implications for how curves are constructed, validated, and what limitations must be disclosed.
            </p>
            <FourCardGrid cards={[
              {
                title: 'Mean reversion (Ornstein-Uhlenbeck)',
                body: 'dX = κ(θ(t) − X)dt + σ dW. Spot prices revert to a seasonal equilibrium θ(t) at speed κ. Curve-building implication: long-end DV01 to a near-curve shock should decay at rate κ. If a constructed curve shows near-uniform DV01 across all tenors, the implied forward dynamics are implausible — a useful cross-check.',
              },
              {
                title: 'Seasonality (deterministic component)',
                body: 'θ(t) = a₀ + Σₖ[aₖcos(2πkt/T) + bₖsin(2πkt/T)] for annual, weekly, and intra-day cycles. The deterministic component is separated from the stochastic residual before fitting κ and σ — the same traded-vs-shape separation that the instrument-selection framework governs on the previous tab.',
              },
              {
                title: 'Jumps / spikes (jump-diffusion)',
                body: 'Add a compound-Poisson jump term: dX = κ(θ−X)dt + σ dW + J dN, where N is Poisson with intensity λⱼ and J is a jump-size distribution. A Gaussian-only model understates tail risk and produces long-end confidence intervals that are too narrow — directly relevant to the model-limitation disclosures in the stakeholder section.',
              },
              {
                title: 'Two-factor / regime structure',
                body: 'A short-term mean-reverting factor plus a long-term stochastic equilibrium (Schwartz-Smith style). The two factors have different persistence, explaining why front and back of the power curve decorrelate. Governance implication: whether front-month liquid quotes anchor long-dated marks depends on the assumed factor-correlation structure.',
              },
            ]} />

            <SubLabel>Key equations (plain monospace)</SubLabel>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>OU mean-reversion SDE:</div>
            <Formula>dX_t = κ(θ(t) − X_t) dt + σ dW_t</Formula>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>Fourier seasonal equilibrium:</div>
            <Formula>{`θ(t) = a₀ + Σₖ [ aₖ cos(2πkt/T) + bₖ sin(2πkt/T) ]
     T ∈ {1yr, 1wk, 1day}  — annual, weekly, intra-day cycles`}</Formula>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginBottom: 4 }}>Jump-diffusion extension:</div>
            <Formula>{`dX_t = κ(θ(t) − X_t) dt + σ dW_t + J_t dN_t
     N_t: Poisson process, intensity λ_J;  J_t: jump size (e.g. log-normal)`}</Formula>

            <SubLabel>Pseudocode — parameter estimation (illustrative)</SubLabel>
            <CodeBlock>{`# Fit seasonality via OLS on Fourier basis features (illustrative pseudocode)
def fit_seasonality(prices, t, periods=[52, 1]):
    """OLS regression on cos/sin features for each period."""
    X = np.column_stack([
        f(2 * np.pi * k * t / T)
        for T in periods for k in [1, 2, 3]
        for f in (np.cos, np.sin)
    ] + [np.ones(len(t))])
    coeffs, *_ = np.linalg.lstsq(X, prices, rcond=None)
    return coeffs   # seasonal_estimate(t_new) = design_matrix(t_new) @ coeffs

# Fit OU parameters via AR(1) regression on deseasonalised residuals:
#   X_t = alpha + phi * X_{t-1} + eps  =>  kappa = -ln(phi) / dt
def fit_ou(resid, dt=1/52):
    phi   = np.corrcoef(resid[:-1], resid[1:])[0, 1]
    kappa = -np.log(max(phi, 1e-6)) / dt
    theta = resid.mean()
    sigma = resid.std() * np.sqrt(2 * kappa)
    return kappa, theta, sigma   # speed of reversion, equilibrium, vol

# Jump detection: flag residuals whose magnitude exceeds a threshold
# (threshold is a governance parameter; value marked illustrative)
spikes = np.abs(resid - resid.mean()) > 3.0 * resid.std()`}
            </CodeBlock>
          </div>
        )}

        {/* ── QTab 3: Full worked Python example ── */}
        {qTab === 2 && (
          <div>
            <TabTag>A3 · Q4</TabTag>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              A single, clean, runnable Python script (NumPy + SciPy only) implementing the complete three-zone stitched curve with round-trip validation and DV01 sensitivity. All tenors and quotes are illustrative. A reviewer can run this as written.
            </p>
            <CodeBlock>{`"""
Illustrative three-zone power price forward curve.
All tenors and quotes are illustrative – not real market data.
Requires: numpy, scipy  (standard scientific Python)
"""

import numpy as np
from scipy.interpolate import CubicSpline
from scipy.optimize import least_squares

# ── 1. Illustrative pillar data ────────────────────────────────────────────
# Tenors in years from today; prices in €/MWh (all values illustrative)
TENORS = np.array([
    1/52, 2/52, 1/12, 2/12, 3/12,      # near  0–3M  (exchange futures)
    6/12, 9/12, 1.0,  1.5,  2.0,       # mid   3M–2Y (OTC quarterly swaps)
    3.0,  4.0,  5.0,                    # far   2Y+   (sparse OTC / reference)
])
QUOTES = np.array([
    42.0, 43.0, 44.5, 46.0, 47.0,      # illustrative €/MWh
    48.0, 49.5, 51.0, 52.5, 54.0,
    55.0, 55.8, 56.3,
])

NEAR_END = TENORS[4]    # 3M: near / mid boundary
MID_END  = TENORS[9]    # 2Y: mid  / far boundary

# ── 2. Zone 1 – Sequential bootstrapping (0–3M, exact reprice) ─────────────
def build_near(tenors, quotes):
    """Step-function: flat-price instruments reprice to exactly zero error."""
    return dict(zip(tenors, quotes))

def eval_near(t, curve):
    """Return price of the shortest contract whose maturity covers t."""
    for k in sorted(curve):
        if t <= k + 1e-9:
            return curve[k]
    return curve[max(curve)]

near_curve = build_near(TENORS[:5], QUOTES[:5])

# ── 3. Zone 2 – Cubic spline (3M–2Y, smooth seasonal shape) ───────────────
def build_mid(tenors, quotes):
    """Natural cubic spline.  bc_type='natural' → zero 2nd derivative at
    endpoints, suppressing the oscillation that 'not-a-knot' can produce
    between sparse seasonal pillars."""
    return CubicSpline(tenors, quotes, bc_type='natural')

def eval_mid(t, cs):
    return max(float(cs(t)), 0.01)      # floor prevents negative implied rate

mid_spline = build_mid(TENORS[4:10], QUOTES[4:10])   # anchored 3M → 2Y

# ── 4. Zone 3 – Nelson-Siegel parametric extrapolation (2Y+) ───────────────
def ns_rate(tau, b0, b1, b2, lam):
    """Nelson-Siegel: y(τ) = β₀ + β₁·f₁ + β₂·f₂.
    Vectorised; handles τ→0 limit (L'Hôpital: f₁→1) to avoid division by zero."""
    lam  = max(float(lam), 1e-6)
    x    = np.asarray(tau, dtype=float) / lam
    safe = np.where(np.abs(x) < 1e-9, 1.0, x)
    f1   = np.where(np.abs(x) < 1e-9, 1.0, (1.0 - np.exp(-x)) / safe)
    f2   = f1 - np.exp(-x)
    return b0 + b1 * f1 + b2 * f2

def fit_ns(taus, yields):
    """Bounded least-squares NS calibration; x0 seeded near data mean."""
    def resid(p): return ns_rate(taus, *p) - yields
    x0     = [float(yields.mean()), 1.0, 0.5, 1.5]
    bounds = ([0.0, -500, -500, 0.05], [1000, 500, 500, 30.0])
    return least_squares(resid, x0, bounds=bounds).x   # (β₀, β₁, β₂, λ)

# Anchor NS fit at the 2Y boundary to ensure continuity with the spline
ns_params = fit_ns(TENORS[9:], QUOTES[9:])

# ── 5. Stitched curve – single callable interface ───────────────────────────
def pfc(t, near=near_curve, cs=mid_spline, ns=ns_params):
    """
    Forward price at maturity t (years). Routing by zone:
      t ≤ NEAR_END → bootstrapped step-function  (exact reprice)
      t ≤ MID_END  → natural cubic spline         (smooth shape)
      t > MID_END  → Nelson-Siegel parametric     (stable extrapolation)
    Edge cases:
      t < 0          → ValueError  (invalid maturity; reject before curve run)
      illiquid gap   → NS fallback (log as expert overlay in methodology note)
      holiday/weekend→ caller rolls to next settlement date
    """
    if t < 0:
        raise ValueError(f"Negative maturity: {t:.4f}y")
    if t <= NEAR_END:
        return eval_near(t, near)
    if t <= MID_END:
        return eval_mid(t, cs)
    return float(ns_rate(t, *ns))

# ── 6. Round-trip validation ─────────────────────────────────────────────────
errors  = np.abs([pfc(t) - q for t, q in zip(TENORS, QUOTES)])
max_err = errors.max()
print(f"Round-trip max reprice error: {max_err:.6f} €/MWh  [illustrative]")
# Near / mid: exact by construction (step and spline pass through every pillar)
# Far zone : bounded by NS least-squares residual
assert max_err < 1.0, f"Reprice breach {max_err:.4f} — inspect input quotes"

# ── 7. DV01: full-rebuild 1bp shift per pillar ───────────────────────────────
print("\\nDV01 — curve response to +1bp at each pillar [illustrative]:")
BP = 0.01
for i in range(len(TENORS)):
    bq   = QUOTES.copy(); bq[i] += BP
    bn   = build_near(TENORS[:5],   bq[:5])
    bc   = build_mid( TENORS[4:10], bq[4:10])
    bnsp = fit_ns(    TENORS[9:],   bq[9:])
    def pfc_b(t, bn=bn, bc=bc, bp=bnsp):   # default-arg captures by value
        if t < 0: raise ValueError
        if t <= NEAR_END: return eval_near(t, bn)
        if t <= MID_END:  return eval_mid(t, bc)
        return float(ns_rate(t, *bp))
    dv01 = pfc_b(TENORS[i]) - pfc(TENORS[i])
    print(f"  τ={TENORS[i]:.3f}y  base={QUOTES[i]:.2f}  ΔF={dv01:+.4f} €/MWh")`}
            </CodeBlock>
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
                <strong>Design choices and how to defend them:</strong> the three-zone routing reflects a deliberate trade-off. In the near zone, exact re-pricing of exchange contracts via step-function lookup is both correct and necessary — any deviation is a settlement arbitrage. In the mid zone, <code style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: '1px 4px', borderRadius: 2 }}>bc_type='natural'</code> is chosen over not-a-knot because natural boundary conditions suppress endpoint oscillation in a seasonally structured curve. In the far zone, Nelson-Siegel is chosen over spline extrapolation because its three-parameter structure imposes a plausible economic shape given only 3–4 sparse anchors; an unconstrained spline would overfit to noise in that regime.
              </p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
                The round-trip validation distinguishes two regimes: near/mid errors are exact-zero by construction (the algebraic structure guarantees it); far-zone errors are bounded by the NS fit residual and serve as a model-fit diagnostic. The DV01 is computed via full curve rebuild per pillar — not numerical differentiation — so each reported sensitivity faithfully reflects what changes in the production system when one input quote moves, which is the number a trading desk can act on. The default-argument trick in <code style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: '1px 4px', borderRadius: 2 }}>pfc_b</code> captures loop variables by value rather than by reference, which is necessary for correctness in Python closures inside loops.
              </p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
                Back-testing connects this code to the quality monitoring framework: a rolling-window comparison of <code style={{ fontFamily: 'monospace', fontSize: 11, background: 'var(--surface2)', padding: '1px 4px', borderRadius: 2 }}>pfc(t)</code> at construction date against the subsequently settled prompt price produces an error distribution (bias and RMSE) per tenor bucket. Persistent bias in a specific bucket signals either a bad anchor instrument or an interpolation regime that does not reflect market structure in that zone — and feeds directly into the quality scorecard on the previous page section.
              </p>
            </div>
          </div>
        )}

        {/* ── QTab 4: Limitations & failure modes ── */}
        {qTab === 3 && (
          <div>
            <TabTag>A3 · Q1</TabTag>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
              Every model fails somewhere. Methodological seniority — what A3 ("assess model limitations and suitability for use") means in practice — is knowing precisely where each approach breaks down, disclosing it in governance documentation, and designing monitoring to catch it before it becomes a P&amp;L event.
            </p>
            <DataTable
              columns={['Model / choice', 'Failure mode', 'Symptom', 'Mitigation']}
              rows={[
                ['Bootstrapping', 'Single bad input quote', 'Local kink: one node mis-priced; neighbours unaffected; the curve appears plausible in aggregate but is wrong at that tenor', 'Cross-check every bootstrapped node against the spline; run an outlier screen on input quotes before each curve build'],
                ['Cubic spline', 'Overfitting between sparse pillars', 'Oscillation between knots; implied forward rates become negative in some intra-pillar intervals', 'Tension spline or monotone-preserving scheme; run a forward-positivity check on a fine intra-pillar grid at every production cycle'],
                ['Nelson-Siegel', 'Misspecification on seasonal curves', 'Systematic fit residual at specific tenors; residuals are not white noise — they show a seasonal pattern', 'Use NS only where the curve is smooth (illiquid long end); run residual diagnostics; extend to Svensson if systematic residual persists'],
                ['Gaussian stochastic model', 'Ignores spikes and fat tails', 'Understated tail risk; long-end confidence intervals too narrow; scenario draws cluster near the mean and miss extreme events', 'Add jump component; widen CI explicitly; apply stress overlay; disclose as a named limitation in the model note'],
                ['Static daily mark', 'No path dependence', 'Cannot value path-dependent exposures or generate internally consistent scenarios across time', 'Use HJM-style no-arbitrage dynamics for scenario generation and derivative valuation; static mark for daily P&L and reporting only'],
                ['Any model on illiquid long end', 'Over-reliance on expert overlay', 'High overlay frequency; low market-alignment score; curve drifts from any observable anchor over time', 'Track overlay frequency as a named quality metric; persistent high frequency triggers a mandatory methodology review'],
              ]}
            />
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '8px 0 16px', fontStyle: 'italic' }}>
              Failure modes and mitigations above are illustrative of model-risk principles; specific thresholds are governance parameters set through the approval process.
            </p>
            <Callout intent="accent">
              Model risk is managed, not eliminated. The governance layer — approval cycles, overlay-frequency monitoring, documented limitations per curve — exists precisely because no single construction method is appropriate across all tenors and market regimes. The limitations catalogued here feed directly into the quality scorecard (curve quality tab), the model-limitation disclosures to risk management (stakeholder section), and the living methodology notes that form the audit trail (governance section). Quantitative depth and governance rigour are the same function viewed from different angles.
            </Callout>
          </div>
        )}
      </SectionCard>

      {/* ── 6. Governance & approval cycles ────────────────────────────────── */}
      <SectionCard title="Governance & approval cycles" action="C2 · C3 · C4">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
          Governance is the institutional memory that prevents individually sound decisions from accumulating into systemic inconsistency. For a multi-country, multi-commodity forward curve function, effective governance must simultaneously preserve local flexibility (allowing curve owners to reflect genuine regional market structure), enforce central consistency (ensuring cross-BU comparability for aggregated portfolio and risk reporting), and maintain senior transparency (providing management with a concise, reliable quality signal). It must also steer scarce central technical resources towards the highest-value work — a prioritisation function that requires both market awareness and stakeholder judgment (C2).
        </p>

        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--text-sec)',
            textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12,
          }}>
            Governance hierarchy — illustrative three-tier structure
          </div>
          <div style={{
            border: '1px solid var(--border)', borderRadius: 4,
            background: 'var(--surface2)', padding: '16px 8px',
          }}>
            <GovernanceDiagram />
          </div>
        </div>

        <DataTable
          columns={['Governance element', 'Cadence & content']}
          rows={GOV_ROWS}
        />
      </SectionCard>

      {/* ── 7. Stakeholder & decision support ───────────────────────────────── */}
      <SectionCard title="Stakeholder & decision support" action="C1 · C2 · Q6 · Q7">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
          The central-methodology role is fundamentally a translation role. The underlying quantitative information is the same for all audiences; what changes is the abstraction level, the frame of reference, and the decision the audience needs to make. Effective stakeholder management means delivering each audience a representation they can act on — not a simplified version of the analyst's view, but a genuinely different framing built for their context and communication register (Q6, Q7).
        </p>
        <FourCardGrid cards={[
          {
            title: 'Trading desks',
            body: 'Delta-adjusted P&L attribution by curve segment: which part of the curve moved, by how much, and whether the move is real market signal or model noise introduced by a parameter change. Traders need to distinguish market exposure from methodology artefact before positioning.',
          },
          {
            title: 'Risk management',
            body: 'Model-limitation disclosures, parameter sensitivity ranges, and long-end confidence-interval widths — the curve\'s epistemic uncertainty, not just its point estimate. Risk management needs to understand what the curve does not know about itself in order to set conservative limits on illiquid-tenor exposures.',
          },
          {
            title: 'Senior management',
            body: 'A one-page curve-health summary: quality status by market, notable market developments that affected the curve in the period, overlays applied and their rationale in plain language. No methodology jargon. Designed to be consumed in two minutes and to support an informed approval or escalation decision.',
          },
          {
            title: 'Quantitative developers',
            body: 'A precise functional specification: mathematical form, calibration targets, edge-case handling (illiquid tenors, missing quotes, weekend/holiday settlement), and acceptance criteria. Implementable without ambiguity. The specification is a living document, versioned alongside the deployed model.',
          },
        ]} />
      </SectionCard>

      {/* ── 8. Implementation & cloud enablement ────────────────────────────── */}
      <SectionCard title="Implementation & cloud enablement" action="D1 · D2 · Q4">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
          Supporting local teams and quantitative developers in implementing price models in a modern cloud-native stack, and building analytical and reporting solutions for trading, portfolio management, and risk, are integral responsibilities — not afterthoughts. The two-layer architecture described below is a generic pattern applicable across cloud providers; the central function's role is to specify, review, and validate implementations, collaborating with engineering teams rather than building in isolation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
          <CloudLayer
            title="Data ingestion layer"
            items={[
              'Market-data APIs and broker-feed normalisation into a standardised quote schema',
              'Object storage for immutable raw-quote snapshots — time-stamped, versioned, and auditable',
              'Query layer for ad hoc quality checks, back-testing, and instrument-hierarchy review',
              'In-memory cache for latency-sensitive near-curve data consumed by the trading layer',
            ]}
          />
          <CloudLayer
            title="Curve production layer"
            items={[
              'Reproducible curve builds with pinned, version-controlled parameters and methodology snapshots',
              'Automated quality checks run before publication; failed checks route to a review queue rather than auto-publishing',
              'Analytical outputs distributed to trading desks, portfolio management, and risk systems in agreed formats',
              'Full audit trail of every published curve: parameter snapshot, quality scores, manual overrides, and approver identity',
            ]}
          />
        </div>
        <Callout intent="accent">
          <strong>Python fluency in context (Q4):</strong> the role requires the ability to read and review model code critically — not merely execute it. In practice this means distinguishing a numerically stable bootstrapper (correctly handling illiquid or missing tenors, no silent division-by-near-zero in spread calculations) from one that produces plausible-looking but incorrect output in edge cases, and articulating the specific issue precisely to a developer in terms they can act on. Comfort with databases and modern data and cloud platforms enables participation in architecture reviews and implementation support without depending on a separate engineering intermediary.
        </Callout>
      </SectionCard>

    </div>
  );
}
