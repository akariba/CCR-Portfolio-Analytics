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

CONTINUE THE CURRENT SINGLE EXECUTION ONLY — NO NEW RUN

Do not start another /run.
Do not modify any code while this current acceptance execution is active.
Do not investigate another subsystem.
Do not poll repeatedly with new requests.

The bounded completion change has been implemented. Now simply allow the existing single /run request to reach its legitimate terminal outcome.

I require exactly one of these:

SUCCESS

RUN_HTTP = 200
RUNNER_AUTH = PASS
SEC = PASS
WEB = PASS
MODEL_OUTPUT = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS
ED_SCORE = <value>
SI_SCORE = <value>
COMPOSITE_SCORE = <value>
RESIDUAL_RATING = <value>
CREDIT_IMPACT = <value>

OR CONTROLLED FAILURE

STEP25_MODEL_FINAL_TIMEOUT
run_id = ...
workflow_id = ...
last_runner_event = ...
SEC = true
WEB = true

CRITICAL: The existing timeout/grace implementation must itself terminate the request. Do not manually kill the request before that timeout.

If the request continues past the configured bounded timeout, then report:

BOUNDED_TIMEOUT_NOT_EFFECTIVE
configured_timeout = ...
elapsed_time = ...
exact blocking function/line = ...

and STOP.

Do not produce another architecture report.
Do not inspect the preset.
Do not change Step 2.1–2.4.
Do not touch frontend.
Do not touch auth.
Do not launch a second test.

Wait for this one run and report only its terminal result.
