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

CompanyContextJSON

{
  "company_name": "Apple Inc.",
  "ticker": "AAPL",
  "cik": "0000320193"
}

ScenarioContextJSON

{
  "assessment_horizon": "12M",
  "base_case": "Soft landing",
  "stress_case": "Regulatory escalation"
}

EventDrivenFactorsJSON

[
  {
    "factor_id": "ED-1",
    "factor_name": "Leadership transition",
    "weight": 0.3
  },
  {
    "factor_id": "ED-2",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.4
  }
]

SectorInherentFactorsJSON

[
  {
    "factor_id": "SI-1",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.2
  }



RPR FINAL INTEGRATION PROMPT
STEP 2.1 → 2.5 FULL UI WORKFLOW
FINAL TARGET: USER CAN TEST REAL SEC + WEB STEP 2.5 FROM THE FRONTEND

============================================================
READ THIS FIRST — EXECUTION MODE
============================================================

This is the FINAL integration/fix pass for the current Windows RPR POC.

DO NOT respond with another architecture review.
DO NOT spend the session repeatedly inspecting the same files.
DO NOT generate long progress reports.
DO NOT redesign the application.
DO NOT reopen already solved Step 2.5 backend questions.

The objective is IMPLEMENTATION.

At the end of this task I must personally be able to:

1. start the existing RPR backend;
2. open the current frontend;
3. execute/confirm Step 2.1;
4. select/confirm portfolio companies in Step 2.2;
5. confirm Step 2.3 Event-Driven factors;
6. confirm Step 2.4 Sector-Inherent factors;
7. enter Step 2.5;
8. see eligible confirmed companies;
9. select SEC + Web;
10. click Run Assessment;
11. wait for the genuine Stylus SEC + Web assessment;
12. receive a successful result;
13. see that result rendered in the Step 2.5 table using the exact v31 design;
14. inspect factor-level details;
15. use the analyst-owned Step 2.5 controls;
16. rerun after feedback if the existing workflow supports it.

THIS is the acceptance criterion.

============================================================
KNOWN WORKING BUILDING BLOCKS — FREEZE THEM
============================================================

A real Step 2.5 backend execution has ALREADY succeeded.

The proven acceptance run returned:

CONTEXT_HTTP = 200

RUNNER_AUTH = PASS

PRESET_TOOL_CALLED = PASS
PRESET_TOOL_COMPLETED = PASS

SEC = PASS
WEB = PASS

MODEL_FINAL_RESPONSE = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS

ED_SCORE = 2.57
SI_SCORE = 3.25
COMPOSITE_SCORE = 2.71
RESIDUAL_RATING = MEDIUM
CREDIT_IMPACT = MEDIUM_IMPACT

RUN_HTTP = 200

Therefore:

THE STEP 2.5 SEC + WEB BACKEND EXECUTION PATH IS NOW A
FROZEN WORKING BUILDING BLOCK.

DO NOT REWRITE IT.

DO NOT REFACTOR IT.

DO NOT REPLACE IT.

DO NOT CHANGE THE WORKING PRESET CONTRACT.

DO NOT CHANGE THE SIX INPUT CONTRACT.

DO NOT CHANGE SEC TOOL INTEGRATION.

DO NOT CHANGE WEB SEARCH INTEGRATION.

DO NOT CHANGE STEP 3A SCORING METHODOLOGY.

DO NOT CHANGE COMPANY IDENTITY / CIK RESOLUTION UNLESS THERE IS
A SPECIFIC IDENTIFIED MAPPING BUG PREVENTING THE REAL SELECTED
COMPANY FROM REACHING STEP 2.5.

Do not add another Runner architecture.

Do not introduce another API abstraction.

Do not switch to preset UUID/by-ID invocation.

The current proven inline Runner preset path remains authoritative.

============================================================
CURRENT PRESET — FREEZE
============================================================

The current Stylus SEC + Web preset has been manually created and tested.

It contains the 6 expected inputs:

1. CompanyContextJSON
2. ScenarioContextJSON
3. EventDrivenFactorsJSON
4. SectorInherentFactorsJSON
5. AssessmentASOFDATE
6. UserFeedback

The preset currently has:

- Web Search enabled
- SEC filings enabled
- Claude Sonnet 5
- the current Step 2.5 output/schema knowledge
- the current Step 2.5 field dictionary / methodology knowledge

A direct Stylus execution has produced a valid complete assessment.

DO NOT ask me to rebuild the preset.

DO NOT ask me to change the preset again.

DO NOT change its field names.

DO NOT change the knowledge files unless you PROVE that the exact
local inline preset definition currently used by Python is stale
compared with the manually tested working preset.

If local inline preset content needs synchronization with the
already-working preset, make ONLY that synchronization.

Do not redesign its analytical methodology.

============================================================
IMMUTABLE RPR BASELINE RULE
============================================================

This project follows the BUILDING-BONE rule:

ANYTHING CURRENTLY WORKING MUST BE PRESERVED.

New work must be additive or the smallest possible correction.

No broad cleanup.

No opportunistic refactoring.

No renaming modules because you prefer another structure.

No framework migration.

No rewriting working routes.

No rebuilding Step 1.

No rebuilding Step 2.1.

No rebuilding Step 2.2.

No rebuilding Step 2.3.

No rebuilding Step 2.4.

Only correct concrete defects required to obtain the final
end-to-end UI workflow.

============================================================
VISUAL AUTHORITY — V31
============================================================

The visual baseline is the existing:

UI Design/
icm-pm-rapid-portfolio-review-v31.html

V31 is authoritative.

The working application currently uses / incorporates:

UI Design/
step23.html

plus the associated append JS/backend connections.

For ALL relevant Step 2 views, especially:

Step 2.4
Step 2.5

the visual target is EXACTLY V31.

Do NOT create a "similar" layout.

Do NOT simplify it.

Do NOT invent a new dashboard.

Do NOT redesign cards/tables.

Do NOT change typography because it looks cleaner.

Do NOT change widths/spacing unnecessarily.

Reuse v31 HTML structure/classes/CSS wherever possible.

The final frontend should LOOK like v31
but use LIVE backend data.

V31 = DESIGN REFERENCE.

Backend = DATA + EXECUTION SOURCE.

Do not copy demo/static business values from v31.

============================================================
PRIMARY DEFECTS TO SOLVE
============================================================

The current UI still shows defects including:

1.
"No confirmed Step 2.2 portfolio company available"

2.
"Blocked: Step 2.2/2.3/2.4 confirmation is incomplete for this company."

3. Run Assessment can therefore remain blocked/frozen.

4. Step 2.5 currently does not yet reliably expose the working
backend path through the actual frontend workflow.

5. The Step 2.5 result area does not yet reliably reproduce the
actual v31 table with live data.

6. There have been Step 2.2 data consistency concerns:
   MLE often appears blank.

7. Step 2.2 company state, Step 2.3 confirmation and Step 2.4
confirmation may be stored under variables/properties different
from what Step 2.5 expects.

8. Token expiry can prevent a future UI run even though the
Step 2.5 execution itself is working.

Fix these.

============================================================
TASK 0 — SHORT TARGETED TRACE ONLY
============================================================

Before editing, perform ONE targeted pass through the CURRENT code.

Identify the exact current functions/files responsible for:

A. Step 2.2 selected/confirmed companies
B. Step 2.3 confirmed factors
C. Step 2.4 confirmed factors
D. Step 2.5 eligibility
E. Step 2.5 company dropdown
F. Step 2.5 Run Assessment
G. Step 2.5 result rendering
H. runner token access before Step 2.5 execution

Do not spend more than necessary on this.

Once the mapping points are identified:
IMPLEMENT.

Do not repeatedly reopen the same code.

============================================================
TASK 1 — FIX STEP 2.2 → 2.5 COMPANY STATE
============================================================

The current Step 2.5 UI says:

"No confirmed Step 2.2 portfolio company available"

even though Step 2.2 has real portfolio data and confirmed selection.

This MUST be fixed.

Trace the real authoritative Step 2.2 state.

Determine the actual company key being used.

Possible fields include:

cagid
company_id
company_name
cagid_name
gfcid_name
ticker
CIK

Do NOT invent a new ID scheme.

Use the EXISTING stable internal identifier.

Strong preference:

CAGID/company_id for RPR state ownership.

Ticker/CIK should be metadata/company-resolution aids where available,
not the primary Step 2 workflow state key unless current working code
already explicitly uses them.

Step 2.5 must receive the actual collection of CONFIRMED Step 2.2
companies.

The dropdown must not show:

"No confirmed Step 2.2 portfolio company available"

if confirmed Step 2.2 companies actually exist.

============================================================
TASK 2 — COMPANY-SPECIFIC CONFIRMATION STATE
============================================================

Step 2.5 eligibility must be company-specific.

Do not use one broad/global Boolean such as:

STEP23_CONFIRMED = true

for the entire portfolio.

For each company, Step 2.5 must determine:

step22_confirmed
step23_confirmed
step24_confirmed

Conceptually:

company A
step22_confirmed = true
step23_confirmed = true
step24_confirmed = true

→ eligible for Step 2.5

company B
step22_confirmed = true
step23_confirmed = false
step24_confirmed = false

→ not eligible

Step 2.5 must not incorrectly block a company whose actual upstream
states are complete.

But also:

DO NOT artificially mark all companies as confirmed merely to make
the UI work.

Use genuine state.

============================================================
TASK 3 — STEP 2.1 CONTEXT HANDOFF
============================================================

The successful Step 2.5 backend already supports ScenarioContext.

Make sure the REAL confirmed Step 2.1 scenario/assumptions state flows
into Step 2.5.

Use the existing confirmed Step 2.1 state.

Previous code identified something equivalent to:

STEP2_CONFIRMED_SCENARIO

or the existing current equivalent.

Do not create an alternate scenario.

Do not regenerate Step 2.1.

Do not summarize it into a lossy string if the structured state is
already available.

Pass the actual confirmed state into:

ScenarioContextJSON.

============================================================
TASK 4 — STEP 2.3 HANDOFF
============================================================

Step 2.5 must consume the genuine confirmed Step 2.3
Event-Driven factors for the selected company.

Preserve:

factor_id
factor_name / label
source/upstream step
weight
current confirmed factor semantics
any existing metadata needed by Step 2.5

Do NOT replace the factor scores with fake values.

Do NOT create demo factors.

Do NOT move Step 2.4 factors into Step 2.3.

The exact Step 2.3 factor set confirmed upstream must reach
EventDrivenFactorsJSON.

============================================================
TASK 5 — STEP 2.4 HANDOFF
============================================================

Step 2.5 must consume the genuine confirmed Step 2.4
Sector-Inherent factors for the selected company.

Preserve:

factor_id
factor_name / label
source/upstream step
weight
current confirmed factor semantics
relevant metadata

Do NOT create demo factors.

Do NOT merge these into Event-Driven factors.

The exact confirmed Step 2.4 factor set must reach:

SectorInherentFactorsJSON.

============================================================
TASK 6 — FIX STEP 2.2 PORTFOLIO DATA CONSISTENCY
============================================================

Perform ONE targeted consistency check against the REAL currently
used Step 2.2 data/cache.

We have previously observed that MLE often renders blank.

Determine EXACTLY whether this is:

A. genuinely blank upstream;

B. wrong source field mapping;

C. cache/load omission;

D. wrong frontend field name;

E. incorrect join between exposure data and relationship master;

F. another concrete mapping issue.

Inspect real available Step 2.2 fields including, where present:

cagid
company_name
cagid_name
gfcid_name
MLE
mle
mle_code
country
country_name
geography
sector
industry
industry L1
industry L2
industry L3
total OSUC
OSUC-P
OSUC-PWL
OSUC-SM
OSUC-SS
OSUC-DL
exposure
current RRR
current class / classification
ticker
CIK

Do not assume all fields exist.

Do not manufacture missing values.

If MLE is genuinely unavailable upstream:

display blank / Not available according to existing UI convention.

If the source has MLE but the application loses it:

FIX THE MAPPING.

Also verify company names.

Previously a real cache scan demonstrated tens of thousands of
real companies and many non-empty names.

Therefore do not conclude:

"company_name is not available"

without inspecting the actual authoritative source/cache and mappings.

============================================================
TASK 7 — VERIFY COMPANY CONTEXT SENT TO STEP 2.5
============================================================

For the company selected in Step 2.5, construct CompanyContextJSON
from REAL Step 2.2 data.

Where genuinely available include:

company_name
cagid / company_id
ticker
CIK / confirmed_cik
country
country_name
geography
industry/sector
exposure
MLE
current RRR
current classification
other Step 2.2 portfolio fields relevant to the assessment

Do not invent ticker.

Do not invent CIK.

The existing CikResolver may be used through its already-working
company-resolution path when appropriate.

No Salesforce/Apple/MSFT substitution.

No company-name guessing.

The actual selected company must remain the assessed company.

============================================================
TASK 8 — STEP 2.5 ELIGIBILITY UX
============================================================

Correct Step 2.5 so the UI behaves sensibly.

When no company is eligible:

show a concise genuine explanation.

When company is eligible:

- company appears in dropdown;
- blocking warning disappears;
- SEC + Web option is selectable;
- Run Assessment becomes enabled.

Do not enable Run Assessment prematurely.

The eligibility check should be deterministic.

Do not freeze the UI because of stale historical state.

============================================================
TASK 9 — SEC + WEB ASSESSMENT TYPE
============================================================

For this POC, SEC + Web is the proven path.

It must be fully functional.

Do not break or unnecessarily redesign the other cards such as:

CAM + Web
CAM + SEC + Web

but do not spend time implementing unsupported paths.

The acceptance target is:

SEC + Web.

The existing v31 assessment-type card design must remain.

============================================================
TASK 10 — RUN ASSESSMENT BUTTON
============================================================

Fix the actual frontend Run Assessment control.

When user clicks:

Run Assessment

the workflow should be:

1. validate selected company;
2. validate Step 2.2 confirmed;
3. validate Step 2.3 confirmed;
4. validate Step 2.4 confirmed;
5. gather Step 2.1 scenario context;
6. gather Step 2.2 company context;
7. gather Step 2.3 factors;
8. gather Step 2.4 factors;
9. gather Assessment As-Of Date;
10. gather latest Step 2.5 user feedback, if any;
11. POST Step 2.5 context;
12. invoke the EXISTING working Step 2.5 /run path;
13. wait for the real backend response;
14. render the returned real assessment.

Do not start several duplicate requests.

Do not add browser-side endless polling.

Do not call Stylus directly from browser JavaScript.

Frontend calls RPR backend.

Backend owns Runner/Stylus communication.

============================================================
TASK 11 — FRONTEND BUSY STATE
============================================================

When Run Assessment is clicked:

- disable duplicate submission;
- change status to something like:

  "Running SEC + Web assessment..."

- keep browser responsive;
- do not corrupt upstream state;
- restore button after success or controlled failure.

Since SEC + Web can take several minutes, do not impose an arbitrary
very short browser timeout that fails before the proven backend run
finishes.

Use the established Step 2.5 backend timeout behaviour.

Do not set infinite timeouts.

Use the existing bounded backend lifecycle.

============================================================
TASK 12 — TOKEN HANDLING
============================================================

Token handling is backend-only.

ABSOLUTE RULE:

THE FRONTEND MUST NEVER RECEIVE OR STORE THE RUNNER BEARER TOKEN.

Do not put it into:

localStorage
sessionStorage
HTML
JavaScript variables
query parameters
frontend logs
frontend API responses

Use the EXISTING backend token mechanisms.

Known building blocks include equivalents of:

runner_token_manager.py
stylus_runner_client.py
fetch_runner_token
runner token cache/file
background auto refresher
run_step25_with_fresh_token.ps1
existing token startup initialization

Inspect actual names in repository and reuse them.

Do not create a parallel authentication system.

============================================================
TASK 13 — TOKEN FRESHNESS ON RUN
============================================================

Before a Step 2.5 Runner call:

Backend must determine whether the current token is usable.

If valid:
continue.

If stale/expired and an existing automated token acquisition/refresh
mechanism is capable of obtaining a fresh valid Runner token:

use it ONCE.

After successful refresh:

make sure the token being used by the CURRENT running backend is
updated.

This is important because previous runs proved a case where:

new token existed in the token/cache file
BUT
backend retained an old in-memory token until restart.

Correct that specific defect if still present.

The execution path should use the authoritative latest token from the
existing token manager/state.

Do not introduce filesystem polling.

Do not restart the entire RPR process for every assessment unless the
existing technical boundary absolutely requires it.

============================================================
TASK 14 — TOKEN FALLBACK / ONE RETRY MAXIMUM
============================================================

If a Step 2.5 run receives an explicit token expiration response such
as 401/TOKEN_EXPIRED:

allow MAXIMUM ONE controlled token recovery attempt.

Flow:

initial Runner request
→ auth expired
→ existing backend refresh/fetch ONCE
→ update current token state
→ retry Step 2.5 execution ONCE

No loops.

No repeated SEC/Web execution.

No infinite authentication retries.

If refresh fails, return controlled error:

STEP25_RUNNER_AUTH_REQUIRED

with a concise UI message such as:

"Runner session needs renewal."

Do not show raw token.

Do not dump auth headers.

============================================================
TASK 15 — PRESERVE PROVEN SSE COMPLETION FIX
============================================================

The existing bounded one-request/one-stream Step 2.5 completion logic
is a working building block.

Preserve it.

Current intended characteristics:

- one Runner request;
- one SSE stream;
- SEC executes;
- Web executes;
- genuine model response is accumulated;
- genuine final JSON is parsed;
- if formal terminal marker is missing but a complete actual
  schema-valid model JSON already exists in the same model-content
  stream, recover THAT actual output;
- never synthesize a fallback assessment;
- bounded final waiting;
- controlled timeout rather than hanging forever.

DO NOT undo this.

DO NOT reintroduce same-session repair Runner calls.

DO NOT start second model requests to fix JSON.

============================================================
TASK 16 — USE THE REAL STEP 2.5 ASSESSMENT OBJECT
============================================================

The backend already persists/builds a genuine Step25Assessment.

Use that.

Do not construct a second fake frontend model.

Do not hardcode:

2.57
3.25
2.71
MEDIUM
MEDIUM_IMPACT

Those were acceptance proof values only.

For every real run, render the values actually returned.

============================================================
TASK 17 — V31 STEP 2.5 TABLE MUST BE THE UI TARGET
============================================================

Open:

UI Design/
icm-pm-rapid-portfolio-review-v31.html

Find the exact Step 2.5 section.

Compare it with current:

UI Design/
step23.html

and its Step 2.5 append JS.

Make current Step 2.5 reproduce the v31 structure.

Do not just display a simple JSON card.

The actual assessment result must appear in the v31-style portfolio
summary table.

The screenshots show v31 contains detailed columns including items
equivalent to:

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
OSUC-DL
ED SCORE (80%)
SI SCORE (20%)
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

Preserve the actual labels/order/styles from v31.

Do not rely on this list if v31 differs slightly.

V31 itself is authoritative.

============================================================
TASK 18 — REAL DATA ONLY IN THE TABLE
============================================================

Populate v31 columns from genuine sources.

PORTFOLIO COLUMNS:
Step 2.2 real portfolio context.

MODEL COLUMNS:
Step 2.5 real assessment output.

ANALYST-OWNED COLUMNS:
UI/user state.

Never copy v31 demo values.

Never invent:

RRR
classification
OSUC
MLE
industry
country
ticker
CIK
factor score
credit impact
residual rating

If a non-required portfolio field is unavailable:

use the existing v31 blank/unavailable convention.

============================================================
TASK 19 — FACTOR EXPANSION
============================================================

The v31 company row supports expanded factor detail.

Use real Step 2.5:

factor_assessments[]

Split by actual source_step:

source_step == "2.3"
→ EVENT-DRIVEN FACTORS

source_step == "2.4"
→ SECTOR-INHERENT FACTORS

Display:

factor name
supplied weight
real Step 2.5 score
direction
impact rating
rationale/evidence commentary as appropriate to v31

Do not show old deterministic upstream placeholder scores when a
real Step 2.5 model assessment exists.

Upstream factors define what must be assessed.

Step 2.5 produces the final evidence-grounded factor assessment.

============================================================
TASK 20 — AGGREGATION DISPLAY
============================================================

The real Step 2.5 output contains:

ED score
SI score
Composite score
Residual rating
Credit impact rating

Display those model results.

Do not recalculate differently in JavaScript.

If UI needs formatting:

ED_SCORE → expected v31 number format
SI_SCORE → expected format
COMPOSITE_SCORE → expected format

But do not modify business meaning.

============================================================
TASK 21 — CREDIT CONCLUSION FIELDS
============================================================

Where returned by the real assessment, render:

headline
key_risk_driver
current_rrr
recommended_rrr_action
current_class
recommended_class_action
confidence

Current RRR/classification may legitimately be null if absent from
Step 2.2.

Do not manufacture them.

For null/current unavailable values use the correct v31 display
convention.

============================================================
TASK 22 — ANALYST OWNED FIELDS
============================================================

Preserve the v31 analyst controls:

Impact Rating Override

User Credit Commentary

These are human-owned.

The model must not fabricate them.

The user should be able to select/type values in the frontend.

Do not overwrite analyst-entered values when rerendering unless the
existing expected workflow explicitly resets them.

============================================================
TASK 23 — STEP 2.5 FEEDBACK
============================================================

There is an existing Step 2.5 feedback mechanism / history.

Preserve it.

If a user provides Step 2.5 feedback and reruns:

send the latest relevant user feedback through:

UserFeedback

Do not mix unrelated Step 1 feedback.

Do not wipe feedback history without cause.

Do not allow feedback to modify confirmed Step 2.3/2.4 factors or
weights unless the established workflow explicitly provides that
behaviour.

============================================================
TASK 24 — FIX STEP 2.4 VISUAL PARITY TOO
============================================================

We have repeatedly observed Step 2.4 differences from v31.

While working on the final frontend integration, compare current
Step 2.4 against v31.

Correct clear layout divergences.

DO NOT change the Step 2.4 business logic unless needed to fix the
Step 2.4→2.5 handoff.

The target is:

same v31 table/layout/spacing/visual structure
+
real current Step 2.4 data.

============================================================
TASK 25 — DO NOT MODIFY WORKING STEP 1
============================================================

Step 1 is NOT part of this implementation request.

Do not redesign or refactor it.

Only ensure the page still loads and navigation works.

============================================================
TASK 26 — DO NOT BREAK STEP 2.1
============================================================

Preserve the current working Step 2.1 scenario functionality.

Only make a minimal additive state-access fix if Step 2.5 cannot
access its confirmed scenario.

============================================================
TASK 27 — DO NOT BREAK STEP 2.2
============================================================

Preserve its working search/upload/filter/selection behaviour.

Do not replace the data-loading pipeline.

Only repair:

- confirmed state handoff;
- genuine incorrect field mappings;
- MLE mapping if proved;
- relevant company context fields.

============================================================
TASK 28 — DO NOT BREAK STEP 2.3
============================================================

Do not modify factor-generation methodology.

Only make necessary corrections to:

- confirmation state persistence;
- company-specific state key;
- Step 2.5 handoff;
- exact v31 display parity if needed.

============================================================
TASK 29 — DO NOT BREAK STEP 2.4
============================================================

Same rule.

No business redesign.

Fix only:

- company-specific confirmation state;
- Step 2.5 handoff;
- visual parity.

============================================================
TASK 30 — TECHNICAL DIAGNOSTICS
============================================================

Technical diagnostics may remain available if already part of v31/current
implementation.

But diagnostics must not dominate the Step 2.5 UI.

Normal user experience must show the assessment.

Do not force the user to inspect raw manifests to use Step 2.5.

============================================================
TASK 31 — ERRORS MUST BE CONTROLLED
============================================================

Possible failures should not leave the frontend frozen.

At minimum handle:

prerequisite state incomplete
company identity unresolved
token renewal required
Runner auth failure
model final timeout
schema validation failure
backend HTTP failure

On failure:

- release Run Assessment button;
- display concise readable message;
- preserve previously confirmed upstream state;
- do not reload/erase the complete application.

============================================================
TASK 32 — FULL NORMAL FRONTEND ROUTE
============================================================

The acceptance path MUST be through the actual frontend application.

Do not claim completion merely because a Python acceptance harness works.

The Python harness has already proved the backend.

This task proves UI INTEGRATION.

At completion, the standard app should support:

Step 2.1 → Step 2.2 → Step 2.3 → Step 2.4 → Step 2.5

without special manual Python requests.

============================================================
TASK 33 — USER MANUAL TESTING MUST BE POSSIBLE
============================================================

When you finish, leave the application in a state where I can personally
perform this test from browser:

A. start/restart backend using the normal existing command;

B. open the current app URL;

C. go to Step 2.1;

D. confirm scenario;

E. go Step 2.2;

F. choose/confirm one actual portfolio company;

G. go Step 2.3;

H. confirm its Event-Driven factors;

I. go Step 2.4;

J. confirm its Sector-Inherent factors;

K. go Step 2.5;

L. company must be available;

M. no false blocking message;

N. SEC + Web selected;

O. click Run Assessment;

P. frontend shows processing;

Q. genuine backend SEC + Web assessment executes;

R. returned scores appear in the v31 table;

S. expand company and inspect Event-Driven / Sector-Inherent factors;

T. inspect key risk driver;

U. verify analyst Impact Rating Override control;

V. verify User Credit Commentary field.

THIS MANUAL UI TEST IS THE FINAL ACCEPTANCE.

============================================================
TASK 34 — AUTOMATED/DEVELOPER ACCEPTANCE BEFORE HANDOFF
============================================================

Before handing back to me, Claude should perform targeted checks.

Do not run a portfolio-wide assessment.

Do not spend hours.

At minimum verify:

BACKEND_START = PASS

STEP21_STATE_AVAILABLE = PASS

STEP22_COMPANIES_AVAILABLE = PASS

STEP22_CONFIRMED_COMPANY_HANDOFF = PASS

STEP23_COMPANY_CONFIRMATION = PASS

STEP24_COMPANY_CONFIRMATION = PASS

STEP25_ELIGIBILITY = PASS

STEP25_COMPANY_DROPDOWN = PASS

STEP25_SEC_WEB_OPTION = PASS

RUN_BUTTON_ENABLEMENT = PASS

CONTEXT_PAYLOAD_6_INPUTS = PASS

TOKEN_ACCESS = PASS

STEP25_BACKEND_ROUTE_REACHABLE = PASS

V31_STEP25_TABLE_RENDER_PATH = PASS

FACTOR_EXPANSION_RENDER_PATH = PASS

ANALYST_CONTROLS = PASS

============================================================
TASK 35 — ONE REAL END-TO-END RUN MAXIMUM
============================================================

If all prerequisites are present and a valid Runner token is available,
run ONE real Step 2.5 acceptance execution from the integrated flow.

Do not repeatedly run Stylus.

Do not run several companies.

Use one real Step 2.2 company.

Apple may only be used if Apple is genuinely present/selected from
the real Step 2.2 portfolio.

Do not substitute Apple merely because previous acceptance used it.

Expected final live acceptance where available:

RUNNER_AUTH = PASS

PRESET_TOOL_CALLED = PASS

PRESET_TOOL_COMPLETED = PASS

SEC = PASS

WEB = PASS

MODEL_FINAL_RESPONSE = PASS

JSON_PARSED = PASS

SCHEMA_VALID = PASS

RUN_HTTP = 200

ED_SCORE = populated

SI_SCORE = populated

COMPOSITE_SCORE = populated

RESIDUAL_RATING = populated

CREDIT_IMPACT = populated

STEP25_V31_ROW_RENDERED = PASS

STEP25_FACTOR_DETAIL_RENDERED = PASS

============================================================
TASK 36 — IF TOKEN EXPIRES DURING THIS FINAL TEST
============================================================

Do not abandon the integration task.

Use the existing token mechanism once.

If automatic token retrieval works:

continue.

If corporate authentication requires manual fresh credential seeding:

STOP only at that specific boundary and tell me:

MANUAL_ACTION_REQUIRED:
fresh Runner bearer token required

Do not change auth architecture just to avoid one corporate credential
boundary.

All other code/integration work should still be completed first.

============================================================
TASK 37 — REMOVE TEMPORARY DEBUG NOISE
============================================================

After proof:

remove only the temporary excessive diagnostics added during debugging.

Preserve useful existing application logs.

Do not remove actual error handling.

Do not alter unrelated code.

============================================================
TASK 38 — FILE-CHANGE DISCIPLINE
============================================================

Before editing a file:

confirm why that file must change.

Do not touch unrelated files.

At the end list every changed file.

The expected edits should primarily be limited to existing Step 2.5
frontend/state wiring, plus any narrowly required Step 2.2/2.3/2.4
state handoff and token-state correction.

If you find yourself changing dozens of new files, STOP and reassess.

This is an integration correction, not a rewrite.

============================================================
TASK 39 — NO MORE LOOPING
============================================================

You may inspect once, implement, test, and correct concrete failures.

Do NOT:

- make a 20-item investigation plan then stop;
- repeatedly tell me you are polling;
- repeatedly inspect the same process;
- repeatedly run grep over the same files;
- write another architecture memo;
- repeatedly rerun Step 2.5;
- spend the session explaining already-known history.

USE YOUR TOOLS AND MODIFY THE APPLICATION.

============================================================
TASK 40 — PRESERVE THE CURRENT WORKING BACKBONE AFTER SUCCESS
============================================================

Once the integrated UI run works:

FREEZE IT.

Do not perform "cleanup".

Do not optimize it.

Do not refactor.

Do not rename working functions.

Do not modernize the code.

This is a POC and a separate production team can build the final
architecture later.

============================================================
FINAL REQUIRED STATE
============================================================

At the end of this prompt, I need this:

RPR frontend opens normally.

Step 2.1 works.

Step 2.2 works with real portfolio data.

Step 2.2 selected companies persist.

Step 2.3 works and confirmation persists per company.

Step 2.4 works and confirmation persists per company.

Step 2.5 recognizes those confirmed companies.

The false blocking message is fixed.

The company dropdown is populated.

SEC + Web can be selected.

Run Assessment is enabled.

Clicking Run Assessment calls the EXISTING proven Step 2.5 backend.

The Runner token is handled backend-side.

Expired token recovery is attempted at most once using existing
mechanisms.

SEC executes.

Web Search executes.

The actual model result is parsed.

The schema-valid Step25Assessment is returned.

The frontend displays the actual result in the exact v31 Step 2.5
table design.

Factor details are expandable.

Analyst override remains user-controlled.

User Credit Commentary remains user-controlled.

No demo data is used.

No fake companies are substituted.

No hard-coded successful scores are displayed.

============================================================
FINAL RESPONSE FORMAT — KEEP IT CONCISE
============================================================

Do not give me another long report.

Return exactly:

FINAL_STATUS =
READY_FOR_USER_UI_TEST
or
BLOCKED

FILES_CHANGED =
[file] — [one-line reason]
[file] — [one-line reason]

STEP_2_1 =
PASS / FAIL

STEP_2_2 =
PASS / FAIL

STEP_2_2_COMPANY_COUNT =
<actual count available to UI>

STEP_2_2_MLE =
SOURCE_BLANK / MAPPING_FIXED / CACHE_FIXED / PASS

STEP_2_3 =
PASS / FAIL

STEP_2_4 =
PASS / FAIL

STEP_2_5_ELIGIBILITY =
PASS / FAIL

STEP_2_5_COMPANY_DROPDOWN =
PASS / FAIL

RUN_ASSESSMENT =
PASS / FAIL

TOKEN_BACKEND_ONLY =
PASS / FAIL

TOKEN_FRESHNESS =
PASS / FAIL

TOKEN_RECOVERY_MAX_RETRY =
1

SEC_WEB_BACKEND =
PASS / FAIL / NOT_RUN_DUE_TO_TOKEN

V31_STEP25_LAYOUT =
PASS / FAIL

REAL_STEP25_DATA_RENDER =
PASS / FAIL

FACTOR_EXPANSION =
PASS / FAIL

ANALYST_OVERRIDE =
PASS / FAIL

USER_COMMENTARY =
PASS / FAIL

REAL_TEST_RESULT =
RUNNER_AUTH =
PRESET_TOOL =
SEC =
WEB =
MODEL =
JSON =
SCHEMA =
RUN_HTTP =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =

USER_TEST_COMMAND =
<exact existing backend start command>

USER_TEST_URL =
<exact URL I should open>

MANUAL_TEST_PATH =
Step 2.1 → Step 2.2 → Step 2.3 → Step 2.4 → Step 2.5 →
SEC + Web → Run Assessment

FIRST_REMAINING_BLOCKER =
NONE

or, if blocked:

FIRST_REMAINING_BLOCKER =
<exact file/function/error only>

============================================================
START NOW
============================================================

Inspect only the minimum necessary current state.

Then implement.

The final objective is not another successful terminal harness.

THE FINAL OBJECTIVE IS:

I CAN PERSONALLY OPEN THE FRONTEND AND TEST THE COMPLETE
STEP 2.1 → STEP 2.5 SEC + WEB FLOW USING REAL DATA AND THE
EXACT V31 USER EXPERIENCE.

DO NOT STOP BEFORE THE APPLICATION IS READY FOR THAT MANUAL UI TEST,
UNLESS YOU HIT ONE GENUINE EXTERNAL CREDENTIAL OR SERVICE BLOCKER.
