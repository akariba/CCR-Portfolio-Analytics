STRICT EXECUTION MODE — MAKE “RUN ASSESSMENT” WORK NOW.

Do not give me another investigation report.
Do not stop because the previous server restart erased in-memory context.
Do not fabricate any Step 1/2.1/2.3 data.
Do not redesign/refactor/rewrite Steps 1–2.4.
Do not change the frozen v31 UI.
Do not create another Step 2.5 architecture.
The existing Step 2.5 Stylus preset/Runner contract is now the baseline.

GOAL:
I want the actual RPR “Run Assessment” button / Step 2.5 flow to execute successfully with REAL upstream data.

CURRENT VERIFIED STATE:
- Step 2.5 preset contract = CONFIGURED.
- preset id issue = FIXED.
- model = claude-sonnet-5.
- temperature = 1.
- outer integrations = ["lookup_documentation","sec_filing"].
- preset prompt = captured.
- preset knowledge = captured.
- five short Runner input names = captured.
- Runner client id = configured.
- Step 2.2 Apple identity:
    company_id = 0000014508
    company = APPLE INC
    CIK = 0000320193
    sec status = CIK_CONFIRMED.
- Existing Step 2.4 artifact = CONFIRMED with 5 factors.
- Previous Step 2.3 state disappeared because server memory was restarted.
- A candidate Step 2.3 JSON is NOT acceptable because it was never finalized and lacks scoring_logic.
- Therefore regenerate Step 1 → 2.1 → 2.3 genuinely using EXISTING application endpoints.

============================================================
PHASE 1 — REBUILD ONLY THE MISSING REAL UPSTREAM STATE
============================================================

Use the EXISTING RPR flow exactly as implemented.

1. Run the existing real Step 1 Market Scanner / discovery endpoint.

Use the same relevant technology/supply-chain theme that previously produced the
China MOFCOM gallium/germanium/antimony export-control event.

Do NOT manufacture the old Step 1 object.
Run genuine discovery again.

2. Select the real returned event corresponding most closely to:

China MOFCOM gallium / germanium / antimony / strategic-mineral
export restrictions affecting technology / semiconductor supply chains.

Use the actual returned event object from Step 1.

3. Feed that REAL Step 1 event to the existing Step 2.1 scenario generation endpoint.

Generate the real 12-month scenario and assumptions.

4. FINALIZE Step 2.1 through the existing finalize endpoint.

Required:
STEP21_CONFIRMED=true

5. Register/reconfirm Apple through existing Step 2.2 logic only if necessary.

Required identity:
company_id=0000014508
CIK=0000320193
company=APPLE INC
CIK_CONFIRMED=true

6. Call the EXISTING Step 2.3 event-factor generation endpoint using the genuine
confirmed Step 1 + Step 2.1 context.

7. FINALIZE Step 2.3 using the existing finalize endpoint.

Do NOT patch the generated factors manually.
Do NOT invent scoring_logic.

Required:
STEP23_CONFIRMED=true
STEP23_FACTOR_COUNT=6
and all 6 factors must pass the existing deterministic schema/finalization checks.

============================================================
PHASE 2 — RESTORE STEP 2.4
============================================================

The existing real Step 2.4 CONFIRMED 5-factor artifact may be reused ONLY if it
still corresponds to Apple's governed Software sector and passes the application's
existing validation.

Register it through the EXISTING /context mechanism.

Required:
STEP24_CONFIRMED=true
STEP24_FACTOR_COUNT=5

If the existing genuine Step 2.4 artifact cannot be registered, regenerate Step 2.4
using its existing endpoint. Do not fabricate anything.

============================================================
PHASE 3 — PROVE THE EXACT STEP 2.5 PAYLOAD
============================================================

Before sending anything to Stylus print ONLY:

COMPANY =
COMPANY_ID =
CIK =
STEP21_CONFIRMED =
STEP22_CONFIRMED =
STEP23_CONFIRMED =
STEP23_FACTOR_COUNT =
STEP24_CONFIRMED =
STEP24_FACTOR_COUNT =
UPSTREAM_READY =

Then print:

STEP25_INPUT_1 = companycontextjson size/summary
STEP25_INPUT_2 = EventDrivenF size/factor count
STEP25_INPUT_3 = SectorInhere size/factor count
STEP25_INPUT_4 = AssessmentAS
STEP25_INPUT_5 = EvidenceWind

Do not print giant JSON bodies unless needed for an error.

Required before execution:

UPSTREAM_READY=true
STEP23_FACTOR_COUNT=6
STEP24_FACTOR_COUNT=5

============================================================
PHASE 4 — TOKEN
============================================================

Use the token handling already implemented.

1. Check current cached / environment / clipboard Runner token.
2. Decode expiry only.
3. If current token has adequate remaining lifetime, use it immediately.
4. If expired, first attempt the existing refresh-token exchange mechanism.
5. If refresh credentials are unavailable, read a NEW Authorization: Bearer token
from clipboard using the existing safe extraction code.

DO NOT spend the fresh token on another smoke test.

Once a valid fresh token is available, immediately proceed to the REAL RPR run.

============================================================
PHASE 5 — REAL STEP 2.5 EXECUTION
============================================================

Call the real application endpoint:

POST /api/v1/rpr/step25/run

for:

company_id = 0000014508

This must use the genuine registered:

- Apple company context
- 6 confirmed Step 2.3 event-driven factors
- 5 confirmed Step 2.4 sector-inherent factors
- assessment date
- evidence window

and the existing Stylus preset.

NO synthetic smoke-test payload.

Allow the Stylus-specific long SSE timeout already implemented.
Do not terminate simply because SEC/web tool calls take several minutes.

============================================================
PHASE 6 — RESULT
============================================================

Wait until the full SSE response terminates.

Extract the final Step25Assessment JSON using the existing result extraction logic.

Validate it against our Step25Assessment schema.

Save the genuine resulting JSON to the normal Step 2.5 result location.

Then verify that the frontend Step 2.5 “Run Assessment” endpoint can retrieve/render
that result using the CURRENT UI contract.

Do not redesign the UI.

============================================================
PHASE 7 — PERMANENT RESTART FIX
============================================================

AFTER the successful real run, fix the precise persistence problem that caused this
loop:

A server restart must not unnecessarily destroy already-finalized Step 2.1 / 2.2 /
2.3 / 2.4 context if genuine finalized artifacts already exist.

IMPORTANT:
- This is NOT permission to redesign state management.
- Inspect the current repository/storage mechanisms first.
- Make the MINIMUM ADDITIVE persistence/rehydration change.
- Persist only already-finalized genuine workflow artifacts.
- On startup/context lookup, rehydrate them using the existing models/validators.
- Never auto-confirm AI_PROPOSAL/candidate artifacts.
- Never convert an unfinalized artifact into CONFIRMED.
- Preserve every existing endpoint and behavior.

This should make Run Assessment work after a backend restart when legitimately
confirmed upstream results were previously persisted.

============================================================
STRICT STOP CONDITIONS
============================================================

Do NOT stop for:
- “old Step 1 object missing”
- “server memory restarted”
- “need original previous-session object”
because the instruction is explicitly to regenerate that data genuinely through
the existing flow.

Stop ONLY if:
A) a real endpoint itself fails,
B) valid authentication cannot be obtained after the existing refresh/fresh-token
mechanism,
C) a genuine upstream LLM/tool/API returns an unrecoverable error.

If that happens, report the EXACT HTTP endpoint, status, response/error and first
failing function. No architectural speculation.

============================================================
FINAL REPORT — ONLY AFTER EXECUTION
============================================================

STEP1_REAL =
STEP21_CONFIRMED =
STEP22_CONFIRMED =
STEP23_CONFIRMED =
STEP23_FACTOR_COUNT =
STEP24_CONFIRMED =
STEP24_FACTOR_COUNT =
UPSTREAM_READY =
TOKEN_ACCEPTED =
RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_ACTIVITY =
WEB_TOOL_ACTIVITY =
STEP25_JSON_RETURNED =
STEP25_SCHEMA_VALID =
ANALYTICAL_RESULT_REAL =
OUTPUT_FILE =
RUN_ASSESSMENT_WORKING =
RESTART_REHYDRATION_WORKING =
FILES_CHANGED =
FINAL_STATUS = SUCCESS / BLOCKED
BLOCKER =

EXECUTE NOW. DO NOT RETURN A PLAN.
