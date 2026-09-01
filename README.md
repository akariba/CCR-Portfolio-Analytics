STRICT EXECUTION MODE.

We are NOT investigating anything else.

The isolated Step 2.5 harness is ready. Your accidental process cleanup killed
the dev servers. Recover only what is necessary to execute the isolated test.

DO NOT:
- modify Step 1–2.4
- regenerate upstream data
- modify the preset
- modify Step 2.5 logic unless the isolated execution exposes a concrete defect
- run smoke tests
- run exploratory tests
- search the repository again
- kill any process
- clean anything
- create another auth architecture
- discuss M2M/MCP
- spend a fresh token before the execution path is ready

==================================================
TASK 1 — RESTORE ONLY THE REQUIRED BACKEND
==================================================

Identify which single backend/server is required by:

backend/step25/step25_isolated_run.py

Restart ONLY that backend.

Prefer the already-established direct Runner POC configuration and existing
start_backend_direct_runner_poc.ps1 if that is what the isolated harness expects.

Do not start both 8010 and 8020 unless the harness genuinely requires both.

After restart verify ONLY:

SERVER_REACHABLE = YES
STEP25_ENDPOINT_REACHABLE = YES
GOLDEN_INPUT_EXISTS = YES
ISOLATED_HARNESS_IMPORTS = YES

Do not make a Runner Service call yet.

==================================================
TASK 2 — WAIT FOR TOKEN
==================================================

When everything above is ready, return exactly:

READY_FOR_FRESH_TOKEN = YES
SERVER_PORT =
COMMAND_AFTER_TOKEN =

Then STOP.

I will seed a fresh access token locally into the appropriate environment/file.

Do not ask me to paste the token into Claude chat.

==================================================
TASK 3 — AFTER I SAY TOKEN_READY
==================================================

Immediately, with no additional investigation:

1. Confirm the token is present.
2. Do NOT print the token.
3. Do NOT decode/debug it unless absolutely required.
4. Immediately run:

backend/step25/step25_isolated_run.py

using:

backend/step25/testdata/apple_step25_golden_input.json

5. Make exactly ONE real Step 2.5 Runner execution.

No smoke test before it.

==================================================
SUCCESS CONDITION
==================================================

We want one simple successful Step 2.5 result.

Report ONLY:

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
EXECUTION_TIME_SEC =
FINAL_STATUS =
BLOCKER =

If:

RUNNER_HTTP_STATUS = 200
PRESET_EXECUTED = YES
FIRST_JSON_FOUND = YES
SCHEMA_VALID = YES

then:

FINAL_STATUS = PASS

Save the parsed result as:

backend/step25/testdata/apple_step25_golden_output.json

and STOP.

That successful configuration becomes the frozen Step 2.5 baseline.

DO NOT reconnect Steps 1–2.4 in this task.

Start TASK 1 now.
