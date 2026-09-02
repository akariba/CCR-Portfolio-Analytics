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

CONTINUE FROM THE CURRENT STATE. DO NOT RESTART THE STEP 2.5 DESIGN WORK.

IMPORTANT:
The preset is now FINAL for this test.
DO NOT modify:
- the Stylus preset prompt
- the 6-input contract
- the knowledge files
- Step 2.1 / 2.2 / 2.3 / 2.4 logic
- v31 styling/layout
- company identity resolution
- SEC/Web integrations
- existing evidence adapter
unless you prove a concrete code defect requires a minimal change.

CURRENT PROVEN STATE

RUNNER_TOKEN_FETCH = PASS
TOKEN_FRESHNESS_CHECK = PASS
STEP25_CONTEXT_HTTP = 200

The backend was restarted after the fresh token was written.

The latest problem is NOT initial authentication.

The concrete blocker is:

POST /api/v1/rpr/step25/run accepts the request but the terminal-driven invocation does not return a completion response / final run artifact.

DO NOT LOOP.
DO NOT produce another architecture review.
DO NOT write a long report before execution.

YOUR TASK IS TO TRACE ONE REAL /run EXECUTION AND IDENTIFY THE EXACT WAITING POINT.

==================================================
1. GET A FRESH TOKEN IMMEDIATELY BEFORE THE TEST
==================================================

Use the existing working manual token-fetch path:

step25.fetch_runner_token

Do not redesign automatic refresh.

Confirm only:

TOKEN_FETCH = PASS
TOKEN_EXPIRY = <timestamp>

Then immediately execute the run.

==================================================
2. TRACE THE EXISTING /run PATH
==================================================

Instrument or inspect the CURRENT code path with minimal temporary logging.

For ONE Apple run, establish these checkpoints in order:

A. FastAPI /step25/run entered
B. company context loaded
C. ScenarioContext loaded
D. EventDrivenFactors loaded
E. SectorInherentFactors loaded
F. AssessmentASOFDATE loaded
G. UserFeedback loaded
H. stylus_engine.run_stylus_poc entered
I. Runner HTTP request sent
J. Runner initial HTTP status received
K. workflow/run identifier received, if applicable
L. Runner SSE/stream opened, if applicable
M. SEC Filing tool events observed
N. Web Search tool events observed
O. model final-response event observed
P. stream completion/end event observed
Q. JSON extracted
R. Step25Assessment parsed
S. assessment artifact written
T. FastAPI /run response returned

I need the FIRST checkpoint which does NOT occur.

Do not infer it.
Prove it from one execution.

==================================================
3. IMPORTANT: CHECK THE STREAMING BEHAVIOUR
==================================================

The previous successful Step 2.5 tests took several minutes.

Do NOT terminate the process merely because the CLI appears quiet.

Inspect the actual Runner/SSE activity while the request is running.

Check specifically whether:

- Runner is still emitting SSE events;
- the model completed but our code failed to recognise the final event;
- the stream completed but our parser is waiting for another event;
- the parser completed but FastAPI never returned;
- the request is blocked waiting on a timeout;
- the Runner returned an error which is being swallowed.

Do NOT introduce polling frameworks or new architecture.

Use the existing Runner client.

==================================================
4. IF THE RUNNER IS PRODUCING OUTPUT
==================================================

If Runner/SSE proves the assessment completed, but our backend remains waiting:

fix ONLY the concrete completion-detection/parsing issue.

Examples of acceptable minimal fixes:

- recognise the actual final SSE event emitted by Runner;
- stop consuming after the valid final model response is obtained;
- correctly process the stream terminator;
- correctly propagate the completed assessment back through
  stylus_engine -> router -> HTTP response.

Do NOT shorten the model analysis merely to make the HTTP request return faster.

==================================================
5. IF RUNNER ITSELF IS NOT COMPLETING
==================================================

Capture:

HTTP status
workflow/run id
last 10 meaningful SSE event TYPES only
last tool invoked
last model event
elapsed seconds

Do not dump thousands of SSE lines.

Then identify the concrete Runner-side stopping point.

==================================================
6. AFTER THE MINIMAL FIX, RUN ONE REAL ACCEPTANCE
==================================================

Company:
Apple Inc.
CIK:
0000320193

Use the REAL confirmed context already wired from Steps 2.1–2.4.

Do not replace the inputs with invented test content.

Acceptance criteria:

CONTEXT_HTTP = 200
RUN_HTTP = 200

RUNNER_AUTH = PASS
SEC_TOOL_EXECUTED = YES
WEB_TOOL_EXECUTED = YES
MODEL_RESPONSE_RECEIVED = YES
JSON_PARSED = YES
STEP25_SCHEMA_VALID = YES

FACTOR_ASSESSMENTS:
ED-1 present
ED-2 present
SI-1 present

MANDATORY SCORING:
ed_score = NON-NULL
si_score = NON-NULL
composite_score = NON-NULL
residual_rating = NON-NULL
credit_impact_rating = NON-NULL

Then verify the browser Step 2.5 row renders those REAL returned values.

==================================================
7. STRICT STOP RULE
==================================================

Do not spend time on:
- automatic token refresh
- MLE cleanup
- MarketDev
- refactoring
- new tests/frameworks
- v31 cosmetic work
until THIS real /run returns a completed Step 2.5 assessment.

If the run still fails, STOP after identifying exactly:

FIRST_FAILED_CHECKPOINT =
ACTUAL_ERROR =
LAST_RUNNER_EVENT =
RUN_ID =
MINIMAL_REQUIRED_FIX =

Then implement that minimal fix if it is in our code.

Do not ask me whether to continue if the fix is local and obvious.
Execute it.

FINAL RESPONSE MUST BE SHORT:

RUN_HTTP =
RUNNER_AUTH =
SEC =
WEB =
MODEL_OUTPUT =
JSON =
SCORING =
UI =
FIRST_REMAINING_BLOCKER =

PRIMARY OBJECTIVE:
GET ONE REAL STEP 2.5 ASSESSMENT COMPLETED AND DISPLAYED IN THE EXISTING v31-BASED UI NOW.
