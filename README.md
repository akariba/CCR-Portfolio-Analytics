# CCR Portfolio Analytics

A browser-based counterparty credit risk dashboard for monitoring
derivatives exposure, CVA charges, and limit utilisation across
a multi-counterparty portfolio.

Built as a portfolio project demonstrating practical CCR analytics
skills — the kind of work done daily in risk teams at investment banks.

🔗 **Live demo:** https://akariba.github.io/CCR-Portfolio-Analytics/

---

## What it does

The dashboard models a derivatives book across five major bank
counterparties and answers the core questions a CCR desk deals
with every day:

- How much are we exposed to each counterparty, and how does
  that exposure change over the life of each trade?
- What is the financial cost of that credit risk (CVA)?
- How close are we to our credit limits?
- What happens to the portfolio under stress?
- How bad could a bad day actually get?

It combines exposure modeling, credit risk pricing, stress testing,
and tail risk analysis into a single interface with plain-language
interpretation of each output.

---

## Key features

**Counterparty exposure monitoring**
Tracks current and potential future exposure for Deutsche Bank,
Credit Suisse, Barclays, BNP Paribas, and JP Morgan. Shows limit
utilisation with real-time breach flagging and recommended actions.

**Full XVA pricing**
Computes CVA, DVA, FVA, and KVA — the complete set of valuation
adjustments that determine the true economic value of a derivatives
portfolio. Includes bilateral CVA adjusted for wrong-way risk.

**Exposure term structure**
Shows how exposure evolves over the lifetime of the portfolio —
not just a single number, but a curve across time. For a swap book,
exposure typically peaks around year 3 and then declines as
cashflows are exchanged. This profile is the core input to CVA.

**Wrong-way risk analysis**
Identifies counterparties where exposure and default probability
tend to rise together — a specific risk that standard models
understate. Quantifies the amplification effect on CVA per name.

**Stress testing**
Five named scenarios calibrated to real market events: rate shock,
FX move, volatility spike, and systemic crisis. Shows which
scenarios breach credit limits and by how much.

**Tail risk — VaR and Expected Shortfall**
Value at Risk computed three ways: parametric, historical simulation,
and EWMA-filtered historical. Compares results and explains the
gap — credit portfolios have fat-tailed return distributions that
make the standard normal approximation unreliable.

**Regulatory alignment**
Exposure computed under the SA-CCR framework (Basel III/IV),
broken down by asset class. CVA sensitivities (CS01, IR01) mapped
to FRTB SA-CVA capital inputs. Model backtesting results shown
for regulatory transparency.

**Model governance**
Validation status, backtest accuracy, and next review date for
each underlying model. 12-month backtest of PFE predictions
against realised exposure.

---

## How it works

The dashboard runs entirely in the browser — no backend, no
external data feeds. All market data (CDS spreads, interest rates,
FX rates) is pre-loaded and representative of real market conditions.

**Exposure modeling:** For each counterparty, the system estimates
how large the exposure could grow at each point in time using a
simulation-based approach. This produces the EE and PFE curves
that drive all downstream calculations.

**Credit risk pricing:** CVA is computed by combining the exposure
profile with each counterparty's credit quality (inferred from
their CDS spread) and a recovery rate that reflects the legal
framework governing their debt (EU bail-in rules vs US bankruptcy law).

**Stress testing:** Scenarios are applied as shocks to the
underlying market variables. The resulting change in CVA and
exposure is computed and compared against credit limits.

**Tail risk:** The portfolio's daily P&L distribution is estimated
three ways. The comparison reveals how much the normal-distribution
assumption understates tail risk for credit portfolios — a
consistent finding in the literature and in practice.

---

## Tech stack

- Vanilla JavaScript (ES2022)
- Chart.js 4.x for visualisation
- CSS Grid / Flexbox for layout
- Fully responsive — works on mobile and tablet
- No build step — single HTML file, deployable anywhere

---

## Purpose

This project was built to demonstrate practical CCR analytics
skills in a transparent, reviewable format. The methodology
behind every metric is documented in the Methodology tab,
including the assumptions made and where each model has known
limitations.

It is not production software. It is a demonstration of how
a CCR risk professional thinks about and communicates
counterparty credit risk.

---

## What I would add next

- Live market data integration (CDS spreads from a public API)
- Interactive trade input — enter your own portfolio and
  recompute all metrics in real time
- Monte Carlo simulation running in the browser (Web Worker)
- SA-CCR calculator: input any trade, get the EAD breakdown
- Export to PDF for use in risk committee presentations

---

## Author

Armand Alaglo
