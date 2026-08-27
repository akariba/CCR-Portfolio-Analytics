RPR MARKETDEV AUTHENTICATION ARCHITECTURE — H2M vs M2M FORENSIC REVIEW

I need you to perform a read-only, evidence-based review of the approved Citi authentication mechanisms available for my RPR application on MarketDev UNIX.

Do not change any files, credentials, SSH settings, Helix state, application code, environment variables, or MarketDev configuration. Do not display or extract tokens, secrets, refresh tokens, client secrets, .cred contents, private keys, cookies, or authorization codes.

The goal is to determine the correct supported authentication architecture, with particular attention to both H2M and M2M. Do NOT assume M2M is the preferred answer.

Context

RPR currently works on Windows using Helix.

On Windows we have established that:

helix auth access-token print -a works from a fresh PowerShell process.
Helix has a previously persisted OIDC credential under the user's .helix directory.
print -a can silently refresh/retrieve an H2M token without repeating browser authentication every call.
RPR's Claude/R2D2 code invokes the Helix CLI to obtain the token.
Therefore the current Windows implementation is effectively using H2M / user-identity authentication through Helix.

On MarketDev:

Helix CLI v1.1.4 is installed.
Auth plugin v1.6.0 is installed.
helix auth access-token set --scope ... launches an interactive OAuth/PKCE flow.
The MarketDev server is headless.
The callback is localhost:8822.
We attempted a Tectia LOCAL SSH tunnel from Windows 127.0.0.1:8822 to MarketDev 127.0.0.1:8822.
Windows-side Tectia listener works.
Helix listener works locally on MarketDev.
Direct curl on MarketDev to the Helix listener returns an HTTP response.
Traffic through the Tectia forwarding channel currently resets, so the browser OAuth callback has not completed.
No successful MarketDev *-oidc.cred has yet been persisted.

The application is intended eventually to be accessible to multiple internal users from MarketDev.

1. FIRST: DEFINE THE AUTHENTICATION MODELS PRECISELY

Using Citi-approved/internal documentation only, explain:

H2M — Human-to-Machine

Determine:

What H2M means specifically in the Helix/R2D2/COIN ecosystem.
Whether H2M is officially supported on UNIX/MarketDev.
Whether it is intended only for local developer machines or also supported for hosted applications.
Whether the browser OAuth flow is normally required once per UNIX host/user.
Whether successful authentication persists a refresh credential under ~/.helix.
Whether subsequent helix auth access-token print -a operations silently renew the access token.
Whether H2M authentication is tied to:
the human SOEID,
UNIX account,
hostname,
device,
client ID,
COIN scope,
or some combination.
Expected token/credential lifetime.
Whether H2M can survive:
shell close,
backend restart,
SSH reconnect,
MarketDev reboot.
Whether H2M supports a long-running FastAPI service.
Whether a service started by one authenticated human can serve requests from other users while using that human's H2M identity.
Whether that architecture is approved from an audit/governance standpoint.

M2M — Machine-to-Machine

Determine:

What M2M means specifically for R2D2/COIN.
Required CLIENT_ID / CLIENT_SECRET or equivalent.
Whether credentials come from R2D2 Console, PTS, Vault, environment variables, or another approved mechanism.
Whether M2M is mandatory, preferred, optional, or unsupported for MarketDev.
Whether M2M is intended specifically for shared/multi-user deployments.
Whether M2M requires Helix at runtime.
Whether M2M requires browser OAuth.
Whether M2M requires port 8822.
Audit/ownership implications of a service identity versus human identity.
2. DO NOT CONFLATE H2M WITH M2M

Earlier analysis concluded:

"Shared MarketDev deployment should use M2M."

Do not accept that conclusion without evidence.

I have now heard from a colleague that H2M may also be used.

Find the authoritative Citi documentation and determine whether:

H2M is allowed for MarketDev.
H2M is allowed for a server-hosted application.
H2M is allowed when the application is accessed by multiple users.
H2M is only intended for developer/PoC use.
M2M is recommended but not mandatory.
M2M becomes mandatory only when moving to a formally deployed/shared environment.
There is a third mode such as cluster, workload identity, Vault-backed credentials, agent-specific identity, or another approved deployment mechanism.

Quote or cite the exact relevant documentation sections.

Use:

[VERIFIED]
[STRONG INFERENCE]
[UNKNOWN]

Do not present inference as policy.

3. INSPECT THE ACTUAL RPR CODE PATH

Read the relevant application files and identify every authentication branch.

In particular inspect:

llm_gateway.py
rpr_search_agent.py
market_event_scout.py
narrative_enricher.py
server.py
RUNTIME_ENV.ps1
marketdev_start.sh
any Citi ADK adapter/authentication code

Determine:

Which environment variable selects H2M vs M2M.
Whether values such as:
h2m
m2m
local
local_m2m
cluster
exist.
Exactly what happens in each mode.
Whether Claude/R2D2 and Gemini/ADK use the same authentication model.
Whether Gemini/ADK bypasses Helix H2M completely.
Whether H2M and M2M can coexist in different application components.

Produce a call-path diagram.

4. DETERMINE WHETHER H2M CAN MAKE MARKETDEV INDEPENDENT

The desired architecture is:

Windows should NOT be required once MarketDev is configured.

Windows/Tectia may be used temporarily to complete the one-time H2M browser authentication, but after that MarketDev should run independently.

Verify whether this is how Helix H2M is designed:

Windows browser
→ one-time OAuth login
→ callback reaches Helix on MarketDev
→ MarketDev creates its own persisted credential
→ browser/tunnel no longer required
→ helix auth access-token print -a works directly on MarketDev
→ RPR backend runs independently.

Determine whether this is fully supported.

If yes, state explicitly that Tectia is only an enrollment/bootstrap dependency, not a runtime dependency.

If no, explain exactly why.

5. H2M MULTI-USER GOVERNANCE QUESTION — VERY IMPORTANT

Suppose:

I authenticate Helix on MarketDev using my own H2M identity.
RPR FastAPI runs continuously.
20 internal users access the web application.

Then Claude/R2D2 calls generated by all 20 users may potentially execute using my H2M identity.

Establish from Citi documentation whether this is:

explicitly permitted,
permitted for PoC/dev only,
discouraged,
prohibited,
or undocumented.

Explain attribution/audit implications.

Then compare with M2M where the backend uses an application/service identity.

6. PRODUCE A DECISION MATRIX

Create a table comparing:

Criterion	H2M Windows	H2M MarketDev	M2M MarketDev
Human browser required initially			
Browser required after enrollment			
Port 8822 required initially			
Port 8822 required at runtime			
Persisted credential			
Works after SSH disconnect			
Works after backend restart			
Works after server reboot			
Identity represented			
Suitable for developer testing			
Suitable for PoC			
Suitable for shared users			
Suitable for production			
Central revocation			
Audit attribution			
Citi documentation status			

Do not fill a cell without evidence.

7. ANSWER THESE FINAL QUESTIONS CLEARLY

Q1. Can RPR run fully independently on MarketDev using H2M after one successful browser enrollment?

Q2. If yes, exactly what persistent state makes that possible? Do not expose its contents.

Q3. Is Tectia required after successful H2M enrollment?

Q4. Is Windows required after successful H2M enrollment?

Q5. Is H2M an officially supported MarketDev configuration?

Q6. Can H2M support a continuously running FastAPI backend?

Q7. Can multiple users safely/officially share an application whose backend authenticates through one person's H2M credential?

Q8. At what deployment stage does Citi documentation require or recommend M2M instead?

Q9. Does RPR currently support M2M without application-code modification?

Q10. Does Gemini/ADK require H2M/M2M at all, or does it use a separate approved identity mechanism?

Q11. What authentication model would you recommend for:

individual MarketDev testing,
internal PoC,
shared team application,
production deployment?

Q12. Is our current H2M port-8822 debugging still worth completing to prove the UNIX installation even if M2M is ultimately selected?

8. OUTPUT

Produce:

Executive conclusion.
Exact H2M architecture.
Exact M2M architecture.
RPR authentication call paths.
H2M vs M2M decision matrix.
MarketDev independence assessment.
Multi-user/audit assessment.
Recommended architecture by deployment stage.
Any remaining unknowns.
Exact Citi documentation references supporting every policy-level conclusion.

Do not make any changes. This is forensic/read-only analysis only.
