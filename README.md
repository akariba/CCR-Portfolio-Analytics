FINAL EXECUTION PROMPT — RPR STEP 2.5 REAL END-TO-END COMPLETION

You are now the implementation engineer for the existing RPR POC.

The objective is NOT further investigation, architecture discussion, reporting, or redesign.

THE OBJECTIVE IS:

1. restore Runner authentication using the EXISTING automatic refresh mechanism,
2. execute one REAL Step 2.5 SEC + Web assessment end-to-end,
3. verify that real Step 2.1 / 2.2 / 2.3 / 2.4 data reaches the verified Step 2.5 preset contract,
4. render the resulting assessment correctly in the RPR frontend,
5. preserve exact v31 visual/interaction conventions,
6. perform a quick consistency check of Step 2.2 portfolio fields, especially MLE,
7. stop only when the real browser Step 2.5 assessment can run successfully or one genuinely external blocker is proven.

DO NOT LOOP.

=========================================================
A. NON-NEGOTIABLE BUILDING-BONE RULE
=========================================================

The current working RPR implementation is the immutable backbone.

DO NOT:
- rewrite working modules,
- refactor for cleanliness,
- redesign architecture,
- replace working execution paths,
- remove legacy working paths,
- replace the Runner integration,
- rebuild authentication,
- introduce new frameworks,
- redesign Steps 1–2.4,
- rebuild v31,
- replace the existing Step 2.5 Stylus engine,
- replace company identity logic,
- replace evidence adapter logic,
- introduce another preset mechanism,
- introduce another token-management implementation.

Changes must be ADDITIVE or the smallest possible corrections to existing code.

The following are established building blocks and MUST be reused:

- FastAPI backend.
- existing Step 2 workflow.
- existing Step 2.1 confirmed scenario state.
- existing Step 2.2 portfolio selection.
- existing Step 2.3 confirmed Event-Driven factors.
- existing Step 2.4 confirmed Sector-Inherent factors.
- existing Step 2.5 router.
- existing `stylus_engine.py`.
- existing `stylus_runner_client.py`.
- existing `company_identity.py`.
- existing `stylus_evidence_adapter.py`.
- existing Runner/SSE implementation.
- existing Step 2.5 frontend append/wiring.
- existing v31 frontend visual baseline.
- existing Runner automatic token refresh/acquisition implementation.
- existing inline Stylus preset-definition approach.

DO NOT reopen previously resolved architecture decisions.

=========================================================
B. VERIFIED STEP 2.5 PRESET CONTRACT
=========================================================

The manually created Stylus preset is:

RPR 2.5 SEC + WEB – Financial Assessment

Model:
Claude Sonnet 5

Integrations:
- Web Search ENABLED
- SEC filings ENABLED

Knowledge:
- RPR_STEP25_FIELD_DICTIONARY
- pr_step25_secweb_output_schema_v1
  (stored/uploaded as supported text/knowledge format)

The verified preset has EXACTLY these six inputs:

1. CompanyContextJSON
2. ScenarioContextJSON
3. EventDrivenFactorsJSON
4. SectorInherentFactorsJSON
5. AssessmentASOFDATE
6. UserFeedback

Runner aliases/argument names already observed are approximately:

CompanyContextJSON        -> CompanyConte...
ScenarioContextJSON       -> ScenarioCont...
EventDrivenFactorsJSON    -> EventDrivenF...
SectorInherentFactorsJSON -> SectorInhere...
AssessmentASOFDATE        -> AssessmentAS
UserFeedback              -> UserFeedback

DO NOT change the preset design.

The code must conform to this contract.

=========================================================
C. CURRENT AUTH BLOCKER — USE EXISTING AUTO REFRESH
=========================================================

The last real Step 2.5 execution reached the Runner integration but was blocked by authentication:

STEP25_MODEL_AUTH_NOT_READY
HTTP 401
TOKEN_EXPIRED

An automatic Runner token refresh/acquisition implementation ALREADY EXISTS.

Examples of existing relevant building blocks include files such as:

- `fetch_runner_token.py`
- `runner_token_manager.py`
- existing Step 2.5 Runner auth/start scripts
- existing runtime credential/token files
- existing startup integration

FIRST ACTION:

DO NOT modify auth code.

Locate the EXISTING refresh/acquisition path and RUN IT.

Required sequence:

1. inspect existing Runner token manager only enough to identify the normal refresh entry point;
2. execute that normal refresh path;
3. confirm a fresh access token is obtained;
4. confirm Runner readiness returns ready;
5. immediately continue into the real Step 2.5 execution.

If the access token is expired but refresh succeeds:
    continue immediately.

If refresh itself fails:
    identify whether the stored refresh/session credential expired.

Only if the existing refresh credential itself is invalid may you perform the minimum one-time bootstrap already supported by this repository.

DO NOT:
- build a new refresh service,
- manually hard-code a bearer token,
- change auth architecture,
- spend time reverse engineering authentication that already works,
- request a new manual token before proving the existing refresh path cannot refresh.

Success condition for this phase:

RUNNER_AUTH_READY = true

Then move immediately to the assessment.

=========================================================
D. REAL INPUT SOURCES — NO TEST SUBSTITUTIONS
=========================================================

This run must use REAL current RPR workflow state.

NO:
- synthetic Apple fixture injected into production flow,
- Salesforce substitution,
- hardcoded sample factors,
- fake company mapping,
- manually-created Step 2.3/2.4 factors.

Use one eligible real Step 2.2 company.

A genuine Apple Step 2.2 record was previously verified, including a real CAGID and CIK resolution, so Apple may be used if still present and eligible.

Company identity resolution must remain:

Step 2.2 identifiers
→ real available company-name fields
→ existing CikResolver
→ SEC registrant confirmation.

No inference from event text or sector text.

=========================================================
E. SIX INPUTS — REQUIRED LIVE MAPPING
=========================================================

For the selected real company, verify and then PASS these values:

1. CompanyContextJSON

Must contain authoritative Step 2.2 company context available for the selected company.

Preserve actual fields where available, e.g.:

company_name
cagid
ticker
cik
country
MLE
industry L1/L2/L3
OSUC/exposure fields
current RRR
current classification
and any other legitimate Step 2.2 fields.

DO NOT fabricate absent values.

2. ScenarioContextJSON

Source:
confirmed Step 2.1 scenario.

Use the confirmed scenario state already stored by the application.

Do NOT generate a new scenario.

3. EventDrivenFactorsJSON

Source:
confirmed Step 2.3 factors for THIS company.

Preserve exactly:
factor_id
factor_name
weight
existing score/sign/input metadata
source step

Do not rename, merge, delete, invent, or move factors.

4. SectorInherentFactorsJSON

Source:
confirmed Step 2.4 factors for THIS company.

Same rules:
preserve exactly.

5. AssessmentASOFDATE

Use the Step 2.5 assessment as-of date selected in the application.

This is the hard evidence cutoff for the preset.

6. UserFeedback

Use latest applicable Step 2.5 analyst feedback if available.

If none exists, send an empty string or the existing supported neutral representation.

Do not invent analyst feedback.

=========================================================
F. STEP 2.5 OUTPUT CONTRACT
=========================================================

The preset should return the real Step 2.5 assessment conforming to the v1 output contract.

At minimum verify the returned assessment contains usable values for:

factor_assessments

including:
- factor_id
- factor_name
- source_step
- weight
- score
- direction
- impact_rating
- rationale
- evidence_ids

scoring:
- ed_score
- si_score
- composite_score
- residual_rating
- credit_impact_rating

credit conclusion:
- headline
- key_risk_driver
- current_rrr
- recommended_rrr_action
- current_class
- recommended_class_action
- confidence

evidence
evidence_gaps
analyst_questions

Do not substitute fixed placeholder scores.

Do not calculate fake RRR/classification recommendations when required source fields are genuinely absent.

=========================================================
G. SCORING / METHODOLOGY
=========================================================

Preserve the actual Step 2.5 methodology.

Event-Driven = 80%
Sector-Inherent = 20%

Factor-level assessment must come from the financial methodology/preset.

Composite values must derive from real returned factor scores.

Do NOT continue using previous upstream deterministic scores as the final Step 2.5 assessment result if the new preset returns the authoritative Step 2.5 factor scores.

Existing upstream scores may be input context only where required by the methodology.

=========================================================
H. FRONTEND — V31 IS THE ABSOLUTE DESIGN BASELINE
=========================================================

The frontend target is NOT "similar to v31".

It must follow v31 conventions as closely as possible using the existing Step 2.5 implementation.

Reference file:

`icm-pm-rapid-portfolio-review-v31.html`

Inspect v31 Step 2.5 directly before making frontend changes.

Do NOT redesign it.

Specifically preserve/match:

- Assessment Type cards
- Assessment Outcome — Portfolio Summary
- exact portfolio-table concept
- column sequence
- dark column header treatment
- filter row
- horizontal table behavior
- row expansion behavior
- ED Score
- SI Score
- Composite Score
- Residual Rating
- Credit Impact Rating
- Current RRR
- Recommended RRR Action
- Current Class
- Recommended Class Action
- Key Risk Driver
- Impact Rating Override
- User Credit Commentary
- Event-Driven factor detail panel under expanded row
- Sector-Inherent factor detail panel
- score badges
- action labels
- Export
- Confirm Assessment
- feedback panel
- spacing/density/layout conventions

DO NOT change Step 1 / 2.1 / 2.2 / 2.3 / 2.4 visual design while fixing Step 2.5.

Only make minimal Step 2.5 frontend changes required to render real assessment data.

=========================================================
I. PORTFOLIO DATA CONSISTENCY CHECK — ESPECIALLY MLE
=========================================================

While tracing the selected Step 2.2 record, perform ONE quick consistency check.

I have repeatedly observed that MLE appears blank for some portfolio records.

DO NOT create a large investigation.

Check:

1. source workbook/cache contains MLE for the selected company;
2. Step 2.2 backend parsing reads the correct MLE column;
3. MLE survives cache/database normalization;
4. Step 2.2 API returns MLE;
5. Step 2.5 CompanyContextJSON receives that same MLE;
6. frontend displays it where v31 expects it.

If MLE genuinely does not exist in source data:
    leave it blank / unavailable.

If MLE exists in source data but disappears through code:
    fix the smallest mapping bug.

Do the same sanity check for:
- company name
- CAGID
- country
- L1
- L2
- L3

Do NOT build a new portfolio-data subsystem.

=========================================================
J. EXECUTION ORDER — DO NOT DEVIATE
=========================================================

Follow exactly this order:

1. Existing auto-refresh/token acquisition
2. Runner readiness
3. Choose one eligible REAL Step 2.2 company
4. Confirm Step 2.1 scenario
5. Confirm Step 2.3 factors
6. Confirm Step 2.4 factors
7. Build exact six-input preset payload
8. Execute ONE real SEC + Web Runner assessment
9. Wait for Runner completion/SSE
10. Parse returned Step 2.5 v1 JSON
11. Store/map assessment into existing Step 2.5 state
12. Render real values in existing Step 2.5 frontend
13. Open browser Step 2.5
14. Run Assessment from browser
15. Expand assessed company row
16. visually verify ED/SI panels + scores + conclusion
17. compare Step 2.5 directly against v31
18. perform quick MLE/data consistency validation
19. STOP

=========================================================
K. ANTI-LOOP RULES
=========================================================

DO NOT spend another cycle generating investigation reports.

DO NOT repeatedly tell me:
"I am inspecting..."
"I am tracing..."
"I found..."
"I will next..."

Work silently through the implementation.

Do NOT create repeated TODO plans.

Do NOT stop after:
- syntax validation,
- unit tests,
- payload inspection,
- successful token refresh,
- successful HTTP 200,
- successful Runner execution,
- successful JSON parsing.

Those are intermediate milestones.

The target is BROWSER END-TO-END Step 2.5.

Do not run five different experiments.

Use one controlled real company and drive it to completion.

If a defect appears:
identify exact failing layer → apply smallest fix → retry from that layer.

No broad refactor.

Maximum one retry per individual fix before identifying the actual next failing layer.

=========================================================
L. STOP CONDITIONS
=========================================================

SUCCESS means ALL of these are true:

AUTH_REFRESH                         = PASS
RUNNER_READY                         = PASS
REAL_STEP22_COMPANY_USED             = PASS
STEP21_SCENARIO_USED                 = PASS
STEP23_CONFIRMED_FACTORS_USED        = PASS
STEP24_CONFIRMED_FACTORS_USED        = PASS
SIX_INPUT_CONTRACT_MATCH             = PASS
PRESET_EXECUTED                      = PASS
SEC_TOOL_EXECUTED                    = PASS
WEB_TOOL_EXECUTED                    = PASS
MODEL_RESPONSE_RECEIVED              = PASS
V1_JSON_PARSED                       = PASS
REAL_FACTOR_SCORES_RETURNED          = PASS
ED_SCORE_RETURNED                    = PASS
SI_SCORE_RETURNED                    = PASS
COMPOSITE_SCORE_RETURNED             = PASS
CREDIT_CONCLUSION_RETURNED           = PASS
UI_RESULT_RENDERED                   = PASS
ED_DETAIL_PANEL_RENDERED             = PASS
SI_DETAIL_PANEL_RENDERED             = PASS
V31_STEP25_LAYOUT_PARITY             = PASS
MLE_DATA_PATH_CHECKED                = PASS

Only then FINAL_STATUS = PASS.

=========================================================
M. EXTERNAL BLOCKER RULE
=========================================================

If execution is impossible because of something genuinely outside the repository, stop only after proving it.

Examples:
- refresh/session credential revoked,
- enterprise Runner service unavailable,
- SEC integration unavailable,
- corporate authentication requires an interactive action unavailable from VS Code.

Then report ONLY:

BLOCKER:
EXACT_LAYER:
EXACT_ERROR:
WHAT_ALREADY_WORKS:
ONE_USER_ACTION_REQUIRED:

Do not produce another architecture proposal.

=========================================================
N. FINAL RESPONSE — KEEP IT SHORT
=========================================================

I do NOT want a long implementation diary.

After execution give only:

FINAL_STATUS = PASS / BLOCKED

COMPANY =
AUTH_REFRESH =
RUNNER_STATUS =
STEP21_SCENARIO =
STEP23_FACTORS =
STEP24_FACTORS =
PRESET_EXECUTED =
SEC_EXECUTED =
WEB_EXECUTED =
MODEL_RESPONSE =
FACTOR_COUNT =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =
UI_RENDERED =
V31_PARITY =
MLE_CHECK =

FILES_CHANGED:
- only files actually modified

If BLOCKED:
ONE_REQUIRED_ACTION =

START NOW.

FIRST EXECUTE THE EXISTING RUNNER AUTO-REFRESH PATH.

DO NOT SEND ME ANOTHER PLAN BEFORE EXECUTING.
