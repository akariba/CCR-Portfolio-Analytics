TASK: FIX ONLY THE STEP 2.5 PRODUCTION RESPONSE-ADAPTER BUG (F1).

We now have a PROVEN successful live Runner/preset execution.

Important confirmed facts from the latest live test:

SECURE_TOKEN_LIFECYCLE_READY = YES
HTTP_STATUS = 200
RUNNER_REACHED = YES
PRESET_EXECUTED = YES
TOOLS_EXECUTED = 7
SEC + WEB tool activity = YES
FULL_SSE_RESPONSE = YES
MODEL_OUTPUT_RETURNED = YES

Authentication/TLS/token handling is now WORKING.

ABSOLUTE RULE:
DO NOT MODIFY AUTHENTICATION OR TOKEN CODE.

Do not change:
- fetch_runner_token.py
- token lifecycle
- TLS / CA bundle handling
- Runner authentication
- M2M
- MCP
- Helix
- refresh-token architecture
- preset configuration
- Steps 1, 2.1, 2.2, 2.3 or 2.4
- frontend
- Step25 schema unless absolutely required by the observed real response

This is a POC. We want the smallest targeted correction that makes the real
successful Runner output consumable by the existing Step 2.5 production path.

BACKGROUND

A forensic audit of the successful real run found one CRITICAL production
compatibility defect.

The isolated Runner execution succeeds and returns a schema-valid
Step25Assessment.

However the current production path in stylus_engine.py / stylus_evidence_adapter.py
was written against an assumed response structure that does not match the
ACTUAL live Runner output.

Confirmed examples:

1. The actual final model response is the assessment object itself, FLAT.

Current production logic apparently does something equivalent to:

    raw_assessment = raw.get("assessment") or {}

This returns {} for the real successful response.

The code must support the ACTUAL observed shape.

It should prefer:

    raw_assessment = raw

when raw itself already contains the Step25Assessment fields.

Do NOT blindly remove compatibility with an older wrapped
{"assessment": {...}} response if supporting both is trivial.

2. Evidence extraction is also based on the wrong SSE assumptions.

The real Runner SSE contains tool_call/tool_response parts and Internet Search
grounding URLs nested under structures such as:

    grounding_chunks[*].uri

The current extractor apparently searches only for top-level source_url/url
fields and therefore drops the real evidence.

3. The final model response also contains evidence under:

    model_metadata.sec_evidence
    model_metadata.web_evidence

These may be used as a fallback when appropriate.

OBJECTIVE

Make the smallest possible adapter correction so that the EXACT real successful
Runner result captured from the latest test can flow through the normal
production Step 2.5 code and produce a valid Step25Assessment.

DO NOT perform another expensive live Runner call first.

FIRST use the already captured real artifacts from the successful run.

Required sequence:

1. Locate the exact saved raw final response and SSE trace from the successful
   live execution.

2. Run the CURRENT production parsing/adaptation functions against those exact
   artifacts and reproduce F1.

3. Make the minimum change required to:
   - correctly recognise the flat Step25Assessment response
   - preserve compatibility with wrapped {"assessment": ...} if easy
   - correctly consume the real evidence structure needed by the production
     evidence gate

4. Run the exact saved successful response through the COMPLETE production
   Step 2.5 transformation path again.

5. Validate using the real Step25Assessment Pydantic model.

PASS CONDITION:

PRODUCTION_ADAPTER_REAL_ARTIFACT = PASS
ASSESSMENT_OBJECT_RECOVERED = YES
EVIDENCE_RECORDS_SURVIVE > 0
STEP25_SCHEMA_VALID = YES
HEADLINE_NONEMPTY = YES
RISK_DIRECTION_NONDEFAULT = YES
CONFIDENCE_NONDEFAULT = YES

Most importantly, the successful real output must NOT become:
- {}
- blank headline
- INDETERMINATE due solely to parsing
- LOW confidence due solely to parsing
- zero factor assessments due solely to parsing

6. ONLY AFTER the saved-real-artifact test passes, perform ONE live call if a
fresh token is available and it can be done without modifying auth.

Do not request a token from me unless execution genuinely requires a fresh
interactive token.

DO NOT fix these yet:
- missing SEC accession numbers
- generic SEC URLs
- web citation URL quality
- weight/score schema preservation
- forensic off-by-two counter
- factor_source_step cosmetic formatting

Those are F2+ issues.

WE ARE FIXING F1 ONLY.

At completion report exactly:

F1_REPRODUCED =
FILES_CHANGED =
FLAT_RESPONSE_SUPPORTED =
WRAPPED_RESPONSE_COMPATIBLE =
REAL_SSE_EVIDENCE_PARSED =
REAL_ARTIFACT_PRODUCTION_PATH =
EVIDENCE_RECORD_COUNT =
STEP25_SCHEMA_VALID =
LIVE_RERUN_PERFORMED =
LIVE_HTTP_STATUS =
FINAL_STATUS = PASS / BLOCKED

If PASS, STOP.

Do not refactor anything else.
