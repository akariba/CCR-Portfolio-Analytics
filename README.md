READ-ONLY FORENSIC HANDOFF FOR CHATGPT — DO NOT MODIFY ANY FILE

I need you to inspect the exact current RPR source so another implementation agent can make a safe patch.
You are NOT implementing anything. Do not edit, regenerate, refactor, or “improve” any file.

BONE RULE: current working code is functional truth. icm-pm-rapid-portfolio-review-v31.html is visual truth only.

Scope is strictly Step 2.2, Step 2.3 and Step 2.4.

Create one Markdown artifact named:

RPR_EXACT_IMPLEMENTATION_HANDOFF_22_23_24.md

A — File identity

For every supplied file report:
exact filename | size/line count | role

Identify the exact current working HTML and original v31 HTML.

B — Step 2.2: exact current implementation

From rpr_step22_step23_append.js, reproduce VERBATIM and untruncated:

complete STEP22_TEMPLATE
complete buildPortfolioSelectionUI()
complete refreshSelectionUI()
complete toggleSector()
complete selectAllSectors()
complete clearAllSectors()
complete runStep22Search()
complete confirmPortfolioSelection()
complete rebuildSectorDropdowns()
complete step23PortfolioContext()

For every snippet give its exact start/end line numbers.

Then answer only:

How are L1/L2/L3 currently represented in ALL_SECTORS?
Does buildPortfolioSelectionUI() currently group by L1, L2, or both?
Which functions/state objects must remain completely unchanged to preserve current portfolio behavior?

Do not propose new Select-All-by-L2 functionality.

C — Step 2.2 v31 visual target

From v31 extract the exact relevant visual structure/classes for its sector hierarchy.

State:

v31 visual element → current equivalent → exact visual difference

We need visual parity only. Dynamic backend behavior must remain current.

D — Step 2.3: exact current implementation

From rpr_step22_step23_append.js, reproduce VERBATIM and untruncated:

complete STEP23_TEMPLATE
complete generateEventFactors()
complete renderEventFactors()
complete buildRFCard()
complete saveEventFactorChanges()
complete confirmEventFactors()
bottom Object.assign(window, ...) / export section

Give exact line numbers.

Very important: separately print the exact literal source line containing the Step 2.3 Scoring Logic label. Do not normalize punctuation. Immediately below it report the Unicode code point of every dash character appearing in that label, if any.

Separately print the exact current Step 2.3 action-row source containing:

Add Factor
Generate Event Factors
Save All Changes
Confirm All Risk Factors

State the current order exactly.

Separately show exactly where the summary <tbody id="ed-summary-body"> is generated and whether there is currently a Total Weight footer.

E — Step 2.3 v31 visual target

Extract from v31 the exact relevant visual structure for:

summary table/footer
RF cards
Scoring Logic area
Net Score formula/caption
action-row/button order

Report:

v31 → current → difference → visual-only change required

Do not alter model/API/scoring behavior.

F — Step 2.4 exact working contract

This Step 2.4 is currently proven working. Treat it as immutable.

Reproduce VERBATIM and untruncated from current HTML:

entire Step 2.4 container
sector selector
factor count
summary table
factor-card host
action row
feedback panel

From rpr_step24_append.js, reproduce only the exact functions that read/write those DOM elements:

selectedSector()
portfolio/confirmed-sector reader
enterStep24()
generateStep24()
renderStep24()
confirmStep24()

Give exact line numbers.

Do NOT propose any Step 2.4 JavaScript change.

G — Step 2.4 v31 visual differences

Compare current Step 2.4 with v31 and report only safe visual differences in:

sector bar
title/header
methodology/formula banner
summary table
factor cards
action-row placement
feedback panel

Mark every item:
SAFE HTML/CSS ONLY or WOULD TOUCH FUNCTIONAL BONE.

H — CSS exact extraction

From both append CSS files and the current HTML/v31 styles, reproduce the exact definitions affecting:

ps-sector-grid
ps-sector-card
ps-group if present
ps-l2-* if present
metric-tbl
rf-card
rf-card-hdr
rf-card-body
rf-subsection
action-row
s23-sector-bar
Step 2.2/2.3/2.4 feedback components

Do not truncate definitions.

I — Final implementation map

End with one concise table:

Desired visual change | exact file | exact function/HTML/CSS selector | functional dependency | safe implementation method

The target changes are:

Step 2.2

reproduce v31 L1 → L2 → L3 visual hierarchy
preserve all existing selection/filter/search/upload/confirmation logic
NO new functionality

Step 2.3

v31 summary presentation
Total Weight display if v31 contains it
v31 Net Score explanation
v31 action-button ordering
preserve current factor generation/edit/save/confirm/API/model behavior

Step 2.4

visual parity with v31 only
absolutely no change to proven-working rpr_step24_append.js
ABSOLUTE RULES
NO EDITS
NO GENERATED REPLACEMENT FILES
NO PATCH CODE
NO REFACTORING
NO NEW BEHAVIOR
NO BACKEND CHANGES
NO PROMPT/MODEL CHANGES
NO STEP 1 / STEP 2.1 CHANGES
Never abbreviate code with ...
Never normalize punctuation inside verbatim source

If the report becomes long, continue it in the same artifact rather than omitting code.

End exactly:

FORENSIC HANDOFF COMPLETE — ZERO FILES MODIFIED
