We are now doing ONE LIVE ISOLATED STEP 2.5 SEC-ONLY VALIDATION.

The F1 response-shape fix is already complete and the saved-artifact test is PASS.

DO NOT:
- redesign anything
- refactor anything
- change auth/token code
- change TLS/CA code
- change the preset
- change Step 1-2.4
- change frontend
- add web search
- investigate production architecture
- create another harness unless the existing isolated harness cannot run

Use the EXISTING live isolated Step 2.5 path and the CURRENT SEC-only Stylus preset.

INPUT:
{"company_name":"Apple Inc.","ticker":"AAPL","cik":"0000320193"}

The fresh Runner bearer token is already stored in the existing .runner_token location.
Read it through the existing token-loading code. Never print or expose it.

Execute ONE real Runner call.

The purpose is ONLY to prove this path:

Python
→ Stylus preset
→ SEC Filings tool
→ model JSON
→ current Step 2.5 parser/adapters
→ Step25Assessment

SUCCESS CONDITIONS:

HTTP_STATUS = 200
PRESET_EXECUTED = YES
SEC_TOOL_CALLED >= 1
MODEL_RESPONSE_RECEIVED = YES
JSON_PARSED = YES
STEP25_SCHEMA_VALID = YES
EVIDENCE_RECORD_COUNT > 0
HEADLINE_NONEMPTY = YES
FACTOR_ASSESSMENTS_COUNT > 0
FINAL_STATUS = PASS

If it passes, STOP IMMEDIATELY.

Do not fix F2/F3, accession-number quality, URLs, citation IDs, weight/score, or any other quality issue during this test.

If it fails, DO NOT redesign anything.

Report only:

LIVE_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_CALLED =
MODEL_RESPONSE_RECEIVED =
JSON_PARSED =
STEP25_SCHEMA_VALID =
EVIDENCE_RECORD_COUNT =
FACTOR_ASSESSMENTS_COUNT =
FINAL_STATUS =
EXACT_FIRST_FAILING_LAYER =
EXACT_ERROR =
SMALLEST_REQUIRED_FIX =

Execute now.
