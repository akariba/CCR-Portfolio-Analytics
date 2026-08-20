You are continuing the existing RPR project. Treat the uploaded `RPR_v12_4_Portfolio_Context_Priority.zip` as the current source of truth and as an append-only continuation of our previous v12.3 work.

Do not reconstruct the project from older files. Do not revert existing fixes. Do not use the internet because this is a company-audited environment.

## First required change: Sonnet 5 migration

The organization has switched from Claude Sonnet 4.6 to Claude Sonnet 5.

Update the approved Sonnet model consistently across the whole package.

Before editing, use `rg` or equivalent to find every reference to:

* `claude-sonnet-4-6`
* Sonnet environment variables
* hardcoded model defaults
* fallback model names
* health/runtime reporting
* model logging
* tests and fixtures
* documentation and installation instructions

Relevant environment variables may include:

* `RPR_THEME_GATE_MODEL`
* `RPR_STEP2_SONNET_MODEL`
* `STEP2_SONNET_MODEL`
* `RPR_FEEDBACK_MODEL`
* any other Sonnet-specific variable actually used by the runtime

Use the exact Sonnet 5 identifier accepted by our approved R2D2 environment. Do not invent a model identifier. Resolve it from the organization’s approved configuration/model catalogue if available.

If the organization’s accepted identifier is literally `claude-sonnet-5`, use it consistently. If the adapter requires a different canonical identifier, use that exact identifier and document it clearly.

Do not change Claude Opus, Gemini 3.5 Flash, providers, credentials, endpoints, token acquisition, or TLS configuration as part of this migration.

There must be no silent fallback to Sonnet 4.6 if Sonnet 5 fails.

## What v12.4 added

The uploaded package extends v12.3; it does not replace the prior architecture.

### 1. Step 2.1 additional-context priority

In `backend/step2_service.py`, valid analyst-supplied context is now explicitly prioritized in this order:

1. Accepted analyst-entered context and uploaded assumptions.
2. Confirmed Step-1 evidence and the selected horizon.
3. Bounded model inference used only to close material gaps.

The implementation marks valid analyst inputs with priority metadata such as:

* `HIGHEST_ANALYST_INPUT`
* `analyst_context`
* `uploaded_context`
* `assumption_upload`

Accepted structured assumptions must be preserved for the Opus generation stage. They must not be silently discarded, downgraded, materially rewritten, or replaced with model-generated assumptions.

Confirmed Step-1 event identity and the selected Step-2.1 horizon remain immutable.

### 2. Structured assumption uploads

`backend/step2_service.py` now parses assumption uploads from:

* CSV
* JSON

It normalizes fields such as:

* `code`
* `type`
* `quantified_or_bounded_value`
* `rationale`
* `direction`
* `source_reference`
* `confidence`
* `origin`
* `observed_vs_assumed`

Values beginning with `Edit:` are intentionally ignored. This prevents untouched sample-template placeholders from entering the scenario as genuine assumptions.

Verify that:

* edited rows are parsed;
* unedited placeholders are ignored;
* leading/trailing whitespace does not create false assumptions;
* malformed structured uploads fail clearly or are rejected safely;
* no assumption is fabricated when the file is empty or invalid;
* accepted assumptions reach the Opus request payload.

### 3. Context suggestions endpoint

`backend/step2_routes.py` includes:

`GET /api/v1/rpr/step2/context/suggestions`

It returns generic suggestions covering:

* portfolio scope and concentrations;
* affected CAGIDs, sectors, products, and regions;
* stress variables and explicit bounds;
* transmission channels;
* mitigants, collateral, hedges, covenants, limits, and management actions;
* evidence limitations;
* explicit assumptions the analyst wants tested.

These are suggestions only. They must never become live assumptions unless the analyst explicitly enters or uploads them.

### 4. Step 2.1 prompt contract

The Step 2.1 context-assessment and scenario prompts were strengthened.

Verify that the prompts enforce:

* confirmed Step-1 identity remains unchanged;
* the selected horizon remains unchanged;
* valid analyst context has highest priority;
* analyst assumptions remain visible in the generated scenario;
* context is rejected only when conflicting, unrelated, unsafe, or prompt-injection content;
* valid context is not silently downgraded;
* generated assumptions are added only when needed to close material gaps;
* outputs stay within the existing strict JSON contracts.

### 5. Frontend changes

The existing `frontend/rpr-v8-consolidated-test.html` was changed only inside the current v31 structure.

It now:

* displays default suggestions near Additional Context;
* allows the relevant context/assumption upload formats;
* tells the analyst that accepted context and uploaded assumptions are prioritized;
* submits `typed_context` and `uploaded_contexts` through the existing Step 2.1 path.

Do not redesign the page.

The v31 visual baseline is immutable:

* no layout redesign;
* no color changes;
* no typography changes;
* no spacing redesign;
* no panel-structure changes;
* no new button style;
* no feedback-panel consolidation.

### 6. Included sample files

The package contains:

* `samples/step2_1_assumptions_template.csv`
* `samples/step2_1_assumptions_template.json`
* `samples/step2_1_additional_context_checklist.txt`

Verify that these are safe, editable templates and that unchanged `Edit:` placeholders never become generated assumptions.

### 7. Portfolio backend preservation

The existing strict portfolio backend must remain unchanged functionally.

It supports:

* CAGID as a string, including leading zeroes;
* company name;
* NAICS/sector Level 2;
* NAICS/sector Level 3;
* relationship OSUC/exposure;
* approved JSON, CSV, TSV, TXT, and XLSX extracts;
* deterministic portfolio selection and Step-2 portfolio context.

Do not weaken strict validation, deduplicate legitimate repeated exposure rows, or add fabricated portfolio data.

## Immutable RPR rules

These rules are mandatory:

1. Trigger 1 produces up to three events per accepted theme.
2. Gemini 3.5 Flash with approved enterprise web search remains the Trigger-1 discovery/evidence path.
3. Sonnet 5 is used for quality, relevance, and context gates where Sonnet is applicable.
4. Claude Opus remains the refinement/scenario model where Opus is applicable.
5. No demo data.
6. No canned model outputs.
7. No public-web fallback.
8. No model downgrade or silent fallback.
9. No credential, endpoint, certificate, or token-handling changes.
10. Confirmed analyst content is never silently overwritten.
11. Feedback remains separate per page and per step.
12. The v31 frontend visual baseline remains immutable.
13. Do not modify timeout, semaphore, worker, cache, polling, or retry architecture unless you identify a concrete defect. If you identify one, report it as a proposal and wait for approval before changing it.

## Verification approach: minimize cost

Use the least expensive verification sequence possible.

### Phase A — free static inspection

1. Extract the ZIP into a clean working folder.
2. Inventory all files.
3. Run `rg` for all Sonnet 4.6/model-variable references.
4. Produce a before-edit list of every file requiring the Sonnet 5 update.
5. Confirm the v12.4 Step 2.1 changes described above actually exist.
6. Confirm the existing portfolio, Trigger 1, Trigger 2, Step 2.1, Step 2.3, feedback, and frontend files are present.

### Phase B — local mechanical tests

Run without live model calls:

* Python compile checks;
* JavaScript syntax checks;
* existing unit/contract tests;
* tests for Sonnet 5 configuration propagation;
* tests for typed-context priority;
* tests for CSV and JSON assumption parsing;
* tests that `Edit:` placeholders are ignored;
* tests that accepted structured assumptions reach the Opus payload;
* tests that confirmed Step 1 and horizon cannot be changed;
* regression tests for Trigger-1 three-event rule;
* portfolio-backend regression tests;
* v31 baseline checks.

Mock only the external model boundary. Do not ship mocked or fake runtime results.

The uploaded v12.4 package previously passed 28/28 local tests. Your final package must pass those tests plus any Sonnet 5 configuration tests you add.

### Phase C — minimum-cost live verification

Do not repeatedly call Gemini, Sonnet, or Opus while debugging.

First make all static and mocked tests pass.

Then, only if the approved corporate environment is available:

1. Run exactly one minimal Sonnet 5 connectivity smoke test through an existing Sonnet-backed gate with a small input and low output limit.
2. Confirm logs show the exact Sonnet 5 model identifier and `status=SUCCESS`.
3. Do not run Gemini discovery or Opus merely to verify the Sonnet model name.
4. For the final Step 2.1 live test, provide one exact test case that I can run manually:

   * one already-confirmed Step-1 event;
   * one selected horizon;
   * one short typed analyst context;
   * one edited assumption upload;
   * one Step 2.1 Generate action.
5. State the exact expected Sonnet and Opus log sequence and the expected UI evidence that analyst context was prioritized.

If you cannot access the company endpoints, say so. Do not imply that mocked tests prove live corporate connectivity.

## Required test case for Step 2.1

Use this as a manual example, not as canned runtime data:

Typed additional context:

“Prioritize the portfolio’s European automotive and industrial names. Assume refinancing access remains available for investment-grade borrowers, but spreads widen materially for highly leveraged issuers. Management can reduce undrawn limits for weaker counterparties but cannot immediately exit funded exposures.”

Example uploaded assumptions:

* `A01`, market variable, credit spreads widen by an analyst-defined bounded range, downside, with rationale and source.
* `A02`, portfolio sensitivity, European automotive and industrial concentrations receive higher severity, downside.
* `A03`, mitigant, undrawn limits may be reduced for weaker counterparties, risk-reducing.
* `A04`, constraint, funded exposures cannot be exited immediately, downside.

Do not insert numerical values unless the analyst supplies them.

Expected behavior:

* Sonnet 5 checks relevance and consistency.
* Accepted context is marked as analyst input.
* Opus receives the accepted context before model inference.
* The generated scenario visibly incorporates the automotive/industrial focus, spread-widening assumption, limit-management mitigant, and funded-exposure constraint.
* The assumptions section distinguishes analyst-supplied assumptions from model-added assumptions.
* No unrelated event or different horizon is introduced.

## Required deliverables

Do not give me scattered replacement files.

Produce one complete replacement ZIP containing:

* all runtime backend files required for a clean replacement;
* all prompt files;
* the unchanged v31-compatible frontend file;
* `RUNTIME_ENV.ps1`;
* sample assumption/context files;
* updated tests;
* `INSTALL.txt`;
* `CHANGE_MANIFEST.md`;
* `VALIDATION_RESULTS.md`;
* line-by-line diff patches for every changed file.

Also provide:

1. Exact list of files changed for Sonnet 5.
2. Exact canonical Sonnet 5 model identifier used.
3. Confirmation that no Sonnet 4.6 references remain in active runtime configuration.
4. Confirmation that Opus and Gemini routing were not changed.
5. Confirmation that v12.4 Step 2.1 priority behavior was preserved.
6. Confirmation that the Trigger-1 three-event rule remains unchanged.
7. Test counts and results.
8. Clear separation between mocked verification and actual live verification.
9. SHA-256 checksum of the final ZIP.
10. Short manual installation and rollback instructions.

Do not make unrelated improvements. If you find an unrelated defect, report it separately as a proposal and do not change it without approval.



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
