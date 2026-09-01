I have the exact real Stylus preset UUID for the proven working RPR STEP25 preset.

PRESET_ID = <PASTE UUID HERE>

EXECUTE NOW.

STRICT SCOPE:
- Do not investigate anything else.
- Do not touch Steps 1–2.4.
- Do not use the old SEC+WEB preset.
- Do not redesign auth/TLS/token handling.
- Do not create new architecture.
- Do not run the full Step 2.5 assessment.
- This is ONLY the tiny transport proof.

Configure the existing Step 2.5 Stylus transport to use this exact PRESET_ID.

The proven preset contract is:

preset display name = RPR STEP25
shortcut = /rpr-step25
model = claude-sonnet-5
temperature = 1
single input internal name = input
input type = text
input required = true
input value for test = TEST
knowledge = none

Expected exact model result:
{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

Use the existing:
- build_stylus_preset()
- call_stylus_preset()
- Runner transport
- TLS configuration
- token mechanism
- SSE parser

Do not create substitutes.

Run ONE real Python-to-Stylus call immediately.

PASS only if Python receives the successful preset response.

Report only:

PRESET_ID_USED =
TOKEN_ACCEPTED =
TLS_OK =
RUNNER_HTTP_STATUS =
PRESET_EXECUTED =
MODEL_RESPONSE_RECEIVED =
JSON_PARSE =
RESPONSE =
PYTHON_TO_STYLUS_PRESET =
FILES_CHANGED =

If response equals:
{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

then:
PYTHON_TO_STYLUS_PRESET = PASS

STOP immediately after PASS. Do not proceed to the production SEC+WEB Step 2.5 yet.

Execute now.
