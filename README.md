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




RPR STEP 2.5 — STOP ALL OTHER WORK. ROOT-CAUSE AND FIX THE RUNNER SSE / FINAL-OUTPUT HANDOFF.

We now have enough evidence to isolate the problem.

DO NOT modify:
- Step 2.1
- Step 2.2
- Step 2.3
- Step 2.4
- step23.html layout
- v31 UI
- eligibility logic
- company identity logic
- CIK resolution logic
- Stylus preset prompt
- Step 3a methodology
- Step 3a thresholds
- SEC/Web configuration
- output schema
- scoring
- token-refresh architecture

Do not run another assessment yet.

CURRENT PROVEN STATE
====================

The refreshed forensic audit proves:

CONTEXT / CIK resolution = working
RUNNER_AUTH = PASS
Runner Service is reached
token refresh = working
backend process = alive
frontend request reaches backend

The previous hard NO_CONFIRMED_SEC_REGISTRANT block has already been removed for the POC path.

The same remaining failure has now occurred on FOUR real executions.

The failure is:

    Runner Service stream ended without final model text content

Important:

This failure occurred for:
- companies with unresolved CIK
- AND Apple, where CIK was confirmed

Therefore DO NOT investigate CIK/identity as the cause.

The latest Canaccord run again reached Runner successfully and failed at the same Runner SSE/final-output stage.

JSON parsing/schema validation/persistence are not reached because final model content is never handed from runner_client into stylus_engine.

THIS IS NOW THE ONLY PRIMARY BLOCKER.

==========================================================
CRITICAL CLUE — RUNNER MAY NOT RETURN THE RESULT AS "TEXT"
==========================================================

Earlier we captured a REAL successful Runner/StyIus response from the browser.

Its message structure included content resembling:

message:
  parts:
    [
      {
        "data": "...",
        "data_type": 1,
        "mime_type": "json",
        "name": "AAPL_Step2.5_Assessment.json",
        ...
      }
    ]

In other words, the successful Step 2.5 model result may be transported as:

    message.parts[].data

with JSON/artifact metadata,

rather than as a traditional:

    message.parts[].text

or other text field.

This means the current error:

    "stream ended without final model text content"

may be caused by our client looking only for one representation of final model output.

DO NOT ASSUME THIS IS THE ROOT CAUSE.

PROVE IT FROM THE RAW SSE CAPTURES FIRST.

==========================================================
TASK 1 — READ THE EXISTING RAW SSE CAPTURES
==========================================================

Do NOT launch another Runner execution.

Inspect the existing files under:

backend/data/step25_runs/_debug_raw/

especially the raw SSE captures corresponding to:

1. the Apple failure after backend restart
2. the Canaccord failure
3. the Panmure failure
4. the latest Canaccord failure

Identify the actual event sequence.

For EVERY SSE event, report internally:

sequence number
event/type if present
top-level JSON keys
message role if present
parts count
part keys
tool_call if present
tool_response if present
text field presence
data field presence
mime_type
data_type
artifact/name if present
workflow/status fields
terminal/completion indicator

Do not paste credentials or bearer tokens.

I need you to answer:

A. Did the Runner actually return final model content?
B. If yes, exactly where is that content located?
C. If no, did the model/tool execution itself fail upstream?
D. Does our parser stop before all events are consumed?
E. Does our parser reject a valid structured JSON/artifact final response because it is not plain text?

==========================================================
TASK 2 — COMPARE WITH THE KNOWN-WORKING app.py IMPLEMENTATION
==========================================================

This is extremely important.

My colleague's app.py / Swagger implementation is known to work with the same corporate Runner infrastructure.

Find the known-working app.py that has already been used in this project/workspace.

READ IT.

Do not rewrite it.

Compare its Runner invocation and response-consumption logic line-by-line against:

    backend/step25/runner_client.py

Specifically compare:

request URL
HTTP method
request body
preset representation
headers
Accept header
Content-Type
stream=True or equivalent
timeout behavior
SSE/event parsing
blank-line handling
data: prefix handling
multi-line SSE event handling
JSON decoding
workflow_id handling
message handling
parts handling
tool_call handling
tool_response handling
terminal-event handling
final-result extraction
connection-close behavior

Our rule is:

KNOWN WORKING CODE IS THE BUILDING BONE.

If app.py already handles the Runner protocol correctly, COPY/ADAPT THE MINIMUM WORKING TRANSPORT/PARSING BEHAVIOR.

Do not invent a new framework.

==========================================================
TASK 3 — AUDIT _stream_sse() / CURRENT RUNNER PARSER
==========================================================

Inspect the exact implementation responsible for:

    Runner Service stream ended without final model text content

Find the condition that raises this message.

Trace what values it has collected before raising.

I particularly want you to determine whether it currently only accepts something equivalent to:

    part["text"]

while ignoring valid content such as:

    part["data"]

or:

    message.parts[].data

or JSON MIME/artifact parts.

Also inspect whether it assumes:

    one physical HTTP line == one complete SSE event

That is unsafe if the server sends proper SSE framing or multi-line data fields.

Do not change anything until you can state the exact failure mechanism.

==========================================================
TASK 4 — DEFINE THE VALID FINAL-OUTPUT CONTRACT
==========================================================

A valid final Step 2.5 Runner result may only be accepted from a genuine final assistant/model message.

Do NOT accidentally treat:
- SEC tool responses
- Web Search tool responses
- intermediate tool payloads
- status messages
- workflow metadata

as the final model assessment.

Final-output extraction should support the REAL Runner protocol observed in the captures.

Expected precedence should roughly be:

1. genuine final assistant/model textual content, if supplied;

otherwise

2. genuine final assistant/model structured part containing JSON data,
   e.g. message.parts[].data with an appropriate JSON MIME/data type;

otherwise

3. whatever equivalent genuine final-result representation is PROVEN by
   the working app.py / raw successful Runner traffic.

Do not implement speculative formats that we have never observed.

The returned value handed to stylus_engine must ultimately be the raw Step 2.5 JSON assessment content so the EXISTING parser/schema validation continues unchanged.

==========================================================
TASK 5 — SSE FRAMING
==========================================================

Verify whether runner_client currently implements real SSE framing correctly.

SSE events are separated by an empty line.

An event may contain multiple "data:" lines.

HTTP/TCP chunk boundaries must NOT be interpreted as logical event boundaries.

If the existing implementation parses every physical iter_lines() entry independently and this differs from the known-working app.py or the actual Runner stream, fix only that parsing defect.

Maintain heartbeats/comments safely.

Do not terminate merely because one event contains no text.

Do not terminate merely because a tool call completed.

Wait for the genuine workflow/model terminal condition established from the real Runner protocol.

==========================================================
TASK 6 — IMPLEMENT THE MINIMUM FIX
==========================================================

ONLY after Tasks 1–5 establish the root cause:

Implement the smallest possible correction in:

    backend/step25/runner_client.py

and only another file if genuinely necessary.

Do not modify Stylus analytical behavior.

Do not modify the preset.

Do not modify Step 3a.

Do not modify the schema.

Do not modify frontend behavior in this task.

Preserve all existing:
- authentication
- token cache
- token refresh
- timeout
- retry
- HTTP status handling
- tool observation
- diagnostics

unless a specific line is proven to be causing this protocol defect.

==========================================================
TASK 7 — TEST USING EXISTING RAW CAPTURES FIRST
==========================================================

Before making another network/model call, create a small local parser regression test using the EXISTING raw SSE dumps.

Feed the captured failing stream into the corrected parsing/extraction logic.

If the raw stream actually contains the final JSON artifact:

the parser MUST recover it.

Then feed it through the existing Step 2.5 JSON/schema parsing logic.

Expected:

MODEL_FINAL_RESPONSE = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS

If the raw SSE dump genuinely does NOT contain final model content, STOP.

Do not fabricate it.

Instead state that the failure is upstream in the Runner/model execution and show the last genuine Runner event.

==========================================================
TASK 8 — ONE LIVE ACCEPTANCE RUN ONLY AFTER LOCAL PROOF
==========================================================

Only if the existing raw-capture regression proves our parser was wrong:

restart the backend once if required.

Then execute ONE real acceptance run.

Prefer Apple first if it remains available because Apple has a confirmed CIK and removes identity resolution as a test variable.

Expected chain:

CONTEXT_HTTP = 200
RUNNER_AUTH = PASS
PRESET_TOOL_CALLED = PASS
PRESET_TOOL_COMPLETED = PASS
SEC = PASS
WEB = PASS
MODEL_FINAL_RESPONSE = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS
ED_SCORE = populated
SI_SCORE = populated
COMPOSITE_SCORE = populated
RESIDUAL_RATING = populated
CREDIT_IMPACT = populated
ASSESSMENT_PERSISTED = PASS
RUN_HTTP = 200

Only after this succeeds may you say Step 2.5 backend is repaired.

==========================================================
TASK 9 — THEN LEAVE IT READY FOR MY UI TEST
==========================================================

Do not perform repeated UI runs.

Once the backend acceptance succeeds:

leave the backend running
leave token refresh running
leave step23.html unchanged unless a separate UI defect still demonstrably exists

Tell me exactly which company I should select.

I will personally perform the final Step 2.1 → 2.5 browser test.

==========================================================
VERY IMPORTANT — DO NOT CHASE THESE NOW
==========================================================

Do NOT spend time on:

- unresolved CIK for Canaccord
- port 8000 vs 8001 unless actual connectivity fails
- SEC production-mode flags
- Web production-mode flags
- Step 3a knowledge upload
- Stylus live-vs-local preset synchronization
- v31 cosmetic differences
- Step 2.2 pagination
- exposure fields
- score thresholds
- RRR/classification
- CAM paths

They are NOT the current first failure.

The first failure is Runner final-output handoff.

==========================================================
FINAL RESPONSE FORMAT
==========================================================

Return ONLY:

ROOT_CAUSE =
RAW_SSE_CONTAINS_FINAL_MODEL_RESULT = YES/NO
FINAL_RESULT_ACTUAL_LOCATION =
CURRENT_PARSER_EXPECTED_LOCATION =
APP_PY_WORKING_BEHAVIOR =
SSE_FRAMING_BUG = YES/NO
STRUCTURED_DATA_PART_BUG = YES/NO
FILES_CHANGED =
LOCAL_RAW_STREAM_REGRESSION = PASS/FAIL
LIVE_RUN_EXECUTED = YES/NO
RUNNER_AUTH =
PRESET_TOOL_CALLED =
PRESET_TOOL_COMPLETED =
SEC =
WEB =
MODEL_FINAL_RESPONSE =
JSON_PARSED =
SCHEMA_VALID =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =
ASSESSMENT_PERSISTED =
RUN_HTTP =
READY_FOR_USER_UI_TEST = YES/NO

If READY_FOR_USER_UI_TEST = NO:

FIRST_REMAINING_BLOCKER =
EXACT_LAST_RUNNER_EVENT =
NEXT_MINIMUM_ACTION =

STOP THERE.
