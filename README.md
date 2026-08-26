RPR STABILIZATION PASS — DO NOT START STEP 2.5 YET

Use the forensic report you just produced as the authoritative current-state description.

Do NOT refactor the working architecture and do NOT redesign the frontend. Preserve the v31 visual/behavioral bone and make only minimal targeted fixes.

A. STEP 2.2 — PROVE AND STABILIZE PERFORMANCE

The forensic report identified that an old /search path returned ~84,051 companies / ~112.7 MB and that overlapping Uvicorn reload processes caused stale behavior.

Reassess the current Step 2.2 implementation from the actual files:

step22_real_data_loader.py
step22_portfolio_service.py
step22_portfolio_routes.py
rpr_step22_step23_append.js
current live HTML

Verify the exact current contract:

catalog
→ lightweight metadata only

search
→ bounded preview only + exact total_count

finalize
→ backend independently resolves the FULL matching population, irrespective of preview limit

The browser must NEVER receive the full 84k-company universe merely to render Step 2.2.

Measure and report:

/catalog response size and elapsed time
empty-filter /search response size, number of preview rows and total_count
filtered /search timing
/finalize count versus independently calculated matching count
first-load browser timing

Verify counts against the underlying real XLSX files rather than assuming the API is correct.

Check the authoritative sources and joins again and report:

relationship master row count
unique CAGIDs
duplicate CAGIDs if any
L1/L2/L3 counts
geography count
country count
MLE count
unmatched country mappings
unmatched MLE CAGIDs
relationship OSUC treatment
whether any aggregation or deduplication alters the intended population

Do NOT silently drop unmapped rows.

Keep the upload sample contract user-facing as exactly:

CAGID
CAGID Name

No OSUC/L1/L2/L3/RRR/etc. should be required from the user. Backend resolves those fields.

B. STEP 2.4 — V6 FRONTEND WIRING

Your forensic report says:

V6 backend endpoints exist but no frontend caller exists; the frontend currently calls V5.2.

Verify this first from source.

Then minimally wire the existing Step 2.4 UI to the existing V6 endpoints so V6 is the active generation/revision/finalization path.

Do NOT delete or alter V5.2. Preserve it as rollback.

Do NOT rewrite the V6 service or prompt.

Preserve:

Structural Persistence Test
independently generated factors
vulnerability/buffer logic
deterministic High/Medium weighting
score calculations
feedback/revision/finalize

Restore/preserve the original v31 Factor Importance High/Medium control and recalculate normalized weights after analyst changes.

C. V31 VISUAL RECONCILIATION

Compare Step 2.3 and Step 2.4 against:

UI Design\icm-pm-rapid-portfolio-review-v31.html

Correct only demonstrated visual differences.

In particular check the table/header area I identified: v31 uses the dark/black treatment whereas the current implementation shows grey.

Do not approximate the CSS. Reuse the exact v31 classes/rules where possible.

Remove no functionality.

D. REGRESSION TEST BEFORE STEP 2.5

Perform:

Step 2.1 live scenario-generation API test
single-column assumption upload test
dynamic assumption-example generation test
Step 2.2 catalog/search/finalize/upload tests
Step 2.3 live generation test
Step 2.4 V6 live generation test through the frontend path

Distinguish:

IMPORT TEST
API TEST
LIVE MODEL TEST
BROWSER END-TO-END TEST

Never call an item “working” based only on import success.

E. PROCESS STABILITY

Before testing, ensure exactly one intended backend server instance is servicing port 8000.

Do not leave diagnostic .py files inside a WatchFiles-observed directory while using --reload.

Report process/PID state before and after testing.

Do not modify startup architecture beyond what is necessary unless you find a concrete blocker.

FINAL RESPONSE

Give me:

exact files changed;
Step 2.2 before/after timings and payload sizes;
verified source-data/count reconciliation;
exact V6 frontend route wiring;
v31 visual differences corrected;
browser-tested status for 2.1–2.4;
anything still blocking Step 2.5.

Do not start implementing Step 2.5 in this pass.
