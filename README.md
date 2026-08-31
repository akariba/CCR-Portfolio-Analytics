STOP ALL NEW FEATURE DEVELOPMENT.

DO NOT redesign Step 2.5.
DO NOT add another architecture layer.
DO NOT create another authentication mechanism.
DO NOT modify Steps 1–2.4.
DO NOT assume the cause of the failure from previous reports.

I want a fresh, execution-based forensic trace of STEP 2.5 AS IT EXISTS RIGHT NOW.

The purpose is:

1. Tell me EXACTLY what Step 2.5 is currently using.
2. Test the SEC + WEB Stylus preset independently from the RPR flow.
3. Test the RPR Step 2.5 path independently.
4. Trace the exact route of failure.
5. Separate PRESET problems from AUTH problems from RPR integration problems.
6. Fix only the concrete problem that is actually proven.

============================================================
IMPORTANT CURRENT VERIFIED UPSTREAM STATE
============================================================

Do NOT re-test or redesign Steps 1–2.4 unless required simply to supply context to Step 2.5.

The latest real execution proved:

REAL COMPANY:
APPLE INC

CAGID:
0000014508

CIK:
0000320193

SEC IDENTITY:
CIK_CONFIRMED

REAL STEP 2.3:
6 event-driven risk factors

REAL STEP 2.4:
5 sector-inherent risk factors

STEP 2.5 CONTEXT REGISTRATION:
upstream_ready=true

Therefore the investigation begins AFTER upstream context is available.

The problem is Step 2.5 execution.

============================================================
PHASE 1 — TELL ME WHAT STEP 2.5 IS USING RIGHT NOW
============================================================

BEFORE CHANGING ANY CODE, inspect the current runtime and current code and produce an exact CURRENT-STATE inventory.

I want to know:

A. Which Step 2.5 engine is ACTIVE right now?

Report:

RPR_STEP25_ASSESSMENT_ENGINE =
<actual resolved value>

ENGINE_SOURCE =
<env / config default / launcher / other>

ACTIVE_ENGINE =
<stylus / orchestrated / hybrid / direct_runner / other>

Do not assume it is Stylus because we intended it to be.

Prove the resolved runtime value.

------------------------------------------------------------
B. Which backend route handles Run Assessment?
------------------------------------------------------------

Trace from:

POST /api/v1/rpr/step25/run

or the exact current endpoint

through every function called until Runner invocation.

Produce the actual chain, for example:

router.py
  -> function X
  -> stylus_engine.py
  -> function Y
  -> stylus_runner_client.py
  -> function Z
  -> HTTP Runner request

Use the REAL function names.

For each stage report:

FILE
FUNCTION
INPUT
OUTPUT
CAN_BLOCK = YES/NO
CURRENT RESULT

------------------------------------------------------------
C. Which Runner endpoint is Step 2.5 using?
------------------------------------------------------------

Report exact configured endpoint, sanitized if needed.

Expected family may resemble:

https://workspaces.genai.citi.net/runner-service/chat

But inspect actual code/config.

Report:

RUNNER_ENDPOINT =
...

RUNNER_HTTP_METHOD =
...

STREAM_MODE =
...

ACCEPT_HEADER =
...

Do not expose credentials.

------------------------------------------------------------
D. What authentication mechanism is Step 2.5 using RIGHT NOW?
------------------------------------------------------------

This is critical.

Do not tell me what it SHOULD use.

Tell me what current code ACTUALLY uses.

Trace:

Where does Runner client_id come from?

Where does access/bearer token come from?

Where does refresh token come from?

Does the code attempt token refresh?

Does it look for token cache files?

Does it reuse colleague app authentication?

Does it use GENAI_BEARER_TOKEN?

Does it use GENAI_REFRESH_TOKEN?

Does it use RPR_STEP25_RUNNER_CLIENT_ID?

Does it use another client ID?

Report only configuration presence and code source.

NEVER print actual credentials.

Use this format:

RUNNER_CLIENT_ID_REQUIRED = YES/NO
RUNNER_CLIENT_ID_SOURCE = ...

BEARER_TOKEN_SOURCE = ...
BEARER_TOKEN_PRESENT = YES/NO

REFRESH_TOKEN_SOURCE = ...
REFRESH_TOKEN_PRESENT = YES/NO

TOKEN_CACHE_USED = YES/NO
TOKEN_CACHE_LOCATION = <path only if non-sensitive>

OAUTH_REFRESH_IMPLEMENTED = YES/NO
OAUTH_REFRESH_FUNCTION = <file:function>

------------------------------------------------------------
E. What preset definition is Step 2.5 using RIGHT NOW?
------------------------------------------------------------

Report:

PRESET_SOURCE =
<yaml / inline Python / other>

PRESET_FILE =
...

PRESET_VERIFIED =
true / false

PRESET_PLACEHOLDERS_REMAIN =
YES/NO

NUMBER_OF_INPUTS =
...

ACTUAL_INPUT_NAMES =
<exact names if known>

PROMPT_PRESENT =
YES/NO

MODEL_PRESENT =
YES/NO

TOOLS_PRESENT =
YES/NO

KNOWLEDGE_PRESENT =
YES/NO

Do not make assumptions.

If the current YAML still contains PENDING_CAPTURE, say exactly which REQUIRED sections are incomplete.

============================================================
PHASE 2 — TEST THE PRESET SEPARATELY FROM RPR
============================================================

I want to know whether the SEC + WEB PRESET ITSELF is accessible/executable.

This must be a completely separate test from:

POST /step25/run

Do NOT use Step 2.5 route for this test.

Use the smallest existing Runner test mechanism.

Prefer:

- existing colleague app Runner call;
- existing runner_client;
- existing Stylus smoke-test script;

rather than creating new infrastructure.

============================================================
TEST 2A — RUNNER SERVICE CONNECTIVITY ONLY
============================================================

First test whether this machine/session can reach the Runner Service without involving the SEC + WEB preset.

Use the safest existing approved request/check already present in the project.

Report:

RUNNER_NETWORK_REACHABLE =
PASS / FAIL

TLS =
PASS / FAIL

HTTP_CONNECTION =
PASS / FAIL

AUTHENTICATION_REACHED =
YES/NO

HTTP_STATUS =
...

FAILURE_STAGE =
DNS / TLS / CONNECTION / AUTH / REQUEST / OTHER

Do not bypass TLS.
Do not disable certificate verification.

============================================================
TEST 2B — AUTHENTICATION ONLY
============================================================

Using the EXISTING APPROVED authentication flow, determine whether a current authenticated Runner request is possible.

Do not ask me for credentials.

Do not invent credentials.

If colleague app contains a working OAuth refresh flow, test that exact mechanism.

Report:

AUTH_INITIAL_STATE =
...

REFRESH_ATTEMPTED =
YES/NO

REFRESH_RESULT =
PASS / FAIL / NOT_AVAILABLE

ACCESS_TOKEN_AVAILABLE_AFTER_REFRESH =
YES/NO

RUNNER_AUTHENTICATED_REQUEST_POSSIBLE =
YES/NO

FAILURE =
<exact sanitized failure>

============================================================
TEST 2C — COLLEAGUE WORKING RUNNER PATH
============================================================

This test is very important.

The colleague's app previously worked.

Run or isolate the relevant Runner execution path from the colleague app AS-IS as far as safely possible.

Do not modify it first.

Determine:

COLLEAGUE_RUNNER_TEST =
PASS / FAIL

If PASS:

prove:
- endpoint reached
- authentication succeeded
- request accepted
- SSE/response received

Then identify EXACTLY what colleague path has that RPR does not.

If FAIL:

identify EXACTLY where it now fails.

This tells us whether the current problem is:

RPR-SPECIFIC

or

RUNNER/AUTH ENVIRONMENT-WIDE.

============================================================
TEST 2D — SEC + WEB PRESET ACCESSIBILITY
============================================================

Now test the SEC + WEB preset separately.

IMPORTANT:

Do not assume that the RPR YAML is correct.

There are two possible tests:

TEST METHOD 1:
If the exact real Stylus preset definition is already available locally, use it.

TEST METHOD 2:
If it is NOT available locally, do NOT fabricate one.

Report:

PRESET_DEFINITION_COMPLETE =
YES/NO

If NO:

PRESET_EXECUTION_TEST =
NOT_POSSIBLE_YET

REASON =
exact real Stylus preset payload has not been captured

This is different from authentication failure.

If YES:

perform an isolated Runner call using ONLY:

- real preset definition
- safe representative values for its exact five inputs

No RPR Step 2.5 context is required for this isolated accessibility test.

The purpose is simply:

CAN THIS PRESET EXECUTE THROUGH RUNNER?

Report:

PRESET_REQUEST_CONSTRUCTED =
YES/NO

PRESET_REQUEST_SENT =
YES/NO

RUNNER_ACCEPTED_PRESET =
YES/NO

MODEL_EXECUTION_STARTED =
YES/NO

TOOL_EXECUTION_STARTED =
YES/NO

SEC_TOOL_CALLED =
YES/NO

WEB_TOOL_CALLED =
YES/NO

RESPONSE_RECEIVED =
YES/NO

HTTP_STATUS =
...

FAILURE_STAGE =
...

EXACT SANITIZED FAILURE =
...

============================================================
CRITICAL SEPARATION
============================================================

Do NOT combine these statuses.

We need separately:

1.
RUNNER_CONNECTIVITY

2.
RUNNER_AUTHENTICATION

3.
PRESET_CONFIGURATION

4.
PRESET_EXECUTION

5.
RPR_STEP25_INTEGRATION

A failure in one must not be described as failure in all five.

============================================================
PHASE 3 — TRACE RPR STEP 2.5 EXACTLY
============================================================

Now test the actual RPR route with the already-proven Apple context.

Use:

CAGID:
0000014508

COMPANY:
APPLE INC

CIK:
0000320193

STEP23_FACTOR_COUNT:
6

STEP24_FACTOR_COUNT:
5

Verify context first:

GET/POST relevant Step 2.5 context endpoint

Expected:

upstream_ready=true

Then execute:

POST /step25/run

============================================================
TRACE EVERY GATE
============================================================

Instrument/log sanitized execution checkpoints if existing logs are insufficient.

Do NOT log portfolio confidential values unnecessarily.

Do NOT log tokens.

I want checkpoints such as:

TRACE_01_ROUTE_ENTERED=PASS

TRACE_02_ENGINE_RESOLVED=<actual engine>

TRACE_03_CONTEXT_LOADED=PASS/FAIL

TRACE_04_COMPANY_IDENTITY=PASS/FAIL

TRACE_05_CIK_RESOLUTION=PASS/FAIL

TRACE_06_STEP23_PRESENT=PASS/FAIL

TRACE_07_STEP24_PRESENT=PASS/FAIL

TRACE_08_ENGINE_BLOCKERS=<actual blockers>

TRACE_09_PRESET_LOAD=PASS/FAIL

TRACE_10_PRESET_VERIFIED=PASS/FAIL

TRACE_11_FIVE_INPUT_MAPPING=PASS/FAIL

TRACE_12_RUNNER_CLIENT_CREATED=PASS/FAIL

TRACE_13_AUTH_READY=PASS/FAIL

TRACE_14_REQUEST_CONSTRUCTED=PASS/FAIL

TRACE_15_HTTP_REQUEST_SENT=PASS/FAIL

TRACE_16_HTTP_RESPONSE_STATUS=<status/not reached>

TRACE_17_SSE_STREAM_STARTED=PASS/FAIL

TRACE_18_MODEL_RESPONSE_RECEIVED=PASS/FAIL

TRACE_19_EVIDENCE_PARSED=PASS/FAIL

TRACE_20_SCHEMA_VALIDATION=PASS/FAIL

TRACE_21_UI_RESPONSE_RETURNED=PASS/FAIL

Do not manufacture PASS.

============================================================
EXACT FAILURE LOCATION
============================================================

At the end I want ONE exact boundary.

For example:

FAILURE OCCURS BETWEEN:

TRACE_13_AUTH_READY
and
TRACE_15_HTTP_REQUEST_SENT

because:
<actual condition>

OR:

FAILURE OCCURS BETWEEN:

TRACE_09_PRESET_LOAD
and
TRACE_10_PRESET_VERIFIED

because:
...

No vague:

"Runner/Stylus issue"

No generic:

"external blocker"

Give exact:

FILE
FUNCTION
LINE/CONDITION if practical
VALUE/STATE causing failure
HTTP STATUS if applicable

============================================================
PHASE 4 — COMPARE ISOLATED PRESET VS RPR
============================================================

Create this comparison:

CHECK | ISOLATED PRESET | RPR STEP 2.5

Runner reachable
Authentication available
Client ID resolved
Preset complete
Five inputs known
Request constructed
Request sent
Runner accepted
Model started
SEC tool started
Web tool started
Response received

This comparison should tell us immediately which layer is responsible.

Examples:

If isolated preset PASS + RPR FAIL:
=> RPR integration/config defect.

If isolated preset FAIL auth + colleague app FAIL auth:
=> environment/auth issue.

If colleague app PASS + RPR auth FAIL:
=> RPR incorrectly reimplemented auth/config.

If Runner/auth PASS + preset rejected:
=> preset configuration issue.

If preset executes but RPR mapping fails:
=> five-input integration issue.

============================================================
PHASE 5 — FIX THE PROVEN ROOT CAUSE
============================================================

ONLY AFTER the trace identifies the exact cause should you modify code/configuration.

Use the smallest possible POC fix.

============================================================
IF AUTH IS THE PROBLEM
============================================================

FIRST compare with colleague app.

If colleague app already has a working approved authentication path:

REUSE IT.

Do not create a new authentication system.

If RPR_STEP25_RUNNER_CLIENT_ID was introduced only by our wrapper and the working colleague code obtains client ID differently:

remove/relax that unnecessary divergence and reuse the proven mechanism.

Do NOT ask the user to manually paste tokens.

============================================================
IF PRESET CONFIG IS THE PROBLEM
============================================================

Determine whether exact preset values already exist locally.

If they do:
use them.

If they do not:
STOP ONLY at that precise point and request ONE Stylus capture.

Do not ask for anything else.

Required one-time capture:

Stylus SEC + WEB
→ F12
→ Network
→ run preset
→ POST /runner-service/chat
→ Payload / Request Body

Need only non-secret body:

- model
- preset
- prompt
- toolConfig/tools
- knowledge
- inputs
- answers
- schema/output options
- other required body fields

NEVER request headers/tokens/cookies.

============================================================
IF RPR INPUT MAPPING IS THE PROBLEM
============================================================

Fix the mapping only.

Prove each exact preset input receives its intended actual RPR data.

Do NOT regenerate Step 2.3/2.4.

Use the actual confirmed upstream outputs.

============================================================
IF RUNNER REQUEST SHAPE IS THE PROBLEM
============================================================

Compare directly with colleague app's known-working Runner payload.

Match its proven outer request structure.

Do not invent a new request contract.

============================================================
PHASE 6 — DO NOT STOP AT THE FIRST FIX
============================================================

Once the first failure is fixed:

RUN THE TRACE AGAIN.

There may be another blocker behind it.

Continue sequentially:

failure 1
→ fix
→ rerun

failure 2
→ fix
→ rerun

until either:

A.
STEP 2.5 genuinely completes

or

B.
one genuine external dependency requiring a human action remains.

This is important:

DO NOT report success just because the current HTTP 409 disappears.

============================================================
SUCCESS DEFINITION
============================================================

Success means:

TRACE_01 through TRACE_21 complete sufficiently to produce a real Step 2.5 response.

Specifically:

REAL Step 2.2 company
PASS

REAL Step 2.3 context
PASS

REAL Step 2.4 context
PASS

EXACT SEC+WEB PRESET
PASS

RUNNER AUTH
PASS

RUNNER REQUEST SENT
PASS

SEC/WEB TOOL EXECUTION
PASS

REAL RESPONSE
PASS

EVIDENCE
PASS

SCHEMA
PASS

UI RESPONSE
PASS

============================================================
STRICT FEATURE QUALITY
============================================================

When it executes, do not accept low-quality assessment merely because the technical flow works.

The output must remain high quality:

- real evidence
- company-specific
- event-specific
- sector-specific
- credit-risk translation
- materiality
- direction
- relevant liquidity/leverage/refinancing/rating implications
- counter-thesis
- evidence gaps
- citations
- no fabricated facts

POC simplification applies to engineering only.

============================================================
DO THIS NOW
============================================================

Start with PHASE 1.

Before touching code, report in a concise table:

CURRENT STEP 2.5 STATE

Engine:
...

Run route:
...

Runner endpoint:
...

Runner client-id source:
...

Auth source:
...

Preset source:
...

Preset verified:
...

Exact five inputs known:
YES/NO

Step 2.3 present:
YES/NO

Step 2.4 present:
YES/NO

Current first blocker:
...

Then immediately perform:

1. isolated Runner connectivity test;
2. isolated auth test;
3. colleague Runner-path test;
4. isolated preset accessibility test;
5. actual /step25/run trace.

Do NOT ask me questions before performing all tests that can be performed locally.

Do NOT add architecture.

Do NOT create another planning document.

Do NOT stop at "READY".

TRACE IT, IDENTIFY THE EXACT FAILURE, FIX IT, AND RETEST.
