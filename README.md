FINAL STEP 2.5 IMPLEMENTATION — EXECUTE, DO NOT RE-DESIGN THE ARCHITECTURE

We are now finishing RPR Step 2.5.

This is no longer an isolated transport experiment.

The target is:

FULL RPR STEP 2.5 SEC + WEB WORKFLOW WORKING END-TO-END, WITH THE FRONTEND MATCHING v31 AS THE IMMUTABLE VISUAL BASELINE.

You are the implementation agent. Inspect the repository first, then implement and test. Do not keep asking me for intermediate decisions unless you hit a genuine external blocker that cannot be solved from the repository.

0. ESTABLISHED FACTS — DO NOT RE-INVESTIGATE

The following have already been empirically proven:

live Runner transport works
HTTP 200 from Runner works
preset execution works
SEC Filing tool executes
Internet Search / web tool has executed in the prior full preset test
streamed SSE reconstruction works
model JSON is parseable
Step25Assessment schema validation works
Step 2.5 backend endpoint can return HTTP 200
flat Stylus response handling was fixed
current frontend POC can populate Apple and enable Run Assessment

Therefore:

DO NOT modify or re-investigate

OAuth implementation
token-refresh implementation
H2M token implementation
Runner authentication
Runner SSE transport
preset ID discovery
SEC-tool transport
Steps 1 / 2.1 / 2.2 / 2.3 / 2.4 backend logic

unless an actual failing execution proves one of those is the first failing layer.

No speculative refactoring.

1. FIRST CHECK — FULL PRESET CONTRACT

The live Stylus preset was temporarily reduced to an SEC-only test configuration.

Before doing the final live validation, inspect the repository for the previously captured full Step 2.5 SEC + Web preset configuration.

Search especially the existing Stylus capture/config/documentation files and previously saved request artifacts.

The intended full preset contract previously contained at least:

CompanyContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
EvidenceWindowMonths

and used:

SEC Filings
Web Search / Internet Search
the Step25 schema / field-definition knowledge files previously configured

DO NOT invent the original full prompt.

Compare the captured original preset contract with the currently expected backend contract.

If the live Stylus preset must be manually restored by me, do not waste time trying to automate the Stylus UI.

Instead output one exact block headed:

MANUAL_PRESET_RESTORE_REQUIRED

containing:

preset name
shortcut
each input field display name
each exact input key
required/optional setting
prompt text
knowledge files
model
integrations

Then STOP only for that genuine manual action.

If the full preset already matches, continue automatically.

2. REMOVE THE TEST BYPASS FROM THE FINAL USER WORKFLOW

The current Apple POC was useful for proving the plumbing.

It is NOT the final Step 2.5 workflow.

Final Step 2.5 must obtain companies from the confirmed Step 2.2 portfolio.

Remove/hide from normal runtime:

Company (POC test — Apple Inc.)
hardcoded Apple population
POC-only eligibility
any debug Active page: step23.html... banner
any visible test/debug controls

If the POC helper is useful for regression testing, it may remain isolated behind a clearly disabled development flag, but:

STEP25_POC_TEST_ONLY = false

must be the normal state.

Never let the test fixture contaminate normal Step 2.5 state.

3. REAL RPR UPSTREAM CONTRACT

Step 2.5 is downstream of:

2.1 Scenario & Assumptions

→ 2.2 Portfolio Selection

→ 2.3 Event-Driven Risk Factors

→ 2.4 Sector-Inherent Risk Factors

→ 2.5 Name-Level Assessment

For each company selected from the confirmed Step 2.2 portfolio, Step 2.5 must use the confirmed upstream information.

Specifically construct the Stylus inputs from real state:

CompanyContextJSON

Populate using the Step 2.2 company record and available identity information.

Preserve available:

company name
CAGID / internal identifier
ticker
CIK if known
country of risk
L1
L2
L3
relevant exposure values
other existing company context

Do not fabricate missing fields.

EventDrivenFactorsJSON

Must come from the confirmed Step 2.3 result for that company.

Do NOT create generic substitute factors.

Preserve factor:

ID
name
weight
score
rationale / evidence already produced upstream

as available in the existing Step 2.3 contract.

SectorInherentFactorsJSON

Must come from the confirmed Step 2.4 result applicable to that company/sector.

Preserve the original confirmed factor IDs, weights and scores.

AssessmentASOFDATE

Use the Step 2.5 selected/current as-of date.

EvidenceWindowMonths

Use the existing RPR configured/default evidence window rather than inventing a new value.

4. ELIGIBILITY / WORKFLOW GATING

Restore real workflow semantics.

A company must NOT be assessed merely because it appears in Step 2.2.

For normal Step 2.5:

Step 2.2 company must exist and be confirmed
applicable Step 2.3 factors must be confirmed
applicable Step 2.4 factors must be confirmed

If anything required is missing, show the appropriate v31-style status instead of silently inventing data.

Do not use the POC bypass for the final acceptance test.

5. ONE COMPANY AT A TIME

Preserve the intended v31 Step 2.5 operating model.

The portfolio table contains the portfolio.

The analyst selects one eligible company.

Run Assessment runs Step 2.5 for that selected company.

When the response returns, update only that company's Step 2.5 assessment state.

Do not rerun every portfolio company automatically.

Other companies remain unassessed until selected and run.

6. SEC + WEB MUST BE REAL

For the SEC + Web assessment type:

invoke the real configured Step 2.5 Stylus preset
use SEC Filing integration
use Web/Internet Search integration
use the real Step 2.3 and Step 2.4 inputs
use the real company context
receive and parse the real model response
validate it against the Step25 schema
persist the run using the existing Step 2.5 mechanism

No mocked assessment.

No frontend-generated assessment.

No hardcoded risk result.

No hardcoded Apple result.

No fallback pretending a model result succeeded.

If the real assessment fails, expose the actual failure.

7. DO NOT FAKE CAM

Keep the v31 assessment-type UI:

SEC + Web
CAM + Web
CAM + SEC + Web

But do not fabricate CAM integration if the real CAM backend/data lane is not implemented yet.

This implementation's required executable lane is SEC + Web.

Preserve the other v31 options visually and preserve their existing behavior/state.

Do not claim them as operational unless they really are.

8. v31 IS THE IMMUTABLE STEP 2.5 VISUAL BASELINE

This is a STRICT requirement.

Locate:

UI Design/icm-pm-rapid-portfolio-review-v31.html

and current:

UI Design/step23.html

Do a direct forensic comparison of the Step 2.5 sections.

DO NOT design a new Step 2.5.

Reuse/transplant the v31 Step 2.5 DOM structure, CSS classes, spacing, dimensions, table treatment and controls as closely as technically possible.

The current application logic should be bound INTO the v31 structure.

The v31 structure must not be recreated approximately from memory.

Inspect the actual source.

9. REQUIRED v31 STEP 2.5 STRUCTURE

Verify visually and structurally that the final Step 2.5 contains the same concepts and layout as v31:

Assessment type area
SEC + Web
CAM + Web
CAM + SEC + Web
same cards
same borders
same typography
same spacing/alignment
Assessment Outcome — Portfolio Summary

Preserve the v31-style wide portfolio table.

Preserve the relevant columns and ordering from the actual v31 source, including where present:

COMPANY NAME
CAGID
TICKER / ID
REL COUNTRY OF RISK
LIMIT INDUSTRY L1
LIMIT INDUSTRY L2
LIMIT INDUSTRY L3
TOTAL OSUC
OSUC-P
OSUC-PWL
OSUC-SM
OSUC-SS
OSUC-D/L
ED SCORE
SI SCORE
COMPOSITE SCORE
RESIDUAL RATING
CREDIT IMPACT RATING
CURRENT RRR
REC. RRR ACTION
CURRENT CLASS
REC. CLASS ACTION
KEY RISK DRIVER
IMPACT RATING OVERRIDE
USER CREDIT COMMENTARY

Use the actual v31 DOM/source as authority if names differ slightly.

Do not delete columns just because the current POC lacks data.

Where upstream data genuinely does not exist, use the existing RPR/v31 missing-data convention rather than fabrication.

10. EXPANDABLE COMPANY DETAILS

v31 shows expandable company rows.

Preserve this behavior.

For an assessed company, the expanded area must show the Step 2.3 and Step 2.4 factors in the v31 format:

EVENT-DRIVEN FACTORS

and

SECTOR-INHERENT FACTORS

with factor names/IDs, weights and scores derived from the actual confirmed upstream factors.

These values are NOT to be regenerated by Step 2.5.

Step 2.5 consumes them.

11. SCORING

Preserve the existing RPR scoring methodology already implemented/defined in the project.

Do not invent a new scoring formula.

Do not let the LLM freely redefine ED/SI scores.

ED/SI/composite values shown in Step 2.5 must be traceable to the confirmed Step 2.3/2.4 state and the existing scoring rules.

If v31 uses an 80/20 combination, confirm it from the code before applying it.

Never guess.

12. MODEL ASSESSMENT OUTPUT

Map the real Step25Assessment response into the Step 2.5 presentation.

Use available model fields such as:

assessment ID
headline
risk direction
confidence
factor assessments
supporting evidence
disconfirming evidence
evidence gaps
freshness warnings
reasoning summary
RRR review recommendation
workflow action
analyst questions
model metadata/evidence

according to the actual schema.

Do not fabricate a v31 field if the model does not supply it and no deterministic upstream source exists.

13. ANALYST CONTROLS

Preserve v31 analyst controls:

Run Assessment
impact-rating override
user credit commentary
Export
Confirm Assessment
feedback panel

Keep any currently working state-management behavior.

Confirm Assessment must not become available based on fabricated completion.

14. NO VISUAL REGRESSION OUTSIDE STEP 2.5

The rest of step23.html is an accepted working backbone.

DO NOT redesign:

header
assessment journey
right workflow rail
Steps 1 / 2.1 / 2.2 / 2.3 / 2.4
existing feedback controls

Make only changes necessary for Step 2.5.

Existing accepted working code is immutable building bone.

15. TEST THE REAL FLOW — NOT JUST FUNCTIONS

After implementation, run the application.

Perform an actual end-to-end test through the real frontend/backend workflow.

Required test:

Load step23.html.
Navigate to Step 2.5.
Confirm a real Step 2.2 portfolio company is available.
Confirm Step 2.3 and Step 2.4 inputs resolve for it.
Select SEC + Web.
Click the real Run Assessment button.
Confirm browser request reaches the Step 2.5 endpoint.
Confirm backend calls the real Runner.
Confirm Stylus preset executes.
Confirm SEC tool executes.
Confirm web search executes.
Confirm model response is received.
Confirm JSON is parsed.
Confirm Step25 schema passes.
Confirm assessment is mapped into the company row.
Confirm expandable ED/SI factors display.
Confirm assessment/recommendation/risk information renders.
Confirm no POC-only Apple/debug labels appear.
Compare final Step 2.5 screen directly against v31.

Do not claim UI parity without opening both source files and checking the rendered result.

16. STRICT STOP CONDITIONS

Do not loop through speculative improvements.

Do not start F2/F3/F4 cleanup unless it directly blocks this acceptance test.

Do not refactor unrelated code.

Do not improve token tooling.

Do not redesign the frontend.

Do not create another architecture.

If a genuine blocker occurs:

identify the FIRST failing layer, fix that layer only, rerun, and continue.

17. FINAL ACCEPTANCE REPORT

Only after the real run, report:

PRESET_FULL_SEC_WEB = YES/NO

STEP22_REAL_COMPANY_USED = YES/NO

STEP23_FACTORS_USED = YES/NO

STEP24_FACTORS_USED = YES/NO

POC_BYPASS_DISABLED = YES/NO

REAL_ENDPOINT_CALLED = YES/NO

RUNNER_HTTP_STATUS =

PRESET_EXECUTED = YES/NO

SEC_TOOL_EXECUTED = YES/NO

WEB_TOOL_EXECUTED = YES/NO

MODEL_RESPONSE_RECEIVED = YES/NO

JSON_PARSED = YES/NO

STEP25_SCHEMA_VALID = YES/NO

ASSESSMENT_ID =

FACTOR_ASSESSMENTS_COUNT =

UI_RESULT_RENDERED = YES/NO

ED_FACTORS_RENDERED = YES/NO

SI_FACTORS_RENDERED = YES/NO

V31_DOM_PARITY = PASS/FAIL

V31_CSS_PARITY = PASS/FAIL

V31_TABLE_PARITY = PASS/FAIL

V31_EXPAND_ROW_PARITY = PASS/FAIL

FILES_CHANGED =

FINAL_STATUS = PASS/BLOCKED

FIRST_REMAINING_BLOCKER =

PASS means the actual browser workflow works, not merely an isolated Python harness.

Start now. Inspect first, implement directly, test directly, and drive this to PASS.
