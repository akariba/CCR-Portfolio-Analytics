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

STEP 2.5 — FIX THE RUNNER TOOL-CALL HANDOFF, THEN EXECUTE

We now have a clean and conclusive result from the previous change:

CONTEXT_HTTP = 200
RUNNER_AUTH = PASS
SEC = true
WEB = true
RUN_HTTP = 422
ERROR = STEP25_MODEL_FINAL_TIMEOUT
LAST_RUNNER_EVENT = tool_call:preset_rpr_step25

The bounded timeout implementation is PROVEN and must remain.

DO NOT change:
- the Step 2.5 preset
- the six-input contract
- the Step 3a methodology
- the output schema
- SEC logic
- Web logic
- company identity logic
- Step 2.1–2.4
- frontend/v31 yet
- scoring rules
- token/bootstrap unless absolutely required by the same Runner continuation protocol

STOP treating this as a timeout problem.

The key evidence is:
last_runner_event = tool_call:preset_rpr_step25

This strongly suggests that our local Runner client reaches the preset tool-call stage but does not complete the protocol transition from TOOL CALL -> TOOL RESULT/COMPLETION -> FINAL ASSISTANT RESPONSE.

GO DIRECTLY TO THIS PROTOCOL HANDOFF.

AUTHORITATIVE LOCAL REFERENCES TO USE

1. The colleague's known-working app.py Runner implementation already present in the project.
2. Existing raw Runner SSE captures/logs.
3. Current stylus_runner_client.py.
4. Current stylus_engine.py.
5. Current preset invocation implementation.

Do NOT start another broad repository investigation.

TASK 1 — TRACE THE EXACT TOOL LIFECYCLE

For the existing Step 2.5 request, identify the exact sequence around:

tool_call:preset_rpr_step25

Determine whether Runner then requires one of these:
- a tool result event to be posted back,
- a continuation/resume request,
- a conversation/workflow ID continuation,
- or whether the Runner service itself is supposed to execute and resume automatically.

Compare this directly with the known-working app.py implementation.

Do not guess.

TASK 2 — IMPORTANT CORRECTION TO THE PREVIOUS RULE

“One request” means ONE LOGICAL STEP 2.5 ASSESSMENT.

It does NOT mean artificially forbidding a protocol-mandated continuation request if Runner's tool-calling contract requires one.

If the working Runner protocol requires:

initial model request
-> preset tool_call
-> tool execution/result
-> continuation/resume
-> final assistant response

then implement exactly that lifecycle.

This is NOT considered a second assessment.

It must:
- keep the same logical conversation/workflow
- keep the same run_id where supported
- never restart SEC/Web discovery from zero
- never create a parallel assessment
- never synthesize model output

TASK 3 — MINIMAL IMPLEMENTATION ONLY

Patch only the existing Runner client/orchestration necessary to correctly complete the tool-call lifecycle.

Preserve the already implemented:
STEP25_MODEL_FINAL_TIMEOUT

The timeout remains the final safety guard.

Do NOT create new architecture or helper frameworks.

TASK 4 — PRESET RESULT

When preset_rpr_step25 completes, capture its genuine returned result.

If Runner requires that result to be supplied back to the assistant/model, do so using the exact protocol expected by Runner.

Then continue consuming the resulting SSE stream until the genuine final model response arrives.

Do NOT generate or repair an assessment locally.

TASK 5 — FINAL RESPONSE

The genuine final model response must then go through the existing path:

model output
-> JSON extraction
-> Step 2.5 schema validation
-> scoring fields
-> persistence
-> /run HTTP 200

Required fields:

scoring.ed_score
scoring.si_score
scoring.composite_score
scoring.residual_rating
scoring.credit_impact_rating

TASK 6 — RUN EXACTLY ONE REAL APPLE ACCEPTANCE EXECUTION

After implementing the protocol fix, fetch/use a fresh valid token if required and run ONE Apple assessment.

Report ONLY:

RUNNER_AUTH =
PRESET_TOOL_CALLED =
PRESET_TOOL_COMPLETED =
TOOL_RESULT_RETURNED_TO_MODEL =   [if protocol requires it]
MODEL_FINAL_RESPONSE =
JSON_PARSED =
SCHEMA_VALID =
SEC =
WEB =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =
RUN_HTTP =

SUCCESS CONDITION:

RUN_HTTP = 200
MODEL_FINAL_RESPONSE = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS
and all five scoring fields populated.

If it fails, report only:

FIRST_FAILED_PROTOCOL_STAGE =
EXACT_RUNNER_EVENT =
EXACT_ERROR =

and STOP.

NO LONG DIAGNOSTIC REPORT.
NO SECOND ACCEPTANCE RUN.
NO PRESET EDIT.
NO FRONTEND WORK YET.

IMPLEMENT -> ONE RUN -> RESULT.
