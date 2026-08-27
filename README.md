IMPLEMENTATION TASK — RPR MARKETDEV M2M MIGRATION

You are now IMPLEMENTING, not producing another architecture report.

IMPORTANT:
This is an audited Citi environment.
Use only existing approved Citi components, packages, endpoints,
certificates and authentication mechanisms already present in the
project/environment.

STRICT PRESERVATION RULE — BONE + APPEND
The current working RPR application is immutable business/visual bone.

DO NOT:
- redesign
- refactor unrelated code
- rename routes
- change API response schemas
- change prompts
- change model identifiers
- change Step 1 business logic
- change Step 2 logic
- change scoring
- change portfolio data
- change frontend/v31
- change CSS
- change JS unless absolutely required for deployment (expected: NO)
- remove working fallback code unless specifically required below
- hardcode credentials
- print credentials/tokens
- read credential file contents
- disable TLS verification
- copy Windows ~/.helix credentials
- introduce Windows/Tectia/port-8822 runtime dependencies

GOAL

Make the existing RPR package run independently on MarketDev using
approved M2M/service authentication.

FINAL runtime must NOT require:
- Windows
- browser OAuth
- Tectia
- SSH port forwarding
- localhost:8822
- personal SOEID Helix OIDC credential
- ~/.helix/*-oidc.cred
- interactive H2M login

The deployed FastAPI application remains on:
    host 0.0.0.0
    port 8010
    server:app

KNOWN FINDINGS TO VERIFY AGAINST ACTUAL SOURCE

1. Claude/R2D2:
backend/llm_gateway.py already contains an M2M
client_credentials implementation, apparently through
R2D2LLMGateway._get_m2m_token() / _acquire_token().

Expected switch:
    R2D2_AUTH_MODE=m2m

Expected credential names include:
    COIN_CLIENT_ID
    COIN_CLIENT_SECRET

Aliases may exist:
    R2D2_CLIENT_ID
    R2D2_CLIENT_SECRET

VERIFY EXACT SOURCE BEFORE MODIFYING.

2. Gemini:
There are multiple historical Gemini implementations.

Known/current candidates:
    backend/market_event_scout.py
    backend/rpr_search_agent.py
    backend/web_search_agent.py
    backend/narrative_enricher.py
    backend/theme_assistant.py
    backend/rpr_service.py

Previous forensic work indicates the live Trigger 1 / Trigger 2 pipeline
may use rpr_search_agent.py and that this module manually invokes:

    helix auth access-token print -a

while market_event_scout.py already uses:
    helix_adk_adapter.models.Vertex

DO NOT TRUST THE PREVIOUS REPORT BLINDLY.
TRACE server.py imports/routes and establish the exact live graph from
the actual MarketDev source.

3. Official Citi adapter M2M documentation available internally indicates:

    RUN_MODE=local_m2m
    CLIENT_ID
    CLIENT_SECRET

and the approved helix_adk_adapter handles authentication internally.

4. llm_gateway.py has previously been observed to contain a temporary
TLS fallback equivalent to:

    verify = cert_file if valid else False

This is NOT acceptable for deployment.

TLS must fail closed.

PHASE 0 — BACKUP

Before editing anything create timestamped backups of ONLY files that
will be edited.

Do not modify any file until the live import graph is established.

PHASE 1 — FORENSIC LIVE-PATH CONFIRMATION

Inspect:
    backend/server.py
    backend/rpr_search_agent.py
    backend/market_event_scout.py
    backend/narrative_enricher.py
    backend/web_search_agent.py
    backend/theme_assistant.py
    backend/rpr_service.py
    backend/llm_gateway.py
    marketdev_start.sh

Produce a concise runtime graph for:

A. Step 1 Trigger 1 discovery
B. Step 1 evidence enrichment
C. Step 1 Trigger 2 narrative enrichment
D. Claude/Opus/Sonnet calls

Identify which Gemini implementation is ACTUALLY imported by server:app.

PHASE 2 — GEMINI M2M MINIMUM PATCH

If live rpr_search_agent.py directly shells to Helix:

DO NOT rewrite rpr_search_agent.py.

Change ONLY its model-client/auth acquisition layer.

Use the already-approved adapter implementation present elsewhere in
this same repository as the reference implementation.

Prefer copying the exact adapter/client-construction pattern from the
known-working market_event_scout.py or another live project module.

Preserve:
- prompts
- model name
- enterprise web search tool
- search behavior
- retries
- evidence processing
- quality gates
- output format
- JSON
- parsing
- event count
- theme independence
- all public functions
- all call signatures

Remove ONLY the runtime dependency on:
    subprocess helix auth access-token print -a

Do not invent a new authentication framework.

If rpr_search_agent.py already supports adapter M2M in the ACTUAL
MarketDev package, make no change.

PHASE 3 — CLAUDE/R2D2 M2M

Verify llm_gateway.py already supports:
    R2D2_AUTH_MODE=m2m

If yes, do NOT redesign it.

Use existing:
    COIN_CLIENT_ID
    COIN_CLIENT_SECRET

Preserve aliases if they already exist.

No prompt/model/business-logic modification.

PHASE 4 — TLS FAIL-CLOSED PATCH

Inspect the exact _get_m2m_token() implementation.

If it can perform:
    requests.post(..., verify=False)

when the Citi certificate is missing, patch ONLY this behavior.

Required behavior:

- resolve configured Citi CA path
- verify the file exists
- if missing/invalid:
      raise a clear EnvironmentError
- otherwise:
      requests.post(..., verify=<Citi CA file>)

NEVER set verify=False.

Preserve token endpoint, grant, scope, timeout and all other behavior.

PHASE 5 — marketdev_start.sh MINIMUM CHANGE

Inspect the actual file first.

For M2M mode:

Set/validate the appropriate mode variables, expected to be:

    R2D2_AUTH_MODE=m2m
    RUN_MODE=local_m2m

Credentials must come from an external secrets-safe mechanism:

    COIN_CLIENT_ID
    COIN_CLIENT_SECRET

For adapter compatibility, if required by official package behavior:

    CLIENT_ID="$COIN_CLIENT_ID"
    CLIENT_SECRET="$COIN_CLIENT_SECRET"

DO NOT put credential values in the script.

Require a valid Citi CA certificate environment variable/path.

The current Helix CLI validation must become conditional:

    if H2M:
        Helix CLI may be required
    if M2M:
        Helix CLI must NOT be required

No port-8822/Tectia/browser checks in M2M startup.

KEEP:
    RPR_HOST=0.0.0.0
    RPR_PORT=8010
    server:app
    venv handling
    dependency checks
    frontend serving
    timeout/cache variables
    Gemini project/model configuration
    all unrelated startup behavior

PHASE 6 — DEPENDENCIES

Use ONLY the approved/internal package source already configured on
MarketDev.

Do not pip-install from the public internet.

Verify the project venv has/imports:
    helix_adk_adapter
    google-adk
    enterprise_web_search or the project's exact approved equivalent
    FastAPI/Uvicorn
    all existing requirements

Use the project's existing dependency manifest where possible.

Do not gratuitously upgrade package versions.

PHASE 7 — SECURITY

Never:
    cat credential files
    print access tokens
    echo client secrets
    log Authorization headers
    disable TLS
    copy Windows credentials

Environment-variable NAME checks are allowed.

Secret VALUE output is forbidden.

PHASE 8 — TESTS

Run targeted tests before starting the entire application.

1. Python/venv
2. required imports
3. Citi CA file exists
4. required ENV NAMES are set
5. Claude/R2D2 M2M preflight
6. Gemini/ADK M2M preflight
7. application /health
8. Step 1 Trigger 1 with ONE theme and ONE event
9. Step 1 Trigger 2 with a tiny narrative
10. frontend request through MarketDev port 8010

For token/preflight tests report only:
    success/failure
    HTTP status if safe
    token present yes/no
    token length if necessary

Never display token contents.

SUCCESS CRITERIA

The migration is complete only if:

A. server:app starts on MarketDev
B. /health succeeds
C. Claude/R2D2 works using M2M
D. Gemini discovery works using M2M
E. Trigger 1 completes
F. Trigger 2 completes
G. frontend communicates with backend
H. no process invokes:
       helix auth access-token print
   during normal M2M runtime
I. port 8822 is not needed
J. Tectia is not needed
K. Windows is not needed after deployment
L. no TLS verify=False path exists for M2M
M. no business/visual behavior changed

FILES ALLOWED TO CHANGE

Expected maximum:
    marketdev_start.sh
    backend/llm_gateway.py
    backend/rpr_search_agent.py   ONLY IF live path still uses Helix H2M

Do not change market_event_scout.py if it is already correctly using
helix_adk_adapter.

Everything else is read-only unless you prove a concrete blocker first.

ROLLBACK

For every modified file:
- keep timestamped pre-M2M backup
- show exact unified diff
- provide exact rollback cp command

FINAL RESPONSE

Do not give me another theoretical report.

Actually perform the implementation and return:

1. LIVE IMPORT GRAPH
2. FILES MODIFIED
3. EXACT DIFF FOR EACH FILE
4. WHY EACH LINE WAS NECESSARY
5. FILES VERIFIED UNCHANGED
6. ENVIRONMENT VARIABLE NAMES REQUIRED — NAMES ONLY
7. DEPENDENCY CHECK RESULTS
8. TLS CHECK RESULT
9. CLAUDE/R2D2 M2M TEST RESULT
10. GEMINI/ADK M2M TEST RESULT
11. TRIGGER 1 TEST RESULT
12. TRIGGER 2 TEST RESULT
13. UI/BACKEND TEST RESULT
14. CONFIRM WINDOWS/TECTIA/8822 ARE NO LONGER RUNTIME DEPENDENCIES
15. ROLLBACK COMMANDS
16. FINAL GO / NO-GO

If M2M COIN credentials have not yet been issued, implement everything
that can safely be implemented, stop before any fake credential test,
and mark the credential-dependent tests BLOCKED — DO NOT emulate them
with H2M.
