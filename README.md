EXECUTE NOW. DO NOT DO MORE ARCHITECTURE, DO NOT REDESIGN STEP 2.5, DO NOT TOUCH STEPS 1–2.4.

We now have a deliberately tiny Stylus preset that is PROVEN WORKING manually in the Stylus UI.

PROVEN FACTS
============

Preset:
- Display name: RPR STEP25
- Shortcut: /rpr-step25
- Model: claude-sonnet-5
- Temperature observed in the successful browser request: 1
- Single input field:
    display/label = input
    internal name = input
    type = Text
    required = YES
- Knowledge: NONE
- The preset itself is deliberately tiny.
- Manual invocation succeeded immediately.

Exact successful response:
{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

The successful browser POST was:
POST https://workspaces.genai.citi.net/runner-service/chat

Observed request-level values from the successful invocation:
- application = "jukebox"
- invoker = current SOEID
- model = "claude-sonnet-5"
- temperature = 1
- tool_config.integrations =
    ["lookup_documentation","sec_filing"]
- tool_config.auto_tool_mode = false

A successful TEST request in the browser returned:
{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

IMPORTANT:
The tiny preset intentionally does NOT perform SEC/web work.
It exists ONLY to prove:
Python -> Runner Service -> exact Stylus preset -> Claude -> response parsing.

This is now the ONLY objective.

============================================================
TASK
============================================================

Make the existing Python Step 2.5 transport invoke THIS tiny RPR STEP25 preset and prove a successful Python call.

DO NOT:
- execute the old SEC+WEB assessment preset
- execute the full Step 2.5 engine
- regenerate Steps 1–2.4
- modify Step 2.3 or Step 2.4
- change assessment logic
- add architecture
- refactor unrelated code
- create another token framework
- create another generic preset framework
- spend time on SEC/Web
- invent preset fields
- ask me to recreate the preset
- ask for another browser token unless the currently stored token is actually expired at execution time
- run 6–7 minute assessment calls

Use the existing proven transport/auth/TLS code:
- backend/step25/stylus_runner_client.py
- existing runner token lifecycle
- approved CitiInternalCAChain_PROD.pem
- current one-time bearer token/bootstrap mechanism
- existing SSE transport/parser

============================================================
FIRST: RESOLVE THE NEW PRESET DEFINITION
============================================================

Do NOT reuse the SEC+WEB preset id.

Search the repository/runtime first for the newly created preset by:
- name "RPR STEP25"
- shortcut "/rpr-step25"
- current workspace/session metadata
- any preset listing/get endpoint already used by this codebase
- any existing Runner Service preset lookup mechanism

If there is an existing supported Runner/preset lookup endpoint, use it to resolve the preset definition dynamically by name/shortcut.

Preferred solution:
    resolve "/rpr-step25" -> obtain actual preset id/config -> feed it into existing build_stylus_preset()/call_stylus_preset()

Do not hardcode a fake UUID.

If the Runner API accepts the preset shortcut/name directly, use that supported route instead.

Only if the actual Runner contract absolutely requires a preset UUID and there is no API/code path to resolve it automatically, STOP at that exact point and report only:
PRESET_ID_REQUIRED = YES

But exhaust the existing programmatic lookup paths first. Do not return to architecture discussion.

============================================================
MINIMAL REQUEST
============================================================

Input value:
TEST

Equivalent logical preset answer:
{"input":"TEST"}

Use ONLY the single input field `input`.

The Python test must exercise the real existing Runner transport, not a mock.

Expected model response:
{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

============================================================
SUCCESS CRITERIA
============================================================

PASS only if Python itself receives and parses the exact response from the Runner Service.

Required checks:

HTTP_REQUEST_SENT = YES
RUNNER_HTTP_STATUS = 200
PRESET_RESOLVED = YES
PRESET_EXECUTED = YES
MODEL_RESPONSE_RECEIVED = YES
JSON_PARSE = PASS
RESPONSE_STATUS = SUCCESS
RESPONSE_INPUT_RECEIVED = true
RESPONSE_MESSAGE = STEP25_RUNNER_OK
PYTHON_TO_STYLUS_PRESET = PASS

Persist the raw Runner response for this test so nothing is silently discarded.

============================================================
AFTER PASS
============================================================

STOP.

Do NOT immediately put the full SEC+WEB prompt back.

Once this tiny test passes, it becomes our new known-working transport baseline.

Then report ONLY:

RPR_STEP25_PRESET_RESOLVED =
PRESET_ID =
TOKEN_ACCEPTED =
TLS_OK =
RUNNER_HTTP_STATUS =
PYTHON_TO_STYLUS_PRESET =
PRESET_EXECUTED =
MODEL_RESPONSE_RECEIVED =
RESPONSE =
FILES_CHANGED =
NEXT_STEP = Replace only the tiny preset contract with the production Step 2.5 contract while preserving this exact proven transport path.

This is a transport proof task. We want ONE SMALL SUCCESS first.

Start execution now.
