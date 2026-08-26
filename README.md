IMPLEMENT NOW. DO NOT GIVE ME A PLAN FIRST.

Work autonomously through this entire task from inspection → implementation → restart → live validation → final report.

Do NOT stop after every command to ask me what to do next.
Do NOT ask conversational confirmation for normal read/edit/test/restart operations.
Batch safe operations together.
Use the existing workspace and current source directly.

If the IDE itself requires a security/command approval that you cannot bypass, request only that unavoidable approval. Otherwise continue automatically.

Do not spend tokens narrating your reasoning while working.
Do not repeatedly tell me "I will now check X."
Inspect, fix, test, then report.

==================================================
NON-NEGOTIABLE RPR RULE
==================================================

Preserve the existing working application as the bone.

Do NOT:
- redesign
- refactor working architecture
- rewrite working files unnecessarily
- replace v31 visual language
- change models
- implement Step 2.5
- delete source-of-truth XLSX files
- remove working functionality
- create speculative abstractions

Make the SMALLEST production changes required.

Inspect the CURRENT files before editing. Do not rely on previous summaries if current source disagrees.

==================================================
FIX 1 — ELAPSED TIMER
==================================================

The elapsed timer already works for Trigger 2 / R2D2.

Extend the SAME timer mechanism to:

1. Trigger 1 Market Scanner
   - start when Scan Events starts
   - continue for the ENTIRE asynchronous job, including polling
   - not merely until initial POST returns
   - show:
       Elapsed 00:01
       Elapsed 00:02
       ...
   - stop on success/error/timeout

2. AI Assist operations that involve an actual AI wait.

Do not create separate timer implementations if the shared existing helper can be reused.

Validate with real execution.

==================================================
FIX 2 — STEP 2.2 DATA CORRECTNESS
==================================================

Current browser output is wrong.

Observed:
- Company Name sometimes equals CAGID
- Country shows ZZ
- MLE count shows only 20 and must be verified
- cached output must not differ from source XLSX output

DATA CORRECTNESS IS MORE IMPORTANT THAN SPEED.

Inspect the actual Step 2.2 source files currently used by the backend.

Trace the real mapping for:

CAGID
CAGID Name / Company Name
Country code
Country name
Geography
MLE
L1
L2
L3
RRR
Credit Classification
OSUC

Find the exact cause of:
- Company Name = CAGID
- Country = ZZ
- questionable MLE count

Do not guess.

Trace at least 3 real CAGIDs end-to-end:

XLSX
→ loader
→ canonical row
→ SQLite cache
→ search API
→ frontend

Correct the mapping at the proper layer.

Do NOT use CAGID as a fallback company name where the actual source contains the company name.

Do NOT use ZZ when a valid country mapping exists.

If data really is absent, display it honestly rather than inventing it.

==================================================
STEP 2.2 CACHE
==================================================

Keep the SQLite cache because the performance improvement is useful.

But the cache must be DERIVED ONLY from the real XLSX source of truth.

Cached and uncached canonical records must be identical.

Add/retain robust automatic invalidation using:
- source fingerprint
- stable hash
- cache/schema version if needed

If the current cache contains old/wrong fields, rebuild it automatically.

Do not require manual deletion by the user.

Validate:

cold source count == cached count

and sampled values match for:
- CAGID
- Company Name
- Country
- Geography
- MLE
- L1/L2/L3
- RRR
- Classification
- OSUC

Also calculate the TRUE counts directly from source:

- unique CAGIDs
- companies
- countries
- MLEs
- L1
- L2
- L3
- CAGID/MLE fanout
- unmatched country mappings
- unmatched CAGID joins
- duplicate CAGIDs

Do not assume the previous 84,051 / 171 / 20 values are correct. Recalculate.

==================================================
FIX 3 — STEP 2.3 HIGH/MEDIUM COLLAPSE
==================================================

Current bug:

When RF2/RF3/etc. is expanded and I click High or Medium, the entire RF card collapses.

Fix it.

Clicking High/Medium must ONLY:

- update importance
- HIGH = 2
- MEDIUM = 1
- recompute normalized weights to exactly 100%
- update the visible importance/weight

It must NOT:
- collapse the card
- open another RF
- jump the page
- lose scroll position
- lose edits
- unnecessarily rerender the whole factor list

Inspect event propagation/accordion handlers first.

If propagation is the cause, use the smallest event-handling fix.

Test RF1, RF2, RF3 and the final RF.

==================================================
FIX 4 — STEP 2.4 V6 STALL
==================================================

Step 2.4 V6 has run for approximately 5+ minutes and returned nothing.

Do not solve this by simply increasing the frontend timeout.

Inspect the ACTIVE production path only:

served Step 2.4 JS
→ generate-v6 endpoint
→ V6 route
→ V6 service
→ evidence/web call
→ Opus
→ parser
→ response

Verify V6 is really the active frontend path.
Keep V5.2 untouched as rollback.

Instrument one real V6 request with timings:

T0 HTTP received
T1 context ready
T2 evidence search start
T3 evidence search end
T4 Opus start
T5 Opus end
T6 parse/validation complete
T7 HTTP response

Find where it actually stalls.

Add bounded timeout/error handling around the REAL blocking external call if missing.

Required behavior:

- successful V6 output, OR
- explicit controlled error/timeout

Never:
- infinite wait
- empty silent result
- invented fallback output

Do not downgrade models.
Do not replace V6 with V5.2.

==================================================
FIX 5 — STEP 1 GEMINI RESPONSE PARSING
==================================================

Observed production error:

GEMINI DISCOVERY FAILED
ValueError: Discovery response did not contain an events array

Yet Gemini itself returned SUCCESS with substantial output.

Inspect the ACTUAL returned response shape.

Support legitimate shapes actually observed, for example only if present:
- top-level array
- {"events": [...]}
- valid known alias
- fenced JSON
- one wrapper level around the event object

Do NOT blindly accept arbitrary malformed text.

Log enough information to identify the schema without dumping huge model outputs.

Preserve:
theme → up to 3 events
and per-event independent processing.

One bad theme/event must not destroy valid events from other themes.

==================================================
PRESERVE EVIDENCE QUALITY
==================================================

Do not undo the recent evidence-quality improvements.

Keep:

- authoritative/recent sources prioritized
- primary/regulator/official/rating-agency sources preferred where relevant
- strong secondary sources when useful
- grounding metadata capture
- source deduplication
- publication/date evidence
- removal of internal Vertex grounding redirect URLs from analyst-facing text
- no invented URLs

==================================================
PERFORMANCE TARGET
==================================================

Do not over-optimize prematurely.

For Step 2.2 the existing approximate target is acceptable:

backend/cache initialization: a few seconds
catalog: < 1 second where practical
filtered search: < 1 second where practical

Correct data comes first.

For AI stages:
focus on:
1. reliable completion
2. source quality
3. useful output
4. reasonable latency

Do not make architecture-heavy parallel-search changes in this pass unless they are REQUIRED to correct the current defect.

==================================================
END-TO-END VALIDATION — DO IT YOURSELF
==================================================

After implementation, restart the backend with the approved application interpreter and test the actual endpoints.

Do not stop and ask me to test each item for you.

Run everything you can directly.

Validate:

STEP 1 TRIGGER 1
- real scan request
- async polling
- elapsed timer lifecycle in frontend code
- discovery parsing
- events returned
- enrichment/refinement does not break
- no internal redirect URL in analyst-facing answer

STEP 1 TRIGGER 2
- enrichment still works
- elapsed timer remains working

AI ASSIST
- existing Assist route works
- elapsed timer is correctly wired

STEP 2.1
- no regression

STEP 2.2
- cache warm load
- catalog
- search
- filtered search
- finalize
- upload
- real company names
- real country mapping
- correct MLEs
- source/cache parity
- correct counts

STEP 2.3
- module/routes work
- High/Medium interaction no longer collapses factor
- weights remain exactly 100%

STEP 2.4
- V6 active route confirmed
- real generate-v6 call
- T0–T7 timing captured
- successful response OR controlled explicit timeout/error

Do not claim browser PASS if you cannot actually drive a browser.
Use:
PASS
FAIL
NOT BROWSER-TESTED
accurately.

==================================================
CLEAN WORKSPACE
==================================================

Do not create unnecessary diagnostic files.

Prefer inline commands/tests.

Any temporary diagnostic files you create must be deleted before finishing.

Do not touch legitimate backups.

Do not delete the disposable SQLite cache; it is intentionally retained for fast demo startup.

Do not clean unrelated files in this pass.

==================================================
FINAL RESPONSE — MANDATORY IMPLEMENTATION REPORT
==================================================

AFTER doing the work, give me a concise implementation report.

Do not give me a long narrative.

Use exactly:

1. IMPLEMENTED
- each fix actually completed

2. ROOT CAUSES
- Trigger 1 timer
- Step 2.2 company/country/MLE problem
- Step 2.3 collapse
- Step 2.4 stall
- Gemini events-array parsing

3. FILES CHANGED
For every production file:
FILE
WHY
EXACT CHANGE

Also list:
CREATED
DELETED
UNCHANGED BUT INSPECTED

4. DATA VALIDATION
Report actual source-derived:
- companies
- unique CAGIDs
- countries
- MLEs
- sectors
- fanout
- duplicates
- unmatched joins
- cold/cache parity

5. PERFORMANCE
Give measured elapsed time for:
- backend/cache initialization
- catalog
- no-filter search
- filtered search
- Step 1 Trigger 1
- Trigger 2 if tested
- Step 2.3 if tested
- Step 2.4 T0–T7

6. TEST RESULTS
Use:
PASS / FAIL / NOT TESTED

for every relevant workflow.

7. REMAINING ISSUES
Only real unresolved issues.

8. EXACT NEXT RECOMMENDED STEP
Maximum 3 bullets.

IMPORTANT:
Do not just tell me what should be implemented.
IMPLEMENT IT FIRST.

Do not ask me repeatedly for permission.
Continue until this complete stabilization pass is finished or you hit a genuine external blocker that cannot be resolved from the workspace.
