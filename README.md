RPR FINAL STABILIZATION + REAL-DATA STEP 2 + CLEANUP

Work only in the current project:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

The application already has working functionality. Treat the current working implementation and original v31 UI as immutable bone.

Do not redesign, refactor broadly, replace prompts, change credit methodology, change model routing, remove working features, introduce mock/demo runtime results, or use public-web fallbacks.

Make only the minimum targeted changes necessary to stabilize Steps 1–2.4, complete real-data Step 2.2, improve usability, and clean the data structure.

1. INSPECT FIRST

Before changing anything, inspect the actual current code and runtime.

Check at minimum:

server.py
start_backend.ps1
rpr_search_agent.py
theme-assist / theme-quality files
Step 1 discovery/enrichment/refinement code
step2_routes.py
step2_service.py
step2_uploads.py
step22_portfolio_service.py
step22_portfolio_routes.py
step22_real_data_loader.py
Step 2.2 append JS/CSS
current working HTML
original UI Design\icm-pm-rapid-portfolio-review-v31.html
all prompt/data filename references across the project

Do not guess filenames, schemas, environment variables, or column names.

2. BACKEND PYTHON ENVIRONMENT

The backend must use exactly:

portfolio-agent\.venv\Scripts\python.exe

Confirm start_backend.ps1 launches this interpreter directly.

Do not recreate/use the old Python 3.8 .venv.

The equivalent direct command should be:

& "..\portfolio-agent\.venv\Scripts\python.exe" -m uvicorn server:app --host 127.0.0.1 --port 8000

Preserve the normal approved environment and dependencies.

3. STEP 1 — RESTORE AND STABILIZE AI ASSIST / MARKET SCANNER

AI Assist and Market Scanner must work again.

Current browser errors include:

RPR_THEME_GATE_MODEL must be set to the exact organization-approved Sonnet 5 identifier
Discovery response did not contain an events array

Diagnose both separately.

For the theme-gate problem:

inspect the approved environment/model configuration;
use the exact organization-approved Sonnet 5 identifier already intended by the project;
do not invent or downgrade the model;
do not hardcode an unapproved identifier.

For the discovery parsing problem:

inspect the actual Gemini/ADK response;
determine whether the issue is prompt output, adapter normalization, JSON extraction, or response parser;
preserve the existing business rule of up to 3 events per theme;
do not fabricate an empty or synthetic events array merely to suppress the error.

Preserve:

Gemini 3.5 Flash discovery/evidence;
Claude Opus refinement;
per-theme independent pipeline;
current Step 1 business prompt;
AI Assist replacement-theme functionality;
feedback controls.

Also note:

ANTHROPIC_API_KEY is not set

If this is only required for Trigger 2/R2D2, do not let it break Trigger 1. Report clearly which functionality requires it.

4. STEP 2.1 — SCENARIO & ASSUMPTIONS

Preserve the current Step 2.1 prompt/business objective.

Do not rewrite its methodology.

Ensure end-to-end flow works:

selected Step 1 event
→ Opus
→ scenario narrative
→ critical assumptions

Fix only actual runtime/API issues.

The previously identified raise_http / _raise_http exception-handler bug should remain fixed.

Assumptions upload/download contract

User-facing assumptions files must contain one column only:

assumption

Remove user-facing requirements for:

time_horizon
analyst_notes

One assumption per row.

Prefer generating the example assumptions CSV from the current Step 2.1 generated scenario assumptions, without another LLM call.

If no scenario exists yet, use the static generic example as fallback.

The scenario itself must remain:

forward-looking;
aligned with the stated scenario time horizon.
5. MOVE STEP 2.1 ASSUMPTION FILES TO THE CORRECT DATA LOCATION

They currently do not belong under step22.

Preferred structure:

backend\data\step21\
    assumptions_blank.csv
    assumptions_example.csv

Both contain only:

assumption

Update all download/code references safely.

6. STEP 2.2 — REAL DATA IS THE AUTHORITATIVE PORTFOLIO SOURCE

Real files currently exist under:

backend\data\step22\

Their roles are:

Relationship master

Current temporary name:

relationship_meta_data (1) (version 1).xlsx

Authoritative relationship/CAGID/company universe.

It contains the equivalents of:

CAGID
sector L1/L2/L3/L4
RRR
credit classification
country/risk code
relationship-level OSUC
MLE enrichment

mle_data_20260731.xlsx

Enrichment source containing CAGID/GFCID/MLE/exposure fields.

Preserve one-to-many CAGID→MLE/GFCID rows under mle_rows.

Do not duplicate or re-sum relationship OSUC if OSUC is already relationship/CAGID granular.

Country/geography mapping

new_mapping_code_20231204 5.xlsx

Reference/enrichment table for:

country code
country name
region
cluster

Never drop a relationship only because the geography mapping is unavailable.

7. STEP 2.2 LIVE API COMMUNICATION

Verify actual browser/runtime communication, not just Python unit logic.

Confirm live calls to:

/api/v1/rpr/step2/portfolio/catalog
/api/v1/rpr/step2/portfolio/search
/api/v1/rpr/step2/portfolio/finalize
portfolio upload endpoint

Confirm that changing filters sends a new backend request.

Report:

HTTP status
filter payload
number of matching companies
real-data source
response time where practical

Keep technical logging in backend/terminal only.

Do not add API/debug text to the product UI.

8. STEP 2.2 UI — ORIGINAL V31 IS THE VISUAL AUTHORITY

Compare the current Step 2.2 rendering to:

UI Design\icm-pm-rapid-portfolio-review-v31.html

Preserve the original v31 appearance and interactions.

Expected functionality:

Select Geography
Select Country
Select MLE
L2 sector/category selection
L3/sector cards
checkable sector options
selected-sector pills/summary
Matching Companies table
Select Portfolio tab
Upload Portfolio tab

Do not replace dropdowns with blank text inputs.

Remove any visible engineering text such as:

STEP 2.2 APPEND...
same v31 visual language...
real portfolio upload...

The internal append JS architecture can remain.

Only remove development commentary from the browser.

9. COUNTRY FILTER — ADD TYPE-TO-SEARCH

Keep the existing v31 visual appearance.

Make Select Country searchable/type-ahead.

Expected behavior:

click → list appears;
type Uni → filter to United Kingdom / United States etc.;
keyboard navigation supported;
only valid backend country values may be selected;
clear/reset back to All;
remains compatible with Geography, MLE and sectors.

Do not introduce a new UI framework.

Country is priority.

10. SECTOR FILTER BEHAVIOR

Preserve deterministic logic:

OR within one dimension;
AND across dimensions.

If L2 is selected and no explicit L3 is selected:

→ include all valid L3 values under that L2.

If L3 values are explicitly checked:

→ restrict to those L3 values.

Matching companies must update using the backend real-data search.

No LLM is involved in Step 2.2.

11. MATCHING COMPANY DATA

Step 2.2 backend should resolve and make available:

CAGID
CAGID Name / Company Name
L1
L2
L3
Country
RRR
Credit Classification
relationship-level OSUC
MLE enrichment

UI may remain concise; richer fields can stay in backend state for downstream steps.

12. PORTFOLIO UPLOAD CONTRACT — ONLY TWO USER COLUMNS

Regenerate the real upload sample.

Final professional filename:

portfolio_upload_sample_top20.xlsx

The workbook must contain exactly two columns:

CAGID
CAGID Name

Nothing else.

Use the real top 20 unique CAGIDs ranked by non-zero relationship-level OSUC descending to select the sample names.

OSUC is only the internal ranking criterion and must not appear in the file.

Do not include:

OSUC
L1/L2/L3
Country
RRR
Classification
MLE

The backend must resolve these after CAGID matching.

Preserve CAGID as text.

Test the actual XLSX upload endpoint.

Required result:

matched = 20
unmatched = 0
duplicates = 0
finalize = success
13. CLEAN AND RENAME STEP 2.2 DATA FILES

First search the entire repository for every reference before renaming anything.

Rename:

relationship_meta_data (1) (version 1).xlsx
→ relationship_master.xlsx

new_mapping_code_20231204 5.xlsx
→ country_geography_mapping.xlsx

mle_data_20260731.xlsx
→ mle_exposure_20260731.xlsx

step22_real_upload_test.xlsx
→ portfolio_upload_sample_top20.xlsx

Update all code references atomically.

Do not leave duplicate old and new copies.

14. SYNTHETIC/DEMO STEP 2.2 CSVs

Existing files:

rpr_company_master.csv
rpr_country_geography.csv
rpr_mle_reference.csv
rpr_sector_hierarchy.csv

Determine whether anything still uses them.

If explicitly required for development/test mode:

move them to:

backend\data\step22\demo\

If completely unused:

remove them.

Real-data mode must never silently fall back to demo data.

Desired behavior:

real source valid
→ real data

real source missing/corrupt/schema-invalid
→ clear error

explicit demo mode
→ demo CSVs
15. STEP 2.4 DATA

Current:

backend\data\step24\sector_inherent_factors.csv

Leave it untouched if V5.2 still uses it as the governed rollback taxonomy.

Do not rename/delete it simply for cosmetic cleanup.

V6 remains the current source-aligned sector-inherent methodology.

16. TARGET DATA STRUCTURE

Aim for:

backend\data\
├─ step21\
│  ├─ assumptions_blank.csv
│  └─ assumptions_example.csv
│
├─ step22\
│  ├─ relationship_master.xlsx
│  ├─ country_geography_mapping.xlsx
│  ├─ mle_exposure_20260731.xlsx
│  ├─ portfolio_upload_sample_top20.xlsx
│  └─ demo\
│     └─ [legacy CSVs only if explicitly still required]
│
└─ step24\
   └─ sector_inherent_factors.csv

Do not create unnecessary extra folders/files.

17. DO NOT MODIFY STEP 2.3 / STEP 2.4 CREDIT METHODOLOGY

Step 2.3 Event-Driven Risk Factors and Step 2.4 Sector-Inherent Risk Factors should only be regression-tested.

Do not:

rewrite prompts;
change factor scoring;
change High/Medium importance logic;
change V6 methodology;
alter Step 2.4 data unless required for an actual bug.
18. NO BROAD UI CHANGES

Preserve:

v31 fonts
colors
navigation
card layout
assessment journey
feedback controls
tabs
Step 1 layout
Step 2 layout

Only targeted fixes are allowed.

19. VALIDATION — DO NOT DECLARE DONE UNTIL THESE PASS
Backend
/health = PASS
backend interpreter = portfolio-agent\.venv\Scripts\python.exe
AI Assist = PASS
theme quality = PASS
Market Scanner discovery = PASS
actual event array parsed correctly
Scenario Development
real Opus scenario generation = PASS
scenario narrative renders
assumptions render
assumptions upload parser accepts one-column file
assumptions download contains only assumption
current scenario assumptions are used when available
Portfolio Selection
catalog live API = PASS
search live API = PASS
finalize live API = PASS
real company universe loaded
Geography populated
Country populated
Country type-to-search works
MLE populated
L2 populated
L3/checkable sector cards populated
changing filters generates a new backend request
matching companies update correctly
no visible STEP 2.2 APPEND text
Portfolio Upload
sample file contains exactly:

CAGID | CAGID Name

actual XLSX endpoint tested
20/20 matched
0 unmatched
0 duplicates
finalize = PASS
Regression
Step 2.3 imports/runs
Step 2.4 V6 imports/runs
v31 visual design intact
20. IMPORTANT: DO NOT OVERCOMPLICATE

Repair what exists.

Prefer:

small targeted patches;
existing services/routes;
existing API contracts;
existing real-data loader;
existing UI IDs/components;
existing model routing;
existing prompts.

Do not create a replacement application.

FINAL RESPONSE FORMAT

When finished, respond only with:

ROOT CAUSES

Step 1 AI Assist/theme gate
Step 1 discovery parser
Step 2.1
Step 2.2 if any

FILES CHANGED

One line per file and why.

FILES RENAMED

Old → new.

FILES MOVED

FILES REMOVED

FINAL DATA FOLDER STRUCTURE

STEP 1

AI Assist: PASS/FAIL
Market Scanner: PASS/FAIL
events parsed: PASS/FAIL

SCENARIO DEVELOPMENT

real Opus call: PASS/FAIL
scenario: PASS/FAIL
assumptions: PASS/FAIL
one-column upload/download: PASS/FAIL

PORTFOLIO SELECTION

real source: PASS/FAIL
catalog: PASS/FAIL
search: PASS/FAIL
finalize: PASS/FAIL
country type-ahead: PASS/FAIL
sector checkboxes: PASS/FAIL

PORTFOLIO UPLOAD

exactly CAGID | CAGID Name: PASS/FAIL
actual XLSX test: PASS/FAIL
matched:
unmatched:
duplicates:

REGRESSION

Step 2.3: PASS/FAIL
Step 2.4 V6: PASS/FAIL
v31 design: PASS/FAIL

RESTART COMMAND

Give the exact command using the approved portfolio-agent interpreter.

Do not proceed to the Name-Level Assessment until all of the above is stable.
