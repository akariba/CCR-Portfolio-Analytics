We are finishing the RPR Windows → MarketDev UNIX migration.

DO NOT MODIFY ANY FILE.
DO NOT CREATE PATCHES.
DO NOT RESTART ANY SERVICE.
DO NOT PRINT TOKENS, API KEYS, CLIENT SECRETS, PASSWORDS OR OTHER SECRET VALUES.

The previous forensic report established:
- live app = backend/server.py, FastAPI object server:app
- main.py is NOT part of the live production path
- Trigger 1 Gemini models = gemini-3.5-flash
- Trigger 1 Opus refinement = claude-opus-4-6
- RUNTIME_ENV.ps1 resolves the approved Sonnet 5 model dynamically
- frontend currently contains a hardcoded http://127.0.0.1:8000 API value
- R2D2 supports h2m and m2m
- MarketDev Python/package installation is already complete

I now need the FINAL runtime configuration evidence from the ACTUAL WORKING WINDOWS RPR session/code.

Perform a READ-ONLY inspection and print one compact report.

1. APPROVED SONNET 5
Determine the exact effective value used by the working Windows RPR for:
- RPR_APPROVED_SONNET5_MODEL
- STEP2_SONNET_MODEL
- RPR_THEME_GATE_MODEL
- STEP23_REVISION_MODEL
- STEP23_REPAIR_MODEL
- RPR_FEEDBACK_MODEL

If these come from the currently running PowerShell environment, you MAY print these NON-SECRET MODEL IDENTIFIERS.
Do not infer.
Print:
VARIABLE=value
for each.
Then say whether all six resolve to the same model identifier.

2. R2D2 AUTH MODE
Determine the actual effective value of R2D2_AUTH_MODE in the working Windows environment.

Print only:
R2D2_AUTH_MODE=h2m
or
R2D2_AUTH_MODE=m2m

If h2m:
- confirm whether helix CLI is the path actually used
- print the exact non-secret command/code path used to obtain the token
- DO NOT print the token

If m2m:
- confirm whether COIN_CLIENT_ID exists: SET / NOT SET
- confirm whether COIN_CLIENT_SECRET exists: SET / NOT SET
- DO NOT print either value.

3. R2D2 NON-SECRET ENDPOINT CONFIG
Print the effective values, if present, for:
- R2D2_UAT_URL
- R2D2_TOKEN_URL
- R2D2_SCOPE
- R2D2_GCP_PROJECT
- R2D2_MODEL

These are configuration identifiers/endpoints, not credentials.
If a value is absent and the code uses a literal default, print the literal default and source file:line.

4. GEMINI / VERTEX NON-SECRET CONFIG
Print effective values for:
- RPR_GEMINI_MODEL
- RPR_GEMINI_DISCOVERY_MODEL
- RPR_GEMINI_EVIDENCE_MODEL
- RPR_GEMINI_THEME_MODEL
- RPR_GEMINI_LOCATION
- VERTEX_PROJECT
- VERTEX_PROJECT_ID
- R2D2_GCP_PROJECT
- RPR_VERTEX_BASE_URL
- R2D2_BASE_URL
- VERTEX_ENDPOINT
- BASE_VERTEX_URL

For each state EFFECTIVE, FALLBACK, or NOT SET.
Do not invent missing values.

5. CERTIFICATE
Print:
CITI_CERT_PATH=<effective path>
R2D2_CERT_FILE=<effective path or NOT SET>
REQUESTS_CA_BUNDLE=<effective path or NOT SET>
SSL_CERT_FILE=<effective path or NOT SET>

Paths are fine to print; do not print certificate content.

6. FRONTEND API
Find every active occurrence in the LIVE frontend HTML/JS of:
- 127.0.0.1
- localhost
- :8000
- const API
- API_BASE
- fetch(

For each active API base definition, print exact file:line and code.
Ignore backups, generated package copies and historical files.

Then answer this precisely:

Can we replace the single hardcoded frontend API base with a same-origin relative base (for example empty string / window.location.origin) while preserving EVERY route suffix and all current UI behavior?

YES/NO with evidence.

7. STATIC FRONTEND SERVING
Inspect live server.py and report whether it currently serves:
- /
- /index.html
- /static
- app/backend/public
or equivalent.

Print exact route/mount code with source lines.

8. STARTUP
Print the exact current Windows start command from start_backend.ps1.
Then provide the mechanically equivalent UNIX command only, assuming:
- project root /home/ak54743/Rapid_Portfolio_Review_AI_UNIX_PACKAGE
- backend app under app/backend
- Python at .venv/bin/python
- host 0.0.0.0
- port 8010
- NO reload

Do not execute it.

9. FINAL UNIX ENV TABLE
Based ONLY on verified code/current Windows values, produce:

VARIABLE | UNIX VALUE | REQUIRED/OPTIONAL | SECRET? | SOURCE

Include every variable needed for server.py + Trigger1 + Step2.1 + Step2.2 + Step2.3 + Step2.4.

For secret variables print only:
<SET EXTERNALLY>

Never print a secret.

10. FINAL BLOCKERS
End with only:
BLOCKER 1:
BLOCKER 2:
...

Include only things that truly prevent us from starting and testing the application on MarketDev now.

Again:
READ ONLY.
NO FILE CHANGES.
NO PATCHES.
NO PACKAGE INSTALLATION.
NO SERVICE RESTARTS.
NO SECRET VALUES.
Evidence, not proposals.
