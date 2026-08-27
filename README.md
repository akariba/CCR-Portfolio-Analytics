We now have the official Citi architecture conclusion from Stylus:

Target deployment = shared UNIX MarketDev service using M2M.

Official documentation states:

M2M / local_m2m is the supported service/shared deployment authentication pattern.
Credentials are an application/agent-specific COIN Client ID + Client Secret.
OAuth grant = client_credentials.
H2M browser login, Helix interactive authentication, localhost:8822 callback and Tectia tunnel are NOT required for M2M.
The credential must represent the application/agent, not my personal SOEID.
Do NOT expose or print credentials.

Your previous read-only code inspection found:

def _acquire_token(self):
    if self._auth_mode == "h2m":
        return get_h2m_token()
    else:
        return self._get_m2m_token()

and _get_m2m_token() already implements OAuth2 client_credentials for the Claude/R2D2 path.

You also found that the Gemini/ADK path in rpr_search_agent.py appears to call the H2M/Helix token logic independently.

DO NOT MODIFY ANYTHING YET.

Perform one final exhaustive READ-ONLY deployment-authentication audit.

Inspect:

llm_gateway.py
rpr_search_agent.py
market_event_scout.py
narrative_enricher.py
every helix_adk_adapter import/use
every Gemini/Vertex initialization path
every R2D2/Claude initialization path
server.py
RUNTIME_ENV.ps1
all environment-variable lookups relevant to authentication
all occurrences of:
R2D2_AUTH_MODE
RUN_MODE
COIN_CLIENT_ID
R2D2_CLIENT_ID
CLIENT_ID
COIN_CLIENT_SECRET
R2D2_CLIENT_SECRET
CLIENT_SECRET
get_h2m_token
_get_m2m_token
helix
access-token
client_credentials
GRANT_TYPE
TOKEN_URL
Vertex
Gemini
google
adk

Also inspect the UNIX marketdev_start.sh if available. If it is not in the Windows workspace, say so explicitly and do not guess.

I want exact answers to these questions:

1. Claude/R2D2 M2M

Confirm the exact existing implementation and exact environment variable names it reads. Cite file + line numbers.

Determine whether:

R2D2_AUTH_MODE=m2m

is sufficient to select it, or whether RUN_MODE=local_m2m is also consumed anywhere by my application.

2. Credential names

Resolve the apparent difference between Citi documentation saying:

CLIENT_ID
CLIENT_SECRET

and the RPR implementation apparently reading:

COIN_CLIENT_ID / R2D2_CLIENT_ID
COIN_CLIENT_SECRET / R2D2_CLIENT_SECRET

Give the exact variables the CURRENT CODE reads. Do not propose renaming working application code unless necessary.

3. Gemini/ADK authentication — CRITICAL

Trace the complete execution path for:

Step1 Trigger1
    → theme gate
    → Gemini discovery
    → enterprise web search/evidence
    → narrative enrichment
    → Claude refinement

For every model/API call identify:

component
model
authentication implementation
credential source
H2M dependency yes/no
M2M support yes/no
Helix dependency yes/no

Do not infer. Cite source.

In particular determine whether the Gemini/ADK enterprise search adapter itself already supports local_m2m, CLIENT_ID/CLIENT_SECRET, service identity, or another non-interactive mechanism that the RPR simply is not configuring.

Inspect the installed adapter/package/interface if locally available.

4. Separate the two authentication systems

Determine whether:

Claude/R2D2 authentication

and

Gemini/Vertex/ADK authentication

are actually independent.

I need to know whether one COIN M2M client can support both or whether Gemini uses a different enterprise authentication system entirely.

5. Startup script

Identify exactly which existing H2M-specific startup checks become invalid under M2M, including:

Helix executable check
auth plugin check
persisted H2M credential check
port 8822
browser/Tectia assumptions

Do NOT remove generic TLS/certificate checks.

6. TLS

Confirm the exact certificate variables the current Python code reads and whether any path contains an unsafe fallback such as verify=False.

Identify it but DO NOT modify anything.

7. Functional coverage

Build this table for the FULL RPR application:

RPR capability	Current auth	M2M-ready today?	Code change required?
Theme quality gate			
Step1 Gemini discovery			
Enterprise web evidence			
Narrative enrichment			
Claude/Opus refinement			
Trigger2			
Step2.1			
Step2.3			
Step2.4			
Step2.5			

8. Minimum patch

Only after completing the audit, show a proposed MINIMUM patch.

Preserve the RPR bone.

Rules:

no refactoring
no prompt changes
no frontend changes
no portfolio-data changes
no scoring changes
no model-routing changes
no Step1/Step2 business-logic changes
no deleting H2M support

M2M should be an additional/selectable deployment authentication mode.

DO NOT APPLY THE PATCH.

Show exact old/new snippets only.

9. MarketDev final target architecture

End with one diagram:

Browser users
      |
      v
MarketDev FastAPI RPR
      |
      +---- Gemini / enterprise search ----> [exact auth mechanism]
      |
      +---- Claude / R2D2 -----------------> COIN M2M
                                               |
                                               +-- application Client ID
                                               +-- Client Secret
                                               +-- client_credentials

10. GO / NO-GO

Give one of:

GO — configuration only
GO — minimal auth adapter patch required
NO-GO — missing enterprise credential/capability

Explain exactly why.

SECURITY:
Never print, read, decode or expose an existing token, secret or credential file. Metadata and environment-variable NAMES only.
