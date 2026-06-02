import React from 'react';
import { SectionCard, DataTable } from '../components/Shared';

const RATES_TO_POWER_ROWS = [
  ['Discounting curve (OIS / risk-free)',       'Discount factors for future-delivery cashflows'],
  ['Projection / forward curve (index)',         'Power/gas price forward curve'],
  ['Calibrate to deposits, futures, swaps',      'Calibrate to futures, calendar/seasonal swaps'],
  ['Multi-curve: right curve for right purpose', 'Multi-commodity: power, gas, carbon — coupled by spreads'],
  ['No-arbitrage = reprice all instruments',     'Same: round-trip test, monotonic calendar spreads'],
  ['Bootstrapping / interpolation',              'Same methods + seasonality shaping'],
];

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

function DefinitionBox({ term, children }) {
  return (
    <div style={{
      background: 'var(--surface2)', border: '1px solid var(--border)',
      borderLeft: '3px solid var(--accent)', borderRadius: 4,
      padding: '14px 16px', margin: '14px 0',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent)',
        textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8,
      }}>
        Definition — {term}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

export default function RatesToPowerPage() {
  return (
    <div className="page-container">

      {/* Hero */}
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
          Curve Construction Explained · Conceptual Framework
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: 12 }}>
          From rates to power: one framework, two assets
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.7, maxWidth: 860 }}>
          Curve construction is the same discipline whether the underlying is an interest rate or a power price: build the market's expectation of a value at each future maturity, calibrated so it reprices the liquid instruments it was built from. The framework that became standard for interest-rate derivatives — multi-curve, discount-vs-project separation, no-arbitrage enforcement — transfers directly to energy, with asset-specific differences in shape and instruments.
        </div>
      </div>

      {/* A — Two jobs */}
      <SectionCard title="A — The two jobs of a curve">
        <FourCardGrid cards={[
          {
            title: 'Discounting',
            body: 'What a future cashflow is worth today, expressed via discount factors: P(t) = 1 / (1 + y(t))^t. In energy, used to present-value future-delivery cashflows. The discount curve is derived from risk-free overnight instruments and applied uniformly regardless of the commodity.',
          },
          {
            title: 'Projection / forward',
            body: 'The expected price at each future maturity — the forward curve itself. In energy, the expected power or gas price for delivery at each future date. This is what traders, risk managers, and valuation systems read when they look at the price forward curve.',
          },
        ]} />
      </SectionCard>

      {/* B — Multi-curve */}
      <SectionCard title="B — Why the framework went multi-curve">
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
          Before 2008 a single curve served both jobs: it discounted cashflows and projected the floating index rate. Post-2008, unsecured lending carried credit and liquidity risk, and a persistent gap opened between the overnight risk-free rate and the term index used for projection. The resolution — discount on the overnight (OIS) curve; project off the relevant index curve — is the multi-curve standard: right curve for the right purpose. The subsequent transition to risk-free reference rates preserved this two-curve architecture.
        </p>
        <Callout intent="accent">
          <strong>Energy parallel — multi-commodity:</strong> power, gas, and carbon forward curves are distinct instruments but linked by physical and economic relationships (spark spread, dark spread, clean-spark spread). A change in gas prices propagates into the power curve; a carbon-price move affects both. The correct approach is to maintain several coupled curves — each governed separately, each reflecting its own market instruments — rather than one monolithic price surface. Same architectural principle, different assets.
        </Callout>
      </SectionCard>

      {/* C — No-arbitrage */}
      <SectionCard title="C — No-arbitrage as the unifying principle">
        <DefinitionBox term="Arbitrage">
          A risk-free profit from a price inconsistency: buying and selling related instruments simultaneously to lock in a gain with no net exposure. In liquid, well-functioning markets an arbitrage opportunity cannot persist — participants immediately trade it away, moving prices back to consistency.
        </DefinitionBox>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>
          A curve that does not reprice the instruments it was calibrated from creates an arbitrage: a market participant could simultaneously trade against the curve and the market to extract a risk-free gain. The no-arbitrage condition therefore requires that every calibrating instrument re-prices to zero error (bootstrapping) or minimum weighted error (best-fit solver) before the curve is published.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
          In practice the no-arbitrage condition has two operational expressions that appear in both rates and energy curve governance: the <strong>round-trip / re-pricing test</strong> (every calibrating instrument must price back to market), and the <strong>monotonic calendar-spread test</strong> (forward prices cannot imply risk-free storage arbitrage across adjacent delivery periods). Both are the same principle made operational.
        </p>
      </SectionCard>

      {/* D — Mapping table */}
      <SectionCard title="D — The framework mapping">
        <DataTable
          columns={['Rates world', 'Energy world']}
          rows={RATES_TO_POWER_ROWS}
        />
      </SectionCard>

      {/* E — What's different */}
      <SectionCard title="E — What's genuinely different">
        <FourCardGrid cards={[
          {
            title: 'Seasonality',
            body: 'Rates curves are smooth; power curves embed a repeating winter/summer, peak/off-peak wave. Seasonality is not noise to smooth over — it is a primary structural feature that must be preserved through the interpolation regime and governed as a formal parameter.',
          },
          {
            title: 'Mean reversion & spikes',
            body: 'Power prices revert to a seasonal equilibrium and spike on scarcity. Rates do not exhibit equivalent spike behaviour. Any scenario or long-end extrapolation model that ignores mean reversion will produce implausible dynamics for power.',
          },
          {
            title: 'Delivery over a period',
            body: 'A power price is for delivery over a calendar month or quarter, not a point in time. Base and peak quotes must be decomposed into hourly granularity via a shape model — this shaping step has no direct analogue in rates and is a significant source of model risk if ungoverned.',
          },
          {
            title: 'Cross-commodity coupling',
            body: 'Power, gas, and carbon curves are not independent: spark and dark spreads link them economically. Curve construction for power must account for cross-commodity consistency as a constraint, not an afterthought.',
          },
        ]} />
        <Callout intent="flag">
          The construction-and-governance discipline — calibrate, interpolate, validate, document — transfers directly between asset classes. The energy-specific behaviour (seasonality, mean reversion, spikes, cross-commodity links) is what the modelling layer adds on top.
        </Callout>
      </SectionCard>

    </div>
  );
}
