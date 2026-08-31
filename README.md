STRICT EXECUTION ONLY. NO ARCHITECTURE. NO REFACTORING.

Your last report is accepted.

The preset configuration is now COMPLETE and is NOT the problem.

Known state:
- PRESET_CONFIGURED = YES
- preset verified = true
- model = claude-sonnet-5
- Runner request contract = configured
- SEC + web integrations = configured
- company identity = APPLE INC
- CAGID = 0000014508
- CIK = 0000320193
- only auth failed because the clipboard token was expired
- Step 2.3/2.4 disappeared only because the restarted server lost its in-memory context

DO NOT modify architecture.
DO NOT modify Steps 1–2.4 code.
DO NOT create persistence.
DO NOT create helper frameworks.
DO NOT investigate the preset again.
DO NOT change company resolution.

============================================================
1. WAIT FOR FRESH TOKEN IN CLIPBOARD
============================================================

I will obtain a FRESH Runner bearer token from a NEW successful Stylus browser request.

I will copy it locally to the Windows clipboard.

Do NOT ask me to paste the token into chat.

Once I tell you "TOKEN COPIED", immediately read it from clipboard using the same working extraction logic you just proved.

Strip "Bearer " if present.

Set:

$env:GENAI_BEARER_TOKEN = <fresh JWT>

DO NOT print the token.

Only verify:

TOKEN_PRESENT = YES

Optionally decode the public exp claim and verify:

TOKEN_EXPIRED = NO

If valid, continue immediately.

============================================================
2. RECREATE THE REAL APPLE UPSTREAM CONTEXT
============================================================

Because the restarted server lost the previous in-memory context, regenerate/re-register it using ONLY THE EXISTING RPR FLOW.

Do not create fake JSON manually.

Use the already-working endpoints/code paths.

Target company:

APPLE INC
CAGID = 0000014508
CIK = 0000320193

Recreate:

Step 2.3
- run existing Step 2.3 generation for the existing selected scenario/company
- finalize it through the existing endpoint
- expected approximately 6 real event-driven factors
- state must become CONFIRMED

Step 2.4
- run existing Step 2.4 generation
- finalize it through the existing endpoint
- expected approximately 5 real sector-inherent factors
- state must become CONFIRMED

Do not modify Step 2.3 or Step 2.4 code.

Then register the real current context through the existing Step 2.5 /context route.

Verify:

company = APPLE INC
CAGID = 0000014508
CIK = 0000320193
step23_confirmed = true
step23_factor_count > 0
step24_confirmed = true
step24_factor_count > 0
upstream_ready = true

============================================================
3. RUN ISOLATED STYLUS TEST
============================================================

With:

- fresh bearer token
- configured preset
- valid CA bundle
- existing Runner client

run the existing isolated Stylus smoke test.

Do NOT change code unless the live request exposes a concrete defect.

Expected:

HTTP authentication succeeds
Runner accepts request
SEC tool can execute
web/search can execute
SSE stream returns model output

If successful, immediately continue.

============================================================
4. RUN REAL STEP 2.5
============================================================

Execute the existing:

POST /api/v1/rpr/step25/run

for:

company_id = 0000014508

Required path:

APPLE INC
→ real CAGID
→ confirmed CIK
→ real Step 2.3 factors
→ real Step 2.4 factors
→ existing Stylus inline preset
→ SEC evidence
→ web evidence
→ Step25Assessment JSON
→ existing RPR result

Do not stop after HTTP 200.

Verify that the assessment actually consumed:

- Apple company context
- CIK 0000320193
- Step 2.3 factors
- Step 2.4 factors
- SEC evidence
- web evidence

============================================================
5. IMPORTANT SEC TOOL BEHAVIOUR
============================================================

The manual Stylus test already proved:

- SEC 10-K works
- SEC 10-Q works
- one 8-K invocation failed with:
  onSECFilingToolCall: Unmarshal results: unexpected end of JSON input

A single failed SEC tool call must NOT fail the entire assessment if other SEC/web evidence is available.

Record the failed call honestly and continue.

Do not fabricate missing evidence.

============================================================
6. DO NOT CHANGE CODE UNLESS REQUIRED
============================================================

If fresh auth + regenerated context makes Step 2.5 work:

FILES_CHANGED = NONE

That is the preferred outcome.

Only make a code change if the real live execution proves a specific defect after authentication succeeds.

============================================================
FINAL REPORT ONLY
============================================================

Return:

TOKEN_VALID:
YES / NO

STEP23:
CONFIRMED / FAILED
factor_count =

STEP24:
CONFIRMED / FAILED
factor_count =

UPSTREAM_READY:
YES / NO

ISOLATED_STYLUS_RUN:
PASS / FAIL
HTTP =

SEC_TOOL:
INVOKED / NOT_INVOKED

WEB_SEARCH:
INVOKED / NOT_INVOKED

REAL_STEP25_RUN:
PASS / FAIL
HTTP =

STEP25_SCHEMA_VALID:
YES / NO

APPLE_CONTEXT_USED:
YES / NO

CIK_USED:
0000320193 / OTHER

STEP23_FACTORS_CONSUMED:
YES / NO

STEP24_FACTORS_CONSUMED:
YES / NO

FIRST_REAL_FAILURE_IF_ANY:
<exact boundary>

FILES_CHANGED:
NONE or exact files

STOP.
