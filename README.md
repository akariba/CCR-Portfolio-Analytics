STOP ALL NEW DEVELOPMENT.

This is a STABILIZATION / RECOVERY PASS ONLY.

Do not redesign anything.
Do not refactor.
Do not introduce another architecture.
Do not optimize unrelated code.
Do not work on Step 2.5.
Do not change prompts unless a prompt itself is proven to be the direct cause of a failing acceptance test.
Do not create experimental files.
Do not create another cache.
Do not use subagents.
Do not perform broad repository archaeology.
Do not repeatedly ask me for permission.
Do not repeatedly run expensive LLM calls.

WORK DIRECTLY AND FINISH THE PASS END-TO-END.

PROJECT ROOT:
C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

LIVE BACKEND:
backend\server.py

APPROVED PYTHON:
..\portfolio-agent\.venv\Scripts\python.exe

LIVE FRONTEND:
UI Design\rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html

v31 GOLD VISUAL REFERENCE:
UI Design\icm-pm-rapid-portfolio-review-v31.html

BONE RULE:
Anything already working is immutable.
Make only minimal surgical changes necessary to solve the failures below.

============================================================
OBJECTIVE
============================================================

Get ONE STABLE demonstrable flow through:

Step 1
→ Step 2.1
→ Step 2.2
→ Step 2.3
→ Step 2.4 V6

Do NOT begin Step 2.5.

There are FOUR blockers only.

============================================================
BLOCKER 1 — STEP 2.4 V6 RETURNS 502
============================================================

This is the highest priority.

Latest real run shows:

step24_v6 T3 evidence search end (+44s)
step24_v6 T4 Opus start (+44s)

then:

POST /api/v1/rpr/step24/sector-factors/generate-v6
502 Bad Gateway

Therefore STOP treating this as a frontend timeout problem.

The request is reaching the backend and Gemini research succeeds.
The failure occurs at or immediately after the Opus/R2D2 reasoning stage.

DO THIS:

1. Reproduce ONCE using a small controlled Step 2.4 V6 request.
2. Capture the COMPLETE backend exception/traceback behind the 502.
3. Identify the exact failing function and exact model/auth/gateway configuration.
4. Inspect only the directly relevant files:
   - step24_sector_factors_v6_service.py
   - step24 sector V6 routes file
   - llm_gateway.py
   - RUNTIME_ENV.ps1
   - server.py only if necessary for route/config loading

5. Determine whether Step 2.4 is correctly using the approved R2D2/Vertex
   Claude path or is accidentally depending on ANTHROPIC_API_KEY/direct
   Anthropic configuration.

6. Use the EXISTING approved model-routing mechanism.
   Do NOT add another provider or fallback.

7. If an environment variable is missing/wrong, fix the application's
   normal startup/config path so the expected approved identifier is used.
   Do not hardcode secrets.

8. Return a controlled useful error instead of a generic 502 if the model
   gateway is unavailable.

ACCEPTANCE:

One real Step 2.4 V6 request must return HTTP 200 and 4–5 factors.

Do not run another expensive Step 2.4 call until the exact 502 root cause
has been found from logs/code.

============================================================
BLOCKER 2 — STEP 2.3 IS TAKING ~5 MINUTES
============================================================

The real browser currently shows approximately:

Elapsed 04:56

for:
"Generating event-driven risk factors..."

This is not acceptable for the demo.

DO NOT rewrite the Step 2.3 business prompt.

First instrument the EXISTING call with concise stage timings:

T0 request received
T1 payload/context preparation complete
T2 LLM request started
T3 LLM response received
T4 JSON parse/validation complete
T5 response returned

Then run ONE real Step 2.3 generation.

Report exactly where the time is spent.

If almost all latency is the Opus call:
- verify only ONE Opus call is happening;
- verify there is no accidental retry;
- verify no duplicate generation from frontend;
- verify no unnecessary full portfolio payload is being sent;
- verify only the information required by the Step 2a/V7 business prompt
  is sent;
- do not remove required credit-analysis content.

If duplicate HTTP calls or duplicate LLM calls exist, eliminate only the
duplicate.

Do NOT shorten the business output merely to make the timer look better.

TARGET:
Normal Step 2.3 should preferably complete <=120 seconds.
If the approved Opus service itself requires longer, report the measured
provider latency honestly rather than redesigning the application.

============================================================
BLOCKER 3 — THEME QUALITY GATE CONFIGURATION ERROR
============================================================

The browser still displays:

RPR_THEME_GATE_MODEL must be set to the exact
organization-approved Sonnet 5 identifier.

This must not remain in the demo.

Inspect the existing approved Sonnet-5 identifier already used elsewhere
in the application / RUNTIME_ENV.ps1.

Make the Theme Quality Gate use that SAME approved configured identifier.

Do NOT guess a new model name.
Do NOT downgrade to Sonnet 4.x.
Do NOT hardcode a secret.

Then run ONE theme-quality call.

Acceptance:
No RuntimeError regarding RPR_THEME_GATE_MODEL.

============================================================
BLOCKER 4 — DO NOT REGRESS STEP 1 PARSER
============================================================

A parser fix was just implemented in market_event_scout.py.

Do NOT rewrite it again.

Run the existing deterministic parser regression tests only.

Required:
root {"theme": ..., "events":[...]} resolves the OUTER events array
and does not accidentally select nested citation objects.

Only if this deterministic regression still fails may you touch
market_event_scout.py again.

Do NOT spend another live Gemini discovery cycle solely to test parsing
until the deterministic test passes.

============================================================
PROCESS CONTROL — VERY IMPORTANT
============================================================

Before testing:

1. Stop every backend python/uvicorn process for this app.
2. Start exactly ONE normal reloader/worker pair using the approved venv.
3. Confirm ONE listener on port 8000.
4. Confirm GET /health = 200.

Do not run multiple uvicorn instances.

Do not leave diagnostic clients/background tests running.

No temporary .py files should remain when finished.

============================================================
DO NOT TOUCH IN THIS PASS
============================================================

Do not change:

- v31 visual design
- Step 2.2 SQLite cache
- Step 2.2 XLSX source-of-truth logic
- Step 2.2 portfolio taxonomy
- Step 2.3 High/Medium weighting mathematics
- Step 2.4 High/Medium weighting mathematics
- Step 2.4 V5.2 rollback path
- evidence_quality.py unless directly causing one of the four failures
- Step 1 business prompt
- Step 2.1 business prompt
- Step 2.3 V7 business requirements
- Step 2.4 V6 business requirements
- Step 2.5
- CSS/layout
- data-folder cleanup
- additional performance architecture
- parallel-search redesign
- early-stop redesign

No "while I'm here" changes.

============================================================
LIVE TEST ORDER
============================================================

Do exactly this order:

A. health
B. deterministic Step 1 parser regression
C. Theme Quality Gate — one call
D. Step 2.2 catalog/search — deterministic only
E. Step 2.3 — ONE live generation
F. Step 2.4 V6 — ONE live generation

If E or F fails:
STOP.
Diagnose that exact failure.
Do not continue making unrelated modifications.

============================================================
DEFINITION OF DONE
============================================================

Do not tell me "implemented" merely because code imports.

DONE means:

- one backend instance
- health 200
- Theme Quality Gate works
- Step 1 parser deterministic regression passes
- Step 2.2 warm catalog/search passes
- Step 2.3 returns populated factors
- Step 2.4 V6 returns populated factors
- no 502
- no empty Step 2.3/2.4 result caused by backend failure
- no new frontend redesign
- no regression to v31 bone

============================================================
FINAL REPORT — MANDATORY AND SHORT
============================================================

After implementation/testing, give me ONE report containing:

1. FINAL STATUS
   Step 1:
   Theme Gate:
   Step 2.1:
   Step 2.2:
   Step 2.3:
   Step 2.4 V6:

2. ROOT CAUSE OF STEP 2.4 502
   exact exception
   exact function
   exact fix

3. STEP 2.3 TIMINGS
   T0→T1
   T1→T2
   T2→T3
   T3→T4
   total
   number of LLM calls

4. STEP 2.4 TIMINGS
   Gemini research
   Opus
   validation/repair
   total

5. EXACT FILES MODIFIED
   file → function → reason

6. EXACT LIVE HTTP RESULTS

7. REMAINING ISSUES
   ONLY real unresolved issues.

8. REGRESSION CONFIRMATION
   Confirm v31, Step 2.2, Step 2.3 scoring and V5.2 were preserved.

Do not give me your chain of thought.
Do not give me a long narrative.
Do the work first, test it, then provide the factual report.
