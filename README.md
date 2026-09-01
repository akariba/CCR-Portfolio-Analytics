We now have a proven-working golden Stylus preset named RPR STEP25, shortcut /rpr-step25. I tested it manually in Stylus and it returned immediately:

{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

This preset has exactly ONE input field named input, Claude Sonnet 5, no integrations, no knowledge files.

Your task is now extremely narrow.

Do NOT modify the preset.
Do NOT modify Steps 1–2.4.
Do NOT add SEC/Web.
Do NOT change auth architecture.
Do NOT refactor anything.

Use the existing backend/step25/stylus_runner_client.py Runner contract that we already established and execute this exact preset from Python.

First inspect the current live Stylus request for /rpr-step25 only enough to obtain the exact preset ID / preset object required by Runner. Reuse the already-working request structure.

Send:

answers = {"input": "TEST"}

Then execute the Runner call and capture the final model response.

SUCCESS CONDITION:

Python receives:

{"status":"SUCCESS","input_received":true,"message":"STEP25_RUNNER_OK"}

Do not run the real Step 2.5 assessment yet.

Do not spend time redesigning anything.

If execution fails, report only:

HTTP status
Runner error
exact first failing layer
smallest required fix

If it succeeds, report:

PYTHON_TO_STYLUS_PRESET = PASS
PRESET_EXECUTED = YES
MODEL_RESPONSE_RECEIVED = YES
RESPONSE = ...

Execute now.
