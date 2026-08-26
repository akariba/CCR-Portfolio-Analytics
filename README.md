RPR CONSOLIDATED FIX + REAL-DATA STEP 2 INTEGRATION

Work only in the current working project:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

The current application has working functionality that must remain the immutable baseline. Do not redesign or refactor the application. Do not remove working behavior. Make the minimum additive/fix changes necessary. Preserve the original v31 visual design.

I want you to resolve the current regressions and finish Steps 2.1 and 2.2 before moving further.

1. FIRST: INSPECT CURRENT STATE BEFORE CHANGING ANYTHING

Inspect the actual current files and compare against the last working implementation.

In particular inspect:

server.py
start_backend.ps1
Step 1 AI Assist/theme-assist routes and services
step2_service.py
step2_routes.py
step2_uploads.py
step22_portfolio_service.py
step22_portfolio_routes.py
step22_real_data_loader.py
current Step 2.2 append JS/CSS
current working HTML
original:
UI Design\icm-pm-rapid-portfolio-review-v31.html

Do not guess.

Before making changes identify:

why AI Assist stopped working;
why Step 2 currently has errors;
why Step 2.2 catalog/search shows:
Portfolio catalog unavailable
Portfolio search unavailable
or remains stuck on Loading sector hierarchy;
whether the current frontend accidentally diverged from original v31 Step 2.2;
whether the correct Python interpreter is being used.
2. ENVIRONMENT / BACKEND — FIX AI ASSIST WITHOUT CHANGING BUSINESS LOGIC

AI Assist was previously working and must work again.

There appears to be an interpreter issue:

the old Python 3.8 .venv cannot load the required google-genai/google-adk;
the approved portfolio-agent\.venv Python 3.13 environment has the required packages.

Confirm this from the real environment.

The backend should run using:

portfolio-agent\.venv\Scripts\python.exe

Do not downgrade models and do not create mock/demo AI Assist results.

Restore:

Step 1 AI Assist
theme quality/assist routes
market scanner functionality

without modifying the Step 1 business prompt or workflow.

If start_backend.ps1 currently launches the wrong interpreter, minimally correct the launcher so future starts consistently use the approved portfolio-agent interpreter.

Do not change Python environments unnecessarily.

3. STEP 2.1 — SCENARIO & ASSUMPTIONS

Preserve the existing Step 2.1 business objective and current runtime prompt.

Do not redesign Step 2.1.

A. Fix any current Step 2.1 runtime/API issue

Confirm that:

Step 1 selected event
→ Step 2.1
→ Opus scenario generation
→ Scenario Narrative
→ Scenario Assumptions

works end-to-end.

Preserve the existing model routing.

B. Change assumptions sample file

The current downloaded example CSV contains:

assumption
time_horizon
analyst_notes

This is too complicated.

Change the blank/example upload format so the user-facing assumptions file contains only:

assumption

One assumption per row.

Example:

assumption
Federal Reserve policy rates increase by 50 basis points during the scenario horizon.
Borrowing costs increase for leveraged borrowers.
Refinancing spreads widen for lower-rated issuers.

Do not require time_horizon or analyst_notes from the user.

Backend can infer/default any internal metadata if needed.

C. Make the example relevant to the generated scenario

Ideally the Example Assumptions download should be based on the actual Step 2.1 Opus-generated scenario/assumptions rather than being a permanently hardcoded generic Federal Reserve example.

Preferred behavior:

Opus Step 2.1 output
→ extract the generated assumptions
→ downloadable example CSV containing only the assumption column.

If no scenario has been generated yet, a generic static example may remain as fallback.

Do not make an extra expensive LLM call purely to create the CSV if the assumptions are already present in the Step 2.1 result.

4. STEP 2.2 — REAL PORTFOLIO DATA

The real source files are already located directly in:

backend\data\step22\

Real files:

relationship_meta_data (1) (version 1).xlsx
mle_data_20260731.xlsx
new_mapping_code_20231204 5.xlsx

Existing demo/fallback CSVs must remain untouched for rollback/testing.

Authoritative roles
relationship_meta_data...xlsx

Primary company/CAGID universe.

Existing discovered mapping:

cagid → CAGID
relationship/company information
rel_naics_ind_sector_l1...l4_name → L1/L2/L3/L4
rrr → RRR
rel_credit_classification_name → Classification
rel_cntry_risk_code → Country
relationship_osuc → relationship-level OSUC

Do not aggregate OSUC again if it is already CAGID/relationship granular.

mle_data_20260731.xlsx

Enrichment source.

Preserve all CAGID→MLE/GFCID rows in mle_rows.

Do not incorrectly sum or duplicate relationship exposure.

new_mapping_code_20231204 5.xlsx

Geography enrichment:

country code
country name
region
cluster

Do not drop an entity merely because geography mapping fails.

5. STEP 2.2 UI MUST RETURN TO ORIGINAL v31 BEHAVIOR

Compare the current Step 2.2 implementation directly with:

UI Design\icm-pm-rapid-portfolio-review-v31.html

The original v31 Step 2.2 layout is the visual/interaction baseline.

I expect:

Select Geography dropdown
Select Country dropdown
Select MLE dropdown
sector/category filtering
populated dropdown lists
available sectors shown as selectable/checkable options/cards
user can select/check sectors
selected-sector pills/summary
matching companies below
separate Select Portfolio and Upload Portfolio tabs

All data should now come from the real backend.

Do not replace dropdowns/check-box selection with blank inputs.

6. REMOVE DEVELOPMENT TEXT / “APPEND” ARTIFACTS

The browser currently shows text such as:

STEP 2.2 APPEND: same v31 visual language; data is now backend-driven.

and

STEP 2.2 APPEND — real portfolio upload; existing v31 tab/design preserved.

These are development notes and should not be visible in the actual product UI.

Remove/hide those development labels.

Do not remove the underlying append architecture if it is required technically.

I am not asking you to eliminate the append JS architecture just because the word “append” exists internally.

I only want:

browser UI = original professional v31 presentation

with no engineering/debug commentary visible.

7. STEP 2.2 DATA FILTERING

Preserve deterministic selection.

No LLM is needed in Step 2.2.

Filters should operate against the real portfolio universe:

Geography
Country
MLE
L2
L3 / sector

Preserve the established rule:

OR inside one filter dimension
AND across filter dimensions

Sector hierarchy must be backend-driven.

If an L2 is selected and no explicit L3 is selected, include all valid L3 sectors under that L2.

The user should be able to check one or several sector cards.

Matching companies must come from the real CAGID universe.

8. STEP 2.2 COMPANY OUTPUT

For selected/matching companies expose at least:

CAGID
CAGID Name / Company Name
L1
L2
L3
Country
RRR
Credit Classification
OSUC

MLE may also be shown/used if compatible with the original design.

Keep richer mle_rows in backend data for downstream use.

Do not clutter the frontend with unnecessary fields.

9. STEP 2.2 UPLOAD PORTFOLIO — REAL SAMPLE FILE

The Upload Portfolio functionality must work independently from manual sector selection.

Generate a real test file:

backend\data\step22\step22_real_upload_test.xlsx

using the real internal portfolio data.

Requirements:

top 20 unique CAGIDs by non-zero relationship-level OSUC descending
real data only
no fabricated values
no formulas
preserve CAGID as text

For the actual upload template, keep it simple.

I want the minimum upload contract to be:

CAGID
CAGID Name

where CAGID Name is the company/relationship name.

If the current upload parser requires different exact header spelling, either:

safely make it accept CAGID + CAGID Name, or
use the exact existing compatible headers,

but preserve this simple two-column business concept.

The test workbook may contain an additional OSUC column for verification only if the upload parser safely ignores it. Otherwise keep the actual upload file strictly two columns.

The backend should resolve the rest of the data itself from the real master:

CAGID
→ company
→ sectors
→ RRR
→ classification
→ country
→ OSUC
→ MLE enrichment

Do not make users upload data that the backend already owns.

10. ACTUALLY TEST THE XLSX UPLOAD

Previously the sample was validated through the same matching logic because openpyxl was unavailable in one interpreter.

Now use the actual approved runtime and test the real XLSX upload endpoint/parser itself.

Confirm:

XLSX parses
20/20 CAGIDs match
0 unmatched
0 duplicates
finalize succeeds
resolved portfolio uses real source data

Do not report upload success based only on simulating rows in Python.

11. FALLBACK SAFETY

Do not silently show demo companies when real-data mode fails.

Desired behavior:

real source valid
→ use real data

real source missing / corrupt / schema-invalid
→ clear real-data error

explicit CSV/demo mode
→ existing demo CSV behavior

Demo mode may remain for development/rollback, but it must be explicitly selected.

A failed real source must not silently produce a production-looking synthetic portfolio.

12. DO NOT CHANGE STEP 2.3 / 2.4 BUSINESS LOGIC

Step 2.3 Event-Driven Risk Factors and Step 2.4 Sector-Inherent Risk Factors are currently outside this repair scope.

Verify that they still import/run, but:

do not redesign their prompts;
do not alter V6 methodology;
do not touch backend\data\step24;
do not alter factor scoring as part of this task.
13. VISUAL / FRONTEND GUARDRAIL

Original v31 is the visual authority.

Do not redesign:

fonts
colors
navigation
tabs
card styling
page layout
assessment journey
feedback controls

If the current append version and original v31 differ, preserve the functionality introduced by the backend integration but restore the v31 visual/interaction behavior.

Do not rewrite the entire HTML.

Make minimal targeted JS/CSS/HTML corrections only where necessary.

14. VALIDATE END-TO-END

Before declaring completion test:

Backend

/health succeeds.
AI Assist works again.
Step 1 theme assist works.
Step 2.1 scenario endpoint works.
Step 2.2 catalog works.
Step 2.2 search works.
Step 2.2 finalize works.
Step 2.2 upload works with the generated top-20 CAGID XLSX.

Step 2.1 UI

Scenario narrative renders.
Generated assumptions render.
Example assumptions CSV contains only assumption.
Example CSV preferably reflects the current generated Opus scenario.

Step 2.2 UI

Geography dropdown populated.
Country dropdown populated.
MLE dropdown populated.
L2 hierarchy populated.
L3/sector cards populated.
check/uncheck sector behavior works.
matching real companies appear.
upload tab accepts the sample XLSX.
no Portfolio catalog unavailable.
no Portfolio search unavailable.
no permanent Loading sector hierarchy.
no visible STEP 2.2 APPEND... engineering text.

Regression

Step 2.3 still imports/runs.
Step 2.4 V6 still imports/runs.
v31 visual design remains intact.
15. IMPORTANT — DO NOT OVERCOMPLICATE THIS

Do not create a new architecture if the current one can be repaired.

Keep:

current routes
current services
current UI IDs/contracts wherever possible
current real-data loader where already correct
current model routing
current prompts

Repair and connect what already exists.

FINAL RESPONSE FORMAT

When done give me a concise report:

ROOT CAUSES

AI Assist cause
Step 2.1 cause if any
Step 2.2 cause

CHANGES

exact files changed
one sentence per file

STEP 2.1

scenario working: YES/NO
assumptions file now one column: YES/NO
generated from current scenario where possible: YES/NO

STEP 2.2

real source: YES/NO
dropdowns populated: YES/NO
checkable sectors: YES/NO
matching companies: YES/NO
top-20 CAGID upload sample created: YES/NO
actual XLSX upload tested: YES/NO
20/20 matched: YES/NO

AI ASSIST

restored: YES/NO

REGRESSION

Step 2.3 intact
Step 2.4 intact
v31 design intact

RESTART COMMAND

Give the exact command using the approved portfolio-agent Python interpreter.

Do not continue to Step 2.5 until all of the above is stable.
