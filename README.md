I need you to perform a STRICT READ-ONLY FORENSIC INVENTORY of my currently WORKING Windows RPR application so I can reproduce the same runtime configuration on UNIX MarketDev.

IMPORTANT:
- DO NOT modify any file.
- DO NOT refactor anything.
- DO NOT create patches.
- DO NOT restart the backend.
- DO NOT change environment variables.
- DO NOT install/uninstall packages.
- DO NOT touch prompts, Trigger 1 logic, frontend, model routing, or application behavior.
- DO NOT infer or guess values.
- Inspect the ACTUAL working source/config/runtime and PRINT the exact information requested below.
- If a secret/token/password is encountered, DO NOT print its value. Print only:
  SET / NOT SET, source/location, mechanism, variable name, and whether it is static or refreshed.
- Exact model identifiers are NOT secrets and MUST be printed verbatim.
- Ignore __pycache__, .pyc, backup files, obsolete copies, old project folders, and unrelated tests unless they are actually imported by the live app.

WORKING PROJECT ROOT:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

WORKING BACKEND:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\backend

KNOWN WORKING PYTHON:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\portfolio-agent\.venv\Scripts\python.exe

KNOWN LIVE ENTRYPOINT:

backend\server.py
FastAPI object: server:app

The goal is to give me ONE COMPLETE REPORT that I can hand to another engineer/AI to configure the UNIX deployment without further archaeology.

============================================================
1. LIVE PROCESS / STARTUP
============================================================

Determine and print:

- exact command currently used to start the working backend
- working directory required before starting it
- Python executable path
- uvicorn module/app
- host
- port
- reload yes/no
- whether any .ps1 script is actually required
- exact health endpoint
- exact frontend URL/path currently used
- whether frontend is:
  a) opened directly as file://
  b) served by FastAPI StaticFiles
  c) served some other way
- exact HTML file currently considered the live UI
- any external JS/CSS files loaded by that HTML that are required at runtime

Do not assume. Trace server.py and the actual HTML references.

============================================================
2. EXACT ENVIRONMENT VARIABLES USED BY LIVE CODE
============================================================

Search live Python source for:

os.getenv(
os.environ[
os.environ.get(
setdefault(
environment wrappers/config loaders

For EVERY environment variable actually read by runtime code, print a table:

VARIABLE
REQUIRED / OPTIONAL
CURRENT PROCESS VALUE if non-secret
SET / NOT SET if secret
DEFAULT IN CODE
SOURCE FILE + LINE
PURPOSE
USED BY WHICH STEP
WINDOWS-SPECIFIC? yes/no
EXPECTED UNIX VALUE/source if obvious from existing code only

Pay special attention to:

RPR_APPROVED_SONNET5_MODEL
STEP2_SONNET_MODEL
RPR_THEME_GATE_MODEL
RPR_STEP1_REFINEMENT_MODEL
STEP2_OPUS_MODEL
STEP23_REASONING_MODEL
STEP23_REVISION_MODEL
STEP23_REPAIR_MODEL
RPR_FEEDBACK_MODEL

RPR_GEMINI_MODEL
RPR_GEMINI_DISCOVERY_MODEL
RPR_GEMINI_EVIDENCE_MODEL
RPR_GEMINI_THEME_MODEL
RPR_GEMINI_LOCATION
RPR_VERTEX_BASE_URL
VERTEX_PROJECT
VERTEX_PROJECT_ID
VERTEX_LOCATION

LLM_PROVIDER
R2D2_AUTH_MODE
R2D2_UAT_URL
R2D2_TOKEN_URL
R2D2_SCOPE
R2D2_MODEL
R2D2_GCP_PROJECT

CITI_CERT_PATH
COIN_CLIENT_ID
COIN_CLIENT_SECRET

RPR_HOST
RPR_PORT

RPR_T1_THEME_WORKERS
RPR_T1_OPUS_WORKERS
RPR_T1_MAX_EVENTS_PER_THEME
RPR_T1_DISCOVERY_TIMEOUT
RPR_T1_ENRICHMENT_TIMEOUT
RPR_T1_REFINEMENT_TIMEOUT
RPR_T1_TARGETED_TIMEOUT
RPR_T2_SEARCH_TIMEOUT
RPR_T2_OPUS_TIMEOUT
RPR_T1_THEME_GATE_TIMEOUT
RPR_T1_OPUS_MAX_TOKENS
RPR_T1_GEMINI_MAX_CHARS
RPR_T1_CACHE_SECONDS
RPR_T1_JOB_TTL_SECONDS
RPR_HELIX_TOKEN_CACHE_SECONDS

RPR_STEP22_DATA_DIR

But do not limit your search to this list.

============================================================
3. EXACT MODEL ROUTING
============================================================

I need the REAL live model mapping, not comments and not guesses.

Print:

FUNCTION / STEP / PURPOSE -> PROVIDER -> EXACT MODEL IDENTIFIER -> ENV VARIABLE OR HARDCODED SOURCE

At minimum cover:

Trigger 1:
- theme quality/gate
- Gemini discovery
- Gemini evidence/enrichment
- Opus refinement
- retries/repair/fallbacks

Trigger 2:
- narrative processing
- search
- refinement

Step 2.1
Step 2.3
Step 2.4 V5.2
Step 2.4 V6
feedback/revision services

VERY IMPORTANT:

Find and print the EXACT organization-approved Sonnet 5 identifier used successfully on Windows.

Do not print simply "Sonnet 5".
I need the literal identifier expected by the gateway.

Also confirm explicitly whether:

RPR_APPROVED_SONNET5_MODEL
STEP2_SONNET_MODEL
RPR_THEME_GATE_MODEL

resolve to the same value or different values.

============================================================
4. RUNTIME_ENV.ps1
============================================================

Locate the actual:

RUNTIME_ENV.ps1

Print:

- exact full path
- all NON-SECRET variable assignments verbatim
- secret variable names only, with values REDACTED
- whether backend startup actually loads this file automatically
- whether it is only manually loaded
- whether equivalent values are already present elsewhere

Do NOT modify it.

Also distinguish:

ACTIVE CONFIG
vs
WINDOWS REFERENCE / historical config.

============================================================
5. AUTHENTICATION DESIGN
============================================================

Trace the actual Python auth code.

I need exact factual answers for:

A. R2D2 / Claude authentication

- auth modes supported
- currently used Windows auth mode
- h2m behavior
- m2m behavior
- exact Python function that obtains the token
- source file + function name
- token lifetime assumption
- token cache TTL
- whether token automatically refreshes
- whether restart is required after token expiry
- whether token is fetched per request or cached
- what external CLI/tool h2m relies on
- what environment variables m2m requires

DO NOT print tokens or secrets.

B. Gemini / ADK / Vertex authentication

- exact library/path used
- credential mechanism used on Windows
- whether it depends on enterprise ADK
- whether it calls Vertex directly
- required project/location/base URL variables
- certificate behavior
- whether UNIX requires any change according to CURRENT CODE

Again: facts only.

============================================================
6. TLS / CERTIFICATE HANDLING
============================================================

Trace certificate handling in:

rpr_search_agent.py
llm_gateway.py
and any other live modules.

Print:

- Windows certificate path currently used
- whether Windows certificate store is used
- any local PEM path
- exact variable controlling UNIX certificate path
- whether /etc/pki/citi/CitiInternalCAChain_PROD.pem is compatible with current code
- requests/httpx verify configuration
- SSL_CERT_FILE / REQUESTS_CA_BUNDLE usage if any
- anything Windows-specific that will fail on UNIX

No code modifications.

============================================================
7. TRIGGER 1 — EXACT PRODUCTION PATH
============================================================

This is critical.

Trace Trigger 1 from:

browser click
-> frontend function
-> HTTP route
-> background job
-> theme processing
-> Gemini discovery
-> parsing
-> event validation
-> enrichment
-> Opus refinement
-> job state
-> UI rendering.

Print the exact files/functions in sequence.

Also print the exact current rules for:

- required events per theme
- MAX_EVENTS_PER_THEME
- whether EXACTLY 3 events are required
- behavior when Gemini produces 0 events
- behavior when Gemini produces 1 event
- behavior when Gemini produces 2 events
- behavior when 3 events are produced
- discovery_incomplete handling
- retry behavior
- parser rejection rules
- missing required fields
- enrichment failure behavior
- refinement failure behavior
- whether partial discovery is retained
- whether a theme can ever be marked SUCCESS with fewer than 3 valid events

I want a clear YES/NO at the end:

"Can Trigger 1 currently return SUCCESS with fewer than 3 valid events?"

If yes, explain exact code path.

============================================================
8. REQUIRED PROMPTS / DATA / FILE DEPENDENCIES
============================================================

Identify every file opened/read at runtime.

Print path and consumer for:

- prompts
- Step 2.1 data
- Step 2.2 data
- Step 2.3
- Step 2.4
- CAM files
- Excel/CSV runtime files
- templates
- frontend append JS/CSS
- cache directories

Distinguish:

REQUIRED AT RUNTIME
OPTIONAL
DEVELOPMENT ONLY
OBSOLETE/UNUSED

Do not delete anything.

============================================================
9. PYTHON PACKAGE INVENTORY
============================================================

Using the APPROVED WORKING Windows venv, print:

python --version

and:

python -m pip freeze

Then additionally identify packages actually imported by the live backend.

I especially need exact versions of:

fastapi
uvicorn
pydantic
starlette
httpx
pandas
openpyxl
python-multipart
google-adk
google-genai
google-auth
anthropic

Print:

PACKAGE
WINDOWS VERSION
DIRECT IMPORTED? yes/no
REQUIRED FOR UNIX? yes/no
IMPORTING FILES

Do not upgrade anything.

============================================================
10. WINDOWS-SPECIFIC DEPENDENCIES
============================================================

Search live runtime source for:

C:\
backslashes in absolute paths
.ps1
PowerShell
Windows certificate APIs
os.name
sys.platform
win32
USERPROFILE
OneDrive paths

Print every ACTUAL runtime blocker for UNIX.

Ignore comments/dead files unless imported.

Classify each:

BLOCKER
NEEDS CONFIG ONLY
HARMLESS
DEAD/UNUSED

============================================================
11. PORT 8000 / SERVICE COLLISION
============================================================

Determine:

- what application is currently listening on Windows port 8000
- whether RPR assumes 8000 internally
- all frontend references to 127.0.0.1:8000
- whether backend API URL is hardcoded
- whether UNIX package uses 8010 instead
- what would need to change for multi-user MarketDev deployment

DO NOT change anything.

Just report facts.

============================================================
12. FRONTEND MULTI-USER DEPLOYMENT
============================================================

Inspect the actual live frontend.

Tell me whether:

http://UNIX_HOST:PORT/ui/

can call the backend correctly from another user's browser.

Specifically inspect for:

127.0.0.1
localhost
file:// assumptions
hardcoded API_BASE
absolute paths

Print exact file + line for each.

============================================================
13. ROOT ENTRYPOINT CONFUSION
============================================================

We have both server.py and main.py.

Determine conclusively:

- which one is the actual RPR app
- whether main.py is imported anywhere by server.py
- whether main.py creates a second FastAPI app
- whether main.py is needed in deployment
- why importing main.py reports more routes than server.py if applicable

Do not delete it.

============================================================
14. DUPLICATE PROJECT / AGENT TREES
============================================================

Inspect only enough to determine runtime relevance of:

portfolio-agent
rapid-portfolio
backend/rapid-portfolio
other similarly named agent folders

For each say:

LIVE DEPENDENCY
DEVELOPMENT TOOL
DUPLICATE
UNKNOWN

Do not remove anything.

============================================================
15. UNIX DEPLOYMENT OUTPUT I NEED
============================================================

At the end produce one concise section titled:

UNIX VALUES TO SET

Format exactly:

RPR_HOST=
RPR_PORT=
LLM_PROVIDER=
R2D2_AUTH_MODE=
CITI_CERT_PATH=

RPR_GEMINI_MODEL=
RPR_GEMINI_DISCOVERY_MODEL=
RPR_GEMINI_EVIDENCE_MODEL=
RPR_GEMINI_THEME_MODEL=
RPR_GEMINI_LOCATION=

RPR_STEP1_REFINEMENT_MODEL=
RPR_APPROVED_SONNET5_MODEL=
STEP2_SONNET_MODEL=
STEP2_OPUS_MODEL=
STEP23_REASONING_MODEL=
STEP23_REVISION_MODEL=
STEP23_REPAIR_MODEL=
RPR_FEEDBACK_MODEL=
RPR_THEME_GATE_MODEL=

RPR_T1_THEME_WORKERS=
RPR_T1_OPUS_WORKERS=
RPR_T1_MAX_EVENTS_PER_THEME=
RPR_T1_DISCOVERY_TIMEOUT=
RPR_T1_ENRICHMENT_TIMEOUT=
RPR_T1_REFINEMENT_TIMEOUT=
RPR_T1_OPUS_MAX_TOKENS=
RPR_T1_GEMINI_MAX_CHARS=
RPR_HELIX_TOKEN_CACHE_SECONDS=

For anything genuinely secret print:

<SECRET - SUPPLY EXTERNALLY>

For anything unknown print:

<UNKNOWN - NOT FOUND>

Do not invent anything.

============================================================
16. FINAL GO/NO-GO REPORT
============================================================

Finish with exactly these headings:

A. CONFIRMED WORKING WINDOWS ARCHITECTURE
B. EXACT MODEL IDENTIFIERS
C. EXACT AUTH MECHANISMS
D. EXACT TLS/CERT REQUIREMENTS
E. EXACT PYTHON DEPENDENCIES
F. UNIX CONFIGURATION VALUES
G. WINDOWS-SPECIFIC BLOCKERS
H. TRIGGER 1 EXACTLY-3-EVENT GUARANTEE
I. FRONTEND NETWORK ACCESS BLOCKERS
J. REMAINING UNKNOWNS

For every important claim include:
FILE
LINE NUMBER
FUNCTION
OBSERVED VALUE

Do not give me recommendations until after the forensic inventory.

Again:
READ ONLY.
NO MODIFICATIONS.
NO RESTART.
NO PACKAGE CHANGES.
NO GUESSING.
NO SECRET VALUES.

I want the evidence, not a proposed implementation.
