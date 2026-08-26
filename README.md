RPR URGENT STABILITY FIX — STEP 1 + STEP 2.2 PERFORMANCE

Work only in:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

This is a stability/performance repair only. The application is being demonstrated, so startup and Step 2.2 availability must be reliable.

Treat the current working code and original v31 frontend as immutable bone.

Do not broadly refactor, redesign the UI, change prompts, change credit methodology, change model routing, add mock results, or replace real data with demo data.

A. INSPECT / PROFILE FIRST

Before changing code, reproduce and measure the actual problems.

Inspect:

start_backend.ps1
Step 1 theme-quality / AI Assist service
rpr_search_agent.py
Step 1 discovery response parser
step22_real_data_loader.py
step22_portfolio_service.py
step22_portfolio_routes.py
Step 2.2 frontend JS
current HTML

Capture timings for:

backend startup;
loading relationship_master / current relationship XLSX;
loading MLE XLSX;
country mapping load;
/portfolio/catalog;
/portfolio/search with empty filters;
/portfolio/search with one country/L2 filter;
browser rendering of returned companies.

Do not optimize by guessing. Identify whether the delay is Excel parsing, joins, API payload size, repeated loading, or frontend DOM rendering.

B. STEP 1 — FIX THE CURRENT THEME QUALITY ERROR

Current observed error:

TimeoutExpired: Command ['helix', 'auth', 'access-token', 'print', '-a'] timed out after 15 seconds

This happens inside the Sonnet 5 Theme Quality / AI Assist path.

Find exactly where the application executes:

helix auth access-token print -a

Determine why the token call hangs or exceeds 15 seconds.

Check whether:

the Helix CLI requires interactive authentication;
an existing session/token can be reused;
the application is unnecessarily spawning the CLI on every theme assessment;
an approved token/session provider already exists in this project/environment.

Do not bypass authentication and do not substitute another model.

If token caching/reuse is already an approved pattern, use it so every Theme Quality request does not need a fresh blocking CLI invocation.

Do not merely increase the timeout unless the actual investigation proves that is necessary.

After repair, run a real Sonnet 5 Theme Quality request.

C. STEP 1 — FIX DISCOVERY RESPONSE PARSING

Another observed failure was:

Discovery response did not contain an events array

Inspect the actual Gemini 3.5 Flash / ADK response before changing the parser.

Determine whether the response is:

valid JSON with a different wrapper;
markdown-fenced JSON;
model text preceding JSON;
a different ADK response envelope;
malformed output;
genuinely missing events.

Make the parser robust to the actual approved response shapes while preserving the canonical internal contract:

events[]

Do not fabricate an empty events array just to avoid an exception.

Preserve:

max 3 events per theme;
per-theme independent pipelines;
discovery → enrichment → Opus refinement;
existing Step 1 prompts.

Test at least one real theme end-to-end.

D. STEP 2.2 — CURRENT PROBLEM

Step 2.2 eventually works and displays the real portfolio universe, but sometimes it takes too long to become available during a demo.

Current universe is approximately:

84k relationships/companies;
231 sectors;
171 countries;
large MLE enrichment file.

The current screenshot shows the intended v31 selection UI working once loaded:

Geography
Country
MLE
L2
L3 cards/check boxes

Do not change this UI design.

The problem is availability/performance.

E. STEP 2.2 — DO NOT RE-READ XLSX FILES ON EVERY REQUEST

Inspect whether the real XLSX files are being parsed repeatedly by:

/catalog
/search
/finalize
every frontend filter action.

If so, fix this.

Preferred architecture:

backend startup / first Step2.2 access
       ↓
load + normalize real source files once
       ↓
build in-memory indexed portfolio representation
       ↓
catalog/search/finalize reuse that representation

Use a process-level/singleton cache or equivalent existing project pattern.

Cache invalidation should be based on source-file modification time or an explicit reload mechanism if practical.

Do not introduce a database or large new framework merely for this.

If the source XLSX changes, the next restart/reload must pick up the new data.

F. SEPARATE CATALOG FROM COMPANY SEARCH

/portfolio/catalog should return only the information needed to build controls:

geographies
countries
MLE choices
L1/L2/L3 hierarchy
counts where useful

It should not return the 84,000-company universe merely to populate dropdowns.

Catalog should be lightweight and fast.

G. DO NOT RETURN / RENDER 84,000 COMPANIES ON INITIAL PAGE LOAD

Investigate whether the current frontend automatically sends an empty-filter search and receives approximately 84,051 companies.

If yes, this is likely a major source of the delay and should be corrected.

Initial Step 2.2 behavior should be:

open Step 2.2
→ load catalog/filter options
→ DO NOT render 84k companies

Then:

user chooses geography/country/MLE/L2/L3
→ backend search
→ matching-company preview

Preserve the ability for the backend to represent all matches, but do not transmit/render tens of thousands of company rows just for an initial preview.

H. ADD SAFE RESULT PREVIEW / PAGINATION WITHOUT CHANGING SELECTION SEMANTICS

For large searches, return:

total_count
companies = preview/page only

For example, render the first reasonable number of companies (use the existing project convention if one exists; otherwise choose a conservative preview such as 100).

Do not interpret this preview limit as the selected portfolio limit.

Example:

total_count = 4,823
displayed companies = first 100
finalize → all 4,823 matching CAGIDs

This distinction is critical.

Portfolio business semantics must remain unchanged.

I. OPTIMIZE FILTERING

Do not repeatedly perform expensive dataframe scans/joins if a normalized in-memory structure can answer the filters efficiently.

Build reusable normalized/indexed fields for:

Geography
Country
MLE
L1
L2
L3
CAGID

Preserve:

OR within the same filter dimension;
AND across dimensions;
no explicit L3 → all valid L3 beneath selected L2.

Do not change the underlying selection results.

J. MLE DATA SHOULD NOT BLOCK BASIC STEP 2.2 AVAILABILITY

Inspect whether parsing the ~22 MB MLE workbook is delaying the entire catalog.

If the basic catalog can be created from the relationship master + geography mapping, consider lazy-loading MLE enrichment in a safe way:

relationship master + geography
→ basic Step 2.2 catalog immediately available

MLE enrichment
→ loaded/cached for MLE filtering and downstream details

Only do this if it preserves correct MLE filtering.

Do not return incomplete/incorrect MLE results.

The goal is to prevent a large enrichment file from unnecessarily blocking the entire Step 2.2 screen.

K. FRONTEND LOADING / ERROR STATES

Preserve v31 styling.

Give the user a clean existing-style loading state while catalog is loading.

Do not expose technical messages like:

Python filenames
stack traces
XLSX parsing details
APPEND

If catalog genuinely fails, show a concise functional error rather than an indefinitely spinning screen.

Example:

Portfolio data could not be loaded. Retry.

Do not silently substitute demo data.

L. COUNTRY TYPE-AHEAD

Preserve the existing country control visually but make it searchable.

User should be able to type:

Pol

and quickly reach:

Poland

or:

Uni

→ United Kingdom / United States.

Use valid backend values only.

No new UI framework.

M. LIVE API VERIFICATION

From the actual browser, verify:

opening Step 2.2 calls /portfolio/catalog;
changing Country generates /portfolio/search;
changing L2/L3 generates /portfolio/search;
matching-company table uses the returned preview;
finalize resolves the full selected population server-side;
upload continues to work.

Keep standard Uvicorn/API access logs enabled so this is observable during demos.

N. PERFORMANCE TARGETS

Do not fake these with hardcoded responses, but aim for:

Warm backend

Step 2.2 catalog: ideally <1 second, acceptable around 1–2 seconds;
normal filtered search: ideally <1 second;
browser should not freeze rendering massive result sets.

Cold initial real-data normalization may take longer, but after it completes, subsequent catalog/search actions should reuse the loaded data.

Report actual measured timings rather than claiming these targets if they are not reached.

O. DO NOT BREAK THE CURRENT REAL-DATA CONTRACT

Preserve:

relationship_master.xlsx or current authoritative renamed equivalent;
country mapping;
MLE enrichment;
real OSUC;
CAGID identity;
real RRR/classification;
no silent demo fallback.

Portfolio upload remains:

CAGID
CAGID Name

only.

P. STRICT NON-REGRESSION

Do not change:

Step 1 business prompts;
Step 2.1 methodology;
Step 2.3 prompt/methodology;
Step 2.4 V6 prompt/methodology;
original v31 visual styling;
portfolio selection semantics.
Q. VALIDATION

Before declaring done:

Step 1

/health PASS
correct portfolio-agent interpreter PASS
Theme Quality Sonnet call PASS
no Helix timeout PASS
Gemini discovery PASS
valid events parsed PASS

Step 2.2

cold data-load time measured
warm /catalog time measured
filtered /search time measured
catalog does not send whole company universe
initial screen does not render 84k companies
large searches return total_count + limited preview
finalize still represents all matches
Country type-ahead works
MLE works
L2/L3 checkboxes work
real data only
upload still matches 20/20 test CAGIDs

Regression

Step 2.1 intact
Step 2.3 intact
Step 2.4 V6 intact
v31 frontend intact
FINAL RESPONSE

Report only:

ROOT CAUSE — STEP 1 THEME QUALITY

ROOT CAUSE — STEP 1 DISCOVERY

ROOT CAUSE — STEP 2.2 DELAY

Break Step 2.2 timing into:

XLSX reading
normalization/join
catalog generation
search
API transfer
frontend rendering

FIXES IMPLEMENTED

FILES CHANGED

PERFORMANCE BEFORE / AFTER

Include measured timings.

STEP 1

Theme Quality: PASS/FAIL
Market Scanner: PASS/FAIL

STEP 2.2

catalog: PASS/FAIL + timing
search: PASS/FAIL + timing
no 84k initial render: PASS/FAIL
country search: PASS/FAIL
finalize-all-matches semantics preserved: PASS/FAIL
upload 20/20: PASS/FAIL

REGRESSION

Step 2.1 PASS/FAIL
Step 2.3 PASS/FAIL
Step 2.4 PASS/FAIL
v31 PASS/FAIL

Do not make unrelated changes.
