TASK: BUILD THE FINAL RPR MARKETDEV UNIX DEPLOYMENT PACKAGE.

DO THIS NOW END-TO-END. DO NOT ASK ME A SERIES OF QUESTIONS.
DO NOT REFACTOR THE APPLICATION.
DO NOT REDESIGN ANY WORKING RPR CODE.
DO NOT OPTIMIZE TRIGGER 1 / STEP 2.x / PROMPTS / FRONTEND IN THIS TASK.

THIS TASK IS ONLY:
WINDOWS WORKING PROJECT -> CLEAN, REPRODUCIBLE UNIX MARKETDEV PACKAGE.

============================================================
0. NON-NEGOTIABLE RPR BONE RULE
============================================================

The current Windows project is the source-of-truth application.

Preserve ALL currently accepted working behavior.

Do not:
- rewrite working Python modules
- refactor server.py
- modify prompts
- redesign frontend
- change Step 1 logic
- change exactly-3-events rule
- change Step 2.1/2.2/2.3/2.4 logic
- change model routing
- change scoring
- remove files merely because they look unused
- change v31 visual bone
- copy Windows .venv to UNIX
- embed credentials/tokens/secrets anywhere

Only add the minimum deployment/environment layer necessary to run the
same application correctly on UNIX MarketDev.

If an existing file must genuinely be changed for UNIX compatibility,
make the smallest conditional/platform-specific change possible and
document it.

============================================================
1. FIRST: FORENSICALLY INSPECT THE CURRENT PROJECT
============================================================

Before creating anything, inspect the current source tree and determine
the ACTUAL runtime dependencies.

Confirmed runtime facts that must be respected unless the source proves
otherwise:

- FastAPI runtime entry point:
      backend/server.py
      app = FastAPI application

- Windows currently starts approximately:
      python -m uvicorn server:app --host 127.0.0.1 --port 8000

- UNIX production/development package should therefore start from
  backend using:
      <unix-venv-python> -m uvicorn server:app ...

- Do NOT make main.py the runtime entry point unless actual current
  startup/source conclusively proves server.py has changed.

- Current approved project uses enterprise model/API integrations.
- No public/unapproved internet dependency may be introduced.
- Enterprise certificates/endpoints/authentication must remain compatible.

Inspect:

1. backend/server.py
2. every import reachable from server.py
3. RUNTIME_ENV.ps1
4. current *.ps1 launch/restart scripts
5. existing requirements.txt
6. actual packages installed in the WORKING Windows .venv
7. ADK / Gemini integration
8. R2D2 / Claude integration
9. certificate/TLS handling
10. frontend loading mechanism
11. backend/data dependencies
12. prompts and Prompt folders
13. CAM dependencies
14. Step 2.2 source XLSX data
15. Step 2.2 SQLite cache behaviour
16. environment-variable reads throughout Python
17. any absolute Windows paths
18. any os.name/platform-specific behavior
19. any subprocess PowerShell dependency
20. any Windows certificate-store dependency

Do not guess.

Produce an internal runtime dependency graph before packaging.

============================================================
2. INSPECT THE EXISTING MARKETDEV UNIX ACCOUNT TOO
============================================================

I already have a MarketDev UNIX environment.

Before inventing new token/startup mechanisms, inspect the existing
MarketDev deployment/scripts if accessible.

From the existing UNIX environment there appear to have previously been
files such as:

- start_rpr.sh
- refresh_token.sh
- update_token.sh
- token_refresh.log
- RPR/
- Application/

Investigate those EXISTING scripts/configurations as references.

IMPORTANT:
They are NOT automatically trusted as correct.

Determine:
- how authentication was obtained
- how the R2D2/enterprise token was refreshed
- refresh cadence
- whether refresh was interactive or non-interactive
- what environment variables were exported
- whether a cron/job/background loop already existed
- how the application was started
- what Python interpreter/environment was used
- which certificates were configured
- whether there is an organization-approved UNIX authentication method

Reuse a proven organization-approved mechanism where appropriate rather
than inventing a new authentication system.

NEVER copy an existing actual token into the deployment package.

============================================================
3. CREATE A NEW CLEAN PACKAGE
============================================================

Create a NEW folder outside the source application, for example:

Rapid_Portfolio_Review_AI_UNIX_PACKAGE/

Do NOT mutate the working Windows project unnecessarily.

The package should contain only what MarketDev actually needs.

Suggested structure:

Rapid_Portfolio_Review_AI_UNIX_PACKAGE/
|
|-- app/
|   |-- backend/
|   |-- UI Design/
|   |-- prompts/
|   |-- Prompt/                  [ONLY if actually runtime-required]
|   |-- CAM/                     [ONLY runtime-required content]
|   |-- other proven runtime files
|
|-- deploy/
|   |-- bootstrap_unix.sh
|   |-- start_rpr.sh
|   |-- stop_rpr.sh
|   |-- restart_rpr.sh
|   |-- status_rpr.sh
|   |-- healthcheck_rpr.sh
|   |-- refresh_auth.sh
|   |-- token_keeper.sh          [only if applicable]
|   |-- env.sh
|   |-- env.example
|
|-- requirements-unix.txt
|-- DEPLOY_UNIX.md
|-- UNIX_DEPLOYMENT_REPORT.md
|-- PACKAGE_MANIFEST.txt
|-- PACKAGE_EXCLUSIONS.txt

You may improve this structure if the real application requires it,
but keep it simple.

============================================================
4. DO NOT PACKAGE WINDOWS RUNTIME JUNK
============================================================

EXCLUDE:

- .venv/
- __pycache__/
- .pytest_cache/
- *.pyc
- Windows Office lock files
- server_stdout.log
- server_stderr.log
- pytest_out.txt
- throwaway diagnostic files
- Windows-only .ps1 scripts FROM THE UNIX EXECUTION PATH
  (they may be retained separately as reference only if useful)
- generated temporary files
- screenshots
- unrelated documentation
- notebooks not runtime-required
- old rollback scripts unless genuinely required
- stale copies/duplicates
- personal desktop artifacts
- actual authentication tokens
- credentials
- API keys
- secrets

Do NOT exclude:
- source-of-truth XLSX files needed by Step 2.2
- runtime prompts
- CAM data if Step 2.5 requires it
- real runtime CSV dependencies
- frontend append JS/CSS
- v31/current frontend files actually loaded
- Step 2.4 V6 source prompt if runtime-loaded
- anything imported/read dynamically by production code

============================================================
5. BUILD THE UNIX PYTHON ENVIRONMENT CORRECTLY
============================================================

DO NOT COPY WINDOWS .venv.

Create:

    .venv/

on UNIX using the available organization-supported Python version.

Prefer Python 3.11 if that matches the existing environment and package
compatibility; otherwise determine the actual supported version.

bootstrap_unix.sh must:

1. find/validate python
2. create .venv
3. activate/use it
4. install required packages
5. validate imports
6. fail clearly if a required package cannot be installed

Build requirements-unix.txt from ACTUAL runtime needs.

The previous audit observed packages including approximately:

- fastapi
- uvicorn
- pydantic
- starlette
- httpx
- pandas
- openpyxl
- python-multipart
- google-adk
- google-genai

Do NOT blindly use this list.

Inspect imports + working environment and create the accurate minimum
requirements file.

Prefer pinned/compatible versions from the existing proven Windows
environment where possible.

Do not introduce unnecessary packages.

============================================================
6. ENVIRONMENT CONFIGURATION
============================================================

Translate RUNTIME_ENV.ps1 into UNIX safely.

Create:

    deploy/env.example
    deploy/env.sh

env.example:
- names of required variables
- descriptions
- NO secrets

env.sh:
- loads externally supplied values
- does not hard-code credentials
- gives useful validation errors

Audit every os.getenv()/environment-variable read in runtime code.

Produce a table in the final report:

VARIABLE
REQUIRED/OPTIONAL
USED BY
PURPOSE
SOURCE ON WINDOWS
EXPECTED SOURCE ON UNIX
SECRET? YES/NO
DEFAULT ALLOWED? YES/NO

Particular attention to:

- Gemini model
- Sonnet model
- Opus model
- theme gate model
- Step 2.3 reasoning model
- Step 2.4 models
- ADK configuration
- Vertex/R2D2 configuration
- project/location
- token/auth fields
- certificates
- timeouts
- Step2 paths
- port/host

DO NOT downgrade model identifiers.

============================================================
7. TOKEN / AUTHENTICATION — CRITICAL
============================================================

The enterprise token appears to expire roughly every 30 minutes.

I do NOT want to manually restart RPR every 30 minutes.

First determine the REAL approved refresh mechanism from:
- current code
- RUNTIME_ENV.ps1
- existing MarketDev scripts
- current enterprise auth tools.

Then implement safe automatic refresh IF the approved mechanism is
non-interactive.

Target behavior:

Application stays alive continuously.
Token refresh occurs before expiry.

Preferred cadence if token lifetime is ~30 minutes:

    refresh around every 20 minutes

BUT derive actual safe cadence from the token/refresh behavior if known.

Requirements:

- NEVER store an actual token in git/package source.
- NEVER print full tokens in logs.
- NEVER put tokens in PACKAGE_MANIFEST.
- Refresh must be atomic.
- Avoid multiple simultaneous refresh workers.
- Use file/process locking if needed.
- Log timestamps + SUCCESS/FAILURE only, with sanitized errors.
- Application should not require a restart merely because a token rotated
  unless existing architecture requires it.
- If llm_gateway already supports token caching/invalidation, integrate
  correctly with it rather than bypassing it.

If refresh REQUIRES interactive SSO/login:
DO NOT fake unattended refresh.

Instead:
1. report that exact constraint;
2. automate everything that can be automated;
3. provide the cleanest approved re-auth mechanism.

============================================================
8. TOKEN KEEPER / JOB SUPERVISION
============================================================

Determine what MarketDev supports:

A. systemd --user
B. cron
C. nohup/background process
D. existing enterprise scheduler

Prefer the most reliable approved option.

If systemd user services are permitted, optionally generate:

    rpr.service
    rpr-token-refresh.service
    rpr-token-refresh.timer

If they are NOT available, generate a robust fallback such as:

    token_keeper.sh

with:
- sleep interval
- lock
- sanitized logging
- error backoff
- clean PID handling
- SIGTERM cleanup

DO NOT run a tight loop.

DO NOT refresh on every model request.

============================================================
9. APPLICATION PROCESS MANAGEMENT
============================================================

Generate clean UNIX commands.

start_rpr.sh:
- load env
- validate required directories/files
- validate Python env
- ensure only ONE RPR instance
- start FastAPI
- write PID
- redirect logs
- wait for /health
- clearly show:
      RPR started
      PID
      host
      port
      health status

Use server:app.

Do not use --reload for the persistent MarketDev service unless this
environment explicitly requires development reload.

Recommended service runtime:

    python -m uvicorn server:app \
      --host 0.0.0.0 \
      --port 8000

Use the correct bind address for MarketDev based on actual hosting/security
requirements.

stop_rpr.sh:
- clean graceful termination
- no blanket killall python
- kill ONLY the RPR PID

restart_rpr.sh:
- stop
- verify termination
- start
- health check

status_rpr.sh:
- process status
- PID
- port
- /health response
- auth refresh process status
- last successful refresh timestamp

============================================================
10. FRONTEND SERVING — RESOLVE THIS, DO NOT GUESS
============================================================

Previous audit said the exact MarketDev frontend serving mechanism was
not yet identified.

Resolve it now.

Determine whether the current frontend is:

A. opened directly as file://
B. served from FastAPI StaticFiles
C. served by another existing web server
D. expected to be copied into an Application/public directory
E. something else.

For MarketDev, establish ONE reproducible URL.

Prefer the smallest solution compatible with current architecture.

Do not rebuild frontend into React/Node/etc.

Do not introduce npm/node unless the CURRENT RPR genuinely requires it.

The current frontend is already HTML/JS/CSS.

If adding FastAPI static serving is the minimum safe solution, propose
the exact small additive change BEFORE/AS PART OF deployment and document
it clearly.

============================================================
11. TLS / CERTIFICATE COMPATIBILITY
============================================================

Windows currently uses Windows certificate-store logic for enterprise
ADK/web search.

That will not work unchanged on UNIX.

Inspect the exact TLS code.

Determine the MarketDev-approved UNIX CA bundle / certificate mechanism.

Implement a platform-safe branch such as conceptually:

    if Windows:
        existing Windows certificate-store behavior
    else:
        approved UNIX CA bundle / SSL_CERT_FILE / enterprise cert path

DO NOT disable SSL verification.

DO NOT use verify=False.

DO NOT weaken TLS.

Document the required UNIX certificate path/configuration.

============================================================
12. STEP 2.2 CACHE ON UNIX
============================================================

Step 2.2 now uses a disposable SQLite runtime cache generated from the
three source XLSX files.

Preserve that design.

Do NOT package a Windows-created SQLite cache as source-of-truth.

On UNIX:

- XLSX files remain sole source of truth.
- Cache should be generated locally.
- Cache directory must be writable.
- Cache may be regenerated automatically.
- Cache failure must fall back safely to source parse.
- Cache is runtime data, not governed data.

Validate UNIX path handling.

============================================================
13. PATH PORTABILITY AUDIT
============================================================

Search entire runtime source for:

- C:\
- backslashes used as path separators
- Windows Downloads paths
- OneDrive paths
- PowerShell execution
- .venv\Scripts
- os.name == "nt"
- platform.system()
- absolute Prompt paths
- relative working-directory assumptions

Correct ONLY genuine runtime blockers using pathlib/platform-safe code.

Do NOT broadly refactor path code.

============================================================
14. CREATE A PRE-FLIGHT CHECK
============================================================

Create:

    deploy/preflight_unix.sh

It must check WITHOUT starting a full expensive AI run:

- Python version
- venv exists
- required Python imports
- server.py exists
- frontend exists
- prompts exist
- Step2 source data exists
- writable cache path
- required env variable names populated
- certificates readable
- port availability
- auth command available
- token refresher configuration
- no Windows-only path dependency
- FastAPI import
- route count
- /health after startup if requested

Output simple:

PASS
PASS
PASS
FAIL: <specific reason>

============================================================
15. PACKAGE THE RESULT
============================================================

Generate both if tooling permits:

    Rapid_Portfolio_Review_AI_UNIX_PACKAGE.tar.gz

and optionally:

    Rapid_Portfolio_Review_AI_UNIX_PACKAGE.zip

The archive must NOT include:
- .venv
- credentials
- actual token
- disposable cache
- logs
- junk/debug artifacts

============================================================
16. VERY IMPORTANT: DO NOT BURN TOKENS ON UNNECESSARY LIVE AI TESTS
============================================================

During packaging:

DO NOT repeatedly invoke Gemini/Opus/Sonnet.

Use:
- imports
- static validation
- route validation
- health calls
- deterministic Step2 tests

for most verification.

At the very end, if environment permits, make at MOST:
- one minimal enterprise auth/search smoke test
- no giant Trigger 1 scan unless genuinely necessary

Do not sit polling an LLM call repeatedly.

============================================================
17. DO NOT ASK ME "ALLOW?" FOR EVERY ACTION
============================================================

Work continuously through this deployment task.

You are authorized to:
- inspect files
- create deployment files
- create the UNIX package folder
- create scripts
- create manifests
- create requirements
- run local deterministic validation
- build the archive

Do NOT repeatedly stop asking whether to continue.

STOP only if:
- an action would destroy source code,
- a secret would need to be exposed,
- production infrastructure permissions are required,
- or you encounter something impossible to determine safely.

============================================================
18. FINAL REPORT — MANDATORY
============================================================

At completion give me ONE consolidated report.

Do not merely say "done."

Include:

A. FINAL PACKAGE
Exact folder:
Exact archive:
Size:

B. FILES INCLUDED
Every important runtime directory/file group.

C. FILES EXCLUDED
And reason.

D. FILES CREATED
Exact paths.

E. SOURCE FILES MODIFIED
Exact paths + exact reason.
If none, say NONE.

F. UNIX PYTHON SETUP
Python version:
venv command:
requirements:
installation command:

G. ENVIRONMENT VARIABLES
Complete required table.

H. AUTH / TOKEN DESIGN
Current token lifetime:
How refresh works:
Refresh interval:
Which script/service:
Where logs go:
What happens on refresh failure:
Whether interactive login is ever required:

I. SERVICE MANAGEMENT
Start:
Stop:
Restart:
Status:
Health:

J. FRONTEND
Exact serving mechanism:
Exact URL:

K. CERTIFICATE/TLS
Windows behavior:
UNIX behavior:
Required CA/cert path:

L. STEP 2.2 CACHE
Source files:
Cache location:
Regeneration behavior:

M. VALIDATION RESULTS
Imports:
FastAPI:
Health:
Static frontend:
Data:
Auth:
Token refresh:
Any live model smoke test:

N. REMAINING BLOCKERS
Only real blockers.

O. COPY-TO-MARKETDEV PROCEDURE
Give me the exact shortest procedure starting from:
"I uploaded Rapid_Portfolio_Review_AI_UNIX_PACKAGE.tar.gz to /home/<user>/..."

Then exact commands:
1.
2.
3.
...

P. FIRST START PROCEDURE
Exact commands.

Q. REBOOT/SESSION-LOGOUT BEHAVIOR
Tell me whether RPR and token-refresh continue after SSH/session disconnect.
If not, explain exactly what service/scheduler is needed.

============================================================
SUCCESS CRITERIA
============================================================

I should be able to:

1. Copy ONE clean package to MarketDev.
2. Extract it.
3. Run ONE bootstrap script.
4. Configure secrets/environment externally.
5. Start RPR.
6. Open the RPR UI.
7. See /health healthy.
8. Use the enterprise models.
9. Leave it running without token expiry killing it every ~30 minutes.
10. Restart it with one command.
11. Know exactly where its logs are.
12. Recreate the environment from zero later.

Do the implementation first, validate it, then give the report.

Do NOT spend time redesigning RPR.
Do NOT start Step 2.5.
Do NOT change business logic.
This is strictly the UNIX MarketDev deployment engineering pass.
