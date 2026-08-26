RPR FRONTEND VISUAL RECONCILIATION — STEP 2.3 & STEP 2.4 ONLY

Work only in:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

The purpose of this task is only to reconcile frontend/HTML/CSS differences between the current working application and the original v31 design, especially in Event-Driven Risk Factors and Sector-Inherent Risk Factors.

Do not modify business logic, prompts, models, backend services, data, API contracts, scoring, or assessment methodology.

The original visual authority is:

UI Design\icm-pm-rapid-portfolio-review-v31.html

Compare it against the current working frontend, including as applicable:

current consolidated HTML
rpr_step22_step23_append.js
corresponding Step 2.3 CSS
rpr_step24_append.js
rpr_step24_append.css

Do not assume the append implementation is visually correct simply because functionality works.

1. INSPECT BEFORE CHANGING

Perform a DOM/CSS comparison specifically for the original v31 sections corresponding to:

Event-Driven Risk Factors
Sector-Inherent Risk Factors

Compare:

section headers
table headers
table body
cards
borders
backgrounds
badges
spacing
typography
expandable sections
importance controls
buttons
feedback panels

Identify the exact local selectors/classes responsible for each visible mismatch.

Do not globally restyle tables or cards.

2. KNOWN MISMATCH TO FIX

One clear mismatch already observed:

In original v31, a table/header area at the top of the factor content uses a dark/black treatment.

In the current implementation, the equivalent area appears grey.

Restore the exact v31 treatment for the corresponding Step 2.3 / Step 2.4 element.

Do not guess a new color.

Read the original v31 CSS/DOM and reuse the original class/style behavior.

3. STEP 2.3 — EVENT-DRIVEN RISK FACTORS

Preserve all current working Step 2.3 functionality:

generated event-driven factors
factor metrics
vulnerability/buffer content
High/Medium importance
deterministic weights
revision/feedback functionality
current backend calls

Only reconcile the frontend presentation with v31.

Check especially:

factor table/header styling
dark header bands
section hierarchy
factor cards
importance display/control
metric tables
spacing between factor blocks
selected/active states
typography
bottom action/feedback controls

Do not alter any generated content structure unless required solely to reproduce the original v31 DOM presentation.

4. STEP 2.4 — SECTOR-INHERENT RISK FACTORS

Preserve the current working V6 implementation completely.

Do not modify:

V6 prompt
factor identification
structural persistence methodology
vulnerability/buffer logic
scoring
backend weighting
generate/revise/finalize APIs
V5.2 rollback path
backend\data\step24

Only restore v31 frontend styling/interaction.

Confirm the original v31 Factor Importance control is present and visually correct:

HIGH | MEDIUM

Generated value should remain preselected.

Existing behavior must remain:

High = score 2
Medium = score 1
changing importance recalculates normalized weights
weights total exactly 100%

Restore the v31 control visually if the current V6 card differs.

Also inspect:

top table/header color
factor title area
risk metric tables
vulnerability/buffer blocks
scoring rows
borders/backgrounds
spacing
badges
buttons
expanded/collapsed behavior
5. DO NOT MAKE GLOBAL CSS CHANGES

This is critical.

Do not solve a Step 2.3/2.4 mismatch by changing generic selectors such as:

table
th
td
.card
.section
button

unless the original v31 itself uses that exact global rule and the change is proven safe.

Prefer narrowly scoped selectors such as:

#step23 ...
#step24 ...
.step23-...
.step24-...

or the exact existing v31 selectors.

Steps 1, 2.1 and 2.2 must remain visually unchanged.

6. REMOVE DEVELOPMENT-ONLY FRONTEND TEXT

Ensure no implementation commentary is visible in Steps 2.3 or 2.4, such as:

APPEND
V6 addon
backend-driven
implementation/debug notes

Internal filenames/classes may keep these names.

Only remove such wording from the user-facing page.

7. DO NOT REWRITE THE HTML

Do not create a new consolidated frontend.

Do not copy/rebuild all of v31.

Keep the current working frontend and apply small local patches to restore the visual bone.

If the append JS generates DOM that differs from v31, adjust only the generated markup/classes required for visual equivalence.

8. VALIDATE SIDE BY SIDE

Compare:

Original v31

vs.

Current working RPR after patch

for both Step 2.3 and Step 2.4.

Validate:

dark/black header treatment matches;
tables match v31;
cards match v31;
borders/backgrounds match;
typography matches;
spacing/padding matches;
High/Medium importance controls match;
buttons/actions match;
feedback panels remain intact;
no new horizontal overflow/layout break;
Step 2.3 functionality still works;
Step 2.4 V6 functionality still works;
Steps 1, 2.1 and 2.2 are unchanged.

Do a browser render check, not just source inspection.

9. STRICT SCOPE

Do not touch:

backend Python unless absolutely required to fix a frontend contract regression;
prompts;
model configuration;
real portfolio data;
Step 1;
Scenario Development;
Portfolio Selection;
Name-Level Assessment;
scoring methodology.

This task is frontend visual reconciliation only.

FINAL RESPONSE

Give me:

MISMATCHES FOUND

Step 2.3
Step 2.4

FILES CHANGED

One line per file.

VISUAL FIXES

Short description of each targeted fix.

FUNCTIONAL REGRESSION

Step 2.3: PASS/FAIL
Step 2.4 V6: PASS/FAIL
Steps 1/2.1/2.2 unchanged: PASS/FAIL

V31 MATCH

header/table styling: PASS/FAIL
importance controls: PASS/FAIL
cards/spacing: PASS/FAIL

Do not make any additional improvements outside this scope.

I would do this before starting 2.5, so once 2.3 and 2.4 visually match v31 we freeze their frontend as well.
