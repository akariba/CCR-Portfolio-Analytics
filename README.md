STRICT POC FIX — AUTOMATE RUNNER TOKEN ACQUISITION/REFRESH FOR STEP 2.5.

GOAL:
Remove the repeated manual DevTools bearer-token copy/paste requirement.

I want:

Click Run Assessment
    ↓
ensure_runner_token()
    ↓
valid token? -> use it
    ↓ no
refresh token available? -> refresh automatically
    ↓ no
perform supported Citi/Runner interactive OAuth/SSO bootstrap ONCE
    ↓
cache credential using existing Step2.5 token cache
    ↓
execute real Step 2.5 immediately

After initial bootstrap, normal Step 2.5 runs must refresh automatically.

STRICT RULES:
- POC only.
- Do NOT change Steps 1–2.4.
- Do NOT change Step 2.5 assessment logic.
- Do NOT change the Stylus preset.
- Do NOT redesign the UI.
- Do NOT introduce another authentication framework unless genuinely required.
- Reuse the existing Runner OAuth implementation first.
- Do NOT invent OAuth endpoints, scopes, grant types or credentials.
- Inspect existing code/config and the proven Runner/colleague implementation.
- Make the minimum additive change.

CURRENT VERIFIED STATE:

Existing code already contains:

load_current_user_token()
refresh_access_token()

Existing refresh logic uses:

config.runner_token_url
config.runner_client_id

and supports:

grant_type=refresh_token

Existing token sources currently include things such as:

GENAI_BEARER_TOKEN
GENAI_REFRESH_TOKEN
local Runner token cache

Existing Step 2.5 client already has retry-on-auth-failure logic.

Therefore DO NOT rewrite these pieces.

============================================================
PHASE 1 — TRACE CURRENT AUTH IMPLEMENTATION
============================================================

Inspect:

backend/step25/runner_token_manager.py
backend/step25/stylus_runner_client.py
backend/step25/config.py

and any Runner/colleague reference implementation already present in the repo.

Report exactly:

TOKEN_URL =
CLIENT_ID =
CURRENT_ACCESS_TOKEN_SOURCES =
CURRENT_REFRESH_TOKEN_SOURCES =
CURRENT_CACHE_FILES =
REFRESH_FUNCTION =
TOKEN_EXPIRY_FUNCTION =
401_RETRY_FUNCTION =

Then continue automatically.

============================================================
PHASE 2 — DETERMINE THE SUPPORTED INITIAL LOGIN FLOW
============================================================

We already know a normal Stylus browser session obtains a working Runner bearer token.

Find the supported mechanism used to create that authenticated session.

Search existing code/config/docs for:

authorization_code
PKCE
code_verifier
code_challenge
device_code
refresh_token
oauth2
authorize
token.oauth2
secureaccess
SSO
login
callback
redirect_uri

Also inspect any already-present Citi/Runner authentication utilities.

DO NOT invent a login mechanism.

Preferred order:

1. Existing authorization-code + PKCE flow, if present.
2. Existing device-code flow, if present.
3. Existing Citi internal SSO helper/library, if present.
4. Existing refresh-token/bootstrap utility in another local app.

If one exists, reuse it.

============================================================
PHASE 3 — IMPLEMENT ensure_runner_token()
============================================================

Create or minimally extend ONE token-manager function:

ensure_runner_token(min_remaining_seconds=600)

Behavior:

A. Load currently cached/access-token credential.

B. Decode JWT expiry.

C. If remaining lifetime >= 600 seconds:
   return current token.

D. Otherwise, if refresh token exists:
   call the EXISTING refresh_access_token().
   Save returned access token.
   If OAuth rotates the refresh token, save the new refresh token as well.
   Return the fresh access token.

E. If refresh fails specifically because the refresh credential is expired/revoked:
   proceed to supported interactive bootstrap.

F. If there is no refresh token:
   proceed to supported interactive bootstrap.

G. After successful interactive bootstrap:
   persist/cache the returned refresh credential using the existing
   backend/data/step25_runner_auth location or existing equivalent.

H. Return the new access token.

Never log or print complete access/refresh tokens.

============================================================
PHASE 4 — ONE-TIME INTERACTIVE BOOTSTRAP
============================================================

If the internal OAuth implementation supports authorization-code/PKCE:

Implement the MINIMUM local bootstrap:

1. Generate PKCE verifier/challenge.
2. Open the approved Citi authorization URL in the user's browser.
3. User authenticates normally through Citi SSO if required.
4. Receive the OAuth callback locally.
5. Exchange authorization code through the existing approved token endpoint.
6. Obtain access token + refresh token.
7. Save them through the current token-cache mechanism.

This interaction should happen only when there is no reusable refresh credential.

DO NOT ask the user to manually inspect DevTools if a supported OAuth bootstrap
can be implemented.

If the platform instead provides device-code flow, use that existing supported
flow rather than PKCE.

============================================================
PHASE 5 — STEP 2.5 INTEGRATION
============================================================

At the beginning of the REAL Stylus call:

token = ensure_runner_token()

Then execute the existing call_stylus_preset() unchanged except for using the
returned fresh token.

If Runner returns:

401
or
403 indicating expired/invalid authentication

then:

1. invalidate cached ACCESS token only;
2. call ensure_runner_token() again;
3. retry the Runner request EXACTLY ONCE.

Do not retry:
- schema failures
- preset failures
- SEC failures
- web-search failures
- 4xx unrelated to authentication.

============================================================
PHASE 6 — IMPORTANT LONG-RUN CASE
============================================================

Step 2.5 can run for several minutes.

A token may be valid when the SSE connection starts and expire later.

Do NOT abort a successfully established SSE stream merely because the JWT's
local expiry time passes while the Runner request is already executing.

Only refresh/retry if the Runner actually returns an authentication failure.

Keep the existing Stylus-specific long SSE timeout.

============================================================
PHASE 7 — ONE-COMMAND POC
============================================================

Update/reuse:

scripts/run_step25_with_fresh_token.ps1

so it performs:

1. ensure backend running
2. ensure Runner authentication
3. /step25/preflight
4. verify upstream_ready=true
5. POST real /api/v1/rpr/step25/run
6. wait for result
7. print output file/result

No smoke test before the real run.

============================================================
PHASE 8 — TEST
============================================================

Test these cases independently:

CASE 1
Fresh cached access token.
Expected:
NO refresh.
Step 2.5 executes.

CASE 2
Expired access token + valid refresh token.
Expected:
automatic refresh.
NO browser/manual interaction.
Step 2.5 executes.

CASE 3
No access token + valid refresh token.
Expected:
automatic refresh.
Step 2.5 executes.

CASE 4
No usable credentials.
Expected:
ONE interactive approved SSO/OAuth bootstrap.
Credential cached.
Step 2.5 executes.

CASE 5
Next Step 2.5 run after Case 4.
Expected:
NO DevTools.
NO manual token copy.
automatic token reuse/refresh.

============================================================
IF AUTOMATIC INITIAL BOOTSTRAP IS IMPOSSIBLE
============================================================

Only if inspection proves that Runner's OAuth system does NOT expose a supported
authorization-code, PKCE, device-code, internal SSO helper, or reusable refresh
credential to this application:

STOP and report:

BOOTSTRAP_AUTOMATION_SUPPORTED = NO
EXACT_REASON =
AVAILABLE_GRANT_TYPES =
MISSING_CAPABILITY =

Do NOT invent browser scraping or a fake authentication mechanism.

But automatic refresh of an existing refresh token must still remain implemented.

============================================================
FINAL REPORT
============================================================

TOKEN_MANAGER_READY =
INITIAL_SSO_BOOTSTRAP_READY =
ACCESS_TOKEN_AUTO_REUSE =
REFRESH_TOKEN_AUTO_REFRESH =
EXPIRY_PRECHECK =
401_ONE_TIME_REFRESH_RETRY =
MANUAL_DEVTOOLS_REQUIRED_AFTER_FIRST_LOGIN =
STEP25_REAL_RUN_TESTED =
FILES_CHANGED =
FINAL_STATUS =

EXECUTE THE IMPLEMENTATION NOW.
DO NOT RETURN ONLY A PLAN.
