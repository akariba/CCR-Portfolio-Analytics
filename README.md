STOP. READ-ONLY FORENSIC CHECK ONLY.

We now have definitive evidence from MarketDev that marketdev_start.sh currently
hardcodes:

    export R2D2_AUTH_MODE="h2m"

and that the script explicitly requires the Helix CLI for that mode.

The H2M browser callback through Tectia/port 8822 is not appropriate as the
long-term authentication architecture for a shared MarketDev RPR deployment.

I want you to inspect the EXISTING RPR source and determine whether M2M is
already fully implemented.

DO NOT MODIFY ANY FILE.
DO NOT CREATE OR READ SECRET VALUES.
DO NOT REFACTOR ANYTHING.
DO NOT propose new authentication code unless the current implementation truly
does not support M2M.

Inspect:

- backend/llm_gateway.py
- backend/rpr_search_agent.py
- backend/market_event_scout.py
- backend/narrative_enricher.py
- backend/server.py
- RUNTIME_ENV.ps1
- marketdev_start.sh
- every imported auth/R2D2/COIN helper involved in these call paths

TRACE THE ACTUAL CODE.

I need exact answers:

1. Find every occurrence of:
   R2D2_AUTH_MODE
   COIN_CLIENT_ID
   COIN_CLIENT_SECRET
   CLIENT_ID
   CLIENT_SECRET
   RUN_MODE
   get_h2m_token
   m2m
   h2m
   access-token
   token_url

2. Show the exact accepted values for R2D2_AUTH_MODE.

3. Trace:

   RPR Claude request
       ->
   gateway
       ->
   auth-mode decision
       ->
   H2M branch

   and separately:

   RPR Claude request
       ->
   gateway
       ->
   auth-mode decision
       ->
   M2M branch

4. For M2M specifically:
   - exact function used
   - exact environment-variable NAMES required
   - token endpoint/config source
   - certificate handling
   - whether Helix CLI is invoked at all
   - whether ~/.helix is used
   - whether browser OAuth is used
   - whether port 8822 is involved

5. Confirm whether setting:

       R2D2_AUTH_MODE=m2m

   is sufficient to select the M2M implementation or whether another variable
   such as RUN_MODE is required.

6. Determine whether the existing names are:

       COIN_CLIENT_ID
       COIN_CLIENT_SECRET

   or:

       CLIENT_ID
       CLIENT_SECRET

   or something else.

   DO NOT GUESS. Cite file + line for each.

7. Determine whether Gemini/ADK authentication is independent of R2D2 M2M.
   Trace Gemini separately.

8. Confirm whether changing H2M -> M2M affects any:
   - prompts
   - model identifiers
   - Step 1 logic
   - Step 2 logic
   - scoring
   - frontend
   - portfolio data
   - business logic

   Expected answer should be configuration/auth only, but verify it.

9. Inspect marketdev_start.sh specifically.

   Current observed lines include:

       export R2D2_AUTH_MODE="h2m"

   and a Helix-presence validation tied to H2M.

   Show the MINIMUM patch necessary for M2M deployment.

   DO NOT APPLY IT.

10. Check whether startup validation already supports m2m.
    If it does not, identify exactly which checks need conditionalization.

11. Produce the final result as:

    A. H2M CURRENT PATH
    B. M2M EXISTING PATH
    C. REQUIRED M2M ENV VARIABLE NAMES
    D. MARKETDEV_START.SH MINIMUM PATCH
    E. HELIX/Tectia/8822 COMPONENTS THAT BECOME UNNECESSARY
    F. GEMINI AUTH PATH
    G. FILES THAT REQUIRE CONFIGURATION CHANGE
    H. FILES THAT MUST REMAIN UNCHANGED
    I. GO/NO-GO: CAN EXISTING RPR RUN M2M WITHOUT APPLICATION-CODE CHANGES?

Preservation rule:
The existing RPR application is immutable working bone. Authentication migration
must be configuration-only if the source already supports it.
