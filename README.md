FINAL RPR MARKETDEV M2M IMPLEMENTATION AUDIT — DO NOT ASK ME MORE QUESTIONS

We have spent considerable time diagnosing MarketDev authentication. I now want you to finish the architecture decision and give me an executable implementation plan.

DO NOT MODIFY ANY FILE YET. READ-ONLY FORENSIC ANALYSIS ONLY.

TARGET

RPR must run as a shared, independent MarketDev UNIX FastAPI service.

Windows, Tectia, browser OAuth, localhost:8822, my personal SOEID session and persisted ~/.helix/*-oidc.cred must NOT be runtime dependencies of the final shared deployment.

We are moving to the officially supported M2M/service identity architecture.

FACTS ALREADY ESTABLISHED
llm_gateway.py already supports:

R2D2_AUTH_MODE=m2m

and contains a working _get_m2m_token() implementation using OAuth2 client credentials.

It consumes:

COIN_CLIENT_ID / alias R2D2_CLIENT_ID
COIN_CLIENT_SECRET / alias R2D2_CLIENT_SECRET
Citi CA certificate path

Therefore Claude/R2D2 is GO for M2M without application logic changes.

Current marketdev_start.sh still contains:

export R2D2_AUTH_MODE="h2m"

and Helix-presence validation associated with H2M.

Your previous audit found three Gemini implementations:

A. rpr_search_agent.py

Current path imported by market_event_scout.py and narrative_enricher.py.

It manually invokes:

helix auth access-token print -a

and therefore currently has no M2M branch.

B. web_search_agent.py

Used/imported around theme_assistant.py / rpr_service.py.

It uses:

helix_adk_adapter.custom_google_llm.HelixGemini

The Citi adapter documentation indicates native RUN_MODE=local_m2m using CLIENT_ID + CLIENT_SECRET.

C. rapid-portfolio/

Standalone Helix ADK template/reference project, not believed to be imported by the live app. Its documentation describes the native M2M implementation.

IMPORTANT

Do not assume the Windows environment proves what is installed on MarketDev.

The final target is MarketDev, where the UNIX venv is:

~/Rapid_Portfolio_Review_AI_UNIX_PACKAGE/.venv

and application package/root is:

~/Rapid_Portfolio_Review_AI_UNIX_PACKAGE

Entry point remains:

server:app

Do NOT change RPR business logic, prompts, scoring, Step 1 behaviour, UI, Step 2.x logic, models or frozen visual design.

TASK 1 — Establish the ACTUAL Gemini runtime import graph

Trace from server.py all the way to Gemini for:

Trigger 1 theme gate
event discovery
evidence search
enrichment
Trigger 2 if relevant

For every route show:

server endpoint -> service -> module -> class/function -> auth mechanism

Explicitly identify whether:

rpr_search_agent.py

or

web_search_agent.py

is invoked for each operation.

Cite exact filenames/functions/line ranges.

Do not infer.

TASK 2 — Determine whether helix_adk_adapter can replace ONLY the authentication layer

Compare the public interfaces of:

rpr_search_agent.py

versus

web_search_agent.py

Determine whether the existing discovery/enrichment callers can use the Citi adapter without changing their business behaviour.

I do NOT want a rewrite.

Preserve:

prompts
Gemini model names
enterprise web search
grounding metadata
return shapes
timeout logic
retries
theme/event isolation
progressive discovery → evidence → Opus refinement pipeline
max events per theme
logging/model trace behaviour

If an adapter layer is needed, describe the smallest possible compatibility patch.

TASK 3 — Give me ONE MarketDev read-only KSH audit block

I want ONE copy/paste block that I can run on MarketDev.

It must:

activate the existing project .venv
print Python version
determine whether helix_adk_adapter is importable
if importable, show module path and package metadata/version without reading credentials
determine whether HelixGemini imports successfully
inspect installed package metadata only
check for the presence of required M2M environment variable NAMES only
report whether the Citi CA file exists
inspect marketdev_start.sh for authentication-related lines
show which Gemini modules exist in the deployed package
NEVER print environment variable values, tokens or secrets

Output should end with a concise PASS/FAIL matrix.

Make this one safe KSH block rather than making me execute commands one-by-one.

TASK 4 — Resolve the environment-variable naming issue precisely

We appear to have two conventions:

Existing RPR llm_gateway.py:

COIN_CLIENT_ID
COIN_CLIENT_SECRET

Citi helix_adk_adapter documentation:

possibly CLIENT_ID
possibly CLIENT_SECRET
RUN_MODE=local_m2m

Determine from the actual installed/source adapter code or official documentation, not guesswork:

exact names consumed by HelixGemini
whether aliases exist
whether both subsystems can consume the same COIN service identity
whether we should export aliases in marketdev_start.sh

A safe solution may be:

export R2D2_AUTH_MODE=m2m
export COIN_CLIENT_ID=...
export COIN_CLIENT_SECRET=...
export RUN_MODE=local_m2m
export CLIENT_ID="$COIN_CLIENT_ID"
export CLIENT_SECRET="$COIN_CLIENT_SECRET"

But do not accept this until verified against code/documentation.

TASK 5 — Audit TLS behaviour

Previous inspection flagged an existing fallback in _get_m2m_token() that may use verify=False if the configured Citi certificate path is invalid.

Inspect this exactly.

Final MarketDev deployment must fail closed on invalid CA configuration.

Do not disable TLS validation.

Tell me whether a tiny safety patch is required and show it separately from functional M2M work.

TASK 6 — Audit marketdev_start.sh

I need the actual final deployment startup architecture.

Identify exact changes required to transform:

R2D2_AUTH_MODE=h2m

into the M2M configuration.

When M2M is active:

Helix CLI startup validation should not be mandatory unless some remaining Gemini code genuinely requires it.
Tectia should not be required.
port 8822 should not be required.
browser OAuth should not be required.
~/.helix/*-oidc.cred should not be required.

Keep all unrelated working startup behaviour unchanged:

Python 3.11 venv
package checks
certificates
host 0.0.0.0
port 8010
server:app
frontend window.location.origin
existing model environment variables
existing timeout/cache configuration.

Show a minimal unified diff, but DO NOT APPLY IT.

TASK 7 — Give an explicit GO/NO-GO decision

End with exactly these sections:

A. Claude/R2D2 M2M

GO / NO-GO and reason.

B. Gemini/ADK M2M

GO / NO-GO and exact blocker, if any.

C. MarketDev dependencies after M2M

State YES/NO for:

Windows
Tectia
Helix CLI
browser
port 8822
personal SOEID OAuth credential
COIN application identity
Citi CA certificate

D. Files that must change

Exact filenames only.

E. Files that MUST NOT change

Explicitly protect the RPR working bone.

F. Environment variables

Names only. Never values.

G. One-time setup actions

Approval/service-identity/configuration actions.

H. Runtime startup sequence

Exact final UNIX sequence.

I. Test sequence

Health check → Claude/R2D2 call → Gemini discovery → evidence enrichment → full Step 1.

J. FINAL VERDICT

Answer:

Can RPR become a completely independent shared MarketDev application with no Windows/Tectia/8822 runtime dependency? YES/NO

Then state precisely what remains before that becomes true.

NON-NEGOTIABLE RULES
READ ONLY.
DO NOT modify files.
DO NOT display or read secrets.
DO NOT copy personal .cred files.
DO NOT create tokens.
DO NOT weaken TLS.
DO NOT alter the working RPR business pipeline.
DO NOT propose broad refactoring.
Distinguish VERIFIED / STRONG INFERENCE / UNKNOWN.
If something can be established with a command, provide the command instead of guessing.

I am tired of iterative debugging. Produce one consolidated answer and one consolidated MarketDev KSH audit block. Do not ask me to execute twenty individual commands.
