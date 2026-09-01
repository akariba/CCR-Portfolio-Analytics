EXECUTE NOW — NO MORE INVESTIGATION OR REDESIGN.

We now have:

A fresh Runner bearer token saved at backend/data/step25_runner_auth/.runner_token
The existing Step 2.5 Stylus preset has been deliberately minimized to a very small SEC-filings-only test
The preset works manually in Stylus and returned a valid SEC result for Apple
We intentionally reused/edited the existing preset so you should use the existing captured preset ID/config already present in the repo. Do NOT ask me for another preset ID or DevTools screenshot.
TASK

Execute one isolated Python → Stylus Runner call now.

Use:

the fresh .runner_token
existing Runner URL
existing CA bundle
existing captured preset ID/config
input: Apple / Apple Inc. / known Apple company context already available

Do NOT:

modify Step 1–2.4
modify production Step 2.5 orchestration
redesign authentication
create another token manager
create another preset
request another screenshot
request another token unless the Runner explicitly returns 401 TOKEN_EXPIRED
run the old full SEC+WEB assessment
perform additional exploratory debugging before the call

The goal is ONLY to prove:

Python → Runner → existing minimized SEC preset → SEC tool → model response

Run it immediately.

If the existing step25_isolated_run.py can perform this call, use it. Otherwise make only the smallest necessary temporary/test-harness adjustment to invoke the existing call_stylus_preset() path.

Expected response should resemble the manually verified result:

{"status":"SUCCESS","company":"Apple Inc.",...}

Stop immediately after the first successful response.

Report ONLY:

TOKEN_LOADED = YES/NO
PRESET_ID_USED = <existing id>
RUNNER_HTTP_STATUS = ...
PRESET_EXECUTED = YES/NO
SEC_TOOL_INVOKED = YES/NO
MODEL_RESPONSE_RECEIVED = YES/NO
RESPONSE = <actual response>
PYTHON_TO_STYLUS_SEC_PRESET = PASS/FAIL

EXECUTE NOW.
