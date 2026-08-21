TASK: FORENSIC EXTRACTION OF THE CURRENT RPR HTML FOR EXACT RECONSTRUCTION BY ANOTHER AI

CONTEXT

You have access to the current RPR HTML file.

Another AI (ChatGPT) does NOT have the full HTML because the file is too large to transfer conveniently.

Your job is NOT to modify the HTML.

Your job is NOT to improve it.

Your job is NOT to redesign it.

Your job is NOT to refactor it.

Your job is NOT to generate a new HTML.

Your ONLY job is to inspect the current HTML deeply and produce a technical reconstruction report containing enough exact information for ChatGPT to recreate the SAME frontend later.

This is therefore a SOURCE-CAPTURE / FORENSIC-HANDOVER task.

======================================================================
IMMUTABLE RULES
======================================================================

1. Treat the supplied HTML as the source of truth.

2. Do NOT:
   - redesign
   - optimize
   - simplify
   - refactor
   - rename
   - reorganize
   - modernize
   - clean up
   - remove apparently unused code
   - merge components
   - invent missing functionality
   - suggest a different architecture

3. Do not describe what you think the application SHOULD do.

Describe what the supplied HTML ACTUALLY DOES.

4. Preserve exact:
   - IDs
   - class names
   - function names
   - variable names
   - endpoint paths
   - JSON property names
   - labels
   - button text
   - CSS values
   - state names
   - status names

5. If something is uncertain, explicitly write:

   NOT DETERMINABLE FROM CURRENT HTML

Do NOT guess.

6. If prose would lose implementation information, provide the exact source code.

7. The resulting report will be used together with the existing backend files.

Do not invent frontend/backend contracts.

======================================================================
IMPORTANT EXISTING PROJECT CONSTRAINTS
======================================================================

The frontend visual baseline must remain the existing v31-style design.

Do not reinterpret the visual design.

The workflow contains:

STEP 1
Market event discovery / Trigger workflow

STEP 2.1
Scenario and assumptions

STEP 2.2
Portfolio selection

STEP 2.3
Event-driven risk factors

and potentially later Step 2.x / Step 3 sections.

Feedback is intentionally separate by step/page.

Do NOT propose replacing these with one global feedback component.

The Step 1 frontend may contain progressive processing states such as:

DISCOVERED
ENRICHING
ENRICHED
REFINING
REFINED
FAILED
CONFIRMED

Capture what actually exists.

Do not normalize these names unless the source does.

======================================================================
PART A — FILE FINGERPRINT
======================================================================

Start with:

A1. Exact filename.

A2. Total line count.

A3. Approximate character count.

A4. Number of:
- <style> blocks
- <script> blocks
- external scripts
- external stylesheets

A5. External libraries/fonts/resources.

A6. Whether the file is:
- standalone
- dependent on backend assets
- dependent on other local JS/CSS files

A7. Any version/build comments appearing in the source.

======================================================================
PART B — FULL APPLICATION DOM MAP
======================================================================

Produce the complete major DOM hierarchy.

For every important container give:

ELEMENT
ID
CLASS
PARENT
PURPOSE
DEFAULT VISIBILITY
HOW IT BECOMES VISIBLE/HIDDEN

Start from <body> and continue downward.

I need enough information to reconstruct:

- application shell
- header
- navigation
- workflow/step navigation
- Step 1
- Step 2
- Step 3
- panels
- cards
- logs
- status areas
- modals
- overlays
- loading states
- feedback panels
- upload areas
- hidden templates

Do not only describe visually.

Give the actual structural hierarchy.

======================================================================
PART C — EXACT VISUAL BASELINE
======================================================================

Extract the CSS design system actually used.

Provide exact values for:

BODY
- background
- font-family
- font-size
- text color

LAYOUT
- widths
- max-widths
- grid definitions
- flex definitions
- gaps
- padding
- margins

COLORS
- page background
- panel background
- navy/dark colors
- blue
- light blue
- green
- yellow/orange
- red
- gray
- borders
- muted text

TYPOGRAPHY
- heading sizes
- labels
- body
- captions
- buttons
- status text

COMPONENTS
- cards
- panels
- buttons
- inputs
- selects
- textarea
- tables
- tabs
- pills
- badges
- trees
- upload controls
- feedback boxes
- status indicators
- loaders

For important selectors provide the actual CSS declaration.

Do not translate:

padding: 12px 16px;

into:

"medium padding"

Give the exact value.

======================================================================
PART D — WORKFLOW NAVIGATION
======================================================================

Map the complete navigation.

Identify every visible workflow step and sub-step.

For each provide:

- displayed label
- element ID
- class
- initial state
- active class
- completed class
- disabled class
- click handler
- navigation function
- target container
- prerequisite checks

Then explain exactly how navigation works.

Provide exact source for the primary navigation functions.

======================================================================
PART E — STEP 1 COMPLETE CAPTURE
======================================================================

This is critical.

Inspect ALL Step 1 frontend implementation.

Document:

E1. Theme input/selection.

E2. Trigger selection.

E3. Trigger 1.

E4. Trigger 2 if present.

E5. Run/scan controls.

E6. Theme status.

E7. Event rendering.

E8. Progressive rendering.

E9. Event numbering.

E10. Event expansion/collapse.

E11. Eight-section event structure if present.

E12. Evidence/source rendering.

E13. confidence.

E14. status badges.

E15. enrichment state.

E16. refinement state.

E17. retry behavior.

E18. cache behavior.

E19. analyst editing.

E20. AI Assist.

E21. feedback.

E22. confirmation.

E23. rescan/refinement.

E24. logging.

E25. error handling.

For EACH Step 1 function provide:

FUNCTION NAME
PARAMETERS
PURPOSE
GLOBAL STATE READ
GLOBAL STATE MODIFIED
DOM ELEMENTS TOUCHED
API ENDPOINT
REQUEST BODY
EXPECTED RESPONSE
ERROR BEHAVIOR

======================================================================
PART F — STEP 1 PROGRESSIVE PIPELINE
======================================================================

I specifically need the frontend mechanics for progressive Step 1.

Find and document functions corresponding to concepts such as:

runScan
polling
eventFromPayload
applyProgressivePayload
pollScanProgressive
renderEvTree

These names are examples.

Use the ACTUAL names from the HTML.

Explain:

1. How scan starts.

2. What endpoint is called.

3. How job ID is obtained.

4. Poll interval.

5. Poll endpoint.

6. How events are merged.

7. How one event becomes visible before others finish.

8. How event status changes.

9. How confirmed events are protected.

10. How analyst modifications are protected.

11. What happens when enrichment fails.

12. What happens when refinement fails.

13. What happens when one theme fails.

14. What happens when all themes fail.

15. How retry works.

16. How cache hits are handled.

17. When polling stops.

18. What causes frontend timeout.

Provide the EXACT relevant JS source.

======================================================================
PART G — STEP 1 EVENT NUMBERING
======================================================================

This is especially important.

Explain exactly how the frontend derives:

Event 1
Event 2
Event 3

within EACH theme.

Identify:

- backend event ID
- frontend local index
- theme index
- event_id
- id
- label
- subtitle

Explain which property is used for display.

Provide exact code.

Do not infer.

======================================================================
PART H — AI ASSIST
======================================================================

Capture the existing AI Assist implementation.

For each AI Assist interaction provide:

- location
- visible button label
- button ID/class
- panel/container
- input
- current content passed to backend
- selected event/theme passed
- endpoint
- request body
- response structure
- replacement/apply behavior
- cancel behavior
- error behavior

Provide exact relevant JS.

Do not merge AI Assist with feedback.

======================================================================
PART I — FEEDBACK
======================================================================

Feedback MUST remain separate per workflow step.

Create a table:

STEP
CONTAINER ID
TEXTAREA/INPUT ID
SEND BUTTON
CLEAR BUTTON
FUNCTION
STEP KEY
ENDPOINT
REQUEST BODY
RESPONSE HANDLING

Include Step 1 and every Step 2 page separately.

If multiple panels use similar functions, still document them separately.

======================================================================
PART J — STEP 2.1 EXACT CAPTURE
======================================================================

This is one of the most important sections.

Capture the complete current Step 2.1 DOM and JavaScript.

Document:

1. Confirmed Step 1 context displayed.

2. Assessment horizon.

3. Additional Context.

4. Additional Context textarea/input.

5. Upload assumptions control.

6. Accepted file types.

7. uploaded-file display.

8. upload status.

9. assumptions preview.

10. analyst-supplied assumption rendering.

11. model-generated assumption rendering.

12. provenance labels.

13. conflict warnings.

14. override controls.

15. scenario generation.

16. scenario narrative.

17. assumption table/cards.

18. structural headwinds.

19. adaptations.

20. resilient/beneficiary segments.

21. limitations.

22. AI Assist/feedback.

23. revision.

24. confirmation/finalization.

25. transition to Step 2.2/2.3.

For every Step 2.1 control give exact:

ID
CLASS
LABEL
PLACEHOLDER
FUNCTION
STATE VARIABLE

======================================================================
PART K — STEP 2.1 API CONTRACTS
======================================================================

Find every endpoint used by Step 2.1.

For each:

METHOD
PATH
CALLING FUNCTION
REQUEST JSON
RESPONSE JSON FIELDS
SUCCESS HANDLING
WARNING HANDLING
ERROR HANDLING

Pay particular attention to fields related to:

confirmed_step1
horizon
typed_context
additional_context
uploaded_contexts
uploaded_assumptions
accepted_conflict_overrides
context_assessment
assumptions
scenario_narrative
provenance
state
confirmed_for_downstream

Use exact names from source.

======================================================================
PART L — STEP 2.2 PORTFOLIO SELECTION
======================================================================

Capture the implementation EXACTLY as it currently exists.

Do not design the future database.

Document:

- page/container
- headings
- instructions
- tabs
- sector selection
- L2
- L3
- hierarchical relationship
- checkbox behavior
- Select All
- Clear All
- company selection
- CAGID
- MLE
- exposure fields
- upload portfolio
- upload preview
- accepted file types
- validation
- confirm selection
- downstream state

Determine whether each data source is:

HARDCODED FRONTEND
BACKEND API
CSV
JSON
OTHER

Give evidence from the code.

List all related functions and endpoints.

======================================================================
PART M — STEP 2.3 EVENT-DRIVEN RISK FACTORS
======================================================================

Capture the complete Step 2.3 frontend.

Document:

- prerequisites
- confirmed scenario requirement
- selected sector requirement
- portfolio context
- Generate controls
- loading state
- result state
- factor cards/rows

For factor output determine exactly how frontend renders:

factor_id
factor
importance
weight
rationale
metric/formula
unit
threshold
threshold conditions
AND/OR logic
industry sensitivity
methodology limitations
calibration information

Capture confirmation behavior.

Capture feedback behavior.

Capture navigation afterward.

Provide exact JS for rendering and API calls.

======================================================================
PART N — LATER STEPS
======================================================================

Inspect Step 2.4, 2.5, Step 3 and anything later.

For each state whether it is:

FULLY IMPLEMENTED
PARTIALLY IMPLEMENTED
PLACEHOLDER
NOT PRESENT

Give exact labels and IDs.

Do not invent missing functionality.

======================================================================
PART O — GLOBAL JAVASCRIPT STATE
======================================================================

Find ALL important global variables/constants.

Create a table:

VARIABLE
INITIAL VALUE
TYPE
PURPOSE
READ BY
MODIFIED BY

Group into:

GLOBAL/API

STEP 1

TRIGGER 1

TRIGGER 2

STEP 2.1

STEP 2.2

STEP 2.3

FEEDBACK

NAVIGATION

LOGGING

======================================================================
PART P — COMPLETE CUSTOM FUNCTION INVENTORY
======================================================================

Scan the entire script.

List EVERY custom function.

Do not only list important ones.

For each:

FUNCTION
PARAMETERS
ASYNC?
PURPOSE
CALLS
CALLED BY
DOM ELEMENTS
GLOBAL STATE
ENDPOINT

After the table, identify the functions that MUST be copied exactly to reproduce behavior.

======================================================================
PART Q — COMPLETE API MAP
======================================================================

Scan the entire HTML for:

fetch(
XMLHttpRequest
axios
API constants
URL constants
endpoint strings

Produce:

METHOD
EXACT ENDPOINT
FUNCTION
STEP
REQUEST
EXPECTED RESPONSE
UI EFFECT

Do not omit health/preflight endpoints.

======================================================================
PART R — COMPLETE DOM ID INVENTORY
======================================================================

Extract EVERY id="..." from the HTML.

Do not summarize.

Give the complete list.

For each important ID provide purpose.

Then separately list important custom classes.

This section is intentionally exhaustive.

======================================================================
PART S — EXACT USER-VISIBLE TEXT
======================================================================

Extract exact text for:

- application title
- workflow steps
- substeps
- page headings
- cards
- tabs
- buttons
- status badges
- placeholders
- empty states
- warnings
- errors
- upload instructions
- AI Assist
- feedback
- confirmation
- retry
- loading messages

Preserve capitalization.

======================================================================
PART T — PAGE INITIALIZATION
======================================================================

Find page-load initialization.

Document exact sequence from loading the HTML until the application is ready.

Include:

DOMContentLoaded

or equivalent.

Explain:

1. variables initialized
2. event listeners registered
3. backend health check
4. data/catalog loading
5. default step
6. default trigger
7. hidden sections
8. restored state
9. default button states

Provide exact initialization source.

======================================================================
PART U — RESPONSIVE DESIGN
======================================================================

Extract every @media rule.

Give:

BREAKPOINT
SELECTORS AFFECTED
BEFORE
AFTER

Do not redesign mobile behavior.

======================================================================
PART V — SOURCE SNIPPETS REQUIRED FOR EXACT RECONSTRUCTION
======================================================================

Now evaluate your own report.

Ask:

"Could another AI reconstruct this HTML with high fidelity using only this report?"

For anything where the answer is NO, paste the exact source.

At minimum strongly consider giving exact source for:

1. main application shell markup

2. workflow navigation markup

3. Step 1 markup

4. Step 2.1 markup

5. Step 2.2 markup

6. Step 2.3 markup

7. major CSS definitions

8. navigation JS

9. Step 1 progressive JS

10. event rendering JS

11. AI Assist JS

12. feedback JS

13. Step 2.1 JS

14. Step 2.2 JS

15. Step 2.3 JS

16. API helper JS

17. initialization JS

Do NOT paste the entire HTML blindly.

Paste the exact critical blocks that cannot safely be reconstructed from prose.

======================================================================
PART W — RECONSTRUCTION CHECKSUM
======================================================================

Finish with a reconstruction checklist.

For each mark:

CAPTURED EXACTLY
CAPTURED FUNCTIONALLY
INSUFFICIENT INFORMATION

Items:

[ ] Overall layout
[ ] CSS/design
[ ] Navigation
[ ] Step 1 DOM
[ ] Step 1 progressive behavior
[ ] Trigger 1
[ ] Trigger 2
[ ] Event rendering
[ ] AI Assist
[ ] Step 1 feedback
[ ] Step 1 confirmation
[ ] Step 2.1 DOM
[ ] Additional Context
[ ] Assumption upload
[ ] Assumption provenance
[ ] Conflict override
[ ] Scenario generation
[ ] Scenario revision
[ ] Scenario confirmation
[ ] Step 2.1 feedback
[ ] Step 2.2 DOM
[ ] Portfolio selection
[ ] L2/L3 filtering
[ ] Portfolio upload
[ ] Step 2.2 feedback
[ ] Step 2.3 DOM
[ ] Event factors
[ ] Threshold logic
[ ] Factor weights
[ ] Step 2.3 feedback
[ ] API contracts
[ ] Global state
[ ] Initialization
[ ] Responsive behavior

For every INSUFFICIENT INFORMATION item, immediately provide the missing source code or explain why it cannot be obtained.

======================================================================
FINAL OUTPUT REQUIREMENT
======================================================================

The final report is being handed to ChatGPT, which already has detailed captures of backend files including step2_service.py and market_event_scout.py.

Therefore concentrate on information that exists ONLY in the frontend HTML.

Do not waste output explaining generic HTML concepts.

Do not provide recommendations.

Do not propose changes.

Do not generate replacement files.

Do not fix bugs.

Do not alter architecture.

Do not tell ChatGPT what would be "better."

Your objective is:

MAXIMUM FIDELITY + MINIMUM AMBIGUITY.

I need ChatGPT to be able to reconstruct the CURRENT HTML as closely as possible without having the original huge file.

If exact reconstruction requires an exact source block, INCLUDE THAT SOURCE BLOCK.

Begin the forensic extraction now.
