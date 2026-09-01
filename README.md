STEP 2.5 — FINAL BLOCKER ONLY

The previous acceptance report is NOT accepted as PASS.

Do not revisit completed work.

The sole remaining target is:

wire the confirmed Step 2.3 and Step 2.4 factor state correctly into the real Step 2.5 Stylus request, obtain non-empty factor assessments, and render the real ED/SI detail panels in the v31 UI.

Everything else that already passed is frozen.

CURRENT VERIFIED STATE

Keep these untouched:

Runner HTTP 200
Runner authentication/token mechanism
preset invocation
SEC Filing integration
Internet Search integration
SSE reconstruction
flat response handling
Step25 schema
Step 2.5 endpoint
v31 Step 2.5 DOM/CSS/table implementation
Steps 1–2.4 behavior
STEP25_POC_TEST_ONLY = false

Do NOT refactor them.

THE ACTUAL BLOCKER

Previous live run reported:

FACTOR_ASSESSMENTS_COUNT = 0

ED_FACTORS_RENDERED = N/A

SI_FACTORS_RENDERED = N/A

and identified:

FIRST_REMAINING_BLOCKER = factor_assessments wiring

You also found that the Stylus preset's CompanyContextJSON contract expects a composite structure containing more than the minimal company identity currently built by stylus_engine.py.

This blocker is IN SCOPE and must now be fixed.

1. TRACE THE CONTRACT EXACTLY

Before editing, trace the actual data contracts from:

confirmed Step 2.2 state
confirmed Step 2.3 state
confirmed Step 2.4 state
Step 2.5 request model
stylus_engine.py
saved/full Stylus preset capture
Step25 schema

Determine exactly what the preset currently receives under:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

Do not infer names or structures from memory.

Use the actual saved preset/capture and code.

2. FIX THE DATA WIRING

Build the Step 2.5 request from the actual confirmed upstream objects.

CompanyContextJSON must contain the complete company/context object required by the captured preset contract.

It must not remain merely:

{company_name, ticker, cik, ...}

if the real preset contract expects additional nested information.

EventDrivenFactorsJSON must contain the actual confirmed Step 2.3 factors for the selected company.

SectorInherentFactorsJSON must contain the actual confirmed Step 2.4 factors applicable to the selected company.

Preserve, where available:

factor ID
factor name
weight
score
rationale
evidence
source step

Do not regenerate these factors in Step 2.5.

Do not substitute generic factors.

Do not hardcode Apple factor data.

3. IMPORTANT — DETERMINE WHETHER DUPLICATION IS REQUIRED

The previous report suggests the Stylus prompt may expect the confirmed factors both:

inside the composite CompanyContextJSON, and
through the dedicated EventDriven/SectorInherent inputs.

Verify this against the actual captured preset.

If that is genuinely the contract, populate both consistently.

Do NOT “simplify” the preset contract during this task.

Our immediate target is compatibility with the working captured preset.

4. PRESERVE FACTOR IDENTITY

Step 2.5 must be able to relate its assessment back to the exact upstream factors.

Example:

ED-1 in Step 2.3 must remain identifiable as the same ED-1 in the Step 2.5 result.

Same for SI factors.

Do not silently replace IDs with newly generated IDs.

If canonical evidence IDs are generated separately, keep that evidence-ID behavior independent from factor IDs.

5. RUN ONE REAL LIVE TEST

Once the wiring is corrected, perform one real live Step 2.5 SEC + Web run.

Use the actual confirmed Step 2.2/2.3/2.4 state already available in the test workflow.

Required results:

RUNNER_HTTP_STATUS = 200

PRESET_EXECUTED = YES

SEC_TOOL_EXECUTED = YES

WEB_TOOL_EXECUTED = YES

JSON_PARSED = YES

STEP25_SCHEMA_VALID = YES

and most importantly:

FACTOR_ASSESSMENTS_COUNT > 0

If the selected company has both ED and SI factors:

ED_FACTOR_INPUT_COUNT > 0

SI_FACTOR_INPUT_COUNT > 0

ED_FACTOR_OUTPUT_COUNT > 0

SI_FACTOR_OUTPUT_COUNT > 0

Do not call the task PASS while factor_assessments remains empty.

6. THEN TEST THROUGH THE ACTUAL BROWSER

After the backend live test passes:

start/restart backend normally
open UI Design/step23.html
go to Step 2.5
select the eligible confirmed company
select SEC + Web
click the actual Run Assessment button
wait for the real Runner execution
verify the selected portfolio row updates
expand the company row

Confirm that the expanded area contains actual:

EVENT-DRIVEN FACTORS

and

SECTOR-INHERENT FACTORS

matching the v31 layout and the actual upstream factor values.

This must be verified from the rendered browser result, not only by inspecting JavaScript functions.

7. DO NOT CHANGE v31 DESIGN

The previous report says:

V31_DOM_PARITY = PASS

V31_TABLE_PARITY = PASS

V31_CSS_PARITY = PASS

V31_EXPAND_ROW_PARITY = PASS

Treat that frontend structure as frozen.

Only bind the newly working data into it.

No CSS redesign.

No table redesign.

No new widgets.

No alternate Step 2.5 layout.

8. NO SCOPE EXPANSION

Do not work on:

F2/F3 citation-quality improvements
accession-number improvements
generic web URL improvements
token refresh
auth
MarketDev
CAM
Step 3
scoring redesign
unrelated refactoring

unless one is empirically proven to block this exact factor-wiring acceptance test.

FINAL REPORT — STRICT

Report:

COMPANY_CONTEXT_CONTRACT_MATCH = PASS/FAIL

STEP23_INPUT_FOUND = YES/NO

STEP23_INPUT_FACTOR_COUNT =

STEP24_INPUT_FOUND = YES/NO

STEP24_INPUT_FACTOR_COUNT =

STEP23_FACTORS_SENT_TO_PRESET = YES/NO

STEP24_FACTORS_SENT_TO_PRESET = YES/NO

RUNNER_HTTP_STATUS =

SEC_TOOL_EXECUTED = YES/NO

WEB_TOOL_EXECUTED = YES/NO

STEP25_SCHEMA_VALID = YES/NO

FACTOR_ASSESSMENTS_COUNT =

ED_FACTOR_OUTPUT_COUNT =

SI_FACTOR_OUTPUT_COUNT =

UI_RUN_ASSESSMENT_CLICKED = YES/NO

UI_COMPANY_ROW_UPDATED = YES/NO

ED_FACTORS_RENDERED = YES/NO

SI_FACTORS_RENDERED = YES/NO

V31_VISUAL_STRUCTURE_PRESERVED = YES/NO

FILES_CHANGED =

FINAL_STATUS = PASS/BLOCKED

A final PASS is allowed only if:

the real Step 2.3 factors entered Step 2.5
the real Step 2.4 factors entered Step 2.5
the resulting Step25Assessment contains factor assessments
the actual browser Run Assessment workflow succeeds
the ED/SI panels visibly render the resulting/upstream factors in the v31 structure

Otherwise report FINAL_STATUS = BLOCKED.

Start from the identified factor-wiring blocker and finish it. Do not reopen completed layers.
