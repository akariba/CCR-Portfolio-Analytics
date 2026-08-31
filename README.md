STRICT EXECUTION MODE — STEP 2.5 ONLY.

DO NOT INVESTIGATE AGAIN.
DO NOT REDESIGN.
DO NOT REFACTOR.
DO NOT CREATE NEW AUTH ARCHITECTURE.
DO NOT CHANGE STEPS 1–2.4.
DO NOT CHANGE COMPANY RESOLUTION.
DO NOT ASK ME TO PASTE THE TOKEN INTO CHAT.
DO NOT STOP AT PREFLIGHT IF THE BLOCKER CAN BE RESOLVED LOCALLY.

The Stylus preset contract is now configured and verified.

Known current state:
- Stylus preset definition = configured
- verified = true
- model = claude-sonnet-5
- temperature = 1
- outer tool_config integrations =
  ["lookup_documentation", "sec_filing"]
- required SEC integration = sec_filing
- exact 5 Runner-side input names are already captured
- preset prompt is populated
- preset knowledge is populated
- Step 2.5 Runner request contract has already been corrected
- remaining execution blocker was Runner bearer authentication
- a valid current-user Runner bearer token is presently copied in the Windows clipboard from the successful live Stylus browser request

============================================================
TASK 1 — LOAD THE TOKEN DIRECTLY FROM CLIPBOARD
============================================================

Use the VS Code PowerShell terminal.

Do NOT print the token.

Execute:

$raw = (Get-Clipboard).Trim()

if ($raw -match '^Bearer\s+') {
    $raw = $raw -replace '^Bearer\s+', ''
}

$env:GENAI_BEARER_TOKEN = $raw
$raw = $null

Then verify ONLY presence:

if ($env:GENAI_BEARER_TOKEN) {
    Write-Host "RUNNER_TOKEN_READY"
} else {
    Write-Host "RUNNER_TOKEN_MISSING"
}

Expected:
RUNNER_TOKEN_READY

If ready, CONTINUE AUTOMATICALLY.

Do not ask me another question.

============================================================
TASK 2 — START/RESTART THE STEP 2.5 STYLUS BACKEND
============================================================

Use the current RPR root:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

Start using the already-existing launcher and current Stylus configuration.

Use the same PowerShell process/environment containing GENAI_BEARER_TOKEN.

Expected equivalent:

.\start_backend_direct_runner_poc.ps1 -Engine stylus -Port 8020

Do not invent a new launcher.

Wait until the backend is responsive.

============================================================
TASK 3 — PREFLIGHT
============================================================

Call:

GET http://127.0.0.1:8020/api/v1/rpr/step25/preflight

Report the relevant fields only:

assessment_engine
runner_client_id_configured
runner_token_available
preset configured/verified state
poc_stylus_blockers

Required target:

assessment_engine = stylus
runner_client_id_configured = true
runner_token_available = true
preset configured = true
preset verified = true
poc_stylus_blockers = []

If this target is reached:
CONTINUE IMMEDIATELY.

============================================================
TASK 4 — RESTORE REAL APPLE RPR CONTEXT IF SERVER RESTART LOST IT
============================================================

The previous real RPR test established:

Step 2.2:
Company = APPLE INC
CAGID = 0000014508
CIK = 0000320193
SEC status = CIK_CONFIRMED

Step 2.3:
6 confirmed event-driven factors

Step 2.4:
5 confirmed sector-inherent factors
governed sector = Software

The server restart previously cleared the in-memory Step 2.5 context.

This is NOT a Stylus problem.

Restore/register the already-generated real Step 2.2 / Step 2.3 / Step 2.4 artifacts into the current server using the EXISTING /context contract.

Do NOT regenerate Steps 1–2.4 unless absolutely necessary.

Prefer the real JSON artifacts already produced in this repo/session.

You previously retained the relevant JSON evidence artifacts.

Find and reuse them.

Required resulting state:

company_id = 0000014508
company_name = APPLE INC
confirmed_cik = 0000320193
Step 2.3 confirmed = true
Step 2.3 factor count = 6
Step 2.4 confirmed = true
Step 2.4 factor count = 5
upstream_ready = true

Verify through the existing workflow/context endpoint.

============================================================
TASK 5 — ISOLATED REAL RUNNER TEST FIRST
============================================================

Before blaming the RPR route, execute the existing isolated Stylus transport test using the REAL configured preset and REAL bearer token.

Use the existing:

step25_stylus_preset_smoke_test.py

or the exact existing equivalent that calls:

stylus_runner_client.call_stylus_preset()

Do NOT create a replacement test framework.

This test must use:

model:
claude-sonnet-5

temperature:
1

outer integrations:
lookup_documentation
sec_filing

real preset.prompt

real preset.inputs

real preset.answers

real preset.toolConfig

real preset.knowledge

Accept:
text/event-stream

Trace the exact outcome.

Success criterion:
Runner accepts the request and begins/returns the actual Stylus execution rather than:
401
403
409
STYLUS_PRESET_NOT_CONFIGURED
BLOCKED_AUTH

If it fails, identify the FIRST exact failing boundary:
HTTP status
Runner response body
SSE event
JSON parsing
tool invocation
final-result parsing

Fix ONLY that concrete defect.

============================================================
TASK 6 — REAL RPR STEP 2.5
============================================================

Once isolated Runner execution works, execute the real existing RPR route:

POST /api/v1/rpr/step25/run

using:

company_id = 0000014508

and the real confirmed Apple context.

The required flow is:

Step 2.2 APPLE INC
→ CAGID 0000014508
→ CIK 0000320193
→ 6 Step 2.3 factors
→ 5 Step 2.4 factors
→ Step 2.5 /run
→ Stylus inline preset
→ SEC Filing tool
→ web/search evidence
→ Claude Sonnet 5 assessment
→ schema-valid Step25Assessment
→ existing Step 2.5 UI-compatible result

============================================================
CRITICAL — VERIFY THE ACTUAL 5 INPUT VALUES
============================================================

Before sending the Runner request, log a SANITIZED manifest containing:

input key
source
character count
non-empty yes/no

Do not dump huge payloads.

Confirm all 5 exact captured Runner-side keys receive their intended values.

The semantic mapping must remain:

CompanyContextJSON
    ← real selected Step 2.2 company/company identity/context

EventDrivenFactorsJSON
    ← real confirmed Step 2.3 factors

SectorInherentFactorsJSON
    ← real confirmed Step 2.4 factors

AssessmentASOFDATE
    ← current assessment as-of date

EvidenceWindowMonths
    ← configured evidence window / existing default

Remember:
the Runner uses the captured SHORT internal names.
Do not replace those names with their display labels.

============================================================
CRITICAL — SEC + WEB EXECUTION QUALITY
============================================================

Do not call Step 2.5 successful merely because HTTP 200 is returned.

Confirm from the actual run that:

1. SEC Filing integration is invoked.
2. Web/search evidence is invoked.
3. Apple is the assessed company.
4. CIK 0000320193 is retained.
5. Step 2.3 factors are actually consumed.
6. Step 2.4 factors are actually consumed.
7. Evidence is company-specific where appropriate.
8. No fabricated SEC filing/accession/source facts are created.
9. Conflicting/disconfirming evidence is preserved.
10. Missing evidence is explicitly identified.
11. Final JSON validates against the expected Step25Assessment structure.
12. Final result is credible for an experienced CCR / credit-risk analyst.

============================================================
SEC TOOL ERROR HANDLING
============================================================

In the manual Stylus execution we observed that:

- SEC 10-K retrieval worked.
- SEC 10-Q retrieval worked.
- at least one SEC 8-K call returned:

onSECFilingToolCall: Unmarshal results: unexpected end of JSON input

Do NOT treat one failed SEC tool invocation as proof that the entire preset is broken.

If the same happens programmatically:

- retain successful SEC evidence
- retain web evidence
- record the failed tool call honestly
- allow the assessment to continue if enough valid evidence exists
- do not fabricate the missing filing result

Only fail the whole Step 2.5 execution if the final analytical result cannot be produced reliably.

============================================================
SSE / RESULT EXTRACTION
============================================================

The browser run proved that /runner-service/chat returns:

text/event-stream

and the final answer can arrive after tool-call events.

Do not prematurely stop parsing at the first intermediate event.

Consume the stream until completion according to the existing Runner client's design.

If the live stream exposes an event shape currently missed by the parser, make the SMALLEST possible parser extension required to retrieve the real final result.

Do NOT create a new SSE framework.

============================================================
STRICT CHANGE BOUNDARY
============================================================

Allowed files only if concretely required:

backend/step25/stylus_runner_client.py
backend/step25/stylus_preset_config.py
preset_knowledge/STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

And only if the live execution proves an actual defect.

Do not touch:

Steps 1–2.4
company identity architecture
Step 2.2 portfolio selection
Step 2.3 factor generation
Step 2.4 factor generation
frontend styling/layout
legacy Step 2.5 engines
deployment architecture
authentication architecture

============================================================
DO NOT STOP EARLY
============================================================

Continue automatically through:

TOKEN
→ BACKEND
→ PREFLIGHT
→ CONTEXT RESTORE
→ ISOLATED RUNNER TEST
→ REAL /step25/run
→ RESULT VALIDATION

Do not stop after each phase asking me for permission.

Only stop if there is a genuine external blocker that cannot be resolved from:
- current clipboard token
- existing repo
- existing captured preset
- existing generated RPR artifacts

============================================================
FINAL REPORT
============================================================

At the end report exactly:

TOKEN_AVAILABLE:
YES / NO

PRESET_CONFIGURED:
YES / NO

RUNNER_CONTRACT_ACCEPTED:
YES / NO

RUNNER_HTTP_STATUS:
<status>

SEC_TOOL_INVOKED:
YES / NO

WEB_EVIDENCE_INVOKED:
YES / NO

APPLE_IDENTITY:
company =
CAGID =
CIK =
status =

STEP23_FACTORS_SENT:
<count>

STEP24_FACTORS_SENT:
<count>

ISOLATED_STYLUS_TEST:
PASS / FAIL
exact reason =

REAL_STEP25_RUN:
PASS / FAIL
HTTP status =
exact reason =

STEP25_SCHEMA_VALID:
YES / NO

STEP25_ANALYTICAL_QUALITY:
PASS / FAIL
brief reason =

FIRST_REMAINING_DEFECT:
<exact file/function/boundary or NONE>

FILES_CHANGED_THIS_TURN:
<exact list or NONE>

Do not perform unrelated work.
Do not continue after this report.
