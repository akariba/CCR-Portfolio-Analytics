STRICT. NO MORE INVESTIGATION OR ARCHITECTURE WORK.

We now have a genuine successful Runner execution with only one downstream defect:

HTTP 422 MODEL_OUTPUT_INVALID
Extra data: line 87 column 1

You implemented JSONDecoder().raw_decode() in stylus_runner_client.py.

DO NOT ask me for a fresh token yet.

STEP 1 — LOCAL REGRESSION TEST FIRST

Use the exact persisted raw response/output from the REAL Apple run that produced:

assessment_id = "asmt-aapl-20260901"
company_specific_risk_direction = "STABLE"
rrr_review_recommendation = "NO_CHANGE_REVIEW_INDICATED"

Run the NEW parser against that exact saved response.

I want proof of:

FIRST_JSON_FOUND = YES
FIRST_JSON_END_POSITION =
TRAILING_CONTENT_LENGTH =
TRAILING_CONTENT_PREVIEW =
JSON_OBJECT_COUNT =
STEP25_SCHEMA_VALID =
ASSESSMENT_ID =
COMPANY_SPECIFIC_RISK_DIRECTION =
RRR_REVIEW_RECOMMENDATION =

IMPORTANT:

Do not merely run get_errors.
Actually execute the parser against the saved real Runner output.

Also determine whether trailing content is:

A) harmless prose
B) duplicate JSON
C) second different JSON object
D) duplicated SSE final output
E) something else

If there is a second materially different JSON assessment, STOP.
Do not silently discard it.

If there is exactly one valid Step25Assessment followed only by harmless
trailing material, the raw_decode fix is acceptable for the POC.

STEP 2 — SCHEMA VALIDATION

Pass the extracted first JSON through the exact production
Step25Assessment validation path.

Required:

JSON_PARSE = PASS
SCHEMA_VALID = PASS

Do not weaken the schema.
Do not make any Step 1–2.4 changes.
Do not touch auth/TLS/token code.

STEP 3 — ONLY AFTER STEPS 1 AND 2 PASS

Report exactly:

READY_FOR_FRESH_TOKEN = YES

Then STOP.

I will save a fresh .runner_token.

Once I tell you it is saved, immediately execute ONE real Apple Step 2.5
run.

Do not smoke test first.
Do not spend token time on diagnostics.
Do not change architecture.

For that real run report:

RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_ACTIVITY =
WEB_TOOL_ACTIVITY =
STEP25_JSON_RETURNED =
STEP25_SCHEMA_VALID =
ASSESSMENT_ID =
COMPANY_SPECIFIC_RISK_DIRECTION =
RRR_REVIEW_RECOMMENDATION =
OUTPUT_FILE =
EXECUTION_TIME =
FINAL_STATUS =

Proceed with the saved-response regression test NOW.
