I need a READ-ONLY forensic investigation of the Helix authentication setup used by my WORKING Windows RPR application.

IMPORTANT:
- DO NOT modify any source file.
- DO NOT modify RUNTIME_ENV.ps1.
- DO NOT install/uninstall anything.
- DO NOT restart the backend.
- DO NOT log me out of Helix.
- DO NOT refresh/revoke/create credentials unless absolutely necessary.
- NEVER print an access token, refresh token, client secret, API key, cookie, Authorization header, or other secret.
- If a command returns a token, capture it internally and report only:
    TOKEN_PRESENT=yes/no
    TOKEN_LENGTH=<number>
  Never display the token itself.
- I want observed evidence, not recommendations or guesses.
- If something cannot be proven, write UNKNOWN.
- This is specifically to reproduce the already-working Windows authentication behavior on a headless MarketDev UNIX host.

PROJECT ROOT:
C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

WORKING BACKEND:
backend\server.py
FastAPI object: server:app

Known Windows launcher:
backend\start_backend.ps1

Known runtime configuration:
RUNTIME_ENV.ps1 at project root

Relevant code:
backend\llm_gateway.py
backend\rpr_search_agent.py
backend\market_event_scout.py
backend\theme_assistant.py / theme_assistant_batch.py if relevant

The purpose of this investigation is to answer one question:

HOW DOES MY WORKING WINDOWS RPR INSTANCE OBTAIN AND REFRESH ITS HELIX/R2D2 H2M AUTHENTICATION TOKEN?

Do not rely on prior conversation assumptions. Inspect the actual Windows system, scripts and source now.

============================================================
PART 1 — WINDOWS HELIX INSTALLATION
============================================================

Inspect and report:

1. Exact executable being used:
   Get-Command helix
   where.exe helix

2. Exact Helix version:
   helix --version

3. Installed Helix plugins:
   helix plugins ls

Specifically establish:
- Is auth a built-in command or a plugin?
- Exact auth plugin version if applicable.
- Exact helix.exe location.
- Is another Helix executable present earlier/later in PATH?
- What PATH entry makes Helix available?

Do NOT modify PATH.

============================================================
PART 2 — CURRENT HELIX AUTH STATE
============================================================

Determine whether Windows currently has a reusable Helix H2M token.

Run the equivalent of:

$token = (& helix auth access-token print -a 2>$null | Out-String).Trim()

Report ONLY:

HELIX_TOKEN_PRESENT=yes/no
HELIX_TOKEN_LENGTH=<length or 0>
HELIX_TOKEN_COMMAND_EXIT_CODE=<code>

Do NOT print $token.

If possible without exposing a secret, determine:
- whether it is cached/persisted by Helix;
- whether a fresh PowerShell window can retrieve it;
- whether it exists independently of the RPR Python process;
- whether backend restart is required after token expiry;
- whether Helix refreshes/re-acquires it automatically.

Do NOT delete or refresh the token during this investigation.

============================================================
PART 3 — HOW THE TOKEN WAS ORIGINALLY CREATED
============================================================

Inspect available Helix auth command/help/config information.

Determine whether the working Windows setup uses:

A. browser OAuth/PKCE H2M flow
B. Kerberos/SSO
C. m2m/client credentials
D. another mechanism

Report the exact evidence.

Determine whether the command used to establish H2M is equivalent to:

helix auth access-token set --scope <scope>

Do not run it if doing so could replace/reset the existing token.

Determine:
- exact scope consumed by RPR;
- where that scope comes from;
- whether callback localhost is used;
- callback port, if provable;
- whether Windows browser is launched automatically;
- whether Windows Helix receives the OAuth callback directly;
- whether a browser environment variable such as BROWSER is involved.

============================================================
PART 4 — HELIX CONFIG/PERSISTENCE
============================================================

Determine where Helix stores enough state for:

helix auth access-token print -a

to work in a new terminal.

Look only for paths/config metadata.

Possible areas include, but are not limited to:
- user profile
- .helix
- AppData
- credential manager
- configuration files
- plugin state

DO NOT dump files containing credentials.

For every relevant item report:

PATH
TYPE
PURPOSE
PERSISTENT_ACROSS_TERMINALS=yes/no/unknown
SECRET_MATERIAL_PRESENT=yes/no/unknown

If Windows Credential Manager or another OS secure store is used, report that fact but DO NOT extract credentials.

============================================================
PART 5 — RPR TOKEN ACQUISITION CODE
============================================================

Read backend\llm_gateway.py carefully.

Trace the exact production path from:

call_text(...)
through the gateway
to token acquisition.

I need exact function names and file:line evidence for:

- _get_client / client construction
- _acquire_token
- get_h2m_token
- Helix subprocess invocation
- parsing of Helix stdout
- token cache
- token cache TTL
- auto refresh/retry
- manual invalidation
- fallback behavior
- H2M vs M2M branching
- R2D2_AUTH_MODE behavior
- COIN_CLIENT_ID / COIN_CLIENT_SECRET behavior
- certificate variables
- model selection

Quote only small relevant non-secret code fragments.

Determine exactly what output format RPR expects from:

helix auth access-token print -a

For example:
- bare JWT?
- text containing JWT?
- regex expecting eyJ...?
- JSON?

This is particularly important because UNIX currently reports:
"Helix CLI returned no parseable token."

============================================================
PART 6 — GEMINI / ADK TOKEN PATH
============================================================

Read backend\rpr_search_agent.py.

Determine whether Gemini/ADK:

1. independently invokes Helix;
2. asks llm_gateway for the cached H2M token;
3. reads another credential source;
4. shares exactly the same token as Claude/R2D2.

Trace exact functions and file:line evidence.

Explain why both of these UNIX errors can occur together:

"No existing H2M token was available from the current Helix session or llm_gateway"

and

"Helix CLI returned no parseable token"

============================================================
PART 7 — WINDOWS ENVIRONMENT ACTUALLY USED
============================================================

Inspect the actual current Windows environment plus RUNTIME_ENV.ps1.

For these variables report only NON-SECRET values.

For secret variables report only SET/NOT_SET.

Check at least:

LLM_PROVIDER
R2D2_AUTH_MODE

RPR_APPROVED_SONNET5_MODEL
STEP2_SONNET_MODEL
RPR_THEME_GATE_MODEL
STEP23_REVISION_MODEL
STEP23_REPAIR_MODEL
RPR_FEEDBACK_MODEL

RPR_STEP1_REFINEMENT_MODEL
STEP2_OPUS_MODEL
STEP23_REASONING_MODEL

RPR_GEMINI_MODEL
RPR_GEMINI_DISCOVERY_MODEL
RPR_GEMINI_EVIDENCE_MODEL
RPR_GEMINI_THEME_MODEL
RPR_GEMINI_LOCATION

R2D2_UAT_URL
RPR_VERTEX_BASE_URL
R2D2_BASE_URL
VERTEX_ENDPOINT
BASE_VERTEX_URL

R2D2_GCP_PROJECT
VERTEX_PROJECT
VERTEX_PROJECT_ID

R2D2_SCOPE

CITI_CERT_PATH
R2D2_CERT_FILE
REQUESTS_CA_BUNDLE
SSL_CERT_FILE

COIN_CLIENT_ID
R2D2_CLIENT_ID
COIN_CLIENT_SECRET
ANTHROPIC_API_KEY

For COIN_CLIENT_SECRET and ANTHROPIC_API_KEY:
ONLY SET/NOT_SET.

Never print their values.

============================================================
PART 8 — CERTIFICATE BEHAVIOR
============================================================

Determine exactly which certificate file the WORKING Windows RPR process uses.

Report:
- environment variable name;
- path;
- whether file exists;
- whether readable;
- which Python modules consume it;
- whether REQUESTS_CA_BUNDLE is derived from it;
- whether SSL_CERT_FILE is derived from it.

Do not print certificate private material.

If it is only a CA certificate/public chain, say so.

============================================================
PART 9 — BACKEND STARTUP AND ENV LOADING
============================================================

Read start_backend.ps1.

Establish exactly:

1. Python executable used.
2. cwd when uvicorn starts.
3. uvicorn command.
4. whether RUNTIME_ENV.ps1 is sourced.
5. when it is sourced.
6. whether the environment exists before server.py imports.
7. whether anything else initializes Helix authentication.
8. whether start_backend.ps1 calls helix.
9. whether backend startup depends on an already-existing Helix token.

Also determine whether the WORKING Windows workflow is:

LOGIN TO HELIX ONCE
→ token persisted by Helix
→ start_backend.ps1
→ Python shells out to "helix auth access-token print -a"
→ token cached in Python

or something different.

============================================================
PART 10 — FRESH TERMINAL TEST WITHOUT BREAKING ANYTHING
============================================================

If safe, open/use a separate PowerShell shell context without stopping the backend.

Do NOT source RUNTIME_ENV.ps1 initially.

Check:

Get-Command helix
helix --version

and safely determine whether:

helix auth access-token print -a

returns a token.

Again capture it and report only PRESENT/LENGTH.

Then report whether this proves token state is:

A. persisted by Helix outside RPR
B. inherited only from the original process
C. environment-variable based
D. unknown

============================================================
PART 11 — WINDOWS VS MARKETDEV GAP
============================================================

Based ONLY on proven Windows facts, produce this comparison:

ITEM | WINDOWS WORKING BEHAVIOR | MARKETDEV CURRENT BEHAVIOR | DIFFERENCE

Include:

Helix executable
Helix version
auth plugin
auth plugin version
scope
token creation method
token persistence
browser involvement
callback behavior
callback host
callback port
token print command
token output format
PATH
certificate
R2D2_AUTH_MODE
LLM_PROVIDER
Python integration
Gemini integration
token refresh behavior

Do not propose source-code changes yet.

============================================================
PART 12 — FINAL ANSWER I NEED
============================================================

End with a very concise section:

WINDOWS HELIX AUTH BLUEPRINT

Write the exact sequence that presently makes Windows work.

For example, ONLY if evidence proves it:

1. Helix CLI installed at ...
2. auth plugin ...
3. user authenticates using ...
4. OAuth browser callback goes to ...
5. Helix persists token/state at ...
6. "helix auth access-token print -a" works in a fresh terminal.
7. RPR llm_gateway invokes ...
8. token is cached for ... seconds.
9. Gemini obtains token through ...
10. no Python restart required after ...

Then write:

WHAT UNIX MUST REPRODUCE

but only describe the minimum behavioral equivalence.

Do not modify UNIX files.
Do not generate a new architecture.
Do not recommend m2m yet.
Do not change Python.
Do not change the RPR application.

I first want an exact forensic comparison of the already-working Windows setup.

IMPORTANT:
Save the complete report to:

C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI\WINDOWS_HELIX_AUTH_FORENSIC.txt

Also print the complete report in this chat.
