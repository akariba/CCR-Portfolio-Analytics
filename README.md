FINAL IMPLEMENTATION PASS — STEP 2.5 PURPOSE, DATA QUALITY, V31 PARITY, AND LIVE UI COMPLETION

This is the final implementation pass. Implement the remaining corrections rather than producing another audit or readiness report.

CURRENT VERIFIED STATE

The hybrid backend pipeline has completed a genuine live run:

* Live web evidence through rpr_search_agent.run_web_search()
* Real SEC EDGAR URLs and accession numbers
* Live H2M/R2D2 assessment
* Schema-valid Step25Assessment
* Valid evidence IDs
* Persistence and HTTP retrieval

However, the complete product flow has not succeeded in the active UI:

* step23.html still blocks Run Assessment using production approval fields.
* The successful backend run used Salesforce/CRM with a manual PoC ID, while the UI displays Academy Securities.
* Loading a run_id does not visibly restore the matching company and assessment.
* “Processing…” can remain visible without an active request.
* Production blockers appear as red errors in local PoC mode.
* Step 2.4 and Step 2.5 do not visually or behaviorally match the v31 baseline.
* Step 2.5 currently looks like a readiness/configuration screen rather than the intended portfolio assessment outcome.

Do not call the work complete until the active backend-served step23.html renders and restores a real hybrid result.

1. AUTHORITATIVE FRONTEND AND V31 BASELINE

The only active application frontend is the backend-served:

/ui-design/step23.html

Locate the exact v31 file using repository search. It is expected to be similar to:

UI Design/icm-pm-rapid-portfolio-review-v31.html

Treat v31 as a read-only visual and interaction specification.

Do not:

* Modify v31.
* Serve v31 as the active application.
* Copy its fixture/demo data.
* Copy hardcoded companies, scores or narratives.
* Reconnect its obsolete runtime code.
* Replace working Steps 1–2.4 backend integration.

Reuse from v31:

* Page structure
* Section ordering
* Table layout
* Column ordering
* Density and spacing
* Typography
* Colors and score badges
* Sticky headers
* Filters
* Expandable portfolio rows
* Factor-detail panels
* Analyst override controls
* Commentary fields
* Export/confirmation control placement
* Empty, loading, success and error presentation

All displayed data must come from the current backend and confirmed workflow state.

2. SYSTEMATIC V31 PARITY FOR ALL STEPS

Compare the v31 DOM, CSS and interactions against the active step23.html for:

* Step 2.1
* Step 2.2
* Step 2.3
* Step 2.4
* Step 2.5

Implement visual parity without damaging accepted behavior.

Do not redesign based on personal preference. Use v31 as the baseline.

Create a concise internal parity checklist, then implement it. Do not stop after producing the checklist.

3. STEP 2.4 — RESTORE V31 TABLE AND FACTOR LAYOUT

Step 2.4 must match the v31 layout closely.

Use the actual v31 source to reproduce:

* Compact sector header and selector
* Sector factor count badge
* Sector-Inherent Risk Factors heading
* Compact factor-summary table
* Exact column ordering
* RF identifiers
* Factor names
* Importance
* Importance score
* Weight
* Score/color treatment
* Expandable factor rows/cards
* Factor narrative placement
* Vulnerability metric table
* Buffer metric table
* Formula labels
* Threshold bands
* Critical-threshold callouts
* Net-score explanation
* Feedback and confirmation placement

Preserve current real Step 2.4 taxonomy, factor values, weights, formulas and backend state. Use v31 for presentation and interaction only.

Do not copy v31’s software-sector or broker/dealer example values into another company or sector.

Check the exact scoring and rounding implementation in v31 and the current accepted backend. Do not infer or silently change formulas. If they differ, preserve the authoritative current business rule and document the visual-only difference.

4. STEP 2.5 — CORRECT BUSINESS PURPOSE

Step 2.5 is the final name-level assessment consolidation step.

Its purpose is to combine:

* Confirmed Step 2.2 portfolio/company identity
* Step 2.3 event-driven risk factors
* Step 2.4 sector-inherent risk factors
* Current SEC/public evidence
* Existing portfolio and exposure data
* Existing current RRR and classification data when available

It must produce an evidence-based, non-binding recommendation for analyst review.

It is not:

* A generic company summary
* A production-readiness page
* A configuration screen
* A replacement for deterministic scoring
* A mechanism for silently changing RRR or classification
* A place to fabricate missing financial information

5. STEP 2.5 DETERMINISTIC VERSUS MODEL RESPONSIBILITIES

The application/backend owns deterministically:

* Company identity
* CAGID/internal company ID
* Ticker
* Country of risk
* Industry hierarchy
* Exposure values
* Step 2.3 scores and weights
* Step 2.4 scores and weights
* ED score
* SI score
* Composite-score formula
* Current RRR
* Current classification
* Confirmed workflow state

The LLM may:

* Map current evidence to confirmed risk factors
* Identify supporting and disconfirming evidence
* Explain material changes
* Identify the key risk driver
* Assess evidence sufficiency
* Recommend maintain/review/upgrade/downgrade
* Recommend classification review
* Suggest a credit-impact level
* Explain limitations and analyst questions

The LLM must not:

* Recalculate or overwrite deterministic ED/SI scores
* Change exposures
* Change current RRR
* Change current classification
* Invent a filing, CIK, accession number, URL or financial metric
* Treat missing evidence as proof of low risk
* Present a recommendation as an approved decision

6. STEP 2.5 V31 PORTFOLIO TABLE

Reproduce the v31 Step 2.5 portfolio-summary table in the active frontend.

Use the exact v31 DOM/CSS as the visual reference and preserve its column order. The expected information includes:

* Company Name
* CAGID
* Ticker / ID
* Relevant Country of Risk
* Limit Industry L1
* Limit Industry L2
* Limit Industry L3
* Total OSUC
* OSUC-P
* OSUC-PWL
* OSUC-SM
* OSUC-SS
* OSUC-D/L
* ED Score (80%)
* SI Score (20%)
* Composite Score
* Residual Rating
* Credit Impact Rating
* Current RRR
* Recommended RRR Action
* Current Class
* Recommended Class Action
* Key Risk Driver
* Impact Rating Override
* User Credit Commentary

Confirm the exact names and ordering from the v31 source rather than relying only on this list.

Required table behavior:

* Sticky column headers
* Filter input beneath each applicable header
* Horizontal scrolling
* Compact row density
* Sort behavior matching v31
* Score badges and colors matching v31
* Expand/collapse control on every company row
* Editable analyst override selector
* Editable commentary field
* Export control
* Confirm Assessment control
* Responsive behavior without destroying table readability

If a backend field is genuinely unavailable, display an em dash or “Not available.” Never generate a plausible-looking value.

7. EXPANDED COMPANY ROW

Match the v31 expanded-row layout.

The expanded content must include:

* Event-Driven Factors panel
* Sector-Inherent Factors panel
* Factor ID
* Factor name
* Weight
* Deterministic score
* Assessment direction
* Evidence IDs
* Confidence
* Overall risk/credit narrative
* Supporting evidence
* Disconfirming evidence
* Evidence gaps
* Analyst questions
* Factor Assessment Commentary

The ED and SI factor panels should appear side by side where screen width permits, as in v31.

Every model statement must link back to collected evidence IDs. Evidence links must open the real source URL.

8. SCORE AND RECOMMENDATION QUALITY

Use the established deterministic ED/SI/composite formula. Do not let the model alter it.

The model’s recommendation must obey:

* If evidence is insufficient, return INSUFFICIENT_EVIDENCE and recommend no automatic change.
* A downgrade/upgrade recommendation requires specific evidence and a clear connection to one or more confirmed factors.
* Supporting and disconfirming evidence must both be considered.
* Conflicting sources must be disclosed.
* Stale evidence must be identified.
* Confidence must reflect evidence completeness and source quality.
* “No negative news found” is not sufficient proof of stability.
* Current RRR and current class remain unchanged until an analyst confirms an action.

“Impact Rating Override” belongs to the analyst. The model may provide a suggested credit-impact rating, but the UI override remains explicitly editable and must be persisted separately.

9. EVIDENCE QUALITY REQUIREMENTS

For each assessed public company, attempt to collect:

SEC lane:

* Exact legal company name
* Ticker
* Ten-digit CIK
* Latest available 10-K
* Latest available 10-Q
* Relevant recent 8-K filings
* Filing type
* Filing date
* Accession number
* Exact sec.gov URL
* Specific supported fact

Web lane:

* Company investor-relations sources
* Official regulatory sources
* Recognized rating-agency material when accessible
* Credible, recent financial/business reporting
* Source title
* Publisher
* Publication date
* Exact URL
* Specific supported fact

Quality controls:

* Prefer primary sources.
* Deduplicate repeated URLs and repeated claims.
* Reject malformed or invented URLs.
* Do not treat a search-summary paragraph as an independent source.
* Do not use model memory as evidence.
* Record retrieval timestamp.
* Respect the assessment as-of date.
* Mark missing evidence explicitly.
* Do not fabricate exact quotations.
* Preserve SEC and web provenance as separate lanes.

For a quality PoC, require at least:

* One verified official SEC filing source
* One additional credible public source
* Valid company identity/CIK
* Evidence-linked assessment output

Prefer more sources, but do not fail solely because an ideal source count is unavailable. Reduce confidence and report the gap.

10. COMPANY AND RUN-ID CONSISTENCY

The company shown in the UI must always match the company used by the backend run.

Current defect:

* The successful hybrid run belongs to Salesforce/CRM and company_id poc-crm-live-2.
* The UI currently displays Academy Securities.
* Loading the Salesforce run_id does not reliably hydrate the Salesforce company/result.

Fix this.

Rules:

* When starting from the UI, POST the exact selected confirmed company ID and identity.
* When restoring by run_id, retrieve the persisted manifest first.
* Set or display the company from the manifest.
* Do not silently attach a run to a different selected company.
* If the run’s company is no longer in the current portfolio, display it as a read-only restored PoC company with an explanatory label.
* Never show Salesforce evidence beneath Academy Securities or another company.
* Reject a genuine identity mismatch rather than silently continuing.

Prefer a real company record from the confirmed Step 2.2 portfolio. Do not use demo_data.py to select the company.

11. LOCAL HYBRID READINESS

The backend hybrid pipeline already works without Runner Service.

Configure local PoC mode around the services it actually uses:

RUNNING_LOCALLY=true
RPR_POC_MODE=true
RPR_STEP25_ASSESSMENT_ENGINE=hybrid

In this mode:

* Do not call Runner Service.
* Do not require Runner Service token/client ID.
* Do not require Fiddler.
* Do not require SEC-egress approval.
* Do not require RPR_STEP25_WEB_MODE=approved.
* Do not require production activation.
* Do not require production documentation fields.
* Do not fabricate approval values.

The authoritative local readiness condition should require:

* Backend reachable
* Live web-search adapter callable
* H2M/R2D2 gateway callable
* Real company identity available
* Persistence available

Keep production fail-closed logic unchanged outside local PoC mode.

12. FIX ACTIVE UI GATING

The active UI currently displays:

* “Blocked: local live-data activation incomplete.”
* STEP25_WEB_PROVIDER_NOT_READY
* Production activation blockers
* HTTP 409
* Disabled/blocked Run Assessment

That is incorrect for the verified local hybrid engine.

Fix preflight, router and frontend gating so that:

* local_live_ready=true enables Run Assessment.
* The frontend uses local_live_ready in local PoC mode.
* It does not use production_ready as the local button gate.
* Hybrid readiness does not inspect Runner Service configuration.
* Hybrid readiness does not require approved web mode.
* Production blockers remain available as separate deployment information.
* In local PoC mode they are collapsed and labeled “Production deployment configuration — not required for local PoC.”
* They are not shown as the active red run failure.

Do not solve this by setting fake production approval values.

13. LOADING, ERROR AND SUCCESS STATES

Fix the persistent “Processing…” indicator.

Required behavior:

* Hidden when idle.
* Visible only while a real request is running.
* Show meaningful phases:

  * Resolving company
  * Collecting SEC evidence
  * Collecting web evidence
  * Building assessment
  * Validating citations
  * Persisting result
* Cleared on success.
* Cleared on failure.
* Cleared when changing tabs.
* Cleared after restoring a completed run.
* Prevent duplicate Run Assessment clicks while active.

Errors must show:

* Stage
* Error code
* Clear message
* Retry appropriateness
* Backend URL
* HTTP status

A production-readiness warning must not masquerade as a local execution error.

14. RESTORE AND REFRESH

When step23.html loads with run_id:

1. Call GET /api/v1/rpr/step25/run/{run_id}.
2. Verify phase and company identity.
3. Hydrate the matching company context.
4. Navigate to Step 2.5.
5. Render the portfolio table.
6. Expand or highlight the restored company.
7. Render its evidence and assessment.
8. Restore analyst override/commentary.
9. Clear the Processing state.

Refresh must restore the same result without starting another model call.

15. PORTFOLIO-SCALE POC BEHAVIOR

The v31 table is a portfolio summary, but quality is more important than pretending all companies were assessed.

For the PoC:

* Populate the table with real confirmed Step 2.2 portfolio companies.
* Display authoritative existing portfolio/exposure/upstream values.
* Mark companies without a completed Step 2.5 run as “Not assessed.”
* Run the real hybrid pipeline for the selected company.
* Update only the matching company row.
* Do not fabricate Step 2.5 outcomes for the remaining portfolio.
* Design the table so future batch execution can populate additional rows.

Do not automatically execute live searches/model calls for all 388 companies during this final verification.

16. ASSESSMENT-TYPE BEHAVIOR

Match the v31 assessment cards:

* SEC + Web
* CAM + Web
* CAM + SEC + Web

For this PoC:

* SEC + Web is the verified executable path.
* CAM-containing modes must run only if genuine CAM data is available.
* Otherwise show them as unavailable with a precise explanation.
* Never substitute SEC/web evidence for missing CAM data while labeling it CAM.
* Keep all provenance lanes independent.

17. REFERENCE FOLDER AND CODE HYGIENE

The pe-sponsor-search folder is read-only reference material.

Do not depend on it at runtime.

Do not modify:

* pe-sponsor-search/app 1.py
* pe-sponsor-search/pe_sponsor_preset.yaml
* pe-sponsor-search/requirements.txt

If this agent modified those files during prior passes, restore only the agent-created changes when the original state can be determined safely. Do not guess or overwrite user work.

Keep direct_runner as optional, non-default code. It must not affect hybrid readiness or execution.

Do not retain temporary tokens, diagnostic scripts or secret-bearing files.

18. VERIFICATION

Perform verification in this order:

1. Static comparison of v31 and active DOM/CSS for Steps 2.1–2.5.
2. Step 2.4 layout verification.
3. Local hybrid preflight returns local_live_ready=true.
4. Open backend-served step23.html.
5. Select a real confirmed company.
6. Navigate to Step 2.5.
7. Confirm Run Assessment is enabled.
8. Execute one genuine SEC + Web hybrid assessment.
9. Confirm displayed company equals run manifest company.
10. Confirm real SEC and web sources render.
11. Confirm ED/SI/composite scores match authoritative upstream values.
12. Confirm recommendation cites valid evidence IDs.
13. Confirm analyst override and commentary can be edited and persisted.
14. Refresh the browser.
15. Confirm the same result restores.
16. Confirm spinner clears.
17. Confirm no production blocker prevents the local run.
18. Run targeted tests.
19. Run the existing Step 2.5 regression suite.

Use browser automation or available browser inspection if possible. If visual browser inspection is unavailable, do not claim visual parity as proven. Complete DOM/CSS tests and provide the user with a short exact manual visual checklist.

19. ACCEPTANCE CRITERIA

Do not claim completion unless all are true:

* Active step23.html uses v31 as its visual baseline.
* Step 2.4 layout matches the v31 structure.
* Step 2.5 portfolio table matches the v31 structure.
* Local hybrid Run Assessment is not blocked by production fields.
* A real selected company completes through the UI route.
* UI company and run company match.
* Real SEC/web evidence is displayed.
* H2M assessment is displayed.
* Scores remain deterministic.
* Citations are valid.
* Recommendation is evidence-based and non-binding.
* Analyst override/commentary persist.
* Refresh restores the run.
* No stale Processing indicator remains.
* No demo/mock/fixture data appears in the live path.
* Production behavior remains fail-closed outside local PoC mode.

20. FINAL RESPONSE

Lead with exactly one verdict:

* COMPLETE_UI_POC_SUCCEEDED
* BACKEND_ONLY_SUCCESS
* IMPLEMENTATION_DEFECT_REMAINS
* EXTERNAL_SERVICE_FAILURE

Then report concisely:

* Files changed
* v31 parity completed by step
* Real company assessed
* CIK and evidence-source counts
* ED/SI/composite values and their authoritative source
* Model/provider actually used
* Recommendation and confidence
* Citation-validation result
* UI route result
* Persistence/refresh result
* Tests executed
* Any remaining gap

Do not call backend-only execution a complete UI PoC. Do not produce another historical implementation report before completing the fixes.
