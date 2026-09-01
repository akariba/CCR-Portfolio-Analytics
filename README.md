We have now empirically confirmed the frontend POC bypass is incomplete.

Current facts:

window.STEP25_POC_TEST_BYPASS = true returns true

typeof window.RPR_STEP25_REFRESH_COMPANY_LIST returns "undefined"

Therefore DO NOT give me any more Console commands or DevTools workarounds.

Fix ONLY the Step 2.5 frontend POC path in UI Design/step23.html.

GOAL:

I must be able to open step23.html, go to Step 2.5, see Apple available in the company selector, choose SEC + Web, click Run Assessment, and execute the already-working REAL Step 2.5 backend/Runner flow.

This is a temporary POC/test bypass only.

REQUIREMENTS:

Add a clearly isolated constant:

const STEP25_POC_TEST_ONLY = true;

When STEP25_POC_TEST_ONLY === true, Step 2.5 must NOT require completed Step 2.2 / 2.3 / 2.4 UI state.
Populate #s25-company-select with exactly one test company:

Apple Inc.

Use the SAME Apple identifier/company context already used in our successful isolated Step 2.5 tests. Do not invent a different company identity.

Create/fix the actual frontend population function if needed:

window.RPR_STEP25_REFRESH_COMPANY_LIST

It currently does NOT exist.

The POC bypass must only bypass upstream UI prerequisites.

It MUST NOT:

mock the assessment
mock the Runner
fabricate an assessment response
bypass the Step 2.5 backend endpoint
change Stylus preset logic
change authentication/token logic
change SEC tool logic
change Step 1–2.4 backend logic
redesign the UI
Run Assessment must call the REAL existing Step 2.5 endpoint exactly as the normal production UI would.
Preserve the existing v31 visual layout and all existing working behavior.
Do not touch backend files unless you discover an actual frontend/backend contract mismatch. If you believe backend modification is necessary, STOP and explain first.

TEST IT YOURSELF after the change.

I do NOT want another theoretical report.

Verify this exact sequence:

open step23.html
→ Step 2.5
→ Apple visible/selectable
→ SEC + Web selected
→ Run Assessment enabled
→ click Run Assessment
→ real HTTP request sent to Step 2.5 backend
→ HTTP 200
→ real assessment returned
→ result rendered in Step 2.5 UI

Return ONLY:

FILES_CHANGED =

APPLE_VISIBLE = YES/NO

COMPANY_SELECTOR_VALUE =

RUN_ASSESSMENT_ENABLED = YES/NO

REAL_ENDPOINT_CALLED = YES/NO

HTTP_STATUS =

ASSESSMENT_ID =

UI_RESULT_RENDERED = YES/NO

FINAL_STATUS = PASS/BLOCKED

If BLOCKED, give only the exact first failing layer and exact error.

Do not investigate unrelated issues. Do not refactor. Do not continue to F2/F3/evidence quality. Fix this frontend POC path and test it.
