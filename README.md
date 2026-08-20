Do not apply edits directly to `Rapid Portfolio Review - Copy`, its backup folders, or the original `RPR_v11_1_Trigger1` folder.

Create a completely separate output folder named:

`RPR_v11_2_Step21_Analyst_Context`

Source rules:

1. For every overlapping file, use `RPR_v11_1_Trigger1` as the source of truth.
2. Use `Rapid Portfolio Review - Copy` only to obtain current files missing from v11.1, including:

   * `backend/step2_routes.py`
   * `backend/step2_service.py`
   * `backend/step2_uploads.py`
   * `backend/llm_gateway.py`
   * required Step 2 prompts and direct dependencies
3. Copy required files into the new output folder and edit only those copies.
4. Do not merge or overwrite the live Copy repository.
5. Do not modify files inside `_rpr_backup_*`.
6. Use `RPR_v11_1_Trigger1/frontend/rpr-v8-consolidated-test.html` as the frontend baseline. You do not need to find an older frontend counterpart in the Copy repository.
7. Preserve all v11.1 Trigger 1 files and behavior. Do not redesign or reimplement Trigger 1.

The task remains Step 2.1 only. Do not implement Step 2.2 or change Trigger 1, Trigger 2, AI Assist, feedback separation, event limits, timeouts, or orchestration.

Your inspected dependency chain indicates that Step 2.1 may require changes to:

* `backend/step2_routes.py`
* `backend/step2_service.py`
* `backend/step2_uploads.py`
* relevant Step 2 prompt files
* `frontend/rpr-v8-consolidated-test.html`
* `RUNTIME_ENV.ps1`
* any active model-default file proven to contain Sonnet 4.6
* scoped tests and assumption templates

Do not automatically include or modify `demo_data.py`, `demo_routes.py`, `main.py`, `models.py`, Trigger 1 files, or unrelated services. First prove that a file participates in the active Step 2.1 runtime path.

For `llm_gateway.py`, inspect whether Step 2.1 can reach any demo-data or demo-client fallback. The final Step 2.1 path must remain strict company-API-backed and must not return demo or fabricated results. Do not broadly redesign unrelated gateway behavior.

Sonnet 5 identifier:

The current repository only proves active Sonnet 4.6 defaults. The Claude chat UI showing “Sonnet 5” is not proof of the R2D2/API model identifier.

Use only these verification methods:

1. Search existing internal configuration, approved adapters, tests, and documentation in the active project.
2. If the existing approved internal adapter exposes a read-only model-list or model-metadata method, use it without public internet access.
3. Do not guess a value such as `claude-sonnet-5`, `claude-sonnet-5-4`, or any other identifier.
4. If the identifier still cannot be verified, continue implementing and testing the model-independent Step 2.1 changes, but do not modify Sonnet identifiers or finalize the release ZIP. Report the exact model-identifier blocker clearly.

Before editing, now provide the final scoped file-change list for `RPR_v11_2_Step21_Analyst_Context`. Then proceed with the authorized implementation in the separate output folder.

Final delivery must be one ZIP containing complete replacement files with preserved paths, plus:

* `INSTALL.txt`
* `CHANGE_MANIFEST.md`
* `VALIDATION_RESULTS.md`
* blank CSV template
* blank XLSX template
* example CSV template
* example XLSX template
* scoped backend and frontend tests

Clearly distinguish mocked tests from any real approved company-API smoke test.










I have now added the full active project to the workspace.

Use RPR_v11_1_Trigger1 as the source of truth for every file it contains. Use the full active project only to retrieve the missing current Step 2 files, llm_gateway.py, Step 2 prompts/services, and approved model configuration.

Do not replace newer v11.1 Trigger 1 files with older copies from the full project.

Now:

1. Inspect backend/step2_routes.py and all direct Step 2 dependencies.
2. Inspect backend/llm_gateway.py and the active configuration to identify the exact organization-approved Sonnet 5 identifier.
3. Search the full active project for all active Sonnet 4.6 references.
4. Report the exact files you will modify and why before editing.
5. Then proceed with the approved Step 2.1-only implementation.
6. Preserve all RPR v11.1 Trigger 1 behavior, AI Assist, Trigger 2, separate feedback panels, and the complete v31 visual baseline.
7. Do not implement Step 2.2 or modify Trigger 1.
8. Deliver complete replacement files and one final ZIP with INSTALL.txt, CHANGE_MANIFEST.md, VALIDATION_RESULTS.md, tests, and the blank/example assumption templates.

Do not use public internet, guess the Sonnet 5 identifier, fabricate results, or claim live verification unless a real approved company-API call succeeds.




Continue my RPR project using the attached ZIP as the current source of truth.

Another assistant already performed a read-only inspection of `RPR_v11_1_Trigger1.zip`. No code was changed and no new ZIP has been generated yet. Do not claim that Step 2.1 has already been implemented.

What the inspection established:

1. The package is primarily a Trigger 1 replacement package.
2. `backend/server.py` imports and registers `step2_router`.
3. The ZIP does not contain the active `backend/step2_routes.py`.
4. The ZIP does not contain `backend/llm_gateway.py`.
5. The frontend already contains:

   * an Additional Context textarea;
   * a generic context-upload area;
   * a call to `/api/v1/rpr/step2/context/extract`;
   * a Step 2.1 generation request containing `confirmed_step1`, `horizon`, `typed_context`, and `uploaded_contexts`.
6. The current implementation does not yet satisfy the required credit-analyst assumption-upload contract, row-level review/removal, conflict handling, or provenance labels.
7. Active Sonnet 4.6 references were found in:

   * `RUNTIME_ENV.ps1`

     * `STEP2_SONNET_MODEL`
     * `RPR_FEEDBACK_MODEL`
     * `RPR_THEME_GATE_MODEL`
   * `backend/theme_assistant_batch.py`

     * the fallback value for `RPR_THEME_GATE_MODEL`
8. The attached files do not reveal the exact organization-approved Sonnet 5 identifier. Do not guess it.

What changed in the previous v11.1 version:

`RPR_v11_1_Trigger1.zip` addressed Trigger 1 release blockers, including:

* preserving the Bible-rule ceiling of up to three events per accepted theme;
* live-safe discovery, enrichment, and refinement timeouts;
* progressive per-theme and per-event processing;
* correct semaphore ownership after timeout;
* keeping Scan/Re-scan disabled for the full active job;
* preserving confirmed analyst content when a later generated version arrives;
* explicit Review & Compare/Keep Confirmed behavior;
* stage-aware retry controls;
* preventing fully failed jobs from being cached;
* preserving `client_theme_id`;
* local Event 1/2/3 numbering for each theme.

All those v11.1 behaviors must remain intact. The new work is not a Trigger 1 rewrite.

What the next ZIP must add:

Implement Step 2.1 analyst-controlled Additional Context and Assumption Upload only.

Business priority:

1. Confirmed Step 1 event and accepted analyst override decisions.
2. Analyst Additional Context.
3. Analyst-uploaded assumptions.
4. Selected scenario horizon.
5. Model-generated supporting assumptions.

Additional Context must be treated as a controlling scenario instruction. Preserve its intended meaning, incorporate it visibly, and reconcile it with the confirmed Step 1 event and horizon. Never silently ignore or replace it.

If analyst context conflicts with a confirmed fact:

* do not fabricate a reconciliation;
* return a visible validation warning;
* allow the analyst to edit the instruction or explicitly override the conflict.

Assumption upload requirements:

* Accept only `.csv` and `.xlsx`.
* Required column: `assumption`.
* Optional columns:

  * `time_horizon`
  * `analyst_notes`
* Each nonblank row represents one analyst-supplied assumption.
* Reject unsupported or malformed files clearly.
* Never silently drop rows.
* Parse and normalize all valid rows.
* Display them for analyst review before generation.
* Allow individual uploaded assumptions to be removed.
* Pass the remaining reviewed assumptions into Step 2.1 generation.
* Give uploaded assumptions the same priority as typed Additional Context.
* Do not insert sample assumptions automatically.

The final Step 2.1 response must preserve provenance. Every final assumption must be visibly labelled as either:

* `Analyst supplied`
* `Model generated`

Never represent an analyst-supplied assumption as a model discovery.

Templates required in the new ZIP:

Provide blank and example templates in both CSV and XLSX formats.

The blank template must contain only:

* `assumption`
* `time_horizon`
* `analyst_notes`

The example template should include:

* Federal Reserve policy rates increase by 50 basis points during the scenario horizon.
* Borrowing costs increase for leveraged borrowers.
* Refinancing spreads widen for lower-rated issuers.
* Credit demand weakens as funding costs rise.
* Debt-service coverage deteriorates for rate-sensitive borrowers.

Frontend expectations:

* Preserve the exact v31 design, layout, colours, typography, spacing, panels, and existing styling.
* Reuse the existing Step 2.1 visual vocabulary.
* Do not redesign the page.
* Retain the current Additional Context area.
* Convert or extend the existing generic upload control into the required “Upload Assumptions” control.
* Show parsed assumptions in a review list before generation.
* Allow removing each uploaded assumption.
* Show validation/conflict warnings visibly.
* Label final assumptions by provenance.
* Preserve separate feedback controls for every step.
* Do not modify unrelated pages.

Backend expectations:

* Trace the current Step 2.1 route before editing.
* Extend the existing request contract without breaking existing callers.
* Preserve and validate analyst inputs.
* Put analyst context and uploaded assumptions explicitly near the beginning of the model prompt—not as low-priority appended notes.
* Return structured provenance and structured validation warnings.
* Log counts and processing stages only.
* Never log confidential assumption contents, tokens, credentials, or certificates.
* Continue using the existing company-approved adapters and APIs.
* No public-web access, demo data, mocked runtime output, fallback data, model downgrade, or fabricated response.

Model routing:

* Gemini 3.5 Flash remains the enterprise evidence-search/retrieval model.
* Claude Sonnet remains responsible for assessment, quality-gate, and context processing where currently applicable.
* Claude Opus remains responsible for refinement/synthesis where currently applicable.
* Replace Sonnet 4.6 with the exact organization-approved Sonnet 5 identifier.
* Verify that identifier from the current company configuration or adapter convention.
* Do not guess.
* Do not change Gemini or Opus routing unless repairing a demonstrated integration defect.

Expected active replacement files:

* `backend/step2_routes.py`
* `frontend/rpr-v8-consolidated-test.html`
* `RUNTIME_ENV.ps1`
* `backend/theme_assistant_batch.py`

Additional files expected:

* blank assumption template in CSV;
* blank assumption template in XLSX;
* example assumption template in CSV;
* example assumption template in XLSX;
* scoped Step 2.1 backend tests;
* scoped frontend DOM/syntax tests;
* `INSTALL.txt`;
* `CHANGE_MANIFEST.md`;
* `VALIDATION_RESULTS.md`.

Do not change `backend/server.py` unless inspection proves a strictly necessary Step 2.1 integration change. Do not change Trigger 1 orchestration, limits, timeouts, prompts, AI Assist behavior, Trigger 2, Step 2.2, the CAGID/sector database, or Step 2.3 onward.

Known separate open issue:

Some successful Trigger 1 model responses may use a different schema and cause:

`Discovery response did not contain an events array.`

Record this in the validation documentation as an open issue. Do not modify Trigger 1 during this task.

Validation required:

1. Static search proving no active Sonnet 4.6 references remain.
2. Python compile/import checks.
3. Unit tests with mocked model responses for:

   * no analyst context;
   * typed Additional Context;
   * CSV upload;
   * XLSX upload;
   * typed context plus uploaded assumptions;
   * invalid file;
   * conflicting assumption;
   * provenance labels.
4. Frontend JavaScript syntax tests.
5. Frontend DOM tests for upload review, removal, warnings, and provenance.
6. One minimal live company-API smoke test only if the approved environment is already available.
7. Clearly distinguish mocked verification from live verification.

Before editing, report the exact files you intend to change and why.

If `backend/step2_routes.py`, `backend/llm_gateway.py`, or the configuration containing the approved Sonnet 5 identifier is missing, stop and request only those specific current files. Do not reconstruct them from older versions and do not guess.

Final delivery:

Produce one downloadable ZIP containing every complete modified or new file with its correct directory structure. Do not provide fragments or patch-only instructions.

The final response must clearly state:

* every changed file;
* what changed compared with `RPR_v11_1_Trigger1.zip`;
* what was tested;
* whether any live company-API test was actually performed;
* what still requires my workstation verification;
* exact backup, replacement, runtime-loading, restart, health-check, and rollback instructions.




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
