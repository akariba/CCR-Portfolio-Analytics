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

STOP THE COMMENTARY / POLLING LOOP.

Stay on the SAME currently active acceptance run.
DO NOT launch another /run.
DO NOT change code.
DO NOT change preset.
DO NOT touch frontend.

We only need the next concrete execution result.

The previous proven run reached:
SEC=true
WEB=true
last_runner_event=tool_call:preset_rpr_step25

The current run currently only shows:
RUNNER_AUTH=PASS
everything else=pending.

Do not keep giving me periodic "still running" updates.

Wait for THIS SAME execution until ONE of these occurs:

1. A real Runner event advances the lifecycle.
2. The bounded timeout terminates the request.
3. The request completes successfully.

Then report ONLY:

RUNNER_AUTH =
FIRST_RUNNER_EVENT =
PRESET_TOOL_CALLED =
PRESET_TOOL_COMPLETED =
TOOL_RESULT_RETURNED_TO_MODEL =
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

If it fails, report only:

FIRST_FAILED_PROTOCOL_STAGE =
LAST_RUNNER_EVENT =
EXACT_ERROR =
ELAPSED_SECONDS =
CONFIGURED_TIMEOUT_SECONDS =

CRITICAL:
If the configured bounded timeout is exceeded and the process is still alive,
report:

BOUNDED_TIMEOUT_NOT_EFFECTIVE

and STOP.

No more investigation.
No more code edits.
No second run.
No architecture report.
No repeated polling narrative.
