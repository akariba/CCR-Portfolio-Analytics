Use these exact simple test inputs in the Stylus preset:

CompanyContextJSON
{"company_name":"Apple Inc.","ticker":"AAPL","cik":"0000320193","cagid":null,"current_rrr":null,"current_class":null}
ScenarioContextJSON
{"scenario_name":"US Trade Policy & Tariffs","assessment_horizon":"12+ months","scenario_narrative":"Assess Apple under continuing US trade-policy uncertainty, tariffs, supply-chain pressure and regulatory risk."}
EventDrivenFactorsJSON
[{"factor_id":"ED-1","factor_name":"Leadership transition","source_step":"2.3","weight":0.3,"score":-1},{"factor_id":"ED-2","factor_name":"Regulatory scrutiny of Services","source_step":"2.3","weight":0.4,"score":-1}]
SectorInherentFactorsJSON
[{"factor_id":"SI-1","factor_name":"Regulatory scrutiny of Services","source_step":"2.4","weight":0.2,"score":-1}]
AssessmentASOFDATE
2026-09-02




## MANDATORY FINAL SCORING CONTRACT

EXECUTION MODE — NO MORE BROAD INVESTIGATION.

GOAL:
Get the smallest REAL Step 2.5 end-to-end result working in the RPR application first.
Once that works, we will expand it incrementally.

STRICT RULES

1. DO NOT modify or interact with the Stylus preset.
   - VS Code/Claude has no ability or authority to modify the preset.
   - Do not suggest preset changes.
   - Do not recreate the preset.
   - Do not troubleshoot the preset configuration.

2. DO NOT modify:
   - preset prompt
   - preset output schema
   - preset knowledge files
   - preset integrations
   - preset input-field definitions

Only the user manages those manually in Stylus.

3. Preserve all accepted working building blocks:
   - current six-input Step 2.5 contract
   - CompanyContext
   - ScenarioContext
   - EventDrivenFactors
   - SectorInherentFactors
   - AssessmentAS
   - UserFeedback
   - existing company identity resolution
   - existing Step 2.1–2.4
   - existing SEC + Web Runner path
   - existing evidence handling
   - existing auth/token handling
   - v31 UI baseline

4. NO refactor.
5. NO redesign.
6. NO architecture work.
7. NO broad repository investigation.
8. NO long diagnostic report.
9. NO repeated test loops.
10. Do not change working code unless required for this exact execution.

==================================================
TARGET FOR THIS PASS
==================================================

We do NOT need the complete final Step 2.5 implementation yet.

Get ONE company through Step 2.5 and display the smallest useful REAL result.

Use Apple / the already-established real Step 2.2 test company.

Minimum output required for first success:

- company
- assessment status
- ED score if returned
- SI score if returned
- composite score if returned
- residual risk rating if returned
- credit impact rating if returned
- one short assessment/headline if returned

Do NOT block first success because secondary fields are missing.

Do NOT require:
- every evidence detail
- every commentary field
- full expandable panels
- full final table enrichment
- complete citation rendering
- all analyst-question fields
- perfect final UI

Those come AFTER the first working result.

==================================================
EXECUTION
==================================================

1. Use the CURRENT code and CURRENT preset contract exactly as they exist.

2. Use a fresh valid Runner bearer token through the already-working token-fetch path.

3. Restart backend only if needed to ensure the fresh token is loaded.

4. Submit the existing real Step 2.5 context.

5. Execute ONE real Step 2.5 run.

6. Let the Runner call complete normally.
   Do not terminate it merely because SEC/Web activity pauses for several minutes.

7. When a final model response is received:
   - parse it
   - persist it using the existing assessment mechanism
   - extract whatever valid core Step 2.5 fields are actually present
   - return HTTP 200
   - render the minimal result in the existing Step 2.5 UI

==================================================
IMPORTANT: MINIMAL PARSING
==================================================

Do not make the entire assessment fail because one optional field is absent.

For this first working increment:

If a valid final assessment contains some but not all of:

ed_score
si_score
composite_score
residual_rating
credit_impact_rating
headline

render the fields that exist.

Missing optional output should display:

Not available

It must NOT prevent the real assessment from appearing.

However:
- never invent a score
- never calculate a missing model result with an ad-hoc formula
- never substitute placeholder data
- never reuse another company's result

==================================================
UI
==================================================

Use the existing v31 Step 2.5 structure.

DO NOT redesign it.

For the first success, populate only the existing appropriate cells/area with the real returned values.

Keep everything else unchanged.

==================================================
STOP CONDITION
==================================================

Do ONE real execution.

If successful, STOP and report only:

STEP25_RUN = PASS
COMPANY =
RUNNER_AUTH =
SEC =
WEB =
MODEL_OUTPUT =
JSON_PARSED =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =
UI_RENDERED =
FILES_CHANGED =

Then stop. Do not continue improving anything.

If execution genuinely fails, STOP at the FIRST concrete blocker and report only:

STEP25_RUN = FAIL
FIRST_BLOCKER =
EXACT_ERROR =
LAST_SUCCESSFUL_STAGE =
MINIMUM_CODE_CHANGE_REQUIRED =

Do not launch another investigation automatically.

==================================================
PRIORITY
==================================================

WORKING SMALL RESULT FIRST.

Then we build:
small working Step 2.5
→ correct scoring
→ factor detail
→ evidence
→ complete v31 rendering
→ final acceptance.

Do not try to finish all of Step 2.5 in this pass.
