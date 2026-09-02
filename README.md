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

STEP 2.5 — EXECUTE THE SINGLE PROVEN FIX NOW

We have now isolated the first real blocker.

PROVEN STATE FROM THE LAST REAL RUN:

CONTEXT_HTTP = 200
RUNNER_AUTH = PASS
RUNNER_STREAM = OPEN / HTTP 200
SEC = PASS
WEB = PASS
LAST_SUCCESSFUL_CHECKPOINT = CP-N / Web Search tool event
MODEL_FINAL_EVENT = NOT RECEIVED
/run therefore never returns.

STOP INVESTIGATING OTHER AREAS.

Do not touch:
- preset configuration
- six-input contract
- SEC integration
- Web integration
- company identity logic
- Step 2.1–2.4
- token/bootstrap code
- scoring methodology
- v31 frontend yet

Implement ONLY bounded completion handling in the EXISTING Runner SSE path.

CRITICAL SAFETY RULE:
DO NOT synthesize, infer, or manufacture a Step 2.5 assessment from SEC/Web tool events.

Required behaviour:

1. Continue using the same Runner request and same SSE session.

2. Keep accumulating all genuine assistant/model response content already emitted by Runner.

3. After SEC/Web tool execution completes, continue waiting for the genuine final model response for a bounded grace period.

4. If a proper final model event arrives:
   - parse it using the existing Step 2.5 parser
   - validate against the Step 2.5 schema
   - persist assessment
   - return HTTP 200 normally.

5. IMPORTANT:
   If Runner fails to emit its formal terminal event BUT the accumulated genuine model-content buffer already contains a complete schema-conformant Step 2.5 JSON object:
   - extract that actual model-generated JSON
   - validate it
   - finalize normally.
   This is recovery of genuine model output, NOT generation of fallback assessment data.

6. If there is still no complete genuine model output after the bounded grace period:
   terminate cleanly with a controlled error such as:

   STEP25_MODEL_FINAL_TIMEOUT

   Include:
   - run_id
   - workflow_id
   - last_runner_event
   - SEC executed=true
   - WEB executed=true

   Do NOT leave /run hanging indefinitely.

7. Do not launch another Runner request.
   Do not retry the whole assessment.
   Do not create parallel polling loops.
   One request, one bounded stream lifecycle.

8. Keep the timeout sufficiently long for this heavy SEC+Web assessment.
   Reuse the existing Step 2.5 timeout configuration rather than introducing arbitrary short constants.

9. Remove/disable temporary excessive polling/debug instrumentation once this is proven.

THEN RUN EXACTLY ONE REAL APPLE ACCEPTANCE TEST.

Acceptance sequence:

CONTEXT_HTTP = 200
RUNNER_AUTH = PASS
SEC = PASS
WEB = PASS

Then one of only two legitimate outcomes is allowed:

A)
MODEL_OUTPUT = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS
ED_SCORE = populated
SI_SCORE = populated
COMPOSITE_SCORE = populated
RESIDUAL_RATING = populated
CREDIT_IMPACT = populated
RUN_HTTP = 200

OR

B)
STEP25_MODEL_FINAL_TIMEOUT
with the exact last Runner event reported.

If outcome A occurs, STOP backend investigation immediately.
Proceed directly to rendering the real output in Step 2.5 using the exact v31 frontend design.

Do not produce another long diagnostic report.
Implement → run once → report the actual result.
