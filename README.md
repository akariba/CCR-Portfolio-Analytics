Use these exact simple test inputs in the Stylus preset:

CompanyContextJSON
{"company_name":"Apple Inc.","ticker":"AAPL","cik":"0000320193","cagid":null,"current_rrr":null,"current_class":null}
ScenarioContextJSON
{"scenario_name":"US Trade Policy & Tariffs","assessment_horizon":"12+ months","scenario_narrative":"Assess Apple under continuing US trade-policy uncertainty, tariffs, supply-chain pressure and regulatory risk."}
EventDrivenFactorsJSON
[{"factor_id":"ED-1","factor_name":"Leadership transition","source_step":"2.3","weight":0.3,"score":-1},{"factor_id":"ED-2","factor_name":"Regulatory scrutiny of Services","source_step":"2.3","weight":0.4,"score":-1}]
SectorInherentFactorsJSON
[{"factor_id":"SI-1","factor_name":"Regulatory scrutiny of Services","source_step":"2.4","weight":0.2,"score":-1}]
AssessmentASOFDATE
2026-09-02




## MANDATORY FINAL SCORING CONTRACT

CompanyContextJSON

{
  "company_name": "Apple Inc.",
  "ticker": "AAPL",
  "cik": "0000320193"
}

ScenarioContextJSON

{
  "assessment_horizon": "12M",
  "base_case": "Soft landing",
  "stress_case": "Regulatory escalation"
}

EventDrivenFactorsJSON

[
  {
    "factor_id": "ED-1",
    "factor_name": "Leadership transition",
    "weight": 0.3
  },
  {
    "factor_id": "ED-2",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.4
  }
]

SectorInherentFactorsJSON

[
  {
    "factor_id": "SI-1",
    "factor_name": "Regulatory scrutiny of Services",
    "weight": 0.2
  }




STOP ALL IMPLEMENTATION NOW.

I need a precise forensic handoff of EVERYTHING you have done in this RPR workspace during the LAST 2 HOURS.

THIS IS AN AUDIT / HANDOFF REQUEST ONLY.

DO NOT:
- modify any code
- fix anything
- refactor anything
- run another Step 2.5 assessment
- run Stylus
- call Runner
- fetch or refresh a token
- restart the backend
- modify the frontend
- modify the preset
- modify knowledge files
- modify Step 2.1 / 2.2 / 2.3 / 2.4 / 2.5
- delete temporary files
- clean anything
- revert anything
- create new architecture
- continue previous TODOs

READ-ONLY INSPECTION ONLY.

============================================================
PURPOSE
============================================================

I am handing the project state to another reasoning session.

The previous handoff does NOT include roughly the last two hours of your work.

I need you to reconstruct exactly what happened during that period so that another engineer/AI can understand:

1. what you changed;
2. why you changed it;
3. what was proven;
4. what was only suspected;
5. what failed;
6. what is currently working;
7. what remains broken;
8. what the CURRENT filesystem/code state actually is;
9. whether any working RPR backbone was changed;
10. what should NOT be touched next.

Do not give me a high-level summary only.

I need an engineering-grade change log.

============================================================
TIME WINDOW
============================================================

First determine the CURRENT LOCAL SYSTEM TIME.

Define:

AUDIT_END = current local system time
AUDIT_START = AUDIT_END minus exactly 2 hours

Print both timestamps.

Then reconstruct activity occurring inside this exact interval.

Use actual evidence wherever possible:

- Git diff/status/history if available
- file modification timestamps
- terminal command history available to you
- VS Code edits
- your current conversation/session actions
- generated files
- backend logs
- Step 2.5 run artifacts
- test scripts
- server logs
- temporary diagnostic files
- frontend changes
- YAML/prompt/schema changes

Do NOT depend solely on your conversational memory.

If you cannot prove that something happened inside the exact window, label it:

TIME_UNCERTAIN

Do not silently include older work as recent work.

============================================================
RPR IMMUTABLE BACKBONE RULE
============================================================

The RPR project uses the following strict rule:

KNOWN WORKING CODE IS THE BUILDING BONE.

Anything already proven working must be preserved.

Changes should be additive/minimal and must not casually replace, refactor or redesign working behavior.

The currently proven Step 2.5 path includes important building blocks such as:

- existing Step 2.5 FastAPI route
- existing Runner Service integration
- existing same-session Runner SSE handling
- SEC integration
- Web integration
- six-input Step 2.5 context contract
- Step 2.2 company context
- Step 2.1 scenario context
- Step 2.3 Event-Driven factors
- Step 2.4 Sector-Inherent factors
- Step 2.5 user feedback
- Stylus inline preset execution path
- existing company identity / CIK resolution mechanism
- existing Step 2.5 parsing/schema persistence
- v31 as frontend visual/functional reference
- successful real Apple Step 2.5 execution previously proven:
  CONTEXT_HTTP = 200
  RUNNER_AUTH = PASS
  PRESET_TOOL_CALLED = PASS
  PRESET_TOOL_COMPLETED = PASS
  SEC = PASS
  WEB = PASS
  MODEL_FINAL_RESPONSE = PASS
  JSON_PARSED = PASS
  SCHEMA_VALID = PASS
  RUN_HTTP = 200

Do not assume these are unchanged.

CHECK whether anything you did during the last two hours modified any of these building blocks.

============================================================
SECTION 1 — EXACT FILE CHANGE INVENTORY
============================================================

List EVERY file modified, created, deleted, renamed or generated during the audit window.

For each file provide:

FILE:
FULL/PROJECT-RELATIVE PATH:
ACTION:
    modified / created / deleted / renamed / generated
TIMESTAMP:
WHY:
WHAT EXACTLY CHANGED:
APPROXIMATE LINES/SECTIONS:
BEHAVIOR BEFORE:
BEHAVIOR AFTER:
STATUS:
    required / diagnostic / temporary / accidental / uncertain
WORKING BACKBONE IMPACT:
    none / additive / modifies working behavior / unknown
SAFE TO KEEP:
    YES / NO / REVIEW
ROLLBACK NEEDED:
    YES / NO / UNKNOWN

Do not simply say:

"updated frontend"

Tell me exactly what function, model, predicate, field mapping,
route, CSS rule, event listener, schema object, etc. changed.

Pay particular attention to files including, if touched:

backend/step25/models.py
backend/step25/stylus_engine.py
backend/step25/stylus_runner_client.py
backend/step25/runner_client.py
backend/step25/router.py
backend/step25/company_context.py
backend/step25/company_identity.py
backend/step25/errors.py
backend/server.py
backend/step22_portfolio_service.py

STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

RPR_STEP25_FIELD_DICTIONARY.md

pr_step25_secweb_output_schema_v1.*
Step25Assessment.schema.*

UI Design/step23.html
UI Design/rpr_step25_append.js
UI Design/rpr_step25_append.css
v31 reference HTML

plus ANY other files.

Do not restrict the report to the examples above.

============================================================
SECTION 2 — EXACT CODE DIFF SUMMARY
============================================================

For every CODE file changed, show the meaningful diff conceptually.

I do NOT need thousands of raw diff lines.

I need:

FUNCTION / CLASS / BLOCK:
BEFORE:
AFTER:
REASON:
OBSERVED EFFECT:
PROVEN OR ASSUMED:

Example:

File:
backend/step25/models.py

Object:
FactorAssessment

Before:
fields X/Y/Z...

After:
added weight, score, impact_rating...

Reason:
Stylus returned these fields but Pydantic extra="forbid" /
mapping discarded them...

Observed evidence:
...

Do this for every material code change.

============================================================
SECTION 3 — DATA MODEL / SCHEMA CHANGES
============================================================

This is especially important.

Tell me exactly whether the last two hours changed:

- FactorAssessment
- Step25Assessment
- scoring object
- evidence object
- credit conclusion
- company context
- ED score mapping
- SI score mapping
- composite score mapping
- residual rating
- credit impact rating
- factor weight
- factor score
- factor impact_rating
- RRR
- classification
- recommendation fields
- evidence IDs
- analyst fields

For each change state:

SOURCE MODEL FIELD
→ MODEL OUTPUT FIELD
→ BACKEND PARSED FIELD
→ SAVED ASSESSMENT FIELD
→ FRONTEND FIELD

Identify any data that was previously being silently discarded.

Identify whether that issue is NOW fixed.

============================================================
SECTION 4 — PROMPT / PRESET STATE
============================================================

I need an exact answer here because we discovered possible drift.

Report separately:

A. CURRENT LIVE STYLUS PRESET PROMPT

B. CURRENT LOCAL:
STYLUS_SEC_WEB_PRESET_DEFINITION.yaml

C. CURRENT:
RPR_STEP25_FIELD_DICTIONARY.md

D. CURRENT Step 2.5 output schema knowledge file

E. Any Step 3a methodology/threshold knowledge files

For each report:

CURRENT FILE/PRESET:
LAST MODIFIED:
WHAT IT CONTAINS:
USED BY ACTUAL BACKEND? YES/NO/UNKNOWN
USED BY LIVE STYLUS PRESET? YES/NO/UNKNOWN
MATCHES LIVE PRESET? YES/NO/UNKNOWN
MISMATCH DETAILS:

In particular confirm whether the backend inline preset prompt
currently matches the live Stylus preset I manually configured.

Do NOT change anything to make them match during this audit.

Just report the truth.

============================================================
SECTION 5 — STEP 3a METHODOLOGY GROUNDING
============================================================

During the recent work you raised concerns around Step 3a methodology.

Report exactly what you discovered.

Specifically answer:

1. Does Step 2.5 currently have the authoritative Step 3a:
   - 1–5 scoring rules?
   - ED weighted calculation?
   - SI weighted calculation?
   - 80% ED / 20% SI composite?
   - residual-rating thresholds?
   - credit-impact rules?
   - RRR decision tables?
   - classification tables?
   - downgrade / Better-of rules?

2. Where does each rule currently live?

3. Is it:
   - supplied directly in prompt,
   - supplied through knowledge,
   - coded deterministically,
   - or merely expected from model memory?

4. Did you generate any new Step 3a knowledge file?

5. If yes:
   FILE =
   CREATED =
   CONTENT =
   UPLOADED TO STYLUS = YES/NO
   WIRED INTO BACKEND INLINE PRESET = YES/NO

Do NOT upload or wire anything during this audit.

============================================================
SECTION 6 — STEP 2.2 PORTFOLIO DATA
============================================================

Explain every change you made related to Step 2.2.

We recently observed real UI portfolio rows such as:

- DOMI TRADING SL
- Spanish/private-company names
- CAGIDs
- missing ticker/CIK in Step 2.2 source
- many rows showing:
  "Not supplied by Step 2.2 portfolio source"
- exposure fields showing:
  "Exposure unavailable in input portfolio"

Report exactly:

STEP22 SOURCE USED:
ROWS OBSERVED:
ROW COUNT:
COMPANY NAME SOURCE:
CAGID SOURCE:
TICKER SOURCE:
CIK SOURCE:
MLE SOURCE:
COUNTRY SOURCE:
L1/L2/L3 SOURCE:
EXPOSURE SOURCE:
OSUC SOURCE:

What was changed in Step 2.2 code?

Did you:
- repair company names?
- create fallback names?
- alter pagination?
- increase row count?
- change field aliases?
- change deduplication?
- change filtering?
- change confirmed-company state?
- change SEC eligibility?
- infer missing values?

Give exact details.

No fabricated field values are permitted.

============================================================
SECTION 7 — STEP 2.3 / STEP 2.4 STATE
============================================================

Report what happened during the last two hours involving:

Step 2.3 Event-Driven factors
Step 2.4 Sector-Inherent factors

For each:

INPUT:
MODEL/LLM:
NUMBER OF FACTORS GENERATED:
NUMBER CONFIRMED:
CONFIRMATION STATE:
FILES/ROUTES CHANGED:
FAILURES OBSERVED:
FIXES APPLIED:
CURRENT STATUS:

Explain the repeated UI/system-log messages such as generation
failures if they occurred.

Separate genuine backend failure from UI/state-display failure.

============================================================
SECTION 8 — STEP 2.5 READINESS / RUN BUTTON
============================================================

This is currently one of the most important areas.

The recent UI showed:

Step 2.1 = confirmed
Step 2.2 = confirmed
Step 2.3 = confirmed
Step 2.4 = confirmed

Selected company present.

UI displayed:

"Eligible — SEC + Web"

but:

"Run Assessment"

was disabled / prohibited cursor.

Report exactly what you discovered about this.

Give me:

ELIGIBILITY_BADGE_PREDICATE =
RUN_BUTTON_DISABLED_PREDICATE =
BACKEND_PREFLIGHT_PREDICATE =
SELECTED_COMPANY_STATE =
SEC_ELIGIBILITY_STATE =
CIK_RESOLUTION_STATE =
CURRENT_MISMATCH =
ROOT_CAUSE_KNOWN = YES/NO
ROOT_CAUSE =

If you made any modification attempting to fix it, give the exact
change.

Do NOT make another change now.

============================================================
SECTION 9 — TOKEN / AUTH WORK
============================================================

Report everything done during the audit window concerning:

.runner_token
.runner_refresh_token
GENAI_BEARER_TOKEN
GENAI_REFRESH_TOKEN
manual token copying
browser token
token.oauth2
Runner bearer token
auto-refresh
background token refresher
refresh interval
401
TOKEN_EXPIRED
400 refresh failure

For security:

DO NOT print actual tokens or credentials.

Use:

[REDACTED]

Report only:

TOKEN SOURCE:
TOKEN CACHE FILE:
EXPIRY BEHAVIOR:
AUTO REFRESH STATUS:
MANUAL REFRESH STATUS:
CURRENT TOKEN STATUS:
ANY CODE CHANGED:
FILES CHANGED:

Also state whether any token appeared in console/log/source files
and whether those files should be cleaned later.

Do NOT clean them now.

============================================================
SECTION 10 — COMMANDS AND PROCESSES EXECUTED
============================================================

Reconstruct significant commands run during the audit period.

Group by purpose rather than dumping useless shell noise.

Examples:

SERVER START/STOP:
TOKEN COMMANDS:
TEST COMMANDS:
HTTP CALLS:
PYTHON SCRIPTS:
SEARCH/GREP:
FILE GENERATION:
OTHER:

For every REAL model assessment execution tell me:

COMPANY:
RUN_ID:
ASSESSMENT_ID:
CONTEXT_HTTP:
RUNNER_AUTH:
SEC:
WEB:
MODEL_FINAL_RESPONSE:
JSON_PARSED:
SCHEMA_VALID:
RUN_HTTP:
RESULT:

Do NOT confuse:
- manual Stylus execution
- backend Runner execution
- terminal harness execution
- frontend execution

They must be reported separately.

============================================================
SECTION 11 — TESTS PERFORMED
============================================================

List every meaningful test during the two-hour window.

For each:

TEST:
PURPOSE:
INPUT:
EXPECTED:
ACTUAL:
PASS/FAIL:
WHAT IT PROVES:
WHAT IT DOES NOT PROVE:

Especially identify whether any successful result was:

- direct Stylus only
- backend only
- terminal harness only
- actual frontend end-to-end

Do not call a terminal harness success an end-to-end UI success.

============================================================
SECTION 12 — CURRENT FRONTEND STATE
============================================================

Report current frontend implementation status for:

Step 2.1
Step 2.2
Step 2.3
Step 2.4
Step 2.5

Compare Step 2.5 specifically with v31.

Report:

V31 STRUCTURE MATCH =
V31 TABLE MATCH =
V31 COLUMNS MATCH =
V31 EXPANDED FACTOR PANELS =
V31 RRR FIELDS =
V31 CLASSIFICATION FIELDS =
V31 KEY RISK DRIVER =
V31 IMPACT RATING OVERRIDE =
V31 USER CREDIT COMMENTARY =
V31 CONFIRM ASSESSMENT =
RUN ASSESSMENT WORKING =
REAL BACKEND RESULT RENDERING =
FEEDBACK WORKING =

For any NO/PARTIAL explain why.

============================================================
SECTION 13 — CURRENT BACKEND STATE
============================================================

Give the current state of the Step 2.5 backend.

Use exactly:

CONTEXT_ROUTE =
RUN_ROUTE =
RUNNER_AUTH =
RUNNER_SSE =
PRESET_TOOL_CALL =
SEC_TOOL =
WEB_TOOL =
MODEL_FINAL =
JSON_PARSE =
SCHEMA_VALIDATION =
PERSISTENCE =
FACTOR_SCORE_PERSISTENCE =
ED_SCORE =
SI_SCORE =
COMPOSITE_SCORE =
RESIDUAL_RATING =
CREDIT_IMPACT =
CIK_RESOLUTION =
TOKEN_REFRESH =
KNOWN_BLOCKER =

============================================================
SECTION 14 — PROVEN FACTS VS HYPOTHESES
============================================================

Create two groups.

PROVEN:

Only things demonstrated from actual execution/code/logs.

HYPOTHESES / NOT YET PROVEN:

Anything still inferred or suspected.

This distinction is mandatory.

============================================================
SECTION 15 — TEMPORARY / DIAGNOSTIC ARTIFACTS
============================================================

List every temporary file/script/log created during the window.

Examples may include:

_step25_acceptance_run.py
_step25_acceptance_run_output.txt
raw Runner SSE dumps
debug artifacts
temporary JSON
temporary token files
trace scripts
generated knowledge files

For each:

FILE:
PURPOSE:
STILL NEEDED:
SAFE TO DELETE LATER:
DO NOT DELETE YET IF:

Do not delete them now.

============================================================
SECTION 16 — TODO / UNFINISHED ACTIONS
============================================================

List everything you were in the middle of doing.

For each:

TODO:
WHY:
STATUS:
BLOCKER:
NEXT ACTION YOU WOULD HAVE TAKEN:
SHOULD NEXT ENGINEER CONTINUE IT:
YES / NO / REVIEW FIRST

Include questions you asked me but I have not yet answered.

============================================================
SECTION 17 — HIGH-RISK CHANGES
============================================================

Identify any changes during the last two hours that could have
accidentally changed previously working behavior.

Use:

HIGH_RISK_CHANGE:
FILE:
WHY RISKY:
PREVIOUS WORKING BEHAVIOR:
NEW BEHAVIOR:
TESTED:
RECOMMEND KEEP/REVERT/REVIEW:

This section is extremely important.

============================================================
SECTION 18 — GIT / WORKTREE STATE
============================================================

If Git is available, report:

BRANCH =
HEAD =
GIT_STATUS =
MODIFIED_FILES =
UNTRACKED_FILES =
DELETED_FILES =

Do NOT commit.
Do NOT stage.
Do NOT checkout.
Do NOT reset.

Also distinguish:

changes from the LAST 2 HOURS

from:

older existing dirty-worktree changes.

This repo already contained many historical modifications, so do
not attribute every current diff to your recent work.

============================================================
SECTION 19 — THE 10 MOST IMPORTANT THINGS THAT HAPPENED
============================================================

After the detailed forensic report, give exactly the 10 most
important developments from the last two hours, ordered by
importance.

Each should be one or two sentences maximum.

============================================================
SECTION 20 — HANDOFF SNAPSHOT
============================================================

Finish with this exact compact structure:

AUDIT_WINDOW_START =
AUDIT_WINDOW_END =

LAST_KNOWN_GOOD_STEP25_BACKEND =
CURRENT_STEP25_BACKEND =
CURRENT_STEP25_FRONTEND =
CURRENT_STEP22_DATA =
CURRENT_PRESET_STATE =
CURRENT_SCHEMA_STATE =
CURRENT_STEP3A_GROUNDING =
CURRENT_TOKEN_STATE =

MOST_IMPORTANT_CODE_CHANGE =
MOST_IMPORTANT_BUG_FIXED =
MOST_IMPORTANT_UNRESOLVED_BUG =

WORKING_BACKBONE_CHANGED = YES/NO/PARTIAL
IF_YES_EXPLAIN =

SAFE_NEXT_ACTION =
DO_NOT_TOUCH =

READY_FOR_FULL_UI_2.1_TO_2.5_TEST = YES/NO

IF_NO:
EXACT_REMAINING_BLOCKERS =
1.
2.
3.

============================================================
STRICT ACCURACY RULES
============================================================

1. DO NOT GUESS.

2. DO NOT claim a test passed unless you have execution evidence.

3. DO NOT call something "fixed" merely because code was changed.

4. Distinguish:
   CODE_CHANGED
   from
   TESTED
   from
   PROVEN_WORKING.

5. Do not use a successful direct Stylus run as proof that the RPR
   UI integration works.

6. Do not use a successful backend harness as proof that the
   frontend works.

7. Do not attribute old changes to the last two hours.

8. Do not hide accidental changes.

9. Do not shorten the report because of token length. This is a
   handoff document and completeness is more important.

10. Do not perform any new implementation while preparing it.

11. Do not start another assessment.

12. Do not alter files just to improve the report.

13. If evidence conflicts, show both pieces of evidence.

14. If exact timing cannot be reconstructed, say TIME_UNCERTAIN.

15. Any credential/token content must be REDACTED.

START NOW WITH READ-ONLY INSPECTION.

Your first line must be:

FORENSIC RPR 2-HOUR HANDOFF — READ-ONLY AUDIT

Your final line must be:

NO CODE OR RUNTIME STATE WAS INTENTIONALLY CHANGED DURING THIS AUDIT.
