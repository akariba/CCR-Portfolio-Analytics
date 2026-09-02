RPR STEP 2.5 — FINAL INTEGRATION OF THE NEW VERIFIED PRESET CONTRACT

We now have a manually created and manually validated Stylus preset for the real Step 2.5 SEC+Web assessment.

DO NOT redesign the preset. DO NOT create another preset. DO NOT change Steps 1, 2.1, 2.2, 2.3 or 2.4. DO NOT refactor working code. Preserve the existing RPR backbone and v31 frontend.

Your job now is to integrate the existing Step 2.5 Runner/backend path with the exact verified preset contract below and get one genuine end-to-end Step 2.5 browser execution working.

VERIFIED PRESET

Name:
RPR 2.5 SEC + WEB – Financial Assessment

Version:
4

Model:
Claude Sonnet 5

Integrations:

Web Search = ON
SEC filings = ON
all others OFF

Do not depend on a saved preset UUID unless the current proven Runner architecture already requires it. Our accepted POC architecture is the existing inline Runner/preset-definition path. Mirror the verified preset definition into that existing path rather than inventing a new integration architecture.

EXACT INPUT CONTRACT

The visible field names and the actual internal argument names are different.

Map them EXACTLY:

CompanyContextJSON       -> CompanyConte      REQUIRED
ScenarioContextJSON      -> ScenarioCont      REQUIRED
EventDrivenFactorsJSON   -> EventDrivenF      REQUIRED
SectorInherentFactorsJSON-> SectorInhere      REQUIRED
AssessmentASOFDATE       -> AssessmentAS      REQUIRED
UserFeedback             -> UserFeedback      OPTIONAL

This distinction is critical.

We already observed a platform template failure when the prompt attempted to reference AssessmentASOFDATE; the successfully inserted preset variable is AssessmentAS.

Do not rename these internal arguments.

VERIFIED BUSINESS INPUT

The application must build these automatically from the RPR workflow:

CompanyConte

selected/confirmed Step 2.2 company
company name
CAGID where available
ticker if resolved
CIK if resolved
existing current RRR/current class only if actually available
never fabricate missing identity fields

ScenarioCont

confirmed Step 2.1 scenario
assessment horizon
confirmed scenario narrative/context

EventDrivenF

ONLY confirmed Step 2.3 factors for that company
preserve factor_id
factor_name
source_step
weight
existing supplied score/direction fields where applicable
do not rename, merge or invent factors

SectorInhere

ONLY confirmed Step 2.4 factors
same preservation rule

AssessmentAS

Step 2.5 as-of date from UI/workflow
YYYY-MM-DD

UserFeedback

current Step 2.5 analyst feedback if present
otherwise blank
VERIFIED SUCCESSFUL MANUAL OUTPUT

A successful manual test produced:

schema_version = rpr-step25-secweb-v1.0

ED-1 Leadership transition
weight 0.30
score 2.0
direction MIXED
impact MEDIUM

ED-2 Regulatory scrutiny of Services
weight 0.40
score 3.5
direction ADVERSE
impact HIGH

SI-1 Regulatory scrutiny of Services
weight 0.20
score 3.0
direction ADVERSE
impact MEDIUM

ED score = 2.86
SI score = 3.00
composite score = 2.89

It also returned evidence IDs, factor rationales, evidence gaps and analyst questions.

The exact numbers above are test evidence only — never hard-code them.

IMPLEMENTATION ORDER
Inspect first. Do not edit immediately.

Trace the current Step 2.5 path:

frontend Run Assessment
-> /api/v1/rpr/step25/run
-> router/service
-> stylus_engine / Runner
-> current inline preset definition
-> response parsing
-> saved Step25Assessment
-> frontend rendering

Identify precisely where each of the six preset arguments is built.

Compare the existing inline Runner definition against the new verified preset:
prompt
knowledge/schema material
integrations
model
six input arguments.
Make the smallest additive changes necessary so the Runner request exactly reproduces the verified preset contract.
Do not create fake Apple data or POC bypasses.

Real workflow input must come from confirmed Steps 2.1–2.4.

Preserve the already-working token/authentication path.

Do not rewrite token refresh.

Preserve the previously fixed factor routing:
Step 2.3 -> Event-Driven panel
Step 2.4 -> Sector-Inherent panel

including the .includes("2.3") / .includes("2.4") handling already implemented.

OUTPUT / UI

Parse the rpr-step25-secweb-v1.0 response into the existing Step25Assessment model.

Populate the Step 2.5 company row with:

ED score
SI score
composite score
residual rating
credit impact rating
current RRR where supplied
recommended RRR action where legitimately produced
current class where supplied
recommended class action where legitimately produced
key risk driver

Expanded company row must show:

Event-Driven Factors from Step 2.3
Sector-Inherent Factors from Step 2.4
factor score
direction
impact
rationale
supporting evidence
evidence gaps where present

Missing current RRR/class must remain missing / no recommendation, never fabricated.

STRICT v31 FRONTEND RULE

Compare the Step 2.5 section against:

icm-pm-rapid-portfolio-review-v31.html

v31 is the visual authority.

Do a detailed DOM/CSS/layout comparison for:

assessment-type cards
portfolio summary table
all v31 table columns and ordering
filters
score badges
residual/impact badges
RRR/class recommendation columns
key-risk-driver column
impact override
analyst commentary
expandable company row
ED/SI factor panels
Export
Confirm Assessment
spacing, borders, typography and alignment.

Do not redesign v31.

Reuse existing v31 markup/classes wherever possible.

ACCEPTANCE TEST

Execute one real browser/API Step 2.5 run through the RPR application.

PASS requires all of:

REAL_STEP22_COMPANY_USED = true
STEP21_SCENARIO_USED = true
STEP23_CONFIRMED_FACTORS_USED = true
STEP24_CONFIRMED_FACTORS_USED = true

PRESET_EXECUTED = true
SEC_TOOL_EXECUTED = true
WEB_TOOL_EXECUTED = true
MODEL_RESPONSE_RECEIVED = true
JSON_PARSED = true
STEP25_SCHEMA_VALID = true

FACTOR_ASSESSMENTS_COUNT > 0
ED_FACTOR_OUTPUT_COUNT > 0
SI_FACTOR_OUTPUT_COUNT > 0

ED_SCORE_RENDERED = true
SI_SCORE_RENDERED = true
COMPOSITE_SCORE_RENDERED = true
FACTOR_DETAILS_RENDERED = true

V31_TABLE_PARITY = PASS
V31_EXPAND_ROW_PARITY = PASS
STOP CONDITION

Do not start unrelated cleanup.
Do not improve other RPR steps.
Do not redesign architecture.
Do not create additional harnesses unless absolutely required for the single acceptance test.

Once the end-to-end test passes, STOP and report:

FILES_CHANGED =
INPUT_MAPPING =
PRESET_EXECUTED =
SEC_TOOL_EXECUTED =
WEB_TOOL_EXECUTED =
SCHEMA_VALID =
FACTOR_ASSESSMENTS_COUNT =
ED_FACTOR_OUTPUT_COUNT =
SI_FACTOR_OUTPUT_COUNT =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
UI_RESULT_RENDERED =
V31_TABLE_PARITY =
V31_EXPAND_ROW_PARITY =
FINAL_STATUS =
FIRST_REMAINING_BLOCKER =

Start by inspecting the existing implementation and report the exact files/lines that already construct the six inputs. Then proceed directly with the minimal implementation and end-to-end test. Do not ask me to redesign the preset.
