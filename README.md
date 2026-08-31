EXECUTE NOW — STEP 2.5 ONLY. STRICT FREEZE RULES.

I have just generated a fresh authenticated Stylus Runner request in the browser. The fresh Authorization: Bearer ... value from the successful POST /runner-service/chat request is currently in my Windows clipboard.

Do not ask me to paste or expose the token. Read it locally from the clipboard and use it only in the current process/session. Do not print it, log it, save it in source control, or modify architecture.

Current accepted state:

Step 2.5 Stylus preset contract is configured.
Preset = RPR Step 2.5 — SEC + Web Credit Assessment
model = claude-sonnet-5
temperature = 1
outer tool_config.integrations = ["lookup_documentation","sec_filing"]
five captured Runner input names are already implemented:
companycontextjson
EventDrivenF
SectorInhere
AssessmentAS
EvidenceWind
preset prompt has already been captured.
preset knowledge has already been captured.
verified=true
Runner client ID has already been resolved.
Previous last blocker was ONLY expired/missing Runner authentication.
EXECUTE
Read the clipboard locally.
Extract only the JWT bearer value if the clipboard contains Bearer <token>.
Set it only for the current PowerShell/process session as GENAI_BEARER_TOKEN.
Do not change any RPR code yet.
Run the isolated existing Step 2.5 Stylus smoke test first.
Confirm the Runner returns something other than 401 TOKEN_EXPIRED.
Confirm the preset actually invokes the configured SEC/Web capabilities.

Then restore/register the real existing Apple RPR upstream context required for the E2E run:

company: APPLE INC
Step 2.2 CAGID: 0000014508
SEC CIK: 0000320193
identity status: CIK_CONFIRMED
use the genuine Step 2.3 six confirmed event-driven factors already produced by the RPR flow
use the genuine Step 2.4 five confirmed sector-inherent factors already produced by the RPR flow
use the genuine confirmed Step 2.1 scenario/context already produced.

Do not fabricate replacement factors.

If those previous in-memory records disappeared because the server restarted, use the existing RPR Step 2.1/2.3/2.4 endpoints/artifacts to recreate/register exactly the genuine upstream data. This is operational restoration only; do not modify Steps 1–2.4 code.

Then execute the real:

POST /api/v1/rpr/step25/run

for company ID:

0000014508

Run it through the existing Step 2.5 Stylus path.

ABSOLUTE FREEZE RULES
NO new architecture.
NO new Runner implementation.
NO preset-by-ID architecture.
NO new auth framework.
NO Step 1/2.1/2.2/2.3/2.4 code modifications.
NO fake data.
NO mock Step 2.5 result.
NO fallback to legacy SEC/Web/H2M.
NO cleanup/refactor.
Do not modify the working preset contract merely because execution fails.
First trace the exact runtime failure if one remains.
SUCCESS CRITERIA

Do not stop merely because HTTP 200 is received.

Prove all of the following:

FRESH_TOKEN_ACCEPTED = YES/NO
RUNNER_HTTP_STATUS = ...
PRESET_EXECUTED = YES/NO
SEC_TOOL_INVOKED = YES/NO
WEB/LOOKUP_TOOL_INVOKED = YES/NO
APPLE_CIK_USED = ...
STEP23_FACTORS_SENT = 6/6 or actual
STEP24_FACTORS_SENT = 5/5 or actual
STEP25_JSON_RETURNED = YES/NO
STEP25_SCHEMA_VALID = YES/NO
ANALYTICAL_RESULT_REAL = YES/NO

If it succeeds, save the raw Step 2.5 response separately for inspection and give me the result summary.

If it fails, give me the exact first failing layer, HTTP status/error, and relevant function/file, and stop before making any new code changes.
