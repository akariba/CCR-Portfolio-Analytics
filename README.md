We have enough evidence. Stop analysis, stop searching for old artifacts, stop proposing alternatives.

Current proven state:

Step 2.2 Apple identity = CONFIRMED
company_id / CAGID = 0000014508
CIK = 0000320193
company = APPLE INC
Step 2.4 genuine recovered artifact = _tmp_step24_final.json
Step 2.4 = CONFIRMED
Step 2.4 factor count = 5/5
Step 2.3 old candidate file is NOT usable because it is only AI_PROPOSAL and lacks scoring_logic
Stylus preset contract is configured
correct preset ID bug is fixed
Claude Sonnet 5 configured
SEC + lookup integrations configured
Stylus-specific SSE timeout = 300s
token freshness/retry mechanism has already been implemented
OBJECTIVE

Execute a real end-to-end Step 2.5 run now, following the RPR flow strictly.

Do NOT use fabricated factors.

Do NOT manually patch scoring_logic.

Do NOT run Step 2.5 with zero Step 2.3 factors.

Do NOT modify Step 1–2.4 implementation code.

Do NOT perform another architecture review.

Do NOT create another smoke-test substitute.

PHASE 1 — REBUILD ONLY THE MISSING REAL UPSTREAM STATE

Re-establish the real Apple scenario using the existing working RPR endpoints and existing scenario:

China MOFCOM Ga/Ge/Sb export restrictions / technology supply-chain scenario

Use the existing RPR execution flow, not manually created JSON.

If Step 2.1 state must be recreated because the server restarted, recreate/register it using the existing Step 2.1 endpoint.

Confirm Step 2.2 Apple:

company_id = 0000014508

CIK = 0000320193

Then execute the REAL:

POST /step2/event-factors/generate

for Apple and the confirmed scenario.

The result must contain 6 real Step 2.3 factors.

Inspect the generated objects before finalization.

Each factor must contain the schema required by the existing Step 2.3 finalizer, including scoring_logic.

Then execute the REAL:

POST /step2/event-factors/finalize

Do not create scoring_logic manually.

Do not alter the factors to make the validator pass.

If the generation itself genuinely returns malformed factors, retry the genuine generation once using the same existing endpoint.

Required result:

STEP23_CONFIRMED = true

STEP23_FACTOR_COUNT = 6

PHASE 2 — RESTORE STEP 2.4

Use the already-proven genuine:

_tmp_step24_final.json

Register it through the existing /context mechanism.

Required:

STEP24_CONFIRMED = true

STEP24_FACTOR_COUNT = 5

No regeneration of Step 2.4 is needed unless registration itself proves impossible.

PHASE 3 — PROVE THE ACTUAL STEP 2.5 INPUT

Immediately before execution, inspect the exact five values that call_stylus_preset() will send.

Required:

companycontextjson = real confirmed Apple Step 2.2 context

EventDrivenF = 6 finalized Step 2.3 factors

SectorInhere = 5 finalized Step 2.4 factors

AssessmentAS = current assessment date

EvidenceWind = configured evidence window

HARD GATE:

STEP25_PAYLOAD_EVENT_FACTORS == 6
STEP25_PAYLOAD_SECTOR_FACTORS == 5

If either is wrong, DO NOT execute Step 2.5.

PHASE 4 — TOKEN AND IMMEDIATE EXECUTION

Use the token-management implementation already created.

Do not redesign authentication.

Do not print the bearer token.

First use any currently available valid token according to the existing freshness gate.

If the current token is expired or has insufficient remaining lifetime, finish all upstream registration first and stop at exactly:

NEED_FRESH_TOKEN_NOW

Nothing else.

If a valid token is available, immediately execute the REAL:

POST /api/v1/rpr/step25/run

Do not run another smoke test first.

This must be the real Apple Step 2.5 run.

Allow the full Stylus execution to complete. The SEC/web tool rounds can take several minutes.

Do not abort merely because SSE events arrive slowly.

PHASE 5 — RESULT VALIDATION

When Step 2.5 completes:

capture the complete final model response;
extract the Step 2.5 JSON;
validate it against the configured Step2.5Assessment schema;
prove SEC lane activity where observable;
prove web evidence/search activity where observable;
confirm all 6 Step 2.3 factors were assessed;
confirm all 5 Step 2.4 factors were assessed;
save the genuine Step 2.5 output to disk so it survives server restart.

Do not silently accept malformed JSON.

Do not substitute a smoke-test response.

Do not call a run successful merely because Runner returned HTTP 200.

Success means a real analytical Step 2.5 assessment was returned and schema-validated.

FREEZE RULE

No refactoring.

No cleanup.

No architecture changes.

No Step 1–2.4 code changes.

Preserve every currently working Step 2.5 contract/auth/preset fix.

Only make a code change if an actual runtime failure proves that a minimal Step 2.5-specific fix is necessary.

EXECUTE

Start now.

Do not give me another plan.

Do not ask permission between phases.

Continue automatically from Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5.

Stop only for:

NEED_FRESH_TOKEN_NOW

or after the genuine Step 2.5 result is obtained.

Final report must be ONLY:

STEP22_CONFIRMED =
STEP23_CONFIRMED =
STEP23_FACTOR_COUNT =
STEP24_CONFIRMED =
STEP24_FACTOR_COUNT =
STEP25_EVENT_FACTORS_SENT =
STEP25_SECTOR_FACTORS_SENT =
TOKEN_ACCEPTED =
RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_ACTIVITY =
WEB_TOOL_ACTIVITY =
STEP25_JSON_RETURNED =
STEP25_SCHEMA_VALID =
ANALYTICAL_RESULT_REAL =
OUTPUT_FILE =
FINAL_STATUS = SUCCESS / BLOCKED
BLOCKER = <exact blocker or NONE>

Execute now.
