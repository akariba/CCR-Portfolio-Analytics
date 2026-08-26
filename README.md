RPR FULL FORENSIC HANDOFF / STATE-OF-WORK REPORT

Before making any further changes, stop implementation and give me a complete technical handoff of everything you have done in this RPR project during this session and the immediately preceding related work.

I need this so another engineer/AI can continue safely without repeating mistakes or damaging working functionality.

Do not modify any files while producing this report. Do not run cleanup or fixes unless needed only to inspect current state.

I want facts from the actual current repository, terminal history, code, tests and runtime — not assumptions.

1. CURRENT APPLICATION STATE

Start with a concise status:

Backend: WORKING / PARTIAL / BROKEN
Frontend: WORKING / PARTIAL / BROKEN
Step 1: ...
Step 2.1: ...
Step 2.2: ...
Step 2.3: ...
Step 2.4: ...
Step 2.5: not started / partial / ...

For every status, explain what was actually tested versus what is merely inferred.

2. EXACT ARCHITECTURE YOU NOW UNDERSTAND

Explain your current understanding of the RPR architecture.

Cover:

frontend entry HTML;
append JS/CSS architecture;
FastAPI entry point;
backend routes;
services;
model routing;
prompt loading;
Step 1 discovery → enrichment → refinement;
Step 2.1 scenario generation;
Step 2.2 portfolio selection;
Step 2.3 event-driven factors;
Step 2.4 sector-inherent factors;
how state flows between steps;
real-data sources;
upload flows.

Explicitly identify which components you consider working bone that should not be refactored.

3. ALL FILES YOU CHANGED

Give me a complete table:

File
Created / Modified / Renamed / Deleted
What changed
Why it changed
Which feature depends on it
Risk of reverting it

Include every Python, JS, CSS, HTML, prompt, PowerShell, requirements and data/template file touched.

Do not omit diagnostic/helper scripts you created temporarily.

For temporary diagnostic files, state whether they still exist.

4. ALL FILES RENAMED / MOVED / REMOVED

Show exact paths:

OLD PATH → NEW PATH

Explain why each move/rename was made and all code references that were updated.

Also tell me whether any stale duplicate files remain.

5. ALL ERRORS ENCOUNTERED

Give me a chronological error log.

For every meaningful error include:

Error/message
Where it occurred
User-visible symptom
Root cause
Evidence supporting the root cause
Fix applied
Whether the fix was verified
Risk of recurrence

Include at minimum everything encountered around:

wrong Python .venv;
Python 3.8 vs approved portfolio-agent\.venv;
google-adk / google-genai;
openpyxl;
ANTHROPIC_API_KEY;
Theme Quality Gate / Sonnet;
helix auth access-token print -a timeout;
RPR_THEME_GATE_MODEL;
Gemini discovery response missing events;
raise_http / _raise_http;
Step 2.1 assumptions extraction;
Step 2.2 unavailable / slow loading;
portfolio catalog/search/finalize;
duplicate or overlapping Uvicorn processes;
WatchFiles reloads;
diagnostic scripts triggering reload;
port 8000 process cleanup;
any frontend/API mismatch;
any other error not listed here.

Do not hide errors that were later fixed.

6. UVICORN / BACKEND PROCESS ISSUE

Explain in detail what happened with the multiple backend processes.

I saw your observation that:

a diagnostic script triggered another reload;
multiple overlapping Uvicorn instances appeared bound to 127.0.0.1:8000;
there were lingering TIME_WAIT / CLOSE_WAIT connections.

Explain:

exactly how the duplicate/reload condition occurred;
whether multiple actual listeners existed or only stale connections;
whether --reload contributed;
whether files created inside watched directories triggered reloads;
how you cleaned it up;
what the safe startup procedure is now;
what should never be done during a demo.
7. CURRENT BACKEND STARTUP CONTRACT

Give the exact approved Python executable.

Show the exact current contents/behavior of:

start_backend.ps1

Confirm whether it launches:

portfolio-agent\.venv\Scripts\python.exe

and not another .venv.

Give the exact manual equivalent command.

Also explain whether --reload should remain enabled for:

development;
a client demo.

If you recommend different behavior for demo stability, state it clearly but do not change it yet.

8. STEP 1 — CURRENT STATE

Document separately:

AI Assist / Theme Quality
endpoint;
model;
authentication mechanism;
Helix dependency;
current status;
exact unresolved error if any.
Market Scanner
Gemini model;
ADK/web-search mechanism;
prompt files;
response schema;
expected events[] contract;
current parser;
whether actual discovery currently works.
Enrichment

Explain evidence enrichment.

Opus refinement

Explain refinement.

Trigger 2 / R2D2

Explain whether the missing Anthropic API key affects only Trigger 2 or anything else.

Clearly distinguish:

WORKING

BROKEN

NOT TESTED

9. STEP 2.1 — CURRENT STATE

Explain:

scenario-generation route;
prompt file;
model;
input contract;
output contract;
assumptions upload;
assumptions extraction;
assumptions example download.

Confirm current assumptions template schema.

It should now be:

assumption

only.

State whether the dynamic example is actually generated from the current scenario or whether static fallback is being used.

10. STEP 2.2 — REAL DATA ARCHITECTURE

Explain precisely how the real portfolio data now works.

Document:

authoritative relationship master;
geography mapping;
MLE data;
CAGID mapping;
company-name mapping;
L1/L2/L3;
country;
geography;
RRR;
classification;
relationship OSUC;
MLE/GFCID one-to-many behavior.

Give actual row counts currently observed.

Explain the difference between:

catalog
search
finalize
upload

and what each endpoint returns.

11. STEP 2.2 PERFORMANCE

Tell me exactly what you currently believe is making Step 2.2 slow or unavailable during startup/demo.

Separate measured facts from hypotheses.

Address:

XLSX parsing;
relationship master load;
~large MLE workbook;
joins/normalization;
repeated loading;
caching;
empty-filter search;
whether 84k companies are returned;
payload transfer;
frontend DOM rendering;
backend reloads.

If timings have been measured, give them.

If not, say NOT MEASURED.

Do not invent timings.

Then give your recommended architecture for making Step 2.2 demo-stable.

12. PORTFOLIO UPLOAD

State the final intended user upload contract.

It should be:

CAGID
CAGID Name

only.

Explain:

how matching works;
what backend fields are resolved;
whether CAGID is treated as text;
top-20 sample generation;
whether actual XLSX upload was tested;
matched/unmatched/duplicate results.

Give the current exact sample filename and path.

13. STEP 2.3

Explain:

prompt;
model;
routes/services;
factor generation;
High/Medium importance;
deterministic weighting;
feedback/revision;
current working status.

Also list known frontend mismatches against v31.

Do not say it matches v31 unless you performed a side-by-side comparison.

14. STEP 2.4

Explain both:

V5.2
purpose;
CSV taxonomy dependency;
why it remains;
V6
prompt;
independent factor identification;
structural persistence rule;
scoring;
buffer logic;
importance;
weighting;
current API flow.

Explain all frontend differences still known against v31, particularly:

dark/black table header versus grey;
Factor Importance High/Medium control;
cards/tables/spacing.
15. FRONTEND / V31 DIFFERENCES

Perform a source comparison, without modifying anything.

Compare current frontend against:

UI Design\icm-pm-rapid-portfolio-review-v31.html

Give me:

Area
v31 behavior/style
Current behavior/style
Difference
File/selectors responsible
Recommended minimal correction

Focus especially on Steps 2.3 and 2.4.

16. CURRENT PROMPT ARCHITECTURE

List every prompt currently used at runtime.

For each:

Prompt filename
Business purpose
Source/original prompt it comes from
Model
Calling service
Inputs
Output

Distinguish:

original business prompts;
runtime splits derived from them;
implementation helper prompts;
proposed prompts not yet approved.
17. WHAT YOU LEARNED / DECISION RATIONALE

I do not need private hidden chain-of-thought.

Give me the useful engineering rationale and conclusions you reached, including:

what assumptions you initially made that were wrong;
what repository facts changed your understanding;
why specific fixes were chosen;
alternatives considered and rejected;
what architecture you now believe is safest;
areas where you are still uncertain.

This section should be sufficient for another senior engineer to understand the direction without seeing your internal reasoning.

18. WHAT MUST NOT BE CHANGED

Based on your current understanding, explicitly list the working bone.

Example:

File / feature
Why it must be preserved
What would break if refactored

Include original v31 design, working APIs, prompts, scoring, real-data mappings, etc.

19. OPEN ISSUES

Give one table:

Priority
Issue
Current symptom
Root cause known? YES/NO
Proposed next action
Risk
Blocks Step 2.5? YES/NO

Do not mark something solved merely because the backend imports.

Distinguish:

code import test;
API test;
live model call;
browser end-to-end test.
20. STEP 2.5 READINESS

Do not implement Step 2.5 yet.

Based on the code and existing Step 3a/Step 3b business prompts, state what is still required to implement:

SEC + Web;
CAM + Web;
CAM + SEC + Web.

Identify:

existing UI placeholders/functions;
missing backend routes/services;
SEC/Stylus integration requirement;
CAM retrieval/input requirement;
Web evidence service that can be reused;
deterministic scoring/calculation components that can be reused;
missing information that must be obtained before coding.
21. RECOMMENDED NEXT ORDER OF WORK

Give a prioritized sequence.

I expect something broadly like:

1. stabilize runtime/process/authentication
2. verify Step 1
3. make Step 2.2 demo-stable
4. reconcile Step 2.3/2.4 with v31
5. freeze Steps 1–2.4
6. implement Step 2.5

But derive the final order from the actual repository state.

Explain why each task should come before the next.

22. SAFE ROLLBACK / RECOVERY

Tell me:

which backups exist;
which known-working files exist;
how to recover if the current branch breaks;
which files constitute the latest stable baseline.

Do not create new backups during this report unless absolutely necessary.

23. FINAL EXECUTIVE SUMMARY

Finish with no more than ~15 bullets covering:

what works;
what was fixed;
what is still broken;
largest technical risk;
largest demo risk;
current architecture direction;
what should happen next.

Be critical. Do not tell me “everything works” unless it has actually been validated end-to-end.

Use exact filenames, routes, errors, models and observed counts wherever available.

Do not make any code changes while preparing this report.
