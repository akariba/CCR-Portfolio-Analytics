I need a STRICTLY READ-ONLY forensic analysis of the Helix authentication setup used by my WORKING Windows RPR application.

DO NOT modify any project file.
DO NOT modify Helix configuration.
DO NOT log me out.
DO NOT delete, rename, copy, move, export, import, or regenerate any credential.
DO NOT perform a new OAuth login unless I explicitly approve later.
DO NOT install/update Helix or any plugin.
DO NOT restart the RPR backend.
DO NOT change environment variables.
DO NOT print access tokens, refresh tokens, JWTs, client secrets, cookies, authorization codes, credential-file contents, or any other secret.

You MAY run read-only inspection commands and inspect source/configuration/metadata.

SECURITY / AUDIT RULE:
If you encounter a credential/token, report only:
- PRESENT / NOT PRESENT
- file path if appropriate
- file size
- modification timestamp
- token length if needed
- token type if inferable without decoding secret payload
- expiration timestamp only if safely obtainable
Never output the secret value itself.

==============================================================
CONTEXT
==============================================================

We are migrating a working Windows RPR application to a Citi MarketDev UNIX server.

The Windows application works with Helix authentication.

Known observations that MUST BE VERIFIED rather than assumed:

1. Windows user/project environment:
   RPR project root is approximately:
   C:\Users\ak547743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

2. The working backend uses:
   backend\server.py
   FastAPI app:
   server:app

3. Windows launches it using the project-approved Python virtual environment.

4. RPR Claude/R2D2 integration is implemented in:
   backend\llm_gateway.py

5. Gemini/ADK integration is implemented mainly in:
   backend\rpr_search_agent.py

6. Current application code appears to use:
   R2D2_AUTH_MODE=h2m
   or defaults to h2m.

7. llm_gateway.py appears to call something equivalent to:

   helix auth access-token print -a

   through a function such as:
   get_h2m_token()

8. A previous read-only inspection found a Windows Helix credential file approximately under:

   C:\Users\<USER>\.helix\<client-id>-oidc.cred

   DO NOT print its content.

9. A fresh isolated Windows PowerShell process apparently executed:

   helix auth access-token print -a

   successfully and received a non-empty JWT-shaped access token.

   VERIFY this safely WITHOUT displaying the token.

10. MarketDev currently has:
    - Helix CLI installed
    - Helix auth plugin installed
    - backend itself starting successfully
    - authentication still unresolved

11. On MarketDev, this command:

    helix auth access-token set --scope <approved RPR scope>

    produces an OAuth authorization URL containing a redirect to:

    http://localhost:8822/callback

    and waits for the callback.

12. Tectia is being used for SSH from Windows to MarketDev.

13. A Tectia LOCAL tunnel has now been configured:

    Windows listen:
        127.0.0.1:8822

    through MarketDev SSH connection to:

        MarketDev 127.0.0.1:8822

    However the browser callback has still shown either
    CONNECTION_REFUSED or CONNECTION_RESET.

These are observations/hypotheses. VERIFY them.

==============================================================
PRIMARY QUESTION
==============================================================

Determine EXACTLY how the successful Windows Helix authentication works and what the organization-supported equivalent should be on MarketDev UNIX.

I am particularly concerned that Helix is an audited/managed enterprise authentication mechanism. I do NOT want us to invent a workaround that bypasses the approved mechanism.

==============================================================
PART 1 — HELIX INSTALLATION ON WINDOWS
==============================================================

Inspect and report:

A. Exact executable used when I type:

   helix

B. Output of safe metadata commands such as:
   where.exe helix
   Get-Command helix
   helix --version

C. Determine:
   - installation location
   - Helix CLI version
   - whether it is centrally deployed or user-installed if evidence exists
   - executable publisher/signature if safely inspectable
   - PATH entry providing Helix

D. Plugins:
   - list installed Helix plugins
   - identify the auth plugin
   - exact auth plugin version
   - where the plugin binary/files live
   - whether auth is built-in or plugin-provided

Do NOT upgrade anything.

==============================================================
PART 2 — EXACT AUTH COMMAND TREE
==============================================================

Read HELP only and document:

helix --help
helix auth --help
helix auth access-token --help
helix auth access-token set --help
helix auth access-token print --help
helix auth status --help

Report the supported syntax and semantics.

I specifically need to know what these commands mean:

helix auth access-token set
helix auth access-token print -a

Explain precisely what "-a" means according to the installed version.

Do not infer from memory if the CLI help provides evidence.

==============================================================
PART 3 — WINDOWS CREDENTIAL PERSISTENCE
==============================================================

Determine how Helix persists successful authentication on Windows.

Search READ-ONLY under locations such as:

%USERPROFILE%\.helix
%APPDATA%
%LOCALAPPDATA%

and any Helix-documented/configured directories.

For every relevant file report ONLY:

- full path
- filename
- type/purpose if determinable
- size
- creation time
- modification time
- ACL/owner if useful

DO NOT READ OR PRINT secret credential contents.

Determine:

1. What creates the *-oidc.cred file?
2. Is this an OAuth credential, refresh credential, access token cache, or another object?
3. Does `access-token print -a` derive a fresh access token from this persisted credential?
4. Does it merely return a cached token?
5. Is refreshing automatic?
6. Does login survive:
   - closing PowerShell?
   - restarting VS Code?
   - restarting the backend?
   - Windows reboot?
7. Is the persisted credential bound to:
   - Windows user?
   - machine?
   - client_id?
   - OAuth scope?
   - host?
8. Is Windows Credential Manager involved?
9. Is DPAPI involved?
10. Is there any registry storage?
11. Is the .cred file portable to UNIX?

For #11 especially:
DO NOT copy it.
I only want to know whether copying it would be technically supported, unsupported, prohibited, insecure, machine-bound, or otherwise inappropriate.

==============================================================
PART 4 — IDENTIFY THE OAUTH CLIENT
==============================================================

Without revealing secrets, identify:

- client_id
- whether client_id is public/non-secret
- auth/authorization endpoint hostname
- token endpoint hostname if discoverable
- redirect URI
- scopes requested
- PKCE usage
- state usage
- response type
- callback port
- whether localhost callback port is fixed or dynamically selectable
- whether browser launch behavior can be controlled
- whether there is a CLI/headless/device-code mode

IMPORTANT:
Do not print authorization codes or tokens.

If the client ID is stored in configuration and is not secret, report it.

Explain whether the same client_id is being used by:
- Windows
- MarketDev
- RPR's llm_gateway.py

==============================================================
PART 5 — WHAT EXACTLY HAPPENS DURING A SUCCESSFUL WINDOWS LOGIN
==============================================================

Reconstruct the full sequence, based on code/help/configuration.

Example structure:

1. User runs ...
2. Helix generates PKCE verifier/challenge ...
3. Helix starts listener ...
4. Browser authenticates against ...
5. IdP redirects to ...
6. localhost callback reaches ...
7. Helix exchanges code ...
8. Helix persists ...
9. subsequent `print -a` ...
10. RPR receives ...

But DO NOT assume this sequence — verify each item.

Tell me exactly:
- which process listens on localhost:8822
- which executable owns that listener
- when that listener starts
- whether it listens IPv4, IPv6, or both
- whether it binds 127.0.0.1 or all interfaces
- whether it closes immediately after successful OAuth callback.

If safe, while NOT performing a new login, inspect historical evidence/configuration or source/plugin behavior to determine this.

==============================================================
PART 6 — WHY WINDOWS ALREADY WORKS
==============================================================

Prove or disprove this hypothesis:

"Windows works because an interactive browser OAuth authorization was completed successfully sometime previously, and Helix persisted a reusable OAuth credential in the user's .helix directory. Therefore current RPR sessions do not perform browser authentication on every request; `helix auth access-token print -a` transparently obtains/refreshes an access token from the persisted credential."

Give:
VERIFIED / PARTIALLY VERIFIED / FALSE

with evidence.

==============================================================
PART 7 — HOW RPR ACTUALLY USES HELIX
==============================================================

Inspect the LIVE Windows RPR source, especially:

backend\llm_gateway.py
backend\rpr_search_agent.py
backend\RUNTIME_ENV.ps1 or project-root RUNTIME_ENV.ps1
backend\server.py
backend\start_backend.ps1

and any directly imported authentication helpers.

Trace the exact execution path from:

RPR model request
   ->
Helix token retrieval
   ->
R2D2 / Gemini request.

For every important step give:

file
line number
function
environment variable
external process called

Determine whether RPR:

A. reads the .cred file itself
B. invokes Helix and lets Helix manage credentials
C. receives an access token from Helix stdout
D. caches it internally
E. refreshes automatically
F. retries on expiry/401
G. uses different token retrieval for Claude/R2D2 versus Gemini/Vertex.

This distinction is critical.

==============================================================
PART 8 — WINDOWS HELIX ENVIRONMENT
==============================================================

Inspect environment variable NAMES and non-secret values relevant to Helix.

Examples:

HELIX*
R2D2*
COIN*
HTTP_PROXY
HTTPS_PROXY
NO_PROXY
REQUESTS_CA_BUNDLE
SSL_CERT_FILE
CITI_CERT_PATH

DO NOT output secret values.

For secrets say only:
SET / NOT_SET.

Also determine whether Windows Helix relies on:
- corporate proxy
- browser proxy
- system proxy
- certificate bundle
- Windows certificate store
- Kerberos
- NTLM
- SSO cookies
- browser identity
- machine certificate.

Do not guess.

==============================================================
PART 9 — ENTERPRISE/AUDIT CHARACTERISTICS
==============================================================

This is very important.

Look for evidence in:
- CLI help
- installed package metadata
- plugin documentation
- source comments
- enterprise configuration
- internal package metadata available locally

to determine whether Helix authentication is:

- an organization-approved authentication mechanism
- centrally managed
- audited
- subject to logging
- linked to individual user identity
- linked to OAuth client_id
- linked to scope
- linked to device/session
- governed by expiration/refresh policy.

Do NOT claim "audited" unless you have direct evidence.

Use classifications:

VERIFIED
STRONG INFERENCE
UNKNOWN

Also tell me what may reasonably be logged by the service:
- authentication attempt
- username/user identity
- client_id
- scope
- source host/IP
- token issuance
- application access

Again distinguish verified evidence from inference.

==============================================================
PART 10 — MARKETDEV / UNIX COMPATIBILITY
==============================================================

Based on the exact installed Windows behavior, determine the supported UNIX equivalent.

Questions:

1. Is `helix auth access-token set` expected to work on headless UNIX?
2. Does it officially support BROWSER environment override?
3. Is localhost callback expected?
4. Is SSH local-port forwarding a valid mechanism for the callback?
5. Is there another supported option specifically for remote/headless hosts:
   - device code
   - no-browser
   - callback URL override
   - manual auth code
   - H2M bootstrap
   - M2M
   - imported credential
   - enterprise SSO helper?

6. Can callback port 8822 be changed?
7. Can callback host be changed?
8. Does the listener expect HTTP only?
9. Does the listener validate Host?
10. Does it require exact redirect URI?
11. Does an SSH tunnel interfere with PKCE/state? It normally should not, but verify from implementation if possible.

DO NOT recommend copying Windows credentials to MarketDev unless documentation explicitly supports it.

==============================================================
PART 11 — INVESTIGATE OUR CURRENT TECTIA DESIGN
==============================================================

Current configuration is intended to be:

Windows:
    Edge -> http://localhost:8822/callback

Tectia local tunnel:
    listen Windows 127.0.0.1:8822
          |
          SSH
          v
    MarketDev 127.0.0.1:8822

MarketDev:
    waiting Helix auth process owns 127.0.0.1:8822

Assess whether that direction is correct.

Important:
Explain the difference between:
- LOCAL tunnel
- REMOTE tunnel

and state which one is needed for THIS callback direction.

Do not change Tectia.

Also explain why a browser could show:

ERR_CONNECTION_REFUSED

versus

ERR_CONNECTION_RESET

and what each implies in this exact topology.

==============================================================
PART 12 — SAFE WINDOWS TESTS
==============================================================

Perform only tests that DO NOT invalidate existing credentials.

I want evidence for:

1. Does a fresh PowerShell process find Helix?
2. Does a fresh PowerShell process find the auth plugin?
3. Does a fresh PowerShell process obtain a token using:

   helix auth access-token print -a

Do NOT print the token.

Instead report only:

EXIT_CODE
TOKEN_PRESENT=yes/no
TOKEN_LENGTH
JWT_SHAPE=yes/no

For example internally capture stdout and report metadata.

4. Does this work without RUNTIME_ENV.ps1?
5. Does it work without VS Code?
6. Which files under .helix were accessed/modified, if safely observable?
7. Does token retrieval modify the persisted credential timestamp?

Do not perform logout/login.

==============================================================
PART 13 — WHAT MUST EXIST ON MARKETDEV
==============================================================

Produce a precise checklist matching Windows:

[ ] Helix CLI correct version
[ ] auth plugin correct version
[ ] client configuration
[ ] scope
[ ] certificate
[ ] proxy/network
[ ] persisted credential OR supported initialization flow
[ ] PATH
[ ] HOME/.helix permissions
[ ] callback listener
[ ] browser/callback mechanism
[ ] RPR environment
[ ] RPR code invocation compatibility

Mark each:
KNOWN PRESENT
KNOWN MISSING
UNKNOWN

==============================================================
PART 14 — AUDIT-SAFE RECOMMENDATION
==============================================================

Give me the safest supported way to initialize Helix on MarketDev.

Prioritize, in order:

1. Official existing Helix mechanism.
2. Organization-approved headless/remote mechanism.
3. Browser OAuth through SSH callback tunnel if that is an intended/supported design.
4. M2M only if this application/service is actually supposed to use M2M.

Do NOT recommend:
- manually extracting tokens
- embedding JWTs
- saving tokens in source
- saving tokens in shell scripts
- bypassing TLS
- verify=False
- disabling certificate validation
- copying credential files unless explicitly supported
- inventing OAuth flows.

==============================================================
PART 15 — OUTPUT FORMAT
==============================================================

Produce one report titled:

WINDOWS HELIX AUTHENTICATION FORENSIC — RPR MARKETDEV MIGRATION

Sections:

1. Executive finding
2. Exact Windows Helix installation
3. Auth plugin and versions
4. Exact successful Windows authentication architecture
5. Credential persistence architecture
6. OAuth/PKCE flow
7. RPR -> Helix call path
8. Token caching/refresh behavior
9. Certificates/proxy/network behavior
10. Audit/governance findings
11. Windows vs MarketDev comparison
12. Analysis of Tectia 8822 tunnel
13. Exact reason Windows works today
14. Exact missing component on MarketDev
15. Supported MarketDev solution
16. Safe commands to execute later
17. Remaining unknowns

For every factual claim provide:
SOURCE FILE / COMMAND / LINE NUMBER where possible.

Use:
[VERIFIED]
[STRONG INFERENCE]
[UNKNOWN]

==============================================================
CRITICAL FINAL QUESTIONS
==============================================================

Answer these explicitly at the very end:

Q1. What EXACTLY allows `helix auth access-token print -a` to succeed in a brand-new Windows PowerShell process?

Q2. What persistent state does Helix require?

Q3. Where is that state stored?

Q4. Who created it and when, as far as metadata can establish?

Q5. Is the credential portable from Windows to UNIX?

Q6. Would copying it violate or bypass the intended enterprise authentication design?

Q7. Is interactive browser authorization on MarketDev expected only ONCE, after which `print -a` should work persistently?

Q8. Is SSH LOCAL forwarding Windows:8822 -> MarketDev:127.0.0.1:8822 technically the correct callback direction?

Q9. Why are we currently seeing CONNECTION_RESET after configuring that tunnel?

Q10. What exact read-only command(s) on MarketDev would prove whether Helix is actually listening on port 8822 WHILE the OAuth command is waiting?

Q11. Is there a simpler officially-supported headless authentication mechanism that avoids port 8822 entirely?

Q12. Is Helix authentication itself audited/managed by Citi? Give evidence, not assumption.

Q13. What should we do next on MarketDev, in exact order, while preserving the approved authentication mechanism?

DO THE FORENSIC INSPECTION NOW.

Do not propose application code changes yet.
Do not modify RPR.
Do not change authentication configuration.
Do not expose secrets.
