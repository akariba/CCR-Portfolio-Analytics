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



STEP 2.5 — EXECUTE NOW WITH THE FRESH RUNNER TOKEN

I have just copied a fresh Runner bearer token from the working Stylus browser
/runner-service/chat request into my Windows clipboard.

DO NOT ask me to paste the token into chat.
DO NOT print, log, echo, expose, or persist the token anywhere unnecessarily.

CURRENT PROVEN STATE — DO NOT REOPEN:

- Step 2.5 preset configuration is correct.
- The reduced/current preset and both knowledge files are frozen.
- Six-input mapping is confirmed correct.
- CONTEXT_HTTP previously = 200.
- The genuine runner_client.py _stream_sse tuple-return bug was identified and minimally fixed.
- The last run failed only because the cached bearer token was expired.
- Cached refresh-token exchange is currently unreliable/expired and MUST NOT become another investigation.
- run_step25_with_fresh_token.ps1 is the already-proven fresh-token execution mechanism.

EXECUTE, DO NOT INVESTIGATE.

1. Read the fresh bearer token from the Windows clipboard using the EXISTING
   run_step25_with_fresh_token.ps1 mechanism.

2. Use it only for the current Runner authentication state expected by the existing code.

3. Restart the backend if required so the fresh token is loaded into memory.

4. Run EXACTLY ONE real Apple Step 2.5 acceptance execution.

5. Do NOT:
   - change the preset;
   - change either knowledge file;
   - change the six-input contract;
   - change SEC;
   - change Web Search;
   - change Step 2.1–2.4;
   - change company identity;
   - redesign authentication;
   - attempt to repair automatic refresh now;
   - start multiple /run calls;
   - refactor unrelated code;
   - inspect architecture;
   - produce another long diagnostic report.

6. Preserve the minimal runner_client.py tuple-return correction already made.
   Do not undo it.

7. For this one run report ONLY:

CONTEXT_HTTP =
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
RUN_HTTP =

If there is a failure, report only:

FIRST_FAILED_STAGE =
EXACT_ERROR =
LAST_RUNNER_EVENT =

Then STOP.

SUCCESS CONDITION:

RUNNER_AUTH = PASS
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
RUN_HTTP = 200

If this succeeds, STOP all Step 2.5 backend investigation immediately.
Do not make further backend changes.





IMPLEMENT -> RUN ONCE -> REPORT RESULT.
