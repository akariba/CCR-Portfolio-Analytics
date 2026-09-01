STOP FULL-PIPELINE TESTING.

I am changing the execution strategy.

We have already proven:

- Runner Service connectivity
- TLS
- fresh-token authentication
- preset lookup/execution
- real model execution
- real Apple Step 2.5 assessment generation

The current objective is NOT to prove Steps 1–2.4 again.

The objective is to obtain ONE SMALL, CLEAN, REPEATABLE,
SUCCESSFUL STEP 2.5 EXECUTION and freeze it as the Step 2.5 baseline.

============================================================
PHASE 1 — BUILD ISOLATED STEP 2.5 HARNESS
============================================================

Create the minimum possible isolated Step 2.5 execution harness.

Preferred file:

backend/step25/step25_isolated_run.py

It must use the EXISTING:

- Stylus preset definition
- stylus_runner_client
- auth handling
- TLS handling
- Step25Assessment schema
- existing parser

DO NOT duplicate those implementations.

DO NOT modify Steps 1, 2.1, 2.2, 2.3 or 2.4.

DO NOT build new architecture.

DO NOT introduce M2M or MCP.

============================================================
PHASE 2 — FROZEN INPUT
============================================================

Create:

backend/step25/testdata/apple_step25_golden_input.json

It must contain exactly the five real preset input keys:

companycontextjson
EventDrivenF
SectorInhere
AssessmentAS
EvidenceWind

For this isolated test these inputs are STATIC TEST FIXTURES.

They do NOT need to come from the live upstream RPR state.

Use realistic Apple data sufficient to exercise the Step 2.5 preset.

Clearly mark this file:

TEST FIXTURE — NOT PRODUCTION UPSTREAM DATA.

Keep it compact.

The purpose is to test the Step 2.5 analytical engine independently
from upstream orchestration.

============================================================
PHASE 3 — EXECUTION
============================================================

The isolated runner must:

1. Load apple_step25_golden_input.json
2. Build the existing five-answer preset payload.
3. Execute the REAL Runner Service /chat call.
4. Use the REAL SEC + Web preset.
5. Collect the complete SSE stream.
6. Preserve the complete raw response.
7. Extract the first complete JSON object.
8. Detect whether further JSON objects exist.
9. Validate the selected object using the REAL Step25Assessment schema.
10. Persist all artifacts.

============================================================
PHASE 4 — ARTIFACTS
============================================================

For every execution write:

backend/data/step25_runs/<run_id>_raw.txt
backend/data/step25_runs/<run_id>_parsed.json
backend/data/step25_runs/<run_id>_manifest.json

The manifest must contain at minimum:

run_id
started_at
completed_at
runner_http_status
preset_executed
sse_line_count
raw_length
first_json_found
json_object_count
trailing_content_length
schema_valid
assessment_id
company_specific_risk_direction
rrr_review_recommendation
error

IMPORTANT:

If one valid JSON object is followed by harmless text,
the parsed assessment may PASS while all trailing text remains
preserved in _raw.txt.

If more than one complete JSON object exists:

MULTIPLE_JSON_OBJECTS = true

and preserve the entire response.

Do NOT silently discard forensic evidence.

============================================================
PHASE 5 — SUCCESS CRITERIA
============================================================

ONE RUN is considered successful only if:

RUNNER_HTTP_STATUS = 200
PRESET_EXECUTED = YES
FIRST_JSON_FOUND = YES
SCHEMA_VALID = YES

and a populated assessment includes at least:

assessment_id
headline
company_specific_risk_direction
rrr_review_recommendation

When this occurs, copy the validated parsed JSON to:

backend/step25/testdata/apple_step25_golden_output.json

This becomes the immutable Step 2.5 regression baseline.

============================================================
TOKEN RULE
============================================================

Do all local preparation BEFORE requesting/using a fresh token.

Do not spend a fresh token on:

- investigation
- upstream regeneration
- smoke tests
- filesystem searching
- architecture review

When everything is locally ready, report:

READY_FOR_ONE_REAL_STEP25_TEST = YES

and STOP.

I will then provide/seed a fresh token once.

After I say GO, immediately execute ONE isolated Step 2.5 call.

============================================================
FINAL REPORT AFTER EXECUTION
============================================================

Return ONLY:

STEP25_ISOLATED_TEST =
RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_ACTIVITY =
WEB_TOOL_ACTIVITY =
SSE_LINE_COUNT =
FIRST_JSON_FOUND =
JSON_OBJECT_COUNT =
TRAILING_CONTENT_LENGTH =
SCHEMA_VALID =
ASSESSMENT_ID =
COMPANY_SPECIFIC_RISK_DIRECTION =
RRR_REVIEW_RECOMMENDATION =
RAW_OUTPUT_FILE =
PARSED_OUTPUT_FILE =
GOLDEN_OUTPUT_CREATED =
EXECUTION_TIME =
FINAL_STATUS =

No additional redesign.

============================================================
FREEZE RULE
============================================================

If STEP25_ISOLATED_TEST = PASS:

STOP MODIFYING THE STEP 2.5 EXECUTION ENGINE.

That successful implementation becomes the Step 2.5 working baseline.

The next task will be connecting upstream Step 2.2/2.3/2.4 data to the
five already-working inputs.

Proceed now ONLY with preparation of the isolated harness.
Do not perform another live Runner call until it is completely ready.
