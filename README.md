We have now proven the Step 2.5 backend/Runner path separately. Do NOT modify stylus_engine.py, stylus_evidence_adapter.py, authentication, token handling, preset configuration, Step 1, Step 2.1–2.4 backend logic, schemas, or any working Step 2.5 backend code.

The only remaining objective is to test the existing Step 2.5 UI → backend → render path.

Current UI visibly blocks execution because:

“No confirmed Step 2.2 portfolio company available”
“Blocked: Step 2.2/2.3/2.4 confirmation is incomplete for this company.”

This prerequisite gate is correct for the final workflow, but it prevents our isolated Step 2.5 POC validation.

TASK

Inspect the current UI Design/step23.html JavaScript and identify the exact code that:

determines the confirmed Step 2.2 company,
checks Step 2.2/2.3/2.4 completion,
enables/disables or blocks the Step 2.5 Run Assessment action,
builds the Step 2.5 request.

Then implement the smallest possible LOCAL POC TEST BYPASS so that Step 2.5 can be run independently using the already-tested Apple input.

Requirements:

preserve all current UI/CSS/v31 layout exactly;
do not delete the normal prerequisite gate;
normal workflow behavior must remain unchanged;
bypass must be clearly marked STEP25_POC_TEST_ONLY;
when enabled, provide Apple as the temporary confirmed company/input required by the existing Step 2.5 request builder;
reuse the existing Step 2.5 endpoint and response renderer;
do not create a second Step 2.5 implementation;
do not mock the backend response;
do not change the successful Step 2.5 Runner/backend implementation;
do not work on evidence quality, F2/F3, URLs, accession numbers or other enhancements.

First inspect the existing frontend code and report the exact gate/function you found. Then make only the minimal bypass change.

After the change:

restart the existing backend normally if it is currently stopped;
verify /health = 200;
open the existing step23.html;
select SEC + Web;
execute Run Assessment;
confirm that the browser actually sends the Step 2.5 request;
confirm HTTP 200;
confirm the returned assessment_id, headline, risk direction and factor assessments render in the Step 2.5 UI.

Report only:

FRONTEND_GATE_FOUND =

TEST_BYPASS_ADDED = YES/NO

BACKEND_HEALTH =

RUN_ASSESSMENT_REQUEST_SENT = YES/NO

STEP25_HTTP_STATUS =

ASSESSMENT_ID =

UI_RESULT_RENDERED = YES/NO

FINAL_STATUS = PASS/BLOCKED

If blocked, give the exact first failing layer and stop. Do not make unrelated fixes.
