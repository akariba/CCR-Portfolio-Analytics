STOP. Do not redesign authentication again.

We have spent too much time rebuilding something that already works.

GROUND TRUTH:
The colleague PE Sponsor app.py on this machine is a PROVEN WORKING
Runner Service implementation.

Its authentication/token lifecycle already works.

I want Step 2.5 to use THE SAME AUTHENTICATION PATTERN AND THE SAME
CREDENTIAL SOURCE that app.py actually uses in practice.

DO NOT:
- ask me to paste another browser bearer token
- use clipboard token capture as the normal solution
- create another token architecture
- create another token manager unless absolutely required
- scrape DevTools
- modify Steps 1–2.4
- modify the Step 2.5 preset contract
- modify SEC/Web integrations
- redesign working code
- add security abstractions
- speculate about missing credentials before inspecting app.py
- stop merely because GENAI_BEARER_TOKEN is absent

IMPORTANT:
app.py WORKS.
Therefore determine HOW app.py obtains its usable Runner credential on
this machine and reuse that exact mechanism.

TASK 1 — TRACE APP.PY AUTH BOOTSTRAP

Read app.py completely around all of these:

TOKEN_URL
CLIENT_ID
SOEID
_TOKEN_FILE
_REFRESH_FILE
_refresh_access_token
_get_current_token
_set_current_token
_refresh_and_store_token_threadsafe
load_backend_token
_start_auto_refresher

Also search the ENTIRE app.py and its execution folder for every write
or assignment involving:

GENAI_BEARER_TOKEN
GENAI_REFRESH_TOKEN
.token
.refresh_token
TOKEN_URL
access_token
refresh_token

Do not only inspect function definitions.

Determine exactly which credential source the WORKING PE Sponsor app
actually uses at runtime.

Report:

PE_SPONSOR_ACCESS_TOKEN_SOURCE =
PE_SPONSOR_REFRESH_TOKEN_SOURCE =
PE_SPONSOR_TOKEN_BOOTSTRAP_FUNCTION =
PE_SPONSOR_TOKEN_REFRESH_FUNCTION =
PE_SPONSOR_TOKEN_URL =
PE_SPONSOR_CLIENT_ID_SOURCE =

Do not print any actual token/secret value.

TASK 2 — REUSE, DO NOT REIMPLEMENT

Once identified, make Step 2.5 use that SAME credential source and
lifecycle.

Preferred architecture:

                 proven PE Sponsor credential source
                              |
                              v
                    load_runner_token()
                              |
                +-------------+-------------+
                |                           |
          access token                 refresh token
                |                           |
                |                   TOKEN_URL exchange
                |                           |
                +-------------+-------------+
                              |
                              v
                      current access token
                              |
                              v
                    Step 2.5 Runner request
                              |
                         401 TOKEN_EXPIRED
                              |
                              v
                         refresh once
                              |
                              v
                       retry same request

Do not require a manually copied browser JWT for every run.

The working behavior must be:

1. Application starts.
2. Step 2.5 asks the shared auth provider for current token.
3. If current access token is valid, use it.
4. If access token is absent/expired and a refresh token exists,
   exchange refresh token using the exact working app.py TOKEN_URL /
   CLIENT_ID contract.
5. Store the new access token in the existing thread-safe token store.
6. Execute Step 2.5.
7. If Runner returns genuine TOKEN_EXPIRED / 401, refresh ONCE and
   replay the same request.
8. Continue reading the SSE stream.
9. Do not interrupt a successful long-running SSE stream merely because
   the JWT later crosses its exp time.
10. Future Step 2.5 runs automatically use the newest token.

TASK 3 — IMPORTANT BOOTSTRAP CHECK

The current Step 2.5 implementation reports:

ACCESS_TOKEN_SOURCE = none

Do not merely report this again.

Explain WHY app.py does NOT have this problem when it runs.

Compare runtime resolution between:

WORKING APP.PY
vs
CURRENT STEP 2.5

for:

- working directory
- .token path
- .refresh_token path
- environment variables
- initialization order
- whether load_backend_token() is actually called
- whether _set_current_token() is called at application startup
- whether the auto-refresher starts before an initial token is loaded
- TOKEN_URL
- CLIENT_ID
- CA bundle
- process environment

This comparison is mandatory.

A likely bug is that the copied refresh functions exist but Step 2.5
never initializes its in-memory token from the same source that app.py
uses. Prove or disprove this from code/runtime.

TASK 4 — MINIMAL FIX

Make the smallest possible correction.

Prefer reusing/extracting the exact working app.py auth functions over
maintaining three independent implementations.

If practical, create ONE shared small module such as:

backend/runner_auth.py

containing ONLY the proven generic Runner auth code extracted from
app.py:

- token source resolution
- refresh-token exchange
- current-token thread-safe store
- refresh-and-store
- one-time initialization

Then:

PE Sponsor app (if appropriate)
        \
         > runner_auth.py
        /
Step 2.5

But DO NOT refactor the working PE Sponsor app merely for style.
If changing PE Sponsor would create risk, leave app.py untouched and
copy its proven auth implementation exactly into the existing Step 2.5
auth module.

TASK 5 — INITIALIZATION

This is critical.

At Step 2.5/backend startup, perform the equivalent of:

token, source = load_backend_token()

if token:
    _set_current_token(token)

Then start the refresher only after initialization.

Do not leave get_current_token() empty while a usable token or refresh
token already exists in the working app's environment/files.

TASK 6 — EXECUTE, DON'T JUST REPORT

After fixing it:

1. Restart backend cleanly.
2. Confirm Step 2.2 Apple context.
3. Confirm 6 Step 2.3 factors.
4. Confirm 5 Step 2.4 factors.
5. Check token resolution.
6. Execute the REAL Step 2.5 assessment.
7. Do not run another architecture review.
8. Do not stop for another smoke-test discussion if preflight passes.
9. Allow the long SEC/Web SSE request sufficient time.
10. If 401 occurs, prove automatic refresh + single retry.
11. Save the real Step 2.5 JSON.
12. Validate against Step25Assessment schema.

FINAL REPORT ONLY:

PE_SPONSOR_AUTH_SOURCE =
STEP25_AUTH_SOURCE =
SAME_AUTH_PATTERN = YES/NO

INITIAL_TOKEN_LOADED = YES/NO
AUTO_REFRESH = YES/NO
401_REFRESH_RETRY = YES/NO

STEP22_CONFIRMED =
STEP23_FACTORS_SENT =
STEP24_FACTORS_SENT =

RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
SEC_TOOL_ACTIVITY =
WEB_TOOL_ACTIVITY =

STEP25_JSON_RETURNED =
STEP25_SCHEMA_VALID =
OUTPUT_FILE =

FILES_CHANGED =

FINAL_STATUS = SUCCESS / BLOCKED
BLOCKER =

Do not ask me for another manually copied browser access token unless
you prove that the working app.py itself also requires manual browser
token capture on every launch.

EXECUTE NOW.
