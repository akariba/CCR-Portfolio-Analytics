Work directly in the current Rapid Portfolio Review_AI workspace. STRICT BONE RULE: preserve every currently working behavior, Step1/Trigger1, Trigger2, Step2.1, Step2.2, AI Assist, feedback, v31 layout/CSS, current models, prompts and APIs. APPEND/MINIMAL PATCH ONLY. Do not refactor or redesign. Do not add mocks/demo fallbacks. Do not change a working file unless necessary for the items below. If anything outside this scope is required, STOP and ask me.

Implement and verify these 3 items:

1. Fix Step 2.3 apparent failure. Current evidence: /api/v1/rpr/step23/event-factors/generate starts Opus, backend completes successfully and returns HTTP 200, but calls have taken ~185–358s. The UI then logs Event-factor generation failed — signal is aborted without reason. Inspect the exact timeout/AbortController used by the CURRENT working frontend UI Design/rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html. Confirm the timeout mismatch, then make the smallest Step2.3-specific fix so the frontend waits longer than the backend/model ceiling. Do NOT globally increase unrelated Step1/Step2 timeouts and do NOT redesign this into a new orchestration architecture.

2. Enforce the approved Step2.3 importance rule deterministically in the backend: HIGH = 2, MEDIUM = 1. Normalize label case and derive/overwrite the numeric importance score from the label after model parsing. Never trust a model-provided numeric score. Existing deterministic normalized weights must then be calculated from these scores and total 100%. Do not change factor-generation business logic, prompts, model routing, RF count, vulnerability/buffer/scoring structures, or UI design.

3. Make Step 2.4 Sector-Inherent Risk Factors actually generate end-to-end. First inspect the EXISTING step24_sector_factors_routes.py, step24_sector_factors_service.py, Step2.4 prompts, rpr_step24_append.js/css, and current HTML. Reuse their existing contract/business design; do not invent a replacement schema. Wire the current Step2.4 UI to its existing backend generation endpoint, pass the already-confirmed upstream state required by that contract (Step1 event, Step2.1 scenario, Step2.2 confirmed portfolio/sectors, and Step2.3 output if required), render the returned sector-inherent factors in the existing v31 Step2.4 panel, preserve analyst edit/confirm behavior, and use a Step2.4-specific request timeout sufficient for its configured backend model ceiling.

Use the already-working approved Python interpreter/runtime you identified earlier. Source RUNTIME_ENV.ps1 correctly; do not modify package dependencies or model identifiers.

Before editing, inspect only the relevant files. Then implement without further narration. After implementation run minimal verification only:

server import + /health
Step2.2 routes still load
Step2.3 route loads
Step2.4 route loads
one live Step2.3 generation
verify every returned HIGH has score 2, every MEDIUM has score 1, weights total 100%
confirm browser no longer aborts while backend is still processing
one live Step2.4 generation and confirm factors render in the existing Step2.4 UI.

Do NOT touch Step1 or run a new market scan.

Final response MAX 12 lines: changed files, exact change per file, Step2.3 PASS/FAIL + duration, HIGH=2/MEDIUM=1 validation, Step2.4 PASS/FAIL, and any remaining blocker.
