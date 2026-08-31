STOP AND REASSESS THE CURRENT RESULT AGAINST THE SCREENSHOTS AND V31.

The latest implementation is not complete. Do not report completion based on CSS being served, HTTP 200 responses, or the presence of a portfolio table.

The screenshots show several factual and state-machine defects that must now be corrected.

## 1. Test the correct page

The screenshots currently show:

file:///C:/Users/ak54743/Downloads/OneDrive_2026-07-16/Rapid%20Portfolio%20Review_AI/UI%20Design/step23.html

Final verification must instead use the live backend-served page:

http://127.0.0.1:8000/ui-design/step23.html

Use a cache-busting query string or hard refresh after restarting the backend. Do not verify the final result using the direct `file:///` page.

Confirm which HTML, CSS and JavaScript files the backend is actually serving.

## 2. The current Step 2.5 state is logically contradictory

The screenshots simultaneously show:

* Step 2.5 local run blocked.
* Run Assessment disabled.
* Production mode not activated.
* SEC/web readiness errors.
* All results `Not available` or `Not assessed`.
* Workflow Status showing “Name Level Assessment — Confirmed.”
* Confirm Assessment available.

This is invalid.

Implement an explicit Step 2.5 state machine:

1. NOT_STARTED
2. READY
3. RUNNING
4. COMPLETED_VALID
5. COMPLETED_INSUFFICIENT_EVIDENCE
6. FAILED
7. USER_CONFIRMED

Required behavior:

* “Name Level Assessment” cannot become Confirmed before a valid Step 2.5 result is persisted and the user presses Confirm Assessment.
* Confirm Assessment must be disabled before a valid assessment exists.
* Export must not present blank rows as completed assessments.
* Run Assessment must be enabled when the selected company is eligible and the local hybrid engine is ready.
* A technical blocker must result in FAILED or NOT_READY, never Confirmed.
* Switching tabs must not alter completion state incorrectly.
* Refreshing the page must restore the persisted state correctly.

## 3. Remove production blockers from the local PoC path

The current screen still shows:

* `STEP25_WEB_PROVIDER_NOT_READY`
* `RPR_STEP25_WEB_MODE must be 'approved'`
* SEC access-not-approved errors
* SEC egress approval errors
* missing SEC user-agent errors
* server production mode not activated
* “Blocked: local live-data activation incomplete”

This contradicts the local PoC requirement.

For explicit local PoC mode, use the already implemented hybrid pipeline:

* real SEC/public evidence retrieval;
* real enterprise web search;
* real model assessment;
* schema validation;
* persistence.

Do not require:

* Fiddler;
* Runner Service;
* production activation;
* production governance approval;
* production SEC-egress approval.

Keep production mode fail-closed, but make these checks non-applicable to the explicit local PoC engine.

The large readiness panel must not appear in the primary Step 2.5 workflow. Move technical information into a collapsed “Technical diagnostics” panel.

## 4. Correct assessment eligibility

The currently selected entity is:

“2ND ADMNT & RSTMT OF DEED OF TST OF E ROBERT FERNHOLZ”

The table also contains trusts, branches, head offices and entities without tickers.

Do not automatically send such an entity through `SEC + Web`.

Classify every portfolio company before enabling assessment:

* `SEC_WEB_ELIGIBLE`: verified public registrant with resolved legal name and CIK; ticker when applicable.
* `CAM_WEB_ELIGIBLE`: internal CAM data available, with sufficient identity for public research.
* `CAM_SEC_WEB_ELIGIBLE`: both internal CAM data and verified SEC identity available.
* `IDENTITY_REVIEW_REQUIRED`: ambiguous or incomplete identity.
* `NOT_ELIGIBLE_FOR_SELECTED_LANE`: required source is unavailable.

When `SEC + Web` is selected:

* Default to a verified public company.
* Require resolved company name and CIK.
* Do not select a trust/deed record merely because it is first alphabetically.
* Disable the run for ineligible entities with a short company-specific explanation.
* Do not show production-configuration errors when the actual problem is entity eligibility.

For the final live PoC, deliberately select a recognizable verified public company with matching:

* internal company ID;
* legal company name;
* ticker;
* CIK;
* country;
* Step 2.2 portfolio record.

## 5. Fix the primary Step 2.5 layout

The primary v31 hierarchy must be:

1. Step 2.5 heading/navigation.
2. Select Assessment Type.
3. Three assessment cards.
4. Run Assessment.
5. Assessment Outcome — Portfolio Summary.
6. Portfolio table.
7. Expanded company details.
8. Export and Confirm Assessment.
9. Feedback to Name-Level Assessment Agent.

Remove from the primary flow:

* “Step 2.5 — Local PoC Readiness”
* production-mode status;
* approval/egress messages;
* separate debug-style company-selection section;
* large red blocker banners.

Diagnostics can remain only in a collapsed secondary panel.

Change the table heading to the exact v31 wording:

“Assessment Outcome — Portfolio Summary”

Restore the v31 assessment-card descriptions rather than shortened replacement text such as “Public evidence assessment.”

## 6. Data-quality correction

A 361-row table filled with `Not available` is not a completed quality-data PoC.

Separate fields into three classes:

### Authoritative portfolio inputs

These must come from Step 2.2 or its portfolio source:

* company name;
* CAGID/internal ID;
* country;
* industry L1/L2/L3;
* Total OSUC;
* OSUC-P/PWL/SM/SS/D-L;
* current RRR;
* current classification.

The model must never invent these fields.

If they are absent, display a precise reason such as:

* `Not supplied by Step 2.2 portfolio source`
* `Exposure unavailable in input portfolio`
* `Current rating unavailable in input portfolio`

Do not use the generic `Not available` for every condition.

### Deterministic assessment inputs

These must come from Steps 2.3 and 2.4:

* ED factors and weights;
* ED score;
* SI factors and weights;
* SI score;
* composite score calculated by the existing deterministic formula.

The model must not create or overwrite them.

### Evidence/model outputs

These come only after the real Step 2.5 run:

* evidence records;
* factor/evidence mappings;
* overall narrative;
* key risk driver;
* suggested impact;
* recommended RRR action;
* recommended class action;
* confidence;
* evidence gaps.

Before a run, render these as `Not assessed`, not `Not available`.

## 7. Portfolio-scale PoC behavior

Do not attempt 361 live model assessments automatically.

For the PoC:

* Render the full confirmed portfolio.
* Allow filters and eligibility indicators.
* Run one selected eligible company at a time.
* Display progress such as `1 assessed / 361 portfolio companies`.
* Persist the completed company assessment.
* Update only the matching company row.
* Leave other companies as `Not assessed`.
* Never copy the assessed company’s result into another row.

The expanded row for the assessed company must show:

* Step 2.3 Event-Driven Factors;
* Step 2.4 Sector-Inherent Factors;
* verified evidence;
* exact URLs;
* SEC form/accession/filing date;
* supporting evidence;
* disconfirming evidence;
* key risk driver;
* evidence gaps;
* recommendation;
* confidence;
* analyst commentary.

## 8. Step 2.4 parity remains unverified

The latest Step 2.4 screenshots show a very large editable matrix with extensive vertical space.

Compare it directly with the Step 2.4 section inside immutable v31.

Preserve the current working Step 2.4 data and calculations, but match v31 for:

* collapsed versus expanded default state;
* factor-card organization;
* metric tables;
* spacing;
* row density;
* headers and color bands;
* score display;
* commentary placement;
* expand/collapse controls.

Do not claim Step 2.4 parity without a same-viewport screenshot comparison.

## 9. Required live acceptance test

Execute this exact scenario through the backend-served page:

1. Load `http://127.0.0.1:8000/ui-design/step23.html`.
2. Confirm or restore a real Step 2.2 portfolio.
3. Select one verified public company with ticker and CIK.
4. Confirm its Step 2.3 factors.
5. Confirm its Step 2.4 factors.
6. Select `SEC + Web`.
7. Click Run Assessment.
8. Verify the spinner passes through named phases and terminates.
9. Verify real evidence is returned.
10. Verify company name, ticker and CIK remain consistent.
11. Verify the assessment appears only in that company’s row.
12. Expand the row and inspect ED/SI factors, evidence and narrative.
13. Enter an override/comment.
14. Refresh the browser and verify persistence.
15. Click Confirm Assessment.
16. Verify the sidebar changes to Confirmed only now.
17. Verify Export contains the same assessed result.

## 10. Completion evidence

Return:

* backend-served URL used;
* public company name;
* ticker;
* CIK;
* internal company ID;
* run ID;
* assessment status;
* SEC evidence count;
* independent web-source count;
* persisted artifact path;
* screenshot of the completed Step 2.5 table;
* screenshot of the expanded assessed row;
* screenshot showing correct workflow status;
* tests executed and results;
* exact remaining v31 differences.

Do not use the verdict COMPLETE unless:

* Run Assessment is enabled and succeeds;
* a valid real assessment is visible;
* the correct company row is populated;
* evidence is attributable;
* persistence works;
* confirmation state is correct;
* primary Step 2.5 layout matches v31.

Based on the current screenshots, the honest status is:

PARTIAL — TABLE SHELL EXISTS, BUT LOCAL STEP 2.5 EXECUTION, STATE CONSISTENCY, DATA COMPLETENESS AND V31 PARITY ARE NOT VERIFIED.
