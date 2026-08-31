IMPLEMENT NOW — STEP 2.5 RUNNER TOKEN REFRESH / RETRY PROCESS. STRICT RPR FREEZE RULES.

We have now proven:

FRESH_TOKEN_ACCEPTED = YES
Runner /chat reached HTTP 200 / text/event-stream
the actual Stylus preset ID issue was found and fixed
the request now reaches genuine Runner execution
the previous 120-second SSE chunk timeout was too short and has been changed to a Stylus-specific 300-second timeout
preset definition is now configured and verified
model = claude-sonnet-5
temperature = 1
integrations = ["lookup_documentation","sec_filing"]
the remaining repeated operational problem is bearer-token expiry
OBJECTIVE

Create a minimal Step 2.5 token lifecycle process so that a newly obtained Runner bearer token is consumed immediately and Step 2.5 does not waste most of its ~30-minute lifetime before executing.

Do NOT build a new authentication architecture.

PHASE 1 — INVESTIGATE EXISTING REFRESH CAPABILITY

Before coding anything new, search the workspace for an existing supported Runner OAuth/token-refresh implementation.

Search for:

GENAI_REFRESH_TOKEN
refresh_token
token.oauth2
load_backend_token
load_current_user_token
.runner_token
.runner_refresh_token
secureaccess
CLIENT_ID
RPR_STEP25_RUNNER_CLIENT_ID

Determine whether there is an already-working refresh-token exchange somewhere in:

colleague application
RPR
PE Sponsor application
existing helper scripts

If there is a proven existing refresh flow, reuse it exactly rather than creating another authentication mechanism.

Do not guess OAuth parameters.

Report:

EXISTING_AUTOMATIC_REFRESH_FOUND = YES/NO

If YES, state the exact file/function and reuse it.

PHASE 2 — TOKEN MANAGER

Implement a very small Step-2.5-specific token manager.

Preferred location:

backend/step25/runner_token_manager.py

unless an equivalent existing module already exists and extending it is cleaner.

Required behaviour:

A. Existing valid token

Look for token sources using the existing precedence already used by RPR.

Do not change that precedence unless necessary.

Decode only the JWT timing claims locally and determine:

iat
exp
seconds remaining

Never print or log the bearer token.

B. Freshness requirement

For a full Step 2.5 SEC+Web assessment, require a reasonable remaining lifetime before beginning.

Use:

MIN_STEP25_TOKEN_REMAINING_SEC = 600

If less than 10 minutes remain, consider it unsuitable for starting a new full Step 2.5 run.

This threshold must be configurable.

C. Existing refresh-token flow

If Phase 1 proves that an existing supported refresh-token mechanism exists:

use it automatically to obtain a new bearer token.

Keep the refreshed bearer token only in process memory/environment unless the existing approved implementation already uses an established token cache.

Do not invent new persistence.

D. Clipboard handoff fallback

If there is NO existing automatic refresh-token flow:

support the already-proven operator workflow.

The user generates one fresh authenticated Stylus browser request and copies:

Authorization: Bearer <JWT>

to the Windows clipboard.

The Step 2.5 launcher must:

read clipboard locally;
extract only the JWT;
validate that it structurally looks like a JWT;
inspect exp;
reject it if expired;
reject it if remaining lifetime is below the configured threshold;
inject it into the Step 2.5 process as GENAI_BEARER_TOKEN;
immediately begin the Step 2.5 run.

Never print the token.

Never write the token into source code.

Never write it to git-tracked files.

PHASE 3 — ONE-COMMAND EXECUTION

Create one operator script, preferably:

scripts/run_step25_with_fresh_token.ps1

It must eliminate the current delay between copying the bearer and starting Step 2.5.

The operator workflow should become:

1. Generate a fresh Stylus browser request.
2. Copy its Authorization header.
3. Run one command.

The script then automatically:

reads clipboard;
extracts bearer;
checks expiry;
sets process-only auth;
sets existing Step 2.5 CA bundle if required;
starts/uses the existing RPR backend;
performs Step 2.5 preflight;
ensures the real company context is registered;
immediately calls the existing Step 2.5 run endpoint.

Do NOT run the long 210-second isolated Stylus smoke test before the real Step 2.5 run anymore.

The smoke test has served its purpose.

A fresh bearer must be spent on the real RPR Step 2.5 execution first.

PHASE 4 — RESTORE REAL APPLE CONTEXT

The current backend restart lost the previous in-memory upstream state.

Before Step 2.5 execution, restore/register the genuine existing Apple context using the existing RPR endpoints/data.

Required company:

APPLE INC

company_id/CAGID = 0000014508

CIK = 0000320193

CIK status = CIK_CONFIRMED

Register:

confirmed Step 2.1 scenario
confirmed Step 2.2 company
6 genuine Step 2.3 factors
5 genuine Step 2.4 factors

Do not fabricate factors.

If they can be deterministically regenerated through the existing Step 2.3 and Step 2.4 endpoints, do that.

Do not alter their implementation.

If genuine saved JSON artifacts exist, use those instead.

Then verify:

upstream_ready = true

before consuming the fresh bearer on Step 2.5.

IMPORTANT:

prepare all upstream context BEFORE requesting/reading the fresh token whenever possible.

The token should be the final prerequisite, not the first.

PHASE 5 — 401 TOKEN EXPIRY RETRY

Add exactly one controlled auth retry to the Step 2.5 Runner boundary.

If Runner returns:

HTTP 401
TOKEN_EXPIRED
equivalent validated auth-expiry response

then:

do NOT modify Step 2.5 data;
do NOT restart Steps 1–2.4;
do NOT create a new assessment;
attempt the existing proven refresh-token flow if one exists;
otherwise return a clear RUNNER_TOKEN_REFRESH_REQUIRED state;
allow the operator to copy a fresh browser token;
consume the new token;
retry the same Step 2.5 Runner request once.

Maximum:

MAX_AUTH_RETRIES = 1

Do not create infinite retries.

PHASE 6 — LONG-RUN TOKEN RULE

Once Runner has accepted the authenticated POST and returned HTTP 200 with an SSE stream, do not abort merely because the original JWT reaches its exp while the already-authorized stream is still running, unless the Runner itself rejects subsequent activity.

Continue consuming the existing SSE stream normally.

Authentication expiry should trigger refresh only when the Runner actually responds with an authentication failure.

ABSOLUTE FREEZE RULES
Do not modify Steps 1–2.4 logic.
Do not modify v31 frontend.
Do not build a new OAuth framework.
Do not add preset-by-ID architecture.
Do not remove the captured Stylus preset contract.
Do not change the five input mappings.
Do not replace the real SEC/Web preset with legacy SEC/Web code.
Do not mock Runner output.
Do not create fake Step 2.3/2.4 factors.
Do not refactor unrelated code.
Do not expose bearer or refresh tokens in logs/output.

Preserve all currently working Step 2.5 fixes as permanent backbone.

FINAL EXECUTION

Once upstream Apple context is ready, tell me only:

READY_FOR_FRESH_TOKEN = YES

At that point I will generate/copy one fresh Stylus Authorization value.

Then immediately execute the one-command process and the real Apple Step 2.5 run.

Do not perform another long smoke test first.

Final report must contain:

TOKEN_SOURCE = existing_refresh / clipboard

TOKEN_SECONDS_REMAINING_AT_START = ...

UPSTREAM_READY = YES/NO

STEP23_FACTORS_SENT = 6/6

STEP24_FACTORS_SENT = 5/5

RUNNER_AUTH_ACCEPTED = YES/NO

PRESET_EXECUTED = YES/NO

SEC_TOOL_INVOKED = YES/NO/UNPROVEN

WEB_TOOL_INVOKED = YES/NO/UNPROVEN

STEP25_JSON_RETURNED = YES/NO

STEP25_SCHEMA_VALID = YES/NO

STEP25_ANALYTICAL_RESULT_REAL = YES/NO

AUTH_RETRY_USED = YES/NO

TOTAL_STEP25_RUNTIME_SEC = ...

If anything fails, identify one exact first failing layer and stop. Do not start redesigning the architecture.
