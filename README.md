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

The Stylus Step 2.5 preset has now been manually corrected so the five final scoring fields are explicitly mandatory and non-null whenever ED/SI factors are assessable.

Runner authentication is already proven working with the fresh bearer token. Do not reopen authentication investigation. Do not work on auto-refresh. Do not produce another diagnostic report.

Execute the target now.

Preserve every existing working Step 1–2.4 building block.
Preserve the completed six-input Step 2.5 contract.
Preserve SEC + Web execution.
Run one real Step 2.5 assessment immediately using the current fresh .runner_token.
Verify:
HTTP 200
SEC executed
Web executed
ED factor assessments returned
SI factor assessments returned
ed_score populated
si_score populated
composite_score populated
residual_rating populated
credit_impact_rating populated
key risk driver/conclusion populated
Render the real results in Step 2.5.
Compare Step 2.5 visually against v31 itself, not against an approximation. Preserve v31 column ordering, table structure, expandable ED/SI factor sections, scoring presentation, actions, commentary area, spacing and existing RPR styling. Do not redesign.
Do not fix the unrelated Step 2.2 MLE source-data issue during this execution. Record it separately only.

STRICT STOP CONDITION: continue directly until either the real Step 2.5 assessment is rendered successfully in the browser or one concrete external failure prevents execution. No architecture work, no refactoring, no speculative loops, no additional reports before attempting the run.
