-----"<link rel="stylesheet" href="rpr_step22_step23_append.css" data-rpr-safe-append="css">"----


------------
powershell -ExecutionPolicy Bypass -File 'C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\UI Design\PATCH_WORKING_V8.ps1' -SourceHtml 'C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\UI Design\Archive\rpr-v8-consolidated-test.html' -OutputHtml 'C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\UI Design\rpr-v8-consolidated-test-SAFE-STEP22-STEP23.html'


$env:STEP23_REASONING_MODEL = $env:STEP2_OPUS_MODEL
$env:STEP23_REVISION_MODEL = $approvedSonnet5
$env:STEP23_REPAIR_MODEL = $approvedSonnet5

You are working ONLY on RPR Step 2.2 — Portfolio Selection frontend HTML and JavaScript.

Strict rule: the existing v31 visual design is immutable.
Do NOT redesign anything.
Do NOT change CSS, colors, typography, spacing, panel structure, tabs, cards, buttons, workflow bar, feedback panel, or general layout.
Do NOT modify Step 1, Step 2.1, Step 2.3, Step 2.4, Step 2.5, or Step 3.
Do NOT modify backend Python files.

Your task is to inspect the current HTML/JS and implement the minimum Step 2.2 frontend logic necessary to connect the existing v31 controls to a future backend portfolio-selection API.

Step 2.2 business behavior:

The existing filters are:
Geography
Country
MLE
Sector hierarchy
Portfolio/company selection
Sector hierarchy is backend-driven.
Example:
User selects L2 = Technology
frontend requests valid L3 values from backend
frontend displays only Technology-related L3 sectors such as:
Communications Equipment,
Computer & Computer Hardware,
Electronic Manufacturing Services,
Internet Software & Services,
IT SERVICES,
Semiconductors & Semiconductor Equipment,
Software,
Technology,
Technology - SPV,
Technology Distributors.
Geography must similarly restrict Country.
Geography, Country, MLE, L1/L2/L3/L4 selections must be combinable.
The frontend must NOT contain the company master or hard-code the taxonomy.
All hierarchy/company data comes from backend API responses.
When filters change, frontend requests the matching company universe from backend and displays:
CAGID
company name
applicable sector classification
country
MLE where available
Existing v31 sector cards/check boxes must remain visually identical.
Populate those same components dynamically rather than creating a new UI.
Preserve multi-selection where the current UI supports it.
If L2 is selected but no L3 is selected, treat that as all valid L3 sectors underneath the selected L2.
The analyst must be able to confirm the resulting portfolio using the existing Confirm Selection & Proceed interaction.
Preserve the existing Select Portfolio / Upload Portfolio tabs.
Do not redesign the upload tab.
Do not use mock companies or hard-coded fallback sectors inside JavaScript.
If backend data is unavailable, show a controlled empty/error state using the existing visual components.

Proposed frontend API contract to wire against:

GET /api/v1/rpr/step2/portfolio/catalog
Returns filter/hierarchy information.
POST /api/v1/rpr/step2/portfolio/search
Request body may contain:
geography, countries, mle_codes, l1, l2, l3, l4
and returns matching companies plus valid dependent filter values.
POST /api/v1/rpr/step2/portfolio/finalize
Sends the analyst-confirmed portfolio.

Important implementation rule:
Do not invent endpoint shapes if the current HTML already uses another Step 2.2 contract. First inspect the current JavaScript and report what exists.

Work in this order:

Inspect the current Step 2.2 HTML markup and JavaScript.
Identify every existing Step 2.2 DOM ID, function, listener, hard-coded sector array, and dead/incomplete handler.
Tell me exactly what should be preserved.
Tell me the minimal JavaScript changes required.
Only then implement the changes.

Known current issues to specifically inspect:

existing Step 2.2 appears to contain hard-coded sector data;
rebuildSectorDropdowns() may currently be a no-op;
getSelectedSector() may only return the first selected sector;
onSectorChange / onPlaSectorChange may be referenced but undefined;
Upload Portfolio may currently be visual/decorative rather than functional.

Do NOT “clean up” unrelated code.
Do NOT refactor the whole HTML.
Do NOT create a new design.
Do NOT rename existing IDs unless absolutely necessary.

Output required:

Short diagnosis of the current Step 2.2 HTML/JS.
Exact list of functions/sections you will change.
Exact list of things you will NOT change.
Then provide the complete updated HTML file, not fragments.
Clearly mark any assumed backend API field names so they can be aligned with the Python backend later.

The objective is:

keep v31 visually identical + replace hard-coded Step 2.2 frontend data logic with backend-driven cascading filters and company selection.
