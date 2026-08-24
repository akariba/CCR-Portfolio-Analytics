Compare these TWO HTML files:

A. ORIGINAL VISUAL BIBLE: icm-pm-rapid-portfolio-review-v31.html
B. CURRENT WORKING APPLICATION: the latest RPR HTML I have attached.

I need a VISUAL-ONLY restoration of Step 2.2, Step 2.3 and Step 2.4 so the current application reproduces the original v31 HTML layout as closely and exactly as possible.

ABSOLUTE BONE RULE

The CURRENT file contains working backend/API/state functionality. DO NOT rewrite, refactor, simplify, remove, rename or replace any working functionality.

The v31 file is the visual source of truth only.

The CURRENT file is the functional source of truth.

SCOPE — ONLY THESE THREE PAGES
Step 2.2 — Portfolio Selection

Compare current Step 2.2 against original v31 Step 2.2 and restore the original:

page structure
panels/cards
header hierarchy
spacing/padding
typography
borders
table presentation
filter positioning
sector-selection area positioning
company/portfolio table layout
action-row positioning
button appearance/placement
feedback-panel positioning

BUT KEEP all current Step 2.2 functionality, including:

backend-driven portfolio catalog
Geography/Country/MLE filters
L2/L3 dynamic cascade
multi-select behavior
company search/results
confirmed portfolio
CAGIDs/company data
current state variables
API calls
downstream Step 2.3/2.4 handoff

Do not replace dynamic data with v31 hardcoded/demo companies.

Step 2.3 — Event-Driven Risk Factors

Make its visual structure match v31 exactly:

sector selector/header
risk-factor summary table
RF cards
RF number badges
factor title/weight/importance presentation
narrative area
Vulnerability Metrics table
Buffer/Mitigant Metrics table
threshold/critical-condition presentation
scoring/rationale areas
action buttons
feedback panel
margins, widths, fonts and spacing

KEEP the current live Step 2.3 engine completely intact.

Do NOT change:

generateEventFactors()
Step 2.3 API endpoints
Step 2.3 state
generated factor JSON
HIGH=2 / MEDIUM=1 deterministic scoring
deterministic weights
revision/feedback logic
confirmed-state logic
model routing
prompts

The generated factors must still populate the restored v31 HTML dynamically.

Step 2.4 — Sector-Inherent Risk Factors

The CURRENT FUNCTIONAL BEHAVIOR IS NOW WORKING and must be protected.

Current proven behavior includes:

confirmed Step 2.2 sector flows into Step 2.4
example: Technology Media Telecom → Technology → Software
Step 2.4 generates the governed sector framework
five Software factors render
HIGH importance = 2
MEDIUM importance = 1
weights are deterministic
detailed vulnerability/buffer/scoring cards render
save / feedback / confirmation behavior exists

DO NOT CHANGE THIS LOGIC.

Restore only the original v31 visual presentation:

selector/header location
Sector-Inherent Risk Factors header
information/methodology strip
summary table dimensions and styling
Importance / Imp. Score / Weight columns
factor cards
narrative textarea layout
factor-importance controls
vulnerability metric table
buffer metric table
scoring section
threshold notes
action-row placement
Save / Generate / Confirm button placement
Step 2.4 feedback panel

Do not reintroduce v31 demo/static factor data.
Current backend-generated factors must populate the v31 visual containers.

CRITICAL TECHNICAL PRESERVATION RULES

DO NOT change or rename any existing:

element id
JavaScript function
API endpoint
state variable
onclick
onchange
data-* attribute used by JS
event listener
script import
external JS file reference
backend integration
request/response structure

In particular, do not touch rpr_step24_append.js or its integration contract.

Do not change Step 1 or Step 2.1.

Do not change Step 2.5 or Step 3.

Do not globally redesign CSS.

Do not replace the whole current HTML with v31.

HOW TO PERFORM THE RESTORATION

Use the original v31 as a DOM/CSS visual reference.

Where v31 contains old hardcoded/demo values, preserve only its:

containers
classes
sizing
layout
styling
visual hierarchy

Connect those containers to the existing current dynamic IDs/data/render functions.

If the current implementation needs an extra dynamic container that did not exist in v31, place it inside the closest original v31 structure without redesigning the page.

Prefer existing v31 CSS classes rather than creating new global CSS.

If a tiny additional CSS rule is unavoidable, scope it specifically to Step 2.2/2.3/2.4 and explain why.

FIRST: FORENSIC COMPARISON

Before editing, compare Step 2.2, Step 2.3 and Step 2.4 separately.

For each step identify:

v31 structure → current structure → visual difference → exact restoration required

Specifically detect:

missing wrappers
changed classes
altered widths
changed flex/grid structures
changed table classes
altered panel placement
missing v31 headers
changed action rows
changed button placement
feedback-panel differences
additional CSS overriding v31

Do not treat functional/dynamic differences as visual defects.

THEN IMPLEMENT

After comparison, produce ONE final corrected copy of the CURRENT HTML.

Do not give me fragments.

Do not give me a replacement backend.

Do not create another architecture.

Do not remove current functionality.

The result must be:

current working RPR functionality + original v31 Step 2.2/2.3/2.4 visual design.

REQUIRED VALIDATION

Before handing back the file, statically verify:

All IDs referenced by current JavaScript still exist.
No duplicate IDs were introduced.
Step 2.2 handlers/API wiring remain present.
Step 2.3 generation/revision/confirmation wiring remains present.
Step 2.4 external append JS reference remains present.
Step 2.4 Generate Sector Factors, Save and Confirm hooks remain functional.
Step 2.2 → 2.3 → 2.4 navigation remains unchanged.
No Step 1/2.1 code was altered.
No hardcoded v31 company/factor demo data replaced backend-generated data.
No global CSS changes unintentionally alter Step 1 or other tabs.

Return:

1. One corrected complete HTML file
2. A very short list of what visually changed in 2.2 / 2.3 / 2.4
3. Explicit confirmation: FUNCTIONAL JS/API CONTRACTS PRESERVED

