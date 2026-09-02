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





  STEP 2.5 — USE THE NOW-PROVEN STYLUS CONTRACT AND GET THE RPR RUN WORKING

IMPORTANT: We now have a successful manual Stylus execution.

DO NOT investigate architecture again.
DO NOT redesign Step 2.5.
DO NOT touch Runner SSE completion logic again.
DO NOT touch token/bootstrap logic.
DO NOT touch SEC integration.
DO NOT touch Web Search integration.
DO NOT touch company identity resolution.
DO NOT touch Steps 2.1–2.4.
DO NOT touch frontend yet.
DO NOT refactor working code.

THE MANUAL STYLUS PRESET IS NOW A FROZEN WORKING BASELINE.

The successful Stylus execution returned a genuine schema-conformant Step 2.5 JSON with:

ED-1 score = 2.5
ED-2 score = 3.5
SI-1 score = 3.0

scoring.ed_score = 3.07
scoring.si_score = 3.00
scoring.composite_score = 3.06

and populated residual_rating / credit_impact_rating.

Therefore the preset design, SEC/Web retrieval, scoring methodology and output structure are proven.

The previous backend execution had already achieved:

RUNNER_AUTH = PASS
PRESET_TOOL_CALLED = PASS
PRESET_TOOL_COMPLETED = PASS
TOOL_RESULT_RETURNED_TO_MODEL = PASS
SEC = PASS
WEB = PASS
MODEL_FINAL_RESPONSE = PASS
JSON_PARSED = PASS
SCHEMA_VALID = PASS
RUN_HTTP = 200

but the five final scoring fields were blank.

That is the ONLY issue to resolve now.

==================================================
SOURCE OF TRUTH
==================================================

The latest validated local Step 2.5 knowledge files are:

preset_knowledge/RPR_STEP25_FIELD_DICTIONARY.md

and the latest Step 2.5 output-schema knowledge file
(the pr_step25_secweb_output_schema_v1 text file that has just been updated).

These files now contain the validated mandatory-scoring contract.

The working Stylus preset still has exactly six inputs:

CompanyContextJSON
ScenarioContextJSON
EventDrivenFactorsJSON
SectorInherentFactorsJSON
AssessmentASOFDATE
UserFeedback

The first five are required.
UserFeedback is optional.

DO NOT rename these fields.

==================================================
TASK 1 — ALIGN INLINE BACKEND PRESET ONLY
==================================================

The RPR backend uses the existing INLINE full Stylus preset definition rather than calling the saved preset by UUID.

Inspect the existing inline preset definition, currently under the existing preset_knowledge / STYLUS_SEC_WEB_PRESET_DEFINITION configuration path.

Make ONLY the minimal changes necessary so the backend inline definition implements the same validated contract as the successful manual Stylus preset.

In particular ensure the inline prompt/output instructions require:

scoring.ed_score
scoring.si_score
scoring.composite_score
scoring.residual_rating
scoring.credit_impact_rating

For a successfully assessed set of Step 2.3 / Step 2.4 factors these five fields MUST be populated.

ED_SCORE:
normalized weighted result of confirmed Step 2.3 factors.

SI_SCORE:
normalized weighted result of confirmed Step 2.4 factors.

COMPOSITE_SCORE:
(ED_SCORE * 0.80) + (SI_SCORE * 0.20)

Preserve supplied factor weights.

Do NOT use upstream placeholder scores as the final Step 2.5 assessment.

Do NOT invent evidence.

Do NOT turn evidence gaps into blank aggregate scores when factor assessments were successfully completed.

Do not make unrelated prompt changes.

==================================================
TASK 2 — VERIFY SIX INPUT MAPPING
==================================================

Confirm the existing backend passes EXACTLY:

CompanyContextJSON -> CompanyConte...
ScenarioContextJSON -> ScenarioCont...
EventDrivenFactorsJSON -> EventDrivenF...
SectorInherentFactorsJSON -> SectorInhere...
AssessmentASOFDATE -> AssessmentAS...
UserFeedback -> UserFeedback

Use the existing verified implementation.

Do not introduce another adapter or translation framework.

==================================================
TASK 3 — ONE REAL BACKEND RUN
==================================================

Fetch/use the working fresh Runner token through the already-proven mechanism.

Restart the backend if required so the fresh token and updated inline preset definition are loaded.

Then run EXACTLY ONE real Apple Step 2.5 execution.

Use the already-working real Step 2.2 Apple record and current confirmed Step 2.1 / 2.3 / 2.4 state.

Do not launch multiple tests.

Do not run parallel diagnostics.

Do not spend time producing architecture reports.

==================================================
MANDATORY ACCEPTANCE RESULT
==================================================

Report only:

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

PASS requires all five scoring values to be populated.

If PASS:
STOP backend investigation immediately.

Do not optimize it.
Do not refactor it.
Do not rerun it repeatedly.

The successful implementation becomes part of the frozen RPR backbone.

Then proceed to Step 2.5 frontend rendering using the existing v31 implementation as the STRICT visual reference.

If FAIL:
report ONLY:

FIRST_FAILED_STAGE =
EXACT_ERROR =
ACTUAL_MODEL_SCORING_OBJECT =

and STOP.

No long diagnostic report.
No speculative architecture changes.
No looping.

IMPLEMENT -> RUN ONCE -> REPORT RESULT.
]

AssessmentASOFDATE

2026-09-02
