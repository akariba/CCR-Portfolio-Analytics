STRICT IMPLEMENTATION — REUSE THE PROVEN PE SPONSOR TOKEN PATTERN

We have spent enough time on manual browser bearer-token capture. Stop building any new token architecture.

I have a proven working implementation in the colleague/PE Sponsor app1.py currently visible in this workspace. It already implements the exact Runner Service authentication lifecycle we need:

TOKEN_URL
refresh-token → access-token exchange
_read_file
_write_file
_refresh_access_token
_get_current_token
_set_current_token
refresh_and_store_token_threadsafe
load_backend_token
background _auto_refresh_loop
thread-safe token storage
reuse of the latest token before follow-up Runner calls
automatic authentication retry

TASK

Adapt that exact proven pattern into the RPR Step 2.5 Runner implementation.

Do NOT create another authentication framework.
Do NOT scrape DevTools.
Do NOT require the user to repeatedly copy browser bearer tokens.
Do NOT change Steps 1–2.4.
Do NOT refactor unrelated Step 2.5 logic.

Preserve the existing working Step 2.5 preset contract, SEC integration, web integration, model, prompt, knowledge files, five input mapping, company resolution, factor validation and SSE processing.

Required authentication behaviour

Use the PE Sponsor app1.py as the implementation baseline and adapt it minimally into the existing Step 2.5 authentication modules.

Credential precedence should be equivalent to the working app:

current valid access token already held in memory;
configured access-token environment/file source;
refresh token from the existing approved environment/file source;
exchange refresh token at the same approved token endpoint used by the working PE Sponsor app;
store the returned access token in the thread-safe current-token store and existing local token cache.

Before every Runner request obtain the latest current token, not a token captured when the application started.

If Runner returns 401 / explicit token-expired response:

refresh exactly once;
store the new token;
replace the Authorization header;
repeat the same Runner request with the same payload and same session_id;
continue the execution.

Do not blindly treat every 403 as token expiry. Only refresh on 403 if the returned Runner body explicitly indicates invalid/expired authentication.

Long-running Step 2.5

Step 2.5 SEC + web execution can be long.

Therefore reproduce the proven background refresh concept from PE Sponsor so that a long Runner session can obtain a newer token without requiring browser interaction.

Most importantly, immediately before every follow-up request use the newest stored token, equivalent to the working PE Sponsor pattern:

Authorization = Bearer <get_current_token()>

Do not terminate an already-running SSE stream merely because the originally issued JWT passes its local expiry time. Let the server decide. Refresh only for the next request or following a genuine authentication rejection.

Source-of-truth rule

Read the actual PE Sponsor app1.py implementation. Reuse its token endpoint configuration and refresh-token exchange semantics. Do not infer these from screenshots and do not manufacture endpoint parameters.

If equivalent utility code already exists in RPR (runner_token_manager.py, stylus_runner_client.py, etc.), modify/reuse it instead of duplicating it.

Keep Step 2.5 Runner contract unchanged

Preserve:

model = claude-sonnet-5
temperature = 1
Runner preset ID already corrected to the real preset ID
outer integrations:
lookup_documentation
sec_filing
all five existing Step 2.5 input names
existing preset prompt
existing preset knowledge
Step 2.3 factors
Step 2.4 factors
SSE output extraction
Step25Assessment schema validation
Execution

After implementation:

start/reuse the RPR backend;
obtain/refresh the token through the automated refresh-token path;
confirm token acquisition without printing the full token;
confirm Apple Step 2.2/2.3/2.4 context is registered;
execute the real Step 2.5 assessment, not another smoke test;
allow the SEC and web tools to execute;
wait for the final JSON;
validate against Step25Assessment;
save the real result;
report only:

AUTO_REFRESH =

ACCESS_TOKEN_SOURCE =

RUNNER_HTTP_STATUS =

PRESET_EXECUTED =

SEC_TOOL_ACTIVITY =

WEB_TOOL_ACTIVITY =

STEP23_FACTORS_SENT =

STEP24_FACTORS_SENT =

STEP25_JSON_RETURNED =

STEP25_SCHEMA_VALID =

OUTPUT_FILE =

FINAL_STATUS = SUCCESS / BLOCKED

BLOCKER =

Execute now. Do not stop for additional architectural analysis unless the working PE Sponsor pattern cannot technically be reused.
